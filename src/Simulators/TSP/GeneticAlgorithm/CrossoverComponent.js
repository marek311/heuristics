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

        children.forEach(({ parent1, parent2, child, fromParent1 }, groupIndex) => {
            const yOffset = groupIndex * (2 * smallRowSpacing + bigGroupSpacing);
            const rowGroup = svg.append("g").attr("transform", `translate(50, ${yOffset})`);

            const offsetX = 10;

            let parent1Color = "#1e88e5";
            let parent2Color = "#f73e3e";

            const drawTour = (tour, row, label) => {
                const yPosition = row * smallRowSpacing;

                rowGroup.selectAll(`rect.${label}-rect-${groupIndex}`)
                    .data(tour)
                    .enter()
                    .append("rect")
                    .attr("class", `${label}-rect-${groupIndex}`)
                    .attr("x", (_, i) => offsetX + i * (boxSize + gap))
                    .attr("y", yPosition)
                    .attr("width", boxSize)
                    .attr("height", boxSize)
                    .attr("fill", (d, i) => {
                        if (label === "parent1") return parent1Color;
                        if (label === "parent2") return parent2Color;
                        const splitPoint = Math.floor((tour.length - 1) / 2) + 1;
                        return i < splitPoint ? parent1Color : parent2Color;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 1);

                rowGroup.selectAll(`text.${label}-text-${groupIndex}`)
                    .data(tour)
                    .enter()
                    .append("text")
                    .attr("class", `${label}-text-${groupIndex}`)
                    .attr("x", (_, i) => offsetX + i * (boxSize + gap) + boxSize / 2)
                    .attr("y", yPosition + boxSize / 2)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("fill", "white")
                    .attr("font-size", "12px")
                    .text(d => d);

                rowGroup.append("text")
                    .attr("x", offsetX - 80)
                    .attr("y", yPosition + boxSize / 2)
                    .attr("fill", "black")
                    .attr("font-size", "14px")
                    .attr("text-anchor", "end")
                    .text(label === "child" ? "Child" : `Parent ${label === "parent1" ? "1" : "2"}`);

                if (label === "child") {
                    rowGroup.selectAll(`text.${label}-index-${groupIndex}`)
                        .data(tour)
                        .enter()
                        .append("text")
                        .attr("class", `${label}-index-${groupIndex}`)
                        .attr("x", offsetX)
                        .attr("y", yPosition + boxSize + 15)
                        .attr("fill", "black")
                        .attr("font-size", "14px")
                        .text(() => `Child ${groupIndex + 1}`);
                }

                rowGroup.append("text")
                    .attr("x", offsetX)
                    .attr("y", yPosition + boxSize + 15)
                    .attr("fill", "black")
                    .attr("font-size", "14px")
                    .text(() => {
                        if (label === "parent1") return "Parent 1";
                        if (label === "parent2") return "Parent 2";
                    });
            };

            drawTour(parent1, 0, "parent1");
            drawTour(parent2, 1, "parent2");
            drawTour(child, 2, "child");
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
