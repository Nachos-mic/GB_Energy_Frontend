export interface DayData {
    date: string;
    averageFuelUsage: Record<string, number>;
    totalCleanEnergyPercentage: number;
}
export type EnergyDaysResponse = DayData[];
