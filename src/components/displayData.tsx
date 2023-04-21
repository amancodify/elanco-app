import React, { useState, useEffect } from "react";
import Card from "./card";
import Skeleton from "react-loading-skeleton";

const DisplayData = (props: any) => {
    let { currentData } = props;
    const [appData, setAppData] = useState([]);
    const [workingData, setWorkingData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://engineering-task.elancoapps.com/api/applications/${currentData}`)
            .then((response) => response.json())
            .then((data) => {
                setAppData(data);
                setWorkingData(data);
                setIsLoading(false);
            });
    }, [currentData]);

    const handleSort = (highFirst: boolean = true) => {
        let copyAppdata = [...appData];
        let newData = copyAppdata.sort((a: any, b: any) =>
            highFirst
                ? parseFloat(b.Cost) - parseFloat(a.Cost)
                : parseFloat(a.Cost) - parseFloat(b.Cost),
        );
        setWorkingData(newData);
    };

    return (
        <>
            <div className="display-data-container">
                {isLoading ? (
                    <Skeleton count={15} height={40} style={{ marginBottom: "10px" }} />
                ) : (
                    <>
                        {currentData ? <div className="disp-header-bar">{currentData}</div> : <></>}
                        <div className="sort-data">
                            <div>Sort by cost</div>
                            <button className='sort-btn' onClick={() => handleSort()}>
                                <span>&#8593;</span>
                            </button>
                            <button className='sort-btn' onClick={() => handleSort(false)}>
                                <span>&#8595;</span>
                            </button>
                        </div>

                        <div className="data-transactions">
                            {workingData && workingData.length > 0 ? (
                                workingData.map((item, inx) => {
                                    return <Card key={`trans_${inx}`} transData={item} />;
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DisplayData;
