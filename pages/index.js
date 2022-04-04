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
        <Tab label="nearest" onClick={() => handleRideTypes('nearest')} value="nearest" style={{paddingLeft: 0, paddingRight: 0}}/>
        <Tab label="upcoming" onClick={() => handleRideTypes('upcoming')} value="upcoming"/>
        <Tab label="past" onClick={() => handleRideTypes('past')} value="past"/>
    </Tabs>
    </Layout>
  )
}
