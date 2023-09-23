import db from '../models/index' ;
require('dotenv').config();
import _ from 'lodash';
let MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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
        console.log('ths is inputdata of SaveDeatailDocotor Data',inputdata);
    return new Promise(async (resolve, reject) => {
        try {
            if(!inputdata && !inputdata.action ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parametter'
                })
            }else{
                if(inputdata.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML : inputdata.contentHTML,
                        contentMarkdown : inputdata.contentMarkdown,
                        description : inputdata.description ,
                        doctorId : inputdata.doctorId,
                    });
                }else if(inputdata.action === 'EDIT'){
                    let doctorMarkdown = await db.Markdown.findOne({
                        where : {doctorId : inputdata.doctorId},
                        raw : false,
                        
                    });
                    if(doctorMarkdown){
                        doctorMarkdown.contentHTML = inputdata.contentHTML ;
                        doctorMarkdown.contentMarkdown = inputdata.contentMarkdown ;
                        doctorMarkdown.description = inputdata.description;
                        doctorMarkdown.updateAt = new Date();

                        await doctorMarkdown.save()
                    }
                }
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
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown','description','doctorId','specialtyId'] },
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: false,
                nest: true
            })
            if(users && users.image){
                users.image  = new Buffer(users.image ,"base64").toString('binary'); 
            }
            if(!users) users  = {};
            resolve(
                users
            )
        } catch (e) {
            reject(e)
        }
    })
}

// Lấy nhiều ngày(Object) từ bảng detail doctor
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing riquired parameter!'
                })
            } else {
                let schedule = data.arrSchedule
                if (!schedule) {
                    console.log('schedule is empty!')
                } else {
                    schedule = schedule.map(item => {
                        // Hard code vì env không chạy
                        item.maxNumber = 10
                        return item
                    })
                    console.log('this is scheduleMAPP MAP',schedule);
                }

                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId, date: data.formatedDate },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true
                    }
                )

                if (!existing) {
                    await db.Schedule.create({
                        date: schedule.date,
                        timeType: schedule.timeType,
                        doctorId: schedule.doctorId
                    })
                } else {
                    let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                        return a.timeType === b.timeType && +a.date === +b.date
                    })

                    //create data
                    if (toCreate && toCreate.length > 0) {
                        await db.Schedule.bulkCreate(toCreate)
                    }
                }

                //check different

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        console.log(doctorId,date,'date','doctorId');
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        // { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },

                    ],
                    raw: false,
                    nest: true

                }
                )
                console.log('this is data1 ', data);
                if (!data) data = []
                resolve({
                    errCode: 0,
                    data: data
                })
                console.log('this is data2 ', data);
            }
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
    bulkCreateSchedule : bulkCreateSchedule,
    getScheduleByDate : getScheduleByDate,


}
