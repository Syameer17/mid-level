import { useEffect, useState } from "react";

// MUI Imports
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  tableCellClasses,
  TablePagination,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Custom Components
import CustomCheckbox from "./Checkbox";

// Table cell styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Country {
  name: string;
  capital: string;
  region: string;
  numericCode: string;
  flags: {
    png: string;
  };
}

const TableFormat = (data: any) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortBy, setSortBy] = useState<keyof Country | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle sorting
  const sortedCountries = countries.sort((a, b) => {
    if (sortBy === null) {
      return 0;
    }

    let sortValue = 0;
    if (a[sortBy] < b[sortBy]) {
      sortValue = -1;
    } else if (a[sortBy] > b[sortBy]) {
      sortValue = 1;
    }

    return sortDirection === "asc" ? sortValue : sortValue * -1;
  });

  const handleSort = (column: keyof Country) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Table pagination handler
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch API
  const fetchCountryData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleSort("name")}
                  endIcon={
                    sortBy === "name" && sortDirection === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  }
                >
                  Name
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleSort("region")}
                  endIcon={
                    sortBy === "region" && sortDirection === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  }
                >
                  Region
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleSort("capital")}
                  endIcon={
                    sortBy === "capital" && sortDirection === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  }
                >
                  Capital
                </Button>
              </StyledTableCell>
              <StyledTableCell>Flag</StyledTableCell>
              <StyledTableCell>Favorites</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCountries
              .filter(
                (country) =>
                  country.name?.toLowerCase().includes(data.data) ||
                  country.capital?.toLowerCase().includes(data.data)
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country, index) => (
                <StyledTableRow key={country.numericCode}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{country.name}</StyledTableCell>
                  <StyledTableCell>{country.region}</StyledTableCell>
                  <StyledTableCell>{country.capital}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={country.flags.png}
                      alt="img"
                      width={90}
                      height={80}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomCheckbox id={country.numericCode} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
};

export default TableFormat;
