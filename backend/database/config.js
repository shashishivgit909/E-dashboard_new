const mongoose= require('mongoose');
// //  mongoose.connect("mongodb://0.0.0.0:27017/e-comm");
// //mongoose.connect("mongodb://localhost:27017/e-comm")
// mongoose.connect("mongodb+srv://shashishiv26:shashi@123@cluster0.gbse4fk.mongodb.net/E-com?retryWrites=true&w=majority")


const Connection = async() => {

    const URL="mongodb+srv://shashishiv26:shashi123@cluster0.gbse4fk.mongodb.net/E-com?retryWrites=true&w=majority";
        try {
            await mongoose.connect(URL, { useNewUrlParser: true,useUnifiedTopology:true, })
            console.log('Database connected successfully');
        } catch (error) {
            console.log('Error while connecting to the database ', error);
        }
    };
    Connection();