//Atribuindo a variável para o banco de dados, basicamente é o import do Python
const Database = require('sqlite-async')

function create(db){
    //Aqui dentro colocaremos funções SQL para execução
    //Criar as tabelas do banco de dados
    //Cada table constem entidades que podem se relacionar
    //Todo professor tem uma ou mais classes e toda classes tem um ou mais horários
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER 
        );

        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)

}

//Abrindo o arquivo do banco de dados // Temos que tomar cuidado que caso algum script rode antes de abrir o banco pode dar problema.
//Para evitar isso utilizaremos a funcionalidade ".then()", que executara a abertura e dps as funções.

//Exportando o banco de dados
//Adicionar return na função create
module.exports = Database.open(__dirname + '/database.sqlite').then(create)