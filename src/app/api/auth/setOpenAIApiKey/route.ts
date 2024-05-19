import { serialize } from 'cookie';
import { encrypt } from '../../../lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('Entering POST handler');

  if (req.method !== "POST") {
    console.log('Method Not Allowed, method:', req.method);
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }

  console.log('Parsing request body');
  const { apiKey } = await req.json();

  console.log('Checking API key, apiKey:', apiKey);
  if (!apiKey) {
    console.log('API key is missing');
    return NextResponse.json({ message: "API key is required" }, { status: 400 });
  }

  console.log('Creating session data, sessionData:', { apiKey });
  const sessionData = { apiKey };

  console.log('Encrypting session data');
  const encryptedSessionData = encrypt(JSON.stringify(sessionData));
  console.log('Encrypted session data, encryptedSessionData:', encryptedSessionData);

  console.log('Serializing cookie');
  const cookie = serialize('session', encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  console.log('Serialized cookie, cookie:', cookie);

  console.log('Creating response');
  const response = NextResponse.json({ message: "API key saved successfully" });
  console.log('Created response, response:', response);

  console.log('Setting cookie in response headers');
  response.headers.set('Set-Cookie', cookie);
  console.log('Response headers after setting cookie, response.headers:', response.headers);

  console.log('Returning response');
  return response;
}