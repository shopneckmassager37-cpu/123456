import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'DanDev <contact@dandev.live>',
      to:   'danielgitlin2011@gmail.com',
      replyTo: email,
      subject: `New inquiry — ${subject ?? 'General'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f0f0f;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:#D4A853;padding:24px 32px;">
            <h1 style="margin:0;font-size:22px;color:#0A0A0A;font-weight:700;">New contact form submission</h1>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;color:#888;font-size:13px;width:90px;vertical-align:top;">Name</td>
                <td style="padding:10px 0;color:#fff;font-size:15px;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Email</td>
                <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#D4A853;font-size:15px;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Subject</td>
                <td style="padding:10px 0;color:#fff;font-size:15px;">${subject ?? '—'}</td>
              </tr>
            </table>

            <div style="margin-top:24px;padding:20px;background:#1a1a1a;border-radius:8px;border-left:3px solid #D4A853;">
              <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Message</p>
              <p style="margin:0;color:#e0e0e0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>

            <p style="margin-top:28px;color:#555;font-size:12px;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
