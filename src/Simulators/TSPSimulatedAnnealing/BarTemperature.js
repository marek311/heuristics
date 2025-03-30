import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Colors from "../../Main/Colors";

function BarTemperature({ temperature, maxTemperature, coolingSchedule }) {
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

        const gradientId = "temperatureGradient";
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        gradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
        gradient.append("stop").attr("offset", "50%").attr("stop-color", "yellow");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "blue");

        svg.append("rect")
            .attr("x", margin)
            .attr("y", margin)
            .attr("width", width - margin * 2)
            .attr("height", height - margin * 2)
            .attr("fill", `url(#${gradientId})`);

        const effectiveMaxTemp = Math.max(temperature, maxTemperature || 100);
        const normalizedTemp = Math.max(0, Math.min(temperature, effectiveMaxTemp));

        const tempY = margin + ((effectiveMaxTemp - normalizedTemp) / effectiveMaxTemp) * (height - margin * 2);

        svg.append("line")
            .attr("x1", margin)
            .attr("x2", width - margin)
            .attr("y1", tempY)
            .attr("y2", tempY)
            .attr("stroke", Colors.graphMainColor)
            .attr("stroke-width", 2);

        const textOffset = temperature > (effectiveMaxTemp / 2) ? 15 : -5;

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", tempY + textOffset)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .text(`${temperature.toFixed(2)}°C`);
    }, [temperature, maxTemperature]);

    return (
        <div className={`p-4 ${Colors.cardBackground} rounded-lg shadow-md flex flex-col items-center`}>
            <div className="flex flex-col items-center justify-center">
                <h2 className={`text-lg font-semibold ${Colors.textPrimary}`}>Temperature</h2>
                <svg ref={svgRef}></svg>
                <div className="mt-2 text-center">
                    <p><strong>Cooling Schedule:</strong></p>
                    <p>{coolingSchedule}</p>
                </div>
            </div>
        </div>
    );
}

export default BarTemperature;
