import React from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Accordion, AccordionSummary, Button, Card, CardContent, Chip, Divider, List, Typography } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AccordionDetails, ListItem } from "@material-ui/core";
import axios from "axios";
import moment from "moment";

export default function Home(props) {
  const [ride, setRide] = useState('nearest');
  const [anchorEl, setAnchorEl] = useState(null);
  const [nearest, setNearest] = useState(true)
  const [upcoming, setUpcoming] = useState(false)
  const [past, setPast] = useState(false)
  const {rides, user, upcomingLength, pastLength} = props
  const open = Boolean(anchorEl);
  const textLightColor = "#CFCFCF"
  const textWhiteColor = "#FFFFFF"
  var today = new Date();

  // console.log(today)

  const StyledFilter = styled((props)=>(
    <Menu
      
      {...props}
    />
  ))(({theme}) => ({
    '& .MuiPaper-root':{
      width: "228px",
      backgroundColor: "#000000",
      borderRadius: "10px",
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

  const handleOptions = (option) =>{
    if(option == 'nearest'){
      setNearest(true)
      setUpcoming(false)
      setPast(false)
    }
    if(option == 'upcoming'){
      setUpcoming(true)
      setNearest(false)
      setPast(false)
    }
    if(option == 'past'){
      setPast(true)
      setUpcoming(false)
      setNearest(false)
    }
  }

  return (
    <Layout title="Edvora Nearest Ride" description="Edvora Nearest Ride Web App" name={user.name} imgUrl={user.url}>
      <Tabs
        value={ride}
        // textColor={rideType == ride ? "#FFF" : "#D0CBCB"}
        onChange={handleChange}
        aria-label="rideTypes"
        TabIndicatorProps={{ style: { background: "#fff" } }}
        style={{marginTop: "22px"}}
        textColor="inherit"
      >
        <Tab label="Nearest rides" value="nearest"  className="rideOptions" onClick={()=>handleOptions('nearest')}/>
        <Tab label={`Upcoming rides (${upcomingLength})`} value="upcoming" className="rideOptions" style={{marginLeft: "1rem"}} onClick={()=>handleOptions('upcoming')}/>
        <Tab label={`Past rides (${pastLength})`} value="past" className="rideOptions" style={{marginLeft: "1rem"}} onClick={()=>handleOptions('past')}/>
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
          <FilterListIcon style={{marginRight: "0.5rem"}}/> Filters
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
          <div style={{margin: "6px 20px"}}>
            <Typography style={{paddingLeft: "2px", color: "#A5A5A5", fontSize: "20px", paddingTop: "10px"}}>Filters</Typography>
            <Divider sx={{backgroundColor: "#A5A5A5"}}/>
            
              <Accordion variant="contained" className="filterButtons" 
                
              >
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                sx={{
                  backgroundColor: '#232323',
                  borderRadius: "5px",
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#A5A5A5',
                  },
                  width: "188px",
                  marginTop: "1rem",
                  textTransform: "none"
                }}>
                  <Typography>State</Typography>
                </AccordionSummary>   
                <AccordionDetails>
                  <List>
                    <MenuItem onClick={handleClose} sx={{
                      borderRadius: "5px",
                    '&:hover': {
                      color: '#A5A5A5',
                    },
                    }}
                    >
                      Profile
                    </MenuItem>

                    
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion className="filterButtons">
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                sx={{
                  backgroundColor: '#232323',
                  borderRadius: "5px",
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#A5A5A5',
                  },
                  width: "188px",
                  marginTop: "0.5rem",
                  textTransform: "none"
                }}>
                  <Typography>City </Typography>
                </AccordionSummary>  
                <AccordionDetails>
                  <List>
                    <MenuItem onClick={handleClose} sx={{
                      borderRadius: "5px",
                    '&:hover': {
                      color: '#A5A5A5',
                    },
                    }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{
                      borderRadius: "5px",
                    '&:hover': {
                      color: '#A5A5A5',
                    },
                    }}
                    >
                      Profile
                    </MenuItem>
                    
                  </List>        
                </AccordionDetails>
              </Accordion>
              
           
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </div>
        </StyledFilter>
        
      </Tabs>

      { nearest &&
        rides.map(ride=>(
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
        ))
      }
      
      {
        upcoming &&
        rides.map(ride=>(
          <>
            {
              moment(ride.date).format() > moment(today).format() ?
              (
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
              ) : ""
            }
          </>
        ))
      }
      {
        past &&
        rides.map(ride=>(
          <>
            {
              moment(ride.date).format() < moment(today).format() ?
              (
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
              ) : ""
            }
          </>
        ))
      }
      
      
      
    </Layout>
  )
}

export async function getServerSideProps(){
  const {data} = await axios.get('https://assessment.api.vweb.app/rides')
  const user = await axios.get('https://assessment.api.vweb.app/user')
  var upcomingLength = 0 
  var pastLength = 0 
  var today = new Date();
  
  for(var i=0; i<data.length; i++){
    const distanceMesh = new Array()
    for(var j=0; j<data[i].station_path.length;j++){
      var distance = JSON.parse(data[i].station_path[j]) - JSON.parse(user.data.station_code)
      if(distance >= 0){
        distanceMesh.push(distance)
      }
    }
    data[i].distanceMesh = distanceMesh
    if(data[i].distanceMesh.length != 0){
      data[i].nearest = Math.min(...distanceMesh)
    }
    
  }
  var sortedData = data.slice().sort((a, b) => a.nearest - b.nearest);

  for(var i=0; i<data.length; i++){
    if(moment(data[i].date).format() > moment(today).format()){
      upcomingLength = upcomingLength + 1
    }
    if(moment(data[i].date).format() < moment(today).format()){
      pastLength = pastLength + 1
    }
  }

  const states = sortedData.map(item => item.state)
  .filter((value, index, self) => self.indexOf(value) === index)
  
  console.log(states.sort())
  // console.log(sortedData)
  // console.log(user.data.station_code)

  if(sortedData[0].nearest != Infinity){
    return {
      props: {
        rides: sortedData,
        user: user.data,
        upcomingLength,
        pastLength
      }
    }
  }

  
}
