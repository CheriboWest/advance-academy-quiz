import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, house, scoreBreakdown } = body;

    // Basic validation
    if (!name || !email || !whatsapp || !house) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (webhookUrl) {
      // Forward to Google Apps Script webhook
      const payload = {
        timestamp: new Date().toISOString(),
        name,
        email,
        whatsapp,
        house,
        scoreBreakdown: scoreBreakdown ?? '',
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Google Sheets webhook error:', response.status, response.statusText);
        // Still return success to the client — don't block the user experience
      }
    } else {
      // Log to console in development if no webhook URL set
      console.log('Quiz submission (no webhook configured):', {
        timestamp: new Date().toISOString(),
        name,
        email,
        whatsapp,
        house,
        scoreBreakdown,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit API error:', error);
    // Return success anyway — don't block user experience
    return NextResponse.json({ success: true });
  }
}
