import mongoose from 'mongoose';
import mongooseautopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema;

const Qna = new Schema({
    // chapter: {
    //     type: Schema.Types.ObjectId, ref: 'Chapter',
    // },
    question: {
        type: String,
    },
    answer: {
        type: String
    },
});


Qna.plugin(mongooseautopopulate);

const qna = mongoose.model("Qna", Qna);
export default qna
