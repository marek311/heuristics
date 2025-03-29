import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Colors from '../../Main/Colors';

function TSPDataGraph({ data, tour }) {
    const svgRef = useRef();
    const [showAllRoutes, setShowAllRoutes] = useState(true);

    useEffect(() => {
        if (!data || !data.edges || !data.cityCount) return;

        const width = 400;
        const height = 600;
        const dynamicDistance = 200;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', Colors.graphBackground)
            .style('border', '1px solid #ccc');

        svg.selectAll('*').remove();

        const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2]))).map((city) => ({
            id: city,
        }));

        const links = data.edges.map((edge) => ({
            source: edge.city1,
            target: edge.city2,
            distance: edge.distance,
        }));

        const tourEdges = new Set();
        for (let i = 0; i < tour.length - 1; i++) {
            const city1 = tour[i];
            const city2 = tour[i + 1];
            tourEdges.add(`${city1}-${city2}`);
            tourEdges.add(`${city2}-${city1}`);
        }

        const simulation = d3.forceSimulation(cities)
            .force('link', d3.forceLink(links).id((d) => d.id).distance(dynamicDistance))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));

        simulation.on('tick', () => {
            const filteredLinks = showAllRoutes ? links : links.filter((d) => tourEdges.has(`${d.source.id}-${d.target.id}`));

            svg.selectAll('line')
                .data(filteredLinks)
                .join('line')
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y)
                .attr('stroke', (d) =>
                    tourEdges.has(`${d.source.id}-${d.target.id}`) ? Colors.graphGreen : Colors.graphMainColor
                )
                .attr('stroke-width', (d) =>
                    tourEdges.has(`${d.source.id}-${d.target.id}`) ? 4 : 2
                );

            svg.selectAll('text.edge-label')
                .data(filteredLinks)
                .join('text')
                .attr('class', 'edge-label')
                .attr('x', (d) => (d.source.x + d.target.x) / 2)
                .attr('y', (d) => (d.source.y + d.target.y) / 2)
                .attr('fill', Colors.graphMainColor)
                .attr('text-anchor', 'middle')
                .attr('dy', -5)
                .style('font-size', '12px')
                .text((d) => d.distance);

            svg.selectAll('circle')
                .data(cities)
                .join('circle')
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y)
                .attr('r', 10)
                .attr('fill', Colors.graphGreen);

            svg.selectAll('text.city-label')
                .data(cities)
                .join('text')
                .attr('class', 'city-label')
                .attr('x', (d) => d.x)
                .attr('y', (d) => d.y - 15)
                .attr('text-anchor', 'middle')
                .attr('fill', Colors.graphMainColor)
                .style('font-size', '12px')
                .text((d) => d.id);
        });
    }, [data, tour, showAllRoutes]);

    if (!data) {
        return <div>No TSP data available.</div>;
    }

    return (
        <div className={`p-4 rounded-lg shadow-md ${Colors.cardBackground}`}>
            <div className="flex flex-col items-center justify-center">
                <h2 className={`text-lg font-semibold ${Colors.textPrimary}`}>Best Tour Graphical Representation</h2>
                <div className="flex items-center space-x-2 mt-2">
                    <input
                        type="checkbox"
                        id="showAllRoutes"
                        checked={showAllRoutes}
                        onChange={() => setShowAllRoutes((prev) => !prev)}
                        className="cursor-pointer"
                    />
                    <label htmlFor="showAllRoutes" className={`${Colors.textPrimary} cursor-pointer`}>
                        Show all routes
                    </label>
                </div>
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
}

export default TSPDataGraph;