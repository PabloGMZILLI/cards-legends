'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Link, Spinner } from '@/components';

import styles from './login.module.css';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError('Email ou senha inválidos.');
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button className={styles.button} type='submit' variation='primary' disabled={loading} >
          {loading ? <Spinner size={20} /> : 'Entrar'}
        </Button>
        <p className={styles.switchText}>
          Não tem conta?
          <Link href="/register">
            Registrar-se
          </Link>
        </p>
      </form>
    </div>
  );
}
