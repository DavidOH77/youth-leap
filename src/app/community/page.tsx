'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  author_name: string;
  views: number;
  likes: number;
  created_at: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleWriteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const { error } = await supabase.from('posts').insert([
      { 
        title: newPost.title, 
        content: newPost.content, 
        author_name: '익명청년',
        views: 0,
        likes: 0
      }
    ]);

    if (!error) {
      setIsWriteModalOpen(false);
      setNewPost({ title: '', content: '' });
      fetchPosts();
    }
  };

  const handleVote = async (id: string, currentLikes: number) => {
    const { error } = await supabase
      .from('posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);
    if (!error) fetchPosts();
  };

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      {/* Write Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="bg-[#1e293b] p-4 text-white font-bold flex justify-between">
              <span>새로운 글 작성</span>
              <button onClick={() => setIsWriteModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleWriteSubmit} className="p-6">
              <input 
                className="w-full p-3 border border-gray-200 rounded mb-4 text-sm focus:border-teal-500 outline-none"
                placeholder="제목을 입력하세요 (최대 50자)"
                maxLength={50}
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
              <textarea 
                className="w-full p-3 border border-gray-200 rounded mb-6 h-64 text-sm focus:border-teal-500 outline-none resize-none"
                placeholder="내용을 입력하세요. 불쾌감을 주는 표현은 제재될 수 있습니다."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setIsWriteModalOpen(false)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded text-sm font-bold">취소</button>
                <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded text-sm font-bold shadow-md hover:bg-teal-700">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-[#1e293b] text-white shadow-md border-b border-teal-900/30 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-black tracking-tighter text-teal-400">YOUTH LEAP</Link>
            <div className="hidden md:flex gap-6 text-sm font-bold">
              <Link href="/community" className="text-white border-b-2 border-teal-400 pb-1">자유게시판</Link>
              <Link href="/jobs" className="opacity-70 hover:opacity-100">일자리정보</Link>
              <Link href="/edu" className="opacity-70 hover:opacity-100">국비지원</Link>
            </div>
          </div>
          <button onClick={() => setIsWriteModalOpen(true)} className="bg-teal-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-teal-500 transition-colors">글쓰기</button>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto py-6 px-4 grid grid-cols-12 gap-6">
        {/* Main Board */}
        <div className="col-span-12 md:col-span-9 bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-[#f8f9fa] p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-black text-gray-800">자유게시판 <span className="text-gray-400 text-xs font-normal ml-2">청년들의 솔직한 이야기</span></h2>
          </div>

          {/* List Header */}
          <div className="flex items-center px-4 py-2 bg-[#f1f5f9] border-b text-[11px] font-bold text-gray-500 uppercase tracking-tight">
            <div className="flex-1">제목</div>
            <div className="w-24 text-center">글쓴이</div>
            <div className="w-20 text-center">날짜</div>
            <div className="w-16 text-center">조회</div>
            <div className="w-16 text-center">추천</div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400 italic">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mb-4"></div>
               데이터를 불러오는 중입니다...
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center px-4 py-2.5 hover:bg-[#f8fafc] cursor-pointer transition-all border-l-4 border-l-transparent hover:border-l-teal-500">
                  <div className="flex-1 truncate pr-4">
                    <Link href={`/community/${post.id}`} className="text-[#334155] text-sm font-semibold hover:text-teal-600">
                      {post.title}
                    </Link>
                    {post.likes > 5 && <span className="ml-2 text-rose-500 text-[10px] font-black underline uppercase">HOT</span>}
                  </div>
                  <div className="hidden md:block w-24 text-center text-[12px] text-gray-600 font-medium">익명</div>
                  <div className="hidden md:block w-20 text-center text-[11px] text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                  </div>
                  <div className="hidden md:block w-16 text-center text-[11px] text-gray-400 font-mono">{post.views}</div>
                  <div className="hidden md:block w-16 text-center text-[11px] font-bold text-teal-600 font-mono">{post.likes}</div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="py-20 text-center text-gray-400 text-sm italic">첫 번째 주인공이 되어 글을 남겨보세요.</div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden md:col-span-3 md:block space-y-4">
          <div className="bg-white border border-gray-300 p-5 rounded shadow-sm">
            <h4 className="text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest border-b pb-2">🔥 오늘의 인기글</h4>
            <div className="space-y-3">
              {posts.slice(0, 5).map((p, i) => (
                <Link href={`/community/${p.id}`} key={p.id} className="block text-[12px] text-gray-700 truncate hover:text-teal-600 hover:underline">
                   <span className="text-gray-300 mr-2">{i+1}.</span>{p.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-[#1e293b] p-6 rounded-lg text-white shadow-inner">
            <p className="text-xs font-bold text-teal-400 mb-2">Retention Tip 💡</p>
            <p className="text-[11px] leading-relaxed opacity-80 italic">"매일 10분, 나를 위한 기록이 도약의 첫걸음이 됩니다."</p>
          </div>
        </div>
      </div>
    </main>
  );
}
