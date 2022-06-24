export const stringifyBody = (request) => ({
    ...request, 
    body: JSON.stringify(request.body),
});

export default stringifyBody;