export interface StudentInput {
    name: string;
    tamil: number;
    english: number;
    maths: number;
    science: number;
    social: number;
}

export interface Student extends StudentInput {
    id: string | number;
    sno?: number;
    total: number;
    percentage: number;
    result: string;
}
