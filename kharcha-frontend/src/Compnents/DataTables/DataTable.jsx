import React from "react";
import { useTable, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";

import { COLORS } from "../../Constants/constants";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import Models from "../Model/Models";
import EditModel from "../Model/EditModel";

const DataTable = ({
  subCategoryOptions,
  paymentOptions,
  columnDetails,
  pageName,
  categoryOptions,
  data,
  investedInOptions,
}) => {
  const columns = React.useMemo(() => {
    const firstColumn = [
      {
        Header: "ID", // Column header label (not visible)
        accessor: "id", // Use the "id" property from your data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ];

    const lastColumn = [
      {
        Header: "Action",
        accessor: "action",
        disableSortBy: true,
        Cell: (row) => {
          return (
            <EditModel
              categoryOptions={categoryOptions}
              pageName={pageName}
              rowData={row.row}
              subCategoryOptions={subCategoryOptions}
              paymentOptions={paymentOptions}
              investedInOptions={investedInOptions}
            />
          );
        },
      },
    ];

    const additionalColumns = columnDetails.map((detail) => ({
      Header: detail.label, // Column header label
      accessor: detail.accessor, // Use the accessor from columnDetails
    }));

    return [...firstColumn, ...additionalColumns, ...lastColumn];
  }, [pageName]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <Box
      px={{ base: 2, md: 4 }}
      mt={{ base: 2, md: 9 }}
      py={{ base: 2, md: 4 }}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={useColorModeValue("white", COLORS.DARK_BLACK_COLOR)}
    >
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box mb={2} width={{ base: "100%", md: "auto" }}>
          <Models
            subCategoryOptions={subCategoryOptions}
            paymentOptions={paymentOptions}
            pageName={pageName}
            categoryOptions={categoryOptions}
            investedInOptions={investedInOptions}
          />
        </Box>
      </Flex>
      <TableContainer>
        <Table variant="striped" bg={COLORS.MAIN_COLOR} {...getTableProps()}>
          <TableCaption>
            Statement for the month of {new Date().getMonth()}
          </TableCaption>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    color="white"
                    maxW="lg"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      display: column.id === "id" ? "none" : "table-cell",
                    }}
                  >
                    <Box
                      display="flex"
                      cursor={column.id === "action" ? "" : "pointer"}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <Icon
                              mt={0.9}
                              mr={2}
                              fontSize="16"
                              color="white"
                              as={HiSortDescending}
                            />
                          ) : (
                            <Icon
                              mt={0.9}
                              mr={2}
                              fontSize="16"
                              color="white"
                              as={HiSortAscending}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        {...cell.getCellProps()}
                        style={{
                          display:
                            cell.column.id === "id" ? "none" : "table-cell",
                        }}
                      >
                        {cell.column.id === "action"
                          ? cell.render("Cell")
                          : cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
