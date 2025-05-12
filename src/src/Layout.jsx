import { Outlet } from 'react-router-dom'
import Logo from './components/Logo'

function Layout() {
    return (
      <div className="relative bg-black-100 flex-1">
        <Logo />
        <Outlet />
      </div>
    )
  }

export default Layout