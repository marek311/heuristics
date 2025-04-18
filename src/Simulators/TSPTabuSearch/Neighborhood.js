import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Colors from "../../Main/Colors";

const Neighborhood = ({ neighborhood, tabuList, iteration }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!neighborhood || neighborhood.length === 0) return;

        const boxSize = 30;
        const gap = 5;
        const rowSpacing = 50;

        const maxTourLength = Math.max(...neighborhood.map(neighbor => neighbor.tour.length));
        const width = maxTourLength * boxSize + (maxTourLength - 1) * gap + 100;
        const height = neighborhood.length * (boxSize + rowSpacing) + 50;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove();

        neighborhood.forEach((neighbor, rowIndex) => {
            const { tour, cost, isTabu, isChosen, indexI, indexJ } = neighbor;
            const yOffset = rowIndex * (boxSize + rowSpacing);

            const rowGroup = svg.append("g").attr("transform", `translate(50, ${yOffset})`);

            const totalWidth = tour.length * boxSize + (tour.length - 1) * gap;
            const offsetX = 10;

            const isTabuNow = tabuList.some(entry =>
                (entry.swap[0] === indexI && entry.swap[1] === indexJ) ||
                (entry.swap[0] === indexJ && entry.swap[1] === indexI)
            ) && tabuList.some(entry => entry.expiryIteration >= iteration);

            rowGroup.selectAll("rect")
                .data(tour)
                .enter()
                .append("rect")
                .attr("x", (_, i) => offsetX + i * (boxSize + gap))
                .attr("y", 0)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .attr("fill", (d, i) => (i === indexI || i === indexJ ? Colors.graphGreen : Colors.graphBlue))
                .attr("stroke", isTabuNow ? Colors.graphRed : Colors.graphMainColor)
                .attr("stroke-width", (isTabuNow || isChosen) ? 3 : 1);

            rowGroup.selectAll("text.city")
                .data(tour)
                .enter()
                .append("text")
                .attr("x", (_, i) => offsetX + i * (boxSize + gap) + boxSize / 2)
                .attr("y", boxSize / 2)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", "white")
                .attr("font-size", "12px")
                .text(d => d);

            rowGroup.append("text")
                .attr("x", offsetX)
                .attr("y", boxSize + 20)
                .attr("fill", Colors.graphMainColor)
                .attr("font-size", "14px")
                .text(`Cost: ${cost !== undefined ? cost.toFixed(2) : "N/A"}, Swap: ${indexI} ↔ ${indexJ}`);
        });

    }, [neighborhood, tabuList, iteration]);

    return (
        <div className={`${Colors.cardBackground} shadow-md rounded-lg p-4 w-full`}>
            <div className="flex flex-col items-center justify-center">
                <h2 className={`mb-2 text-lg font-semibold ${Colors.textPrimary}`}>Neighborhood</h2>
                <div style={{ width: '100%', height: '500px', overflowY: 'scroll' }}>
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    );
};

export default Neighborhood;
