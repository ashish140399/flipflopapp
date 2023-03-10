import * as React from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createGlobalStyle } from "styled-components";
import { Button } from "@mui/material";
import axios from "axios";
import { TRUE } from "sass";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background:#f3f3f3;
  }
`;

function createData(id: any, name: string, size: string) {
    return { id, name, size };
}

const rows = [createData(1, "asdf", "AS")];

interface Props {}
const downloadit = (url) => {
    var link = document.createElement("a");
    link.download = `result.png`;
    link.href = url;
    link.click();
};

const Admin: React.FC<Props> = () => {
    const [dbres, setDbres] = React.useState(null);
    const [showadmin, setShowadmin] = React.useState(true);
    React.useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/fetchdb`)
            .then((response) => {
                // console.log(response.data);
                setDbres(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    React.useEffect(() => {
        //let foo = prompt("Enter code to login to admin :-)");
       // if (foo === "silverfox") {
        //    setShowadmin(true);
      //  }
    }, []);

    return (
        <>
            <GlobalStyle />
            {showadmin && (
                <Layout>
                    <div className="heading">
                        <h1>Admin Panel</h1>Flip Flops
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Size</TableCell>
                                    <TableCell align="right">Preview</TableCell>
                                    <TableCell align="right">
                                        Download
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dbres &&
                                    dbres.map((res) => (
                                        <TableRow
                                            key={res.id}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {res.id}
                                            </TableCell>
                                            <TableCell align="right">
                                                {res.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {res.size}
                                            </TableCell>
                                            <TableCell align="right">
                                                <img
                                                    src={res.canvasuri}
                                                    className="canvaspreview"
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        downloadit(
                                                            res.canvasuri
                                                        )
                                                    }
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Layout>
            )}
        </>
    );
};
const Layout = styled.div`
    max-width: 1000px;
    margin: auto;
    background: #fff;
    padding: 24px;
    margin-top: 40px;
    border-radius: 12px;
    .heading {
        background: linear-gradient(to top, #5d6dc3, #3c86d8);
        color: #fff;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        margin-bottom: 14px;
        h1 {
            font-size: 22px;
        }
    }
    .canvaspreview {
        width: 100px;
        height: 100px;
    }
    .MuiTableHead-root {
        background: #f7f7f7 !important;
    }
    .MuiTableCell-root {
        padding-top: 14px !important;
        padding-bottom: 14px !important;
    }
`;

export default Admin;
