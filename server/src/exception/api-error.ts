export default class ApiError extends Error {
    constructor(public status: number, public message: string, public errors :string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(): object {
            return new ApiError(401, "Don't auth");
    }
    static BadRequest(message: string, errors: string[] = []):
        object {
        return new ApiError(400, message, errors)
    }
}