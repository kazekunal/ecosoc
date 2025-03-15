import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/app/components/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { orderId, items, participants, needsAccommodation, totalAmount } = body;

        console.log("🔹 Received email request:", body);

        // Validate participants array
        if (!participants || !Array.isArray(participants)) {
            console.error("❌ Participants data is missing or invalid:", participants);
            return NextResponse.json({ error: 'Invalid participants data' }, { status: 400 });
        }

        console.log("📩 Sending emails to participants:", participants.length);

        // Extract unique participant emails
        const participantEmails = participants
            .map((p) => p.email)
            .filter((email) => email && email.trim() !== '');
        const uniqueEmails = [...new Set(participantEmails)];

        console.log("📨 Unique emails to send:", uniqueEmails);

        if (uniqueEmails.length === 0) {
            console.error("❌ No valid email addresses found.");
            return NextResponse.json({ error: 'No valid email addresses found' }, { status: 400 });
        }

        if (!process.env.RESEND_API_KEY) {
            console.error("❌ RESEND_API_KEY is missing.");
            return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
        }

        // Send email to each participant
        const emailPromises = uniqueEmails.map(async (email) => {
            console.log(`✉️ Sending email to ${email}`);
            try {
                const emailResult = await resend.emails.send({
                    from: 'events@iqtisadiyyat.in', 
                    to: [email],
                    subject: 'IQTISADIYYAT - Ticket Confirmation',
                    react: EmailTemplate({ orderId, items, participants, needsAccommodation, totalAmount }),
                });

                console.log(`✅ Email sent to ${email}:`, emailResult);
                return emailResult;
            } catch (error) {
                console.error(`❌ Error sending email to ${email}:`, error);
                return { status: 'rejected', reason: error.message };
            }
        });

        const results = await Promise.allSettled(emailPromises);

        console.log("📩 Email sending results:", results);

        const successfulEmails = results.filter((r) => r.status === 'fulfilled').length;

        if (successfulEmails > 0) {
            return NextResponse.json({ success: true, results, sentCount: successfulEmails });
        } else {
            return NextResponse.json({ error: 'Failed to send any emails', results }, { status: 500 });
        }
    } catch (error) {
        console.error("❌ Error in email sending process:", error);
        return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
