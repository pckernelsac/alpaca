import { forwardRef, useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { IconAlert, IconCheck, IconChevronDown } from './Icon';
import styles from './Field.module.css';

interface FieldShellProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}

function FieldShell({ label, error, hint, required, htmlFor, children }: FieldShellProps) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error ? (
        <span className={styles.message} role="alert">
          <IconAlert size={14} />
          {error}
        </span>
      ) : (
        hint && <span className={styles.hint}>{hint}</span>
      )}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, icon, id, required, className, ...rest },
  ref,
) {
  const generated = useId();
  const inputId = id ?? generated;

  return (
    <FieldShell label={label} error={error} hint={hint} required={required} htmlFor={inputId}>
      <div className={styles.control}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-errormessage={error ? `${inputId}-error` : undefined}
          className={[styles.input, icon && styles.hasIcon, error && styles.invalid, className]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
      </div>
    </FieldShell>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id, required, className, ...rest },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;

  return (
    <FieldShell label={label} error={error} hint={hint} required={required} htmlFor={fieldId}>
      <textarea
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={[styles.textarea, error && styles.invalid, className].filter(Boolean).join(' ')}
        {...rest}
      />
    </FieldShell>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, id, required, className, children, ...rest },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;

  return (
    <FieldShell label={label} error={error} hint={hint} required={required} htmlFor={fieldId}>
      <div className={styles.selectWrap}>
        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          className={[styles.select, error && styles.invalid, className].filter(Boolean).join(' ')}
          {...rest}
        >
          {children}
        </select>
        <span className={styles.selectArrow}>
          <IconChevronDown size={16} />
        </span>
      </div>
    </FieldShell>
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={[styles.checkbox, className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...rest} />
      <span className={styles.box} aria-hidden="true">
        <IconCheck size={12} strokeWidth={2.5} />
      </span>
      <span>{label}</span>
    </label>
  );
}
