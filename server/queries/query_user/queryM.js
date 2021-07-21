const {database} = require('../../database/db.js')


const handle = () => {
    return database.query(`SELECT * FROM EVENT`)
}

// to post an event
const queryPostRequestCreateEvent = (body, newImage) => {
    const {title,description,category,location,price,start_time,end_time,available_places}=body
    return database.query(`INSERT INTO EVENT (title,price,description,image,start_time,end_time,location,available_places, category, user_id) 
    VALUES ('${title}','${price}','${description}','${newImage}','${start_time}','${end_time}','${location}','${available_places}','${category}',2)`)
}
// to select the coins of each user
const selectCoinsFromUsers = () => {
    return database.query(`SELECT coins_quantity FROM USERS WHERE user_id=2`)
}
// to update the coins of the user
const updateCoinsUsers = ( coins) => {
    return database.query(`UPDATE USERS SET coins_quantity = '${coins}' WHERE user_id =2`)
}

module.exports = {
    handle,
    queryPostRequestCreateEvent,
    selectCoinsFromUsers,
    updateCoinsUsers
}