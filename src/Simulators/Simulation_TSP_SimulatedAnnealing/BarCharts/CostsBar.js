import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function CostChart({ currentCost, proposedCost, bestCost }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 150; // Adjust width for multiple bars
        const height = 350;
        const margin = { top: 10, right: 10, bottom: 30, left: 10 };
        const barWidth = 30;
        const barSpacing = 20;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f0f0f0")
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove();

        const maxCost = Math.max(currentCost, proposedCost, bestCost) + (Math.max(currentCost, proposedCost, bestCost) / 5);

        const yScale = d3.scaleLinear()
            .domain([0, maxCost])
            .range([height - margin.bottom, margin.top]);

        const costs = [
            { label: "Proposed", value: proposedCost, color: "blue", x: margin.left },
            { label: "Current", value: currentCost, color: "red", x: margin.left + barWidth + barSpacing },
            { label: "Best", value: bestCost, color: "green", x: margin.left + 2 * (barWidth + barSpacing) }
        ];

        svg.selectAll(".bar")
            .data(costs)
            .enter()
            .append("rect")
            .attr("x", d => d.x)
            .attr("width", barWidth)
            .attr("y", d => yScale(d.value))
            .attr("height", d => height - margin.bottom - yScale(d.value))
            .attr("fill", d => d.color);

    }, [currentCost, proposedCost, bestCost]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-800">Costs</h2>
                <svg ref={svgRef}></svg>
                <div className="mt-4 flex flex-col space-y-2">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Proposed</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Current</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Best</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CostChart;
