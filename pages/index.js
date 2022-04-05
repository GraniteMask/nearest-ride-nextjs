import { useState } from "react";
import Layout from "../components/Layout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function Home() {
  const [ride, setRide] = useState('nearest');
   

  const handleChange = (event, newValue) => {
    setRide(newValue)
    console.log(newValue)
      
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
        
      <Card className="rideCards" style={{backgroundColor: "#101010"}}>
        <CardContent>
          <img src="https://picsum.photos/200" alt="map" height="148" width="296" className="imageCard" />
        </CardContent>
        
        <CardContent>
          <Typography variant="body2" >
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
      </Card>
      
      
    </Layout>
  )
}
