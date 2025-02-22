import React, {useState} from 'react';

const SearchBar = (props) =>{
    //Taking the input from the search bar and setting it.
    const [search, setSearch] = useState('');

    //Handle change in the input field
    const handleSearchChange = (e) =>{
        e.preventDefault();
        setSearch(e.target.value);
        console.log(search);
    };
    
    //Handle the submission of the search form
    const handleSubmit = () => {

    };

    return (
        <div className="SearchBar">
            <input type="search" placeholder="Enter a search.." onChange={handleSearchChange} />
            <button className="SearchButton" onClick={search}>
            SEARCH
            </button>
        </div>
    )
};

export default SearchBar;