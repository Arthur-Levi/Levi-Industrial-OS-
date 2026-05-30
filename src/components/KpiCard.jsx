export default function KpiCard({

  title,
  value,
  color = '#00FF66'

}) {

  return (

    <div
      style={{
        background: '#0B0B0F',
        border: `1px solid ${color}`,
        borderRadius: '8px',
        padding: '20px',
        minHeight: '120px'
      }}
    >

      <div
        style={{
          fontSize: '12px',
          color: '#888',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >

        {title}

      </div>

      <div
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color
        }}
      >

        {value}

      </div>

    </div>

  )

}