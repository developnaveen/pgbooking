import React from "react";
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ActionAreaCard({ room }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 250, m: 2, p: 2, height: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image="/images/download.jpg"
        alt="PG Room"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {room.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {room.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Landmark: {room.landmark}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: {room.contact || "N/A"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/rooms/${room.pgId}`)} // navigate with pgId
        >
          More Details
        </Button>
      </CardActions>
    </Card>
  );
}
