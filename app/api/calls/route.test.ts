import { POST } from './route'
import { serverQueries } from '@/lib/database/queries'
import twilio from 'twilio'

jest.mock('@/lib/database/queries', () => ({
  serverQueries: {
    getContactPhoneNumber: jest.fn(),
  },
}))

jest.mock('twilio', () => {
  const twilioFn = jest.fn(() => ({
    calls: {
      create: jest.fn().mockResolvedValue({ sid: 'mock_sid' }),
    },
  }))
  return twilioFn
})

describe('POST /api/calls', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.TWILIO_ACCOUNT_SID = 'test_sid'
    process.env.TWILIO_AUTH_TOKEN = 'test_token'
    process.env.TWILIO_PHONE_NUMBER = '+1234567890'
  })

  it('should initiate a call successfully', async () => {
    ;(serverQueries.getContactPhoneNumber as jest.Mock).mockResolvedValue('+19876543210')

    const request = new Request('http://localhost/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactId: '123', contactType: 'buyer' }),
    })

    const response = await POST(request)
    const responseJson = await response.json()

    expect(response.status).toBe(200)
    expect(responseJson.message).toBe('Call initiated successfully')

    const twilioClient = (twilio as unknown as jest.Mock).mock.results[0].value
    expect(twilioClient.calls.create).toHaveBeenCalledWith({
      to: '+19876543210',
      from: '+1234567890',
      url: 'http://demo.twilio.com/docs/voice.xml',
    })
  })

  it('should return 400 if contactId or contactType is missing', async () => {
    const request = new Request('http://localhost/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const responseJson = await response.json()

    expect(response.status).toBe(400)
    expect(responseJson.error).toBe('Missing contactId or contactType')
  })

  it('should return 404 if phone number is not found', async () => {
    ;(serverQueries.getContactPhoneNumber as jest.Mock).mockResolvedValue(null)

    const request = new Request('http://localhost/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactId: '123', contactType: 'buyer' }),
    })

    const response = await POST(request)
    const responseJson = await response.json()

    expect(response.status).toBe(404)
    expect(responseJson.error).toBe('Contact phone number not found')
  })

  it('should return 500 if twilio credentials are not configured', async () => {
    delete process.env.TWILIO_ACCOUNT_SID

    const request = new Request('http://localhost/api/calls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactId: '123', contactType: 'buyer' }),
    })

    const response = await POST(request)
    const responseJson = await response.json()

    expect(response.status).toBe(500)
    expect(responseJson.error).toBe('Twilio credentials are not configured')
  })
})
