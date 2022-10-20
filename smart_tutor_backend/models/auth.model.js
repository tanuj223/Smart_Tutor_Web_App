import mongoose from 'mongoose';
import mongooseautopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema;

const Auth = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
});


Auth.plugin(mongooseautopopulate);

const auth = mongoose.model("Auth", Auth);
export default auth
