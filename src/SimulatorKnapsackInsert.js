import React from 'react';
import { useLocation } from 'react-router-dom';

function SimulationKnapsackInsert() {
    const location = useLocation();
    const { weights, prices, capacity } = location.state || {};

    return (
        <div>
            <h2>Knapsack Insert Simulation</h2>
            <p><strong>Prices:</strong> {prices.join(', ')}</p>
            <p><strong>Weights:</strong> {weights.join(', ')}</p>
            <p><strong>Capacity:</strong> {capacity}</p>
        </div>
    );
}

export default SimulationKnapsackInsert;
