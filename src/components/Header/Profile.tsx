import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <>
      <Flex>
        {showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>Rodrigo Victor</Text>
            <Text color="gray.300" fontSize="small">
              rodrigovictor81@gmail.com
            </Text>
          </Box>
        )}

        <Avatar
          size="md"
          name="Rodrigo Victor"
          src="https://github.com/RodrigoRVSN.png"
        />
      </Flex>
    </>
  );
}
