import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function FlowchartTabuSearch() {
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
            { id: 'initial', text: 'Initial Solution', x: 250, y: 40, shape: 'rect', color: '#1e88e5' },
            { id: 'neighbor', text: 'Find Best Neighbor', x: 250, y: 120, shape: 'oval', color: '#4caf50' },
            { id: 'tabuCheck', text: 'Move in Tabu List?', x: 250, y: 200, shape: 'diamond', color: '#ffa533' },
            { id: 'aspiration', text: 'Aspiration Criteria?', x: 100, y: 290, shape: 'diamond', color: '#ffa533' },
            { id: 'acceptMove', text: 'Accept Move', x: 100, y: 370, shape: 'rect', color: '#1e88e5' },
            { id: 'updateTabu', text: 'Update Tabu List', x: 100, y: 480, shape: 'oval', color: '#4caf50' },
            { id: 'bestCheck', text: 'Best Solution Update?', x: 400, y: 290, shape: 'diamond', color: '#ffa533' },
            { id: 'updateBest', text: 'Update Best Solution', x: 400, y: 380, shape: 'rect', color: '#1e88e5' },
            { id: 'nextIteration', text: 'Next Iteration', x: 250, y: 550, shape: 'rect', color: '#1e88e5' },
        ];

        const links = [
            { source: 'initial', target: 'neighbor' },
            { source: 'neighbor', target: 'tabuCheck' },
            { source: 'tabuCheck', target: 'aspiration', label: 'Yes' },
            { source: 'tabuCheck', target: 'bestCheck', label: 'No' },
            { source: 'aspiration', target: 'acceptMove', label: 'Yes' },
            { source: 'aspiration', target: 'neighbor', label: 'No' },
            { source: 'acceptMove', target: 'updateTabu' },
            { source: 'updateTabu', target: 'nextIteration' },
            { source: 'bestCheck', target: 'updateBest', label: 'Yes' },
            { source: 'bestCheck', target: 'nextIteration', label: 'No' },
            { source: 'updateBest', target: 'nextIteration' },
        ];

        const linkLines = svg.selectAll('line')
            .data(links)
            .join('line')
            .attr('x1', d => nodes.find(n => n.id === d.source).x)
            .attr('y1', d => nodes.find(n => n.id === d.source).y)
            .attr('x2', d => nodes.find(n => n.id === d.target).x)
            .attr('y2', d => nodes.find(n => n.id === d.target).y)
            .attr('stroke', '#333')
            .attr('stroke-width', 2);

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
    }, );

    return (
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
}

export default FlowchartTabuSearch;
