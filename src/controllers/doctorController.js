import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

//getAllDoctor
let getAllDoctor = async (req, res) => {

    try {
        let doctors = await doctorService.getAllDoctorSV();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

//postInfoDoctor
let postInfoDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.saveDetailInfoDoctor(req.body);
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}
//getDetailDoctorById == req.query.id Lấy ra id của doctor => nối Markdown + AllCode
let getDetailDoctorById = async (req, res) => {
    let idDoctor = req.query.id
    if(!idDoctor) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let doctorInf = await doctorService.getDoctorInf(idDoctor)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        doctorInf
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor : getAllDoctor,
    postInfoDoctor : postInfoDoctor,
    getDetailDoctorById : getDetailDoctorById,

}