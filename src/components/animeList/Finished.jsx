import React, { useState } from 'react'
import { useContext } from 'react'
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
import { motion } from 'framer-motion'
const useStyles = makeStyles({
    root: {
        maxWidth: 205,
    },
})

function Finished() {
    const { finished, setFinished } = useContext(FinishedContext)

    const deleteInLocalStorage = async (finisheds) => {
        const array = JSON.parse(localStorage.getItem('finished'))
        localStorage.setItem(
            'finished',
            JSON.stringify(array.filter((x) => x.mal_id !== finisheds.mal_id))
        )
    }

    const deleteFinished = async (finisheds) => {
        setFinished((prevFinisheds) =>
            prevFinisheds.filter((x) => x.mal_id !== finisheds.mal_id)
        )
    }
    const classes = useStyles()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="action"
        >
            <div className="watchlistTitle">
                <h2>Finished</h2>
                <Badge pill bg="primary">
                    {finished.length}
                </Badge>
            </div>
            <hr />
            <div className="watchlist">
                {finished.map((finished) => (
                    <div>
                        <Card className={classes.root}>
                            <Link
                                className="animeDetails-title"
                                to={`/finished/${finished.mal_id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="240"
                                        image={finished.image_url}
                                        title={finished.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {finished.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                        deleteFinished(finished) &&
                                        deleteInLocalStorage(finished)
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

export default Finished
