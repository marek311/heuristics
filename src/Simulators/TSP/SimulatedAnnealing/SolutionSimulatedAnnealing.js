import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function SolutionSimulatedAnnealing({
                                        currentCost,
                                        proposedCost,
                                        bestCost,
                                        previousCost,
                                        currentTour,
                                        proposedTour,
                                        bestTour,
                                        previousTour,
                                        costDifference,
                                        solutionStatus,
                                        iteration
}) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 350;
        const height = 425;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const barChartHeight = height / 4;
        const barWidth = 30;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f9f9f9")
            .style("border", "1px solid #e0e0e0");

        svg.selectAll("*").remove();

        const maxCost = Math.max(currentCost, proposedCost, bestCost, previousCost) * 1.2;

        const yScale = d3.scaleLinear()
            .domain([0, maxCost])
            .range([barChartHeight - margin.bottom, margin.top]);

        const xScale = d3.scaleBand()
            .domain(["Proposed", "Current", "Previous", "Best"])
            .range([margin.left, width - margin.right])
            .padding(0.5);

        const costs = [
            { label: "Proposed", value: proposedCost, color: "#1e88e5" },
            { label: "Current", value: currentCost, color: "#f73e3e" },
            { label: "Previous", value: previousCost, color: "#ffa533" },
            { label: "Best", value: bestCost, color: "#4caf50" }
        ];

        svg.selectAll(".bar")
            .data(costs)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 4)
            .attr("width", barWidth)
            .attr("y", d => yScale(d.value))
            .attr("height", d => barChartHeight - margin.bottom - yScale(d.value))
            .attr("fill", d => d.color);

        svg.selectAll(".label")
            .data(costs)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "10px")
            .text(d => d.value.toFixed(2));

        svg.selectAll(".legend-label")
            .data(costs)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr("y", barChartHeight - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "10px")
            .text(d => d.label);

        const tourData = [
            { label: "Proposed", tour: proposedTour, color: "#1e88e5", y: barChartHeight + 10 },
            { label: "Current", tour: currentTour, color: "#f73e3e", y: barChartHeight + 85 },
            { label: "Previous", tour: previousTour, color: "#ffa533", y: barChartHeight + 160 },
            { label: "Best", tour: bestTour, color: "#4caf50", y: barChartHeight + 235 }
        ];

        const rectWidth = width - 40;
        const rectHeight = 70;
        const maxCitiesPerLine = 6;

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
            .each(function (d) {
                const numLines = Math.ceil(d.tour.length / maxCitiesPerLine);
                const lines = [];

                for (let i = 0; i < numLines; i++) {
                    lines.push(d.tour.slice(i * maxCitiesPerLine, (i + 1) * maxCitiesPerLine).join(" → "));
                }

                d3.select(this)
                    .append("text")
                    .attr("x", margin.left + 10)
                    .attr("y", d.y + 20)
                    .attr("alignment-baseline", "middle")
                    .attr("fill", "black")
                    .attr("font-size", "10px")
                    .text(`${d.label}: ${lines[0]}`);

                if (lines[1]) {
                    d3.select(this)
                        .append("text")
                        .attr("x", margin.left + 10)
                        .attr("y", d.y + 40)
                        .attr("alignment-baseline", "middle")
                        .attr("fill", "black")
                        .attr("font-size", "10px")
                        .text(lines[1]);
                }

                if (lines[2]) {
                    d3.select(this)
                        .append("text")
                        .attr("x", margin.left + 10)
                        .attr("y", d.y + 60)
                        .attr("alignment-baseline", "middle")
                        .attr("fill", "black")
                        .attr("font-size", "10px")
                        .text(lines[2]);
                }
            });

    }, [currentCost, proposedCost, bestCost, previousCost, currentTour, proposedTour, bestTour, previousTour]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-800">Progress</h2>
                <div>Iteration: {iteration}</div>
                <svg ref={svgRef}></svg>
                <div className="p-2 bg-gray-200 rounded-lg mt-2">
                    <div className="mb-2 p-2 bg-gray-400 rounded-lg w-[340px] h-[85px]">
                        <strong>Status: </strong>{solutionStatus}
                    </div>
                    <div className="mt-2 p-2 bg-gray-400 rounded-lg">
                        <strong>Cost Difference: </strong> {costDifference.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolutionSimulatedAnnealing;
