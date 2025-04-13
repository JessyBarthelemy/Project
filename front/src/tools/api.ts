import { ValidationError } from "@/exceptions/ValidationError";
import { AxiosError } from "axios";

export const getErrorMessage = (e: Error, defaultMessage: string): string => {

    if (e instanceof ValidationError) {
        return e.message;
    } else if (e instanceof AxiosError) {
        return Array.isArray(e?.response?.data?.message) ? e?.response?.data?.message?.join('<br>') : e?.response?.data?.message;
    }

    return defaultMessage;
}