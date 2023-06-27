import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("test/about.ejs");
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

// let postCRUD = async (req, res) => {
//   return new Promise(async(resolve , reject)=>{
//     try {
//         let messgae = await CRUDServices.createNewUser(req.body);
    
//         console.log(messgae);
//         resolve('thanh cong');
//         return res.send("POST - CRUD.ejs");

//       } catch (error) {
//             reject(error)
//       }

//   } );
// };
// let postCRUD = async (req, res) => {
//     let message = await CRUDServices.createNewUser(req.body)
//     console.log(message)
//     return res.send('post crud from server')
// }
let postCRUD = async (req, res) => {
    try {
        let message = await CRUDServices.createNewUser(req.body);
        console.log(message);
        return res.send('post crud from server');
    } catch (error) {
        console.log(error);

    }
}


// object: {
//     key: '',
//     value: ''
// }
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};
