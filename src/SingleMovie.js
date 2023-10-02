import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from './context'
import { NavLink } from 'react-router-dom'

function SingleMovie() {
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [isError, setisError] = useState({ show: true, msg: "" })

  const getMovie = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data.Response === 'True') {
        setisLoading(false)
        setMovie(data)
        setisError({
          show: false,
          msg: ""
      })
      } else {
        setisError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let timeout = setTimeout(() => {
      getMovie(`${API_URL}&i=${id}`)
    }, 500);
    return () => clearTimeout(timeout)
  }, [id])
  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default SingleMovie
