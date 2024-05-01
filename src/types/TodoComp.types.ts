export type Todo = {
    userId?: number;
    id: string;
    title: string;
    completed: boolean;
}

export type SetFiltered = React.Dispatch<
    React.SetStateAction<{
        todo: Todo[]
    }>
>;

export type Data = {
    loading: boolean;
    todo: Todo[]
    error: string;
};

export type TodoCompProps = {
    filtered: {
        todo: Todo[]
    };
    data: Data;
    setFiltered: SetFiltered;
    setData: React.Dispatch<
        React.SetStateAction<{
            loading: boolean;
            todo: Todo[];
            error: string;
        }>
    >;
};