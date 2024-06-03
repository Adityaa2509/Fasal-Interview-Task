import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AddtoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { listId } = useParams();
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      // Fetch search results only if search term is not empty
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if search term is empty
    }
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/movie/search?q=${searchTerm}`);
      setSearchResults(response.data.result);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error response
    }
  };

  const handleAddToList = async (movieId) => {
    try {
      // Make API call to add movie to the list
      await axios.put(`http://localhost:8080/api/v1/list/add/${listId}`, { movieId },{withCredentials:true});
      // Optionally show a success message or perform other actions
      console.log('Movie added to list successfully');
    } catch (error) {
      console.error('Error adding movie to list:', error);
      // Handle error response
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add to List</h2>
      <h2 className="text-xl font-semibold mb-4">Click ont the movie to Add</h2>
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          className="border border-gray-300 bg-base-200
          p-2 rounded-lg rounded-r-none outline-none h-12 w-96"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
           className="border bg-blue-500 w-20 text-white p-2 h-12 rounded-lg rounded-l-none hover:bg-blue-600"
          onClick={() => setSearchTerm('')}
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {searchResults && searchResults.map((movie) => (
          <div
            key={movie.imdbID}
            className="w-60 m-4 p-4 border border-gray-300 rounded shadow transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleAddToList(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} className="w-full h-60 object-cover rounded" />
            <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
            <p className="text-gray-500">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddtoList;
