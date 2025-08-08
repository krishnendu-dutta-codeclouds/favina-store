import { createContext, useContext } from 'react';

export const ImagePathContext = createContext('/');

export const useImageBasePath = () => useContext(ImagePathContext);
