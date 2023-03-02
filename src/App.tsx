import React, { createContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Admin from "./views/Admin";
import Choose from "./views/Choose";
import Customize from "./views/Customize";
import Info from "./views/Info";
import Thankyou from "./views/Thankyou";
import Welcome from "./views/Welcome";
// @ts-ignore
export const MyContext = createContext({
    selectedSize: "",
    setSelectedSize: (design) => {},
    selectedGradient: 1,
    setSelectedGradient: (design) => {},
    userName: "",
    setUserName: (design) => {},
});
function App() {
    const [selectedSize, setSelectedSize] = React.useState("AS");
    const [selectedGradient, setSelectedGradient] = React.useState(3);
    const [userName, setUserName] = React.useState("");
    return (
        <MyContext.Provider
            value={{
                selectedSize,
                setSelectedSize,
                selectedGradient,
                setSelectedGradient,
                userName,
                setUserName,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/choose" element={<Choose />} />
                    <Route path="/customize" element={<Customize />} />
                    <Route path="/thankyou" element={<Thankyou />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default App;
