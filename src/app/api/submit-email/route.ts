import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
    credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const client = await auth.getClient();
        google.options({ auth: client });

        const spreadsheetId = 'your_spreadsheet_id'; // Replace with your spreadsheet ID
        const range = 'Sheet1!A:A'; // Replace with your sheet name and range
        const valueInputOption = 'RAW';

        await sheets.spreadsheets.values.append({
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
