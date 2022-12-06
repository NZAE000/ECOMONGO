import   mongoose    from "mongoose";
import { MONGO_URI } from "../const/const.js";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch(err => {
    console.log(`error in db connection: ${err}`);
})

const connection = mongoose.connection;

connection.on('error', (error) => {
    console.log(error);
});

connection.once('open', () => {
    console.log('Database Connected');
});