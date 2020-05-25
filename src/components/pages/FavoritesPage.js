import React from 'react';
import FavoriteCharacters from '../Characters/FavoriteCharacters';
import FavoriteComics from '../Comics/FavoriteComics';
import FavoriteStories from '../Stories/FavoriteStories';
import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "../TabPanel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    detailHeader: {
        flexGrow: 1,
        margin: theme.spacing(5)
    },
    container: {
        maxWidth: 1440,
    },
    avatar: {
        width: theme.spacing(24),
        height: theme.spacing(24)
    },
    tabs: {
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    }
}));


export default function FavoritesPage() {
    
    return (
        <div>
            <h1>Favorite items</h1>
            <FavoriteTabs />
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function FavoriteTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.tabRoot}>

            <Tabs value={value} onChange={handleChange} aria-label="favorite character, comics and stories tabs" className={classes.tabs}>
                <Tab label="Characters" {...a11yProps(0)} />
                <Tab label="Comics" {...a11yProps(1)} />
                <Tab label="Stories" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <FavoriteCharacters />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FavoriteComics />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FavoriteStories />
            </TabPanel>
        </div>
    );
}