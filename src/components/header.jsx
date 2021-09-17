import React, { useContext } from 'react'
import { AnimeContext } from '../context/AnimeContext'
import './header.css'

export function Header() {
    //const { handleSearch } = useContext(AnimeContext)
    const { search, setSearch, getAnime, setLoading, setLoadingTrue } =
        useContext(AnimeContext)

    return (
        <div className="header">
            <h1>Search</h1>
            <form onSubmit={getAnime}>
                <input
                    onChange={(event) => setSearch(event.target.value)}
                    type="search"
                    placeholder="search anime"
                    value={search}
                />
            </form>
        </div>
    )
}
