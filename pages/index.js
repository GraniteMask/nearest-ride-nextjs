import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import {useRouter} from 'next/router'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Accordion, AccordionSummary, Button, Divider, List, Typography } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AccordionDetails, ListItem } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import RideCard from "../components/RideCard";


export default function Home(props) {
  const [ride, setRide] = useState('nearest');
  const [anchorEl, setAnchorEl] = useState(null);
  const [nearest, setNearest] = useState(true)
  const [upcoming, setUpcoming] = useState(false)
  const[newCities, SetNewCities] = useState([])
  const [past, setPast] = useState(false)
  const [chosenState, SetChosenState] = useState('')
  const [chosenCity, SetChosenCity] = useState('')
  const Router = useRouter()
  const {rides, user, upcomingLength, pastLength, states, city} = props
  const open = Boolean(anchorEl);
  var today = new Date();
  
  
  const StyledFilter = styled((props)=>(
    <Menu
      {...props}
    />
  ))(({theme}) => ({
    '& .MuiPaper-root':{
      width: "350px",
      backgroundColor: "#000000",
      borderRadius: "10px",
    },
  }))

  useEffect(()=>{
    if(rides){
      for(var i=0; i<rides.length; i++){
        if(rides[i].distanceMesh.length == 0){
          Router.reload()
        }
      }
    }
    
  },[])

  const handleChange = (event, newValue) => {
    setRide(newValue)
    // console.log(newValue)
      
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    console.log(e)
  };


  const chooseState = (e) => {
    setAnchorEl(null);
    // console.log(e)
    SetChosenState(e)
    SetNewCities([])
    SetChosenCity('')
  };

  const chooseCity = (e) => {
    setAnchorEl(null);
    // console.log(e)
    SetChosenCity(e)
  };

  useEffect(()=>{
    if(chosenState !== ''){
      
      for(var i=0; i<rides.length; i++){
        if(rides[i].state == chosenState){
          if(newCities.includes(rides[i].city) == false){
            newCities.push(rides[i].city)
          }
        }
      }
    } 
  },[chosenState])

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
                  width: "310px",
                  marginTop: "1rem",
                  textTransform: "none"
                }}>
                  <Typography>State</Typography>
                </AccordionSummary>   
                <AccordionDetails>
                  <List>
                    {
                      states && states.map(state=>(
                        <MenuItem key={Math.random()} value={state} onClick={()=>chooseState(state)} sx={{
                          borderRadius: "5px",
                        '&:hover': {
                          color: '#A5A5A5',
                        },
                        }}
                        
                        >
                          {state}
                        </MenuItem>
                      ))
                    }   
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
                  width: "310px",
                  marginTop: "0.5rem",
                  textTransform: "none"
                }}>
                  <Typography>City </Typography>
                </AccordionSummary>  
                <AccordionDetails>
                  <List>
                    {
                      city && chosenState == '' ? city.map(eachCity=>(
                        <MenuItem key={Math.random()} onClick={() => chooseCity(eachCity)} sx={{
                          borderRadius: "5px",
                        '&:hover': {
                          color: '#A5A5A5',
                        },
                        }}
                        >
                          {eachCity}
                        </MenuItem>
                      ))
                      :
                      newCities.length != 0 && chosenState != '' ?
                      newCities.map(eachCity=>(
                        <MenuItem key={Math.random()}  onClick={() => chooseCity(eachCity)} sx={{
                          borderRadius: "5px",
                        '&:hover': {
                          color: '#A5A5A5',
                        },
                        }}
                        >
                          {eachCity}
                        </MenuItem>
                      )) : ""
                    }
                    
                    
                  </List>        
                </AccordionDetails>
              </Accordion>
          </div>
        </StyledFilter>
        
      </Tabs>

      { nearest && chosenState == '' && chosenCity == ''&&
        rides.map(ride=>{
          console.log(ride)
            return(
              <RideCard ride={ride} key={ride.id}/>
            )
        })
      }
      { nearest && chosenState !== '' && chosenCity == '' &&
        rides.map(ride=>{

          if(ride.state == chosenState){
            console.log(ride)
            return(
              <RideCard ride={ride} key={ride.id}/>
            )
          }
          })
        }
        {
        nearest && chosenCity !== '' &&
        rides.map(ride=>{

          if(ride.city == chosenCity){
            console.log(ride)
            return(
              <RideCard ride={ride} key={ride.id}/>
            )
          }
          })
     
      }
      
      {
        upcoming && chosenState == '' && chosenCity == '' &&
        rides.map(ride=>(
          <>
            {
              moment(ride.date).format() > moment(today).format() ?
              (
                <RideCard ride={ride} key={ride.id}/>
              ) : ""
            }
          </>
        ))
      }
      {  upcoming && chosenState !== '' && chosenCity == '' &&
        rides.map(ride=>{
          
          if(moment(ride.date).format() > moment(today).format() && ride.state == chosenState) 
          return(
            <RideCard ride={ride} key={ride.id}/>
          ) 
       
      })
      }
      { upcoming && chosenCity !== '' &&
        rides.map(ride=>{
          
          if(moment(ride.date).format() > moment(today).format() && ride.city == chosenCity) 
          return(
            <RideCard ride={ride} key={ride.id}/>
          ) 
        })   
      }

      {
        past && chosenState == '' && chosenCity == '' &&
        rides.map(ride=>(
          <>
            {
              moment(ride.date).format() < moment(today).format() ?
              (
                <RideCard ride={ride} key={ride.id}/>
              ) : ""
            }
          </>
        ))
      }
      {  past && chosenState !== '' && chosenCity == '' &&
        rides.map(ride=>{
          
              if(moment(ride.date).format() < moment(today).format() && ride.state == chosenState) 
              return(
                <RideCard ride={ride} key={ride.id}/>
              ) 
           
        })
      }
      {
        past && chosenCity !== '' &&
        rides.map(ride=>{
          
              if(moment(ride.date).format() < moment(today).format() && ride.city == chosenCity) 
              return(
                <RideCard ride={ride} key={ride.id}/>
              ) 
        })
      }
      
      
      
    </Layout>
  )
}

export async function getServerSideProps(){
  try{
    const {data} = await axios.get(`${process.env.RIDE_API}`)
    const user = await axios.get(`${process.env.USER_API}`)
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
    const city = sortedData.map(item => item.city)
    .filter((value, index, self) => self.indexOf(value) === index)


    if(sortedData[0].nearest != Infinity){
      return {
        props: {
          rides: sortedData,
          user: user.data,
          upcomingLength,
          pastLength,
          states,
          city
        }
      }
    }

  }catch(err){
    console.log(err)
  }
}
