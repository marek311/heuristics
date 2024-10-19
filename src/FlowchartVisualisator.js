import React, { useEffect } from 'react';
import * as d3 from 'd3';

function D3Flowchart({ heuristic, problem }) {
    useEffect(() => {
        d3.select('#flowchart').selectAll('*').remove();

        const svg = d3.select('#flowchart')
            .append('svg')
            .attr('width', 500)
            .attr('height', 500);

        // Define nodes and their positions
        const nodes = [
            { id: 'start', text: 'Start', x: 250, y: 30 },
            { id: 'init', text: 'Initialize\nTotal Weight = 0\nTotal Value = 0', x: 250, y: 100 },
            { id: 'sort', text: 'Sort Items by Value/Weight Ratio', x: 250, y: 170 },
            { id: 'insert', text: 'Insert Items', x: 250, y: 240 },
            { id: 'check', text: 'Check Capacity\n(If Can Add Item)', x: 250, y: 310 },
            { id: 'add', text: 'Add Item to Knapsack', x: 150, y: 380 },
            { id: 'skip', text: 'Skip Item', x: 350, y: 380 },
            { id: 'end', text: 'End\nOutput Total Weight and Value', x: 250, y: 450 }
        ];

        // Create circles for nodes
        nodes.forEach(node => {
            svg.append('g')
                .attr('transform', `translate(${node.x}, ${node.y})`)
                .append('circle')
                .attr('r', 30)
                .style('fill', 'purple');

            svg.append('text')
                .attr('x', 0)
                .attr('y', 5)
                .attr('text-anchor', 'middle')
                .attr('fill', 'white')
                .text(node.text);
        });

        // Define links between nodes
        const links = [
            { source: 'start', target: 'init' },
            { source: 'init', target: 'sort' },
            { source: 'sort', target: 'insert' },
            { source: 'insert', target: 'check' },
            { source: 'check', target: 'add' },
            { source: 'check', target: 'skip' },
            { source: 'add', target: 'end' },
            { source: 'skip', target: 'end' }
        ];

        // Draw links (lines)
        links.forEach(link => {
            const sourceNode = nodes.find(node => node.id === link.source);
            const targetNode = nodes.find(node => node.id === link.target);

            svg.append('line')
                .attr('x1', sourceNode.x)
                .attr('y1', sourceNode.y + 30)
                .attr('x2', targetNode.x)
                .attr('y2', targetNode.y - 30)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);
        });
    }, [heuristic, problem]);

    return (
        <div id="flowchart"></div>
    );
}

export default D3Flowchart;
