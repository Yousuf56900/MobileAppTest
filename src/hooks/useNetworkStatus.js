import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'

export default function useNetworkStatus() {
  const [isOnline, setOnline] = useState(true)

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected)
    })
    return () => unsub()
  }, [])

  return { isOnline }
}
