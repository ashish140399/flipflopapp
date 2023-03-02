import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import LoaderAnimation from "../components/LoaderAnimation";
// import { Grid } from "@mui/material";
interface Props {}

const Customize: React.FC<Props> = () => {
    const [selArtboard, setSelArtboard] = useState([]);
    const [canvasObjects, setCanvasObjects] = useState([]);
    const [showloader, setShowloader] = useState(false);
    const [canvas, setCanvas] = useState(null);
    const navigate = useNavigate();
    const [designfinalised, setDesignfinalised] = useState(false);
    const [objectadding, setObjectadding] = useState(true);

    const {
        selectedSize,
        setSelectedSize,
        selectedGradient,
        setSelectedGradient,
    } = useContext(MyContext);
    // const [selcdesign, setSelcdesign] = useState(selectedSize);

    const [screennum, setScreennum] = useState(1);
    const [gradselector, setGradselector] = useState(selectedGradient);
    console.log(selectedSize);
    React.useEffect(() => {
        setSelectedGradient(gradselector);
    }, [selectedGradient]);
    // const toggledesignSelection = () => {
    //     if (selcdesign === "tshirt") {
    //         setSelcdesign("tote");
    //     } else if (selcdesign === "tote") {
    //         setSelcdesign("tshirt");
    //     }
    // };

    const toggleArtSelection = (index: any) => {
        if (selArtboard.includes(index)) {
            setObjectadding(false);
            let currentindexofelement = selArtboard.indexOf(index);
            canvas.remove(canvasObjects[currentindexofelement]);
            const filteredobjectlist = canvasObjects;
            filteredobjectlist.splice(currentindexofelement, 1);
            setCanvasObjects(filteredobjectlist);
            const filteredlist = selArtboard.filter((x: any) => x != index);
            setSelArtboard(filteredlist);
        } else {
            setObjectadding(true);
            setSelArtboard([...selArtboard, index]);
        }
    };

    const downloadimage = () => {
        setShowloader(true);
        var dataURL = canvas.toDataURL({
            format: "png",
            quality: 15,
            multiplier: 6,
        });

        var link = document.createElement("a");
        link.download = `canvas.png`;
        link.href = dataURL;
        link.click();
        if (dataURL) {
            setShowloader(false);
            navigate("/thankyou");
        }
    };

    const canvasRef = useRef(null);

    const rightWrapperRef = useRef(null);
    const handleMouseWheel = (event) => {
        const delta = event.e.deltaY;
        let zoom = canvas.getZoom();
        zoom = zoom + delta / 1100;
        if (zoom > 20) zoom = 20; // set maximum zoom level
        if (zoom < 0.01) zoom = 0.01; // set minimum zoom level
        canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
        event.e.preventDefault();
        event.e.stopPropagation();
    };

    // creates and saves the canvas element
    useEffect(() => {
        if (canvasRef.current && rightWrapperRef.current) {
            setCanvas(
                new fabric.Canvas("demo", {
                    targetFindTolerance: 5,
                    width: 599,
                    height: 696,
                })
            );
        }
    }, []);

    // generates the canvas at the initial load of the page
    useEffect(() => {
        if (canvas) {
            let imgurl = `images/templates/${selectedSize}/${selectedSize}---${gradselector}.png`;
            let flplogo1 = `images/floplogo1.png`;
            let flplogo2 = `images/floplogo2.png`;
            fabric.Image.fromURL(imgurl, (bgimage) => {
                canvas.setBackgroundImage(
                    bgimage,
                    canvas.renderAll.bind(canvas),
                    {
                        // Set the properties of the image
                        scaleX: canvas.width / bgimage.width,
                        scaleY: canvas.height / bgimage.height,
                    }
                );

                fabric.Image.fromURL(flplogo1, (img) => {
                    img.set({
                        selectable: false, // allow object to be selected/dragged
                        evented: false,
                        hasControls: false,
                        hasBorders: false,
                    });
                    img.scale(0.6);
                    canvas.add(img);
                    canvas.centerObject(img);
                    img.set({
                        left: img.left - 170,
                        top: img.top + 240,
                    });
                });

                fabric.Image.fromURL(flplogo2, (img) => {
                    img.set({
                        selectable: false, // allow object to be selected/dragged
                        evented: false,
                        hasControls: false,
                        hasBorders: false,
                    });
                    img.scale(0.5);
                    canvas.add(img);
                    canvas.centerObject(img);
                    img.set({
                        left: img.left + 175,
                        top: img.top + 240,
                    });
                });
            });
        }
    }, [canvas, gradselector]);

    useEffect(() => {
        if (canvas) {
            canvas.clear();
            canvas.renderAll();
        }
    }, [canvas]);

    // updates the canvas when the design is finalised
    useEffect(() => {
        if (canvas) {
            const objectarray = canvas.getObjects();
            console.log(objectarray);
            if (designfinalised) {
                canvas.forEachObject(function (object) {
                    object.selectable = false;
                    object.hasBorders = false;
                    object.hasControls = false;
                });
                // objectarray[1].visible = false;
                canvas.discardActiveObject().renderAll();
            } else {
                for (let i = 2; i < objectarray.length; i++) {
                    objectarray[i].selectable = true;
                    objectarray[i].hasBorders = true;
                    objectarray[i].hasControls = true;
                }

                // objectarray[1].visible = true;
                canvas.setActiveObject(objectarray[0]);
            }
        }
    }, [designfinalised]);

    // it will update the canvas when we will changing screens i.e. will be selecing size of flops
    useEffect(() => {
        if (canvas) {
            const objectarray = canvas.getObjects();
            console.log(objectarray);
            if (objectarray.length > 0) {
                if (screennum == 1) {
                    for (let i = 2; i < objectarray.length; i++) {
                        objectarray[i].visible = false;
                        canvas.discardActiveObject().renderAll();
                    }
                } else {
                    for (let i = 2; i < objectarray.length; i++) {
                        objectarray[i].visible = true;
                        canvas.setActiveObject(objectarray[0]);
                        canvas.renderAll();
                    }
                }
            }
        }
    }, [screennum]);

    // update the canvas with selected artboard and refresh canvas
    useEffect(() => {
        if (canvas) {
            if (objectadding) {
                let imgurl = `images/elements/${
                    selArtboard[selArtboard.length - 1]
                }.png`;
                fabric.Image.fromURL(imgurl, (img) => {
                    img.set({
                        // scaleX: 80 / img.width,
                        // scaleY: 80 / img.height,
                        selectable: true, // allow object to be selected/dragged
                        evented: true,
                    });
                    img.scale(0.1);
                    canvas.selection = true;
                    canvas.setActiveObject(img).add(img);
                    canvas.centerObject(img);
                    setCanvasObjects([...canvasObjects, img]);
                });
            } else {
            }
        }
    }, [selArtboard]);
    return (
        <>
            {showloader && <LoaderAnimation />}

            <Layout>
                {screennum == 1 ? (
                    <h1 className="customize">CHOOSE YOUR BACKGROUND</h1>
                ) : screennum == 2 ? (
                    <h1 className="customize">CHOOSE YOUR GRAPHICS</h1>
                ) : (
                    <h1 className="customize">CONFIRM YOUR DESIGN</h1>
                )}

                <Wrapper>
                    <TopWrapper ref={rightWrapperRef}>
                        <canvas ref={canvasRef} id="demo" />
                    </TopWrapper>
                </Wrapper>
                {screennum == 1 ? (
                    <Footer>
                        <BottomWrapper>
                            <div className="sliderwrapper page1">
                                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                                    <SelectorBox
                                        key={index}
                                        onClick={() => setGradselector(index)}
                                        className={`${
                                            gradselector === index
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            src={`images/grad/${index}.png`}
                                            alt=""
                                        />
                                    </SelectorBox>
                                ))}
                            </div>
                        </BottomWrapper>
                        <div className="footerflex">
                            <div className="footerleft">
                                <Link className="nav-link" to="/choose">
                                    <button className="back_button">
                                        <img
                                            src="./images/back_button.png"
                                            alt=""
                                        />
                                    </button>
                                </Link>
                            </div>
                            <div className="footercenter">
                                <div className="text">
                                    TAP ON THE BUTTONS ABOVE TO CHANGE YOUR
                                    BACKGROUND
                                </div>
                            </div>
                            <div className="footerright">
                                <button
                                    className="next_button"
                                    onClick={() => setScreennum(2)}
                                >
                                    <img
                                        src="./images/next_button.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </Footer>
                ) : screennum == 2 ? (
                    <Footer>
                        <BottomWrapper>
                            <div className="sliderwrapper page1 page2">
                                {[
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                                    14, 15, 16, 17, 18, 19, 20,
                                ].map((index) => (
                                    <SelectorBox
                                        key={index}
                                        onClick={() =>
                                            toggleArtSelection(index)
                                        }
                                        className={`${
                                            selArtboard.includes(index)
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            src={`images/elements/${index}.png`}
                                            alt=""
                                        />
                                    </SelectorBox>
                                ))}
                            </div>
                        </BottomWrapper>
                        <div className="footerflex">
                            <div className="footerleft">
                                <button
                                    className="back_button"
                                    onClick={() => setScreennum(1)}
                                >
                                    <img
                                        src="./images/back_button.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                            <div className="footercenter">
                                <div className="text">
                                    SWIPE THE GALLERY ABOVE AND TAP TO ADD
                                    GRAPHICS TO YOUR DESIGN
                                </div>
                            </div>
                            <div className="footerright">
                                <button
                                    className="next_button"
                                    onClick={() => {
                                        setScreennum(3);
                                        setDesignfinalised(true);
                                    }}
                                >
                                    <img
                                        src="./images/next_button.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </Footer>
                ) : (
                    <Footer className="footerfinal">
                        <div className="footerflex">
                            <div className="footerleft">
                                <button
                                    className="back_button"
                                    onClick={() => {
                                        setScreennum(2);
                                        setDesignfinalised(false);
                                    }}
                                >
                                    <img
                                        src="./images/back_button.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                            <div className="footerright">
                                <button
                                    className="next_button"
                                    onClick={() => downloadimage()}
                                >
                                    <img
                                        src="./images/confirm_button.png"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </Footer>
                )}
            </Layout>
        </>
    );
};
const Layout = styled.div`
    background: url("./images/Page/Page 3/pg_bg.png");
    background-size: cover;
    background-position: top;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    .customize {
        color: #fff;
        font-size: 40px;
        font-family: rocgroteskHeavy;
        letter-spacing: 3px;
        margin: 0;
        text-align: center;
        font-weight: 100;
        padding: 12px 0;
        padding-bottom: 0px;
        filter: drop-shadow(0 3px 6px #000);
    }
`;

