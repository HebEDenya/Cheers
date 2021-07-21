const {database} = require('../../database/db.js')

const handle = () => {
    return database.query(`SELECT * FROM USERS`)
}
const getHome = () => {
    return database.query(`SELECT * FROM EVENT`)
}


module.exports = {
    handle,getHome
}