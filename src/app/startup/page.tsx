'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface SideHustle {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  initial_cost: string;
  description: string;
}

export default function StartupPage() {
  const [items, setItems] = useState<SideHustle[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackItems: SideHustle[] = [
    { id: '1', title: '전자책(PDF) 출판하기', category: '지식판매', difficulty: '하', initial_cost: '0원', description: '나만의 노하우를 글로 정리해 크몽/숨고에 판매해 보세요.' },
    { id: '2', title: 'AI 아트 굿즈 제작', category: '창작', difficulty: '중', initial_cost: '5만원 이하', description: '미드저니로 그린 그림을 티셔츠나 스티커로 제작해 판매합니다.' },
    { id: '3', title: '노코드 앱 제작 대행', category: '기술서비스', difficulty: '상', initial_cost: '0원', description: '버블이나 소프트르를 활용해 간단한 앱을 만들어주고 수익을 창출하세요.' }
  ];

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('side_hustles').select('*');
      if (data && data.length > 0) setItems(data);
      else setItems(fallbackItems);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b bg-white p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-teal-600">Youth-Leap</Link>
          <div className="flex gap-4">
             <Link href="/community" className="text-sm text-gray-600">커뮤니티</Link>
             <Link href="/jobs" className="text-sm text-gray-600">일자리</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">작게 시작하는 나만의 비즈니스</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            큰 자본 없이도 시작할 수 있는 부업과 창업 아이템을 소개합니다.<br />
            실패해도 괜찮은 샌드박스에서 당신의 아이디어를 검증받아 보세요.
          </p>
        </div>

        {/* Categories / Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {items.map((item) => (
            <div key={item.id} className="group p-8 rounded-3xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-teal-100 hover:border-teal-200 transition-all duration-300">
              <span className="inline-block px-3 py-1 bg-white text-teal-600 text-xs font-bold rounded-full border border-teal-50 mb-6">{item.category}</span>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.description}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                <div className="text-xs text-gray-400">난이도 <span className="text-teal-600 font-bold">{item.difficulty}</span></div>
                <div className="text-xs text-gray-400">초기비용 <span className="text-blue-600 font-bold">{item.initial_cost}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Idea Sandbox Call-to-action */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-[2rem] p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-white">아이디어 샌드박스</h3>
          <p className="mb-8 text-teal-50 opacity-90">당신의 아이디어를 익명으로 공유하고 동료들의 피드백을 받아보세요.</p>
          <button className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-black hover:bg-teal-50 transition shadow-lg">아이디어 등록하러 가기</button>
        </div>
      </div>
    </main>
  );
}
