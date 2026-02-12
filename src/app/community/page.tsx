'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  title: string;
  author_name: string;
  views: number;
  likes: number;
  created_at: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-teal-600">쉬고 싶지 않아</Link>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold">글쓰기</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8">커뮤니티</h2>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">불러오는 중...</div>
        ) : (
          <div className="space-y-4">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 transition">
                <h3 className="text-lg font-bold mb-2 cursor-pointer hover:text-teal-600">{post.title}</h3>
                <div className="flex items-center text-sm text-gray-400 space-x-4">
                  <span>{post.author_name}</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-1">
                    <span>👁️</span><span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>❤️</span><span>{post.likes}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white p-20 rounded-xl text-center border border-dashed border-gray-200 text-gray-400">
                첫 번째 생존 신고를 남겨보세요.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
