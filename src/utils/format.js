const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const week_days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNum){
    return subjects[subjectNum-1]
}

/*Precisamos enviar essa estrutura para o front-end */

function convertHoursInMinutes(time) {
    const [hour, minutes] = time.split(":")
    return Number((hour*60) + minutes)
}

module.exports = {
    subjects,
    week_days,
    getSubject,
    convertHoursInMinutes
}