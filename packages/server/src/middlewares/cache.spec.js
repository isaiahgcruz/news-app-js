const memoryCache = require('memory-cache');
const cache = require('./cache');

jest.mock('memory-cache', () => {
  const memory = {};

  return {
    get: jest.fn().mockImplementation((key) => memory[key]),
    put: jest.fn().mockImplementation((key, body) => {
      memory[key] = body;
    }),
  };
});

it('saves cache', () => {
  const middleware = cache(10);

  const mockRequest = {
    url: 'test-key',
  };

  const mockResponse = {
    send: jest.fn(),
    statusCode: 200,
  };

  middleware(
    mockRequest,
    mockResponse,
    ((_, res) => () => {
      res.send('cache me');
    })(mockRequest, mockResponse),
  );

  expect(memoryCache.put).toHaveBeenCalledWith('test-key', 'cache me', 600000);
  expect(memoryCache.get('test-key')).toBe('cache me');
});

it('returns saved cache', () => {
  const middleware = cache(10);

  memoryCache.put('test-key2', 'saved-cache', 100000);

  const mockRequest = {
    url: 'test-key2',
  };

  const mockResponse = {
    send: jest.fn(),
    statusCode: 200,
  };

  middleware(mockRequest, mockResponse, () => {});

  expect(mockResponse.send).toHaveBeenCalledWith('saved-cache');
});

it('does not save cache on error status', () => {
  const middleware = cache(10);

  const mockRequest = {
    url: 'test-key3',
  };

  const mockResponse = {
    send: jest.fn(),
    statusCode: 500,
  };

  middleware(
    mockRequest,
    mockResponse,
    ((_, res) => () => {
      res.send('cache me');
    })(mockRequest, mockResponse),
  );

  expect(memoryCache.put).not.toHaveBeenCalledWith(
    'test-key3',
    'cache me',
    600000,
  );
  expect(memoryCache.get('test-key3')).not.toBe('cache me');
});
