import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SkeletonLoader from './SkeletonLoader'; // Import the SkeletonLoader component


function Shared() {
  const { sharableLink } = useParams();
  const [listDetails, setListDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [show,setShow] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log(sharableLink)
        const response = await axios.get(`http://localhost:8080/api/v1/movie/shared/${sharableLink}`,{withCredentials:true});
        console.log(response.data)
        console.log(response.data)
        if(response.data.status == 200)
        {setListDetails(response.data.listDetails)
          setMovieDetails(response.data.result);}
          console.log(movieDetails)
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching list details:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchMovieDetails();
  }, [sharableLink]);
  

  

  return (
    <div className="container mx-auto">
   
      {loading ? ( // Display skeleton loader while loading
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <SkeletonLoader />
            </div>
          ))} 
        </div>
      ) : (<>
       <div className="my-10 text-center">
            <h1 className="text-6xl font-bold text-white">{listDetails.listName}</h1>
            <p className="text-lg text-gray-300">{listDetails.listDescription}</p>
            <p className="text-2xl text-gray-300">by {listDetails.Owner}</p>
          </div>
        <div className="grid grid-cols-4 gap-2">
          {
            movieDetails.length==0 && 
            <div className='text-center text-4xl'>Nothing in the List....</div>
          }  
          {movieDetails && movieDetails.map((movie, index) => ( 
            <div key={movie.imdbId}
             className="w-60 m-4 p-4 border border-gray-300 rounded shadow transition-transform transform hover:scale-105 cursor-pointer">
              {movie ? (
                <>
                  <img src={movie.Poster} alt={movie.Title} className="w-full h-60 object-cover rounded" 
                   onClick={() => navigate(`/movie/${movie.imdbID}`)}/>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{movie.Title}</h3>
                    
                   
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

export default Shared;
