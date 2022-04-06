import { Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";

export default function RideCard({ride}){
    const textLightColor = "#CFCFCF"
    const textWhiteColor = "#FFFFFF"
    return(
        <Card className="rideCards" style={{backgroundColor: "#171717"}}>
            <CardContent>
            <img src={ride.map_url} alt="map" height="148" width="296" className="imageCard" />
            </CardContent>
            
            <CardContent >
            <Typography variant="body2" color={textLightColor} className="rideParams ">
                Ride Id: <span color={textWhiteColor}>{ride.id}</span>
            
                <span className="chipRow">
                <Chip label={ride.city} className="cityStateChip"/>
                <Chip label={ride.state} className="cityStateChip"/>
                </span>
                
            </Typography>
            <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "5px"}}>
                Origin Station: <span color={textWhiteColor}>{ride.origin_station_code}</span>
            </Typography>
            <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "8px"}}>
                station_path: <span color={textWhiteColor}>{JSON.stringify(ride.station_path)}</span>
            </Typography>
            <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "8px"}}>
                Date: <span color={textWhiteColor}>{ride.date}</span>
            </Typography>
            <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "8px"}}>
                Distance: <span color={textWhiteColor}>{ride.nearest}</span>
            </Typography>
            </CardContent>
        </Card>
    )
}