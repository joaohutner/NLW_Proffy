module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){ //module.exports to exportando
    // inserir dados na table de proffys
    //cada execução de dados demora um tempo, utilizaremos um await (sem usar o then), porém, devemos colocar um async na frente da função
    const insertedProffy = await db.run(`
        INSERT INTO proffys(
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );

    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes
    const insertedClass =  await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID
    
    //Inserir dados na tabela class_schedule
    //"forEach" intera sobre cada elemento e os acessando.
    const insertedAllClassScheduleValue = classScheduleValues.map((classScheduleValue) => {
         return db.run(`
            INSERT INTO class_schedule (
                    class_id,
                    weekday,
                    time_from,
                    time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            )
         `)
    })

    // aqui vou executar todos os db.runs() das class_schedules
    // Promessa de vários locais
    await Promise.all(insertedAllClassScheduleValue)
}