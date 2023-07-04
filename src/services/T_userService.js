import db from '../models/index' ;
import handleUserLogin from '../controllers/T_userCtrl'

//handleUserLogin


let handleUserLogin = (email,password)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user = {} ;
            let existEmail = await findEmail(email) ;
            
            if(existEmail){

            }else{
                
            }
        } catch (error) {
            resolve(error)
        }


    } );
}

let findEmail = (email)=>{
    return new Promise( async(resolve,reject)=>{
       try {
        let userEmail = await db.User.findOne({
            where : {email : email}
        });
        if(userEmail){
                reject(true);
        }else{
                reject(false);
        }

       } catch (error) {
        reject(error);
       }

    });
 
}





module.exports = {
    handleUserLogin : handleUserLogin,

}