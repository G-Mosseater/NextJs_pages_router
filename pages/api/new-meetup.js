import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, desription } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://Gabriel:wllqlPhuB4YsN0sv@mongot.7shnf.mongodb.net/meetups?retryWrites=true&w=majority&appName=MongoT"
    );
    const db = client.db();
    const meetupsCollections = db.collection("meetups");
    const result = await meetupsCollections.insertOne({ data });
    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
