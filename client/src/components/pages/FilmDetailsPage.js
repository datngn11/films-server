import React from "react"

const FilmDetailsPage = ({film}) => {
  return (
    <div className="ui container grid">
      <div className="eight wide column row">
        <div className="eight wide column">
          <div className="ui fluid image">
            <img src={film.img} alt={film.title} />
          </div>
        </div>
        <div className="ui eight wide column list big">
          <div className="item">
            <h3 className="header">Title</h3>
            {film.title}
          </div>
          <div className="item">
            <h3 className="header">Director</h3>
            {film.director}
          </div>
          <div className="item">
            <h3 className="header">Duration</h3>
            {film.duration}
          </div>
          <div className="item">
            <h3 className="header">Budget</h3>
            {film.price}
          </div>
        </div>
      </div>
      <div className="eight wide column">
        <p>{film.description}</p>
      </div>
    </div>
  )
}

export default FilmDetailsPage
