import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useMovie = () => {
  const getPersonSingle = (id: string) =>
    useQuery({
      queryKey: ["person", id],
      queryFn: () => api.get(`person/${id}`).then((res) => res.data),
    });

  const getPersonSimilar = (id: string, path: string) =>
    useQuery({
      queryKey: ["person", id, path],
      queryFn: () => api.get(`person/${id}/${path}`).then((res) => res.data),
    });

  return { getPersonSingle, getPersonSimilar };
};
