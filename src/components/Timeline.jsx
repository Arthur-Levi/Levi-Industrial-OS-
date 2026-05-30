export default function Timeline() {

  const events = [

    {
      time: '18:41:02',
      title: 'HIDDEN IDLE DETECTED',
      description: 'EXT-PVC-03'
    },

    {
      time: '18:43:15',
      title: 'THERMAL DEVIATION',
      description: 'EXT-SIL-03'
    },

    {
      time: '18:45:00',
      title: 'COPPER PRICE UPDATED',
      description: 'LME +4.2%'
    },

    {
      time: '18:45:22',
      title: 'SPARK TEST SAVED LOT',
      description: 'R$ 14.230 RECOVERED'
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
        padding: '20px'
      }}
    >

      <div
        style={{
          color: '#FFF',
          fontWeight: 'bold',
          marginBottom: '5px'
        }}
      >
        RUFLO LIVE FEED
      </div>

      <div
        style={{
          color: '#666',
          fontSize: '12px',
          marginBottom: '20px'
        }}
      >
        OPERATIONAL INTELLIGENCE STREAM
      </div>

      {events.map((event, index) => (

        <div
          key={index}
          style={{
            borderLeft:
              '2px solid #00FF66',
            paddingLeft: '12px',
            marginBottom: '18px'
          }}
        >

          <div
            style={{
              color: '#666',
              fontSize: '11px'
            }}
          >
            {event.time}
          </div>

          <div
            style={{
              color: '#FFF',
              fontWeight: 'bold'
            }}
          >
            {event.title}
          </div>

          <div
            style={{
              color: '#888',
              marginTop: '4px'
            }}
          >
            {event.description}
          </div>

        </div>

      ))}

    </div>

  )

}