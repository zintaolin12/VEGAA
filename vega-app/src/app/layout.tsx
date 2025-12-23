import { ReactNode } from 'react'
import Sidebar from 'components/layout/Sidebar'
import Topbar from 'components/layout/Topbar'
import MobileNav from 'components/layout/MobileNav'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>

        <MobileNav />
      </div>
    </div>
  )
}
