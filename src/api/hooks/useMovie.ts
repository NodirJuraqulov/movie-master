import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useMovie = () => {
  const getMovies = (params: any) =>
    useQuery({
      queryKey: ["movie", params],
      queryFn: () =>
        api.get("discover/movie", { params }).then((res) => res.data),
    });

  const getMovieSingle = (id: string) =>
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => api.get(`movie/${id}`).then((res) => res.data),
    });

  const getMovieDetail = (id: string, path: string) =>
    useQuery({
      queryKey: ["movie", id, path],
      queryFn: () => api.get(`movie/${id}/${path}`).then((res) => res.data),
    });

  const getSearch = (query: string, page = 1) => {
    return useQuery({
      queryKey: ["search", query, page],
      queryFn: async () => {
        const res = await api.get(`/search/movie?query=${query}&page=${page}`);
        return res.data;
      },
      enabled: !!query, // query bo'sh bo'lsa ishlamaydi
    });
  };

  return { getMovies, getMovieSingle, getMovieDetail, getSearch };
};
