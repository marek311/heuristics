import React, { useEffect, useState } from 'react';
import Colors from '../../Main/Colors';
import TSP_DefaultData from '../DefaultData/TSP_DefaultData';

function InputHandlerTSP({ data, setData }) {
    const defaultData = TSP_DefaultData();
    const [cities, setCities] = useState([]);
    const [startEndCity, setStartEndCity] = useState('');

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
    }, [data, setData]);

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

            if (citiesSet.size > 20) {
                alert('Error: The number of cities exceeds the limit of 20. Please provide a valid file.');
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

    return (
        <div>
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                CSV file: row contains edge in format: city1;city2;distance<br />
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
        </div>
    );
}

export default InputHandlerTSP;
