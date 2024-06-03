import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MovieDetail() {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/movie/search/${imdbId}`);
        const data = await response.json();
        setMovie(data.result);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [imdbId]);

  if (!movie) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
          <div className="w-full md:w-1/3 h-96 bg-gray-300"></div>
          <div className="p-6 flex flex-col justify-between w-full">
            <div>
              <div className="h-10 bg-gray-300 mb-2 rounded shimmer"></div>
              <div className="h-6 bg-gray-300 mb-4 rounded shimmer"></div>
              <div className="h-6 bg-gray-300 mb-2 rounded shimmer"></div>
              <div className="h-6 bg-gray-300 mb-2 rounded shimmer"></div>
              <div className="h-6 bg-gray-300 mb-2 rounded shimmer"></div>
              <div className="h-6 bg-gray-300 mb-2 rounded shimmer"></div>
            </div>
            <div className="mt-6">
              <div className="h-10 bg-gray-300 rounded shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img 
          src={movie.Poster} 
          alt={movie.Title} 
          className="w-full md:w-1/3 h-auto object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
            <p className="text-gray-600 mb-4">{movie.Year}</p>
            <p className="text-gray-800 leading-relaxed mb-4">{movie.Plot}</p>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Details</h2>
              <p className="text-gray-700"><strong>Director:</strong> {movie.Director}</p>
              <p className="text-gray-700"><strong>Actors:</strong> {movie.Actors}</p>
              <p className="text-gray-700"><strong>Genre:</strong> {movie.Genre}</p>
              <p className="text-gray-700"><strong>Runtime:</strong> {movie.Runtime}</p>
              <p className="text-gray-700"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
              <p className="text-gray-700"><strong>Released:</strong> {movie.Released}</p>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => navigate('/home')} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
