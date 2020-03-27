import { createContext, useContext } from 'react';

export const NewsContext = createContext();

const useNewsContext = () => useContext(NewsContext);

export default useNewsContext;
