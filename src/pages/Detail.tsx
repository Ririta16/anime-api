import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrow from "../assets/back-arrow.png";
import load from "../assets/4.gif";

interface Genre {
  name: string;
}

interface AnimeDetail {
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  synopsis: string;
  episodes: number | null;
  duration: string | null;
  season: string | null;
  year: number | null;
  genres: Genre[];
  trailer: {
    embed_url: string | null;
    url: string | null;
  };
}

export default function Detail() {
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getDetailAsyncByAxios = async () => {
    const url = `https://api.jikan.moe/v4/anime/${id}`;
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (response.status === 200) {
        setAnimeDetail(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setError("Anime not found.");
    } finally {
      console.log("finally");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailAsyncByAxios();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen h-full bg-black flex flex-col items-center justify-center text-white">
        <p className="text-5xl mb-4">{error}</p>
        <button
          className="bg-[#1c3999] text-white px-12 py-2 rounded-lg text-3xl"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full bg-black p-20 pt-18 pb-24 flex flex-row relative">
      <div className="absolute w-full h-12 bottom-0 right-0 left-0 film-strip3">
        <div className="bgg3"></div>
      </div>
      <div className="absolute w-12 min-h-screen h-full top-0 left-0 film-strip4">
        <div className="bgg2"></div>
      </div>
      <div className="w-full">
        <div
          className="text-white cursor-pointer w-fit text-2xl mb-2 flex items-center select-none ml-5"
          onClick={() => navigate("/")}
        >
          <img src={arrow} className="w-4 mr-2" /> Back
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center my-40 xl:my-0 xl:mt-44 ">
            <img src={load} width="300px" />
            <div className="text-white text-5xl font-extrabold tracking-wider">
              Loading...
            </div>
          </div>
        ) : (
          <div className="w-3/4 m-auto">
            <div className="text-5xl font-bold text-white text-center mb-8 tracking-wide ">
              <span>{animeDetail?.title}</span> (
              {animeDetail?.title_english || "N/A"})
            </div>
            <div className="flex flex-col">
              <div>
                <img
                  src={animeDetail?.images.jpg.large_image_url}
                  alt={animeDetail?.title}
                  className="w-full lg:w-[28%] float-left mr-10 mb-2 imgdetail"
                />
                <div className="text-white text-2xl tracking-wide">
                  <div className="indent-12 text-justify ">
                    {animeDetail?.synopsis}
                  </div>
                  <div className="flex gap-x-6">
                    <div>Episodes : {animeDetail?.episodes || "N/A"} </div>
                    <div>Duration : {animeDetail?.duration || "N/A"}</div>
                  </div>
                  <div>
                    Season : {animeDetail?.season || "N/A"} {animeDetail?.year}
                  </div>
                  <div>
                    Type :{" "}
                    {animeDetail?.genres.map((item) => item.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="mt-12">
                {animeDetail?.trailer.embed_url ? (
                  <iframe
                    width="100%"
                    height="480"
                    src={animeDetail.trailer.embed_url}
                    title="Trailer"
                    allowFullScreen
                    className="rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-400">No trailer</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" absolute w-full h-12 top-0 right-0 left-0 film-strip2">
        <div className="bgg"></div>
      </div>
      <div className=" absolute w-12 min-h-screen h-full top-0 right-0 film-strip1">
        <div className="bgg"></div>
      </div>
    </div>
  );
}
