import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MutationComponent = ({ children, mutatedChildren }) => {
    const svgRef = useRef();
    let newChildrenOnly = children.map((entry) => entry.child);

    useEffect(() => {
        if (!mutatedChildren || mutatedChildren.length === 0 || !children || children.length === 0) return;

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

        mutatedChildren.forEach((mutatedTour, rowIndex) => {
            const originalTour = newChildrenOnly[rowIndex] || [];
            const yOffset = rowIndex * (boxSize + rowSpacing);
            const rowGroup = svg.append("g").attr("transform", `translate(50, ${yOffset})`);

            const offsetX = 10;

            rowGroup.selectAll("rect")
                .data(mutatedTour)
                .enter()
                .append("rect")
                .attr("x", (_, i) => offsetX + i * (boxSize + gap))
                .attr("y", 0)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .attr("fill", (d, i) => (originalTour[i] !== d ? "#1e88e5" : "#ffcc00"))
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            rowGroup.selectAll("text.city")
                .data(mutatedTour)
                .enter()
                .append("text")
                .attr("x", (_, i) => offsetX + i * (boxSize + gap) + boxSize / 2)
                .attr("y", boxSize / 2)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", "white")
                .attr("font-size", "12px")
                .text(d => d);
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
