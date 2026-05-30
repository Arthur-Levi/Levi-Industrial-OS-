export default function AlarmCenter() {

  const alarms = [

    {
      id: 1,
      level: 'CRITICAL',
      title: 'HIDDEN IDLE',
      machine: 'EXT-PVC-03',
      message:
        'Loss detected: R$ 3.42/min'
    },

    {
      id: 2,
      level: 'WARNING',
      title: 'THERMAL DEVIATION',
      machine: 'EXT-SIL-03',
      message:
        'Temperature +6.4°C'
    },

    {
      id: 3,
      level: 'SUCCESS',
      title: 'SPARK TEST',
      machine: 'QUALITY ENGINE',
      message:
        'R$ 14.230 recovered'
    }

  ]

  return (

    <div

      style={{

        background:
          'linear-gradient(180deg,#09090C,#050507)',

        border:
          '1px solid #1B1B22',

        borderRadius: '10px',

        padding: '18px',

        height: '100%'

      }}

    >

      <div

        style={{

          fontSize: '15px',

          fontWeight: 'bold',

          color: '#FFF',

          marginBottom: '4px'

        }}

      >

        ALARM CENTER

      </div>

      <div

        style={{

          color: '#666',

          fontSize: '12px',

          marginBottom: '20px'

        }}

      >

        LIVE INDUSTRIAL EVENTS

      </div>

      {

        alarms.map(alarm => (

          <AlarmItem

            key={alarm.id}

            alarm={alarm}

          />

        ))

      }

    </div>

  )

}

function AlarmItem({

  alarm

}) {

  let color = '#888'

  if (alarm.level === 'CRITICAL')
    color = '#FF3333'

  if (alarm.level === 'WARNING')
    color = '#FFAA00'

  if (alarm.level === 'SUCCESS')
    color = '#00FF66'

  return (

    <div

      style={{

        borderLeft:
          `4px solid ${color}`,

        background:
          '#0B0B10',

        padding: '12px',

        marginBottom: '12px',

        borderRadius: '6px'

      }}

    >

      <div

        style={{

          color,

          fontWeight: 'bold',

          fontSize: '12px'

        }}

      >

        {alarm.title}

      </div>

      <div

        style={{

          color: '#FFF',

          marginTop: '4px'

        }}

      >

        {alarm.machine}

      </div>

      <div

        style={{

          color: '#777',

          marginTop: '4px',

          fontSize: '12px'

        }}

      >

        {alarm.message}

      </div>

    </div>

  )

}