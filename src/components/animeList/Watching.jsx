import React, { useState } from 'react'
import { useContext } from 'react'
import { WatchingContext } from '../../context/WatchingContext'

import { DroppedContext } from '../../context/DroppedContext'
import { FinishedContext } from '../../context/FinishedContext'
import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Theme } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { motion } from 'framer-motion'
const useStyles = makeStyles({
    root: {
        maxWidth: 205,
    },
    success: {
        color: 'green',
    },
})

function Watching() {
    const classes = useStyles()

    const { watching, setWatching } = useContext(WatchingContext)
    const { dropped, setDropped, setInLocalStorageDropped } =
        useContext(DroppedContext)
    const { finished, setFinished, setInLocalStorageFinished } =
        useContext(FinishedContext)
    const [hovered, setHovered] = useState(false)
    const toggleHover = () => setHovered(!hovered)
    console.log(hovered)

    const DroppedExist = (droppeds) => {
        return dropped
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === droppeds
            })
    }
    const FinishedExist = (droppeds) => {
        return finished
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === droppeds
            })
    }

    const deleteInLocalStorage = async (watchings) => {
        const array = JSON.parse(localStorage.getItem('watching'))
        localStorage.setItem(
            'watching',
            JSON.stringify(array.filter((x) => x.mal_id !== watchings.mal_id))
        )
    }

    const deleteWatching = async (watchings) => {
        setWatching((prevWatchings) =>
            prevWatchings.filter((x) => x.mal_id !== watchings.mal_id)
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="action"
        >
            <div className="watchlistTitle">
                <h2>Watching</h2>
                <Badge pill bg="success">
                    {watching.length}
                </Badge>
            </div>
            <hr />
            <div className="watchlist">
                {watching.map((watching) => (
                    <div>
                        <Card id="watchingCard" className={classes.root}>
                            <Link
                                className="animeDetails-title"
                                to={`/watching/${watching.mal_id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="200"
                                        image={watching.image_url}
                                        title={watching.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {watching.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                        deleteWatching(watching) &&
                                        deleteInLocalStorage(watching)
                                    }
                                >
                                    Remove
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    classes={{ root: classes.success }}
                                    onClick={
                                        (setInLocalStorageFinished(),
                                        () => {
                                            FinishedExist(watching.mal_id)
                                                ? deleteWatching(watching) &&
                                                  deleteInLocalStorage(watching)
                                                : deleteWatching(watching) &&
                                                  deleteInLocalStorage(
                                                      watching
                                                  ) &&
                                                  setFinished((dropped) => [
                                                      ...dropped,
                                                      watching,
                                                  ])
                                        })
                                    }
                                >
                                    Finished
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={
                                        (setInLocalStorageDropped(),
                                        () => {
                                            DroppedExist(watching.mal_id)
                                                ? alert(
                                                      'Object found inside the array.'
                                                  )
                                                : deleteWatching(watching) &&
                                                  deleteInLocalStorage(
                                                      watching
                                                  ) &&
                                                  setDropped((dropped) => [
                                                      ...dropped,
                                                      watching,
                                                  ])
                                        })
                                    }
                                >
                                    Drop
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Watching
