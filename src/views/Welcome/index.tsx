import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}

const Welcome: React.FC<Props> = () => {
    const [showlog, setShowlog] = React.useState(false);
    return (
        <>
            <Link className="nav-link" to="/info">
                <Layout>
                    <img
                        src="./images/Page/Page 1/front_back.png"
                        className="welcome"
                        alt=""
                    />
                </Layout>
            </Link>
        </>
    );
};
const Layout = styled.div`
    background: url("./images/Page/Page 1/pg_bg.png");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    .welcome {
        width: 80vw;
    }
`;

export default Welcome;
