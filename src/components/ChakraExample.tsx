'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  useColorMode,
  IconButton,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ChakraExample() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box p={8} maxW="4xl" mx="auto">
      <VStack spacing={8} align="stretch">
        {/* Header with theme toggle */}
        <HStack justify="space-between" align="center">
          <Heading size="xl" color="brand.500">
            Chakra UI Integration
          </Heading>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="outline"
          />
        </HStack>

        {/* Description */}
        <Text fontSize="lg" color="gray.600">
          This demonstrates the Chakra UI integration with custom theme and components.
        </Text>

        {/* Button examples */}
        <VStack spacing={4} align="start">
          <Heading size="md">Button Variants</Heading>
          <HStack spacing={4} wrap="wrap">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button colorScheme="brand" size="sm">Small Button</Button>
          </HStack>
        </VStack>

        {/* Card examples */}
        <VStack spacing={4} align="stretch">
          <Heading size="md">Card Components</Heading>
          <HStack spacing={6} align="stretch" wrap="wrap">
            <Card flex="1" minW="300px">
              <CardHeader>
                <Heading size="md">Developer</Heading>
                <Badge colorScheme="blue" mt={2}>Backend</Badge>
              </CardHeader>
              <CardBody>
                <Text>
                  Specialized in building scalable backend systems with modern technologies.
                </Text>
                <Button variant="primary" size="sm" mt={4}>
                  Learn More
                </Button>
              </CardBody>
            </Card>

            <Card flex="1" minW="300px">
              <CardHeader>
                <Heading size="md">Architect</Heading>
                <Badge colorScheme="green" mt={2}>System Design</Badge>
              </CardHeader>
              <CardBody>
                <Text>
                  Expert in designing enterprise-grade architectures and system patterns.
                </Text>
                <Button variant="outline" size="sm" mt={4}>
                  Explore
                </Button>
              </CardBody>
            </Card>

            <Card flex="1" minW="300px">
              <CardHeader>
                <Heading size="md">DevOps Engineer</Heading>
                <Badge colorScheme="purple" mt={2}>Infrastructure</Badge>
              </CardHeader>
              <CardBody>
                <Text>
                  Master of CI/CD pipelines, cloud infrastructure, and deployment automation.
                </Text>
                <Button variant="secondary" size="sm" mt={4}>
                  Discover
                </Button>
              </CardBody>
            </Card>
          </HStack>
        </VStack>

        {/* Color palette */}
        <VStack spacing={4} align="start">
          <Heading size="md">Brand Colors</Heading>
          <HStack spacing={2} wrap="wrap">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <Box
                key={shade}
                w="60px"
                h="60px"
                bg={`brand.${shade}`}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color={shade < 400 ? 'gray.800' : 'white'}
                fontSize="xs"
                fontWeight="bold"
              >
                {shade}
              </Box>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
} 