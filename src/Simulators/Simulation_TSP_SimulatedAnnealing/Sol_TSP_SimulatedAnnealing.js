import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Sol_TSP_SimulatedAnnealing({ currentCost, proposedCost, bestCost, previousCost, currentTour, proposedTour, bestTour, previousTour }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 200;
        const height = 350;
        const margin = { top: 20, right: 10, bottom: 50, left: 10 };
        const barWidth = 30;
        const barSpacing = 20;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f0f0f0")
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove();

        const maxCost = Math.max(currentCost, proposedCost, bestCost, previousCost) + (Math.max(currentCost, proposedCost, bestCost, previousCost) / 5);

        const yScale = d3.scaleLinear()
            .domain([0, maxCost])
            .range([height - margin.bottom, margin.top]);

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
            .attr("height", d => height - margin.bottom - yScale(d.value))
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
            .attr("y", height - margin.bottom + 20)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .text(d => d.label);

    }, [currentCost, proposedCost, bestCost, previousCost]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-800">Tours</h2>
                <svg ref={svgRef}></svg>
                <ul>
                    <li><strong>Best Tour:</strong> {bestTour.join(',')}</li>
                    <li><strong>Proposed Tour:</strong> {proposedTour.join(',')}</li>
                    <li><strong>Current Tour:</strong> {currentTour.join(',')}</li>
                    <li><strong>Previous Tour:</strong> {previousTour.join(',')}</li>
                </ul>
            </div>
        </div>
    );
}

export default Sol_TSP_SimulatedAnnealing;
