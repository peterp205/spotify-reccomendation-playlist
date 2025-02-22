import React, {useState} from 'react';

function searchBar = (props) =>{
    //Taking the input from the search bar and setting it.
    const [search, setSearch] = useState('');

    //Handle change in the input field
    const handleSearchChange(e) =>{
        preventDefault();
        setSearch(e.target.value);
    };
    
    //Handle the submission of the search form
    const handleSubmit() => {

    };

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song Title" onChange={handleSearchChange} />
            <button className="SearchButton" onClick={search}>
            SEARCH
            </button>
        </div>
    )
};

export default searchBar;