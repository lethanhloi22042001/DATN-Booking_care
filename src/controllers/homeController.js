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
 
let postCRUD = async (req, res) => {
    try {
        let message = await CRUDServices.createNewUser(req.body);
        console.log(message);
        return res.send('post crud from server');
    } catch (error) {
        console.log(error);

    }
}

let getUsers = async(req,res)=>{
  let allUsers = await CRUDServices.getUsers();

  console.log('---------+++++------------');
  console.log(allUsers);
  console.log('---------+++++------------');
  return res.render('displayCRUD.ejs',{
    dataTable:allUsers
  })
}
let getEditCRUD = async(req,res)=>{
  let userId = req.query.id ;
  if(userId){
    let userData = await CRUDServices.getUserInfoById(userId);
    return res.render('editCRUD.ejs',{user : userData});
  }else{
    return res.send('khong tim thay user')
  }
}


let putCRUD = async(req,res)=>{
  let data = req.body ;
  let allUsers = await CRUDServices.updateUserData(data)

  return res.render('displayCRUD.ejs', {
      dataTable: allUsers 
  })
}

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getUsers : getUsers,
  getEditCRUD :getEditCRUD,
  putCRUD : putCRUD ,


};
