const axios = require('axios')
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


module.exports = {searchById,searchByQuery}
