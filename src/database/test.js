const Database = require('./db')

const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados

    proffyValue = {
        name: "João Hutner", 
        avatar: "https://avatars3.githubusercontent.com/u/49768612?s=400&u=e5c876f2e589dad6ffdeaa7cfe328142e6ab33ef&v=4", 
        whatsapp: "47999995000",
        bio: "Entusiasta de software e hardware. Apaixonado por resolver integrais e derivadas, adoro resolver problemas difíceis e ajudar pessoas. Mais de 20 pessoas já deixaram o trauma das derivadas de lado"
    }

    classValue = {
        subject: 1, 
        cost: "40.00",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a aula
        {
            weekday: 1, 
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 520, 
            time_to: 1320
        }
    ]

    //Tenhoq ue aguardar a função inteira executar
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar os dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    console.log(selectedClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)


    //console.log(selectClassesSchedules)

})