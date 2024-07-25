import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic');

  if (!topic) {
    return NextResponse.json({ error: '주제가 제공되지 않았습니다' }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user', content: `너는 지금부터 인스타그램 마케터야.
          포스팅 주제는 이걸로 만들어 줘: ${topic}
          딱 컨텐츠만 뽑아줘.
          조건을 모두 만족하는 게시물을 만들어줘 
          조건0. 맨위에 ${topic} 적지마 바로 본론으로 시작해
          조건1. 너는 고객들이 좋아하는 말투를 사용한다.
          조건2. 너는 인스타그램 캡션 적기를 잘한다. 
          조건3. 인스타 100만 팔로워인 셀럽처럼 포스팅을 잘해
          조건4. 게시글은 100자 이상
          조건5. 하지만 200장 이하
          조건6. 제일 마지막에 #태그 5개
          조건7. 가독성 좋음
          조건8. 문단으로 작성해줘
          조건9. 이모지 3개 이상
          조건10. 이모지 6개 이하
          조건11. 너의 의견은 필요하지 않아. 게시글 내용만 적어줘. 너가 작성해준 그대로 인스타그램 게시글로 올릴거야`
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ keyword: topic, text: content });
  } catch (error) {
    console.error('Error generating post:', error);
    return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 });
  }
}
