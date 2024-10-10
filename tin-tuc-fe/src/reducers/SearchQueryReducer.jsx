const SearchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_QUERY':
            const updatedSearchQuery = action.payload.newQuery;
            return { ...state, searchQuery: updatedSearchQuery };
        default:
            return state;
    }
};

export default SearchQueryReducer;