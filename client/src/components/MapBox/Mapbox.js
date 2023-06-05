import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpamFzMDkiLCJhIjoiY2xpaXUyZHQzMDFzeDNlcGEwbHd6ejJmOCJ9.TZzIUmMeUTVSKfdqqSWgWg';

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchText}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${mapboxgl.accessToken}`,
          },
        }
      );

      const data = await response.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={fetchSuggestions}>Search</button>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
