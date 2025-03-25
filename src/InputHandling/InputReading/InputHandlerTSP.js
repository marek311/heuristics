import React, { useEffect, useState } from 'react';
import Colors from '../../Main/Colors';
import TSP_DefaultData from '../DefaultData/TSP_DefaultData';

function InputHandlerTSP({ data, setData, mode }) {
    const defaultData = TSP_DefaultData();
    const [cities, setCities] = useState([]);
    const [startEndCity, setStartEndCity] = useState('');

    const [tabuTenure, setTabuTenure] = useState(4);
    const [temperature, setTemperature] = useState(100);
    const [coolingRate, setCoolingRate] = useState(0.95);
    const [generationSize, setGenerationSize] = useState(4);
    const [mutationProbability, setMutationProbability] = useState(0.2);

    useEffect(() => {
        if (!data.edges.length) {
            setData(defaultData);
        }

        const citiesSet = new Set();
        data.edges.forEach((edge) => {
            citiesSet.add(edge.city1);
            citiesSet.add(edge.city2);
        });
        setCities(Array.from(citiesSet));

        if (!data.temperature) {
            setData(prevData => ({ ...prevData, temperature: temperature }));
        }
    }, [data.edges, setData]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter((line) => line.trim() !== '');

            const parsedEdges = [];
            const citiesSet = new Set();
            const adjacencyMap = new Map();

            lines.forEach((line, index) => {
                const [city1, city2, distance] = line.split(';').map((value) => value.trim());
                const parsedDistance = parseFloat(distance);

                if (city1 && city2 && !isNaN(parsedDistance) && parsedDistance > 0) {
                    parsedEdges.push({ city1, city2, distance: parsedDistance });
                    citiesSet.add(city1);
                    citiesSet.add(city2);

                    if (!adjacencyMap.has(city1)) adjacencyMap.set(city1, new Set());
                    if (!adjacencyMap.has(city2)) adjacencyMap.set(city2, new Set());

                    adjacencyMap.get(city1).add(city2);
                    adjacencyMap.get(city2).add(city1);
                } else {
                    console.error(`Invalid data on line ${index + 1}:`, { city1, city2, parsedDistance });
                }
            });

            if (citiesSet.size > 12) {
                alert('Error: The number of cities exceeds the limit of 12.');
                return;
            }

            const cityList = Array.from(citiesSet);
            for (let i = 0; i < cityList.length; i++) {
                for (let j = i + 1; j < cityList.length; j++) {
                    if (
                        !adjacencyMap.get(cityList[i])?.has(cityList[j]) ||
                        !adjacencyMap.get(cityList[j])?.has(cityList[i])
                    ) {
                        alert(`Error: The graph is not complete. Missing route between ${cityList[i]} and ${cityList[j]}.`);
                        return;
                    }
                }
            }

            if (parsedEdges.length) {
                const newData = {
                    ...data,
                    edges: parsedEdges,
                    cityCount: citiesSet.size,
                };
                setData(newData);
            } else {
                alert('Error: No valid edges found. Please check the CSV format.');
            }
        };

        reader.readAsText(file);
    };

    const handleStartEndCityChange = (e) => {
        const selectedCity = e.target.value;
        setStartEndCity(selectedCity);
        updateDataWithStartEnd(selectedCity);
    };

    const updateDataWithStartEnd = (city) => {
        if (city) {
            const newData = {
                ...data,
                startingCity: city,
                endingCity: city,
            };
            setData(newData);
        }
    };

    const handleTabuTenureChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 2 && value <= 7) {
            setTabuTenure(value);
            setData({ ...data, tabuTenure: value });
        }
    };

    const handleTemperatureChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value >= 1 && value <= 100000) {
            setTemperature(value);
            setData({ ...data, temperature: value });
        }
    };

    const handleCoolingRateChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value >= 0.8 && value <= 0.99) {
            setCoolingRate(value);
            setData({ ...data, coolingRate: value });
        }
    };

    const handleGenerationSizeChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value >= 4 && value <= 6) {
            setGenerationSize(value);
            setData({ ...data, generationSize: value });
        }
    };

    const handleMutationProbabilityChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value >= 0.1 && value <= 1.0) {
            setMutationProbability(value);
            setData({ ...data, mutationProbability: value });
        }
    };

    return (
        <div>
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                CSV file: row contains edge in format: <strong>city1;city2;distance</strong><br/>
                Note: Algorithms are designed for complete graphs only!
            </label>
            <input
                type="file"
                accept=".csv"
                className="p-2 mb-4 text-black border rounded w-full"
                onChange={handleFileUpload}
            />
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                Select Starting/Ending City:
            </label>
            <select
                className="p-2 mb-4 text-black border rounded w-full"
                value={startEndCity}
                onChange={handleStartEndCityChange}
            >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            {mode === 'TSPTabuSearch' && (
                <div>
                    <label className={`block mb-2 ${Colors.textPrimary}`}>
                        Tabu Tenure (2 - 7):
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="7"
                        value={tabuTenure}
                        onChange={handleTabuTenureChange}
                        className="p-2 mb-4 text-black border rounded w-full"
                    />
                </div>
            )}
            {mode === 'TSPSimulatedAnnealing' && (
                <div>
                    <div>
                        <label className={`block mb-2 ${Colors.textPrimary}`}>
                            Temperature (1 - 100 000):
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100000"
                            step="1"
                            value={temperature}
                            onChange={handleTemperatureChange}
                            className="p-2 mb-4 text-black border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className={`block mb-2 ${Colors.textPrimary}`}>
                            Cooling Rate (0.8 - 0.99):
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.8"
                            max="0.99"
                            value={coolingRate}
                            onChange={handleCoolingRateChange}
                            className="p-2 mb-4 text-black border rounded w-full"
                        />
                    </div>
                </div>
            )}
            {mode === 'TSPGenetic' && (
                <div>
                    <div>
                        <label className={`block mb-2 ${Colors.textPrimary}`}>
                            Generation Size (4 - 6):
                        </label>
                        <input
                            type="number"
                            min="4"
                            max="6"
                            value={generationSize}
                            onChange={handleGenerationSizeChange}
                            className="p-2 mb-4 text-black border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className={`block mb-2 ${Colors.textPrimary}`}>
                            Mutation Probability (0.1 - 1.0):
                        </label>
                        <input
                            type="number"
                            min="0.1"
                            max="1.0"
                            step="0.1"
                            value={mutationProbability}
                            onChange={handleMutationProbabilityChange}
                            className="p-2 mb-4 text-black border rounded w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InputHandlerTSP;
