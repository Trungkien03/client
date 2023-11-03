import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { green } from "@mui/material/colors";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import FormBuy from "../Form/FormBuy";
import Loading from "../Loading/Loading";

const columns = [
  { id: "ticketid", label: "Ticket ID", minWidth: 170 },

  {
    id: "exp_date",
    label: "Expiration Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "price",
    label: "Ticket Price",
    minWidth: 170,
    align: "center",
  },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "BuyTicket",
    label: "Buy Ticket",
    minWidth: 170,
    align: "center",
  },
];

const defaultTheme = createTheme();
export default function TicketList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    axios
      .get("https://654506c45a0b4b04436d7cb5.mockapi.io/api/v1/ticket")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  const convertValue = (columnId, value) => {
    if (columnId === "exp_date") {
      const date = new Date(value * 1000);
      return date.toLocaleDateString("en-US");
    } else if (columnId === "price") {
      return `${value} $`;
    } else {
      return value;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (tickets.length <= 0) {
    return (
      <>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 16,
                pb: 6,
                textAlign: "center",
              }}
            >
              <Container maxWidth="lg">
                <Typography style={{ color: green[500] }} variant="h3">
                  All Available Tickets
                </Typography>
              </Container>
            </Box>

            <Container maxWidth="xl">
              <Paper
                sx={{
                  width: "100%",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              ></Paper>
              <Loading />
            </Container>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 16,
                pb: 6,
                textAlign: "center",
              }}
            ></Box>
          </main>
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <FormBuy ticket={selectedTicket} setSelectedTicket={setSelectedTicket} />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 26,
              pb: 6,
              textAlign: "center",
            }}
          >
            <Container maxWidth="lg">
              <Typography style={{ color: green[500] }} variant="h3">
                All Available Tickets
              </Typography>
            </Container>
          </Box>

          <Container maxWidth="xl">
            <Paper
              sx={{
                width: "100%",
                border: "2px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <TableContainer
                sx={{
                  maxHeight: 640,
                  maxWidth: 1500,
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ backgroundColor: green[500], color: "white" }}
                        align="center"
                        colSpan={2}
                      >
                        Tickets
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: green[500], color: "white" }}
                        align="center"
                        colSpan={3}
                      >
                        Details
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            top: 57,
                            minWidth: column.minWidth,
                            color: green[500],
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = convertValue(
                                column.id,
                                row[column.id]
                              );
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                  {column.id === "BuyTicket" && (
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      style={{ backgroundColor: green[500] }}
                                      onClick={() => setSelectedTicket(row)}
                                    >
                                      Buy This
                                    </Button>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tickets.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Container>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 16,
              pb: 6,
              textAlign: "center",
            }}
          ></Box>
        </main>
      </ThemeProvider>
    </>
  );
}
