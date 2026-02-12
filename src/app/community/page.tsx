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
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleWriteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const { error } = await supabase.from('posts').insert([
      { title: newPost.title, content: newPost.content, author_name: '익명청년' }
    ]);

    if (!error) {
      setIsWriteModalOpen(false);
      setNewPost({ title: '', content: '' });
      fetchPosts(); // 목록 새로고침
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 relative">
      {/* Write Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">글쓰기</h3>
            <form onSubmit={handleWriteSubmit}>
              <input 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="제목을 입력하세요"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
              <textarea 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl mb-6 h-40 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                placeholder="오늘 하루는 어땠나요?"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsWriteModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold">취소</button>
                <button type="submit" className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-100">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="border-b bg-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-teal-600">Youth-Leap</Link>
          <button 
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
          >
            글쓰기
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">커뮤니티</h2>
            <p className="text-gray-500">혼자가 아니에요. 오늘 하루도 함께 살아내 봐요.</p>
          </div>
          <button 
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl text-md font-bold shadow-lg shadow-teal-100 transition-all flex items-center gap-2"
          >
            <span>✏️</span> 오늘의 생존 신고하기
          </button>
        </div>

        {/* Retention Widget: Daily Rituals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { id: 'sun', emoji: '☀️', label: '햇볕 쬐기', count: 124 },
            { id: 'walk', emoji: '🚶', label: '30분 걷기', count: 89 },
            { id: 'read', emoji: '📚', label: '독서하기', count: 42 },
            { id: 'water', emoji: '💧', label: '물 마시기', count: 256 },
          ].map((item) => (
            <div 
              key={item.id} 
              onClick={() => alert(`${item.label} 성공! 오늘도 한 걸음 도약하셨네요.`)}
              className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center shadow-sm hover:border-teal-200 cursor-pointer active:scale-95 transition-all"
            >
              <span className="text-2xl mb-2">{item.emoji}</span>
              <span className="text-sm font-bold text-gray-800">{item.label}</span>
              <span className="text-xs text-teal-600 mt-1">{item.count}명 참여중</span>
            </div>
          ))}
        </div>

        <div className="flex gap-6 border-b border-gray-100 mb-8">
          <button className="pb-4 border-b-2 border-teal-600 text-teal-600 font-bold px-2">전체글</button>
          <button className="pb-4 text-gray-400 font-medium px-2 hover:text-gray-600">인기글</button>
          <button className="pb-4 text-gray-400 font-medium px-2 hover:text-gray-600">정보공유</button>
          <button className="pb-4 text-gray-400 font-medium px-2 hover:text-gray-600">익명상담</button>
        </div>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">불러오는 중...</div>
        ) : (
          <div className="space-y-4">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post.id} className={`bg-white p-6 rounded-2xl border transition-all group ${post.author_name === 'Youth-Leap 큐레이터' ? 'border-blue-100 bg-blue-50/10' : 'border-gray-100 hover:border-teal-100'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {post.author_name === 'Youth-Leap 큐레이터' && <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">큐레이션</span>}
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                  </div>
                  <span className="text-xs bg-gray-50 text-gray-400 px-2 py-1 rounded">{post.author_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <span>👁️</span> {post.views}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-rose-500 transition">
                      <span className="text-lg">❤️</span> {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition">
                      <span className="text-lg">🗨️</span> 댓글
                    </button>
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
