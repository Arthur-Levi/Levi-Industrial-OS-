import KpiCard from '../components/KpiCard'
import ExecutiveHeader from '../components/ExecutiveHeader'
import MachineCard from '../components/MachineCard'
import AlarmCenter from '../components/AlarmCenter'
import Timeline from '../components/Timeline'

import {
  useSocket
} from '../context/SocketContext'

export default function DashboardExec() {

  const {
    machines
  } = useSocket()

  return (

    <div
      style={{
        background: '#050507',
        color: 'white',
        minHeight: '100vh',
        padding: '30px'
      }}
    >

      <ExecutiveHeader />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '20px',
          marginTop: '25px'
        }}
      >

        <KpiCard
          title="Global OEE"
          value="89.4%"
          color="#FFCC00"
        />

        <KpiCard
          title="Money Saved"
          value="R$ 14.230"
          color="#00FF66"
        />

        <KpiCard
          title="Hidden Idle Loss"
          value="R$ 384"
          color="#FF3333"
        />

        <KpiCard
          title="Fleet Online"
          value={machines.length}
          color="#3399FF"
        />

      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gap: '20px',
          marginTop: '30px'
        }}
      >

        <div>

          <h2
            style={{
              marginBottom: '20px'
            }}
          >
            Fleet Operations
          </h2>

          {machines.length === 0 && (

            <div
              style={{
                padding: '20px',
                background: '#0B0B0F',
                border: '1px solid #222'
              }}
            >
              Aguardando telemetria...
            </div>

          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(3,1fr)',
              gap: '20px'
            }}
          >

            {machines?.map(machine => (

              <MachineCard
                key={machine.id}
                machine={machine}
              />

            ))}

          </div>

        </div>

        <AlarmCenter />

      </div>

      <div
        style={{
          marginTop: '30px'
        }}
      >

        <Timeline />

      </div>

    </div>

  )

}