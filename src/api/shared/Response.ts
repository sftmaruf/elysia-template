import { TResult } from "./result"
import { HTTPHeaders, StatusMap, t } from "elysia";
import { ElysiaCookie } from "elysia/dist/cookies";

interface Set {
    headers: HTTPHeaders;
    status?: number | keyof StatusMap;
    redirect?: string;
    cookie?: Record<string, ElysiaCookie>;
}

export const TResponse = (TResultSchema: any) =>
    t.Object({
        data: t.ReadonlyOptional(TResultSchema),
        message: t.Optional(t.String())
    });

export const ActionResponse = <T>(set: Set, result: TResult<T>, code?: number) => {
    if(result.success) {
        set.status = code ?? 200;
        return { data: result.value }
    }

    set.status = code ?? 500;
    return { message: result.error.message }
}