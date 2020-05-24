import React, { useContext } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { MobileOpenContext } from "../context/mobileOpenContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        backgroundColor: "#393939"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
    },
}));

export default function Header() {
    const { handleDrawerToggle } = useContext(MobileOpenContext);
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap>
                    <Link to="/" style={{color: "white", textDecoration: "none"}}>MarvelApp</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
