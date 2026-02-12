'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Job {
  id: string;
  title: string;
  company: string;
  pay_info: string;
  content: string;
  tags: string[];
  link_url: string;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setJob(data);
      setLoading(false);
    }
    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center py-20">공고를 읽어오는 중입니다...</div>;
  if (!job) return <div className="text-center py-20">존재하지 않는 공고입니다.</div>;

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b p-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/jobs" className="text-teal-600 font-bold">← 목록으로 돌아가기</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 border-b pb-8">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm font-bold rounded-full mb-4">채용 중</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{job.title}</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <span className="font-bold text-gray-900">{job.company}</span>
            <span>|</span>
            <span>{job.pay_info}</span>
          </div>
        </div>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-12">
          <h4 className="text-lg font-bold text-gray-900 mb-4">상세 업무 내용</h4>
          <p>{job.content || '본 공고는 수집된 정보이며, 상세 내용은 원문 링크를 참조해 주세요.'}</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-10">
          <h4 className="font-bold mb-4">태그 정보</h4>
          <div className="flex flex-wrap gap-2">
            {job.tags?.map(tag => (
              <span key={tag} className="bg-white px-3 py-1 border rounded-lg text-sm text-gray-600">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="sticky bottom-8">
          <a href={job.link_url} target="_blank" rel="noopener noreferrer" 
            className="block w-full bg-teal-600 text-white text-center py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-teal-700 transition">
            공고 원문 보기 (지원하기)
          </a>
        </div>
      </div>
    </main>
  );
}
