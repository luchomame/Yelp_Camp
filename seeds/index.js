const mongoose = require("mongoose");
const CampGround = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// NEW WAY TO CALL MONGOOSE!!!
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// can omit the paranthesis bc only one arg in arrow func
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await CampGround.deleteMany({});
  const c = new CampGround({ title: "purple field" });
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new CampGround({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // the OG link from the video doesn't work anymore so use this to generate quick random pics
      image: `https://source.unsplash.com/random/300x300?camping,${i}`,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis debitis, velit fuga a iure vel obcaecati praesentium recusandae nostrum in excepturi distinctio voluptate, reprehenderit vero! Quos tenetur laboriosam aut qui?",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
