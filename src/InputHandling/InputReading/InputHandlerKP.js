import KP_DefaultData from '../DefaultData/KP_DefaultData';
import Colors from '../../Main/Colors';

function InputHandlerKP({ data, setData }) {
    const defaultData = KP_DefaultData();

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

                if (!isNaN(price) && price > 0 && !isNaN(weight) && weight > 0) {
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
            <label className={`text-center block mb-2 ${Colors.textPrimary}`}>
                Upload a CSV file (optional). If no file is provided, default data will be used.
                <br />
                Each row should contain price and weight in the following format:
                <br />
                <strong>price;weight</strong>
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
                min="1"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Enter backpack capacity"
                value={data.capacity}
                onChange={(e) => {
                    const value = Math.max(1, parseFloat(e.target.value) || defaultData.capacity);
                    setData({ ...data, capacity: value });
                }}
            />
        </div>
    );
}

export default InputHandlerKP;