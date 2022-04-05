import { useState } from "react";
import Layout from "../components/Layout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";

export default function Home() {
  const [ride, setRide] = useState('nearest');
  const textLightColor = "#CFCFCF"
  const textWhiteColor = "#FFFFFF"

  const handleChange = (event, newValue) => {
    setRide(newValue)
    // console.log(newValue)
      
  };

  const handleRideTypes = (e) =>{
      setRideType(e)
  }
  return (
    <Layout title="Nearest Ride">
      <Tabs
        value={ride}
        // textColor={rideType == ride ? "#FFF" : "#D0CBCB"}
        onChange={handleChange}
        aria-label="rideTypes"
        TabIndicatorProps={{ style: { background: "#fff" } }}
        style={{marginTop: "22px"}}
        textColor="inherit"
      >
        <Tab label="Nearest rides" value="nearest"  className="rideOptions"/>
        <Tab label="Upcoming rides (5)" value="upcoming" className="rideOptions" style={{marginLeft: "1rem"}} />
        <Tab label="Past rides (4)" value="past" className="rideOptions" style={{marginLeft: "1rem"}}/>
        <div className="grow"></div>
        <Button className="filterButton" color="inherit">
          <FilterListIcon /> Filters
        </Button>
        
      </Tabs>
        
      <Card className="rideCards" style={{backgroundColor: "#171717"}}>
        <CardContent>
          <img src="https://picsum.photos/200" alt="map" height="148" width="296" className="imageCard" />
        </CardContent>
        
        <CardContent >
          <Typography variant="body2" color={textLightColor} className="rideParams ">
            Ride Id: <span color={textWhiteColor}>002</span>
         
            <span className="chipRow">
              <Chip label="City" className="cityStateChip"/>
              <Chip label="State" className="cityStateChip"/>
            </span>
            
          </Typography>
          <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "5px"}}>
            Origin Station: <span color={textWhiteColor}>002</span>
          </Typography>
          <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "8px"}}>
            station_path: <span color={textWhiteColor}>002</span>
          </Typography>
          <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "8px"}}>
            Date: <span color={textWhiteColor}>002</span>
          </Typography>
          <Typography variant="body2" color={textLightColor} className="rideParams" style={{marginTop: "8px"}}>
            Distance: <span color={textWhiteColor}>002</span>
          </Typography>
        </CardContent>
      </Card>
      
      
    </Layout>
  )
}
