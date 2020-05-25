import React from 'react';
import Hero from '../../assets/hero.jpeg';
import { Card, CardHeader, CardContent, Grid, Avatar, Box, Typography } from "@material-ui/core";
import { Person, MenuBook, Favorite } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const size = 8;

const useStyle = makeStyles((theme)=>({
    root: {
        flexGrow: 1
    },
    avatar: {
        backgroundColor: 'transparent',
        height: theme.spacing(size),
        width: theme.spacing(size)
    },
    icon: {
        color: "#393939",
        backgroundColor: 'transparent',
        fontSize: theme.spacing(size)
    },
}));

export default function HomePage() {
    const classes = useStyle();
    return (
        <div>
            <div className="hero" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${Hero}")`
            }}>
                <div className="hero__text">
                    MARVEL APP
                </div>
            </div>
            <Box p={2}/>
            <Typography variant="h3" style={{textAlign: 'center'}}>
            MARVEL AT HOME
            </Typography>
            <Box p={1}/>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <Card>
                        <CardHeader
                            avatar={<Avatar className={classes.avatar}>
                                <Person className={classes.icon}/>
                            </Avatar>}
                        />
                        <CardContent>
                            <Typography variant="h4">
                                MARVEL CHARACTERS
                            </Typography>
                            <Typography variant="body2">
                            Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                <Card>
                        <CardHeader
                            avatar={<Avatar className={classes.avatar}>
                                <MenuBook className={classes.icon}/>
                            </Avatar>}
                        />
                        <CardContent>
                            <Typography variant="h4">
                                MARVEL COMICS
                            </Typography>
                            <Typography variant="body2">
                            Explore all the comics of your favorite marvel characters. Enjoy amazing stories
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                <Card>
                        <CardHeader
                            avatar={<Avatar className={classes.avatar}>
                                <Favorite className={classes.icon}/>
                            </Avatar>}
                        />
                        <CardContent>
                            <Typography variant="h4">
                                SAVE YOUR FAVORITES
                            </Typography>
                            <Typography variant="body2">
                            Save your favorite items, so you can easily come back to them later
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
