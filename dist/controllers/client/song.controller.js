"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listens = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        deleted: false,
    });
    const songs = yield song_model_1.default.find({
        deleted: false,
        topicId: topic.id,
        status: "active",
    }).select("title avatar singerId like createdAt slug");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        }).select("fullName");
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs,
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false,
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active",
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false,
        status: "active",
    }).select("title");
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        songId: song.id,
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTile: "chi tiết bài hát",
        song: song,
        topic: topic,
        singer: singer,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false,
    });
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, {
        like: newLike,
    });
    res.json({
        code: 200,
        message: "Thành công!",
        like: newLike,
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                songId: idSong,
            });
            if (!existFavoriteSong) {
                const record = new favorite_song_model_1.default({
                    songId: idSong,
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                songId: idSong,
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thành công!",
    });
});
exports.favorite = favorite;
const listens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: idSong,
        });
        const listens = song.listens + 1;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, {
            listens: listens,
        });
        const dataSong = yield song_model_1.default.findOne({
            _id: idSong,
        });
        res.json({
            code: 200,
            message: "Thành công!",
            listens: dataSong.listens,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        });
    }
});
exports.listens = listens;
