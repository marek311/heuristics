import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Solution_TSP_SimulatedAnnealing({ currentCost, proposedCost, bestCost, previousCost, currentTour, proposedTour, bestTour, previousTour, costDifference, solutionStatus, iteration }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 350;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const barChartHeight = height / 2;
        const barWidth = 40;
        const barSpacing = 30;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f0f0f0")
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove();

        const maxCost = Math.max(currentCost, proposedCost, bestCost, previousCost) + (Math.max(currentCost, proposedCost, bestCost, previousCost) / 5);

        const yScale = d3.scaleLinear()
            .domain([0, maxCost])
            .range([barChartHeight - margin.bottom, margin.top]);

        const costs = [
            { label: "Proposed", value: proposedCost, color: "blue", x: margin.left },
            { label: "Current", value: currentCost, color: "red", x: margin.left + barWidth + barSpacing },
            { label: "Previous", value: previousCost, color: "yellow", x: margin.left + 2 * (barWidth + barSpacing) },
            { label: "Best", value: bestCost, color: "green", x: margin.left + 3 * (barWidth + barSpacing) }
        ];

        svg.selectAll(".bar")
            .data(costs)
            .enter()
            .append("rect")
            .attr("x", d => d.x)
            .attr("width", barWidth)
            .attr("y", d => yScale(d.value))
            .attr("height", d => barChartHeight - margin.bottom - yScale(d.value))
            .attr("fill", d => d.color);

        svg.selectAll(".label")
            .data(costs)
            .enter()
            .append("text")
            .attr("x", d => d.x + barWidth / 2)
            .attr("y", d => yScale(d.value) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .text(d => d.value);

        svg.selectAll(".legend-label")
            .data(costs)
            .enter()
            .append("text")
            .attr("x", d => d.x + barWidth / 2)
            .attr("y", barChartHeight - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .text(d => d.label);

        const tourData = [
            { label: "Proposed", tour: proposedTour, color: "blue", y: barChartHeight + 20 },
            { label: "Current", tour: currentTour, color: "red", y: barChartHeight + 70 },
            { label: "Previous", tour: previousTour, color: "yellow", y: barChartHeight + 120 },
            { label: "Best", tour: bestTour, color: "green", y: barChartHeight + 170 }
        ];

        const rectWidth = width - 40;
        const rectHeight = 30;

        svg.selectAll(".tour-rect")
            .data(tourData)
            .enter()
            .append("rect")
            .attr("x", margin.left)
            .attr("y", d => d.y)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", d => d.color)
            .attr("rx", 5)
            .attr("ry", 5);

        svg.selectAll(".tour-text")
            .data(tourData)
            .enter()
            .append("text")
            .attr("x", margin.left + 10)
            .attr("y", d => d.y + rectHeight / 2)
            .attr("alignment-baseline", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .text(d => `${d.label}: ${d.tour.join(" → ")}`);

    }, [currentCost, proposedCost, bestCost, previousCost, currentTour, proposedTour, bestTour, previousTour]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-800">Tours</h2>
                <div>Iteration: {iteration}</div>
                <svg ref={svgRef}></svg>
                <div className="p-2 bg-gray-200 rounded-lg mt-4">
                    <div className="mb-2 p-2 bg-gray-400 rounded-lg">
                        <strong>Cost Difference: </strong> {costDifference.toFixed(2)}
                    </div>
                    <div className="p-2 bg-gray-400 rounded-lg">
                        <strong>Status: </strong>{solutionStatus}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Solution_TSP_SimulatedAnnealing;
