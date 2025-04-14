import { NextRequest, NextResponse } from 'next/server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';

export async function signupHandler(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, name } = await req.json();

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential) {
      const user = userCredential.user;

      // Update the user's profile with the displayName
      await updateProfile(user, { displayName: name });

      return NextResponse.json(
        { success: true, message: 'Signup successful!' },
        { status: 201, headers: { Location: '/login' } }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Signup failed' },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error)?.message || 'Signup failed' },
      { status: 400 }
    );
  }
}
