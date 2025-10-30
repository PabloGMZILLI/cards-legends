'use client'

import { useState } from "react";
import { Button, Link, Spinner } from "@/components";
import styles from './register.module.css';
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          password, 
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();        
        setError(message);
        return;
      }

      router.push('/login');
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
      <form onSubmit={handleSignup} className={styles.form}>
        <h1 className={styles.title}>
          Crie sua conta 🛡️
        </h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirme a Senha"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button className={styles.button} type='submit' variation='primary' disabled={loading} >
          {loading ? <Spinner size={20} /> : 'Cadastrar'}
        </Button>
        <p className={styles.switchText}>
          Já possui conta?
          <Link href="/login">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
