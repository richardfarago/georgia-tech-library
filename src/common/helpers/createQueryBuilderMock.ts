export const createQueryBuilder: any = {
    select: jest.fn(() => createQueryBuilder),
    addSelect: jest.fn(() => createQueryBuilder),
    leftJoin: jest.fn(() => createQueryBuilder),
    groupBy: jest.fn(() => createQueryBuilder),
    where: jest.fn(() => createQueryBuilder),
    getRawOne: jest.fn(() => Promise.resolve(true)),
    getRawMany: jest.fn(() => Promise.resolve(true)),
}