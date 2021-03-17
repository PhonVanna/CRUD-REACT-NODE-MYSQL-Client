import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setMovieReviewList(response.data);
      });
  }, [])

  const submitReview = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review
    }).then(() => {
      alert('Successfully Inserted');
    });

    setMovieReviewList([
      ...movieReviewList, 
      {movieName: movieName, movieReview: review}
    ]);

    setMovieName('');
    setReview('');

  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie, 
      movieReview: newReview,
    });

    setNewReview('');
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <form>
          <label>Movie Name</label>
          <input 
            type="text" 
            name="movieName" 
            onChange={event => setMovieName(event.target.value)} />

          <label>Review</label>
          <input
            type="text" 
            name="review" 
            onChange={event => setReview(event.target.value)} />

          <button type="submit" onClick={submitReview}>Submit</button>
        </form>
      </div>

        { movieReviewList.map((val) => {
          return (
            <div className="card" key={val.id}>
              <h1>Movie: {val.movieName}</h1> 
              <p>{val.movieReview}</p>

              <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id="updatedInput" onChange={(e) => setNewReview(e.target.value)}/>
              <button type="submit" onClick={() => {updateReview(val.movieName)}}>Update</button>
            </div>
          )
        })}
    </div>
  );
}

export default App;
