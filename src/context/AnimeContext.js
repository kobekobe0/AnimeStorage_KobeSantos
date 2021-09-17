import { createContext, useState } from 'react'
import Axios from 'axios'

export const AnimeContext = createContext()

export const AnimeProvider = ({ children }) => {
    const [anime, setAnime] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    console.log(anime)

    const getAnime = (e) => {
        e.preventDefault()
        Axios.get(
            `https://api.jikan.moe/v3/search/anime?q=${search}&order_by=title&sort=asc&limit=20`
        ).then((response) => {
            setAnime(response.data.results)
        })
        setLoading(false)
    }

    return (
        <AnimeContext.Provider
            value={{ anime, setAnime, search, setSearch, getAnime }}
        >
            {children}
        </AnimeContext.Provider>
    )
}
