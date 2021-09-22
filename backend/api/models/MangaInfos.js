const mongoose = require('mongoose');

const MangaInfos = mongoose.Schema({
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
    chapter_cont: { type: Number }
}, { collection: 'MangaInfos' })

const  MangaLinks = mongoose.Schema({
    id: { type: Number },
    link: { type: [String]}
}, { collection: 'MangaLinks' })

module.exports = [
    mongoose.model('MangaInfos', MangaInfos),
    mongoose.model('MangaLinks', MangaLinks)
];