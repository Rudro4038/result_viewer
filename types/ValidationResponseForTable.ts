export interface ValidationResponseForTableItem {
    id: number;
    attribute: string;
    header: string;
    isTaken: boolean;
}

export type ValidationResponseForTable = ValidationResponseForTableItem[];
