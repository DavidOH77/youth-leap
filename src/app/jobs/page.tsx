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
      const { data, error } = await supabase
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
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white p-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-xl font-bold text-teal-600">쉬고 싶지 않아</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">부담 없는 일자리</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">정보를 불러오는 중입니다...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.length > 0 ? jobs.map((job) => (
              <a href={job.link_url} key={job.id} target="_blank" rel="noopener noreferrer" 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">모집중</span>
                  <span className="text-sm font-semibold text-gray-900">{job.pay_info}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
              </a>
            )) : (
              <div className="col-span-2 py-20 text-center text-gray-400">
                현재 등록된 공고가 없습니다. 곧 업데이트될 예정입니다.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
