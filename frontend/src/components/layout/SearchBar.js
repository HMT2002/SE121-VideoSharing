import React from "react";

import "../../styles/SearchBar.css";

const SearchBar = () => {
    return (
        <React.Fragment>
            <div className="search-bar">
                <input placeholder="Search" />
            </div>
        </React.Fragment>
    )
}

export default SearchBar;