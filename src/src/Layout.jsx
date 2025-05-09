import { Outlet } from 'react-router-dom'
import Logo from './components/Logo'

function Layout() {
    return (
      <div className="relative bg-black-100 min-h-screen">
        <Logo />
        <Outlet />
      </div>
    )
  }

export default Layout