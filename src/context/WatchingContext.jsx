import { createContext, useState } from 'react'

export const WatchingContext = createContext()

export const WatchingProvider = ({ children }) => {
    const [watching, setWatching] = useState(
        JSON.parse(localStorage.getItem('watching')) === null
            ? []
            : JSON.parse(localStorage.getItem('watching'))
    )

    let setInLocalStorageWatching = () => {
        let watchings = watching
        localStorage.setItem('watching', JSON.stringify(watchings))
    }

    return (
        <WatchingContext.Provider
            value={{ watching, setWatching, setInLocalStorageWatching }}
        >
            {children}
        </WatchingContext.Provider>
    )
}
