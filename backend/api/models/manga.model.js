const mongoose = require('mongoose');


const mangaInfos = mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    preview: { type: String },
    routeName: { type: String },
    trama: { type: String },
    alt_title: { type: String },
    genres: { type: [String] },
    author: { type: String },
    artist: { type: String },
    status: { type: String },
    year: { type: String },
    chapter_cont: { type: Number },
    link: { key: String },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
})

module.exports = mongoose.model('manga', mangaInfos);