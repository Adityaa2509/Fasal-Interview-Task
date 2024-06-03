const axios = require('axios');
const List = require('../models/List');
const User = require('../models/User');
const searchByQuery = async(req,resp)=>{
    try{
    const {q} = req.query;
    const data = await axios(`http://www.omdbapi.com/?s=${q}&apikey=fe15333a`);
    if (data.status !== 200) {
        return resp.status(500).json({
            msg: "Failed to fetch data from OMDB API",
            status: 500,
            success: false
        });
    }


    if(data.data.Search === undefined){
        return resp.json({
            status:401,
            success:false,
            msg:"No Result Found"
        })

    }
    const ans = data.data.Search

        return resp.json({
            msg:"Data fetched successfully",
            status:200,
            success:true,
            result:ans
        })}catch(err){
            return resp.json({
                msg:"Internal Server Error",
                status:500,
                success:false,
                error:err.message
            })  
        }
    }

const searchById = async(req,resp)=>{
    try{
        const {imdbId} = req.params;
        console.log(imdbId)
        const data = await axios(`http://www.omdbapi.com/?i=${imdbId}&apikey=fe15333a`);
        console.log(data)
        if (data.status !== 200) {
            return resp.status(500).json({
                msg: "Failed to fetch data from OMDB API",
                status: 500,
                success: false
            });
        }
    
    
        if(data.data.Response === 'False'){
            return resp.json({
                status:401,
                success:false,
                msg:"No Result Found"
            })
    
        }
        const ans = data.data
    
            return resp.json({
                msg:"Data fetched successfully",
                status:200,
                success:true,
                result:ans
            })}catch(err){
                return resp.json({
                    msg:"Internal Server Error",
                    status:500,
                    success:false,
                    error:err.message
                })  
            }
        }


    const sharableLink = async(req,resp)=>{
        console.log(req.params)
        try{
            
            const {sharableLink} = req.params;
            console.log(sharableLink);
            const list = await List.findOne({sharableLink:sharableLink});
            console.log(list);
            
           const movies = list.movies;
            console.log(movies)
            const movieDetails = [];
            for (const movie of movies) {
                const resp = await axios(`http://www.omdbapi.com/?i=${movie}&apikey=fe15333a`);
                console.log(resp.data);
                movieDetails.push(resp.data)
            }
            const user = await User.findById(list.owner);
            const listDetails = {
                Owner:user.username,
                listName:list.name,
                listDescription:list.description
            }
        console.log(movieDetails)
            return resp.json({
                success:true,
                status:200,
                msg:"Complete List Fetched Successfully",
                result : movieDetails,
                listDetails
            })
            
        }catch(err){
            console.log(err);
            resp.json({
                status:500,
                msg:"Internal Server Error",
                error:err.message,
                success:false
            })
        }
    }


module.exports = {searchById,searchByQuery,sharableLink}
