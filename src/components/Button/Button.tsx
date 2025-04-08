'use client';

import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variation?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = 'button',
  variation = 'primary',
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.button, styles[variation], className)}
    >
      {children}
    </button>
  );
}
