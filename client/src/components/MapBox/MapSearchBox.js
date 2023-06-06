import React, { useState } from 'react'
import mapboxAPI from './MapBoxApi';

function MapSearchBox({setPlace}) {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };
  setPlace(searchValue)
  const fetchSuggestions = async (value) => {
    try {
        const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`;
        const response = await mapboxAPI.get(url);
      const suggestions = response.data.features.map((feature) => feature.place_name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  

    const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]);
  };
   
    return (
        <div>
            <fieldset className="username">
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Location"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    {suggestions.length > 0 && (
                        <div className="suggestion-box">
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {suggestion.substring(0, 20)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </fieldset>
        </div>
    )
}

export default MapSearchBox