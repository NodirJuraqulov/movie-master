import { useMovie } from "@/api/hooks/usePerson";
import { IMAGE_URL } from "@/const";
import React from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import MovieView from "@/components/movie-view/MovieView";

const ActorView = () => {
  const { id } = useParams();

  const { getPersonSingle, getPersonSimilar } = useMovie();

  const { data } = getPersonSingle(id || "");
  const { data: imgData } = getPersonSimilar(id || "", "images");
  const { data: movieData, isLoading } = getPersonSimilar(id || "", "movie_credits");

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-15 mt-8">
      <div className="w-full max-w-4xl mx-auto rounded-lg shadow dark:shadow-gray-700 bg-slate-200 dark:bg-[#111]/90 backdrop-blur p-6 space-y-6">
        {/* Name + popularity */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {data?.name}
          </h1>
          <span className="px-2 py-1 rounded-md bg-[#B88E2F]/10 dark:bg-[#B88E2F]/30 text-[#B88E2F] text-sm font-semibold">
            ★ {data?.popularity.toFixed(1)}
          </span>
        </div>

        {/* Also known as */}
        {data?.also_known_as?.length ? (
          <div className="flex flex-wrap gap-2">
            {data.also_known_as.map((alias: string) => (
              <span
                key={alias}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {alias}
              </span>
            ))}
          </div>
        ) : null}

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
          {data?.birthday && (
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-0.5">
                Birthday
              </h3>
              <p>{new Date(data.birthday).toLocaleDateString()}</p>
            </div>
          )}

          {data?.deathday && (
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-0.5">
                Deathday
              </h3>
              <p>{new Date(data.deathday).toLocaleDateString()}</p>
            </div>
          )}

          {data?.place_of_birth && (
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-0.5">
                Birthplace
              </h3>
              <p>{data.place_of_birth}</p>
            </div>
          )}
        </div>

        {/* Biography */}
        {data?.biography && (
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
              Biography
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">
              {data.biography}
            </p>
          </div>
        )}

        {/* Homepage */}
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

      <div className="w-full">
        <h2 className="text-lg dark:text-gray-400 mb-1 text-gray-700">
          Stills from the movie
        </h2>

        <div className="flex gap-2 overflow-x-auto scroll-hidden">
          {imgData?.profiles?.map((item: any, inx: number) => (
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
          Movies they appeared in
        </h2>

        <MovieView data={movieData?.cast?.slice(0, 4)}  isLoading={isLoading || !data} />
      </div>
    </div>
  );
};

export default React.memo(ActorView);
