import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  full?: boolean
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  full = false,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        ${full ? 'w-full' : ''}
        px-4 py-2 rounded-lg font-medium transition
        ${
          variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}
