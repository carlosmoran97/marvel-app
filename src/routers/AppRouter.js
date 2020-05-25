import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import CharactersPage from '../components/pages/CharactersPage';
import NotFoundPage from '../components/pages/NotFoundPage';
import CharacterDetailPage from '../components/pages/CharacterDetailPage';
import ComicsPage from '../components/pages/ComicsPage';
import ComicDetailPage from '../components/pages/ComicDetailPage';
import StoryDetailPage from '../components/pages/StoryDetailPage';
import FavoritesPage from '../components/pages/FavoritesPage';
import Nav from '../components/Nav';
import Header from '../components/Header';
import { MobileOpenContext } from '../context/mobileOpenContext';
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import history from "./history";
import ErrorMessage from "../components/ErrorMessage";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        maxWidth: 1440,
        margin: "0 auto"
    },
}));

export default function AppRouter() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Router history={history}>
            <div className={classes.root}>
                <CssBaseline />
                <MobileOpenContext.Provider value={{ mobileOpen, handleDrawerToggle }}>
                    <Header />
                    <Nav />
                    <ErrorMessage />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/" component={HomePage} exact />
                            <Route path="/characters" component={CharactersPage} exact />
                            <Route path="/characters/:id" component={CharacterDetailPage} />
                            <Route path="/comics" component={ComicsPage} exact />
                            <Route path="/comics/:id" component={ComicDetailPage} />
                            <Route path="/stories/:id" component={StoryDetailPage} />
                            <Route path="/favorites" component={FavoritesPage} />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </main>

                </MobileOpenContext.Provider>
            </div>

        </Router>
    );
}
