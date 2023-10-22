import React from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";

import { COLORS } from "../../Constants/constants";

const Banner = ({ message }) => {
  return (
    <Stack align={"center"}>
      <Heading as="h1" mb={{ base: "2", md: "4" }} size="xl" textAlign="center">
        <span
          style={{
            color: COLORS.MAIN_COLOR,
          }}
        >
          Kharcha Tracker
        </span>
      </Heading>
      <Text
        fontSize={{ base: "0.9rem", md: "1.1rem" }}
        textAlign="center"
        color={"gray.400"}
      >
        {message}
      </Text>
    </Stack>
  );
};

export default Banner;
