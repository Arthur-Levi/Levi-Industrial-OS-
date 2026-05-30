export default function MachineCard({

  machine

}) {

  const telemetry =
    machine?.telemetry || {}

  const oee =
    machine?.oee || {}

  const speed =
    telemetry.speed || 0

  const temperature =
    telemetry.temperature || 0

  const amperage =
    telemetry.amperage || 0

  const oeeValue =
    oee.value || 0

  const status =
    machine?.status || 'UNKNOWN'

  const name =
    machine?.name || 'UNNAMED MACHINE'

  const isRunning =
    status === 'RUNNING'

  const isIdle =
    status === 'IDLE'

  const isSabotage =
    status === 'HIDDEN_IDLE_SABOTAGE'

  const isCritical =
    status === 'CRITICAL_ALERT'

  let statusColor = '#666'

  if (isRunning)
    statusColor = '#00FF66'

  if (isSabotage)
    statusColor = '#FF3333'

  if (isCritical)
    statusColor = '#FFAA00'

  let healthText =
    'STANDBY'

  if (isRunning)
    healthText = 'OPTIMAL'

  if (isSabotage)
    healthText = 'HIDDEN IDLE'

  if (isCritical)
    healthText = 'CRITICAL'

  if (isIdle)
    healthText = 'STOPPED'

  return (

    <div

      style={{

        background:
          'linear-gradient(180deg,#09090C,#050507)',

        border:
          `1px solid ${statusColor}`,

        borderTop:
          `4px solid ${statusColor}`,

        borderRadius: '10px',

        padding: '18px',

        boxShadow:
          `0 0 15px ${statusColor}22`

      }}

    >

      <div

        style={{

          display: 'flex',

          justifyContent: 'space-between',

          alignItems: 'center',

          marginBottom: '16px'

        }}

      >

        <div>

          <div

            style={{

              fontWeight: 'bold',

              fontSize: '15px',

              color: '#FFF'

            }}

          >

            {name}

          </div>

          <div

            style={{

              color: '#777',

              fontSize: '11px',

              marginTop: '3px'

            }}

          >

            MACHINE ID:
            {' '}
            {machine?.id}

          </div>

        </div>

        <div

          style={{

            color: statusColor,

            fontWeight: 'bold',

            fontSize: '12px'

          }}

        >

          ● {status}

        </div>

      </div>

      <div

        style={{

          display: 'grid',

          gridTemplateColumns:
            '1fr 1fr',

          gap: '12px'

        }}

      >

        <Metric

          label="SPEED"

          value={`${speed.toFixed(1)} m/min`}

        />

        <Metric

          label="TEMP"

          value={`${temperature.toFixed(1)} °C`}

        />

        <Metric

          label="AMP"

          value={`${amperage.toFixed(1)} A`}

        />

        <Metric

          label="OEE"

          value={`${oeeValue}%`}

        />

      </div>

      <div

        style={{

          marginTop: '16px',

          paddingTop: '12px',

          borderTop:
            '1px solid #1A1A22'

        }}

      >

        <div

          style={{

            color: '#777',

            fontSize: '11px'

          }}

        >

          HEALTH STATUS

        </div>

        <div

          style={{

            color: statusColor,

            fontWeight: 'bold',

            marginTop: '4px'

          }}

        >

          {healthText}

        </div>

      </div>

    </div>

  )

}

function Metric({

  label,

  value

}) {

  return (

    <div>

      <div

        style={{

          color: '#777',

          fontSize: '11px'

        }}

      >

        {label}

      </div>

      <div

        style={{

          color: '#FFF',

          fontWeight: 'bold',

          marginTop: '3px'

        }}

      >

        {value}

      </div>

    </div>

  )

}