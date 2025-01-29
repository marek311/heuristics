import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function CostBarChart({ currentCost, proposedCost, bestCost }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 50;
        const height = 500;
        const margin = 10;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f0f0f0")
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove();

        const maxCost = Math.max(currentCost, proposedCost, bestCost);

        const yScale = d3.scaleLinear()
            .domain([0, maxCost || 1])
            .range([height - margin, margin]);

        const drawLine = (cost, color) => {
            svg.append("line")
                .attr("x1", margin)
                .attr("x2", width - margin)
                .attr("y1", yScale(cost))
                .attr("y2", yScale(cost))
                .attr("stroke", color)
                .attr("stroke-width", 3);
        };

        drawLine(proposedCost, "blue");
        drawLine(bestCost, "green");
        drawLine(currentCost, "red");

    }, [currentCost, proposedCost, bestCost]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default CostBarChart;
