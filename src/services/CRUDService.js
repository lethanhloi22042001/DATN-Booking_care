import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const hashedPass = await hashPassWord(data.password);
    try {
      await db.User.create({
        email: data.email,
        password: hashedPass,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender,
        roleId: data.roleId,
      });
      resolve("Da tao thanh cong");
    } catch (error) {
      reject(error);
    }
  });
};

let hashPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPass = await bcrypt.hashSync(password, salt);
      resolve(hashedPass);
      console.log(hashedPass);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
