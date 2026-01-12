import React, { useState } from "react";
import axios from "axios";
import { BestWindow } from "../types/window.types";

function ChargeWindow() {
    const [hours, setHours] = useState(0);
    const [window, setWindow] = useState<BestWindow | null>(null);
    const [loading, setLoading] = useState(false);

    const formatDateTime = (iso: string) => {
        const d = new Date(iso);

        return d.toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/London" });
    };

    const fetchWindowData = async () => {
        try {
            setLoading(true);

            const res = await axios.get<BestWindow>(
                `http://localhost:3100/api/v1/energyinfo/charge-window/${hours}`
            );

            setWindow(res.data);
        } catch (error) {
            console.error("Błąd:", error);
            setWindow(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section">
            <h2>Optymalne okno ładowania (1-6h)</h2>

            <div className="form-group">
                <label>Czas ładowania:</label>
                <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                />
                <button onClick={fetchWindowData} disabled={loading}>
                    Oblicz najlepsze okno
                </button>
            </div>

            {loading && <div className="loading">Liczenie...</div>}

            {!loading && window && (
                <div className="result-card">
                    <div>Start: {formatDateTime(window.start)}</div>
                    <div>Koniec: {formatDateTime(window.end)}</div>
                    <div>Średni udział czystych źródeł energii: {window.percentage}%</div>
                </div>
            )}

            {!loading && !window && <div className="no-data">Brak danych</div>}
        </div>
    );
}

export default ChargeWindow;
