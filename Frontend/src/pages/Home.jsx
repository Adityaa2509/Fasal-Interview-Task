// Home.js
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/list',{
        method: 'GET',
      credentials: 'include' // Include cookies in the request
      });
      const data = await response.json();
      console.log(data)
      if(data.status==200)
      setMovies(data.List); // Assuming the movies list is in the `movies` field of the response
    } catch (error) {
      setError('An error occurred while fetching movie data.');
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts
  }, []);


  const handleSearch = async () => {
    // Reset error state and set loading state to true
    setError('');
    setLoading(true);

    try {
      // Call your backend API with the search term
      const response = await fetch(`http://localhost:8080/api/v1/movie/search?q=${searchTerm}`);
      const data = await response.json();

      if (data.status !== 200) {
        setError(data.msg);
      } else {
        console.log(data.result)
        setResults(data.result);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
    }

    setLoading(false); // Set loading state to false after API call
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex justify-center items-center mt-10 mb-14">
        <input
          type="text"
          className="border border-gray-300 bg-base-200
          p-2 rounded-lg rounded-r-none outline-none h-12 w-96"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => {
            setError('');
            setSearchTerm(e.target.value);
          }}
        />
        <button
          className="border bg-blue-500 w-20 text-white p-2 h-12 rounded-lg rounded-l-none hover:bg-blue-600"
          onClick={handleSearch}
          disabled={loading} // Disable button when loading
        >
          Search
        </button>
      </div>


      <div className="mt-8">
  <h2 className="text-4xl font-extrabold mb-6 text-center text-white">My Playlists</h2>
  <div className="grid grid-cols-3 gap-10 mx-6">
    {movies.map((movie) => (
      <div
        key={movie._id}
        className="relative overflow-hidden rounded-md shadow-md cursor-pointer bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => navigate(`/list/${movie._id}`)}
      >
        <div className="w-full h-40 flex  justify-center">
          <p className="text-4xl font-extrabold
           text-gray-800">{movie.name}</p>
        </div>
        <div className="absolute inset-0 p-4 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-center justify-center">
          <p className="text-white text-center">{movie.description}</p>
        </div>
        <div className={`absolute bottom-0 right-0 p-2 text-white text-xs uppercase rounded-lg rounded-r-none rounded-b-none ${movie.isPublic ? 'bg-green-500' : 'bg-red-500'}`}>
          {movie.isPublic ? 'Public' : 'Private'}
        </div>
      </div>
    ))}
  </div>
</div>


      <div className="flex flex-wrap justify-center mt-8">
        {loading ? (
          // Shimmer effect for loading state
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-60 m-4 p-4 border border-gray-300 rounded animate-pulse">
              <div className="bg-gray-200 h-80 w-full rounded"></div>
              <div className="h-6 bg-gray-200 mt-2 rounded"></div>
              <div className="h-6 bg-gray-200 mt-2 rounded"></div>
              <div className="h-6 bg-gray-200 mt-2 rounded"></div>
            </div>
          ))
        ) : (
          // Display search results
          results.map((result) => (
            <div
              key={result.imdbID}
              className="w-60 m-4 p-4 border border-gray-300 rounded shadow transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/movie/${result.imdbID}`)}
            >
              <img src={result.Poster} alt={result.Title} className="w-full h-80 object-cover rounded" />
              <h3 className="mt-2 text-lg font-semibold">{result.Title}</h3>
              <p className="text-gray-500">{result.Year}</p>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
