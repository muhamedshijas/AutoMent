import mongoose from "mongoose";
function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://shijushijas157:ho2o2J2SD8zcy1HA@cluster0.gkon9np.mongodb.net/AutoMent"
    )
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("data base error \n" + err);
    });
}
export default dbConnect;
