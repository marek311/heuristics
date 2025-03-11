import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function FlowchartSimulatedAnnealing({ highlightLinks }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 500;
        const height = 600;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#f0f0f0')
            .style('border', '1px solid #ccc')
            .style('overflow', 'visible');

        const nodes = [
            { id: 'current', text: 'Current Solution', x: 250, y: 40, shape: 'rect', color: '#1e88e5'},
            { id: 'neighbor', text: 'Find Proposed Solution', x: 250, y: 120, shape: 'oval', color: '#4caf50'},
            { id: 'better', text: 'Better than Current?', x: 250, y: 200, shape: 'diamond', color: '#ffa533' },
            { id: 'new', text: 'New Current Solution', x: 100, y: 290, shape: 'rect', color: '#1e88e5' },
            { id: 'betterBest', text: 'Better than Best?', x: 100, y: 370, shape: 'diamond', color: '#ffa533' },
            { id: 'newBest', text: 'New Best Solution', x: 100, y: 480, shape: 'rect', color: '#1e88e5' },
            { id: 'experiment', text: 'Perform Experiment', x: 400, y: 250, shape: 'oval', color: '#4caf50' },
            { id: 'cooldown', text: 'Cool Down Temperature', x: 400, y: 490, shape: 'oval', color: '#4caf50' },
            { id: 'newIteration', text: 'New Iteration', x: 250, y: 550, shape: 'rect', color: '#1e88e5' },
        ];

        const links = [
            { source: 'current', target: 'neighbor' },
            { source: 'neighbor', target: 'better' },
            { source: 'better', target: 'new', label: 'Yes' },
            { source: 'better', target: 'experiment', label: 'No' },
            { source: 'new', target: 'betterBest' },
            { source: 'betterBest', target: 'newBest', label: 'Yes' },
            { source: 'betterBest', target: 'cooldown', label: 'No' },
            { source: 'experiment', target: 'new', label: 'Accepted' },
            { source: 'experiment', target: 'cooldown', label: 'Declined' },
            { source: 'newBest', target: 'cooldown' },
            { source: 'cooldown', target: 'newIteration' },
        ];

        const linkLines = svg.selectAll('line')
            .data(links)
            .join('line')
            .attr('x1', d => nodes.find(n => n.id === d.source).x)
            .attr('y1', d => nodes.find(n => n.id === d.source).y)
            .attr('x2', d => nodes.find(n => n.id === d.target).x)
            .attr('y2', d => nodes.find(n => n.id === d.target).y)
            .attr('stroke', d => highlightLinks.some(link => link.source === d.source && link.target === d.target) ? 'red' : '#333')
            .attr('stroke-width', d => highlightLinks.some(link => link.source === d.source && link.target === d.target) ? 3 : 2);

        svg.selectAll('text.link-label')
            .data(links)
            .join('text')
            .attr('class', 'link-label')
            .attr('x', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                return (sourceNode.x + targetNode.x) / 2;
            })
            .attr('y', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                return (sourceNode.y + targetNode.y) / 2;
            })
            .attr('dy', -10)
            .attr('text-anchor', 'middle')
            .attr('fill', '#000')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(d => d.label || '');

        const nodeGroups = svg.selectAll('g.node')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`);

        nodeGroups.each(function (d) {
            const group = d3.select(this);

            if (d.shape === 'oval') {
                group.append('ellipse')
                    .attr('rx', 70)
                    .attr('ry', 30)
                    .attr('fill', d.color);
            } else if (d.shape === 'diamond') {
                group.append('polygon')
                    .attr('points', '-80,0 0,35 80,0 0,-35')
                    .attr('fill', d.color);
            } else if (d.shape === 'rect') {
                group.append('rect')
                    .attr('width', 140)
                    .attr('height', 60)
                    .attr('x', -70)
                    .attr('y', -30)
                    .attr('fill', d.color)
                    .attr('rx', 10)
                    .attr('ry', 10);
            }
        });

        svg.selectAll('text.label')
            .data(nodes)
            .join('text')
            .attr('class', 'label')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('dy', 5)
            .attr('text-anchor', 'middle')
            .attr('fill', '#000')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(d => d.text);
    }, [highlightLinks]);

    return (
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
}

export default FlowchartSimulatedAnnealing;
