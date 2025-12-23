import Topbar from '../components/layout/Topbar'
import MobileNav from '../components/layout/MobileNav'
import AppRoutes from './routes/AppRoutes'

export default function AppLayout() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <Topbar />
      <AppRoutes />
      <MobileNav />
    </div>
  )
}
