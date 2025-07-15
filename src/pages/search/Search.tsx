import React, { useEffect, useState, useRef } from "react";
import { Input, Spin, Pagination } from "antd";
import SearchIcon from "@/assets/search-line.svg";
import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useParamsHook } from "@/hooks/useParamsHook";

const SearchMovie = () => {
  const { getParam, setParam } = useParamsHook();

  const [query, setQuery] = useState(getParam("query") || "")
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [page, setPage] = useState(1)

  const isFirstRender = useRef(true);

  useEffect(() => {
    const urlQuery = getParam("query") || "";
    const urlPage = Number(getParam("page")) || 1;

    setQuery(urlQuery);
    setDebouncedQuery(urlQuery);
    setPage(urlPage);
  }, []);

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    setParam("page", newPage.toString());
  };

  const { getSearch } = useMovie()
  const { data, isLoading } = getSearch(debouncedQuery, page)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // ❗ birinchi renderda page = 1 qilmaymiz
    }

    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
      setParam("query", query);
      setParam("page", "1");
      setPage(1); // faqat user yozganda ishlasin
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center my-12">
      <div className="w-full flex justify-center">
        <Input
          rootClassName="tw-input"
          placeholder="Search movies..."
          allowClear
          value={query}
          onChange={handleChangeQuery}
          prefix={
            <img
              src={SearchIcon}
              alt="Qidirish"
              style={{ width: 16, height: 16, marginRight: 12 }}
            />
          }
          size="large"
          className="dark:!bg-[#111] mb-4"
          style={{ width: 380, height: 64, padding: 20, border: 0 }}
        />

      </div>
      {isLoading ? (
        <div className="text-center mt-10">
          <Spin tip="Qidirilmoqda..." />
        </div>
      ) : (
        <>
          <MovieView data={data?.results} isLoading={isLoading} />

          {data?.total_pages > 1 && (
            <Pagination
              current={page}
              onChange={handleChangePage}
              pageSize={20}
              total={data.total_results}
              showSizeChanger={false}
              prevIcon={
                <LeftOutlined className="text-black dark:bg-white p-2 rounded-md" />
              }
              nextIcon={
                <RightOutlined className="text-black dark:bg-white p-2 rounded-md" />
              }
              className="text-black bg-slate-200 dark:bg-[#111111] rounded-lg !px-2 !mt-6 flex justify-center items-center h-12"
            />
          )}
        </>
      )}

      <div className="flex flex-col items-center justify-center">
        {query.length === 0 ? (
          <p className="text-[20px] leading-6 text-[#4D4D4D] font-medium mt-[120px]">
            Nothing here yet.
          </p>
        ) : data?.results?.length === 0 ? (
          <p className="text-[20px] leading-6 text-[#4D4D4D] font-medium mt-[120px]">
            Nothing found for your search.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(SearchMovie);
