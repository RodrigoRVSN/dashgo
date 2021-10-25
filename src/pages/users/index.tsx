import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { RiAddLine, RiRefreshLine } from "react-icons/ri";
import NextLink from "next/link";
import { useState } from "react";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

export default function UserList({ users }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching, refetch } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
      },
      { staleTime: 1000 * 10 * 60 }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4", "4,", "6"]}>
        <Sidebar />
        <Box flex="1" bg="gray.800" p={8} borderRadius={8}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              <Button
                size="sm"
                colorScheme="pink"
                ml="20px"
                onClick={() => {
                  refetch();
                }}
              >
                {!isLoading && isFetching ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon as={RiRefreshLine} size="sm" />
                )}
              </Button>
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Houve um erro</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4,", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4,", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() =>
                              handlePrefetchUser(Number(user.id))
                            }
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServiderSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);
  return { props: { users, totalCount } };
};
