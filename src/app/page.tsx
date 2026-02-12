'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  title: string;
  company: string;
  pay_info: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestJobs() {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('scraped_at', { ascending: false })
        .limit(5);
      
      if (data) setJobs(data);
      setLoading(false);
    }
    fetchLatestJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Top Header - Like FMKorea */}
      <nav className="bg-[#1e293b] text-white shadow-md">
        <div className="max-w-[1200px] mx-auto px-4 h-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-black tracking-tighter text-teal-400 cursor-pointer">YOUTH LEAP</h1>
            <div className="hidden md:flex gap-4 font-bold opacity-90">
              <Link href="/community" className="hover:text-teal-300">자유게시판</Link>
              <Link href="/jobs?type=alba" className="hover:text-teal-300">알바정보</Link>
              <Link href="/jobs?type=career" className="hover:text-teal-300">채용공고</Link>
              <Link href="/edu" className="hover:text-teal-300">국비지원</Link>
            </div>
          </div>
          <div className="flex gap-3 text-xs opacity-70">
            <span>로그인</span>
            <span>회원가입</span>
          </div>
        </div>
      </nav>

      {/* Main Layout Grid */}
      <div className="max-w-[1200px] mx-auto py-6 px-4 grid grid-cols-12 gap-6">
        
        {/* Left Column: Real-time Community & Info */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          
          {/* Hero / Notice */}
          <div className="bg-white border border-gray-200 p-4 rounded shadow-sm text-xs md:text-sm">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <h3 className="font-bold text-gray-800">📌 공지사항</h3>
              <span className="text-[11px] text-gray-400">더보기</span>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between hover:underline cursor-pointer group">
                <span className="text-gray-700 group-hover:text-teal-600">· Youth-Leap 서비스가 정식 오픈했습니다! (2026.02.12)</span>
                <span className="text-gray-400 text-[11px]">15:52</span>
              </li>
              <li className="flex justify-between hover:underline cursor-pointer group">
                <span className="text-gray-700 group-hover:text-teal-600">· [필독] 익명 커뮤니티 이용 가이드라인 안내</span>
                <span className="text-gray-400 text-[11px]">12:00</span>
              </li>
            </ul>
          </div>

          {/* Featured Sections (Alba/Jobs) - High Density UI */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Alba */}
            <div className="bg-white border border-gray-200 rounded">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <span className="text-sm font-bold text-teal-700">⚡ 실시간 알바 공고</span>
                <Link href="/jobs" className="text-[11px] text-gray-400 hover:underline">전체보기</Link>
              </div>
              <div className="p-1 min-h-[200px]">
                {loading ? (
                  <div className="p-10 text-center text-[11px] text-gray-400">데이터 동기화 중...</div>
                ) : (
                  jobs.map((job) => (
                    <Link href={`/jobs/${job.id}`} key={job.id} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer group">
                      <span className="text-sm text-gray-800 truncate pr-4 group-hover:text-teal-600 transition-colors">· {job.title}</span>
                      <span className="text-[11px] text-teal-600 font-bold whitespace-nowrap">{job.pay_info}</span>
                    </Link>
                  ))
                )}
                {!loading && jobs.length === 0 && (
                  <div className="p-10 text-center text-[11px] text-gray-400 text-balance">수집된 공고가 없습니다.<br/>곧 업데이트됩니다.</div>
                )}
              </div>
            </div>

            {/* Quick Education */}
            <div className="bg-white border border-gray-200 rounded">
              <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                <span className="text-sm font-bold text-blue-700">📚 추천 국비 교육</span>
                <Link href="/edu" className="text-[11px] text-gray-400 hover:underline">전체보기</Link>
              </div>
              <div className="p-1">
                {['프론트엔드 개발자', '데이터 분석 기초', 'UX UI 디자인', '쇼핑몰 창업반', '디지털 마케팅'].map((title, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer">
                    <span className="text-sm text-gray-800 truncate pr-4">· {title} 과정</span>
                    <span className="text-[11px] bg-blue-50 text-blue-600 px-1 rounded">모집중</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="hidden md:col-span-4 md:block space-y-6 text-xs lg:text-sm">
          {/* User Profile Box (Login required style) */}
          <div className="bg-white border border-gray-200 p-6 text-center rounded">
            <div className="text-sm text-gray-600 mb-4 font-medium italic">로그인 후 활동해 보세요!</div>
            <button className="w-full py-3 bg-[#1e293b] text-white text-sm font-bold rounded hover:bg-black transition-colors shadow-sm">로그인</button>
            <div className="flex justify-center gap-4 mt-4 text-[11px] text-gray-400 underline underline-offset-2">
              <span>회원가입</span>
              <span>ID/PW 찾기</span>
            </div>
          </div>

          {/* Today's Ritual Sidebar */}
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
            <div className="bg-[#f1f5f9] px-4 py-3 border-b">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter">🚀 오늘의 생존 신고</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {['🚶 걷기', '💧 물 마시기', '📚 독서', '☀️ 광합성'].map(tag => (
                <div key={tag} className="py-2 px-1 border border-gray-100 rounded text-[11px] font-bold text-gray-700 hover:border-teal-500 hover:bg-teal-50/30 cursor-pointer text-center bg-gray-50 transition-all">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 py-8 bg-gray-100 border-t text-center text-[10px] md:text-[11px] text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
        (주) Youth-Leap | 대표: ohyeseong<br />
        © 2026 Youth-Leap. All rights reserved.
      </footer>
    </main>
  );
}
