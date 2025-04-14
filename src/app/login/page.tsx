'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Link, Spinner } from '@/components';

import styles from './login.module.css';

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

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { message } = await res?.json();
        setError(message);
        return;
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
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
