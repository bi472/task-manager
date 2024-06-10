export enum TaskStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export const TaskStatusContent: { [key in keyof typeof TaskStatus]: string } = {
    IN_PROGRESS: 'выполняется',
    COMPLETED: 'выполнено'
};
