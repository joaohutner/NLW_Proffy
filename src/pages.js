/*---------------------------------------------------------- */
/*Para eu pegar uma dependencia que existe de outro arquivo no javascript: require*/
const Database = require('./database/db')

const {subjects, week_days, getSubject, convertHoursInMinutes} = require('./utils/format')

function pageLanding(req, res){
    return res.render("index.html") 
}

async function pageStudy(req,res){
    const filter = req.query
    
    if (!filter.subject || !filter.weekday || !filter.time){
        return res.render("study.html", {filter, subjects, week_days}) /*Colocando objeto dentro do study */
    }

    // Tudo no banco de dados vai funcionar em minutos
    // Converter horas em minutos
    const timeToMinutes = convertHoursInMinutes(filter.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filter.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = "${filter.subject}"
    `
    
    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html", {proffys, filter, subjects, week_days})

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req,res){
    return res.render("give_classes.html", {subjects, week_days})
}

async function saveClasses(req,res){
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
    (weekday, index) =>{
        return {
            weekday,
            time_from: convertHoursInMinutes(req.body.time_from[index]),
            time_to: convertHoursInMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject //let pode modificar
        queryString = queryString + "&weekday=" + req.body.weekday[0]
        queryString = queryString + "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}