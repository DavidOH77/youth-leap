import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import { scrapeDCInside } from './dcinside';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runEngine() {
  console.log('종합 데이터 수집 엔진 가동 중...');

  // 1. 알바 정보 수집
  try {
    const response = await axios.get('https://www.albamon.com/search?keyword=%EC%9E%AC%ED%83%9D', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(response.data);
    const jobs: any[] = [];
    $('.g-item').each((i, el) => {
      if (i > 5) return;
      jobs.push({
        title: $(el).find('.title').text().trim(),
        company: $(el).find('.corp').text().trim(),
        pay_info: $(el).find('.pay').text().trim(),
        link_url: 'https://albamon.com' + $(el).find('a').attr('href'),
        tags: ['재택', '자동수집'],
        is_active: true,
        scraped_at: new Date().toISOString()
      });
    });
    if (jobs.length > 0) await supabase.from('jobs').insert(jobs);
    console.log('알바 정보 업데이트 완료.');
  } catch (e) { console.error('알바 수집 실패'); }

  // 2. 디시인사이드 정보글 수집 (커뮤니티용)
  const dcPosts = await scrapeDCInside('jungsogallery'); // 중소기업 갤러리
  if (dcPosts.length > 0) {
    const communityPosts = dcPosts.map(p => ({
      title: `[외부정보] ${p.title}`,
      content: `출처: 디시인사이드 ${p.gallery}\n바로가기: ${p.link}`,
      author_name: '정보봇',
      views: Math.floor(Math.random() * 100)
    }));
    await supabase.from('posts').insert(communityPosts);
    console.log('디시인사이드 정보글 업데이트 완료.');
  }
}

runEngine();
