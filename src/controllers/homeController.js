import db from "../models/index";
import CRUDServices from '../services/CRUDService'

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homepage.ejs");
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("CRUD.ejs");
};

let postCrud = async (req, res) => {
  try {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send("Posted CRUD from Server");
  } catch (error) {
    console.log(error);
  }
};

// let postCRUD = async (req, res) => {
//   try {
//     let message = await CRUDServices.createNewUser(req.body);
//     console.log(message);
//     return res.send("post crud from server");
//   } catch (error) {
//     console.log(error);
//   }
// };

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCrud: postCrud,
};
