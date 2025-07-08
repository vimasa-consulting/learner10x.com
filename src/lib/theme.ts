import { extendTheme } from '@chakra-ui/react'
import type { ThemeConfig } from '@chakra-ui/react'

// Color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

// Custom colors matching your brand
const colors = {
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#3b82f6', // Your primary blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

// Custom fonts
const fonts = {
  heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}

// Custom component styles
const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
    variants: {
      primary: {
        bg: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
        color: 'white',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      secondary: {
        bg: 'white',
        color: 'brand.800',
        border: '2px solid',
        borderColor: 'gray.200',
        _hover: {
          borderColor: 'brand.500',
          bg: 'gray.50',
        },
      },
      outline: {
        bg: 'transparent',
        color: 'brand.500',
        border: '2px solid',
        borderColor: 'brand.500',
        _hover: {
          bg: 'brand.500',
          color: 'white',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderWidth: '1px',
        borderRadius: 'lg',
        boxShadow: 'md',
        _hover: {
          boxShadow: 'lg',
        },
      },
    },
  },
  Link: {
    baseStyle: {
      color: 'brand.500',
      _hover: {
        textDecoration: 'none',
        color: 'brand.600',
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: '600',
      color: 'gray.900',
    },
  },
  Text: {
    baseStyle: {
      color: 'gray.700',
    },
  },
}

// Custom styles
const styles = {
  global: {
    body: {
      bg: 'white',
      color: 'gray.800',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
  },
}

// Extend the theme
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
})

export default theme 