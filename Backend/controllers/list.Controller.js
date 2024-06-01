const List = require("../models/List");

//get all list of the user 
const getAllLists = async(req,resp)=>{
    try{
        const user = req.user;
        const alllist = await List.find({owner:user.id});
        console.log(alllist);
        if(alllist.length == 0){
            return resp.json({
                msg:"No List Found",
                success:false,
                status:400
            })
        }
        return resp.json({
            status:200,
            msg:"List Get Successfully",
            status:200,
            List:alllist
        })

    }catch(err){
        console.log(err);
        return resp.json({
            status:500,
            msg:"Internal Server Error",
            error:err.message,
            success:false
        })
    }
    
}




//create a new list
const createList = async(req,resp)=>{
    try{

        const {name,description,isPublic} = req.body;
        const user = req.user
        if(!name || name === "")
            return resp.json({
                status:401,
                msg:"Enter Name of List",
                success:false,
            })
        if(!description || description === "")
            return resp.json({
                status:401,
                msg:"Enter Description of List",
                success:false,
            })
        
        const list = await List.findOne({name,owner:user.id});
        console.log(list)
        if(list && list.owner == user.id){
            return resp.json({
                status:400,
                msg:"List already exists",
                success:false,
            })
        }
        const nlist = await List.create({
                            name,
                            description,
                            isPublic,
                            owner:user.id
                      })    
                      
        return resp.json({
            status:200,
            msg:"List Created Successfully",
            success:true,
            list:nlist
        })              

    }catch(err){
        console.log(err.message);
        return resp.json({
            status:500,
            success:false,
            msg:"Internal Server Error",
            error:err.message
        })
    }
}






//get specific list detail
const getList = async(req,resp)=>{
    try{
        const {listId} = req.params;
        const list = await List.findById(listId)
        if(!list){
            return resp.json({
                status:401,
                success:false,
                msg:"Such list do not present"
            })
        }
        const user = req.user;
        const owner = list.owner;
        console.log(owner)
        console.log(user.id)
        if((!user ||owner != user.id) && !list.isPublic){
            return resp.json({
                status:402,
                success:false,
                msg:"List is Private you do not have access to visit this List"
            })
        }
        return resp.json({
            msg:"List Fetched Successfully",
            status:200,
            success:true,
            list
        })

    }catch(err){
        console.log(err.message);
        return resp.json({
            status:500,
            success:false,
            msg:err.message,
            error:err
        })
    }

}




//add movie to the particular list
const updateAddList = async(req,resp)=>{
    try{
        const{listId} = req.params;
        const {movieId} = req.body;
        const user = req.user?req.user:null;

        const list = await List.findById(listId);
        if(!list){
            return resp.status({
                msg:"List do not exist",
                status:401,
                success:false
            })
        }
        console.log(movieId)
        console.log(user.id)
        console.log(list.owner)
        if(!user || user.id!=list.owner){
            console.log("hello ji");
            return resp.json({
                msg:"Yu are not allowed to edit this list",
                status:402,
                success:false
            })
        }
        console.log(movieId+"hello")
        console.log(typeof(movieId))
        if (!movieId || typeof movieId !== 'string') {
            return resp.json({
              status: 400,
              success: false,
              msg: "Movie ID should be provided and must be a string",
            });
          }

          if (!list.movies.includes(movieId)) {
            list.movies.push(movieId);
          }
          await list.save();
          return resp.json({
            success: true,
            status: 200,
            msg: "Movie added to list successfully",
            list
          });
    }catch(err){
        console.log(err.message);
        return resp.json({
            status:500,
            success:false,
            msg:err.message,
            error:err
        })
    }
}




//delete movie from the particular list
const updateRemoveList = async(req,resp)=>{
    try{
        const{listId} = req.params;
        const {movieId} = req.body;
        const user = req.user?req.user:null;

        const list = await List.findById(listId);
        if(!list){
            return resp.status({
                msg:"List do not exist",
                status:401,
                success:false
            })
        }
        console.log(movieId)
        console.log(user.id)
        console.log(list.owner)
        if(!user || user.id!=list.owner){
            console.log("hello ji");
            return resp.json({
                msg:"Yu are not allowed to edit this list",
                status:402,
                success:false
            })
        }
        console.log(movieId+"hello")
        console.log(typeof(movieId))
        if (!movieId || typeof movieId !== 'string') {
            return resp.json({
              status: 400,
              success: false,
              msg: "Movie ID should be provided and must be a string",
            });
          }
          const index = list.movies.indexOf(movieId);
          if (index === -1) {
            return resp.status(404).json({
              msg: "Movie is not in the list",
              status: 404,
              success: false
            });
          }
      
          list.movies.splice(index, 1);
      
          await list.save();
      return resp.json({
        msg:"Movie from list deleted successfully",
        status:200,
        success:true,
        list
      })  

    }catch(err){
        console.log(err.message);
        return resp.json({
            status:500,
            success:false,
            msg:err.message,
            error:err
        })
    }
}




//delete a list
const deleteList = async(req,resp)=>{
    try{
        const {listId} = req.params;
        const list = await List.findById(listId)
        if(!list){
            return resp.status({
                msg:"Such list do not exist",
                success:false,
                status:401
            })
        }
        const user = req.user?req.user:null;
        if(req.user)
        console.log(user.id)
    console.log(list.owner)
    if (!user || user.id.toString() !== list.owner.toString()) {
            return resp.json({
                status:402,
                success:false,
                msg:"You are not allowed to delete this List because you are not allowed"
            })
        }


        const deletedlist = await List.findByIdAndDelete(listId);
        return resp.json({
            success:true,
            status:200,
            msg:"List deleted successfully",
            deletedlist
        })
    }catch(err){
        console.log(err.message);
        return resp.json({
            status:500,
            success:false,
            msg:err.message,
            error:err
        })
    }
}




//update visbility
const updateVisibility = async(req,resp)=>{
    try{
        const {listId} = req.params;
        const list = await List.findOne({_id:listId})
        const owner = list.owner;
        const user = req.user;
        console.log(user)
        if(!list){
            return resp.json({
                status:401,
                msg:"Such list does not exist",
                success:false
            })
        }
        if(owner != user.id){
            return resp.json({
                status:402,
                success:false,
                msg:"You are not allowed to make changes"
            })
        }
        list.isPublic = !list.isPublic;
        await list.save()
        return resp.json({
            msg:"Visibility Toggled",
            status:200,
            success:true,
            list
        })

    }catch(err){
        console.log(err.message);
        return resp.json({
            status:500,
            success:false,
            msg:err.message,
            error:err
        })
    }
}



module.exports = {getAllLists,createList,getList,updateAddList,updateRemoveList,deleteList,updateVisibility}