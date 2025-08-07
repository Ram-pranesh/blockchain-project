const models = reqiure('../models/userModels')

const create = async(req,res) =>{
    try{
        const user = await UserActivation.create(req.body)
        console.log(user)
        return res.status(200).json({
            success:true,
            USER:user
        })
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

const fetchAll = async(req,res)=>{
    try{
        const allUsers = await User.fetch({})
        if(allUsers.length === 0) {
            return res.status(200).json({
                success:true,
                message:"The database currently contains no user entries.",
                user:[]
            })            
        }
        return res.status(200).json({
            success:true,
            users:allUsers
        })
    } catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}