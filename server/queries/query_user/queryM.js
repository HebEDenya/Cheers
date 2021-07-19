const {database} = require('../../database/db.js')


const handle = () => {
    return database.query(`SELECT * FROM USERS`)
}

const queryPostRequestCreateEvent = (body) => {
    const {title,description,category,location,price,start_time,end_time,available_places,image}=body
    return database.query(`INSERT INTO EVENT (title,price,description,image,start_time,end_time,location,available_places, category, user_id) 
    VALUES ('${title}','${price}','${description}','${image}','${start_time}','${end_time}',',${location}',${available_places},'${category}',1)`)
}

module.exports = {
    handle,
    queryPostRequestCreateEvent,
}