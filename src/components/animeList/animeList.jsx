import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { WatchlistContext } from '../../context/ActionContext'
import { WatchingContext } from '../../context/WatchingContext'
import { FinishedContext } from '../../context/FinishedContext'
import { DroppedContext } from '../../context/DroppedContext'
import { AnimeContext } from '../../context/AnimeContext'
import { Spinner, Alert } from 'react-bootstrap'

export function AnimeList() {
    const { anime, setAnime, loading } = useContext(AnimeContext)
    const { watchlist, setWatchlist, setInLocalStorage } =
        useContext(WatchlistContext)
    const { watching, setWatching, setInLocalStorageWatching } =
        useContext(WatchingContext)
    const { finished, setFinished, setInLocalStorageFinished } =
        useContext(FinishedContext)
    const { dropped, setDropped, setInLocalStorageDropped } =
        useContext(DroppedContext)

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
        <div className="animeList">
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <ul>
                    {anime.map((animes) => (
                        <li key={animes.mal_id}>
                            <img src={animes.image_url} alt="" />
                            <h2>{animes.title}</h2>
                            <p>{animes.synopsis}</p>
                            <button
                                onClick={
                                    (setInLocalStorage(),
                                    () => {
                                        watchlistExist(animes.mal_id)
                                            ? alert(
                                                  'Anime is already in waitlist'
                                              )
                                            : setWatchlist((watchlist) => [
                                                  ...watchlist,
                                                  animes,
                                              ])
                                    })
                                }
                            >
                                Waitlist
                            </button>
                            <button
                                onClick={
                                    (setInLocalStorageWatching(),
                                    //make a function that calls these two function at the same time
                                    () => {
                                        watchingExist(animes.mal_id)
                                            ? alert(
                                                  'Anime is already in watching'
                                              )
                                            : setWatching((watching) => [
                                                  ...watching,
                                                  animes,
                                              ])
                                        droppedExist(animes.mal_id)
                                            ? deleteDropped(animes) &&
                                              deleteInLocalStorage(animes)
                                            : console.log('')
                                    })
                                }
                            >
                                Watching
                            </button>
                            <button
                                onClick={
                                    (setInLocalStorageFinished(),
                                    () => {
                                        finishedExist(animes.mal_id)
                                            ? alert(
                                                  'Anime is already in finished'
                                              )
                                            : setFinished((finished) => [
                                                  ...finished,
                                                  animes,
                                              ])
                                    })
                                }
                            >
                                Finished
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
