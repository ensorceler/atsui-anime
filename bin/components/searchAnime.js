var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import axios from "axios";
import ora from "ora";
import dayjs from "dayjs";
const parseDate = (dateString) => {
    if (dateString == null)
        return chalk.blueBright("currently airing");
    return dayjs(dateString).format("MMM DD[,]YYYY [at] HH:mm [JST]");
};
const showResults = (animes) => {
    animes.forEach((anime, idx) => {
        //console.log(anime
        console.log(chalk `{cyanBright ${idx + 1}} {yellowBright.bold ${anime.title}}`);
        console.log(chalk.green(`${anime.url}`));
        console.log(chalk `{magenta.bold type:} {whiteBright ${anime.type}}  {magenta.bold episodes: }{whiteBright ${anime.episodes}}  {magenta.bold score: }{whiteBright ${anime.score}} {magenta.bold aired: } {whiteBright ${parseDate(anime.start_date)} - {whiteBright ${parseDate(anime.end_date)}}}
      `);
        console.log(chalk `{rgb(230, 230, 230) ${anime.synopsis}}`);
        console.log("\n");
    });
};
const searchAnime = (anime_name, limit) => __awaiter(void 0, void 0, void 0, function* () {
    let limit_no = 5;
    if (limit != undefined) {
        limit_no = limit;
    }
    const spinner = ora("fetching resources...").start();
    try {
        axios
            .get(`https://api.jikan.moe/v3/search/anime?q=${anime_name}&limit=${limit_no}`, { timeout: 10000 })
            .then((res) => {
            spinner.succeed("fetching data done\n");
            // console.log(res.data.results[0]);
            showResults(res.data.results);
        });
    }
    catch (err) {
        spinner.fail("Something went wrong.Try again");
        //console.log(err);
    }
    process.on("uncaughtException", (err) => {
        spinner.fail("Fetching timed out,Try again");
    });
});
export default searchAnime;
