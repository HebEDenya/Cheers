const {database} = require('../../database/db.js')

// to post an event
const queryPostRequestCreateEvent = (body, newImage) => {
    const {title,description,category,location,price,start_time,end_time,available_places, user_id}=body
    return database.query(`INSERT INTO EVENT (title,price,description,image,start_time,end_time,location,available_places, category, user_id) 
    VALUES ('${title}','${price}','${description}','${newImage}','${start_time}','${end_time}','${location}','${available_places}','${category}',${user_id})`)
}
// to select the coins of each user
const selectCoinsFromUsers = (id) => {
    return database.query(`SELECT coins_quantity FROM USERS WHERE user_id=${id}`)
}
// to update the coins of the user
const updateCoinsUsers = ( coins,id) => {
    return database.query(`UPDATE USERS SET coins_quantity = '${coins}' WHERE user_id =${id}`)
}

// get the quantity of coins
const getCoinsUser = (id) => {
    return database.query(`SELECT coins_quantity FROM USERS WHERE user_id = ${id}`)
}

// get the favorit event
const getFavoriteEventsOfThUser = (user_id) => {
    return database.query(`SELECT event_id FROM FAVORITE WHERE user_id =${user_id}`)
}

//select specefic event 
const selectEventById = (event_id) => {
    return database.query(`SELECT * FROM EVENT WHERE event_id=${event_id}`)
}

//remove event from favorite
const removeEventFromFavorite = (event_id, user_id) => {
    return database.query(`DELETE FROM FAVORITE WHERE user_id=${user_id} AND event_id=${event_id}`)
}


module.exports = {
    queryPostRequestCreateEvent,
    selectCoinsFromUsers,
    updateCoinsUsers,
    getCoinsUser,
    getFavoriteEventsOfThUser,
    selectEventById,
    removeEventFromFavorite,
}