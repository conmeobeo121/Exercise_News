import React, { createContext, useReducer } from 'react';
import SearchQueryReducer from '../reducers/SearchQueryReducer.jsx';

const SearchQueryContext = createContext();

const initialState = {
    searchQuery: '',
};

export const SearchQueryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchQueryReducer, initialState);

    const changeSearchQuery = (query) => {
        dispatch({ type: 'CHANGE_SEARCH_QUERY', payload: { newQuery: query } })
    };

    return (
        <SearchQueryContext.Provider
            value={{
                searchQuery: state.searchQuery,
                changeSearchQuery,
            }}
        >
            {children}
        </SearchQueryContext.Provider>
    );
};

export default SearchQueryContext;