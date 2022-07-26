import styled from "styled-components";
import axios from "axios";
import {useEffect, useRef, useState} from "react";

const Container = styled.div`
  min-height: 100vh;
  background-color: #22254b;

  .header {
    padding: 20px;
    background-color: #373b69;
    text-align: right;

    input {
      padding: 10px;
      border-radius: 20px;
      font-size: 18px;
      font-weight: 700;
      outline: none;
      border: 2px solid #22254b;
      background-color: transparent;
      color: #fff;
    }

    input:focus {
      background-color: #22254b;
    }
  }

  .movies-container {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    align-items: center;
    flex-wrap: wrap;

    .movie {
      width: 300px;
      min-height: 540px;
      border-radius: 6px;
      background-color: #373b69;
      overflow: hidden;

      img {
        display: block;
        max-width: 100%;
      }

      &-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: 10px;

        .name {
          color: #fff;
        }

        .scores {
          background-color: #22254b;
          font-weight: 700;
          font-size: 21px;
          padding: 6px;
          border-radius: 10px;

          &-green {
            color: lightgreen;
          }

          &-orange {
            color: orange;
          }

          &-red {
            color: red;
          }
        }
      }
    }
  }
`;

interface IMovie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

export default function MovieApp() {
    const [arrMovie, setArrMovie] = useState<IMovie[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('')
    let urlApi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
    const typingSearchTime = useRef() as React.MutableRefObject<any>;

    useEffect(() => {
        getApiMovie(urlApi);
    }, [])

    const getApiMovie = async (url: string) => {
        try {
            let apis = await axios(url);
            console.log(apis.data.results);
            setArrMovie(apis.data.results);
        } catch (err) {
            console.log(err)
        }
    }

    const searchMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setSearchTerm(e.target.value);
        let searchApiMovie = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="${value}"`
        if (typingSearchTime.current) {
            clearTimeout(typingSearchTime.current);
        }
        typingSearchTime.current = setTimeout(() => {
            if (value == "") {
                console.log(searchTerm)
                getApiMovie(urlApi)
            } else {
                getApiMovie(searchApiMovie)
            }
        }, 500);
    }

    return (
        <>
            <Container>
                <div className="header">
                    <input type="search" value={searchTerm} onChange={(e) => searchMovie(e)} placeholder="Search ..."/>
                </div>
                <div className="movies-container">
                    {
                        arrMovie.map(movie => (
                            <div className="movie" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} alt=""/>
                                <div className="movie-info">
                                    <h2 className="name">{movie.title}</h2>
                                    <span
                                        className={movie.vote_average >= 8 ? 'scores scores-green' : movie.vote_average >= 5 ? 'scores scores-orange' : 'scores scores-red'}>{movie.vote_average}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </>
    );
}