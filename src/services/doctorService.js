import db from '../models/index'

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

//getAllDoctorSV
let getAllDoctorSV = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password','image']
                },
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}
//saveDetailInfoDoctor
let saveDetailInfoDoctor = (inputdata) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!inputdata){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parametter'
                })
            }else{
                await db.Markdown.create({
                    contentHTML : inputdata.contentHTML,
                    contentMarkdown : inputdata.contentMarkdown,
                    description : inputdata.description ,
                    doctorId : inputdata.doctorId,
                });
                
                resolve({
                    errCode: 0,
                   errMessage: 'Ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
//getDoctorInf

let getDoctorInf = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: { id: doctorId },
                attributes: {
                    exclude: ['password','image']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown','description','doctorId','specialtyId'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctorSV : getAllDoctorSV ,
    saveDetailInfoDoctor:saveDetailInfoDoctor,
    getDoctorInf : getDoctorInf,


}
