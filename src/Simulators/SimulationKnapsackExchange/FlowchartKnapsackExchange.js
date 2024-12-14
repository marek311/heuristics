import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function KnapsackExchangeFlowChart({ strategy }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 500;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#818181')
            .style('overflow', 'visible');

        svg.selectAll('*').remove();

        const commonNodes = [
            { id: 'inBackpack', text: 'Predmet v batohu', x: 200, y: 40, shape: 'rect', color: '#1e88e5' },
            { id: 'notInBackpack', text: 'Predmet nie v batohu', x: 200, y: 115, shape: 'rect', color: '#1e88e5' },
            { id: 'admissible', text: 'Pripustná výmena?', x: 200, y: 190, shape: 'diamond', color: '#ffa533' },
            { id: 'improving', text: 'Zlepsujúca výmena?', x: 100, y: 250, shape: 'diamond', color: '#ffa533' },
            { id: 'next', text: 'Nasledujúca iterácia', x: 300, y: 375, shape: 'oval', color: '#4caf50' },
        ];

        const commonLinks = [
            { source: 'inBackpack', target: 'notInBackpack' },
            { source: 'notInBackpack', target: 'admissible' },
            { source: 'admissible', target: 'improving', label: 'Ano' },
            { source: 'admissible', target: 'next', label: 'Nie' },
            { source: 'improving', target: 'next', label: 'Nie' },
        ];

        let strategyNodes = [];
        let strategyLinks = [];

        if (strategy === 'firstFit') {
            strategyNodes = [
                { id: 'exchange', text: 'Vykonaj výmenu', x: 100, y: 375, shape: 'oval', color: '#4caf50' },
                { id: 'solution', text: 'Nové riešenie', x: 100, y: 450, shape: 'rect', color: '#1e88e5' },
            ];
            strategyLinks = [
                { source: 'improving', target: 'exchange', label: 'Ano' },
                { source: 'exchange', target: 'solution' },
            ];
        }

        if (strategy === 'bestFit') {
            strategyNodes = [
                { id: 'bestQuestion', text: 'Najlepsia vymena?', x: 100, y: 350, shape: 'diamond', color: '#ffa533' },
                { id: 'solution', text: 'Nové riešenie', x: 200, y: 465, shape: 'rect', color: '#1e88e5' },
            ];
            strategyLinks = [
                { source: 'improving', target: 'bestQuestion', label: 'Ano' },
                { source: 'bestQuestion', target: 'next' },
                { source: 'next', target: 'solution', label: 'Najlepšia výmena' },
            ];
        }

        const nodes = [...commonNodes, ...strategyNodes];
        const links = [...commonLinks, ...strategyLinks];

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
            .attr('x', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                if (!sourceNode || !targetNode) return 0;
                const ratio = 0.5;
                return sourceNode.x + (targetNode.x - sourceNode.x) * ratio;
            })
            .attr('y', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                if (!sourceNode || !targetNode) return 0;
                const ratio = 0.5;
                return sourceNode.y + (targetNode.y - sourceNode.y) * ratio;
            })
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('dy', '-5')
            .text(d => d.label || '');

    }, [strategy]);

    return (
        <div className="flex-1 p-1 bg-white rounded-lg">
            <svg ref={svgRef} className="w-full"></svg>
        </div>
    );
}

export default KnapsackExchangeFlowChart;
