import { createContext, useState } from 'react'

export const DroppedContext = createContext()

export const DroppedProvider = ({ children }) => {
    const [dropped, setDropped] = useState(
        JSON.parse(localStorage.getItem('dropped')) === null
            ? []
            : JSON.parse(localStorage.getItem('dropped'))
    )

    let setInLocalStorageDropped = () => {
        let droppeds = dropped
        localStorage.setItem('dropped', JSON.stringify(droppeds))
    }

    return (
        <DroppedContext.Provider
            value={{ dropped, setDropped, setInLocalStorageDropped }}
        >
            {children}
        </DroppedContext.Provider>
    )
}
