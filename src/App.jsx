import DashboardExec
from './pages/DashboardExec'

import {
  SocketProvider
}
from './context/SocketContext'

export default function App() {

  return (

    <SocketProvider>

      <DashboardExec />

    </SocketProvider>

  )

}