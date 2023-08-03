////////////////// TENNIS //////////////////

export interface SeasonTennis {
  TOURNAMENT_IMAGE: string;
  LEAGUE_NAME: string;
  SEASONS: {
    SEASON_ID: number;
    SEASON_TOURNAMENT_STAGE_ID: number;
  }[];
}

export interface TournamentTennis {
  EVENT_ID: string;
  START_TIME: number;
  START_UTIME: number;
  HOME_NAME: string;
  AWAY_NAME: string;
  HOME_SCORE_CURRENT: string;
  AWAY_SCORE_CURRENT: string;
  ROUND: string;
  STAGE_TYPE: string;
  HOME_IMAGES: string[];
  AWAY_IMAGES: string[];
  INFO_NOTICE: string;
  STAGE: string;
  HOME_SCORE_PART_1: string;
  HOME_SCORE_PART_2: string;
  HOME_SCORE_PART_3: string;
  HOME_SCORE_PART_4: string;
  HOME_SCORE_PART_5: string;
  AWAY_SCORE_PART_1: string;
  AWAY_SCORE_PART_2: string;
  AWAY_SCORE_PART_3: string;
  AWAY_SCORE_PART_4: string;
  AWAY_SCORE_PART_5: string;
}

export type TennisChampionship = {
  name: string;
  image: string;
  country: string;
  url: string; // Nouveau champ pour l'URL du championnat
  stageId: string;
};

///////////////// FOOT /////////////////

export interface TeamFoot {
  TEAM_ID: number;
  TEAM_NAME: string;
  TEAM_IMAGE_PATH: string;
  MATCHES_PLAYED: number;
  WINS: number;
  GOALS: number;
  POINTS: number;
  RANKING: number;
  TUC: string;
}

export interface SeasonFoot {
  TOURNAMENT_IMAGE: string;
  SEASONS: {
    SEASON_ID: string;
    SEASON_TOURNAMENT_STAGE_ID: string;
    SEASON_NAME: string;
  }[];
}

export interface TournamentFoot {
  COUNTRY_NAME: string;
  LEAGUE_NAME: string;
  TOURNAMENT_IMAGE: string;
}

export interface Buteur {
  TS_PLAYER_ID: number;
  TS_RANK: number;
  TS_PLAYER_NAME_PA: string;
  TS_PLAYER_GOALS: number;
  TS_PLAYER_ASISTS: number;
  TS_IMAGE_PATH: string;
  TEAM_NAME: string;
}

export interface MatchResult {
  EVENT_ID: any;
  STAGE_TYPE: string;
  HOME_NAME: string;
  AWAY_NAME: string;
  HOME_SCORE_CURRENT: string;
  AWAY_SCORE_CURRENT: string;
  HOME_IMAGES: string;
  AWAY_IMAGES: string;
  ROUND: string;
  STAGE: string;
  START_TIME: number;
}
