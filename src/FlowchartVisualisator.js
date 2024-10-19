import React, { useEffect } from 'react';
import * as d3 from 'd3';

function D3Flowchart({ heuristic, problem }) {
    useEffect(() => {
        // Vyčisti starý flowchart
        d3.select('#flowchart').selectAll('*').remove();

        // Inicializácia flowchartu
        const svg = d3.select('#flowchart').append('svg')
            .attr('width', 500)
            .attr('height', 500);

        // Príklad: pridaj kruh
        svg.append('circle')
            .attr('cx', 250)
            .attr('cy', 250)
            .attr('r', 50)
            .style('fill', 'purple');
    }, [heuristic, problem]);

    return (
        <div id="flowchart">
            {/* Tu sa vykreslí flowchart */}
        </div>
    );
}

export default D3Flowchart;
