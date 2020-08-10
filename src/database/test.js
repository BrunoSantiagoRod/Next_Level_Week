const data_base = require('./db.js')
const createProffy = require('./createProffy')

data_base.then(async (db) => {
    //Insert data
    proffyValue = {                
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?v=4", 
        whatsapp: "983475384", 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",     
    }

    classValue = {
        subject: 1, 
        cost: "40", 
        //proffy_id will be gerated by database.        
    }

    classScheduleValues = [{
        //class_id will be gerated after class sign up.
        weekday: 1,
        time_from: 720,
        time_to: 1220
        },
        {
            weekday: 0,
            time_from: 550,
            time_to: 700            
        }
    
    ]  
    
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})
    //Consultar os dados inseridos

    //Todos os proffys
    //Nota: * = tudas as colunas
    const selectedProffys = await db.all("SELECT * FROM proffys")

    //consultar as classes de um determinado professor e trazer os seus dados
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    
    //Horário que a pessoa trabalha
    //O horário do time_from precisa ser antes ou igual ao horário solicitado
    //O time_to precisa ser acima do solicitado
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    console.log(selectClassesSchedules)
})