import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { io } from 'socket.io-client'

const SocketContext =
  createContext()

export function SocketProvider({

  children

}) {

  const [connected, setConnected] =
    useState(false)

  const [machines, setMachines] =
    useState([])

  const [alerts, setAlerts] =
    useState([])

  useEffect(() => {

    const socket = io()

    /*
    =========================================
    CONNECT
    =========================================
    */

    socket.on(

      'connect',

      () => {

        console.log(
          '[SOCKET] CONNECTED'
        )

        setConnected(true)

      }

    )

    /*
    =========================================
    DISCONNECT
    =========================================
    */

    socket.on(

      'disconnect',

      () => {

        console.log(
          '[SOCKET] DISCONNECTED'
        )

        setConnected(false)

      }

    )

    /*
    =========================================
    MACHINE UPDATE
    =========================================
    */

    socket.on(

      'machine:update',

      data => {

        console.log(
          '[MACHINE UPDATE]',
          data
        )

        setMachines(prev => {

          const exists =

            prev.find(

              machine =>

                machine.id === data.id

            )

          if (!exists) {

            return [

              ...prev,

              data

            ]

          }

          return prev.map(

            machine =>

              machine.id === data.id

                ? data

                : machine

          )

        })

      }

    )

    /*
    =========================================
    FACTORY ALERT
    =========================================
    */

    socket.on(

      'factory:alert',

      alert => {

        console.log(
          '[FACTORY ALERT]',
          alert
        )

        setAlerts(prev => [

          alert,

          ...prev

        ].slice(0, 20))

      }

    )

    /*
    =========================================
    CLEANUP
    =========================================
    */

    return () => {

      socket.disconnect()

    }

  }, [])

  return (

    <SocketContext.Provider

      value={{

        connected,

        machines,

        alerts

      }}

    >

      {children}

    </SocketContext.Provider>

  )

}

export function useSocket() {

  return useContext(

    SocketContext

  )

}