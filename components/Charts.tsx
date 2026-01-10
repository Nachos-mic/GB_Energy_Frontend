import React, {useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';

function Charts() {

    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3100/api/v1/energyinfo/get_data');
                const result = await response.json();

                console.log(result)

                const formattedChartData = generateChartData(result);

                setChartData(formattedChartData);
                setLoading(false);

                console.log(chartData)
            } catch (error) {
                console.error('Błąd:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{padding: 20}}>
            <h2>Udział czystych źródeł energii</h2>
            {chartData && !loading ?  <Pie data={chartData} /> : <span>brak danych</span>}

        </div>
    );
}

export default Charts;
