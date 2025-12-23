import Topbar from '../components/layout/Topbar'
import MobileNav from '../components/layout/MobileNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-bgDark text-gray-900 dark:text-gray-100">
      <Topbar />
      <main className="pb-20 px-4">{children}</main>
      <MobileNav />
    </div>
  )
}
