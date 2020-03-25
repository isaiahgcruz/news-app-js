const sourceService = require('./source');

describe('getSources', () => {
  it('success', async () => {
    const data = await sourceService.getSources();
    expect(data).toEqual([]);
  });
});

describe('getArticles', () => {
  it('success', async () => {
    const data = await sourceService.getArticles(1);
    expect(data).toEqual([]);
  });
});
