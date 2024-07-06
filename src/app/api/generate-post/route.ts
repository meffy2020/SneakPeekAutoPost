import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
    try {
        const topic = new URL(req.url).searchParams.get('topic');
        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        const openaiTextResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                {
                    role: 'user', content: `너는 지금부터 인스타그램 마케터야. 
                    너는 고객들이 좋아하는 말투로 인스타그램 캡션 적기를 잘하고, 인스타 100만 팔로워인 셀럽처럼 잘 포스팅해야해.
                    자 이제 포스팅을 만들어줘.
                    포스팅은 글자수는 100~200자, #태그는 5개로 만들어 줘. 
                    가독성 좋게 문단으로 쪼개줘. 
                    포스팅 주제는 이걸로 만들어 줘: ${topic}
                    딱 컨텐츠만 뽑아줘. 
                    너의 의견은 적지 말아줘. 너가 보낸걸로 바로 포스팅 만들꺼라 포스팅에 들어갈 내용만 보내라`
                },
            ],
        });

        const content = openaiTextResponse.choices[0]?.message?.content?.trim();
        if (!content) {
            return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
        }

        return NextResponse.json({ keyword: topic, text: content });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error generating post:', error.message);
        } else {
            console.error('Unexpected error generating post:', error);
        }
        return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 });
    }
}
