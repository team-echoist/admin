import { PropsWithChildren, createContext, useContext, useState } from "react";

import ErrorFallback from "../ErrorFallback";

type APIErrorContextType = {
  error: string | null;
  setAPIError: (errorMessage: string) => void;
  clearAPIError: () => void;
};

const APIErrorContext = createContext<APIErrorContextType | undefined>(
  undefined
);

export const APIErrorProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState<string | null>(null);

  const setAPIError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const clearAPIError = () => {
    setError(null);
  };

  return (
    <APIErrorContext.Provider value={{ error, setAPIError, clearAPIError }}>
      {error ? <ErrorFallback message={error} /> : children}
    </APIErrorContext.Provider>
  );
};

export const useAPIError = () => {
  const context = useContext(APIErrorContext);
  if (!context) {
    throw new Error("useAPIError must be used within an APIErrorProvider");
  }
  return context;
};
