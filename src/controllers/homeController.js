
import db from '../models/index'

let getHomePage = async(req, res) => {
    
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs');
    } catch (error) {
        console.log(error);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}
