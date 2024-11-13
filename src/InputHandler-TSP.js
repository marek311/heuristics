import React from 'react';
import { useState } from 'react';

function InputHandlerTSP() {

    const [xCoordinates, setXCoordinates] = useState('');
    const [yCoordinates, setYCoordinates] = useState('');

    return (
        <div>
            <label className="block text-white mb-2">Zadajte x suradnice miest:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="X suradnice"
                value={xCoordinates}
                onChange={(e) => setXCoordinates(e.target.value)}
            />

            <label className="block text-white mb-2">Zadajte y suradnice miest:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Y suradnice"
                value={yCoordinates}
                onChange={(e) => setYCoordinates(e.target.value)}
            />
        </div>
    );
}

export default InputHandlerTSP;