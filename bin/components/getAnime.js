var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import chalk from "chalk";
import ora from "ora";
import dayjs from "dayjs";
const show = (arr, ans) => {
    let len = Math.min(arr.length, 5);
    for (let i = 0; i < len; i++) {
        ans += " " + arr[i].name + ",";
    }
    return ans.slice(0, ans.length - 1);
};
const parseDate = (dateString) => {
    if (dateString == null)
        return chalk.blueBright("");
    return dayjs(dateString).format("MMM DD[,]YYYY [at] HH:mm [JST]");
};
const showResults = (anime) => {
    let studios = "";
    let genres = "";
    let producers = "";
    console.log(chalk `{cyanBright ${1}} {yellowBright.bold ${anime.title}}`);
    console.log(chalk.green(`${anime.url}`));
    //type: score: aired:
    console.log(chalk `{magenta.bold type:} {whiteBright ${anime.type}}  {magenta.bold episodes: }{whiteBright ${anime.episodes}}  {magenta.bold score: }{whiteBright ${anime.score}}  {magenta.bold popularity: } ${anime.popularity}  {magenta.bold aired: } {whiteBright ${parseDate(anime.aired.from)} - {whiteBright ${parseDate(anime.aired.to)}}}`);
    //source: duration: rating: status:
    console.log(chalk `{magenta.bold source:} ${anime.source}  {magenta.bold duration:} ${anime.duration}  {magenta.bold rating:} ${anime.rating}  {magenta.bold status:} ${anime.status}`);
    // genres
    console.log(chalk `{magenta.bold Genres} : {blueBright ${show(anime.genres, genres)}}`);
    // producers
    console.log(chalk `{magenta.bold Producers} : {blueBright ${show(anime.producers, producers)}}`);
    //studios
    console.log(chalk `{magenta.bold Studios} : {blueBright ${show(anime.studios, studios)}}`);
    console.log(chalk `{whiteBright.bold [Synopsis]:}`);
    console.log(chalk `{rgb(230, 230, 230) ${anime.synopsis}}`);
    console.log("\n");
};
const getAnime = (anime_id) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora("fetching resources...").start();
    try {
        yield axios
            .get(`https://api.jikan.moe/v3/anime/${anime_id}`, { timeout: 10000 })
            .then((res) => {
            if ("mal_id" in res.data) {
                spinner.succeed("fetching done!!!");
                //console.log(res.data);
                //console.log(res.data.related);
                showResults(res.data);
            }
        });
    }
    catch (err) {
        spinner.fail("Something went wrong.Try again");
    }
    process.on("uncaughtException", (err) => {
        spinner.fail("Fetching timed out,Try again");
    });
});
export default getAnime;
