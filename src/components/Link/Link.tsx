'use client';

import NextLink, { LinkProps } from 'next/link';
import styles from './Link.module.css';
import { ReactNode } from 'react';

interface Props extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function Link({ children, className = '', ...props }: Props) {
  return (
    <NextLink {...props} className={`${styles.link} ${className}`}>
      {children}
    </NextLink>
  );
}
