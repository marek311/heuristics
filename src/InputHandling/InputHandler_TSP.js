import React, { useEffect, useState } from 'react';
import Colors from '../Main/Colors';
import DefaultData_TSP from './DefaultData/DefaultData_TSP';

function InputHandler_TSP({ data, setData }) {
    const defaultData = DefaultData_TSP();
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

            lines.forEach((line, index) => {
                const [city1, city2, distance] = line.split(';').map((value) => value.trim());
                const parsedDistance = parseFloat(distance);

                if (city1 && city2 && !isNaN(parsedDistance)) {
                    parsedEdges.push({
                        city1,
                        city2,
                        distance: parsedDistance,
                    });

                    citiesSet.add(city1);
                    citiesSet.add(city2);
                } else {
                    console.error(`Invalid data on line ${index + 1}:`, { city1, city2, parsedDistance });
                }
            });

            if (parsedEdges.length) {
                const newData = {
                    ...data,
                    edges: parsedEdges,
                    cityCount: citiesSet.size,
                };
                setData(newData);
            } else {
                alert('No valid edges found. Please check the CSV format.');
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
                CSV file: row contains edge in format: city1;city2;distance<br/>
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

export default InputHandler_TSP;
