import React from 'react'
import InputDepositos from '@/components/depositos/boxDepositos'
import { SafeAreaView } from 'react-native-safe-area-context'

const depositos = () => {
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <InputDepositos />
      </SafeAreaView>
  )
}

export default depositos