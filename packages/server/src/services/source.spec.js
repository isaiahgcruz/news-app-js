const sourceService = require('./source');
const api = require('../utils/api');

jest.mock('../utils/api', () => ({
  get: jest.fn(),
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

describe('getArticles', () => {
  it('success', async () => {
    const data = await sourceService.getArticles(1);
    expect(data).toEqual([]);
  });
});
