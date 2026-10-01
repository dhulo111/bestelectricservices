import { siteConfig } from '@/config/site';

export async function sendEmail({
  to,
  subject,
  htmlContent,
  replyTo
}: {
  to: string;
  subject: string;
  htmlContent: string;
  replyTo?: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn('BREVO_API_KEY is not defined. Email not sent.');
    return;
  }

  const payload: any = {
    sender: { name: 'Best Electric Services Website', email: siteConfig.contact.email }, // Update this if you verify a different domain in Brevo
    to: [{ email: to }],
    subject,
    htmlContent,
  };

  if (replyTo) {
    payload.replyTo = { email: replyTo };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo Email API Error:', errorData);
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    // Don't throw to prevent crashing the main API flow
  }
}
