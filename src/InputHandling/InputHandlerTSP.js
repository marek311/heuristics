import React from 'react';
import Colors from '../Main/Colors';

function InputHandlerTSP({ data, setData }) {

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

    return (
        <div>
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                CSV file: row contains edge in format: city1;city2;distance
            </label>
            <input
                type="file"
                accept=".csv"
                className="p-2 mb-4 text-black border rounded w-full"
                onChange={handleFileUpload}
            />
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                Number of cities:
            </label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                value={data.cityCount || ''}
                readOnly
            />
        </div>
    );
}

export default InputHandlerTSP;
