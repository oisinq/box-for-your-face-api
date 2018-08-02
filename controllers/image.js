const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "8536fe155e144677b832e40c913dd3aa"
});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.status(200).json(data);
    })
    // For some reason, if I catch, it prevents this from returning
}

const handleImage = (req, res, db) => {
    let { id } = req.body;
    id = Number(id);

    db('users').where('id', '=', id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("Unable to get entries"));
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}