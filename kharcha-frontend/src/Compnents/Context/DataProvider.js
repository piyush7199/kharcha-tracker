import { createContext, useState } from "react";
import { getCurrentDate, getStartDate } from "../../Constants/constants";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [startDate, setStartDate] = useState(getStartDate());
  const [endDate, setEndDate] = useState(getCurrentDate());

  return (
    <DataContext.Provider
      value={{
        user,
        load,
        startDate,
        endDate,
        setUser,
        setLoad,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
