import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function CostBarChart({ currentCost, proposedCost, bestCost }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 80; // Single vertical bar
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };

        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("background", "#f9f9f9")
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove(); // Clear previous drawings

        // Get max cost value for scaling
        const maxCost = Math.max(currentCost, proposedCost, bestCost);

        // Scale for cost values
        const yScale = d3.scaleLinear()
            .domain([0, maxCost || 1]) // Avoid division by zero
            .range([height - margin.bottom, margin.top]);

        // Draw main bar
        svg.append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", width)
            .attr("height", height - margin.top - margin.bottom)
            .attr("fill", "#ddd");

        // Function to draw lines for costs
        const drawLine = (cost, color) => {
            svg.append("line")
                .attr("x1", margin.left)
                .attr("x2", margin.left + width)
                .attr("y1", yScale(cost))
                .attr("y2", yScale(cost))
                .attr("stroke", color)
                .attr("stroke-width", 3);
        };

        // Draw cost lines
        drawLine(currentCost, "red");   // Current Cost (Red)
        drawLine(proposedCost, "blue"); // Proposed Cost (Blue)
        drawLine(bestCost, "green");    // Best Cost (Green)

        // Add cost labels
        const addLabel = (cost, color, text) => {
            svg.append("text")
                .attr("x", margin.left + width + 5)
                .attr("y", yScale(cost) + 4)
                .attr("fill", color)
                .attr("font-size", "12px")
                .text(`${text}: ${cost.toFixed(2)}`);
        };

        addLabel(currentCost, "red", "Current");
        addLabel(proposedCost, "blue", "Proposed");
        addLabel(bestCost, "green", "Best");

    }, [currentCost, proposedCost, bestCost]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default CostBarChart;
