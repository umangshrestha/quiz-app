export interface Exam {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    allowReview: boolean;
    isNegativeMarking: boolean;
}