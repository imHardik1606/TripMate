import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";

const Viewtrip = () => {
  //getting Id from params
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // fetching doc from firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
      toast("trip found");
    } else {
      console.log("No such document");
      toast("No trip found");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* Information Section  */}
            <InfoSection trip={trip} />
        {/* Recommended Hotels */}
            <Hotels trip={trip} />
        {/* Itineary */}

        {/* Footer */}
    </div>
  );
};

export default Viewtrip;
