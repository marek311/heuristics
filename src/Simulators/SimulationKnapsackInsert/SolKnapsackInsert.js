import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function SolKnapsackInsert({
                               currentWeight,
                               currentPrice,
                               currentIndex,
                               items,
                               binarySolution
                           }) {
    const graphRef = useRef();

    useEffect(() => {
        const width = 800;
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
        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
            <div className="flex justify-between items-center mb-4 space-x-4">
                <h2><strong>Predmety vybrané do batohu</strong></h2>
                <p>Aktuálna váha: {currentWeight}</p>
                <p>Aktuálna cena: {currentPrice}</p>
                <p>Iterácia: {currentIndex}</p>
            </div>
            <div className="mt-4">
                <h3 className="mb-2"><strong>Insert Heuristic Visualization</strong></h3>
                <svg ref={graphRef} className="w-full"></svg>
            </div>
            {currentIndex >= items.length && (
                <p className="mt-2 flex justify-center text-center">Algoritmus skončil!</p>
            )}
        </div>
    );
}

export default SolKnapsackInsert;
