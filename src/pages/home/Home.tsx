import { useMovie } from '@/api/hooks/useMovie'
import React from 'react'
import MovieView from '@/components/movie-view/MovieView'
import Carousel from '@/components/carousel/Carousel'

const Home = () => {
  const {getMovies} = useMovie()
  const {data, isLoading} = getMovies({page: 1, without_genres: "18,36,27,10749"})

  console.log(data);
  
  return (
    <div>
      <Carousel data={data?.results?.slice(0, 5)} isLoading={isLoading} />
      
      <MovieView data={data?.results?.slice(0, 8)} isLoading={isLoading} />
    </div>
  )
}

export default React.memo(Home)