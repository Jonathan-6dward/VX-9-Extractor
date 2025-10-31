"""
Extrator de Texto de Carrosséis
Ferramenta para extrair texto de imagens usando OCR e baixar mídias de redes sociais.
"""

import csv
import pprint
import re
import shutil
import tempfile
import threading
import traceback
import tkinter as tk
from pathlib import Path
from tkinter import filedialog, messagebox, scrolledtext, ttk
from urllib.parse import urlparse

import instaloader
import pandas as pd
import pytesseract
import requests
from PIL import Image, ImageTk
from TikTokApi import TikTokApi


class CarouselTextExtractor:
    def __init__(self, root):
        self.root = root
        self.root.title("Extrator de Texto de Carrosséis")
        self.root.geometry("1000x800")

        self.images_data = []
        self.current_preview_index = 0
        self.temp_dirs = []

        self.setup_ui()
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)

    def on_closing(self):
        self._cleanup_temp_dirs()
        self.root.destroy()

    def _cleanup_temp_dirs(self):
        for temp_dir in self.temp_dirs:
            shutil.rmtree(temp_dir, ignore_errors=True)

    def setup_ui(self):
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1) # Make second column resizable

        title_label = ttk.Label(main_frame, text="Extrator de Texto de Carrosséis", font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=10)

        # --- Column 1: Input and Preview ---
        left_column = ttk.Frame(main_frame)
        left_column.grid(row=1, column=0, sticky=(tk.N, tk.S, tk.W, tk.E), padx=(0, 10))

        input_frame = ttk.LabelFrame(left_column, text="Entrada de Dados Locais", padding="10")
        input_frame.pack(fill=tk.X, expand=False)
        ttk.Button(input_frame, text="Selecionar Pasta", command=self.select_folder).pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5, pady=5)
        ttk.Button(input_frame, text="Adicionar Imagens", command=self.select_images).pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5, pady=5)
        self.status_label = ttk.Label(input_frame, text="Nenhuma imagem carregada")
        self.status_label.pack(side=tk.BOTTOM, pady=5)

        download_frame = ttk.LabelFrame(left_column, text="Download de Mídia Social", padding="10")
        download_frame.pack(fill=tk.X, expand=False, pady=10)
        ttk.Label(download_frame, text="URL (TikTok ou Instagram):").pack(anchor=tk.W)
        self.media_url_entry = ttk.Entry(download_frame)
        self.media_url_entry.pack(fill=tk.X, expand=True, pady=5)
        self.download_button = ttk.Button(download_frame, text="Baixar Mídia", command=self.start_download)
        self.download_button.pack(pady=5)
        self.download_status_label = ttk.Label(download_frame, text="")
        self.download_status_label.pack()

        preview_frame = ttk.LabelFrame(left_column, text="Pré-visualização", padding="10")
        preview_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        self.preview_canvas = tk.Canvas(preview_frame, bg="gray")
        self.preview_canvas.pack(fill=tk.BOTH, expand=True)
        nav_frame = ttk.Frame(preview_frame)
        nav_frame.pack(pady=5)
        ttk.Button(nav_frame, text="◀ Anterior", command=self.prev_image).pack(side=tk.LEFT, padx=5)
        self.preview_label = ttk.Label(nav_frame, text="0/0")
        self.preview_label.pack(side=tk.LEFT, padx=10)
        ttk.Button(nav_frame, text="Próxima ▶", command=self.next_image).pack(side=tk.LEFT, padx=5)

        # --- Column 2: Results and Actions ---
        right_column = ttk.Frame(main_frame)
        right_column.grid(row=1, column=1, sticky=(tk.N, tk.S, tk.W, tk.E))
        right_column.rowconfigure(0, weight=1)

        results_frame = ttk.LabelFrame(right_column, text="Resultados da Extração", padding="10")
        results_frame.pack(fill=tk.BOTH, expand=True)
        results_frame.rowconfigure(0, weight=1)
        results_frame.columnconfigure(0, weight=1)
        self.results_text = scrolledtext.ScrolledText(results_frame, height=20, width=60, wrap=tk.WORD)
        self.results_text.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        action_frame = ttk.Frame(right_column)
        action_frame.pack(pady=10)
        ttk.Button(action_frame, text="Extrair Texto (OCR)", command=self.extract_text).pack(side=tk.LEFT, padx=5)
        ttk.Button(action_frame, text="Salvar CSV", command=self.save_csv).pack(side=tk.LEFT, padx=5)
        ttk.Button(action_frame, text="Salvar Excel", command=self.save_excel).pack(side=tk.LEFT, padx=5)
        ttk.Button(action_frame, text="Limpar Tudo", command=self.clear_all).pack(side=tk.LEFT, padx=5)

        self.progress = ttk.Progressbar(main_frame, mode='determinate')
        self.progress.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=10)

    def select_folder(self):
        folder_path = filedialog.askdirectory(title="Selecionar Pasta com Imagens")
        if folder_path:
            self.load_images_from_folder(folder_path)

    def select_images(self):
        file_paths = filedialog.askopenfilenames(
            title="Selecionar Imagens",
            filetypes=[("Imagens", "*.png *.jpg *.jpeg *.gif *.bmp"), ("Todos", "*.*")]
        )
        if file_paths:
            self.load_images_from_files(file_paths)

    def start_download(self):
        url = self.media_url_entry.get()
        if not url:
            messagebox.showwarning("Aviso", "Por favor, insira uma URL.")
            return

        self.download_button.config(state=tk.DISABLED)
        self.download_status_label.config(text="Iniciando download...")

        domain = urlparse(url).netloc.lower()
        target_func = None
        if "tiktok.com" in domain:
            target_func = self._download_and_load_tiktok
        elif "instagram.com" in domain:
            target_func = self._download_and_load_instagram
        else:
            messagebox.showerror("Erro", "URL não suportada. Use links do TikTok ou Instagram.")
            self.download_button.config(state=tk.NORMAL)
            self.download_status_label.config(text="")
            return

        thread = threading.Thread(target=target_func, args=(url,))
        thread.daemon = True
        thread.start()

    def _download_and_load_tiktok(self, url):
        try:
            self.root.after(0, lambda: self.download_status_label.config(text="TikTok: Criando pasta temporária..."))
            temp_dir = tempfile.mkdtemp()
            self.temp_dirs.append(temp_dir)
            
            self.root.after(0, lambda: self.download_status_label.config(text="TikTok: Acessando API... (pode levar um momento)"))

            api = TikTokApi()
            video = api.video(url)
            
            video_info = asyncio.run(video.info()) # Call the async method to get the dictionary

            if 'image_post' not in video_info:
                raise ValueError("O link não parece ser um carrossel de imagens ou os dados não foram retornados.")

            image_post_data = video_info['image_post']
            images = image_post_data.get('images', [])
            
            if not images:
                raise ValueError("Nenhuma imagem encontrada no post do carrossel.")

            image_count = len(images)
            self.root.after(0, lambda: self.download_status_label.config(text=f"TikTok: Encontradas {image_count} imagens. Baixando..."))

            caption = video_info.get('desc', '')
            caption_text = f"Legenda do TikTok:\n{'-'*20}\n{caption}\n{'-'*20}\n\n" if caption else ""

            for i, image_data in enumerate(images):
                self.root.after(0, lambda i=i: self.download_status_label.config(text=f"TikTok: Baixando imagem {i+1}/{image_count}..."))
                
                image_url = image_data.get('image_url', {}).get('url_list', [None])[-1]
                if not image_url:
                    continue

                response = requests.get(image_url, stream=True)
                response.raise_for_status()
                
                file_name = f"image_{i+1}.jpg"
                file_path = Path(temp_dir) / file_name
                
                with open(file_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
            
            self.root.after(0, lambda: self.download_status_label.config(text="Download concluído! Carregando imagens..."))
            self.root.after(100, self.load_images_from_folder, temp_dir, caption_text)

        except Exception as e:
            self._handle_download_error(e)
        finally:
            self.root.after(0, lambda: self.download_button.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.download_status_label.config(text=""))

    def _download_and_load_instagram(self, url):
        try:
            self.root.after(0, lambda: self.download_status_label.config(text="Instagram: Criando pasta temporária..."))
            temp_dir = tempfile.mkdtemp()
            self.temp_dirs.append(temp_dir)

            self.root.after(0, lambda: self.download_status_label.config(text="Instagram: Inicializando Instaloader (anônimo)..."))
            L = instaloader.Instaloader(download_videos=False, save_metadata=False, post_metadata_txt_pattern='')

            path = urlparse(url).path
            shortcode = [s for s in path.split('/') if s][-1]
            self.root.after(0, lambda: self.download_status_label.config(text=f"Instagram: Baixando post '{shortcode}'..."))
            
            post = instaloader.Post.from_shortcode(L.context, shortcode)
            L.download_post(post, target=Path(temp_dir))

            caption = post.caption
            caption_text = f"Legenda do Instagram:\n{'-'*20}\n{caption}\n{'-'*20}\n\n" if caption else ""

            self.root.after(0, lambda: self.download_status_label.config(text="Download concluído! Carregando imagens..."))
            self.root.after(100, self.load_images_from_folder, temp_dir, caption_text)

        except Exception as e:
            self._handle_download_error(e)
        finally:
            self.root.after(0, lambda: self.download_button.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.download_status_label.config(text=""))

    def _handle_download_error(self, e):
        error_details = traceback.format_exc()
        error_message_for_user = (
            f"Ocorreu um erro inesperado durante o download.\n\n"
            f"Causa: {e}\n\n"
            f"Detalhes técnicos foram adicionados ao painel de 'Resultados da Extração' para análise."
        )
        
        def update_ui_with_error():
            messagebox.showerror("Erro no Download", error_message_for_user)
            separator = "\n" + "!" * 80 + "\n"
            self.results_text.insert(tk.END, separator)
            self.results_text.insert(tk.END, " LOG DE ERRO DETALHADO - DOWNLOAD\n")
            self.results_text.insert(tk.END, "!" * 80 + "\n")
            self.results_text.insert(tk.END, error_details)
            self.results_text.insert(tk.END, separator)

        self.root.after(0, update_ui_with_error)

    def load_images_from_folder(self, folder_path, caption_text=""):
        extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp')
        start_order = len(self.images_data) + 1
        
        newly_added_paths = [p for p in sorted(Path(folder_path).glob('*')) if p.suffix.lower() in extensions]

        for idx, file_path in enumerate(newly_added_paths):
            if not any(d['path'] == str(file_path) for d in self.images_data):
                initial_text = caption_text if idx == 0 else ""
                self.images_data.append({
                    'path': str(file_path),
                    'name': file_path.name,
                    'order': start_order + idx,
                    'text': initial_text
                })
        
        self.update_status()
        if newly_added_paths:
            self.current_preview_index = len(self.images_data) - len(newly_added_paths)
        self.show_preview()

    def load_images_from_files(self, file_paths):
        start_order = len(self.images_data) + 1
        
        newly_added_paths = sorted(file_paths)
        for idx, file_path in enumerate(newly_added_paths):
            if not any(d['path'] == str(file_path) for d in self.images_data):
                self.images_data.append({
                    'path': file_path,
                    'name': Path(file_path).name,
                    'order': start_order + idx,
                    'text': ''
                })
        
        self.update_status()
        if newly_added_paths:
            self.current_preview_index = len(self.images_data) - len(newly_added_paths)
        self.show_preview()

    def update_status(self):
        count = len(self.images_data)
        self.status_label.config(text=f"{count} imagem(ns) carregada(s)")

    def show_preview(self):
        if not self.images_data:
            self.preview_canvas.delete("all")
            self.preview_label.config(text="0/0")
            return
        
        if self.current_preview_index >= len(self.images_data):
            self.current_preview_index = len(self.images_data) - 1
        
        img_data = self.images_data[self.current_preview_index]
        
        try:
            img = Image.open(img_data['path'])
            
            canvas_width = self.preview_canvas.winfo_width()
            canvas_height = self.preview_canvas.winfo_height()
            img.thumbnail((canvas_width, canvas_height), Image.Resampling.LANCZOS if hasattr(Image, 'Resampling') else Image.ANTIALIAS)
            
            self.preview_photo = ImageTk.PhotoImage(img)
            
            self.preview_canvas.delete("all")
            x = (canvas_width - img.width) // 2
            y = (canvas_height - img.height) // 2
            self.preview_canvas.create_image(x, y, anchor=tk.NW, image=self.preview_photo)
            
            self.preview_label.config(
                text=f"{self.current_preview_index + 1}/{len(self.images_data)} - {img_data['name']}"
            )
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao carregar imagem: {str(e)}")

    def prev_image(self):
        if self.images_data and self.current_preview_index > 0:
            self.current_preview_index -= 1
            self.show_preview()

    def next_image(self):
        if self.images_data and self.current_preview_index < len(self.images_data) - 1:
            self.current_preview_index += 1
            self.show_preview()

    def clean_text(self, text: str) -> str:
        text = re.sub(r'\s+', ' ', text)
        text = ''.join(char for char in text if char.isprintable() or char == '\n')
        return text.strip()

    def extract_text(self):
        if not self.images_data:
            messagebox.showwarning("Aviso", "Nenhuma imagem carregada!")
            return
        
        self.results_text.delete(1.0, tk.END)
        self.progress['maximum'] = len(self.images_data)
        self.progress['value'] = 0
        
        for idx, img_data in enumerate(self.images_data):
            try:
                img = Image.open(img_data['path'])
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                current_text = img_data.get('text', '')
                ocr_text = pytesseract.image_to_string(img, lang='por')
                cleaned_text = self.clean_text(ocr_text)
                img_data['text'] = (current_text + "\n--- OCR ---\n" + cleaned_text).strip()
                
                result_entry = f"\n{'='*60}\n"
                result_entry += f"Imagem {img_data['order']}: {img_data['name']}\n"
                result_entry += f"{'-'*60}\n"
                result_entry += f"{img_data['text'] if img_data['text'] else '[Nenhum texto detectado]'}\n"
                
                self.results_text.insert(tk.END, result_entry)
                self.progress['value'] = idx + 1
                self.root.update_idletasks()
                
            except Exception as e:
                error_msg = f"\nErro na imagem {img_data['name']}: {str(e)}\n"
                self.results_text.insert(tk.END, error_msg)
        
        messagebox.showinfo("Concluído", f"Extração concluída! {len(self.images_data)} imagens processadas.")

    def save_csv(self):
        if not self.images_data or not any(img['text'] for img in self.images_data):
            messagebox.showwarning("Aviso", "Nenhum texto extraído ainda!")
            return
        
        file_path = filedialog.asksaveasfilename(
            defaultextension=".csv",
            filetypes=[("CSV", "*.csv"), ("Todos", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'w', newline='', encoding='utf-8-sig') as csvfile:
                    writer = csv.writer(csvfile)
                    writer.writerow(['Ordem', 'Imagem', 'Texto Extraído'])
                    
                    for img_data in self.images_data:
                        writer.writerow([
                            img_data['order'],
                            img_data['name'],
                            img_data['text']
                        ])
                
                messagebox.showinfo("Sucesso", f"CSV salvo em:\n{file_path}")
            except Exception as e:
                messagebox.showerror("Erro", f"Erro ao salvar CSV: {str(e)}")

    def save_excel(self):
        if not self.images_data or not any(img['text'] for img in self.images_data):
            messagebox.showwarning("Aviso", "Nenhum texto extraído ainda!")
            return
        
        file_path = filedialog.asksaveasfilename(
            defaultextension=".xlsx",
            filetypes=[("Excel", "*.xlsx"), ("Todos", "*.*")]
        )
        
        if file_path:
            try:
                df = pd.DataFrame([
                    {
                        'Ordem no Carrossel': img['order'],
                        'Imagem': img['name'],
                        'Texto Extraído': img['text']
                    }
                    for img in self.images_data
                ])
                
                df.to_excel(file_path, index=False, engine='openpyxl')
                messagebox.showinfo("Sucesso", f"Excel salvo em:\n{file_path}")
            except Exception as e:
                messagebox.showerror("Erro", f"Erro ao salvar Excel: {str(e)}")

    def clear_all(self):
        self.images_data = []
        self.current_preview_index = 0
        self.results_text.delete(1.0, tk.END)
        self.preview_canvas.delete("all")
        self.update_status()
        self.preview_label.config(text="0/0")
        self.progress['value'] = 0
        self._cleanup_temp_dirs()
        self.temp_dirs = []

def main():
    try:
        pytesseract.get_tesseract_version()
    except Exception as e:
        messagebox.showerror(
            "Erro de Dependência",
            f"Tesseract OCR não encontrado ou não configurado corretamente.\n\nErro: {e}\n\n"
            "Por favor, instale o Tesseract e adicione-o ao PATH do sistema."
        )
        return
    
    root = tk.Tk()
    app = CarouselTextExtractor(root)
    root.mainloop()

if __name__ == "__main__":
    main()