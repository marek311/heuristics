import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function TemperatureBar({ temperature }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 50;
        const height = 350;
        const margin = 10;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#f0f0f0")
            .style("border", "1px solid #ccc");

        svg.selectAll("*").remove();

        const gradientId = "temperatureGradient";
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "red");
        gradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "yellow");
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "blue");

        svg.append("rect")
            .attr("x", margin)
            .attr("y", margin)
            .attr("width", width - margin * 2)
            .attr("height", height - margin * 2)
            .attr("fill", `url(#${gradientId})`);

        const normalizedTemp = Math.max(0, Math.min(temperature, 100));
        const tempY = margin + ((100 - normalizedTemp) / 100) * (height - margin * 2);

        svg.append("line")
            .attr("x1", margin)
            .attr("x2", width - margin)
            .attr("y1", tempY)
            .attr("y2", tempY)
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        const textOffset = temperature > 50 ? 15 : -5;

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", tempY + textOffset)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .text(`${temperature.toFixed(2)}°C`);
    }, [temperature]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-800">Temperature</h2>
                <svg ref={svgRef}></svg>
                <div className="mt-2 text-center">
                    <p><strong>Cooling Schedule:</strong></p>
                    <p>Each iteration reduces the temperature by 5%.</p>
                </div>
            </div>
        </div>
    );
}

export default TemperatureBar;
