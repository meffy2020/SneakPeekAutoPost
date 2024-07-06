import { NextResponse } from 'next/server';
import axios from 'axios';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    // Google Trends에서 한국 데이터 가져오기
    const response = await axios.get('https://trends.google.com/trends/api/dailytrends', {
      params: {
        hl: 'ko',
        geo: 'KR',
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = JSON.parse(response.data.slice(5)); // ')]}\',\n' 제거
    const keyword = data.default.trendingSearchesDays[0].trendingSearches[0].title.query;

    console.log('Keyword:', keyword);

    // OpenAI에서 텍스트 생성하기
    const openaiTextResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `너는 지금부터 인스타그램 마케터야. 
        너는 고객들이 좋아하는 말투로 인스타그램 캡션 적기를 잘하고, 인스타 100만 팔로워인 셀럽처럼 잘 포스팅해야해.

        자 이제 포스팅을 만들어줘.

        포스팅은 글자수는 100~200자, #태그는 5개로 만들어 줘. 
        가독성 좋게 문단으로 쪼개줘. 

        포스팅 주제는 이걸로 만들어 줘: ${keyword}

        

        딱 컨텐츠만 뽑아줘. 
        너의 의견은 적지 말아줘. 너가 보낸걸로 바로 포스팅 만들꺼라 포스팅에 들어갈 내용만 보내라` },
      ],
    });
    const text = openaiTextResponse.choices[0].message.content.trim();

    return NextResponse.json({ keyword, text });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return NextResponse.error();
  }
}
