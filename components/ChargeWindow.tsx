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
        <div style={{ padding: 20 }}>
            <h2>Najbardziej optymalne okno czasowe do ładowania (zakres 1-6):</h2>

            <div style={{ marginBottom: 12 }}>
                <label>
                    Czas ładowania (1–6h):{" "}
                    <input
                        type="number"
                        min={1}
                        max={6}
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                    />
                </label>

                <button onClick={fetchWindowData} disabled={loading} style={{ marginLeft: 8 }}>
                    Oblicz
                </button>
            </div>

            {loading && <div>Liczenie...</div>}

            {!loading && window && (
                <div>
                    <div>Start: {formatDateTime(window.start)}</div>
                    <div>Koniec: {formatDateTime(window.end)}</div>
                    <div>Średni % czystej energii: {window.percentage}%</div>
                </div>
            )}

            {!loading && !window && <div>Brak danych</div>}
        </div>
    );
}

export default ChargeWindow;
