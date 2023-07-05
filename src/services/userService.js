import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        // đã có eamil thì check password
        // let checkPass = await bcrypt.compareSync(password , user.password)
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
          // Tìm ra để xuất mấy cái mình muốn
        });

        if (user) {
          let checkPass = await bcrypt.compareSync(password, user.password);
          if (checkPass) {
            userData.errCode = 0;
            userData.message = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.message = "Password is wrong";
          }
        } else {
          userData.errCode = 2;
          userData.message = "Your is not found";
        }
      } else {
        userData.errCode = 1;
        userData.message = "Email not exist";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};


 

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}; 

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


let hashUserPassword = (password) => {
    return new Promise(async (resole, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resole(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}



let createNewUser = (data)=>{
    return new Promise( async(resolve , reject)=>{
        try {
            let isEmail = await checkUserEmail(data.email) ; 
            console.log('This is is',isEmail);

            if(isEmail){
                resolve({
                    errCode : 1, 
                    message : 'Plz try another Email because this email is already yet :V'
                });
            }
            
            if(!isEmail){
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password) ;
                    let newUser = await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
            });
                resolve(newUser);
            }
        } catch (error) {
            reject(error)
        }
 
    } );
}

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
      let foundUser = await db.User.findOne({
          where: { id: userId }
      })
      if (!foundUser) {
          resolve({
              errCode: 2,
              errMessage: 'The user is not exist'
          })
      }

      await db.User.destroy({
          where: { id: userId }
      })

      resolve({
          errCode: 0,
          message: 'User is deleted'
      })
  })
}

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
      try {
          if (!data.id || !data.roleId || !data.positionId || !data.gender) {
              resolve({
                  errCode: 2,
                  message: 'Missing required parameters!'
              })
          }
          let user = await db.User.findOne({
              where: { id: data.id },
              raw: false
          })
          if (user) {
              user.firstName = data.firstName
              user.lastName = data.lastName
              user.address = data.address
              user.roleId = data.roleId
              user.positionId = data.positionId
              user.gender = data.gender
              user.phonenumber = data.phonenumber
              if(data.avatar) {
                  user.image = data.avatar
              }

              await user.save()

              resolve({
                  errCode: 0,
                  message: 'Update user success!'
              })
          } else {
              resolve({
                  errCode: 1,
                  errMessage: 'User not found!'
              })
          }
      } catch (e) {
          reject(e)
      }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser : createNewUser ,
  deleteUser : deleteUser ,
  updateUserData : updateUserData,
  
};
