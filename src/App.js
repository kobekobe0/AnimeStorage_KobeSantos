import './App.css'
import { BiMenu } from 'react-icons/bi'
import React from 'react'
import { Watchlist } from './components/animeList/action'
import { AnimeList } from './components/animeList/animeList'
import { Header } from './components/header'
import { WatchlistProvider } from './context/ActionContext'
import { WatchingProvider } from './context/WatchingContext'
import { FinishedProvider } from './context/FinishedContext'
import { DroppedProvider } from './context/DroppedContext'
import { AnimeProvider } from './context/AnimeContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SideNav from './components/sidenav/SideNav'
import Watching from './components/animeList/Watching'
import Finished from './components/animeList/Finished'
import Dropped from './components/animeList/Dropped'
import { DetailsWaitlist } from './components/Animedetailscomponent/AnimeDetails'
import { Navs } from './components/sidenav/boot'
import { Button } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import { Home } from './components/animeList/home'
import { motion } from 'framer-motion'
import { TopAnimeDetails } from './components/Animedetailscomponent/TopAnimeDetails'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [modalShow, setModalShow] = React.useState(false)
    const [nav, setNav] = React.useState(false)

    const handleHide = () => setNav(false)
    return (
        <div className="App">
            <Router>
                <AnimeProvider>
                    <WatchlistProvider>
                        <WatchingProvider>
                            <FinishedProvider>
                                <DroppedProvider>
                                    <div className="pageContainer">
                                        <div
                                            className="sidebar"
                                            id={nav ? 'hidden' : ''}
                                        >
                                            <SideNav handleHide={handleHide} />
                                        </div>
                                        <div className="main">
                                            <Switch>
                                                <Route
                                                    path="/topanime/:id"
                                                    exact
                                                    component={TopAnimeDetails}
                                                />
                                                <Route
                                                    path="/currentlyairing/:id"
                                                    exact
                                                    component={TopAnimeDetails}
                                                />
                                                <Route
                                                    path="/waitlist"
                                                    exact
                                                    component={Watchlist}
                                                />

                                                <Route
                                                    path="/watching"
                                                    exact
                                                    component={Watching}
                                                />

                                                <Route
                                                    path="/finished"
                                                    exact
                                                    component={Finished}
                                                />
                                                <Route
                                                    path="/dropped"
                                                    exact
                                                    component={Dropped}
                                                />
                                                <Route
                                                    path="/waitlist/:id"
                                                    component={DetailsWaitlist}
                                                />
                                                <Route
                                                    path="/watching/:id"
                                                    component={DetailsWaitlist}
                                                />
                                                <Route
                                                    path="/finished/:id"
                                                    component={DetailsWaitlist}
                                                />
                                                <Route
                                                    path="/dropped/:id"
                                                    component={DetailsWaitlist}
                                                />
                                                <Route
                                                    path="/"
                                                    exact
                                                    component={Home}
                                                />
                                            </Switch>
                                        </div>
                                        <div className="header">
                                            <BiMenu
                                                className="menuButton"
                                                size={50}
                                                onClick={() => setNav(!nav)}
                                            />
                                            <Button
                                                className="searchButton"
                                                variant="success"
                                                onClick={() =>
                                                    setModalShow(true)
                                                }
                                            >
                                                Search <FiSearch size={25} />
                                            </Button>
                                        </div>
                                        <Navs
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>{' '}
                                </DroppedProvider>
                            </FinishedProvider>
                        </WatchingProvider>
                    </WatchlistProvider>
                </AnimeProvider>
            </Router>{' '}
        </div>
    )
}

export default App
