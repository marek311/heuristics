import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CrossoverComponent = ({ children }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!children || children.length === 0) return;

        const boxSize = 30;
        const gap = 5;
        const smallRowSpacing = 60;
        const bigGroupSpacing = 90;

        const maxTourLength = Math.max(...children.map(({ child }) => child.length));
        const width = maxTourLength * boxSize + (maxTourLength - 1) * gap + 100;
        const height = children.length * (2 * smallRowSpacing + bigGroupSpacing) + 50;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove();

        const drawTour = (tour, row, label, groupIndex, rowGroup, parent1Color, parent2Color, index) => {
            const yPosition = row * smallRowSpacing;

            rowGroup.selectAll(`rect.${label}-rect-${groupIndex}`)
                .data(tour)
                .enter()
                .append("rect")
                .attr("class", `${label}-rect-${groupIndex}`)
                .attr("x", (_, i) => 10 + i * (boxSize + gap))
                .attr("y", yPosition)
                .attr("width", boxSize)
                .attr("height", boxSize)
                .attr("fill", (d, i) => label === "child" ?
                    (i < Math.floor((tour.length - 1) / 2) + 1)
                        ? parent1Color : parent2Color : (label === "parent1"
                        ? parent1Color : parent2Color))
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            rowGroup.selectAll(`text.${label}-text-${groupIndex}`)
                .data(tour)
                .enter()
                .append("text")
                .attr("class", `${label}-text-${groupIndex}`)
                .attr("x", (_, i) => 10 + i * (boxSize + gap) + boxSize / 2)
                .attr("y", yPosition + boxSize / 2)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", "white")
                .attr("font-size", "12px")
                .text(d => d);

            if (label !== "child") {
                rowGroup.append("text")
                    .attr("x", 10)
                    .attr("y", yPosition + boxSize + 15)
                    .attr("fill", "black")
                    .attr("font-size", "14px")
                    .text(() => label === "parent1"
                        ? `Parent 1 - Tour #${index + 1}`
                        : `Parent 2 - Tour #${index + 1}`);
            }

            if (label === "child") {
                rowGroup.append("text")
                    .attr("x", 10)
                    .attr("y", yPosition + boxSize + 15)
                    .attr("fill", "black")
                    .attr("font-size", "14px")
                    .text(() => `Child ${groupIndex + 1}`);
            }
        };

        children.forEach(({ parent1, parent2, child }, groupIndex) => {
            const rowGroup = svg.append("g").attr("transform", `translate(50, ${groupIndex * (2 * smallRowSpacing + bigGroupSpacing)})`);
            const parent1Color = "#1e88e5";
            const parent2Color = "#f73e3e";

            drawTour(parent1.tour, 0, "parent1", groupIndex, rowGroup, parent1Color, parent2Color, parent1.index);
            drawTour(parent2.tour, 1, "parent2", groupIndex, rowGroup, parent1Color, parent2Color, parent2.index);
            drawTour(child, 2, "child", groupIndex, rowGroup, parent1Color, parent2Color);
        });

    }, [children]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div style={{ width: '100%', height: '500px', overflowY: 'scroll' }}>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default CrossoverComponent;
