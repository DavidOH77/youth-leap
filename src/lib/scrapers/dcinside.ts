import axios from 'axios';
import * as cheerio from 'cheerio';

export interface DCPost {
  title: string;
  link: string;
  gallery: string;
}

export async function scrapeDCInside(galleryId: string): Promise<DCPost[]> {
  const url = `https://gall.dcinside.com/mgallery/board/lists/?id=${galleryId}&exception_mode=recommend`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const posts: DCPost[] = [];

    $('.ub-content.us-post').each((i, el) => {
      if (i > 5) return; // 최신 5개만 수집
      const title = $(el).find('.tit a').text().trim();
      const link = 'https://gall.dcinside.com' + $(el).find('.tit a').attr('href');
      
      if (title) {
        posts.push({ title, link, gallery: galleryId });
      }
    });

    return posts;
  } catch (error) {
    console.error(`DC ${galleryId} 수집 실패:`, error);
    return [];
  }
}