const SelectorBox = styled.div`
    // background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    // border: 2px solid #707070;
    // overflow: hidden;
    border-radius: 11px;
    cursor: pointer;
    min-height: 40px;
    // box-shadow: inset 0 0 10px #f8a100;
    // &.active {
    //     border-color: #ff64bd;
    // }
    img {
        width: 80px;
    }
`;
const BottomWrapper = styled.div`
    padding: 0px;
    // width: 400px;
    // max-height: calc(100vh - 184px);
    box-sizing: border-box;

    .sliderwrapper {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        overflow: auto;
        // flex-flow: wrap;
        margin-bottom: 30px;
        margin-top: -45px;
        &.page1 {
            justify-content: Center;
            overflow: scroll;
            ${SelectorBox} {
                padding: 0;
                margin: 0 7px;
                border-radius: 0;
                border: 7px solid transparent;
                img {
                    height: 70px;
                    width: auto;
                    filter: drop-shadow(0 3px 6px #000);
                }
                &.active {
                    border: 7px solid #f21489;
                    img {
                        filter: drop-shadow(0 3px 6px #000);
                    }
                }
            }
        }
        &.page2 {
            justify-content: flex-start;
            width: 95vw;
            ${SelectorBox} {
                border: 0;
                margin: 0 9px;
                img {
                    height: 80px;
                }
                &.active {
                    border: 0;
                    img {
                        filter: drop-shadow(0px 0px 12px #f21489);
                    }
                }
            }
        }
    }
`;

