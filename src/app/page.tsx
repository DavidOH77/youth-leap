import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-teal-600">쉬고 싶지 않아</h1>
          <div className="space-x-6 text-sm font-medium text-gray-600">
            <Link href="/community" className="hover:text-teal-600 transition">커뮤니티</Link>
            <Link href="/jobs" className="hover:text-teal-600 transition">알바/구인</Link>
            <Link href="/edu" className="hover:text-teal-600 transition">국비지원</Link>
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
            조금 쉬었을 뿐,<br />
            <span className="text-teal-600">멈추고 싶은 건 아니니까.</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            '쉬고 싶지 않아'는 쉬었음 청년들이 다시 사회와 연결되고,<br />
            자신만의 속도로 일상을 되찾을 수 있도록 돕는 커뮤니티 플랫폼입니다.
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

      {/* Grid Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6 text-2xl">🤝</div>
              <h3 className="text-xl font-bold mb-3">익명 커뮤니티</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                거창한 스펙 이야기 대신, 오늘 하루 어떻게 보냈는지 편하게 이야기 나눠요.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-2xl">🌱</div>
              <h3 className="text-xl font-bold mb-3">소프트 랜딩 일자리</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                재택근무, 단기 업무 등 심리적 부담이 적은 공고부터 차근차근 시작해 보세요.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6 text-2xl">📚</div>
              <h3 className="text-xl font-bold mb-3">맞춤형 국비지원</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                복잡한 정책 공고는 이제 그만. 나에게 꼭 필요한 교육 정보만 쏙쏙 골라드려요.
              </p>
            </div>
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
