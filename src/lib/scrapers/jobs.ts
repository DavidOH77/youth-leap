/**
 * 구인 정보 스크래퍼 초안 (youth-leap/src/lib/scrapers/jobs.ts)
 * 실제 서비스 시에는 전용 라이브러리(Playwright 등)를 사용합니다.
 */

export interface JobItem {
  title: string;
  company: string;
  link: string;
  tags: string[];
}

export async function scrapeJobData(): Promise<JobItem[]> {
  // 실제 구현 시: 
  // 1. 알바몬/잡코리아 검색 결과 URL 요청
  // 2. HTML 파싱 (Cheerio 등)
  // 3. '쉬었음 청년'에게 적합한 키워드 필터링
  
  return [
    {
      title: "[재택] 간단한 텍스트 라벨링 아르바이트",
      company: "(주)데이터웍스",
      link: "https://example.com/job/1",
      tags: ["재택", "단기", "초보가능"]
    },
    {
      title: "오전 4시간 서점 도서 정리 보조",
      company: "몽글문고",
      link: "https://example.com/job/2",
      tags: ["파트타임", "오전", "비대면선호"]
    }
  ];
}
