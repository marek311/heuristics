import DefaultDataKnapsack from './DefaultDataKnapsack';
import Colors from '../Main/Colors';

function InputHandlerKnapsack({ data, setData }) {
    const defaultData = DefaultDataKnapsack();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter((line) => line.trim() !== '');

            const parsedPrices = [];
            const parsedWeights = [];
            lines.forEach((line) => {
                const [price, weight] = line.split(';').map(Number);
                if (!isNaN(price) && !isNaN(weight)) {
                    parsedPrices.push(price);
                    parsedWeights.push(weight);
                }
            });

            if (parsedPrices.length && parsedWeights.length) {
                setData({
                    ...data,
                    prices: parsedPrices,
                    weights: parsedWeights,
                });
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                CSV file: row contains price and weight in format: price;weight
            </label>
            <input
                type="file"
                accept=".csv"
                className="p-2 mb-4 text-black border rounded w-full"
                onChange={handleFileUpload}
            />
            <label className={`block mb-2 ${Colors.textPrimary}`}>
                Enter backpack capacity:
            </label>
            <input
                type="number"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Kapacita batohu"
                value={data.capacity}
                onChange={(e) =>
                    setData({
                        ...data,
                        capacity: e.target.value || defaultData.capacity,
                    })
                }
            />
        </div>
    );
}

export default InputHandlerKnapsack;