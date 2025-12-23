import { ReactNode } from 'react'

export default function Card({
  children,
  title,
}: {
  children: ReactNode
  title?: string
}) {
  return (
    <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl p-4 text-gray-900 dark:text-text">
      {title && (
        <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-muted">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
