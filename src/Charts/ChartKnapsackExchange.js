import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function KnapsackExchangeFlowChart({ currentBackpackWeight, currentBackpackPrice, backpackCapacity }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 500;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#818181')
            .style('overflow', 'visible');

        const nodes = [
            { id: 'inBackpack', text: 'Predmet v batohu', x: 200, y: 50, shape: 'rect', color: '#1e88e5' },
            { id: 'notInBackpack', text: 'Predmet nie v batohu', x: 200, y: 125, shape: 'rect', color: '#1e88e5' },
            { id: 'admissible', text: 'Pripustná výmena?', x: 200, y: 200, shape: 'diamond', color: '#ffa533' },
            { id: 'improving', text: 'Zlepsujúca výmena?', x: 100, y: 300, shape: 'diamond', color: '#ffa533' },
            { id: 'exchange', text: 'Vykonaj výmenu', x: 100, y: 400, shape: 'oval', color: '#4caf50' },
            { id: 'next', text: 'Nasledujúca iterácia', x: 300, y: 450, shape: 'oval', color: '#4caf50' },
        ];

        const links = [
            { source: 'inBackpack', target: 'notInBackpack' },
            { source: 'notInBackpack', target: 'admissible' },
            { source: 'admissible', target: 'improving', label: 'Ano' },
            { source: 'admissible', target: 'next', label: 'Nie' },
            { source: 'improving', target: 'exchange', label: 'Ano' },
            { source: 'improving', target: 'next', label: 'Nie' },
            { source: 'exchange', target: 'next' },
        ];

        svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 12 10')
            .attr('refX', 15)
            .attr('refY', 0)
            .attr('markerWidth', 8)
            .attr('markerHeight', 8)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-4L10,0L0,4')
            .attr('fill', 'red');

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
                    .attr('fill', d.color);
            }
        });

        nodeGroups.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#fff')
            .style('font-size', '14px')
            .text(d => d.text);

        svg.selectAll('line')
            .data(links)
            .join('line')
            .attr('x1', d => nodes.find(n => n.id === d.source).x)
            .attr('y1', d => nodes.find(n => n.id === d.source).y + 20)
            .attr('x2', d => nodes.find(n => n.id === d.target).x)
            .attr('y2', d => nodes.find(n => n.id === d.target).y - 20)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#arrow)');

        svg.selectAll('text.link-label')
            .data(links)
            .join('text')
            .attr('class', 'link-label')
            .attr('x', d => (nodes.find(n => n.id === d.source).x + nodes.find(n => n.id === d.target).x) / 2)
            .attr('y', d => (nodes.find(n => n.id === d.source).y + nodes.find(n => n.id === d.target).y) / 2 - 10)
            .attr('fill', '#fff')
            .text(d => d.label || '');
    }, []);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        svg.selectAll('g.info-backpack').remove();

        const backpackInfoGroup = svg.append('g').attr('class', 'info-backpack');
        backpackInfoGroup.selectAll('text')
            .data([
                `Aktuálna váha: ${currentBackpackWeight}`,
                `Cena: ${currentBackpackPrice}`,
                `Voľná kapacita: ${backpackCapacity - currentBackpackWeight}`,
            ])
            .join('text')
            .attr('x', 270)
            .attr('y', (_, i) => 40 + i * 20)
            .attr('fill', '#fff')
            .attr('text-anchor', 'start')
            .text(d => d);

    }, [currentBackpackWeight, currentBackpackPrice, backpackCapacity]);

    return <svg ref={svgRef}></svg>;
}

export default KnapsackExchangeFlowChart;
