import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword');

    const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;

    try {
        const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: apiKey,
                q: keyword,
                image_type: 'photo',
            },
        });

        const json = response.data;

        if (json.errors) {
            return NextResponse.json({ error: json.errors }, { status: 500 });
        }

        return NextResponse.json(json);
    } catch (error: any) {
        console.error('Error fetching image from Pixabay:', error.message);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
