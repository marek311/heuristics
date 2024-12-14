import React from 'react';
import Colors from '../Main/Colors';

function KnapsackData({ items, currentIndex, itemStatus, capacity, showStatus = true, highlightCurrent = true, simpleMode = false }) {
    return (
        <div className={`flex-1 p-4 rounded-lg mr-2 ${Colors.cardBackground}`}>
            <div className="flex justify-between mb-4">
                <h2 className="mx-4"><strong>Predmety k dispozícii</strong></h2>
                {capacity && <p className="mx-4">Kapacita batohu: {capacity}</p>}
            </div>
            <ul className="mt-4 space-y-1">
                <li className={`flex justify-between items-center p-1 rounded ${Colors.itemBackground}`}>
                    <div>Index</div>
                    <div>Váha</div>
                    <div>Cena</div>
                    {!simpleMode && <div>Výhodnosť</div>}
                    {showStatus && <div> ✓ / ✗</div>}
                </li>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center p-1 rounded ${
                            highlightCurrent && index === currentIndex
                                ? Colors.highlightCurrentItem
                                : Colors.itemBackground}`}>
                        <div>{item.originalIndex}</div>
                        <div>{item.weight}</div>
                        <div>{item.price}</div>
                        {!simpleMode && <div>{item.efficiency.toFixed(2)}</div>}
                        {showStatus && (
                            <span
                                className={`${
                                    itemStatus?.[index] === true
                                        ? Colors.statusItemAdded
                                        : itemStatus?.[index] === false
                                            ? Colors.statusItemNotAdded
                                            : ''
                                } flex justify-end`}>
                                {itemStatus?.[index] === true ? "✓" : itemStatus?.[index] === false ? "✗" : ""}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KnapsackData;
