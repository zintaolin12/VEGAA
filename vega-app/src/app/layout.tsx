import { PropsWithChildren } from 'react'
import Topbar from '../components/layout/Topbar'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <Topbar />

      <main className="flex-1 overflow-y-auto px-2 sm:px-4">
        {children}
      </main>
    </div>
  )
}
