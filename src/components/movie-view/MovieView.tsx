import React, { type FC } from "react";
import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import { Rate } from "antd";
import NoImg from "@/assets/noimage.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SavedLine from "@/assets/bookmark-line.svg";
import SavedFill from "@/assets/bookmark-fill.svg";
import { toggleSaved } from "@/redux/features/saved";
import type { RootState } from "@/redux";
// import Skeleton from "./Skeleton";

interface Props {
  data: undefined | IMovie[];
  isLoading: boolean;
}

const MovieView: FC<Props> = ({ data, isLoading }) => {
  const navigate = useNavigate();

  const saved = useSelector((state: RootState) => state.saved.value)
  
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {isLoading
        ? Array(20)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 dark:bg-[#111] animate-pulse rounded-lg w-full"
              >
                <div className="bg-gray-300 dark:bg-gray-600 h-[424px] rounded-[12px]"></div>
                <div className="p-2">
                  <div className="bg-gray-100 dark:bg-gray-500 mt-2 h-6 rounded-[12px] w-10/12"></div>
                  <div className="bg-gray-100 dark:bg-gray-500 mt-2 h-6 rounded-[12px] w-6/12"></div>
                </div>
              </div>
            ))
        : data?.map((movie: IMovie) => { 
          const isSaved = saved.some((i: IMovie) => i.id === movie.id)
          return (
            <div
              className="dark:bg-[#111111] bg-slate-200 shadow rounded-lg"
              key={movie.id}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  loading="lazy"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  src={
                    movie.poster_path ? IMAGE_URL + movie.poster_path : NoImg
                  }
                  alt={movie.title}
                  className="rounded-t-lg hover:scale-102 object-contain cursor-pointer"
                />

                <p className="absolute top-2 left-2 text-white bg-red-600 px-2 rounded text-sm">
                  {movie.release_date.split("-")[0]}
                </p>

                <img
                  onClick={() => dispatch(toggleSaved(movie))}
                  src={isSaved ? SavedFill : SavedLine}
                  alt="Saved"
                  className="absolute top-2 right-2 p-[6px] cursor-pointer bg-[#111111] rounded"
                />
              </div>
              <div className="p-2">
                <h3
                  title={movie.title}
                  className="text-xl font-semibold line-clamp-1 my-2"
                >
                  {movie.title}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500 font-medium">
                    Rating: {movie.vote_average}
                  </p>
                  <Rate allowHalf defaultValue={movie.vote_average / 2} />
                </div>
              </div>
            </div>
          )})}
    </div>
  );
};

export default React.memo(MovieView);
