import {
  useSocket
}
from '../context/SocketContext'

export default function ExecutiveHeader() {

  const now =
    new Date().toLocaleTimeString(
      'pt-BR'
    )

    const {
      connected
    } = useSocket()

  return (

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #00FF66',
        paddingBottom: '15px'
      }}
    >

      <div>

        <h1
          style={{
            margin: 0,
            color: '#FFFFFF',
            fontSize: '32px'
          }}
        >
          LEVI INDUSTRIAL OS
        </h1>

        <div
          style={{
            color: '#777',
            fontSize: '13px',
            marginTop: '5px'
          }}
        >
          RUFLO MULTI-AGENT SWARM CORE
        </div>

      </div>

      <div
        style={{
          textAlign: 'right'
        }}
      >

        <div
          style={{
            color: '#00FF66',
            fontWeight: 'bold'
          }}
        >
          {connected
             ? '● CONNECTED'
             : '● OFFLINE'}
        </div>

        <div
          style={{
            color: '#AAA',
            fontSize: '13px'
          }}
        >
          Planta 2 Tramar
        </div>

        <div
          style={{
            color: '#AAA',
            fontSize: '13px'
          }}
        >
          {now}
        </div>

      </div>

    </div>

  )

}