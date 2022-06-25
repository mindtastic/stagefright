import { applyIfExists } from "./helpers";

export const stringifyBody = (request) => ({
    ...request,
    body: applyIfExists(request.body, JSON.stringify),
});

export default stringifyBody;