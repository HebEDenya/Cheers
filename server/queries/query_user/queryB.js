const {database} = require('../../database/db.js');

const getHome = (user_id=0) => {
    return database.query(`SELECT EVENT.*,  FAVORITE.user_id = ${user_id} AS isFavorite  FROM EVENT LEFT JOIN FAVORITE ON (FAVORITE.event_id=EVENT.event_id)`)
}

const postCategory = (body,clodImage) => {
    return database.query(`INSERT INTO CATEGORIES(category_name,category_image) VALUES ('${body.category_name}','${clodImage}')`)
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
const favoriteLike = (user_id,event_id) => {
    return database.query(`SELECT * FROM EVENT INNER JOIN FAVORITE ON (user_id,event_id) WHERE user_id = ${user_id} AND event_id = ${event_id}`)
}
// const addToLiked = (Liked) => {
//     return database.query(`UPDATE EVENT SET Liked = ${Liked}`)
// }

module.exports = {
    getHome,
    postCategory,
    getCategories,
    PlusFavorite,
    SelectFav,
    getCategory,
    favoriteLike,
    // addToLiked,
}


