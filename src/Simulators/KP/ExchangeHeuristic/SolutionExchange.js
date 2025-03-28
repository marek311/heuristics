import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function SolutionExchange({
                              exchangeHistory,
                              originalIndexI,
                              originalIndexJ,
                              admissible,
                              improving,
                              betterBest,
                              bestFoundSolution,
                              bestFoundPrice,
                              bestFoundWeight,
                              strategy,
                          }) {
    const graphRef = useRef();

    useEffect(() => {
        const width = 800;
        const paddingLeft = 40;
        const rectSize = 18;
        const rectGap = 2;
        const rowHeight = 60;

        const svg = d3.select(graphRef.current)
            .attr("width", width)
            .attr("height", exchangeHistory.length * rowHeight + 50);

        svg.selectAll("*").remove();

        const reversedHistory = [...exchangeHistory].reverse();

        const renderExchange = (exchange, index) => {
            const yOffset = index * rowHeight + 20;

            svg.append("text")
                .attr("x", paddingLeft - 15)
                .attr("y", yOffset + rectSize / 2)
                .attr("text-anchor", "end")
                .attr("alignment-baseline", "middle")
                .attr("font-size", 14)
                .text(`#${exchangeHistory.length - index}`);

            const vectorGroup = svg.append("g")
                .attr("transform", `translate(${paddingLeft}, ${yOffset})`);

            vectorGroup.selectAll("rect")
                .data(exchange.binaryVector)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * (rectSize + rectGap))
                .attr("y", 0)
                .attr("width", rectSize)
                .attr("height", rectSize)
                .attr("fill", d => (d ? "green" : "red"))
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            vectorGroup.selectAll("text")
                .data(exchange.binaryVector)
                .enter()
                .append("text")
                .attr("x", (d, i) => i * (rectSize + rectGap) + rectSize / 2)
                .attr("y", rectSize + 15)
                .attr("text-anchor", "middle")
                .attr("font-size", 10)
                .text((d, i) => i);

            svg.append("text")
                .attr("x", paddingLeft + exchange.binaryVector.length * (rectSize + rectGap) + 10)
                .attr("y", yOffset + 15)
                .attr("font-size", 14)
                .text(`Weight: ${exchange.newWeight}`);

            svg.append("text")
                .attr("x", paddingLeft + exchange.binaryVector.length * (rectSize + rectGap) + 10)
                .attr("y", yOffset + 35)
                .attr("font-size", 14)
                .text(`Price: ${exchange.newPrice}`);
        };
        reversedHistory.forEach(renderExchange);
    }, [exchangeHistory, admissible, improving]);

    return (
        <div className="flex-1 p-4 bg-white rounded-lg mr-2 overflow-y-auto" style={{height: '100%'}}>
            <div className="bg-white text-center p-4 border-2 border-gray-300 rounded-md mb-2 shadow-md">
                <div className="flex justify-between mb-4">
                    {strategy === "bestFit" && (
                        <div className="bg-gray-100 text-center p-4 border border-gray-300 rounded-md mb-4 shadow-md">
                            <h2 className="font-bold mb-2">Best Exchnage Found So Far</h2>
                            <p className="text-gray-800">Removed: <span className="font-semibold">{bestFoundSolution?.removed ?? 'N/A'}</span></p>
                            <p className="text-gray-800">Added: <span className="font-semibold">{bestFoundSolution?.added ?? 'N/A'}</span></p>
                            <p className="text-gray-800">Best Price: <span className="font-semibold">{bestFoundPrice}</span></p>
                            <p className="text-gray-800">Best Weight: <span className="font-semibold">{bestFoundWeight}</span></p>
                        </div>
                    )}
                    <div className="flex flex-col items-center">
                        <div
                            className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-lg shadow-md mb-2">
                            <p className="text-sm font-semibold">OUT</p>
                            <p className="text-lg font-bold">{originalIndexI}</p>
                        </div>
                        <div
                            className="bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-md">
                            <p className="text-sm font-semibold">IN</p>
                            <p className="text-lg font-bold">{originalIndexJ}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <div className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md mb-2 
                                    ${admissible ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'}`}>
                                <span className="mr-2 font-semibold">Admissible:</span>
                                <span className={`text-lg font-bold ${admissible ? 'text-green-700' : 'text-red-700'}`}>
                                     {admissible ? '✓' : '✗'}
                                </span>
                            </div>
                            <div className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md mb-2
                                    ${improving ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'}`}>
                                <span className="mr-2 font-semibold">Improving:</span>
                                <span className={`text-lg font-bold ${improving ? 'text-green-700' : 'text-red-700'}`}>
                                    {improving ? '✓' : '✗'}
                                </span>
                            </div>
                            {strategy === "bestFit" && (
                                <div className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-md mb-2 
                                    ${betterBest ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'}`}>
                                    <span className="mr-2 font-semibold">Best So Far:</span>
                                    <span
                                        className={`text-lg font-bold ${betterBest ? 'text-green-700' : 'text-red-700'}`}>
                                     {betterBest ? '✓' : '✗'}
                                </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="mb-4 font-bold">Performed Exchanges</h2>
            <svg ref={graphRef} className="w-full"></svg>
        </div>
    );
}

export default SolutionExchange;
