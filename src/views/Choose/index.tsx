import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
interface Props {}

const Choose: React.FC<Props> = () => {
    const [selcdesign, setSelcdesign] = useState("tshirt");
    const { selectedSize, setSelectedSize } = useContext(MyContext);
    console.log(selectedSize);
    React.useEffect(() => {
        setSelectedSize(selcdesign);
    }, [selcdesign]);
    return (
        <>
            <Layout>
                <div className="choosetakeaway">CHOOSE YOUR TAKE-A-WAY</div>

                <Wrapper>
                    <Grid container spacing={15} className="selboxes">
                        <Grid item md={6}>
                            <div
                                className={`${
                                    selcdesign === "tshirt" ? "active" : ""
                                } bx`}
                                onClick={() => setSelcdesign("tshirt")}
                            >
                                <img src="./images/tshirt.png" alt="" />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div
                                className={`${
                                    selcdesign === "tote" ? "active" : ""
                                } bx`}
                                onClick={() => setSelcdesign("tote")}
                            >
                                <img src="./images/tote.png" alt="" />
                            </div>
                        </Grid>
                    </Grid>
                </Wrapper>
                <Footer>
                    <div className="footerleft">
                        <Link className="nav-link" to="/info">
                            <button className="back_button">
                                <img src="./images/back_button.png" alt="" />
                            </button>
                        </Link>
                    </div>
                    <div className="footercenter">
                        <img src="./images/creative_weekend.png" alt="" />
                    </div>
                    <div className="footerright">
                        <Link className="nav-link" to="/customize">
                            <button className="next_button">
                                <img src="./images/next_button.png" alt="" />
                            </button>
                        </Link>
                    </div>
                </Footer>
            </Layout>
        </>
    );
};
const Layout = styled.div`
    background-image: linear-gradient(to bottom, #1b6b8e, #fff);
    min-height: 100vh;
    padding-top: 44px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .choosetakeaway {
        font-size: 54px;
        font-family: spotNormal;
        letter-spacing: 3px;
        color: #1d6c8f;
        font-weight: 100;
        background: #fff;
        padding: 6px 20px;
        width: 100%;
        text-align: center;
    }
`;
const Wrapper = styled.div`
    max-width: 65vw;
    margin: 40px auto 40px auto;
    .selboxes {
        .bx {
            display: flex;
            align-items: center;
            justify-content: Center;
            border: 6px solid transparent;
            border-radius: 80px;
            padding: 30px;
            cursor: pointer;
            &.active {
                border: 6px solid #ffe200;
            }
            img {
                height: 470px;
                width: auto;
            }
        }
    }
`;

const Footer = styled.div`
    background: #1b6b8e;
    padding: 50px 20px 10px 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .footercenter {
        padding-bottom: 20px;
        img {
            width: 100%;
            height: auto;
            max-width: 24vw;
        }
    }
    button {
        background: transparent;
        border: 0;
        outline: 0;
        width: 140px;
        // min-width: 200px;
        cursor: pointer;
        margin: 0;
        display: flex;
        align-items: center;
        img {
            width: 100%;
            height: auto;
        }
    }
`;

export default Choose;
