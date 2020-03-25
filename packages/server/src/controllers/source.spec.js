const sourceController = require('./source');
const sourceService = require('../services/source');

jest.mock('../services/source', () => ({
  getSources: jest.fn(),
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
  const mockRequest = {};
  it('success', async () => {
    await sourceController.show(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});
