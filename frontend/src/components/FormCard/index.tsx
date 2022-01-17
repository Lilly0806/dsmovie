import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "types/movie";
import { BASE_URL } from "utils/requests";
import { validateEmail } from "utils/validate";
import "./styles.css";

type Props = {
  movieId: string;
};

function FormCard({ movieId }: Props) {
  const [movie, setMovie] = useState<Movie>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies/${movieId}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (event.target as any).email.value;
    const score = (event.target as any).score.value;

    if (!validateEmail(email)) {
      return;
    }

    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: "PUT",
      url: "/scores",
      data: {
        email: email,
        movieId: movieId,
        score: score,
      },
    };

    axios(config)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dsmovie_form_container">
      <img
        className="-dsmovie_movie_card_image"
        src={movie?.image}
        alt={movie?.title}
      />
      <div className="dsmovie_card_bottom_container">
        <h3>{movie?.title}</h3>
        <form className="dsmovie_form" onSubmit={handleSubmit}>
          <div className="form-group dsmovie_form_group">
            <label htmlFor="email">Informe seu email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group dsmovie_form_group">
            <label htmlFor="score">Informe sua avaliação</label>
            <select className="form-control" id="score">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="movie_form_btn_container">
            <button type="submit" className="btn btn-primary dsmovie_btn">
              Salvar
            </button>
          </div>
        </form>
        <Link to="/">
          <button className="btn btn-primary dsmovie_btn mt-3">Cancelar</button>
        </Link>
      </div>
    </div>
  );
}

export default FormCard;
