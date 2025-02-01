import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Solution_KP_Insert({
                               currentWeight,
                               currentPrice,
                               currentIndex,
                               items,
                               binarySolution
                           }) {
    const graphRef = useRef();

    useEffect(() => {
        const width = 500;
        const paddingLeft = 10;
        const rectSize = 25;
        const rectGap = 2;

        const svg = d3.select(graphRef.current)
            .attr("width", width)
            .attr("height", binarySolution.length * (rectSize + rectGap) + 50);

        svg.selectAll("*").remove();

        const renderInsertHeuristic = () => {
            const yOffset = 0;

            const vectorGroup = svg.append("g")
                .attr("transform", `translate(${paddingLeft}, ${yOffset})`);

            vectorGroup.selectAll("rect")
                .data(binarySolution)
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
                .data(binarySolution)
                .enter()
                .append("text")
                .attr("x", (d, i) => i * (rectSize + rectGap) + rectSize / 2)
                .attr("y", rectSize + 15)
                .attr("text-anchor", "middle")
                .attr("font-size", 10)
                .text((d, i) => i);
        };

        renderInsertHeuristic();
    }, [binarySolution, currentIndex, currentWeight, currentPrice, items.length]);

    return (
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg mr-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Items Selected for the Knapsack</h2>
                <div className="text-sm text-gray-600">
                    <p><strong>Current Weight:</strong> {currentWeight}</p>
                    <p><strong>Current Price:</strong> {currentPrice}</p>
                    <p><strong>Iteration:</strong> {currentIndex}</p>
                </div>
            </div>
            <div className="flex justify-center items-center mt-6">
                <svg ref={graphRef} className="w-full max-w-[90%] rounded-lg shadow-md"></svg>
            </div>
            {currentIndex >= items.length && (
                <p className="mt-4 text-center font-medium">Algorithm is complete!</p>
            )}
        </div>
    );
}

export default Solution_KP_Insert;
