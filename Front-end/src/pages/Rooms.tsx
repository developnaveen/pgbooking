import Header from "../components/header";
import PGDetails from "../components/pgdetails";  
import RoomCard from "../components/roomcard";
import React from "react";
import { useParams } from "react-router-dom";

const Rooms = () => {
  const { id: pgId } = useParams();  // ✅ /rooms/:pgId

  return ( 
    <div>
      <Header/>
      <div style={{marginTop: '20px', margin: 8}}>
        {/* Pass pgId down as prop */}
        <PGDetails pgId={pgId}/>  
        <RoomCard pgId={pgId}/>  
      </div>
    </div>
  );
}

export default Rooms;
