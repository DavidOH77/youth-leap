'use client';

import CountUp from './CountUp';

export default function StatsDashboard() {
  // 실시간 현황을 나타내는 임의의 데이터 (실제 서비스에서는 API로 연동 가능)
  const stats = {
    todaySuccess: 42,
    totalMatching: 1284,
    activeYouth: 356
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-teal-900 font-black text-lg mb-1 tracking-tight">청년들의 도약을 함께합니다 🚀</h3>
          <p className="text-teal-700 text-xs font-medium opacity-80 leading-relaxed">
            실시간으로 업데이트되는 청년 취업 성공 현황입니다.<br/>
            사회적 가치를 실현하는 Youth Leap의 여정에 함께하세요.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div className="text-center">
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">오늘 취업 성공</p>
            <p className="text-2xl font-black text-teal-900">
              <CountUp end={stats.todaySuccess} />
              <span className="text-sm ml-1 font-bold">명</span>
            </p>
          </div>
          <div className="text-center border-l border-teal-100 pl-4 md:pl-8">
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">누적 매칭 수</p>
            <p className="text-2xl font-black text-teal-900">
              <CountUp end={stats.totalMatching} />
              <span className="text-sm ml-1 font-bold">건</span>
            </p>
          </div>
          <div className="hidden md:block text-center border-l border-teal-100 pl-8">
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">활동 중인 청년</p>
            <p className="text-2xl font-black text-teal-900">
              <CountUp end={stats.activeYouth} />
              <span className="text-sm ml-1 font-bold">명</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
