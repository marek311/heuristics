import React from 'react';

function InputHandlerTSP({ data, setData }) {
    return (
        <div>
            <label className="block text-gray-800 mb-2">Zadajte x suradnice miest:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="X suradnice"
                value={data.xCoordinates}
                onChange={(e) =>
                    setData({
                        ...data,
                        xCoordinates: e.target.value,
                    })
                }
            />

            <label className="block text-gray-800 mb-2">Zadajte y suradnice miest:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Y suradnice"
                value={data.yCoordinates}
                onChange={(e) =>
                    setData({
                        ...data,
                        yCoordinates: e.target.value,
                    })
                }
            />
        </div>
    );
}

export default InputHandlerTSP;