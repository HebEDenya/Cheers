const axios = require('axios');

export default axios.create({
     headers: {Authorization: localStorage.getItem('token')}
});