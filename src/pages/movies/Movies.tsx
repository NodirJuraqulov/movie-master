import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React from "react";
import { Pagination } from "antd";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useParamsHook } from "@/hooks/useParamsHook";

const Movies = () => {
  const { getMovies } = useMovie();
  const { getGenres } = useGenre();
  const { getParam, setParam } = useParamsHook();

  const genre = getParam("genre");

  const page = Number(getParam("page")) || 1;

  const handleChangePage = (value: number) => {
    setParam("page", value.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data: genreData } = getGenres();
  const { data, isLoading } = getMovies({
    page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
    // "release_date.gte": "01-01-1800",
    // "release_date.lte": "01-01-1890",
  });

  return (
    <div>
      <Genre data={genreData?.genres} />

      <MovieView data={data?.results} isLoading={isLoading} />

      <div className="mt-6 h-[60px] flex items-center justify-center">
        <Pagination
          current={page}
          onChange={handleChangePage}
          pageSize={20}
          total={data?.total_results <= 10_000 ? data?.total_results : 10_000}
          showSizeChanger={false}
          prevIcon={
            <LeftOutlined className="text-black dark:bg-white p-2 rounded-md" />
          }
          nextIcon={
            <RightOutlined className="text-black dark:bg-white p-2 rounded-md" />
          }
          className="text-black bg-slate-200 dark:bg-[#111111] rounded-lg !px-2 flex justify-center items-center h-12"
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);
