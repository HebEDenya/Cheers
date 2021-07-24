const {
  handle,
  update,
  getEvent,
} = require("../queries/query_user/queriesAz.js");
const { cloudinary } = require("../../cloudinary");

const selectRequest = (req, res) => {
  handle(req)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateRequest = (req, res) => {
  let params = req.params;
  let body = req.body;
  const fileStr = req.body.image;
  cloudinary.uploader
    .upload(fileStr, {
      upload_preset: "dev_setups",
    })
    .then((result) => {
      let image = result.url;
      update(params, body, image).then((result) => {
        res.status(200).send(result);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getEventRequest = (req, res) => {
  getEvent(req)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  selectRequest,
  updateRequest,
  getEventRequest,
};
