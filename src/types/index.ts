export interface Contestant {
    id: number;
    name: string;
    email: string;
    score: number;
}

export interface Winner {
    id: number;
    name: string;
    score: number;
    contestId: number;
}

export interface Contest {
    id: number;
    title: string;
    description: string;
    rules: string;
    eligibilityCriteria: string;
    startDate: string;
    endDate: string;
}