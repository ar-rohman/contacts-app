import React from 'react';
import PropsTypes from 'prop-types';

function SearchBar({keyword, keywordChange}) {
    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Cari berdasarkan nama"
            value={keyword}
            onChange={(event) => keywordChange(event.target.value)} />
    )
}

SearchBar.propsTypes = {
    keyword: PropsTypes.string.isRequired,
    keywordChange: PropsTypes.func.isRequired
}

export default SearchBar;
