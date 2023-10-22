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
  Select,
  Stack,
  useToast,
  HStack,
} from "@chakra-ui/react";

import {
  COLORS,
  PAGENAMES,
  contactErrorToast,
  getCurrentDate,
  getToast,
} from "../../Constants/constants";
import { API } from "../../Services/apis";
import { DataContext } from "../Context/DataProvider";

const Models = ({
  subCategoryOptions,
  paymentOptions,
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

  const initailState = {
    name: "",
    amount: "",
    date: getCurrentDate(),
    category: "",
    subCategory: "",
    paidVia: "",
    investedIn: "",
  };

  const [isAdding, setIsAdding] = useState(false);
  const [kharcha, setkharcha] = useState(initailState);
  const { load, setLoad } = useContext(DataContext);
  const [categoryOpt, setCategoryOpt] = useState("");
  const toast = useToast();

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      let res;
      if (pageName === PAGENAMES.INCOME) {
        res = await API.addIncome(kharcha);
      } else if (pageName === PAGENAMES.EXPENSE) {
        res = await API.addExpense(kharcha);
      } else if (pageName === PAGENAMES.INVESTMENT) {
        res = await API.addInvestment(kharcha);
      } else {
        return;
      }
      if (res.isSuccess) {
        setkharcha(initailState);
        setLoad(!load);
      } else {
        toast(getToast(`Error while adding ${pageName}`, res.message, true));
      }
    } catch (error) {
      toast(contactErrorToast());
    }
    setIsAdding(false);
  };

  return (
    <Box>
      <Button sx={buttonStyle} onClick={handleAdd}>
        Add
      </Button>
      {isAdding && (
        <Modal
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          centerContent
          size="sm"
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalHeader>Add New Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    onChange={(e) =>
                      setkharcha({ ...kharcha, name: e.target.value })
                    }
                  />
                </FormControl>
                <HStack>
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      onChange={(e) =>
                        setkharcha({
                          ...kharcha,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      value={kharcha.date}
                      max={getCurrentDate()}
                      onChange={(e) =>
                        setkharcha({ ...kharcha, date: e.target.value })
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
                            setkharcha({
                              ...kharcha,
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
                            setkharcha({
                              ...kharcha,
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
                            setkharcha({ ...kharcha, category: e.target.value })
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
                            setkharcha({ ...kharcha, paidVia: e.target.value })
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
                          setkharcha({ ...kharcha, category: e.target.value })
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
              <Button variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
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

export default Models;
