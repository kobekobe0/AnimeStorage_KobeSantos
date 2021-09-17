import React from 'react'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { WatchlistContext } from '../../context/ActionContext'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { FiChevronLeft } from 'react-icons/fi'
import { Button, CardMedia } from '@material-ui/core'

import './anime.css'

export function TopAnimeDetails({ match }) {
    const { watchlist, setWatchlist, setInLocalStorage } =
        useContext(WatchlistContext)
    const watchlistExist = (watchlists) => {
        return watchlist
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === watchlists
            })
    }
    useEffect(() => {
        getAnime()
    }, [])
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    const getAnime = async () => {
        const getItem = await fetch(
            `https://api.jikan.moe/v3/anime/${match.params.id}`
        )
            .then((res) => res.json())
            .then((res) => setItem(res))

        setLoading(true)
    }
    console.log(item)
    return (
        <div className="detailsWrapper">
            {loading ? (
                <div className="animeDetails">
                    <div className="close">
                        <FiChevronLeft
                            className="backButton"
                            size={40}
                            onClick={() => history.goBack()}
                        />
                    </div>

                    <div className="img">
                        <img src={item.image_url} alt="" />{' '}
                    </div>

                    <div className="info">
                        <h1>{item.title}</h1>
                        <h2>{item.title_japanese}</h2>
                        <hr />
                        <h3>Score: {item.score}</h3>
                        <h3>Popularity: #{item.popularity}</h3>
                        <h3>Rank: #{item.rank}</h3>
                        <hr />
                        <h3>
                            Studio/s:{' '}
                            {item.studios?.map((studio) => (
                                <h3>{studio.name}</h3>
                            ))}
                        </h3>

                        <h5>
                            Genre:{'   '}
                            {item.genres?.map((genre) => (
                                <h5 key={genre.mal_id}>{genre.name},</h5>
                            ))}
                        </h5>
                        <Button
                            color="primary"
                            onClick={
                                (setInLocalStorage(),
                                () => {
                                    watchlistExist(item.mal_id)
                                        ? alert('Anime is already in waitlist')
                                        : setWatchlist((watchlist) => [
                                              ...watchlist,
                                              item,
                                          ])
                                })
                            }
                        >
                            Add to waitlist
                        </Button>
                    </div>

                    <div className="synopsis">
                        <hr />
                        <p>{item.synopsis}</p>
                        <h4>Episode: {item.episodes}</h4>
                        <hr />
                        <h5>Status: {item.status}</h5>
                        <hr />
                        <h5>Premiered: {item.premiered}</h5>
                    </div>
                </div>
            ) : (
                <Spinner classAnime="loader" animation="border" />
            )}
        </div>
    )
}
