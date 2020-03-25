const sourceController = require('./source');
const sourceService = require('../services/source');

jest.mock('../services/source', () => ({
  getSources: jest.fn(),
  getSourceById: jest.fn(),
}));

const mockResponse = {
  send: jest.fn(),
  status: jest.fn().mockImplementation(() => mockResponse),
  json: jest.fn(),
};

describe('index', () => {
  const mockRequest = {};

  it('success', async () => {
    const sources = [1, 2, 3, 4, 5];
    sourceService.getSources.mockImplementation(() => sources);

    await sourceController.index(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith(sources);
  });

  it('error', async () => {
    sourceService.getSources.mockImplementation(() =>
      Promise.reject(new Error('error')),
    );

    await sourceController.index(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 500,
      message: 'error',
    });
  });
});

describe('show', () => {
  const showMockRequest = {
    params: {
      id: 'abc-news',
    },
    query: {
      page: 1,
      pageSize: 3,
    },
  };

  it('success', async () => {
    const source = { id: 1, articles: [] };
    sourceService.getSourceById.mockImplementation(() => source);
    await sourceController.show(showMockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith(source);
  });

  it('error', async () => {
    sourceService.getSourceById.mockImplementation(() =>
      Promise.reject(new Error('error')),
    );

    await sourceController.show(showMockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 500,
      message: 'error',
    });
  });
});
