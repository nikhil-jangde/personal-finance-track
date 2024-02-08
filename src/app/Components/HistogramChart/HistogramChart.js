import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const HistogramChart = ({ spendingData }) => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (spendingData) {
        if (spendingData.length > 0) {
            // Find the maximum date in the spending data
            const maxDate = new Date(Math.max(...spendingData.map(data => new Date(data.date))));
            const lastDayOfMonth = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0).getDate();

            // Generate labels for each day of the month
            const labels = Array.from({ length: lastDayOfMonth }, (_, index) => (index + 1).toString());

            // Initialize spending amounts array
            const spendingAmounts = Array.from({ length: lastDayOfMonth }, () => 0);

            // Populate spending amounts array with corresponding spending data
            spendingData.forEach(data => {
                const spendingDate = new Date(data.date);
                const dayOfMonth = spendingDate.getDate();
                spendingAmounts[dayOfMonth - 1] += data.amount; // Subtract 1 to adjust for zero-based indexing
            });

            // Set chart data
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Spent ₹',
                        data: spendingAmounts,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgb(53, 162, 235, 0.9)',
                    },
                ]
            });

            // Set chart options
            setChartOptions({
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Spendings'
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            });
        } else {
            // If spendingData is empty, show zero spending for each day of the month
            const labels = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
            const spendingAmounts = Array.from({ length: 31 }, () => 0);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Spent ₹',
                        data: spendingAmounts,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgb(53, 162, 235, 0.9)',
                    },
                ]
            });
        }
    }}, [spendingData]);

    return (
        <div className='w-full md:col-span-2 relative lg:h-[50vh] h-[35vh] m-auto p-4 border rounded-lg'>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default HistogramChart;
