import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button, CardMedia } from '@material-ui/core'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { WatchlistContext } from '../../context/ActionContext'

export function Home() {
    const [topAnime, setTopAnime] = useState([])
    const [airing, setAiring] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const { watchlist, setWatchlist, setInLocalStorage } =
        useContext(WatchlistContext)
    const topUrl = 'https://api.jikan.moe/v3/top/anime/1/bypopularity'
    const airingUrl = 'https://api.jikan.moe/v3/top/anime/1/airing'
    const upcomingUrl = 'https://api.jikan.moe/v3/season/later'
    const facebook = 'facebook.com'

    console.log(topAnime)

    const getAnime = async () => {
        await fetch(topUrl)
            .then((res) => res.json())
            .then((res) => setTopAnime(res.top.splice(0, 50)))
    }
    const getUpcoming = async () => {
        await fetch(upcomingUrl)
            .then((res) => res.json())
            .then((res) => setUpcoming(res.anime.splice(0, 200)))
    }
    const getAnimeAiring = async () => {
        await fetch(airingUrl)
            .then((res) => res.json())
            .then((res) => setAiring(res.top.splice(0, 15)))
    }
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const watchlistExist = (watchlists) => {
        return watchlist
            .map((temp) => temp.mal_id)
            .some(function (el) {
                return el === watchlists
            })
    }
    console.log(airing)
    useEffect(() => {
        getAnime()
        getAnimeAiring()
        getUpcoming()
    }, [])
    console.log(upcoming)
    return (
        <div className="homeWrapper">
            <div className="homeHeader">
                <h1>ANIME.</h1>
            </div>

            <div className="topAnime">
                <h2 style={{ color: 'white' }}>Top Anime</h2>
                <hr style={{ color: 'white' }} />
                {topAnime.map((top) => (
                    <Link
                        style={{
                            textDecoration: 'none',

                            color: 'white',
                        }}
                        className="animeDetails-title"
                        to={`/topanime/${top.mal_id}`}
                    >
                        <h4>
                            {top.rank}. {top.title}
                        </h4>
                    </Link>
                ))}
            </div>
            <div className="animeList">
                <h4 style={{ color: 'white', marginTop: '1rem' }}>
                    Currently Airing
                </h4>
                <div className="airing">
                    {airing.map((air) => (
                        <div className="airingCard">
                            <img src={air.image_url} alt={air.title} />
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    color: 'black',
                                    textAlign: 'center',
                                }}
                                className="animeDetails-title"
                                to={`/currentlyairing/${air.mal_id}`}
                            >
                                <p style={{ color: 'white' }}>
                                    {air.title.substring(0, 16)}...
                                </p>

                                <Button
                                    style={{
                                        fontSize: '10px',
                                        margin: '0',
                                        padding: '0',
                                        color: 'white',
                                    }}
                                    color="danger"
                                >
                                    see more details
                                </Button>
                            </Link>
                            <Button
                                onClick={
                                    (setInLocalStorage(),
                                    () => {
                                        watchlistExist(airing.mal_id)
                                            ? alert(
                                                  'Anime is already in  waitlist'
                                              )
                                            : setWatchlist((watchlist) => [
                                                  ...watchlist,
                                                  airing,
                                              ])
                                    })
                                }
                                size="small"
                                color="primary"
                            >
                                Add to waitlist
                            </Button>
                        </div>
                    ))}{' '}
                </div>
            </div>
            <div className="news">
                <h2 style={{ color: 'white', marginLeft: '1rem' }}>
                    Upcoming Anime
                </h2>
                <hr style={{ color: 'white' }} />
                <div className="upcomingWrapper">
                    {upcoming.map((upcoming) => (
                        <div className="upcomingList">
                            <img src={upcoming.image_url} href={upcoming.url} />
                        </div>
                    ))}
                </div>
                <hr />
            </div>
            <div className="footer">
                <div className="socmed">
                    <a href={facebook}>
                        <FaFacebook className="socmedItem" size={60} />
                    </a>

                    <FaInstagram
                        onClick={() => openInNewTab('https://facebook.com')}
                        className="socmedItem"
                        size={60}
                    />
                    <FaTwitter className="socmedItem" size={60} />
                </div>
                <p>
                    Email me at:{' '}
                    <span style={{ textDecoration: 'underline' }}>
                        kobe0santos0@gmail.com
                    </span>
                </p>
            </div>
        </div>
    )
}
