import * as React from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

interface Props {}

const Info: React.FC<Props> = () => {
    const [sizeaccept, setSizeaccept] = React.useState("0");
    console.log(sizeaccept);
    const handleAcceptChange = (event: SelectChangeEvent) => {
        setSizeaccept(event.target.value as string);
    };
    return (
        <>
            <Layout>
                <RowBox>
                    <h1>ENTER YOUR FIRST NAME</h1>
                    <input type="text" placeholder="FIRST NAME" />
                </RowBox>

                <RowBox>
                    <h1 className="second">PICK YOUR FLOP SIZE</h1>
                    <FormControl fullWidth>
                        <Select
                            labelId="timeSelect"
                            id="timeSelect"
                            defaultValue={sizeaccept}
                            value={sizeaccept}
                            onChange={handleAcceptChange}
                        >
                            <MenuItem value={0}>AL</MenuItem>
                            <MenuItem value={1}>AM</MenuItem>
                            <MenuItem value={2}>AS</MenuItem>
                            <MenuItem value={3}>KL</MenuItem>
                            <MenuItem value={3}>KM</MenuItem>
                            <MenuItem value={3}>KS</MenuItem>
                        </Select>
                    </FormControl>
                </RowBox>
                <Link className="nav-link" to="/customize">
                    <button className="enter_button">
                        <img src="./images/Page/Page 2/submit_btn.png" alt="" />
                    </button>
                </Link>
                <img
                    src="./images/Page/Page 2/pglogo.png"
                    className="logo_btm"
                    alt=""
                />
            </Layout>
        </>
    );
};
const RowBox = styled.div`
    width: 100%;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
    h1 {
        color: rgba(255, 255, 255, 1);
        font-size: 42px;
        font-family: rocgroteskHeavy;
        font-weight: 100;
        letter-spacing: 3px;
        margin: 0;
        margin-bottom: 5px;
        text-align: center;
        &.second {
            font-size: 50px;
        }
    }
    input {
        width: 100%;
        margin: 0;
        border: 1px solid rgba(0, 0, 0, 0.4);
        font-size: 64px;
        outline: 0;
        padding: 10px 15px;
        box-sizing: border-box;
        text-align: center;
        filter: drop-shadow(0 3px 6px #000);
        &::placeholder {
            color: rgba(112, 112, 112, 0.19);
        }
    }
    .MuiInputBase-formControl {
        color: #000 !important;
        font-size: 64px !important;
        background: #fff;
        filter: drop-shadow(0 3px 6px #000);
        .MuiInputBase-input {
            padding: 8px 18px !important;
        }
        .MuiOutlinedInput-notchedOutline {
            border: 1px solid #fff !important;
            border-radius: 0 !important;
        }
        .MuiSvgIcon-root {
            font-size: 160px !important;
            color: #ff6700 !important;
            margin-right: -40px;
        }
    }
`;
const Layout = styled.div`
    background: url("./images/Page/Page 2/pg_bg.png");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;

    min-width: 280px;
    padding: 0 10vw;
    .logo_btm {
        position: absolute;
        width: 30vw;
        bottom: 10px;
    }
    .enter_button {
        background: transparent;
        border: 0;
        outline: 0;
        width: 42vw;
        cursor: pointer;
        margin-top: 50px;
        padding: 0;
        img {
            width: 100%;
            height: auto;
        }
    }
`;

export default Info;
