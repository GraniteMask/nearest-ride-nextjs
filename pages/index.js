import React from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/system";

export default function Home() {
  const [ride, setRide] = useState('nearest');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const textLightColor = "#CFCFCF"
  const textWhiteColor = "#FFFFFF"


  const StyledFilter = styled((props)=>(
    <Menu
      
      {...props}
    />
  ))(({theme}) => ({
    '& .MuiPaper-root':{
      width: "228px",
      backgroundColor: "#000000"
    },
  }))

  const handleChange = (event, newValue) => {
    setRide(newValue)
    // console.log(newValue)
      
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Button 
          className="filterButton" 
          color="inherit"
          id="filterButton"
          aria-controls={open ? 'filterButton' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FilterListIcon /> Filters
        </Button>

        <StyledFilter
          className="filters"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'filters',
          }}
        >
          <Typography style={{paddingLeft: "16px ", color: "A5A5A5", fontSize: "20px"}}>Filters</Typography>
          <MenuItem onClick={handleClose} >Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </StyledFilter>
        
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
