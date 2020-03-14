import React, {useState, useEffect} from "react"
import {Route} from "react-router-dom"
import _orderBy from "lodash/orderBy"
import _find from "lodash/find"
import FilmsList from "../films/FilmsList"
import FilmForm from "../forms/FilmForm"
import FilmContext from "../context/FilmContext"
import api from "../../api"
import Spinner from "../spinner/Spinner"
import FilmDetailsPage from "./FilmDetailsPage"
import AdminRoute from "../AdminRoute"

const FilmsPage = ({user, history, location}) => {
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.films.fetchAll().then(films => {
      setFilms(sortFilms(films))
      setIsLoading(false)
    })
  }, [])

  const sortFilms = films =>
    _orderBy(films, ["featured", "title"], ["desc", "asc"])

  const toggleFeatured = id => e => {
    const film = _find(films, {_id: id})
    updateFilm({...film, featured: !film.featured})
  }

  const saveFilm = film =>
    (film._id === null ? addFilm(film) : updateFilm(film)).then(() =>
      history.push("/films"),
    )

  const addFilm = filmData =>
    api.films
      .create(filmData)
      .then(film => setFilms(sortFilms([...films, film])))

  const updateFilm = filmData =>
    api.films
      .update(filmData)
      .then(film =>
        setFilms(sortFilms(films.map(f => (f._id === film._id ? film : f)))),
      )

  const deleteFilm = film => e =>
    api.films.delete(film).then(() => {
      setFilms(films.filter(f => f._id !== film._id))
    })

  const cols = location.pathname === "/films" ? "sixteen" : "ten"
  return (
    <FilmContext.Provider
      value={{
        toggleFeatured: toggleFeatured,
        deleteFilm: deleteFilm,
        user,
      }}
    >
      <div className="ui container">
        <AdminRoute
          path="/films/new"
          render={() => (
            <div className="six wide column">
              <FilmForm saveFilm={saveFilm} film={{}} />
            </div>
          )}
        />
        <AdminRoute
          path="/films/edit/:_id"
          render={props => (
            <div className="six wide column">
              <FilmForm
                saveFilm={saveFilm}
                film={_find(films, {_id: props.match.params._id}) || {}}
              />
            </div>
          )}
        />

        {isLoading ? (
          <Spinner />
        ) : (
          <Route exact path="/films" className={`${cols} wide column`}>
            <FilmsList films={films} />
          </Route>
        )}

        {user.token && user.role === "user" && (
          <Route
            exact
            path="/films/details/:_id"
            render={props => (
              <FilmDetailsPage
                film={_find(films, {_id: props.match.params._id}) || {}}
              />
            )}
          />
        )}
      </div>
    </FilmContext.Provider>
  )
}

export default FilmsPage
