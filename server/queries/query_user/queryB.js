const {database} = require('../../database/db.js');

const getHome = () => {
    return database.query(`SELECT  * FROM EVENT `)
}

const postCategory = (body) => {
    return database.query(`INSERT INTO CATEGORIES(category_name) VALUES ('${body.category_name}')`)
}

const getCategories = () => {
    return database.query(`SELECT * FROM CATEGORIES`)
}

const PlusFavorite = (user_id, event_id) => {
    return database.query(`INSERT INTO FAVORITE (user_id,event_id) VALUES (${user_id},${event_id})`)
}

const SelectFav = (user_id, event_id) => {
    return database.query(`SELECT * FROM FAVORITE WHERE user_id=${user_id} AND event_id=${event_id}`)
}

const getCategory = (category, user_id) => {
    return database.query(`SELECT * FROM EVENT WHERE category_id=${category} AND event_id=${user_id}`)
}
module.exports = {
    getHome,
    postCategory,
    getCategories,
    PlusFavorite,
    SelectFav,
    getCategory,
}