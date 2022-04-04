import { useState } from "react";
import Layout from "../components/Layout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'

export default function Home() {
  const [ride, setRide] = useState('nearest');
    const [rideType, setRideType] = useState('');

    const handleChange = (event, newValue) => {
      setRide(newValue)
  };

  const handleRideTypes = (e) =>{
      setRideType(e)
  }
  return (
    <Layout title="Nearest Ride">
      <Tabs
        value={ride}
        textColor="#FFF"
        onChange={handleChange}
        aria-label="rideTypes"
        TabIndicatorProps={{ style: { background: "#fff" } }}
    >
        <Tab label="Nearest rides" onClick={() => handleRideTypes('nearest')} value="nearest" style={{paddingLeft: 0, paddingRight: 0}} className="rideOptions"/>
        <Tab label="Upcoming rides" onClick={() => handleRideTypes('upcoming')} value="upcoming" className="rideOptions"/>
        <Tab label="Past rides" onClick={() => handleRideTypes('past')} value="past" className="rideOptions"/>
    </Tabs>
    </Layout>
  )
}
