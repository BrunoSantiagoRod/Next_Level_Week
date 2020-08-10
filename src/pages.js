//Data
const data_base = require('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')

//Funcionalities
function pageLanding(req, res){
    return res.render("index.html")
}
async function pageStudy(req, res){
    //req.query = Contém todas as informações depois da interrogação no link
    const filters = req.query

    //! = negado
    if (!filters.subject || !filters.weekdays || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})        
    }

    //ERRO!
    console.log("funcionou")

    //Converter horas em minutos.
    const timeToMinutes = convertHoursToMinutes(filters.time)
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekdays}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    //Caso haja erro na hora da consulta do banco de dados
    try{
        const db = await data_base
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch (error){
        console.log(error)
    }

    //Note: render (page,object)
    // return res.render("study.html", {proffys, filters, subjects, weekdays})
    //return res.render("study.html", {proffys, title: "Hi from nunjucks"}) 
}
function pageGiveClasses(req,res){
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req, res){
    const createProffy = require("./database/createProffy")

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

    const classScheduleValues = req.body.weekdays.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
    
    try{
        const db = await data_base
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekdays=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]        

        return res.redirect("/study" + queryString)        
    } catch (error) {
        console.log();
    }

   
 
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}