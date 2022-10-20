import Chapter from "../models/chapter.model.js";
import axios from "axios";
import Qna from "../models/qna.model.js";

export const addChapter = async (req, res) => {
    let chapter;
    try {
        chapter = new Chapter({
            ...req.body
        });
        await chapter.save();
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong!"
        })
    }
    res.status(200).json({
        success: true,
        chapter: chapter
    })
}


export const getAllChapters = async (req, res) => {
    res.status(200).json(res.advancedResults);
}



export const getChapterById = async (req, res) => {
    let chapter;
    try {
        chapter = await Chapter.findOne({ _id: req.params.id }).populate({ path: 'user', model: 'Auth' }).populate({ path: 'qna', model: 'Qna' });

    } catch {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }

    res.status(200).json({
        success: true,
        chapter: chapter
    })
}

export const generateQna = async (req, res) => {
    try {


        let chapter = await Chapter.findById(req.params.id).populate('user');
        if (!chapter) {
            res.status(403).json({
                success: false,
                error: "Chapter doesn't exist!"
            })
        }

        console.log(chapter.text);
        let data = await axios.post("http://127.0.0.1:8000/qna", {
            chapter: chapter.text
        })
        console.log(data.data);

        let idArray = await Qna.insertMany(data.data);

        idArray = idArray.map(doc => doc._id);

        chapter.qna = idArray;
        await chapter.save();

        res.status(200).json({
            success: true,
            chapter
        })
    } catch (err) {
        console.log(err.response)
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })

    }
}

export const generateRecommendations = async (req, res) => {
    try {
        let chapter = await Chapter.findById(req.params.id).populate('user');
        if (!chapter) {
            res.status(403).json({
                success: false,
                error: "Chapter doesn't exist!"
            })
        }

        let recommend = await axios.post("https://smart-tutor.herokuapp.com/recommend", {
            chapter: chapter.text
        })

        if (recommend.data) {
            chapter.recommendations = recommend.data;
            await chapter.save();


            res.status(200).json({
                success: true,
                chapter
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })

    }
}

export const generateNotes = async (req, res) => {
    try {


        let chapter = await Chapter.findById(req.params.id).populate('user');
        if (!chapter) {
            res.status(403).json({
                success: false,
                error: "Chapter doesn't exist!"
            })
        }

        let notes = await axios.post("https://smart-tutor.herokuapp.com/notes", {
            chapter: chapter.text
        })

        if (notes.data) {
            chapter.notes = notes.data[0];
            await chapter.save();
            res.status(200).json({
                success: true,
                chapter
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })

    }
}

export const updateChapter = async (req, res) => {
    try {
        let chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body);

        if (!chapter) {
            res.status(403).json({
                success: false,
                error: "Chapter doesn't exist!"
            })
        }

        res.status(200).json({
            success: true,
            chapter
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }
}
export const deleteChapter = () => null