const {database} = require('../../database/db.js');

const getHome = () => {
    return database.query(`SELECT  * FROM EVENT `)
}

const postCategory = (body,clodImage) => {
    const {name, image}=body
    return database.query(`INSERT INTO CATEGORIES(category_name,category_image) VALUES ('${name}','${image}')`)
}
module.exports = {
    getHome,
    postCategory
}