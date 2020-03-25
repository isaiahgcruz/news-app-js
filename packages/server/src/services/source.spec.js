const sourceService = require('./source');
const api = require('../utils/api');

jest.mock('../utils/api', () => ({
  get: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => 42),
}));

describe('getSources', () => {
  it('success', async () => {
    const sources = [1, 2, 3, 4, 5];
    api.get.mockImplementation(() => Promise.resolve({ data: sources }));

    const data = await sourceService.getSources();

    expect(data).toEqual(sources);
  });

  it('error', async () => {
    api.get.mockImplementation(() => Promise.reject(new Error('error')));

    expect(sourceService.getSources()).rejects.toThrow('error');
  });
});

describe('getSourceById', () => {
  it('success', async () => {
    api.get.mockImplementation((_, { params }) =>
      Promise.resolve({ data: { ...params, articles: [{ name: 'test' }] } }),
    );

    const data = await sourceService.getSourceById(1, 2, 3);

    expect(data).toEqual({
      id: 1,
      sources: 1,
      page: 2,
      pageSize: 3,
      articles: [{ id: 42, name: 'test' }],
    });
  });

  it('error', async () => {
    api.get.mockImplementation(() => Promise.reject(new Error('error')));

    expect(sourceService.getSourceById(1, 2, 3)).rejects.toThrow('error');
  });
});
