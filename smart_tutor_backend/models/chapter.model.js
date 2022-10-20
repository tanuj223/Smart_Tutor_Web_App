import mongoose from 'mongoose';
import mongooseautopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema;

const Chapter = new Schema({
    name: {
        type: Schema.Types.String
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'Auth',
    },
    text: {
        type: String,
    },
    notes: {
        type: String
    },
    recommendations:
        [{ type: String }],
    qna: [{
        type: Schema.Types.ObjectId, ref: 'Qna'
    }]
});


Chapter.plugin(mongooseautopopulate);

const chapter = mongoose.model("Chapter", Chapter);
export default chapter
