'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Mentor {
  id: number;
  name: string;
  company: string;
  position: string;
  description: string;
  tags: string[];
}

export default function MentoringPage() {
  const [mentors] = useState<Mentor[]>([
    {
      id: 1,
      name: "김현우",
      company: "토스",
      position: "Product Designer",
      description: "비전공자 출신 디자이너의 포트폴리오 전략을 공유합니다.",
      tags: ["UI/UX", "커리어 전환", "포트폴리오"]
    },
    {
      id: 2,
      name: "이지민",
      company: "당근",
      position: "Frontend Developer",
      description: "깔끔한 코드와 가독성 좋은 포트폴리오 구성을 도와드려요.",
      tags: ["React", "신입 개발자", "기술 면접"]
    },
    {
      id: 3,
      name: "박준서",
      company: "배달의민족",
      position: "Backend Developer",
      description: "기술적 고민이 녹아든 포트폴리오로 차별점을 만들어봅시다.",
      tags: ["Node.js", "대규모 서비스", "백엔드"]
    },
    {
      id: 4,
      name: "최유리",
      company: "무신사",
      position: "Service Planner",
      description: "데이터를 기반으로 설득력 있는 기획안 작성을 도와드립니다.",
      tags: ["서비스 기획", "포트폴리오", "실무 역량"]
    }
  ]);

  const [form, setForm] = useState({
    mentorId: '',
    title: '',
    link: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('리뷰 요청이 성공적으로 접수되었습니다. 멘토가 확인 후 연락드릴 예정입니다.');
    setForm({ mentorId: '', title: '', link: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Top Header */}
      <nav className="bg-[#1e293b] text-white shadow-md">
        <div className="max-w-[1200px] mx-auto px-4 h-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-black tracking-tighter text-teal-400 cursor-pointer">YOUTH LEAP</Link>
            <div className="hidden md:flex gap-4 font-bold opacity-90">
              <Link href="/community" className="hover:text-teal-300">자유게시판</Link>
              <Link href="/jobs" className="hover:text-teal-300">채용공고</Link>
              <Link href="/mentoring" className="text-teal-400">멘토링</Link>
              <Link href="/edu" className="hover:text-teal-300">국비지원</Link>
            </div>
          </div>
          <div className="flex gap-3 text-xs opacity-70">
            <span>로그인</span>
            <span>회원가입</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto py-12 px-4">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            포트폴리오 <span className="text-teal-600">오픈 리뷰</span>
          </h1>
          <p className="text-gray-500 font-medium">현직자 멘토들에게 직접 듣는 당신의 커리어 조언</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto py-10 px-4 grid grid-cols-12 gap-8">
        
        {/* Left: Mentor List */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              👨‍🏫 추천 멘토 목록
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-teal-600 font-bold">{mentor.company} · {mentor.position}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-400 opacity-20"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {mentor.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-400 rounded-md border border-gray-100 uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Review Request Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border-2 border-teal-600 shadow-xl sticky top-6">
            <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              📝 리뷰 요청하기
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">멘토 선택</label>
                <select 
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 font-medium"
                  value={form.mentorId}
                  onChange={(e) => setForm({...form, mentorId: e.target.value})}
                >
                  <option value="">멘토를 선택해주세요</option>
                  {mentors.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.company})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">요청 제목</label>
                <input 
                  type="text" 
                  required
                  placeholder="예: 3년차 서비스 기획 포트폴리오 리뷰 부탁드립니다."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 font-medium"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">포트폴리오 링크 (Notion, PDF 등)</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 font-medium"
                  value={form.link}
                  onChange={(e) => setForm({...form, link: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">하고 싶은 말</label>
                <textarea 
                  rows={4}
                  placeholder="구체적으로 고민되는 부분을 적어주시면 좋습니다."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 font-medium resize-none"
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-teal-600 text-white text-sm font-black rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
              >
                무료 리뷰 요청하기
              </button>
              <p className="text-[10px] text-center text-gray-400 font-medium">
                * 멘토의 일정에 따라 반려되거나 시간이 소요될 수 있습니다.
              </p>
            </form>
          </div>
        </div>

      </div>

      <footer className="mt-20 py-10 bg-gray-100 border-t text-center text-[11px] text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
        (주) Youth-Leap | 대표: ohyeseong<br />
        © 2026 Youth-Leap. All rights reserved.
      </footer>
    </main>
  );
}
