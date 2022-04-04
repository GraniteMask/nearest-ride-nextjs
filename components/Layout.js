import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {AppBar, Typography, Toolbar, Container, Link, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem, Box, IconButton, Drawer, Divider, List, ListItem, ListItemText} from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import axios from 'axios'


export default function Layout({title, description, children}) {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {darkMode, cart, userInfo} = state;
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
                main: '#f0c000',
            },
            secondary:{
                main: "#208080",
            }
        },
    })

    

    
 
    return (
        <div>
            <Head>
                <title>{title? `${title} - PictureLand 2.0`:'PictureLand 2.0'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" >
                    <Toolbar >
                        <Box display="flex" alignItems="center">
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography>
                                Edvora
                                </Typography>
                            </Link>
                        </NextLink>
                        </Box>

                        <div className="grow"></div>

                        <div>

                        </div>
                        
                        
                        
                    </Toolbar>
                </AppBar>
                <Container >
                    {children}
                </Container>
                <footer >
                    <Typography>
                        &copy; 2022 Edvora. All rights reserved. 
                    </Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}
