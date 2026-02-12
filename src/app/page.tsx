import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-teal-600">Youth-Leap</h1>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <Link href="/community" className="hover:text-teal-600 transition">커뮤니티</Link>
            <Link href="/jobs?type=alba" className="hover:text-teal-600 transition">부담없는 알바</Link>
            <Link href="/jobs?type=career" className="hover:text-teal-600 transition">커리어 도약</Link>
            <Link href="/edu" className="hover:text-teal-600 transition">국비지원</Link>
            <Link href="/projects" className="hover:text-teal-600 transition">팀프로젝트</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-600 text-sm font-semibold mb-6">
            유스리프(Youth Leap) 프로젝트
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            내일을 위한 준비,<br />
            <span className="text-teal-600">Youth-Leap과 함께 도약하세요.</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Youth-Leap은 청년들이 다시 사회와 건강하게 연결되고,<br />
            자신만의 커리어를 설계할 수 있도록 돕는 플랫폼입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-100">
              오늘의 생존 신고하기
            </button>
            <button className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
              부담 없는 알바 찾기
            </button>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">다시 사회와 연결되는 3단계 로드맵</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {/* Step 1 */}
            <div className="flex-1 bg-white p-8 rounded-2xl border-2 border-teal-100 relative z-10">
              <div className="text-teal-600 font-bold mb-2">STEP 01. 마음 열기</div>
              <h4 className="text-xl font-bold mb-4">정서적 공감 & 커뮤니티</h4>
              <p className="text-gray-600 text-sm">익명으로 '오늘의 생존 신고'를 남기고 다른 청년들과 소통하며 혼자가 아님을 확인하세요.</p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block text-teal-200 text-3xl">→</div>
            {/* Step 2 */}
            <div className="flex-1 bg-white p-8 rounded-2xl border-2 border-blue-100 relative z-10">
              <div className="text-blue-600 font-bold mb-2">STEP 02. 감 잡기</div>
              <h4 className="text-xl font-bold mb-4">단기 알바 & 국비 교육</h4>
              <p className="text-gray-600 text-sm">부담 없는 재택 알바나 맞춤형 국비 교육으로 실무 감각을 서서히 되찾아보세요.</p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block text-blue-200 text-3xl">→</div>
            {/* Step 3 */}
            <div className="flex-1 bg-white p-8 rounded-2xl border-2 border-purple-100 relative z-10">
              <div className="text-purple-600 font-bold mb-2">STEP 03. 도약하기</div>
              <h4 className="text-xl font-bold mb-4">팀 프로젝트 & 취창업</h4>
              <p className="text-gray-600 text-sm">직무 전환 프로젝트나 창업 멘토링을 통해 나만의 커리어를 다시 시작하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career & Startup Support */}
      <section className="py-16 bg-white border-t border-gray-50">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="p-10 bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100">
            <h3 className="text-2xl font-bold mb-4 text-purple-900">직무 전환 팀 프로젝트</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">현직자 멘토와 함께 실제 프로젝트를 수행하며 이력서의 공백을 실무 경험으로 채웁니다.</p>
            <button className="text-purple-600 font-bold hover:underline">현재 모집 중인 프로젝트 보기 →</button>
          </div>
          <div className="p-10 bg-gradient-to-br from-orange-50 to-white rounded-3xl border border-orange-100">
            <h3 className="text-2xl font-bold mb-4 text-orange-900">1인 창업 및 부업 준비</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">거창한 창업이 아닌, 나만의 작은 비즈니스를 시작할 수 있도록 실질적인 도구와 교육을 지원합니다.</p>
            <Link href="/startup" className="text-orange-600 font-bold hover:underline">창업 가이드라인 읽어보기 →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t text-center text-gray-400 text-sm">
        <p>© 2026 유스리프(Youth Leap). All rights reserved.</p>
      </footer>
    </main>
  );
}
