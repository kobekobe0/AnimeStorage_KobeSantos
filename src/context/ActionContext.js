import { createContext, useState } from 'react'

export const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(
        JSON.parse(localStorage.getItem('watchlist')) === null
            ? []
            : JSON.parse(localStorage.getItem('watchlist'))
    )

    let setInLocalStorage = () => {
        let watchlists = watchlist
        localStorage.setItem('watchlist', JSON.stringify(watchlists))
    }

    return (
        <WatchlistContext.Provider
            value={{ watchlist, setWatchlist, setInLocalStorage }}
        >
            {children}
        </WatchlistContext.Provider>
    )
}
