import { useState } from "react";
import axios from "axios";
import type { BestWindow } from "../types/window.types";
import {API_URL} from "../src/config/api.ts";

function ChargeWindow() {
    const [hours, setHours] = useState("");
    const [window, setWindow] = useState<BestWindow | null>(null);
    const [loading, setLoading] = useState(false);

    const formatDateTime = (iso: string) => {
        const d = new Date(iso);

        return d.toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/London" });
    };

    const fetchWindowData = async () => {
        try {
            setLoading(true);

            const hours_num = Number(hours);
            const res = await axios.get<BestWindow>(`${API_URL}/api/v1/energyinfo/charge-window/${hours_num}`);
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
                    onChange={(e) => setHours(e.target.value)}
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
