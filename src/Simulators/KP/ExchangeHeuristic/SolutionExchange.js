import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function SolutionExchange({ exchangeHistory, originalIndexI, originalIndexJ, admissible, improving }) {
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
                    <div>
                        <p className="text-gray-800 mb-2">OUT: <span
                            className="font-semibold">{originalIndexI}</span></p>
                        <p className="text-gray-800 mb-2">IN: <span
                            className="font-semibold">{originalIndexJ}</span></p>
                    </div>
                    <div>
                        <div className="flex items-center justify-center mb-2">
                            <span className="mr-2 font-semibold">Admissible:</span>
                            <span
                                className={`inline-block p-2 rounded-full ${admissible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {admissible ? '✓' : 'x'}
                            </span>
                        </div>
                        <div className="flex items-center justify-center">
                            <span className="mr-2 font-semibold">Improving:</span>
                            <span
                                className={`inline-block p-2 rounded-full ${improving ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {improving ? '✓' : 'x'}
                            </span>
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
