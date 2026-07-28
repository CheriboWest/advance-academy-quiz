import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, house, scoreBreakdown, consentMarketing, utm, ref } = body;

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

    // Pipe the lead into the Candidate Acquisition store (CA-001) in parallel with
    // the existing Google Sheet. Best-effort: a failure here must never block the
    // user's result. `source: 'quiz'` lets the backend segment quiz leads.
    const captureUrl = process.env.LEADS_CAPTURE_URL;
    if (captureUrl) {
      try {
        const res = await fetch(captureUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            source: 'quiz',
            leadMagnetId: 'career-house-quiz',
            consentMarketing: consentMarketing === true,
            result: { house, scoreBreakdown: scoreBreakdown ?? '', whatsapp },
            // P3a: channel attribution. utm.source defaults to 'quiz' so leads
            // that arrive without a tagged link still segment sensibly.
            utm: {
              source: utm?.source ?? 'quiz',
              medium: utm?.medium ?? null,
              campaign: utm?.campaign ?? null,
            },
            // P3c: referral code of the inviter (if the friend arrived via ?ref=).
            ref: ref ?? null,
          }),
        });
        if (!res.ok) {
          console.error('Lead capture error:', res.status, res.statusText);
        }
      } catch (err) {
        console.error('Lead capture request failed:', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit API error:', error);
    // Return success anyway — don't block user experience
    return NextResponse.json({ success: true });
  }
}
