import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function CreateList() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true); // Default to public
  const navigate = useNavigate();
  const [error,seterror] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/list/create', {
        name,
        description,
        isPublic
      },{withCredentials:true});
     // Handle success response as needed
        if(response.data.status == 200)
        navigate(`/addto/${response.data.list._id}`);
      else seterror(response.data.msg)
       // Navigate to the add to list page
    } catch (error) {
      console.error('Error creating list:', error);
      // Handle error response
    }
  };
  useEffect(()=>{
    if (error) {
      toast.error(error);
    }
  },[error])
  return (
  
    <div className="container mx-auto">
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h2 className="text-2xl font-semibold mb-4">Create List</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="bg-gray-600 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-white block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="bg-gray-600 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Visibility</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              <span className="ml-2 text-gray-700">Public</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />
              <span className="ml-2 text-gray-700">Private</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create List
        </button>
      </form>
    </div>
  );
}

export default CreateList;
