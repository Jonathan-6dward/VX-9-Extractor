import { useState } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { Home } from './pages/Home';
import { YouTubeDownloader } from './pages/YouTubeDownloader';
import { InstagramDownloader } from './pages/InstagramDownloader';
import { TikTokDownloader } from './pages/TikTokDownloader';
import { TwitterDownloader } from './pages/TwitterDownloader';
import { FacebookDownloader } from './pages/FacebookDownloader';
import { LinkedInDownloader } from './pages/LinkedInDownloader';
import { PinterestDownloader } from './pages/PinterestDownloader';
import { OCRExtractor } from './pages/OCRExtractor';

export type Platform = 
  | 'home'
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'facebook'
  | 'linkedin'
  | 'pinterest'
  | 'ocr';

export default function App() {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('home');

  const renderPage = () => {
    switch (currentPlatform) {
      case 'home':
        return <Home onNavigate={setCurrentPlatform} />;
      case 'youtube':
        return <YouTubeDownloader onNavigate={setCurrentPlatform} />;
      case 'instagram':
        return <InstagramDownloader onNavigate={setCurrentPlatform} />;
      case 'tiktok':
        return <TikTokDownloader onNavigate={setCurrentPlatform} />;
      case 'twitter':
        return <TwitterDownloader onNavigate={setCurrentPlatform} />;
      case 'facebook':
        return <FacebookDownloader onNavigate={setCurrentPlatform} />;
      case 'linkedin':
        return <LinkedInDownloader onNavigate={setCurrentPlatform} />;
      case 'pinterest':
        return <PinterestDownloader onNavigate={setCurrentPlatform} />;
      case 'ocr':
        return <OCRExtractor onNavigate={setCurrentPlatform} />;
      default:
        return <Home onNavigate={setCurrentPlatform} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] text-[#B4B6C1]">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1C1D23',
            color: '#B4B6C1',
            border: '1px solid #23242B',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />

      {renderPage()}
    </div>
  );
}
