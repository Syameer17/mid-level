import { useState } from "react";

// MUI Imports
import { Box } from "@mui/material";

// Custom Components
import TableFormat from "../components/Table";
import SearchBar from "../components/SearchBar";

const Page: React.FC = () => {
  const [value, setValue] = useState("");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };
  

  return (
    <Box sx={{ p: 8, backgroundColor: "#808080" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <SearchBar onValueChange={handleValueChange} />
      </Box>
      <TableFormat data={value} />
    </Box>
  );
};

export default Page;
