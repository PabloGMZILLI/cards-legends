import classNames from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './type';

export default function Input(props: InputProps) {
  const { label, className, classContainerName, ...inputProps } = props;
  return (
    <div className={classNames(styles.container, classContainerName)}>
      <label>{label}</label>
      <input
        className={classNames(styles.input, className)}
        {...inputProps}
      />
    </div>
  );
}
