import { createContext, useState } from 'react'

export const FinishedContext = createContext()

export const FinishedProvider = ({ children }) => {
    const [finished, setFinished] = useState(
        JSON.parse(localStorage.getItem('finished')) === null
            ? []
            : JSON.parse(localStorage.getItem('finished'))
    )

    let setInLocalStorageFinished = () => {
        let finisheds = finished
        localStorage.setItem('finished', JSON.stringify(finisheds))
    }

    return (
        <FinishedContext.Provider
            value={{ finished, setFinished, setInLocalStorageFinished }}
        >
            {children}
        </FinishedContext.Provider>
    )
}
