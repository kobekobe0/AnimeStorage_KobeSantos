import React from 'react'
import { useState } from 'react'
import {
    Navbar,
    NavDropdown,
    Nav,
    Container,
    Modal,
    Button,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { WatchlistContext } from '../../context/ActionContext'
import { WatchingContext } from '../../context/WatchingContext'
import { FinishedContext } from '../../context/FinishedContext'
import { DroppedContext } from '../../context/DroppedContext'
import { AnimeContext } from '../../context/AnimeContext'
import { TextField } from '@material-ui/core'
import { Alert } from 'react-bootstrap'

export function Navs(props) {
    const { search, setSearch, getAnime, setLoading, setLoadingTrue } =
        useContext(AnimeContext)

    const { anime, setAnime, loading } = useContext(AnimeContext)
    console.log(anime)
    const { watchlist, setWatchlist, setInLocalStorage } =
        useContext(WatchlistContext)
    const { watching, setWatching, setInLocalStorageWatching } =
        useContext(WatchingContext)
    const { finished, setFinished, setInLocalStorageFinished } =
        useContext(FinishedContext)
    const { dropped, setDropped, setInLocalStorageDropped } =
        useContext(DroppedContext)

    const deleteResult = async () => {
        setAnime(anime.filter((x) => x.mal_id !== anime.mal_id))
    }

    const watchlistExist = (watchlists) => {
        return watchlist
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === watchlists
            })
    }
    const watchingExist = (watchings) => {
        return watching
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === watchings
            })
    }
    const finishedExist = (finisheds) => {
        return finished
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === finisheds
            })
    }
    const droppedExist = (droppeds) => {
        return dropped
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === droppeds
            })
    }
    const [show, setShow] = useState(false)
    console.log(show)

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
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div>
                            <form onSubmit={getAnime}>
                                <TextField
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    id="outlined-basic"
                                    label="search anime..."
                                    variant="outlined"
                                    value={search}
                                />
                            </form>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Alert show={show} variant="danger">
                    This is a alert—check it out!
                </Alert>
                <Modal.Body>
                    <h4>Search results</h4>
                    <div className="resultsWrapper">
                        <ul>
                            {anime.map((animes) => (
                                <li key={animes.mal_id}>
                                    <img src={animes.image_url} alt="" />
                                    <div className="info">
                                        <h2>{animes.title}</h2>
                                        <p>{animes.synopsis}</p>
                                        <Button
                                            size="sm"
                                            onClick={
                                                (setInLocalStorageFinished(),
                                                () => {
                                                    finishedExist(animes.mal_id)
                                                        ? alert(
                                                              'Anime is already in finished'
                                                          )
                                                        : setFinished(
                                                              (finished) => [
                                                                  ...finished,
                                                                  animes,
                                                              ]
                                                          )
                                                })
                                            }
                                            variant="outline-success"
                                        >
                                            Finished
                                        </Button>{' '}
                                        <Button
                                            size="sm"
                                            onClick={
                                                (setInLocalStorageWatching(),
                                                //make a function that calls these two function at the same time
                                                () => {
                                                    watchingExist(animes.mal_id)
                                                        ? alert(
                                                              'Anime is already in watching'
                                                          )
                                                        : setWatching(
                                                              (watching) => [
                                                                  ...watching,
                                                                  animes,
                                                              ]
                                                          )
                                                    droppedExist(animes.mal_id)
                                                        ? deleteDropped(
                                                              animes
                                                          ) &&
                                                          deleteInLocalStorage(
                                                              animes
                                                          )
                                                        : console.log('')
                                                })
                                            }
                                            variant="outline-primary"
                                        >
                                            Watching
                                        </Button>{' '}
                                        <Button
                                            size="sm"
                                            onClick={
                                                (setInLocalStorage(),
                                                () => {
                                                    watchlistExist(
                                                        animes.mal_id
                                                    )
                                                        ? alert(
                                                              'Anime is already in waitlist'
                                                          )
                                                        : setWatchlist(
                                                              (watchlist) => [
                                                                  ...watchlist,
                                                                  animes,
                                                              ]
                                                          )
                                                })
                                            }
                                            variant="outline-secondary"
                                        >
                                            Waitlist
                                        </Button>{' '}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
