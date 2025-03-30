import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Colors from "../../Main/Colors";

function FlowchartExchange({ strategy, highlightLinks = [] }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 500;
        const height = 550;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', Colors.graphBackground)
            .style('border', '1px solid #ccc')
            .style('overflow', 'visible');

        const commonNodes = [
            { id: 'inBackpack', text: 'Item in backpack', x: 250, y: 40, shape: 'rect', color: Colors.graphBlue },
            { id: 'notInBackpack', text: 'Item Not in backpack', x: 250, y: 115, shape: 'rect', color: Colors.graphBlue },
            { id: 'admissible', text: 'Admissible exchange?', x: 250, y: 200, shape: 'diamond', color: Colors.graphOrange },
            { id: 'improving', text: 'Improving exchange?', x: 125, y: 260, shape: 'diamond', color: Colors.graphOrange },
            { id: 'next', text: 'Next iteration', x: 350, y: 350, shape: 'oval', color: Colors.graphGreen },
            { id: 'solution', text: 'New Solution', x: 350, y: 500, shape: 'rect', color: Colors.graphBlue },
        ];

        const commonLinks = [
            { source: 'inBackpack', target: 'notInBackpack' },
            { source: 'notInBackpack', target: 'admissible' },
            { source: 'admissible', target: 'improving', label: 'Yes' },
            { source: 'admissible', target: 'next', label: 'No' },
            { source: 'improving', target: 'next', label: 'No' },
        ];

        let strategyNodes = [];
        let strategyLinks = [];

        if (strategy === 'firstFit') {
            strategyNodes = [
                { id: 'exchange', text: 'Perform exchange', x: 125, y: 400, shape: 'oval', color: Colors.graphGreen },
            ];
            strategyLinks = [
                { source: 'improving', target: 'exchange', label: 'Yes' },
                { source: 'exchange', target: 'solution' },
            ];
        }

        if (strategy === 'bestFit') {
            strategyNodes = [
                { id: 'bestQuestion', text: 'Best exchange?', x: 100, y: 375, shape: 'diamond', color: Colors.graphOrange },
                { id: 'exchange', text: 'Save Best exchange', x: 100, y: 475, shape: 'oval', color: Colors.graphGreen },
            ];
            strategyLinks = [
                { source: 'improving', target: 'bestQuestion', label: 'Yes' },
                { source: 'bestQuestion', target: 'exchange', label: 'Yes' },
                { source: 'bestQuestion', target: 'next', label: 'No' },
                { source: 'exchange', target: 'next'},
                { source: 'next', target: 'solution',label: 'IF(All iterations) Perform Best Exchange'},
            ];
        }

        const nodes = [...commonNodes, ...strategyNodes];
        const links = [...commonLinks, ...strategyLinks];

        svg.selectAll('line')
            .data(links)
            .join('line')
            .attr('x1', d => nodes.find(n => n.id === d.source).x)
            .attr('y1', d => nodes.find(n => n.id === d.source).y)
            .attr('x2', d => nodes.find(n => n.id === d.target).x)
            .attr('y2', d => nodes.find(n => n.id === d.target).y)
            .attr('stroke', d => highlightLinks.some(link => link.source === d.source && link.target === d.target) ? Colors.graphRed : Colors.graphMainColor)
            .attr('stroke-width', d => highlightLinks.some(link => link.source === d.source && link.target === d.target) ? 3 : 2);

        svg.selectAll('polygon.arrow')
            .data(links)
            .join('polygon')
            .attr('class', 'arrow')
            .attr('points', '0,-5 10,0 0,5')
            .attr('fill', Colors.graphMainColor)
            .attr('transform', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                const midX = (sourceNode.x + targetNode.x) / 2;
                const midY = (sourceNode.y + targetNode.y) / 2;
                const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x) * 180 / Math.PI;
                return `translate(${midX},${midY}) rotate(${angle})`;
            });

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
            .attr('fill', Colors.graphMainColor)
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(d => d.text);

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
                return (sourceNode.y + targetNode.y) / 2 - 10;
            })
            .attr('text-anchor', 'middle')
            .attr('fill', Colors.graphMainColor)
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(d => d.label || '');

    }, [strategy, highlightLinks]);

    return (
        <div className={`flex-1 p-4 ${Colors.cardBackground} rounded-lg shadow-md`}>
            <div className="flex flex-col items-center justify-center">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
}

export default FlowchartExchange;
