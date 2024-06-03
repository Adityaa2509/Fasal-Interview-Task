import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the SkeletonLoader component
import AddtoList from './AddtoList';
import SearchOption from '../components/SearchOption';

function MyList() {
  const { listId } = useParams();
  const [listDetails, setListDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [show,setShow] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/api/v1/list/${listId}`,{withCredentials:true});
        console.log(response.data)
        console.log(response.data.list.sharableLink)
        setListDetails(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching list details:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchListDetails();
  }, [listId]);
  const handleDeleteList = async () => {
    try {
      const resp = await axios.delete(`http://localhost:8080/api/v1/list/${listId}`, { withCredentials: true });
      // Navigate to home page upon successful deletion
      console.log(resp.data)
      if(resp.data.status == 200)
      navigate('/home');
    
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/list/${listId}/delete/${movieId}`);
      // Remove the deleted movie from the list details
      setListDetails(prevState => ({
        ...prevState,
        movies: prevState.movies.filter(movie => movie._id !== movieId)
      }));
    } catch (error) {
      console.error('Error deleting movie from list:', error);
    }
  };

  useEffect(() => {
    if (listDetails) {
        setLoading(true)
      const fetchMovieDetails = async () => {
        console.log(listDetails)
        const updatedMovies = [];
        console.log(listDetails.list.movies)
        for (const movie of listDetails.list.movies) {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/movie/search/${movie}`,{withCredentials:true});
            console.log(response.data)

            if(response.data.status == 200)
            updatedMovies.push(response.data.result);
          } catch (error) {
            console.error(`Error fetching details for movie ${movie._id}:`, error);
            updatedMovies.push(null);
          }
        }
        console.log(updatedMovies)
        setMovieDetails(prevState => ({
          ...prevState,
          movies: updatedMovies
        }));
        setLoading(false)
        if(updatedMovies.length == 0){
            setShow(true)
        }
      };
      fetchMovieDetails();
    }
  }, [listDetails]);

  return (
    <div className="container mx-auto">
    <SearchOption setMoviesAdded={setMovieDetails} setlist={setListDetails}/>
      {loading ? ( // Display skeleton loader while loading
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <SkeletonLoader />
            </div>
          ))} 
        </div>
      ) : (<>
      <div className='mb-20'>
        <h2 className="text-white text-6xl  mt-6 font-extrabold mb-3 text-center">{listDetails.list.name}</h2>
        <div className='text-center text-xl font-medium mb-6 '>{listDetails.list.description}</div>
        <div>{listDetails.list.sharableLink&&<div>
          <div>
            
            {   <div className="mt-2">
                    <p>Shareable Link: <a href={`http://localhost:5173/shared/${listDetails.list.sharableLink}`} target="_blank" rel="noopener noreferrer"  className="text-blue-500">url</a></p>
                </div>
            }
        </div>
        </div>
        }</div>
        <div className="flex justify-end mt-[-90px]">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDeleteList}
            >
              Delete List
            </button>
          </div>
          </div>
        <div className="grid grid-cols-4 gap-2">
            
          {movieDetails && movieDetails.movies.map((movie, index) => ( 
            <div key={movie.imdbId}
             className="w-60 m-4 p-4 border border-gray-300 rounded shadow transition-transform transform hover:scale-105 cursor-pointer">
              {movie ? (
                <>
                  <img src={movie.Poster} alt={movie.Title} className="w-full h-60 object-cover rounded" 
                   onClick={() => navigate(`/movie/${movie.imdbID}`)}/>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{movie.Title}</h3>
                    
                    <button
                      className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
                      onClick={() => handleDeleteMovie(movie.imdbId)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <SkeletonLoader />
              )}
            </div>
          ))}
        </div>
        </>
      )}
      <div>
        {
            show?<div className='text-center'>Nothing Added...Add some movies </div>:<></>
        }
      </div>
    </div>
  );
}

export default MyList;
