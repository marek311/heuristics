import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function ProbabilityBar({ acceptanceProbability, randomValue }) {
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

        const probabilityHeight = acceptanceProbability * (height - 2 * margin);
        const probabilityY = height - margin - probabilityHeight;
        const randomY = height - margin - (randomValue * (height - 2 * margin));

        svg.append("rect")
            .attr("x", margin)
            .attr("y", probabilityY)
            .attr("width", width - 2 * margin)
            .attr("height", probabilityHeight)
            .attr("fill", "green");

        svg.append("line")
            .attr("x1", margin)
            .attr("x2", width - margin)
            .attr("y1", randomY)
            .attr("y2", randomY)
            .attr("stroke", "black")
            .attr("stroke-width", 2);

    }, [acceptanceProbability, randomValue]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default ProbabilityBar;
