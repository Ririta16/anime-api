import { useEffect, useState } from "react";
import { AnimeResponse } from "./Type";
import axios from "axios";
import Loading from "./components/Loading";
import Search from "antd/es/input/Search";
import { Divider, FloatButton, Select } from "antd";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import pop from "./assets/pop.png";

export default function Anime() {
  const [data, setData] = useState<AnimeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /*******************Season*********************/
  const location = useLocation();
  const seasons = ["All", "Winter", "Fall", "Spring", "Summer"];
  const [selectedSeason, setSelectedSeason] = useState<string>("All");
  /*******************Sort*********************/
  const [sortData, setSortData] = useState<AnimeResponse["data"] | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("Default");
  /*******************Search*********************/
  const [searchTerm, setSearchTerm] = useState<string>("");

  /*******************Api*********************/
  const getDataAsyncByAxios = async (season: string) => {
    let url = "";
    if (season === "All") {
      url = "https://api.jikan.moe/v4/seasons/now?sfw";
    } else {
      url = `https://api.jikan.moe/v4/seasons/2024/${season}?sfw`;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log("Axios : ", response.data);
        setData(response.data);
        setSortData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pathSeason = location.pathname.split("/")[1];
    const season = pathSeason
      ? pathSeason.charAt(0).toUpperCase() + pathSeason.slice(1)
      : "All";

    if (seasons.includes(season)) {
      setSelectedSeason(season);
      getDataAsyncByAxios(season);
    }
  }, [location.pathname]);

  /*******************Sort*********************/
  useEffect(() => {
    if (data?.data) {
      let sortedData = [...data.data];
      if (sortOrder === "A-Z") {
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder === "Z-A") {
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sortOrder === "Lowest") {
        sortedData.sort((a, b) => a.mal_id - b.mal_id);
      } else if (sortOrder === "Highest") {
        sortedData.sort((a, b) => b.mal_id - a.mal_id);
      }
      setSortData(sortedData);
    }
  }, [sortOrder, data]);

  /*******************************************/
  return (
    <div className="film select-none">
      <div className="content p-20 pt-14 min-h-screen h-full grain">
        <div className="title flex items-center justify-center">
          ANIME<span>2024</span>
          <img src={pop} className="w-20 ml-2" />
        </div>
        <div className="xl:px-12">
          <div className="reel my-12 mb-14 w-full navbar">
            <div className="p-5 xl:px-20">
              <div className="flex flex-row justify-between w-full">
                <Select
                  className="w-52"
                  size="large"
                  defaultValue="Default"
                  onChange={(value) => setSortOrder(value)}
                  options={[
                    { value: "Default", label: "Default" },
                    { value: "A-Z", label: "A-Z" },
                    { value: "Z-A", label: "Z-A" },
                    { value: "Lowest", label: "Lowest ID (First)" },
                    { value: "Highest", label: "Highest ID (First)" },
                  ]}
                />
                <Search
                  size="large"
                  onSearch={(value) => setSearchTerm(value)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="w-80"
                  placeholder="Search here..."
                  allowClear
                />
              </div>
              <Divider />
              <div className="flex xl:flex-row flex-col items-center justify-between gap-5">
                {seasons.map((season) => (
                  <Link
                    to={`/${season.toLowerCase()}`}
                    key={season}
                    className="w-fit"
                  >
                    <button
                      onClick={() => setSelectedSeason(season)}
                      className={`w-52 py-1 rounded ${
                        selectedSeason === season
                          ? "bg-[#1c3999] text-white"
                          : "bg-white text-[#1c3999]"
                      }`}
                    >
                      {season}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center ">
            {isLoading ? (
              <Loading />
            ) : sortData ? (
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-14 gap-y-9">
                {sortData
                  .filter((anime) =>
                    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((anime) => (
                    <Link
                      to={`/detail/${anime.mal_id}`}
                      target="_blank"
                      className="relative z-20 cursor-pointer "
                      key={anime.mal_id}
                    >
                      <motion.div
                        key={anime.mal_id}
                        className="card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.img
                          className="w-full h-[420px] image"
                          src={anime.images.jpg.large_image_url}
                          alt={anime.title}
                          whileHover={{ scale: 1.05 }}
                        />
                        <div className="card__content text-white">
                          <div className="card__content--container ">
                            <div className="card__title">
                              <div className="line-clamp-2">{anime.title}</div>
                            </div>
                            <div className="card__description line-clamp-3">
                              {anime.synopsis || "No Synopsis"}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <FloatButton.BackTop />
      </div>
    </div>
  );
}
