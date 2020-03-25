const sourceController = require('./source');

const mockResponse = {
  send: jest.fn(),
};
const mockRequest = {};

describe('index', () => {
  it('success', async () => {
    await sourceController.index(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});

describe('show', () => {
  it('success', async () => {
    await sourceController.show(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});
