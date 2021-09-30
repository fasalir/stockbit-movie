import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";

function MovieDetail() {
  const { movieId } = useParams();
  const apiKey = '877146d3';
  const [movieDetail, setMovieDetail] = useState(null);
  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = ()=>{
    axios.get('http://www.omdbapi.com', {
      params: {
        apikey: apiKey,
        i: movieId
      }
    })
    .then(function(response) {
      setMovieDetail(response.data);
    })
    .catch((e)=>{

    })
  }
  return (
    <div className="st-container">
      {
        movieDetail ?
        <div>
          <h2 className="font-white">{movieDetail.Title}</h2>
          <img src={movieDetail.Poster} />
          <p className="font-white">{movieDetail.Year} - {movieDetail.Rated} - {movieDetail.Runtime}</p>
          <p className="font-white">{movieDetail.Genre}</p>
          <p className="font-white">{movieDetail.Plot}</p>

          <label className="font-white" style={{fontWeight: 'bold'}}>Cast</label><br/>
          <label className="font-white">{movieDetail.Actors}</label>
          <br/>

          <label className="font-white" style={{fontWeight: 'bold'}}>Writer</label><br/>
          <label className="font-white">{movieDetail.Writer}</label>
          <br/>

          <label className="font-white" style={{fontWeight: 'bold'}}>Language</label><br/>
          <label className="font-white">{movieDetail.Language}</label>
          <br/>
        </div>
        :
        null
      }
    </div>
  );
}

export default MovieDetail;
