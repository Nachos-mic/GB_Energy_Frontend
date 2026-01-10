export interface GenerationMixItem {
    fuel: string;
    perc: number;
}

export interface EnergyInterval {
    from: string;
    to: string;
    generationmix: GenerationMixItem[];
}

export interface EnergyAPIResponse {
    data: EnergyInterval[];
}

export interface DayData {
    date: string;
    averages: { [fuel: string]: number };
    cleanEnergyPercent: number;
}
