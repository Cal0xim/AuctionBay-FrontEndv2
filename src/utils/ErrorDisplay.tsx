import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext<any>(null);

export function ErrorProvider({ children }: any) {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export const useError = () => useContext(ErrorContext);