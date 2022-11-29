import { MONGO_URI } from "../const/const.js";
import   mongoose    from "mongoose";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnidiedTopology: true,
})
.catch(err => {
    console.log(`error in db connection: ${err}`);
})

const connection = mongoose.connection;

connection.on('error', (error) => {
    console.log(error);
});

connection.once('connected', () => {
    console.log('Database Connected');
});