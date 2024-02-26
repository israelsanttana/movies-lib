import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';

import './Movie.css';

const apiKey = import.meta.env.VITE_API_KEY;
const movies = import.meta.env.VITE_API;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
    }
}
export const Movie = () => {
    let { id } = useParams();

    const [movie, setMovie] = useState();

    const getDetailsMovie = async (url) => {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        setMovie(data);

    }
    useEffect(() => {
        const movieUrl = `${movies}${id}?language=pt-BR`;
        getDetailsMovie(movieUrl);
    }, [id]);

    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            Orçamento:
                        </h3>
                        <p>{movie.budget}</p>
                    </div>
                    <div className="info">
                        <h3>
                            Receita:
                        </h3>
                        <p>{movie.revenue}</p>
                    </div>
                    <div className="info">
                        <h3>
                            Duração:
                        </h3>
                        <p>{movie.runtime} minutos</p>
                    </div>
                    <div className="info description">
                        <h3>
                            Descrição:
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    )
};