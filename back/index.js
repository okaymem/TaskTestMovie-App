import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzBmN2M5YWIzMGVhYmJhMjJjYzljMmI1YzU0Nzg2NSIsInN1YiI6IjY2MmUzMjMzNWE3ODg0MDEyYWMxZDA2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sr55JRj7UFyR5b8mMKmnXOwUDfkSGkiL6SbFSwNq8B8'
  }
};

const app = express();


app.use(cors());

app.get('/', async (req, res) => {
   try {
    let page;
    let rateFrom;
    let rateTo;
    let year;
    let genre;
    let sortby;
    console.log(req.query);

    if (req.query.page!==''){
       page = req.query.page
    } else { page = 1}

    if (req.query.rateFrom!==''){
      rateFrom =`&vote_average.gte=${req.query.rateFrom}`
    } else {rateFrom = ''}

    if (req.query.rateTo!==''){
      rateTo =`&vote_average.lte=${req.query.rateTo}`
    } else {rateTo = ''}

    if (req.query.year!==''){
      year =`&year=${req.query.year}`
    } else {year = ''}

    if (req.query.sortby!==''){
      sortby =`&sort_by=${req.query.sortby}`
    } else {sortby = ''}

    if (req.query.genre!==''){
      genre =`&with_genres=${req.query.genre}`
    } else {genre = ''}
    
     const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${rateFrom}${rateTo}${genre}${year}${sortby}`, options);
     const jsonData = await response.json();
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.json(jsonData);
     
   } catch (error) {
     console.error('Error:', error);
   }
});

app.get('/getgenres', async (req, res) => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    
    const genres = await response.json();
    console.log(genres)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(genres);
    
  } catch (error) {
    console.error('Error:', error);
  }
});

app.get('/getmoviedata', async (req, res) => {
try{
  let id = req.query.id
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`, options)
 const movieInfo = await response.json()
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(movieInfo);
} catch (error) {
  console.error('Error:', error);
}
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});