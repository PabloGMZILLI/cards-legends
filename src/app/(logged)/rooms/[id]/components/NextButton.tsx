import styles from './Generic.module.css';
import { Icon, Spinner } from '@/components';

type NextButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string
}

export const NextButton = ({ onClick, disabled, loading, label = "Próximo" }: NextButtonProps) => {
  return (
    <button
      className={styles.nextButton}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {
        loading ?
          <Spinner size={16} color="white" /> :
          <>
            {label} <Icon name="arrowRight" size={16} color="white" />
          </>
      } 
    </button>
  )
}