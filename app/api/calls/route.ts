import { NextResponse } from 'next/server'
import { serverQueries } from '@/lib/database/queries'
import twilio from 'twilio'

export async function POST(request: Request) {
  const { contactId, contactType } = await request.json()

  if (!contactId || !contactType) {
    return NextResponse.json({ error: 'Missing contactId or contactType' }, { status: 400 })
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !from) {
    return NextResponse.json({ error: 'Twilio credentials are not configured' }, { status: 500 })
  }

  const to = await serverQueries.getContactPhoneNumber(contactId, contactType)

  if (!to) {
    return NextResponse.json({ error: 'Contact phone number not found' }, { status: 404 })
  }

  try {
    const client = twilio(accountSid, authToken)

    await client.calls.create({
      to,
      from,
      url: 'http://demo.twilio.com/docs/voice.xml', // Replace with your TwiML URL
    })

    return NextResponse.json({ message: 'Call initiated successfully' })
  } catch (error) {
    console.error('Error initiating call:', error)
    return NextResponse.json({ error: 'Failed to initiate call' }, { status: 500 })
  }
}