const TopWrapper = styled.div`
    // background: #fff;
    height: 100%;
    width: 85vw;
    height: 700px;
    box-sizing: border-box;
    margin-bottom: 60px;
    overflow: hidden;
    display: flex;
    align-items: Center;
    justify-content: Center;
    // display: none;

    canvas {
        width: 100%;
        height: 100%;
    }
`;
const Wrapper = styled.div`
    display: flex;
    // border-top: 1px solid #707070;
    flex-direction: column;
`;
const Footer = styled.div`
    background: #47e83a;
    padding: 14px 20px 10px 20px;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 30px;
    width: 100%;
    box-sizing: border-box;

    .footerflex {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: -24px;
        margin-top: -18px;
    }
    button {
        background: transparent;
        border: 0;
        outline: 0;
        width: 140px;
        min-width: 140px;
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
    .footerleft {
        display: flex;
        align-items: center;
        width: 30vw;
    }
    .footercenter {
        .text {
            text-align: center;
            color: #501267;
            font-family: rocgroteskRegular;
            font-size: 24px;
            font-weight: 600;
            margin-top: 0px;
        }
    }
    .footerright {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    &.footerfinal {
        background: Transparent;
        .footerright {
            button {
                width: 210px;
            }
        }
    }
`;

export default Customize;
