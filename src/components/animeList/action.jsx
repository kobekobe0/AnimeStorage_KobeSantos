import React, { useState } from 'react'
import { useContext } from 'react'
import { WatchlistContext } from '../../context/ActionContext'
import { Link } from 'react-router-dom'
import './watchlist.css'
import { Badge } from 'react-bootstrap'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { WatchingContext } from '../../context/WatchingContext'
import { motion } from 'framer-motion'
const useStyles = makeStyles({
    root: {
        maxWidth: 205,
    },
})

export function Watchlist() {
    const classes = useStyles()
    const { watchlist, setWatchlist } = useContext(WatchlistContext)

    const deleteInLocalStorage = async (watchlists) => {
        const array = JSON.parse(localStorage.getItem('watchlist'))
        localStorage.setItem(
            'watchlist',
            JSON.stringify(array.filter((x) => x.mal_id !== watchlists.mal_id))
        )
    }

    const deleteWatchlist = async (watchlists) => {
        setWatchlist((prevWatchlists) =>
            prevWatchlists.filter((x) => x.mal_id !== watchlists.mal_id)
        )
    }

    const { watching, setWatching, setInLocalStorageWatching } =
        useContext(WatchingContext)

    const WatchingExist = (droppeds) => {
        return watching
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === droppeds
            })
    }

    const changeColor = () => {}
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="action"
        >
            <div className="watchlistTitle">
                <h2>Waitlist</h2>
                <Badge pill bg="secondary">
                    {watchlist.length}
                </Badge>
            </div>
            <hr />
            <div className="watchlist">
                {watchlist.map((watchlist) => (
                    <div>
                        <Card className={classes.root}>
                            <Link
                                className="animeDetails-title"
                                to={`/waitlist/${watchlist.mal_id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="200"
                                        image={watchlist.image_url}
                                        title={watchlist.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {watchlist.title}

                                            <p>{watchlist.score}</p>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {watchlist.synopsis.substring(
                                                0,
                                                120
                                            ) + '...'}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                        deleteWatchlist(watchlist) &&
                                        deleteInLocalStorage(watchlist)
                                    }
                                >
                                    Remove
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={
                                        (setInLocalStorageWatching(),
                                        () => {
                                            WatchingExist(watchlist.mal_id)
                                                ? deleteWatchlist(watchlist) &&
                                                  deleteInLocalStorage(
                                                      watchlist
                                                  )
                                                : deleteWatchlist(watchlist) &&
                                                  deleteInLocalStorage(
                                                      watchlist
                                                  ) &&
                                                  setWatching((watching) => [
                                                      ...watching,
                                                      watchlist,
                                                  ])
                                        })
                                    }
                                >
                                    Start watching
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
