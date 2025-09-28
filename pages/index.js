import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb"; //wont be shown on the client side
import Head from "next/head";
import { useEffect, useState } from "react";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "first meetup",
//     image:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.britannica.com%2F89%2F179589-138-3EE27C94%2FOverview-Great-Wall-of-China.jpg&f=1&nofb=1&ipt=b40f3f0508a047cd86725e5c7ede30efe36bfe5641440208407a31bd9a40d67f",
//     address: "Some address blabla 2121",
//     description: "this isa first meetup",
//   },

//   {
//     id: "m2",
//     title: "second meetup",
//     image:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.britannica.com%2F89%2F179589-138-3EE27C94%2FOverview-Great-Wall-of-China.jpg&f=1&nofb=1&ipt=b40f3f0508a047cd86725e5c7ede30efe36bfe5641440208407a31bd9a40d67f",
//     address: "Some address blabla 2121",
//     description: "this isa first meetup",
//   },
// ];

// export async function getServerSideProps(context) {

//     const req = context.req
//     const res = context.res
//   return {
//     props: { DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Gabriel:wllqlPhuB4YsN0sv@mongot.7shnf.mongodb.net/meetups?retryWrites=true&w=majority&appName=MongoT"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 60,
  };
}
export default function HomePage(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  //   useEffect(() => {
  //     setLoadedMeetups(DUMMY_MEETUPS);
  //   }, []);
  return (
    <>
      <Head>
        <title>Some Meetups</title>
        <meta
          name="description"
          content="this should be the content you want to hsow up in search engines"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
