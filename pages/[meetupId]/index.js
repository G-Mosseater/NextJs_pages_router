import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Gabriel:wllqlPhuB4YsN0sv@mongot.7shnf.mongodb.net/meetups?retryWrites=true&w=majority&appName=MongoT"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray(); //only fethcing the id
  client.close();

  //describes all metupId's
  return {
    fallback: 'blocking',
    paths: meetups.map((m) => ({
      params: { meetupId: m._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; //meetupId is the identifier used in square brackets
  const client = await MongoClient.connect(
    "mongodb+srv://Gabriel:wllqlPhuB4YsN0sv@mongot.7shnf.mongodb.net/meetups?retryWrites=true&w=majority&appName=MongoT"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const selectedMeetup = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  console.log(selectedMeetup);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
      },
    },
  };
}

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content="this should be the content you want to hsow up in search engines"
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}
