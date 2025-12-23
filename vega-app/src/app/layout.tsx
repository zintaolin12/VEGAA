import { PropsWithChildren } from 'react'
import Topbar from '../components/layout/Topbar'
import MobileNav from '../components/layout/MobileNav'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#050b14] text-blue-100 flex flex-col">
      <Topbar />

      <main className="flex-1 overflow-y-auto px-3 pb-24">
        {children}
      </main>

      <MobileNav />
    </div>
  )
}
