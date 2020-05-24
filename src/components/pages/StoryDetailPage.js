import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoryCharacters from '../Stories/StoryCharacters';
import StoryComics from '../Stories/StoryComics';

// Material ui
import { loadStory, loadStoryCharacters, loadStoryComics, toggleStory } from '../../actions';
import {  Grid, Typography, Tab, Tabs, IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../TabPanel";


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

export default function StoryDetailPage(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    let story = useSelector(state => state.entities.stories[id]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( loadStory(id) );
        dispatch( loadStoryCharacters(id) );
        dispatch( loadStoryComics(id) );
        window.scrollTo(0, 0);
    },[id]);
    const isFavorite = useSelector(state => state.favorites.stories.includes(parseInt(id)));
    const toggleFavorite = () => {
        dispatch(toggleStory(parseInt(id)));
    };
    return (
        <div>
            {story && <div>
                <h1>
                    {story.title}
                    <IconButton onClick={toggleFavorite}>
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </h1>
                <p>{story.description}</p>
                <StoryTabs id={story.id}/>
            </div>}
        </div>
    )
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function StoryTabs({ id }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.tabRoot}>

            <Tabs value={value} onChange={handleChange} aria-label="character and comics tabs" className={classes.tabs}>
                <Tab label="Characters" {...a11yProps(0)} />
                <Tab label="Comics" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <StoryCharacters id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <StoryComics id={id} />
            </TabPanel>
        </div>
    );
}