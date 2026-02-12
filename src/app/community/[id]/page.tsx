'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  author_name: string;
  likes: number;
  views: number;
  created_at: string;
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      // 조회수 증가 로직
      await supabase.rpc('increment_views', { post_id: id });
      
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setPost(data);
      setLoading(false);
    }
    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-sm font-bold text-teal-600 animate-pulse">본문을 읽어오는 중...</div>;
  if (!post) return <div className="p-20 text-center">존재하지 않는 게시글입니다.</div>;

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      <nav className="bg-[#1e293b] text-white py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto flex items-center gap-4">
          <Link href="/community" className="text-teal-400">← 뒤로가기</Link>
          <h1 className="text-sm font-bold truncate">{post.title}</h1>
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto py-8 px-4">
        <div className="bg-white border border-gray-300 rounded overflow-hidden shadow-sm">
          <div className="p-6 border-b bg-gray-50/50">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{post.title}</h2>
            <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              <div className="flex gap-4">
                <span>{post.author_name}</span>
                <span>{new Date(post.created_at).toLocaleString()}</span>
              </div>
              <div className="flex gap-3">
                <span>조회 {post.views}</span>
                <span className="text-teal-600">추천 {post.likes}</span>
              </div>
            </div>
          </div>
          
          <div className="p-10 text-gray-800 leading-relaxed text-[15px] whitespace-pre-wrap min-h-[400px]">
            {post.content}
          </div>

          <div className="p-6 border-t bg-gray-50 flex justify-center gap-4">
            <button className="px-10 py-3 bg-white border-2 border-gray-200 rounded-lg font-bold text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center gap-2 shadow-sm">
              <span className="text-xl">👍</span> 추천하기
            </button>
            <button className="px-10 py-3 bg-white border-2 border-gray-200 rounded-lg font-bold text-gray-600 hover:border-rose-500 hover:text-rose-600 transition-all flex items-center gap-2 shadow-sm">
              <span className="text-xl">👎</span> 비추천
            </button>
          </div>
        </div>

        {/* Dummy Comments Section for UI Flow */}
        <div className="mt-6 bg-white border border-gray-300 rounded shadow-sm">
          <div className="p-4 border-b font-bold text-sm bg-[#f8f9fa]">댓글 <span className="text-teal-600">0</span></div>
          <div className="p-20 text-center text-gray-400 text-xs italic">등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>
          <div className="p-4 bg-gray-50 border-t">
            <textarea className="w-full p-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 h-24" placeholder="로그인 후 댓글을 남길 수 있습니다."></textarea>
            <div className="flex justify-end mt-2">
              <button className="px-6 py-2 bg-gray-900 text-white rounded text-[11px] font-bold">등록</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
