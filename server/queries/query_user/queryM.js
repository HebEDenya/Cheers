const {database} = require('../../database/db.js')


const handle = () => {
    return database.query(`SELECT * FROM USERS`)
}

// const handleInsert = () => {
//     return database.query(`INSERT INTO USERS (email, password) VALUES ('hamadi1@)`)
// }

module.exports = {
    handle,
}