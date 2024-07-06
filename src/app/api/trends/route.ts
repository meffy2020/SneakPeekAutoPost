import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    try {
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
        const trends = data.default.trendingSearchesDays[0].trendingSearches.map((trend: any) => trend.title.query);
        return NextResponse.json({ trends });
    } catch (error) {
        console.error("Error fetching Google Trends:", error);
        return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 });
    }
}
