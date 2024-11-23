import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function KnapsackFlowChart({ items, currentIndex }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 500;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#2d2d2d')
            .style('overflow', 'visible');

        const nodes = [
            { id: 'load', text: 'Aktuálny predmet', x: 200, y: 50 },
            { id: 'check', text: 'Zmestí sa do batohu?', x: 200, y: 200 },
            { id: 'add', text: 'Pridaj do batohu', x: 100, y: 325 },
            { id: 'next', text: 'Nasledujúca iterácia', x: 200, y: 450 },
        ];

        const links = [
            { source: 'load', target: 'check' },
            { source: 'check', target: 'add', label: 'Áno' },
            { source: 'check', target: 'next', label: 'Nie' },
            { source: 'add', target: 'next' },
        ];

        svg.selectAll('line')
            .data(links)
            .join('line')
            .attr('x1', d => nodes.find(n => n.id === d.source).x)
            .attr('y1', d => nodes.find(n => n.id === d.source).y)
            .attr('x2', d => nodes.find(n => n.id === d.target).x)
            .attr('y2', d => nodes.find(n => n.id === d.target).y)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        svg.selectAll('text.link-label')
            .data(links)
            .join('text')
            .attr('class', 'link-label')
            .attr('x', d => (nodes.find(n => n.id === d.source).x + nodes.find(n => n.id === d.target).x) / 2)
            .attr('y', d => (nodes.find(n => n.id === d.source).y + nodes.find(n => n.id === d.target).y) / 2 - 10)
            .attr('fill', '#fff')
            .text(d => d.label || '');

        const nodeGroups = svg.selectAll('g.node')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`);

        nodeGroups.append('circle')
            .attr('r', 40)
            .attr('fill', '#4caf50');

        nodeGroups.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#fff')
            .text(d => d.text);
    }, []);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const currentItem = items[currentIndex];

        if (currentItem) {

            svg.selectAll('g.info').remove();

            const infoGroup = svg.append('g').attr('class', 'info');

            infoGroup.selectAll('text')
                .data([
                    `Index: ${currentItem.originalIndex}`,
                    `Váha: ${currentItem.weight}`,
                    `Cena: ${currentItem.price}`
                ])
                .join('text')
                .attr('x', 270)
                .attr('y', (_, i) => 50 + i * 20)
                .attr('fill', '#fff')
                .attr('text-anchor', 'start')
                .text(d => d);
        }
    }, [currentIndex, items]);

    return <svg ref={svgRef}></svg>;
}

export default KnapsackFlowChart;
