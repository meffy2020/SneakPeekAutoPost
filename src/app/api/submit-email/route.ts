import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

const sheets = google.sheets('v4');

const creds = JSON.parse(process.env.GOOGLE_PRIVATE_KEY!);
const auth = new google.auth.GoogleAuth({
    credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: creds.privateKey.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log('GOOGLE_PRIVATE_KEY:', creds.privateKey.replace(/\\n/g, '\n'));


export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const client = await auth.getClient() as JWT;
        google.options({ auth: client });

        const spreadsheetId = '16HbTz9p7e62GGhpG-zRv6LyL0nac6SA9FxXWbjJoLZ8';
        const range = 'Sheet1!A:A';
        const valueInputOption = 'RAW';

        await sheets.spreadsheets.values.append({
            auth: client,
            spreadsheetId,
            range,
            valueInputOption,
            requestBody: {
                values: [[email]],
            },
        });

        return NextResponse.json({ message: 'Email submitted successfully' });
    } catch (error) {
        console.error('Error submitting email:', error);
        return NextResponse.json({ error: 'Failed to submit email' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
