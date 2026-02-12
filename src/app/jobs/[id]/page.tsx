'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  title: string;
  company: string;
  pay_info: string;
  tags: string[];
  link_url: string;
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setJob(data);
      setLoading(false);
    }
    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-sm font-bold animate-pulse">공고를 읽어오는 중...</div>;
  if (!job) return <div className="p-20 text-center">존재하지 않는 공고입니다.</div>;

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      <nav className="bg-[#1e293b] text-white py-3 px-4 shadow-md sticky top-0 z-50 border-b border-teal-900/40">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <Link href="/jobs" className="text-teal-400 font-bold text-sm">← 목록으로</Link>
          <span className="text-[11px] font-black uppercase tracking-widest text-teal-500">Job Detail View</span>
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto py-8 px-4">
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden mb-6">
          <div className="p-8 border-b bg-gray-50/30">
            <div className="flex gap-2 mb-4">
              {job.tags?.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white border border-gray-200 text-gray-500 text-[10px] font-bold rounded">#{tag}</span>
              ))}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{job.title}</h2>
            <p className="text-xl font-bold text-teal-600 mb-6">{job.company}</p>
            
            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-inner">
               <div className="border-r pr-4">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">급여조건</p>
                 <p className="text-sm font-black text-gray-800">{job.pay_info}</p>
               </div>
               <div className="pl-4">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">근무형태</p>
                 <p className="text-sm font-black text-gray-800">재택/유연</p>
               </div>
            </div>
          </div>

          <div className="p-10 space-y-12 min-h-[500px]">
            <section>
              <h3 className="text-base font-black text-gray-900 mb-4 border-l-4 border-teal-500 pl-3">업무 내용</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                 본 공고는 Youth-Leap 데이터 수집 시스템에 의해 수집된 공고입니다.<br/><br/>
                 주요 업무:<br/>
                 · 데이터 라벨링 및 검수 업무 보조<br/>
                 · 온라인 콘텐츠 모니터링 및 리포팅<br/>
                 · 기초 문서 작성 및 데이터 정리
              </p>
            </section>

            <section>
               <h3 className="text-base font-black text-gray-900 mb-4 border-l-4 border-teal-500 pl-3">지원 자격</h3>
               <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                 <li>성실하고 꼼꼼하게 작업을 수행할 수 있는 청년</li>
                 <li>기본적인 컴퓨터 및 스마트폰 활용 가능자</li>
                 <li>공백기나 휴식기에 관계없이 새롭게 시작하고 싶은 의지</li>
               </ul>
            </section>
          </div>

          <div className="p-8 border-t bg-[#f8f9fa] flex flex-col items-center gap-4">
            <a 
              href={job.link_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-teal-600 text-white text-center rounded-xl font-black shadow-lg shadow-teal-100 hover:bg-teal-700 transition-all text-lg"
            >
              원문 사이트에서 지원하기
            </a>
            <p className="text-[11px] text-gray-400 italic font-medium">※ 지원 시 사이트 이동이 발생할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
