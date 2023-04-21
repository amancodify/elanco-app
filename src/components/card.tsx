const Card = (props: any) => {
    let { data, transData, isSelected } = props;
    return (
        <>
            <div className={`card-container ${isSelected ? 'card-selected': ''}`}>
                <div className="card-upper-section">
                    {data ? (
                        <>
                            <div className="card-icon">{data.slice(0, 2).toUpperCase()}</div>
                            <div className="">{data}</div>
                        </>
                    ) : (
                        <></>
                    )}
                    {transData ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div className="trans-cards-main">
                                <div className="trans-card">
                                    <div className="data-values">
                                        <div className="data-key">Date</div>
                                        <div className="data-value">- {transData.Date}</div>
                                    </div>
                                    <div className="data-values">
                                        <div className="data-key">Service Name </div>
                                        <div className="data-value">- {transData.ServiceName}</div>
                                    </div>
                                    <div className="data-values">
                                        <div className="data-key">Meter Category </div>
                                        <div className="data-value">
                                            - {transData.MeterCategory}
                                        </div>
                                    </div>
                                    <div className="data-values">
                                        <div className="data-key">Resource Location </div>
                                        <div className="data-value">
                                            - {transData.ResourceLocation}
                                        </div>
                                    </div>
                                </div>
                                <div className="trans-card">
                                    <div className="data-values">
                                        <div className="data-key">Location</div>
                                        <div className="data-value">- {transData.Location}</div>
                                    </div>
                                    <div className="data-values">
                                        <div className="data-key">Consumed Quantity</div>
                                        <div className="data-value">
                                            - {transData.ConsumedQuantity}
                                        </div>
                                    </div>
                                    <div className="data-values">
                                        <div className="data-key">Cost</div>
                                        <div className="data-value">- {transData.Cost}</div>
                                    </div>
                                    <div className="data-values">
                                        <div className="data-key">Unit Of Measure</div>
                                        <div className="data-value">
                                            - {transData.UnitOfMeasure}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-tags">
                                {transData.Tags ? (
                                    <>
                                        {Object.values(transData.Tags).map(
                                            (item: any, inx: number) => {
                                                return (
                                                    <div key={`tag_${inx}`} className="tag">
                                                        {item}
                                                    </div>
                                                );
                                            },
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="card-lower-section"></div>
            </div>
        </>
    );
};

export default Card;
