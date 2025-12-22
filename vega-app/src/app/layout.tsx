import { ReactNode } from 'react'
import Sidebar from '../components/layout/Sidebar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--vega-gray)]">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
