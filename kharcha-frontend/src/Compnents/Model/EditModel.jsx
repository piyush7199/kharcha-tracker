import React, { useContext, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useColorModeValue,
  Box,
  Icon,
  Text,
  Spacer,
  useToast,
  Select,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

import {
  COLORS,
  PAGENAMES,
  contactErrorToast,
  getCurrentDate,
  getToast,
} from "../../Constants/constants";
import { API } from "../../Services/apis";
import { DataContext } from "../Context/DataProvider";

const getFormatedDate = (date) => {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1 and pad with 0 if necessary.
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const EditModel = ({
  subCategoryOptions,
  paymentOptions,
  rowData,
  pageName,
  categoryOptions,
  investedInOptions,
}) => {
  const buttonStyle = {
    bg: COLORS.MAIN_COLOR,
    type: "submit",
    color: COLORS.DARK_BLACK_COLOR,
    size: "lg",
    _hover: {
      bg: useColorModeValue(COLORS.DARK_BLACK_COLOR, COLORS.LIGHT_COLOR),
      color: useColorModeValue(COLORS.LIGHT_COLOR, COLORS.DARK_BLACK_COLOR),
    },
  };

  const initailValues = {
    name: rowData.original.name,
    amount: Number(rowData.original.amount),
    date: getFormatedDate(rowData.original.date),
    category: rowData.original.category,
    id: rowData.original.id,
    subCategory: rowData.original.subCategory
      ? rowData.original.subCategory
      : "",
    paidVia: rowData.original.paidVia ? rowData.original.paidVia : "",
    investedIn: rowData.original.investedIn ? rowData.original.investedIn : "",
  };

  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState(initailValues);
  const { load, setLoad } = useContext(DataContext);
  const toast = useToast();
  const [categoryOpt, setCategoryOpt] = useState("");

  const handleEdit = () => {
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      let res;
      if (pageName === PAGENAMES.INCOME) {
        res = await API.updateIncome(newData);
      } else if (pageName === PAGENAMES.EXPENSE) {
        res = await API.updateExpense(newData);
      } else if (pageName === PAGENAMES.INVESTMENT) {
        res = await API.updateInvestment(newData);
      } else {
        return;
      }
      console.log(res);
      if (res.isSuccess) {
        setLoad(!load);
      } else {
        setNewData(initailValues);
        toast(getToast(`Error while updating ${pageName}`, res.message, true));
      }
    } catch (error) {
      console.log(error);
      setNewData(initailValues);
      toast(contactErrorToast());
    }
    setIsAdding(false);
  };

  const handleDelete = async () => {
    try {
      let res;
      if (pageName === PAGENAMES.INCOME) {
        res = await API.deleteIncome({ id: rowData.original.id });
      } else if (pageName === PAGENAMES.EXPENSE) {
        res = await API.deleteExpense({ id: rowData.original.id });
      } else if (pageName === PAGENAMES.INVESTMENT) {
        res = await API.deleteInvestment({ id: rowData.original.id });
      } else {
        return;
      }
      console.log(res);
      if (res.isSuccess) {
        setLoad(!load);
      } else {
        setNewData(initailValues);
        toast(getToast(`Error while updating ${pageName}`, res.message, true));
      }
    } catch (error) {
      console.log(error);
      setNewData(initailValues);
      toast(contactErrorToast());
    }
    setIsAdding(false);
  };

  return (
    <Box>
      <Box cursor="pointer" display="flex" onClick={() => handleEdit(rowData)}>
        <Icon as={AiOutlineEdit} mr="1.5" />
        <Text>Edit</Text>
      </Box>
      {isAdding && (
        <Modal
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          size="sm"
          centerContent
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalHeader>Edit Row</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={newData.name}
                    onChange={(e) =>
                      setNewData({ ...newData, name: e.target.value })
                    }
                  />
                </FormControl>
                <HStack>
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      value={newData.amount}
                      onChange={(e) =>
                        setNewData({
                          ...newData,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      value={newData.date}
                      max={getCurrentDate()}
                      onChange={(e) =>
                        setNewData({ ...newData, date: e.target.value })
                      }
                    />
                  </FormControl>
                </HStack>

                <HStack>
                  {investedInOptions ? (
                    <>
                      <FormControl>
                        <FormLabel>Invested In</FormLabel>
                        <Select
                          onChange={(e) =>
                            setNewData({
                              ...newData,
                              investedIn: e.target.value,
                            })
                          }
                        >
                          <option value="">Select a option</option>
                          {investedInOptions &&
                            investedInOptions.map((invest) => {
                              return (
                                <option key={invest} value={invest}>
                                  {invest}
                                </option>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </>
                  ) : subCategoryOptions ? (
                    <>
                      <FormControl>
                        <FormLabel>SubCategory</FormLabel>
                        <Select
                          onChange={(e) => {
                            setNewData({
                              ...newData,
                              subCategory: e.target.value,
                            });
                            setCategoryOpt(subCategoryOptions[e.target.value]);
                          }}
                        >
                          <option value="">Select a sub-category</option>
                          {subCategoryOptions &&
                            Object.keys(subCategoryOptions).map(
                              (subCategory) => {
                                return (
                                  <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                  </option>
                                );
                              }
                            )}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onChange={(e) =>
                            setNewData({ ...newData, category: e.target.value })
                          }
                        >
                          <option value="">Select a category</option>
                          {categoryOpt &&
                            categoryOpt.map((category) => {
                              return (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Payment Via</FormLabel>
                        <Select
                          onChange={(e) =>
                            setNewData({ ...newData, paidVia: e.target.value })
                          }
                        >
                          <option value="">Select a option</option>
                          {paymentOptions &&
                            paymentOptions.map((payment) => {
                              return (
                                <option key={payment} value={payment}>
                                  {payment}
                                </option>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </>
                  ) : (
                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onChange={(e) =>
                          setNewData({ ...newData, category: e.target.value })
                        }
                      >
                        <option value="">Select a category</option>
                        {categoryOptions &&
                          categoryOptions.map((category) => {
                            return (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  )}
                </HStack>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={handleDelete}>
                Delete
              </Button>
              <Spacer />
              <Button sx={buttonStyle} onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default EditModel;
