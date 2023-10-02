import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

export const AppProvider = ({ children }) => {
    const [isLoading, setisLoading] = useState(true)
    const [movie, setMovie] = useState([])
    const [isError, setisError] = useState({ show: false, msg: "" })
    const [query, setQuery] = useState("titanic");
    const getMovie = async (url) => {
        // setisLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            if (data.Response === 'True') {
                setisLoading(false)
                setMovie(data.Search)
                setisError({
                    show: false,
                    msg: ""
                })
            } else {
                setisError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        let timeout = setTimeout(() => {
            getMovie(`${API_URL}&s=${query}`)
        }, 500);
        return () => clearTimeout(timeout)
    }, [query])
    return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
        {children}
    </AppContext.Provider>
}

// Custom Hook
export const useGlobalContext = () => {
    return useContext(AppContext)
}