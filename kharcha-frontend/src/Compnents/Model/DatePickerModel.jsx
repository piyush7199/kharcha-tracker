import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  COLORS,
  getCurrentDate,
  getStartDate,
} from "../../Constants/constants";
import { IoCalendarNumber } from "react-icons/io5";
import { DataContext } from "../Context/DataProvider";

const DatePickerModel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setStartDate, setEndDate } = useContext(DataContext);

  const initalState = {
    startDate: getStartDate(),
    endDate: getCurrentDate(),
  };
  const [dateRange, setDateRange] = useState(initalState);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleApplyDates = () => {
    console.log("Selected Date Range:", dateRange.startDate, dateRange.endDate);
    setStartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
    setIsOpen(false);
  };

  return (
    <Box>
      <Box>
        <Icon
          fontSize="1.9rem"
          bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
          color={COLORS.MAIN_COLOR}
          as={IoCalendarNumber}
          onClick={handleOpenModal}
          mr={3}
          mt={1}
          cursor="pointer"
        />

        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          size="sm"
          centerContent
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalHeader>Select Date Range</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, startDate: e.target.value })
                  }
                  max={dateRange.endDate}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, endDate: e.target.value })
                  }
                  min={dateRange.startDate}
                  max={getCurrentDate()}
                />
              </FormControl>

              <Button mt={4} onClick={handleApplyDates}>
                Apply
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default DatePickerModel;
