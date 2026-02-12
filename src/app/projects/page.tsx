'use client';

import Link from 'next/link';

const projects = [
  { id: 1, title: 'AI 에이전트를 활용한 쇼핑몰 자동화 프로젝트', category: '개발/IT', status: '모집중', members: '2/4' },
  { id: 2, title: '노코드 툴로 만드는 로컬 맛집 지도 서비스', category: '기획/마케팅', status: '곧마감', members: '3/3' },
  { id: 3, title: '디자인 포트폴리오 스터디 (취준생 환영)', category: '디자인', status: '모집중', members: '1/6' },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-teal-600">Youth-Leap</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">팀 프로젝트</h2>
            <p className="text-gray-500">이력서 공백, 실무 프로젝트 경험으로 함께 채워나가요.</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-md font-bold shadow-lg shadow-purple-100 transition-all">
            팀원 모집글 올리기
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 transition">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">{project.category}</span>
              <h3 className="text-lg font-bold mt-4 mb-2 text-gray-800 leading-tight">{project.title}</h3>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <span className="text-sm font-medium text-gray-400">참여인원 {project.members}</span>
                <span className={`text-xs font-bold ${project.status === '곧마감' ? 'text-rose-500' : 'text-blue-500'}`}>{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
