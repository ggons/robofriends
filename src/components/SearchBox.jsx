import React from 'react';

const SearchBox = ({ onChange }) => {console.log('search box');
  return ( 
    <div className="pa2">
      <input
        aria-label="Search Robots"
        className="pa3 ba b--green bg-lightest-blue"
        type="search" 
        placeholder="search robots" 
        onChange={onChange}
      />
    </div> 
  );
}
 
export default SearchBox;