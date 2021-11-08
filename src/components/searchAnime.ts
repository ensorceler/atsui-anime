import chalk from "chalk";
import axios from "axios";
import ora from "ora";
import dayjs from "dayjs";

const parseDate = (dateString?: string | null) => {
  if (dateString == null) return chalk.blueBright("currently airing");
  return dayjs(dateString!).format("MMM DD[,]YYYY [at] HH:mm [JST]");
};

const showResults = (animes: Array<Object>) => {
  animes.forEach((anime: any, idx: number) => {
    //console.log(anime
    console.log(
      chalk`{cyanBright ${idx + 1}} {yellowBright.bold ${anime.title}}`
    );
    console.log(chalk.green(`${anime.url}`));
    console.log(
      chalk`{magenta.bold type:} {whiteBright ${
        anime.type
      }}  {magenta.bold episodes: }{whiteBright ${
        anime.episodes
      }}  {magenta.bold score: }{whiteBright ${
        anime.score
      }} {magenta.bold aired: } {whiteBright ${parseDate(
        anime.start_date
      )} - {whiteBright ${parseDate(anime.end_date)}}}
      `
    );
    console.log(chalk`{rgb(230, 230, 230) ${anime.synopsis}}`);
    console.log("\n");
  });
};

const searchAnime = async (anime_name: string, limit?: number) => {
  let limit_no = 5;
  if (limit != undefined) {
    limit_no = limit;
  }
  const spinner = ora("fetching resources...").start();

  try {
    axios
      .get(
        `https://api.jikan.moe/v3/search/anime?q=${anime_name}&limit=${limit_no}`,
        { timeout: 10000 }
      )
      .then((res: any) => {
        spinner.succeed("fetching data done\n");
        // console.log(res.data.results[0]);
        showResults(res.data.results);
      });
  } catch (err: unknown) {
    spinner.fail("Something went wrong.Try again");
    //console.log(err);
  }

  process.on("uncaughtException", (err) => {
    spinner.fail("Fetching timed out,Try again");
  });
};

export default searchAnime;
