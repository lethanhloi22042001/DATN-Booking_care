

let handleLogin = async(req,res)=>{
    let email  = req.body.email ;
    let password  = req.body.password ;

    if(!email || !password){
        return res.status(500).json({
            message : 'Vui long khong duoc de trong ',
            errCode : 1 ,
        });
    }

    let userData = await handleUserLogin(email , password) ;

    return res.status(200).json({
        errCode : userData.errCode ,
        message : userData.message ,
        user : userData.user ? userData : {}, // ?
    });
}

module.exports = {
    handleLogin : handleLogin,
    
}