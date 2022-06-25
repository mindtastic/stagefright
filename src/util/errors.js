export const malformedResponse = (err) => ({
    type: 'error',
    message: 'malformed response',
    err: err.toString(),
});

export default {
    malformedResponse,
};