import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function SolKnapsackExchange({ exchangeHistory }) {
    const graphRef = useRef();

    useEffect(() => {
        const width = 800;
        const paddingLeft = 10;
        const rectSize = 18;
        const rectGap = 2;
        const rowHeight = 60;

        const svg = d3.select(graphRef.current)
            .attr("width", width)
            .attr("height", exchangeHistory.length * rowHeight + 50);

        svg.selectAll("*").remove();

        const renderExchange = (exchange, index) => {
            const yOffset = index * rowHeight + 20;

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

        exchangeHistory.forEach(renderExchange);
    }, [exchangeHistory]);

    return (
        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
            <h2 className="mb-4 font-semibold">Vykonané výmeny</h2>
            <svg ref={graphRef} className="w-full"></svg>
        </div>
    );
}

export default SolKnapsackExchange;