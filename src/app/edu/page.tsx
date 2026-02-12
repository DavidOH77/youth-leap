'use client';

import Link from 'next/link';

const eduPrograms = [
  { id: 1, title: 'K-Digital Training 자바 스프링 부트 개발자 과정', agency: '멀티캠퍼스', period: '6개월', support: '훈련장려금 매월 30만원' },
  { id: 2, title: 'UX/UI 디자인 실무 프로젝트 과정', agency: '제로베이스', period: '4개월', support: '내일배움카드 100% 환급' },
  { id: 3, title: '데이터 분석 준전문가(ADsP) 자격증 취득반', agency: '한국데이터산업진흥원', period: '2개월', support: '교재 및 응시료 지원' },
];

export default function EduPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-teal-600">Youth-Leap</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">맞춤형 국비지원</h2>
          <p className="text-gray-500">어려운 공고문은 저희가 요약해 드릴게요. 나에게 딱 맞는 교육을 찾아보세요.</p>
        </div>

        <div className="space-y-6">
          {eduPrograms.map((edu) => (
            <div key={edu.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-teal-50 text-teal-600 text-xs font-bold rounded mb-2">모집중</span>
                  <h3 className="text-xl font-bold text-gray-800">{edu.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{edu.agency} | 교육기간: {edu.period}</p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-blue-600 font-bold text-sm mb-2">{edu.support}</div>
                  <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition">상세보기</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
