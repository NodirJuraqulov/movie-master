import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import MovieView from "@/components/movie-view/MovieView";
import type { IMovie, MovieDetaill, Person } from "@/types";
import Back from "@/assets/backline.svg";
import Saved from "@/assets/bookmark-line.svg";
import SavedFill from "@/assets/bookmark-fill.svg";
import React from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { toggleSaved } from "@/redux/features/saved";

interface Props {
  data?: MovieDetaill;
  isLoading: boolean;
}

const convertToIMovie = (detail: MovieDetaill): IMovie => ({
  id: detail.id,
  title: detail.title,
  backdrop_path: detail.backdrop_path,
  poster_path: detail.poster_path,
  vote_average: detail.vote_average,
  release_date: detail.release_date,
  original_language: detail.original_language,
  genre_ids: detail.genres.map(g => g.id),
});


const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();


  const { data, isLoading: loading }: Props = getMovieSingle(id || "");
  const { data: similarData, isLoading } = getMovieDetail(id || "", "similar"); // o'xshash ma'lumotlar;
  const { data: imagesData, isLoading: imgLoading } = getMovieDetail(
    id || "",
    "images"
  ); // kinodagi rasmlar;
  const { data: creditsData, isLoading: actorLoading } = getMovieDetail(
    id || "",
    "credits"
  ); // kinodagi aktyorlar;

  console.log(creditsData?.cast);

  const navigate = useNavigate();

  const saved = useSelector((state: RootState) => state.saved.value)

  const isSaved = saved.some((i: IMovie) => i.id === data?.id)

  const dispatch = useDispatch()

  return (
    <div className="flex flex-col gap-8">
      <div className="relative w-full flex items-center justify-center">
        <div className="w-[1360px] h-[640px] rounded-[12px] relative mt-4">
          {loading ? (
            <div className="w-full h-full bg-slate-200 dark:bg-[#111] text-4xl text-red-500 flex items-center justify-center">
              <Spin tip="Yuklanmoqda..." size="large" />
            </div>
          ) : (
            <img
              src={IMAGE_URL + data?.backdrop_path}
              alt=""
              className="w-[1360px] object-cover h-[640px] rounded-[12px]"
            />
          )}

          <img
            onClick={() => navigate(-1)}
            src={Back}
            alt="Back"
            className="absolute top-3 cursor-pointer left-3 dark:bg-[#111] bg-slate-200 opacity-80 rounded-[12px] p-4"
          />
          {data && (
            <img
              onClick={() => dispatch(toggleSaved(convertToIMovie(data)))}
              src={isSaved ? SavedFill : Saved}
              alt="Bookmark"
              className="absolute top-3 right-3 cursor-pointer dark:bg-[#111] bg-slate-200 opacity-80 rounded-[12px] p-4"
            />
          )}
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
          <h2 className="text-[32px] leading-[40px] font-medium text-white mb-4">
            {data?.title}
          </h2>

          <div className="flex items-center justify-center gap-2 text-white">
            <p>{data?.release_date.split("-")[0]}</p>
            <p>•</p>
            <p>{data?.genres[0].name}</p>
            <p>•</p>
            <p>
              {data?.runtime != null &&
                `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}
            </p>
            <p>•</p>
            <p>{data?.original_language.toUpperCase()}</p>
            <p>•</p>
            <p>{data?.vote_average}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-15">
        <div className="w-full max-w-4xl mx-auto rounded-lg shadow dark:shadow-gray-700 bg-slate-200 dark:bg-[#111]/90 backdrop-blur p-6 space-y-6">
          {/* Title + rating */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {data?.title}
            </h1>
            <span className="px-2 py-1 rounded-md bg-[#B88E2F]/10 dark:bg-[#B88E2F]/30 text-[#b2810e] text-sm font-bold">
              ★ {data?.vote_average?.toFixed(1)}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
            {data?.release_date && (
              <span>{new Date(data.release_date).getFullYear()}</span>
            )}
            {data?.runtime && (
              <span>
                {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
              </span>
            )}
            {data?.original_language && (
              <span className="uppercase">{data.original_language}</span>
            )}
            {!!data?.budget && <span>{data.budget.toLocaleString()} USD</span>}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {data?.genres?.map((g) => (
              <span
                key={g.id}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            {data?.overview}
          </p>

          {/* Details grids */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Languages */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Languages
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
                {data?.spoken_languages?.map((l) => (
                  <li key={l.iso_639_1}>{l.english_name}</li>
                ))}
              </ul>
            </div>

            {/* Countries */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Countries
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
                {data?.production_countries?.map((c) => (
                  <li key={c.iso_3166_1}>{c.name}</li>
                ))}
              </ul>
            </div>

            {/* Companies */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                Companies
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-0.5 max-h-32 overflow-y-auto pr-1">
                {data?.production_companies?.map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Homepage link */}
          {data?.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Official site ↗
            </a>
          )}
        </div>

        <div>
          <h2 className="text-lg dark:text-gray-400 mb-1 text-gray-700">
            Stills from the movie
          </h2>

          <div className="flex gap-2 overflow-x-auto scroll-hidden">
            {imgLoading
              ? Array(20)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-lg w-full"
                  >
                    <div className="w-[200px] h-[120px] bg-slate-200 dark:bg-[#111] rounded-[12px]"></div>
                  </div>
                ))
              : imagesData?.backdrops?.map((item: any, inx: number) => (
                <Image
                  key={inx}
                  width={200}
                  src={IMAGE_URL + item.file_path}
                  rootClassName="shrink-0 mr-2"
                  className="rounded-md"
                />
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg dark:text-gray-400 mb-1 text-gray-700">
            Cast members
          </h2>

          <div className="flex gap-4 overflow-x-auto scroll-hidden">
            {actorLoading
              ? Array(20)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-lg w-full"
                  >
                    <div className="w-[150px] h-[250px] bg-slate-200 dark:bg-[#111] rounded-[12px]"></div>
                  </div>
                ))
              : creditsData?.cast?.map((person: Person) => (
                <div
                  key={person.id}
                  className="shrink-0 w-36 flex flex-col items-center rounded-lg bg-slate-200 dark:bg-[#222]/90 shadow dark:shadow-gray-700 p-2"
                >
                  <img
                    src={IMAGE_URL + person.profile_path}
                    alt={person.original_name}
                    onClick={() => navigate(`/person/${person.id}`)}
                    className="w-full h-48 object-cover rounded-md cursor-pointer"
                  />

                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100 text-center line-clamp-2">
                    {person.original_name}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center line-clamp-2">
                    {person.character}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-[#B88E2F]/10 dark:bg-[#B88E2F]/30 text-[#B88E2F] px-2 py-0.5 text-[11px] font-semibold">
                    ★ {person.popularity.toFixed(1)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg dark:text-gray-400 mb-1 text-gray-700">
            Similar Movies
          </h2>

          <MovieView
            data={similarData?.results?.slice(0, 4)}
            isLoading={isLoading || !data}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieDetail);
