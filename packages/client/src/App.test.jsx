import React from 'react';
import moxios from 'moxios';
import { render, waitForDomChange, fireEvent } from '@testing-library/react';
import App from './App';
import api from './utils/api';

describe('success getSources', () => {
  const mockSources = Array.from({ length: 3 }, (_, index) => ({
    name: `item ${index + 1}`,
    id: index + 1,
  }));

  const mockArticles = Array.from({ length: 10 }, (_, index) => ({
    name: `item ${index + 1}`,
    id: index + 1,
  }));

  beforeEach(() => {
    moxios.install(api);
    moxios.stubRequest(new RegExp(/\/sources\//), {
      status: 200,
      response: {
        articles: mockArticles,
        totalResult: 15,
      },
    });
    moxios.stubRequest(new RegExp(/\/sources/), {
      status: 200,
      response: {
        sources: mockSources,
      },
    });
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  // SHOULD BE BROKEN DOWN TO MULTIPLE
  it('should test fully', async () => {
    const { getByTestId, getByText } = render(<App />);

    await waitForDomChange();

    expect(getByTestId('source-list-container').children).toHaveLength(
      mockSources.length,
    );

    // clicks news source 'item 1'
    fireEvent.click(getByText('item 1'));

    await waitForDomChange();

    expect(getByTestId('articles-container').children).toHaveLength(10);

    // pagination
    const paginationNext = getByTestId('pagination-next');
    const paginationPrevious = getByTestId('pagination-previous');

    expect(paginationPrevious.disabled).toBeTruthy();
    expect(paginationNext.disabled).toBeFalsy();

    fireEvent.click(paginationNext);

    await waitForDomChange();

    expect(paginationPrevious.disabled).toBeFalsy();
    expect(paginationNext.disabled).toBeTruthy();

    fireEvent.click(paginationPrevious);

    await waitForDomChange();

    expect(paginationPrevious.disabled).toBeTruthy();
    expect(paginationNext.disabled).toBeFalsy();
  });
});
