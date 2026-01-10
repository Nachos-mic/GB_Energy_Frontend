import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from "chart.js";
import type { DayData} from "../types/charts.types.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4ade80", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa", "#22d3ee", "#fb7185", "#cbd5e1", "#34d399"];

function Charts() {
    const [days, setDays] = useState<DayData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await axios.get<DayData[]>("http://localhost:3100/api/v1/energyinfo/data");
                setDays(res.data);
            } catch (error) {
                console.error("Błąd:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const makePieData = (day: DayData): ChartData<"pie"> => {
        const labels = Object.keys(day.averageFuelUsage);
        const values = Object.values(day.averageFuelUsage);

        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
                },
            ],
        };
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Miks energetyczny (3 dni)</h2>

            {loading && <div>Ładowanie...</div>}

            {!loading && !days.length && <div>Brak danych</div>}

            {!loading && days.length > 0 && (
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {days.map((day) => (
                        <div key={day.date} style={{ width: 360 }}>
                            <h3>{day.date}</h3>
                            <div>Clean energy: {day.totalCleanEnergyPercentage.toFixed(2)}%</div>
                            <Pie data={makePieData(day)} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Charts;
