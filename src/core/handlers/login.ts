import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setSessionCookie } from '@/utils/cookies';

export async function atualizarDisplayName(name: string) {
  const user = auth.currentUser;

  if (user) {
    await updateProfile(user, {
      displayName: name,
    });

    console.log("Display name atualizado para:", user.displayName);
  } else {
    console.log("Usuário não está logado");
  }
}

export async function loginHandler(req: NextRequest): Promise<NextResponse> {
  const { email, password } = await req.json();

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // await atualizarDisplayName('Pablo');
  const token = await userCredential.user.getIdToken();

  await setSessionCookie(token);

  return NextResponse.json({ success: true });
}