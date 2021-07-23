const {database} = require('../../database/db.js')

const handle = () => {
    return database.query(`SELECT * FROM USERS`)
}
const getHome = () => {
    return database.query(`SELECT  * FROM EVENT  INNER_JOIN USERS ON EVENT.user_id = USERS.user_id`)
}

module.exports = {
    handle,getHome
}