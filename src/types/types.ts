export type Todo = {
    userId?: number;
    id: string;
    title: string;
    completed: boolean;
}
export type TodoCompProps = {
    data: {
        loading: boolean;
        todo: Todo[]
        error: string;
    };
    setFiltered: React.Dispatch<
        React.SetStateAction<{
            todo: Todo[]
        }>
    >;
    setData: React.Dispatch<
        React.SetStateAction<{
            loading: boolean;
            todo: Todo[];
            error: string;
        }>
    >;
};