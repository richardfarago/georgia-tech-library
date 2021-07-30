export const mock_connection = {
    transaction: jest.fn((cb) => {
        return cb({
            query: jest.fn(() => {
                return Promise.resolve(true);
            }),
        });
    }),
};
