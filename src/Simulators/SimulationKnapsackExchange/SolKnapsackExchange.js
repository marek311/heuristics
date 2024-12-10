import React from 'react';

function SolKnapsackInsert({exchangeHistory}) {
    return (
        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
            <h2 className="mb-4 font-semibold"><strong>Vykonané výmeny</strong></h2>
            <div className="flex-1 p-4 bg-white rounded-lg mr-2">
                <ul className="space-y-4">
                    {exchangeHistory.map((exchange, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded">
                            <p>Iterácia: {index}</p>
                            <p>Vektor: {exchange.binaryVector.join('; ')}</p>
                            {exchange.removed && exchange.added ? (
                                <>
                                    <p>
                                        Odstránené: {exchange.removed.originalIndex},
                                        Váha: {exchange.removed.weight},
                                        Cena: {exchange.removed.price}
                                    </p>
                                    <p>
                                        Pridané: {exchange.added.originalIndex},
                                        Váha: {exchange.added.weight},
                                        Cena: {exchange.added.price}
                                    </p>
                                </>
                            ) : (
                                <p>Počiatočné riešenie</p>
                            )}
                            <p>
                                Váha: {exchange.newWeight}, Cena: {exchange.newPrice}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SolKnapsackInsert;