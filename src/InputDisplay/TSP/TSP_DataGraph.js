import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Colors from '../../Main/Colors';

function TSPDataGraph({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || !data.edges || !data.cityCount) return;

        const width = 500;
        const height = 500;
        const dynamicDistance = 200;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#f0f0f0')
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

        const simulation = d3.forceSimulation(cities)
            .force('link', d3.forceLink(links).id((d) => d.id).distance(dynamicDistance))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));

        simulation.on('tick', () => {
            svg.selectAll('line')
                .data(links)
                .join('line')
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y)
                .attr('stroke', '#888')
                .attr('stroke-width', 2);

            svg.selectAll('text.edge-label')
                .data(links)
                .join('text')
                .attr('class', 'edge-label')
                .attr('x', (d) => (d.source.x + d.target.x) / 2)
                .attr('y', (d) => (d.source.y + d.target.y) / 2)
                .attr('fill', '#444')
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
                .attr('fill', '#1e88e5');

            svg.selectAll('text.city-label')
                .data(cities)
                .join('text')
                .attr('class', 'city-label')
                .attr('x', (d) => d.x)
                .attr('y', (d) => d.y - 15)
                .attr('text-anchor', 'middle')
                .attr('fill', '#000')
                .style('font-size', '12px')
                .text((d) => d.id);
        });
    }, [data]);

    if (!data) {
        return <div>No TSP data available.</div>;
    }

    return (
        <div className={`p-4 ${Colors.cardBackground} rounded-lg mx-auto`}>
            <div className="flex justify-center">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
}

export default TSPDataGraph;