import {useState,useContext,createContext} from "react";

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [Search, setSearch] = useState({
      keyword: null,
      results: [],
    });
    return (
      <SearchContext.Provider value={[Search, setSearch]}>
        {children}
      </SearchContext.Provider>
    );
  };

//custom hook
const useSearch = () => {
    return useContext(SearchContext)
}

export { useSearch , SearchProvider };