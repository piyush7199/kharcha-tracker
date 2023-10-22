import React from "react";
import { Box } from "@chakra-ui/react";

import Cards from "../Mis/Cards";
import DataTable from "../DataTables/DataTable";

const KharchaPage = ({
  investedInOptions,
  subCategoryOptions,
  paymentOptions,
  columnDetails,
  pageName,
  categoryOptions,
  elements,
  data,
}) => {
  return (
    <Box>
      <Box mb={2}>
        <Cards pageName={pageName} elements={elements} />
      </Box>
      <Box mx={"auto"} pt={2} px={{ base: 5, sm: 12, md: 17 }} mt={2}>
        <DataTable
          pageName={pageName}
          categoryOptions={categoryOptions}
          data={data}
          columnDetails={columnDetails}
          subCategoryOptions={subCategoryOptions}
          paymentOptions={paymentOptions}
          investedInOptions={investedInOptions}
        />
      </Box>
    </Box>
  );
};

export default KharchaPage;
