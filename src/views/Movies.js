import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";
import Modal from "./../components/Modal";

import { useSelector, useDispatch } from 'react-redux'
import { setSearchStore } from './../redux/searchSlice'

function Movies() {
  const searchStore = useSelector((state) => state.search.value)
  const dispatch = useDispatch()

  const apiKey = '877146d3';
  const [movies, setMovies] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [showmodal, setShowmodal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = (suggestion)=>{
    if(suggestion === 0 && page > 1 && page > Math.ceil(totalResults/10)){ // Check if page is max
      // NOOP
    }else{
      axios.get('https://www.omdbapi.com', {
        params: {
          apikey: apiKey,
          s: searchString,
          page: page
        }
      })
      .then(function(response) {
        if(suggestion){
          if(response.data.Response === 'True'){
            setSuggestion(response.data.Search);
          }
        }else{
          if(response.data.Response === 'True'){
            if(page > 1){ // Append to current list
              let joined = movies.concat(response.data.Search);
              setMovies(joined);
            }else{
              setMovies(response.data.Search);
            }
            setSuggestion([]);
            setTotalResults(response.data.totalResults);
          }else{
            setMovies([]);
            setTotalResults(0);
          }
        }
      })
      .catch((e)=>{

      })
    }
    setLoading(false);
  }

  // Initialize movies
  useEffect(() => {
    getMovies(0);
  }, []);

  // Listening for searchString
  // If searchString length more than 3 chars, request suggestion
  useEffect(() => {
    if(searchString && searchString.length >= 3){
      getMovies(1);
    }else{
      setSuggestion([]);
    }
  }, [searchString]);

  const changeSearch = (e)=> {
    setSearchString(e.target.value)
  }

  // Click on image 
  const selectImage = (url)=> {
    setShowmodal(true);
    setSelectedImage(url);
  }

  // Listening on scroll
  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage(page+1);
      setTimeout(()=> {
        if(page > Math.ceil(totalResults/10)){
          // NOOP
        }else{
          getMovies(0);
        }
      },500);
    }
  }

  // Handle click button search
  const onclickSearch = ()=> {
    getMovies(0);
    dispatch(setSearchStore(searchString))
  }

  return (
    <div className="st-container">
      <div>
        <div className="st-header">
          <input 
          type="text" 
          className="form-control"
          value={searchString} 
          onChange={changeSearch}
          placeholder="Search movie"/>
          <button onClick={()=> onclickSearch()} className="btn btn-secondary">Search</button>
        </div>
        {
          suggestion.length > 0 ?
            <div className="item-suggestion">
              {
                suggestion.map((item, idx)=>
                  <Link key={idx+'__'} to={'/detail/'+item.imdbID}>
                    <div className="suggestion-title">
                      <span>{item.Title}</span>
                    </div>
                  </Link>
                )
              }
            </div>
            :
            null
        }
      </div>
      {
        loading ? 
        <label style={{color: 'white'}}>Loading</label>
        :
        <div style={{marginTop: '24px'}}>
          {
            movies.length > 0 ?
              <div>
                <p style={{marginBottom: '24px', color: 'white'}}>Showing result for {searchStore}</p>
                {
                  movies.map((item, idx)=>
                    <div key={idx+'_'} className="movie-item row">
                      <div className="col-md-3">
                        <img src={item.Poster} onClick={()=> selectImage(item.Poster)} style={{maxHeight: '350px', cursor: 'pointer'}} />
                      </div>
                      <div className="col-md-9" style={{paddingLeft: '16px'}}>
                        <Link to={'/detail/'+item.imdbID} style={{color: 'gray'}}><b>{item.Title}</b></Link><br/>
                        <span style={{color: 'gray'}}>{item.Year}</span>
                      </div>
                    </div>
                  )
                }
              </div>
              :
              <label style={{color: 'white'}}>No movie found</label>
          }
        </div>
      }

      
      <Modal show={showmodal}>
        <div onClick={()=> setShowmodal(false)} className="st-modal-1"></div>
        <img src={selectedImage} style={{position: 'relative', zIndex: 10}}/>
      </Modal>
    </div>
  );
}

export default Movies;