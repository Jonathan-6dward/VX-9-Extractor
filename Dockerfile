# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Install system dependencies required for tkinter, Tesseract OCR, and Playwright
RUN apt-get update && apt-get install -y \
    tk \
    tesseract-ocr \
    tesseract-ocr-por \
    # Playwright dependencies
    libnss3 \
    libdbus-glib-1-2 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxss1 \
    libasound2 \
    libgbm-dev \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download Playwright browsers
RUN python -m playwright install

# Copy the application script
COPY carousel_text_extractor.py .

# Set the command to run the application
CMD ["python3", "carousel_text_extractor.py"]