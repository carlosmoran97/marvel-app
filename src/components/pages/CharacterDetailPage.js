import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterComics from '../Characters/CharacterComics';
import CharacterStories from '../Characters/CharacterStories';
import { loadCharacter, loadCharacterComics, loadCharacterStories, toggleCharacter } from '../../actions';

// Material ui
import { Avatar, Grid, Typography, Tab, Tabs, IconButton } from "@material-ui/core";
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

export default function CharacterDetailPage(props) {

    const classes = useStyles();

    const id = props.match.params.id;
    let character = useSelector(state => state.entities.characters[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCharacter(id));
        dispatch(loadCharacterComics(id));
        dispatch(loadCharacterStories(id));
        window.scrollTo(0,0);
    }, [id]);

    const isFavorite = useSelector(state => state.favorites.characters.includes(parseInt(id)));
    const toggleFavorite = () => {
        dispatch(toggleCharacter(parseInt(id)));
    };

    return (
        <div className={classes.container}>
            {!character && <div>Loading...</div>}
            {character && (<div>
                <div className={classes.detailHeader}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={3}>
                            <Avatar
                                className={classes.avatar}
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            />
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <Typography variant="h4">{character.name} <IconButton onClick={toggleFavorite}>
                                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </IconButton></Typography>
                            <Typography variant="body1">{character.description !== "" ? character.description : "No description"}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <CharacterTabs id={character.id} />
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

function CharacterTabs({ id }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.tabRoot}>

            <Tabs value={value} onChange={handleChange} aria-label="comics and stories tabs" className={classes.tabs}>
                <Tab label="Comics" {...a11yProps(0)} />
                <Tab label="Stories" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <CharacterComics id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CharacterStories id={id} />
            </TabPanel>
        </div>
    );
}