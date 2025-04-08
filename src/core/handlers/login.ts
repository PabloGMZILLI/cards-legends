import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { setSessionCookie } from '@/utils/cookies';

export async function loginHandler(req: NextRequest): Promise<NextResponse> {
  const { email, password } = await req.json();

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  await setSessionCookie(token);

  return NextResponse.json({ success: true });
}