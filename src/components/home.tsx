import React, { useState, useEffect } from "react";
import Card from "../components/card";
import DisplayData from "../components/displayData";
import { DebounceInput } from "react-debounce-input";
import ElancoIcon from "../asset/elanco.png";

const Home = () => {
    const [data, setData] = useState([]);
    const [workingData, setWorkingData] = useState([]);
    const [currentData, setCurrentData] = useState("");
    const [searchTxt, setSearchTxt] = useState("");

    useEffect(() => {
        fetch("https://engineering-task.elancoapps.com/api/applications")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setWorkingData(data);
                setCurrentData(data[0]);
            });
    }, []);

    function isStringInWord(word: string, string: string): boolean {
        let lowerWord = word.toLowerCase();
        let lowerStr = string.toLowerCase();
        const regex = new RegExp(`\\b.*${lowerStr}.*\\b`);
        return regex.test(lowerWord);
    }

    useEffect(() => {
        function handleSearch(txt: string): void {
            if (txt) {
                let copyApplications: any = [];
                for (let item of data) {
                    let isValid = isStringInWord(item, txt);
                    if (isValid) {
                        copyApplications.push(item);
                    }
                }
                setWorkingData(copyApplications);
                setCurrentData(copyApplications[0]);
            } else {
                setWorkingData(data);
                setCurrentData(data[0]);
            }
        }
        handleSearch(searchTxt);
    }, [searchTxt, data]);

    return (
        <>
            <div className="home-container">
                <div className="left-menu-bar">
                    <div className="img-container">
                        <a href="/">
                            <img className="logo-img" src={ElancoIcon} alt="" />
                        </a>
                    </div>
                    <div className="img-container">
                        <a href="/">
                            <img
                                style={{ width: "35px" }}
                                className="logo-img"
                                src="https://icon-library.com/images/home-address-icon/home-address-icon-2.jpg"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
                <div className="top-menu-bar">
                    <div className="title">Elanco App</div>
                </div>
                <div className="data-container">
                    <div className="left-section">
                        <div className="search-container">
                            <DebounceInput
                                minLength={1}
                                debounceTimeout={300}
                                name="searchText"
                                onChange={(e) => setSearchTxt(e.target.value)}
                                className="search-input"
                                autoComplete="off"
                                placeholder="search e.g: application name"
                            />
                            {workingData.length > 0 ? (
                                <div className="title2">
                                    Showing {workingData.length} out of {data.length}{" "}
                                    results
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="cards-container">
                            {workingData && workingData.length > 0 ? (
                                <>
                                    {workingData.map((item: any, inx: number) => {
                                        return (
                                            <div
                                                key={`item_key${inx}`}
                                                onClick={() => setCurrentData(item)}
                                            >
                                                <Card data={item} isSelected={currentData === item} />
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="right-section">
                        <DisplayData currentData={currentData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
