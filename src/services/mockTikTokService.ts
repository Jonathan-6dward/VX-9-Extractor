// Mock TikTok Service - Simulates TikTok API calls

export interface TikTokVideoData {
  success: boolean;
  jobId: string;
  data: {
    video: {
      id: string;
      url: string;
      thumbnailUrl: string;
      duration: number;
      width: number;
      height: number;
    };
    audio: {
      url: string;
      format: string;
      duration: number;
    };
    metadata: {
      caption: string;
      author: {
        username: string;
        nickname: string;
        verified: boolean;
        followerCount: number;
      };
      sound: {
        title: string;
        author: string;
        isOriginal: boolean;
        trendingRank: number;
        usageCount: number;
      };
      stats: {
        views: number;
        likes: number;
        comments: number;
        shares: number;
        saves: number;
        engagementRate: number;
      };
      hashtags: {
        name: string;
        views: number;
        popularity: string;
      }[];
    };
    transcript?: {
      text: string;
      language: string;
      confidence: number;
    };
  };
}

const mockCaptions = [
  'Check out this amazing transformation! 🔥 #fyp #viral #trending #transformation',
  'POV: When you finally figure it out 😂 #comedy #relatable #foryou',
  'This recipe will change your life! 🍕 #cooking #foodtok #recipe #chef',
  'Day in my life as a content creator 📱 #dayinmylife #creator #vlog',
  'You need to try this hack! 💡 #lifehack #tips #tutorial #helpful',
];

const mockSounds = [
  { title: 'Original Sound - @creator', isOriginal: true, trendingRank: 5 },
  { title: 'Trending Sound 2024', isOriginal: false, trendingRank: 1 },
  { title: 'Viral Audio', isOriginal: false, trendingRank: 3 },
  { title: 'Popular Track', isOriginal: false, trendingRank: 12 },
];

class MockTikTokService {
  async downloadVideo(url: string, options: any): Promise<TikTokVideoData> {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    const caption = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
    const sound = mockSounds[Math.floor(Math.random() * mockSounds.length)];
    const username = url.match(/@(\w+)/)?.[1] || 'creator';

    const views = Math.floor(Math.random() * 10000000) + 100000;
    const likes = Math.floor(views * (Math.random() * 0.15 + 0.05));
    const comments = Math.floor(likes * (Math.random() * 0.05 + 0.01));
    const shares = Math.floor(likes * (Math.random() * 0.03 + 0.01));
    const saves = Math.floor(likes * (Math.random() * 0.04 + 0.01));

    return {
      success: true,
      jobId: `job_tiktok_${Date.now()}`,
      data: {
        video: {
          id: Math.random().toString(36).substr(2, 15),
          url: `https://cdn.example.com/tiktok_video_${Date.now()}.mp4`,
          thumbnailUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=1080&h=1920&fit=crop`,
          duration: Math.random() * 50 + 10,
          width: 1080,
          height: 1920,
        },
        audio: {
          url: `https://cdn.example.com/tiktok_audio_${Date.now()}.mp3`,
          format: 'mp3',
          duration: Math.random() * 50 + 10,
        },
        metadata: {
          caption,
          author: {
            username,
            nickname: username.charAt(0).toUpperCase() + username.slice(1),
            verified: Math.random() > 0.7,
            followerCount: Math.floor(Math.random() * 5000000) + 10000,
          },
          sound: {
            title: sound.title,
            author: sound.isOriginal ? username : 'Various Artists',
            isOriginal: sound.isOriginal,
            trendingRank: sound.trendingRank,
            usageCount: Math.floor(Math.random() * 1000000) + 10000,
          },
          stats: {
            views,
            likes,
            comments,
            shares,
            saves,
            engagementRate: (likes + comments + shares + saves) / views,
          },
          hashtags: [
            { name: 'fyp', views: 1200000000000, popularity: 'extreme' },
            { name: 'viral', views: 890000000000, popularity: 'extreme' },
            { name: 'trending', views: 567000000000, popularity: 'extreme' },
          ],
        },
        transcript: options.generateTranscript ? {
          text: 'Hey guys, welcome back to my channel. Today I\'m going to show you something amazing...',
          language: 'en',
          confidence: 0.85 + Math.random() * 0.14,
        } : undefined,
      },
    };
  }

  async analyzeProfile(username: string, options: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
      success: true,
      data: {
        username,
        nickname: username.charAt(0).toUpperCase() + username.slice(1),
        bio: 'Creating content that matters 🎬✨',
        verified: Math.random() > 0.6,
        followerCount: Math.floor(Math.random() * 10000000) + 50000,
        followingCount: Math.floor(Math.random() * 2000) + 100,
        totalLikes: Math.floor(Math.random() * 100000000) + 1000000,
        videoCount: Math.floor(Math.random() * 1000) + 50,
        recentVideos: Array.from({ length: 12 }, (_, i) => ({
          id: `video_${i}`,
          views: Math.floor(Math.random() * 5000000) + 100000,
          likes: Math.floor(Math.random() * 500000) + 10000,
          type: 'video',
          timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        })),
      },
    };
  }

  async trackSound(soundId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      data: {
        id: soundId,
        title: mockSounds[0].title,
        author: 'Artist Name',
        duration: 15,
        usageCount: Math.floor(Math.random() * 1000000) + 10000,
        trendingRank: Math.floor(Math.random() * 50) + 1,
        category: ['Dance', 'Lip Sync', 'Comedy', 'Transition'][Math.floor(Math.random() * 4)],
        topVideos: Array.from({ length: 5 }, (_, i) => ({
          id: `video_${i}`,
          views: Math.floor(Math.random() * 10000000) + 100000,
          likes: Math.floor(Math.random() * 1000000) + 10000,
        })),
      },
    };
  }
}

export const mockTikTokService = new MockTikTokService();
