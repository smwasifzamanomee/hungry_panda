import { salesGraphData } from '@/data/data';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const GraphChart = () => {

    const [store, setStore] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStoreChange = (event) => {
        setStore(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filterSalesData = () => {
        let filteredData = salesGraphData;

        if (store !== '') {
            filteredData = filteredData.filter((item) => item.store === store);
        }

        if (startDate !== '' && endDate !== '') {
            filteredData = filteredData.filter(
                (item) => item.date >= startDate && item.date <= endDate
            );
        }

        return filteredData;
    };

    const chartData = {
        labels: filterSalesData().map((item) => item.date),
        datasets: [
            {
                label: 'Sales',
                data: filterSalesData().map((item) => item.sales),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales'
                }
            }
        }
    };


    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-center space-x-4 mb-4">
                <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={store}
                    onChange={handleStoreChange}
                >
                    <option value="">All Stores</option>
                    <option value="Store 1">Store 1</option>
                    <option value="Store 2">Store 2</option>
                    <option value="Store 3">Store 3</option>
                    <option value="Store 4">Store 4</option>
                    <option value="Store 5">Store 5</option>
                    <option value="Store 6">Store 6</option>
                    <option value="Store 7">Store 7</option>
                </select>

                <input
                    className="p-2 border border-gray-300 rounded-md"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />

                <input
                    className="p-2 border border-gray-300 rounded-md"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </div>

            <div className="h-96 flex justify-center mb-10">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default GraphChart;
