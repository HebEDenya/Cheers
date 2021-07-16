const {database} = require('../../database/db.js')


const handle = () => {
    return database.query(`SELECT * FROM USERS`)
}

module.exports = {
    handle,
}