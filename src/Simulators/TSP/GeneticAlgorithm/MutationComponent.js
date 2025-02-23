import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MutationComponent = ({ mutatedChildren }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!mutatedChildren || mutatedChildren.length === 0) return;

        const boxSize = 30;
        const gap = 5;
        const rowSpacing = 50;

        const maxTourLength = Math.max(...mutatedChildren.map(tour => tour.length));
        const width = maxTourLength * boxSize + (maxTourLength - 1) * gap + 100;
        const height = mutatedChildren.length * (boxSize + rowSpacing) + 50;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove();

        mutatedChildren.forEach((tour, rowIndex) => {
            const yOffset = rowIndex * (boxSize + rowSpacing);
            const rowGroup = svg.append("g").attr("transform", `translate(50, ${yOffset})`);

            const offsetX = 10;

            rowGroup.selectAll("rect")
                .data(tour)
                .enter()
                .append("rect")
                .attr("x", (_, i) => offsetX + i * (boxSize + gap))
                .attr("y", 0)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .attr("fill", "#f44336")
                .attr("stroke", "black")
                .attr("stroke-width", 1);

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
                .attr("fill", "black")
                .attr("font-size", "14px")
                .text(`Mutated Child ${rowIndex + 1}`);
        });

    }, [mutatedChildren]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div style={{ width: '100%', height: '500px', overflowY: 'scroll' }}>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default MutationComponent;
