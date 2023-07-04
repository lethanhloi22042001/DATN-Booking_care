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

// let getAllUsers = async (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let user = "";
//       if (userId === "All") {
//         user = await db.User.findAll({
//           attributes: { exclude: ["password"] },
//         });
//       }

//       if (userId && userId !== "All") {
//         user = await db.User.findOne({
//             where : {id : userId.id} ,
//           attributes: { exclude: ["password"] },
//         });
//       }

//       resolve(user);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

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

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
