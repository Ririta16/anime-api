export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  }
  
export interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  }
  
export interface Trailer {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  }
  
export interface Title {
    type: string;
    title: string;
  }
  
export interface Aired {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  }
  
export interface Producer {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
export interface Anime {
    mal_id: number;
    url: string;
    images: {
      jpg: ImageUrls;
      webp: ImageUrls;
    };
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: Aired;
    duration: string;
    rating: string;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string | null;
    background: string | null;
    season: string | null;
    year: number | null;
    broadcast: {
      day: string | null;
      time: string | null;
      timezone: string | null;
      string: string | null;
    };
    producers: Producer[];
    licensors: Producer[];
    studios: Producer[];
    genres: Genre[];
    explicit_genres: Genre[];
    themes: Genre[];
    demographics: Genre[];
  }
  
export interface AnimeResponse {
    pagination: Pagination;
    data: Anime[];
  }
  