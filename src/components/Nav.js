import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { Divider, List, Hidden, Drawer } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Person, MenuBook, Favorite } from "@material-ui/icons";
import { MobileOpenContext } from '../context/mobileOpenContext';
import ListItemLink from "./ListItemLink";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below appbar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
}))

export default function Nav() {

    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, handleDrawerToggle } = useContext(MobileOpenContext);
    const drawerContent = (
        <div>
            <div className={classes.toolbar}>
                
            </div>
            <Divider />
            <List>
                <ListItemLink 
                    icon={<Person />} 
                    to="/characters"
                    primary="Characters"
                />
                <ListItemLink 
                    icon={<MenuBook />} 
                    to="/comics"
                    primary="Comics"
                />
                <Divider />
                <ListItemLink 
                    icon={<Favorite />} 
                    to="/favorites"
                    primary="Favorites"
                />
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="characters, comics and favorites">
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                >
                    {drawerContent}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawerContent}
                </Drawer>
            </Hidden>
        </nav>
    );
}

/*
<NavLink activeClassName="is-active" to="/characters">Characters</NavLink>
            <NavLink activeClassName="is-active" to="/comics">Comics</NavLink>
            <NavLink activeClassName="is-active" to="/favorites">Favorites</NavLink>*/