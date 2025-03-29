import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PopulationComponent = ({ population, fitnessValues, bestSolution, step }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!population || population.length === 0) return;

        const boxSize = 30;
        const gap = 5;
        const rowSpacing = 50;

        const maxTourLength = Math.max(...population.map(tour => tour.length));
        const width = maxTourLength * boxSize + (maxTourLength - 1) * gap + 100;
        const height = (population.length + (bestSolution ? 1 : 0)) * (boxSize + rowSpacing) + 50;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove();

        population.forEach((tour, rowIndex) => {
            drawTour(svg, tour, fitnessValues[rowIndex] || 0, rowIndex, boxSize, gap, rowSpacing, false);
        });

        if (bestSolution) {
            drawTour(svg, bestSolution.tour, bestSolution.fitness, population.length, boxSize, gap, rowSpacing, true);
        }

    }, [population, fitnessValues, bestSolution, step]);

    function drawTour(svg, tour, fitness, rowIndex, boxSize, gap, rowSpacing, isBest) {
        const yOffset = rowIndex * (boxSize + rowSpacing);
        const rowGroup = svg.append("g").attr("transform", `translate(50, ${yOffset})`);

        const offsetX = 10;
        const boxColor = isBest ? "#f73e3e" : "#1e88e5";

        rowGroup.selectAll("rect")
            .data(tour)
            .enter()
            .append("rect")
            .attr("x", (_, i) => offsetX + i * (boxSize + gap))
            .attr("y", 0)
            .attr("width", boxSize)
            .attr("height", boxSize)
            .attr("fill", boxColor)
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
            .attr("x", 60)
            .attr("y", boxSize + 20)
            .attr("fill", isBest ? "red" : "black")
            .attr("font-size", "14px")
            .attr("text-anchor", "start")
            .text(`${isBest ? "Best" : `Tour #${rowIndex + 1}`} - Fitness: ${fitness.toFixed(4)}`);
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div className="flex flex-col items-center justify-center">
                <div style={{width: '100%', height: '500px', overflowY: 'scroll'}}>
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    );
};

export default PopulationComponent;
