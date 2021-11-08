import chalk from "chalk";
import axios from "axios";
import ora from "ora";
import dayjs from "dayjs";

interface SeasonOption {
  year: number;
  limit: number;
  season: string;
}

const SeasonType = ["winter", "spring", "summer", "fall"] as const;

const show = <T>(arr: Array<T>, ans: string) => {
  let len = Math.min(arr.length, 5);
  for (let i = 0; i < len; i++) {
    ans += " " + (arr[i] as any).name + ",";
  }
  return ans.slice(0, ans.length - 1);
};

const parseDate = (dateString?: string | null) => {
  if (dateString == null) return chalk.blueBright("No Data");
  return dayjs(dateString!).format("MMM DD[,]YYYY [at] HH:mm [JST]");
};
const showResults = (animes: Array<Object>, limit: number) => {
  let genres: string = " ";
  let studios: string = " ";

  for (let idx = 0; idx < limit; idx++) {
    let anime: any = animes[idx];
    //console.log(anime
    console.log(
      chalk`{cyanBright ${idx + 1}} {yellowBright.bold ${anime.title}}`
    );
    //url
    console.log(chalk.green(`${anime.url}`));
    //type: episodes: score:
    console.log(
      chalk`{magenta.bold type:} {whiteBright ${
        anime.type
      }}  {magenta.bold episodes: }{whiteBright ${
        anime.episodes
      }}  {magenta.bold score: }{whiteBright ${
        anime.score
      }}  {magenta.bold airing_start:} {whiteBright ${parseDate(
        anime.airing_start
      )}}`
    );
    // genres
    console.log(
      chalk`{magenta.bold Genres} : {blueBright ${show(anime.genres, genres)}}`
    );
    // studios
    console.log(
      chalk`{magenta.bold Studios} : {blueBright ${show(
        anime.producers,
        studios
      )}}`
    );
    console.log(chalk`{whiteBright.bold [Synopsis]:}`);
    console.log(chalk`{rgb(230, 230, 230) ${anime.synopsis}}`);
    console.log("\n");
  }
};

export const errorDetection = (options: any) => {
  if ("year" in options && "season" in options) {
    //ok
    return;
  } else if ("year" in options || "season" in options) {
    throw new Error(
      chalk`{redBright year and season should both be specified together  [very haram brother]}`
    );
  }
};

export const parseOptions = (options: any) => {
  //guard against the errors
  errorDetection(options);

  let year = 2021;
  let season = "fall";
  let limit = 20;

  if ("year" in options) {
    let specified_year = parseInt(options.year!);

    if (specified_year > 2001 && specified_year < 2022) {
      year = specified_year;
    }
  }
  if ("season" in options) {
    let specified_season = SeasonType.find(
      (validSeason) => validSeason == options.season!
    );
    if (specified_season != undefined) {
      season = specified_season;
    }
  }
  if ("limit" in options) {
    //check if the limit is a number or not
    if (isNaN(options.limit!) == false) limit = parseInt(options.limit!);
    // limit cannot be more than 100
    limit = Math.min(100, limit);
  }

  let options_data: SeasonOption = { year: year, season: season, limit: limit };
  return options_data;
};

const seasonalAnime = async (options: SeasonOption) => {
  const spinner = ora("fetchin resources...").start();

  try {
    await axios
      .get(
        `https://api.jikan.moe/v3/season/${options.year}/${options.season}`,
        {
          timeout: 10000,
        }
      )
      .then((res) => {
        //console.log(res.data.anime[0]);
        spinner.succeed("fetching done");
        showResults(res.data.anime, options.limit);
      });
  } catch (err) {
    spinner.fail("Something went wrong.Try again");
    // console.log(err);
  }

  process.on("uncaughtException", (err) => {
    spinner.fail("Fetching timed out,Try again");
  });
};

export default seasonalAnime;
