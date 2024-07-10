import React from 'react'
import { Tabs } from 'expo-router'
import { DepositsProvider } from '@/components/depositos/proveedorDepositos'
const LayoutMain =() =>{
  return (
    <DepositsProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
        />
        
        <Tabs.Screen 
          name='depositos'
          options={{
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tabs.Screen name='cuadratura'/>
        <Tabs.Screen name='cierreTurno'/>
      </Tabs>
    </DepositsProvider>
  )
}

export default LayoutMain;