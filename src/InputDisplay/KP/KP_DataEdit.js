import React, { useState } from 'react';
import Colors from '../../Main/Colors';

function KP_DataEdit({ items, capacity, onDataChange }) {
    const [editableItems, setEditableItems] = useState(items);

    const handleInputChange = (e, index, field) => {
        const newItems = [...editableItems];
        newItems[index][field] = parseFloat(e.target.value) || 0;
        setEditableItems(newItems);
        onDataChange(newItems);
    };

    return (
        <div className={`flex-1 p-4 rounded-lg mr-2 ${Colors.cardBackground}`}>
            <div className="flex justify-between mb-4">
                <h2 className="mx-4"><strong>Available Items</strong></h2>
                {capacity && <p className="mx-4">Backpack capacity: {capacity}</p>}
            </div>
            <ul className="mt-4 space-y-1">
                <li className={`flex justify-between items-center p-1 rounded ${Colors.itemBackground}`}>
                    <div>Index</div>
                    <div>Weight</div>
                    <div>Price</div>
                </li>
                {editableItems.map((item, index) => (
                    <li
                        key={index}
                        className={`flex justify-between items-center p-1 rounded ${Colors.itemBackground}`}>
                        <div>{item.originalIndex}</div>
                        <div>
                            <input
                                type="number"
                                value={item.weight}
                                onChange={(e) => handleInputChange(e, index, 'weight')}
                                className="w-16 p-1 text-center border rounded"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                value={item.price}
                                onChange={(e) => handleInputChange(e, index, 'price')}
                                className="w-16 p-1 text-center border rounded"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KP_DataEdit;
