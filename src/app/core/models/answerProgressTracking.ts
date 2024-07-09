export interface AnswerProgressTracking {
    id: number;
    testId: number;
    studentId: number;
    answerText: string;
    answerCount: number;
    dateModified: Date;
}