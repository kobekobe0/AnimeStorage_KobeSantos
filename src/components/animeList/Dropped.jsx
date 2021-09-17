import React, { useState } from 'react'
import { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import { DroppedContext } from '../../context/DroppedContext'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
const useStyles = makeStyles({
    root: {
        maxWidth: 205,
    },
})

function Dropped() {
    const classes = useStyles()
    const { dropped, setDropped } = useContext(DroppedContext)

    const deleteInLocalStorage = async (droppeds) => {
        const array = JSON.parse(localStorage.getItem('dropped'))
        localStorage.setItem(
            'dropped',
            JSON.stringify(array.filter((x) => x.mal_id !== droppeds.mal_id))
        )
    }

    const deleteDropped = async (droppeds) => {
        setDropped((prevDroppeds) =>
            prevDroppeds.filter((x) => x.mal_id !== droppeds.mal_id)
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
                <h2>Dropped</h2>
                <Badge pill bg="danger">
                    {dropped.length}
                </Badge>
            </div>
            <hr />
            <div className="watchlist">
                {dropped.map((dropped) => (
                    <div>
                        <Card className={classes.root}>
                            <Link
                                className="animeDetails-title"
                                to={`/dropped/${dropped.mal_id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="240"
                                        image={dropped.image_url}
                                        title={dropped.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {dropped.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                        deleteDropped(dropped) &&
                                        deleteInLocalStorage(dropped)
                                    }
                                >
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Dropped
