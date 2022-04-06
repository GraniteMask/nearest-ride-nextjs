import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {AppBar, Typography, Toolbar, Container, Link, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem, Box, IconButton, Drawer, Divider, List, ListItem, ListItemText, makeStyles} from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import { Avatar } from '@mui/material'
;


export default function Layout({title, description, name, imgUrl, children}) {
    
    
    const theme = createTheme({
        typography:{
            h1:{
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2:{
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            body1:{
                fontWeight: 'normal',
            },  
        },
        palette:{
            primary:{
                main: '#101010',
            },
            secondary:{
                main: "#ffffff",
            },
            background: {
                default: "#292929",
            },
        },
    })
    
 
    return (
        <div>
            <Head>
                <title>{title? title : 'Edvora Nearest Ride'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className="navbar">
                    <Toolbar >
                        <Box display="flex" alignItems="center">
                        <NextLink href="#" passHref>
                            <Link>
                                <Typography className="banner">
                                    Edvora
                                </Typography>
                            </Link>
                        </NextLink>
                        </Box>

                        <div className="grow"></div>

                        <div className="userName">
                            {name ? name : 'Ratnadeep'}
                        </div>
                        <div style={{marginLeft: "1rem"}}>
                            <Avatar src={imgUrl} />
                        </div>
                        
                        
                        
                        
                    </Toolbar>
                </AppBar>
                
                <div className="children" >
                    {children}
                </div>
                <footer className="footer">
                    <Typography>
                        &copy; 2022 Edvora. All rights reserved. 
                    </Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}


