const {handle} = require('../queries/query_user/queryM.js')

const selectRequest = (req, res) => {
    handle().then((result)=> { res.send(result)})
}

module.exports = {
    selectRequest,
}