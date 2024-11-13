import React from 'react';
import { useState } from 'react';

function InputHandlerKnapsackProblem() {

    const [weights, setWeights] = useState('');
    const [prices, setPrices] = useState('');
    const [capacity, setCapacity] = useState('');

    return (
        <div>
            <label className="block text-white mb-2">Zadajte pole hmotnosti predmetov:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Hmotnosti predmetov"
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
            />

            <label className="block text-white mb-2">Zadajte pole cien predmetov:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Ceny predmetov"
                value={prices}
                onChange={(e) => setPrices(e.target.value)}
            />

            <label className="block text-white mb-2">Zadajte kapacitu batohu:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Kapacita batohu"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
            />
        </div>
    );
}

export default InputHandlerKnapsackProblem;