import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Colors from "../../Main/Colors";

function BarExperiment({ acceptanceProbability, randomValue }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 70;
        const height = 500;
        const margin = 10;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", Colors.graphBackground)
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove();

        const totalHeight = height - 2 * margin;
        const probabilityHeight = acceptanceProbability * totalHeight;
        const probabilityY = height - margin - probabilityHeight;
        const randomY = height - margin - (randomValue * totalHeight);

        svg.append("rect")
            .attr("x", margin)
            .attr("y", margin)
            .attr("width", width - 2 * margin)
            .attr("height", totalHeight)
            .attr("fill", Colors.graphRed);

        svg.append("rect")
            .attr("x", margin)
            .attr("y", probabilityY)
            .attr("width", width - 2 * margin)
            .attr("height", probabilityHeight)
            .attr("fill", Colors.graphGreen);

        svg.append("line")
            .attr("x1", margin)
            .attr("x2", width - margin)
            .attr("y1", randomY)
            .attr("y2", randomY)
            .attr("stroke", Colors.graphMainColor)
            .attr("stroke-width", 2);

    }, [acceptanceProbability, randomValue]);

    return (
        <div className={`p-4 ${Colors.cardBackground} rounded-lg shadow-md flex flex-col items-center`}>
            <h2 className={`text-lg font-semibold ${Colors.textPrimary}`}>Experiment</h2>
            <svg ref={svgRef}></svg>
            <div className="mt-2 text-center">
                <p><strong>Acceptance Probability:</strong> {acceptanceProbability.toFixed(4)}</p>
                <p><strong>Random Value:</strong> {randomValue.toFixed(4)}</p>
            </div>
        </div>
    );
}

export default BarExperiment;
