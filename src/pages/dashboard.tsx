import { Flex, SimpleGrid, Box, Text } from "@chakra-ui/react";
import { Chart } from "../components/Dashboard/Chart";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" pb="4" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscritos do mês
            </Text>
            <Chart />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" pb="4" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxas de abertura
            </Text>
            <Chart />
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
