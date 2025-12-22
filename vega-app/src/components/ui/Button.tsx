import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-50',
        variant === 'primary' &&
          'bg-[var(--vega-blue)] text-white hover:bg-blue-700',
        variant === 'secondary' &&
          'bg-[var(--vega-blue-light)] text-[var(--vega-blue-dark)] hover:bg-blue-100',
        className
      )}
      {...props}
    />
  )
}
