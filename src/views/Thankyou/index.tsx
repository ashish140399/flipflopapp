import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}

const Thankyou: React.FC<Props> = () => {
    const [showlog, setShowlog] = React.useState(false);
    return (
        <>
            <Layout>
                <img
                    src="./images/Page/Page 6/kids_awards.png"
                    className="kids_awards"
                    alt=""
                />
                <img
                    src="./images/Page/Page 6/thank_you_text.png"
                    className="thank_you_text"
                    alt=""
                />
            </Layout>
        </>
    );
};
const Layout = styled.div`
    background: url("./images/Page/Page 6/pg_bg.png");
    background-size: cover;
    background-position: center;
    display: flex;
    // align-items: center;
    flex-direction: column;
    justify-content: center;
    align-items: Center;
    min-height: 100vh;
    .kids_awards {
        width: 70vw;
    }
    .thank_you_text {
        width: 70vw;
        padding-top: 0px;
    }
`;

export default Thankyou;
