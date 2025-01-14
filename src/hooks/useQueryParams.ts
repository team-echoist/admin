import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const addKeyValue = (key: string, value: string) => {
    searchParams.append(key, value);
    return searchParams.toString();
  };
  const replaceValue = (key: string, value: string) => {
    searchParams.set(key, value);
    return searchParams.toString();
  };

  const removeKeyValue = (key: string, value: string) => {
    const values = searchParams.getAll(key);
    searchParams.delete(key);

    values.forEach((val) => {
      if (val !== value) {
        searchParams.append(key, val);
      }
    });

    return searchParams.toString();
  };

  const removeAllValues = (key: string) => {
    searchParams.delete(key);

    return searchParams.toString();
  };

  const hasValue = (key: string) => {
    return searchParams.has(key);
  };

  const getValue = (key: string) => searchParams.get(key);
  const getAllValue = (key: string) => searchParams.getAll(key);

  const hasKeyValueSet = (key: string, value: string) => {
    const values = getAllValue(key);
    return values.includes(value);
  };

  return {
    getValue,
    getAllValue,
    addKeyValue,
    replaceValue,
    removeKeyValue,
    removeAllValues,
    hasValue,
    hasKeyValueSet,
  };
};

export default useQueryParams;
