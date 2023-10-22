import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { COLORS, getFormatedDate } from "../../Constants/constants";
import { DataContext } from "../Context/DataProvider";

const DateRangePicker = () => {
  const { startDate, endDate } = useContext(DataContext);

  return (
    <Flex margin={{ base: "auto", md: 0 }}>
      <Text mb={{ base: 2, md: 0 }}>
        {`${getFormatedDate(startDate)} - ${getFormatedDate(endDate)}`}
      </Text>
    </Flex>
  );
};

export default DateRangePicker;
