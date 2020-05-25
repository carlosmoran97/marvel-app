import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComicCharacters from '../Comics/ComicCharacters';
import ComicStories from '../Comics/ComicStories';
import { loadComic, loadComicCharacters, loadComicStories, toggleComic } from '../../actions';
// Material ui
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

export default function ComicDetailPage(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    const comic = useSelector(state => state.entities.comics[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadComic(id));
        dispatch(loadComicCharacters(id));
        dispatch(loadComicStories(id));
        window.scrollTo(0, 0);
    }, [id]);

    const isFavorite = useSelector(state => state.favorites.comics.includes(parseInt(id)));
    const toggleFavorite = () => {
        dispatch(toggleComic(parseInt(id)));
    };

    return (
        <div className={classes.container}>
            {comic && (<div>
                <div className={classes.detailHeader}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={3}>
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={`${comic.title} image.`}
                                height={400}
                            />
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <Typography variant="h4">{comic.title} <IconButton onClick={toggleFavorite}>
                                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </IconButton></Typography>
                            <Typography variant="body1">{comic.description !== "" ? comic.description : "No description"}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <ComicTabs id={comic.id} />
            </div>)}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function ComicTabs({ id }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.tabRoot}>

            <Tabs value={value} onChange={handleChange} aria-label="characters and stories tabs" className={classes.tabs}>
                <Tab label="Characters" {...a11yProps(0)} />
                <Tab label="Stories" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ComicCharacters id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ComicStories id={id} />
            </TabPanel>
        </div>
    );
}