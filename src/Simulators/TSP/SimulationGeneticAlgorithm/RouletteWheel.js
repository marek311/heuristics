import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function RouletteWheelVisualization({ population, fitnessValues, randomValues }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 250;
        const height = 250;
        const radius = (Math.min(width, height) - 50) / 2;

        const totalFitness = fitnessValues.reduce((sum, f) => sum + f, 0);
        const probabilities = fitnessValues.map(f => f / totalFitness);

        let cumulative = 0;
        const pieData = probabilities.map(prob => {
            cumulative += prob;
            return { prob, cumulative };
        });

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const g = svg.select("g");

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.prob);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        g.selectAll("path")
            .data(pie(pieData))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (_, i) => colorScale(i))
            .attr("stroke", "#fff")
            .style("stroke-width", "2px");

        randomValues.forEach(randomValue => {
            const angle = randomValue * 2 * Math.PI;

            g.append("circle")
                .attr("cx", radius * Math.cos(angle - Math.PI / 2))
                .attr("cy", radius * Math.sin(angle - Math.PI / 2))
                .attr("r", 5)
                .attr("fill", "red");

            g.append("text")
                .attr("x", (radius + 15) * Math.cos(angle - Math.PI / 2))
                .attr("y", (radius + 15) * Math.sin(angle - Math.PI / 2))
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("font-size", "12px")
                .attr("fill", "black")
                .text(randomValue.toFixed(4));
        });

    }, [population, fitnessValues, randomValues]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default RouletteWheelVisualization;
