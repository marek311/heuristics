import React from 'react';

function InfoKnapsackData({ items, currentIndex, itemStatus, capacity, showStatus = true, highlightCurrent = true, simpleMode = false }) {
    return (
        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
            <div className="flex justify-between mb-4">
                <h2><strong>Predmety k dispozícii</strong></h2>
                {capacity && <p>Kapacita batohu: {capacity}</p>}
            </div>
            <ul className="mt-4 space-y-2">
                <li className="flex justify-between items-center p-2 bg-gray-200 rounded">
                    <div>Index</div>
                    <div>Váha</div>
                    <div>Cena</div>
                    {!simpleMode && <div>Výhodnosť</div>}
                    {showStatus && <div> ✓ / ✗</div>}
                </li>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center p-2 rounded ${
                            highlightCurrent && index === currentIndex ? 'bg-teal-500' : 'bg-gray-200'}`}>
                        <div>{item.originalIndex}</div>
                        <div>{item.weight}</div>
                        <div>{item.price}</div>
                        {!simpleMode && <div>{item.efficiency.toFixed(2)}</div>}
                        {showStatus && (
                            <span
                                className={`${
                                    itemStatus?.[index] === true
                                        ? 'text-teal-700'
                                        : itemStatus?.[index] === false
                                            ? 'text-red-500'
                                            : ''
                                } flex justify-end`}
                            >
                                {itemStatus?.[index] === true ? "✓" : itemStatus?.[index] === false ? "✗" : ""}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InfoKnapsackData;
