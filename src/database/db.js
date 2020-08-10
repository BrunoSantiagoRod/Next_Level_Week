const data_base = require('sqlite-async')
//Um banco de dados pode demorar um certo tempo para ser aberto, dessa forma é necessário usar o .then().

function execute (db){
    //Usando sql
    //Criando tabelas do banco de dados    
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

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}
//Exportar o código para test.js
module.exports = data_base.open(__dirname + '/database.sqlite').then(execute)
//Note: INTEGER = Int value.
//Note: Estão sendo usadas 3 tabelas para evitar repetições de informações como nome ou avatar.