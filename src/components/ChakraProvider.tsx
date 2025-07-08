'use client'

import { ChakraProvider as ChakraUIProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import theme from '@/lib/theme'

interface ChakraProviderProps {
  children: React.ReactNode
}

export default function ChakraProvider({ children }: ChakraProviderProps) {
  return (
    <CacheProvider>
      <ChakraUIProvider theme={theme}>
        {children}
      </ChakraUIProvider>
    </CacheProvider>
  )
} 