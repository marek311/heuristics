import React from 'react';

function SolKnapsackInsert({
                             selectedItems,
                             currentWeight,
                             currentPrice,
                             currentIndex,
                             items,
                             binarySolution
}) {
    return (
        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
            <div className="flex justify-between items-center mb-4 space-x-4">
                <h2><strong>Predmety vybrané do batohu</strong></h2>
                <p>Aktuálna váha: {currentWeight}</p>
                <p>Aktuálna cena: {currentPrice}</p>
                <p>Iterácia: {currentIndex}</p>
            </div>
            <ul className="mt-2 space-y-2">
                <li className="flex justify-between items-center p-2 bg-gray-200 rounded">
                    <div>Index</div>
                    <div>Váha</div>
                    <div>Cena</div>
                </li>
                {selectedItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded">
                        <div>{item.originalIndex}</div>
                        <div>{item.weight}</div>
                        <div>{item.price}</div>
                    </li>
                ))}
            </ul>
            {currentIndex >= items.length && (
                <p className="mt-2 flex justify-center text-center">Algoritmus skončil!</p>
            )}
            <div className="flex-1 p-4 bg-gray-500 rounded-lg mt-4">
                <h2><strong>Binárny vektor riešenia</strong></h2>
                <p className="mt-2 bg-gray-200 p-2 rounded text-center">
                    {binarySolution.join("; ")}
                </p>
            </div>
        </div>
    );
}

export default SolKnapsackInsert;
