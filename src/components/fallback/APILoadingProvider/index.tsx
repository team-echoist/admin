import { PropsWithChildren, createContext, useContext, useState } from "react";

import LoadingFallback from "../LoadingFallback";

type APILoadingContextType = {
  loading: boolean;
  setAPILoading: () => void;
  clearAPILoading: () => void;
};

const APILoadingContext = createContext<APILoadingContextType | undefined>(
  undefined
);

export default function APILoadingProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  const setAPILoading = () => {
    setLoading(true);
  };

  const clearAPILoading = () => {
    setLoading(false);
  };

  return (
    <APILoadingContext.Provider
      value={{ loading, setAPILoading, clearAPILoading }}
    >
      {loading ? <LoadingFallback /> : children}
    </APILoadingContext.Provider>
  );
}

export const useAPILoading = () => {
  const context = useContext(APILoadingContext);
  if (!context) {
    throw new Error("useAPILoading must be used within an APILoadingProvider");
  }
  return context;
};
