// Mock Instagram Service - Simulates Instagram API calls

export interface InstagramPostAnalysis {
  success: boolean;
  jobId: string;
  data: {
    post: {
      id: string;
      shortcode: string;
      url: string;
      type: 'image' | 'video' | 'carousel';
      timestamp: string;
      owner: {
        username: string;
        fullName: string;
        isVerified: boolean;
        followerCount: number;
      };
    };
    media: {
      type: string;
      url: string;
      thumbnailUrl: string;
      width: number;
      height: number;
    }[];
    caption: {
      text: string;
      language: string;
      sentiment: {
        score: number;
        label: string;
      };
    };
    hashtags: {
      tag: string;
      posts: number;
      popularity: string;
      performanceScore: number;
    }[];
    engagement: {
      likes: number;
      comments: number;
      saves: number;
      shares: number;
      engagementRate: number;
    };
    location?: {
      name: string;
      latitude: number;
      longitude: number;
    };
    ocr?: {
      extractedText: string;
      confidence: number;
    };
    aiAnalysis: {
      objects: { name: string; confidence: number }[];
      colors: { hex: string; percentage: number; name: string }[];
    };
  };
}

export interface InstagramProfileData {
  success: boolean;
  data: {
    username: string;
    fullName: string;
    bio: string;
    isVerified: boolean;
    followerCount: number;
    followingCount: number;
    postCount: number;
    engagementRate: number;
    recentPosts: any[];
    topHashtags: string[];
    bestPostingTimes: string[];
  };
}

const mockPosts = [
  {
    caption: 'Just Do It. 💪 #motivation #nike #sports #fitness',
    likes: 2345678,
    comments: 12345,
    saves: 89012,
    type: 'image' as const,
    hashtags: ['motivation', 'nike', 'sports', 'fitness'],
  },
  {
    caption: 'New collection dropping soon 🔥 #fashion #style #streetwear',
    likes: 1876543,
    comments: 8934,
    saves: 67234,
    type: 'carousel' as const,
    hashtags: ['fashion', 'style', 'streetwear'],
  },
  {
    caption: 'Behind the scenes of our latest campaign 🎬 #bts #production',
    likes: 4123456,
    comments: 23456,
    saves: 156789,
    type: 'video' as const,
    hashtags: ['bts', 'production'],
  },
];

class MockInstagramService {
  async analyzePost(url: string, options: any): Promise<InstagramPostAnalysis> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const mockPost = mockPosts[Math.floor(Math.random() * mockPosts.length)];
    const username = url.match(/@(\w+)/)?.[1] || 'nike';

    return {
      success: true,
      jobId: `job_inst_${Date.now()}`,
      data: {
        post: {
          id: Math.random().toString(36).substr(2, 9),
          shortcode: Math.random().toString(36).substr(2, 11),
          url,
          type: mockPost.type,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          owner: {
            username,
            fullName: username.charAt(0).toUpperCase() + username.slice(1),
            isVerified: Math.random() > 0.5,
            followerCount: Math.floor(Math.random() * 100000000) + 10000,
          },
        },
        media: [
          {
            type: 'image',
            url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=1080&h=1080&fit=crop`,
            thumbnailUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400&h=400&fit=crop`,
            width: 1080,
            height: 1080,
          },
        ],
        caption: {
          text: mockPost.caption,
          language: 'en',
          sentiment: {
            score: 0.85 + Math.random() * 0.14,
            label: 'positive',
          },
        },
        hashtags: mockPost.hashtags.map(tag => ({
          tag,
          posts: Math.floor(Math.random() * 1000000000) + 1000000,
          popularity: ['low', 'medium', 'high', 'very_high'][Math.floor(Math.random() * 4)],
          performanceScore: Math.floor(Math.random() * 40) + 60,
        })),
        engagement: {
          likes: mockPost.likes,
          comments: mockPost.comments,
          saves: mockPost.saves,
          shares: Math.floor(mockPost.saves * 0.5),
          engagementRate: Math.random() * 0.1 + 0.02,
        },
        location: Math.random() > 0.5 ? {
          name: ['New York, NY', 'Los Angeles, CA', 'Paris, France', 'Tokyo, Japan'][Math.floor(Math.random() * 4)],
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
        } : undefined,
        ocr: options.extractText ? {
          extractedText: 'Limited Time Offer\nSave 30% Now!\nUse code: SAVE30',
          confidence: 0.92 + Math.random() * 0.07,
        } : undefined,
        aiAnalysis: {
          objects: [
            { name: 'person', confidence: 0.95 },
            { name: 'product', confidence: 0.89 },
            { name: 'logo', confidence: 0.87 },
          ],
          colors: [
            { hex: '#FF6B35', percentage: 23, name: 'Coral' },
            { hex: '#F7931E', percentage: 18, name: 'Orange' },
            { hex: '#4A90E2', percentage: 22, name: 'Blue' },
            { hex: '#FFFFFF', percentage: 20, name: 'White' },
            { hex: '#000000', percentage: 17, name: 'Black' },
          ],
        },
      },
    };
  }

  async scrapeProfile(username: string, options: any): Promise<InstagramProfileData> {
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));

    return {
      success: true,
      data: {
        username,
        fullName: username.charAt(0).toUpperCase() + username.slice(1),
        bio: 'Official account | Inspiring athletes worldwide 🌍',
        isVerified: true,
        followerCount: Math.floor(Math.random() * 100000000) + 1000000,
        followingCount: Math.floor(Math.random() * 1000) + 100,
        postCount: Math.floor(Math.random() * 5000) + 500,
        engagementRate: Math.random() * 0.05 + 0.01,
        recentPosts: Array.from({ length: options.postLimit || 12 }, (_, i) => ({
          id: `post_${i}`,
          likes: Math.floor(Math.random() * 5000000) + 100000,
          comments: Math.floor(Math.random() * 50000) + 1000,
          type: ['image', 'video', 'carousel'][Math.floor(Math.random() * 3)],
          timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        })),
        topHashtags: ['justdoit', 'nike', 'sports', 'fitness', 'motivation'],
        bestPostingTimes: ['Mon 11AM', 'Wed 2PM', 'Fri 10AM'],
      },
    };
  }

  async analyzeHashtag(hashtag: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      success: true,
      data: {
        hashtag: hashtag.replace('#', ''),
        totalPosts: Math.floor(Math.random() * 1000000000) + 1000000,
        dailyGrowth: Math.floor(Math.random() * 50000) + 1000,
        trendStatus: ['rising', 'stable', 'declining'][Math.floor(Math.random() * 3)],
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
        relatedHashtags: [
          { tag: 'marketing', posts: 187000000, popularity: 'very_high' },
          { tag: 'socialmedia', posts: 89000000, popularity: 'high' },
          { tag: 'contentcreator', posts: 34000000, popularity: 'medium' },
          { tag: 'digitalmarketing', posts: 47000000, popularity: 'high' },
        ],
      },
    };
  }
}

export const mockInstagramService = new MockInstagramService();
