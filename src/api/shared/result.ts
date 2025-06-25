export type TResult<T, E = Error> =
    | { success: true; value: T }
    | { success: false; error: E };

function success<T>(value: T): TResult<T> {
    return { success: true, value };
}

function error<E = Error>(error: E): TResult<never, E> {
    return { success: false, error: error };
}

const Result = {
    success,
    error
}

export default Result;