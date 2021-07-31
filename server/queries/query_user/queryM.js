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
    return database.query(`SELECT e.event_id, e.title, e.title, e.image,e.price, e.start_time, e.location , e.user_id, e.category from FAVORITE f INNER JOIN EVENT e on (e.event_id = f.event_id) WHERE f.user_id = ${user_id}`)
}

//select specefic event 
const selectEventById = (event_id) => {
    return database.query(`SELECT * FROM EVENT WHERE event_id=${event_id}`)
}

//remove event from favorite
const removeEventFromFavorite = (event_id, user_id) => {
    return database.query(`DELETE FROM FAVORITE WHERE user_id=${user_id} AND event_id=${event_id}`)
}

//to get the liste of the admin

const getAdminListe = () => {
    return database.query(`SELECT username, email, type_user, user_id FROM USERS WHERE type_user <> "NULL"`)
}

//to delete an admin 
const removeAdmin = (id) => {
    return database.query(`DELETE FROM USERS WHERE user_id = ${id}`)
}
//to add new admin 
const addNewAdmin = (username, email,type_user,password) => {
    return database.query(`INSERT INTO USERS (username, email, type_user, password) VALUES ('${username}','${email}','${type_user}','${password}')`)
}

//to delete event by admin
const deleteEventByAdmin = (id) => {
    return database.query(`DELETE FROM EVENT WHERE event_id = ${id}`)
}
//delete from Favorite by admin
const deleteFromFavoriteByAdmin = (id) => {
    return database.query(`DELETE FROM FAVORITE WHERE event_id = ${id}`)
}

const updateCoinsAfterPurshase = (user_id, coins) => {
    return database.query(`UPDATE USERS SET coins_quantity = coins_quantity +'${coins}' WHERE user_id =${user_id}`)
}

//todelet a category
const deleteCategory = (category_name) => {
    return database.query(`DELETE FROM CATEGORIES WHERE category_name='${category_name}' `)
}

module.exports = {
    queryPostRequestCreateEvent,
    selectCoinsFromUsers,
    updateCoinsUsers,
    getCoinsUser,
    getFavoriteEventsOfThUser,
    selectEventById,
    removeEventFromFavorite,
    getAdminListe,
    removeAdmin,
    addNewAdmin,
    deleteEventByAdmin,
    deleteFromFavoriteByAdmin,
    updateCoinsAfterPurshase,
    deleteCategory
}