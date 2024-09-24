export interface IExercise {
    id: string,
    name: string,
    description: string,
    urlVideoExample: string,
    video: File | null,
    benefits: string,
    tags: string
}
