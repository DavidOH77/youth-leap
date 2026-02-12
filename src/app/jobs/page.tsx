'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  title: string;
  company: string;
  pay_info: string;
  tags: string[];
  link_url: string;
  scraped_at: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('scraped_at', { ascending: false });
      if (data) setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      <nav className="bg-[#1e293b] text-white py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tighter text-teal-400">YOUTH LEAP</Link>
          <div className="flex gap-4 text-sm font-bold opacity-80">
            <Link href="/community">커뮤니티</Link>
            <span className="text-teal-400">일자리</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto py-8 px-4 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-9 bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-[#f8f9fa] flex justify-between items-center">
            <h2 className="text-base font-black text-gray-800 tracking-tight">부담 없는 일자리 목록</h2>
          </div>

          <div className="hidden md:flex items-center px-4 py-2 bg-[#f1f5f9] border-b text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
            <div className="flex-1">공고제목 / 기업명</div>
            <div className="w-24 text-center">급여</div>
            <div className="w-24 text-center">등록일</div>
          </div>

          {loading ? (
            <div className="p-20 text-center text-sm font-bold text-gray-400">Loading Jobs...</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <div key={job.id} className="flex flex-col md:flex-row md:items-center px-4 py-3.5 hover:bg-[#f8fafc] border-l-4 border-l-transparent hover:border-l-teal-500 transition-all">
                  <div className="flex-1 min-w-0 pr-4">
                    <Link href={`/jobs/${job.id}`} className="text-[#334155] text-sm font-black hover:text-teal-600 block truncate mb-1">
                      {job.title}
                    </Link>
                    <span className="text-[11px] text-gray-400 font-bold">{job.company}</span>
                  </div>
                  <div className="mt-2 md:mt-0 w-24 text-center">
                    <span className="text-xs font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{job.pay_info}</span>
                  </div>
                  <div className="hidden md:block w-24 text-center text-[11px] text-gray-400 font-mono italic">
                    {new Date(job.scraped_at).toLocaleDateString().slice(5)}
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <div className="p-20 text-center text-gray-400 text-sm italic">현재 매칭 가능한 일자리를 찾고 있습니다.</div>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:col-span-3 md:block space-y-4">
           <div className="bg-[#1e293b] p-6 rounded-lg text-white shadow-xl">
             <h4 className="text-teal-400 font-black text-xs mb-4 uppercase tracking-widest">Guide</h4>
             <p className="text-[11px] leading-relaxed opacity-80">
               모든 공고는 Youth-Leap 팀이 청년들에게 적합한지 1차로 검수한 공고입니다. 안심하고 지원하세요.
             </p>
           </div>
        </div>
      </div>
    </main>
  );
}
