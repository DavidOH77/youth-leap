import Link from 'next/link';

const posts = [
  { id: 1, title: "오늘 처음으로 도서관에 다녀왔어요", author: "익명1", views: 42, likes: 12, time: "2시간 전" },
  { id: 2, title: "단기 재택 알바 정보 공유합니다", author: "익명2", views: 128, likes: 34, time: "5시간 전" },
  { id: 3, title: "공백기가 길어질수록 불안하네요.. 다들 어떠신가요?", author: "익명3", views: 89, likes: 21, time: "8시간 전" },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-teal-600">쉬고 싶지 않아</Link>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold">글쓰기</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8">커뮤니티</h2>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 transition">
              <h3 className="text-lg font-bold mb-2 cursor-pointer hover:text-teal-600">{post.title}</h3>
              <div className="flex items-center text-sm text-gray-400 space-x-4">
                <span>{post.author}</span>
                <span>{post.time}</span>
                <div className="flex items-center space-x-1">
                  <span>👁️</span><span>{post.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>❤️</span><span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
