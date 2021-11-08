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
const SeasonType = ["winter", "spring", "summer", "fall"];
const show = (arr, ans) => {
    let len = Math.min(arr.length, 5);
    for (let i = 0; i < len; i++) {
        ans += " " + arr[i].name + ",";
    }
    return ans.slice(0, ans.length - 1);
};
const parseDate = (dateString) => {
    if (dateString == null)
        return chalk.blueBright("No Data");
    return dayjs(dateString).format("MMM DD[,]YYYY [at] HH:mm [JST]");
};
const showResults = (animes, limit) => {
    let genres = " ";
    let studios = " ";
    for (let idx = 0; idx < limit; idx++) {
        let anime = animes[idx];
        //console.log(anime
        console.log(chalk `{cyanBright ${idx + 1}} {yellowBright.bold ${anime.title}}`);
        //url
        console.log(chalk.green(`${anime.url}`));
        //type: episodes: score:
        console.log(chalk `{magenta.bold type:} {whiteBright ${anime.type}}  {magenta.bold episodes: }{whiteBright ${anime.episodes}}  {magenta.bold score: }{whiteBright ${anime.score}}  {magenta.bold airing_start:} {whiteBright ${parseDate(anime.airing_start)}}`);
        // genres
        console.log(chalk `{magenta.bold Genres} : {blueBright ${show(anime.genres, genres)}}`);
        // studios
        console.log(chalk `{magenta.bold Studios} : {blueBright ${show(anime.producers, studios)}}`);
        console.log(chalk `{whiteBright.bold [Synopsis]:}`);
        console.log(chalk `{rgb(230, 230, 230) ${anime.synopsis}}`);
        console.log("\n");
    }
};
export const errorDetection = (options) => {
    if ("year" in options && "season" in options) {
        //ok
        return;
    }
    else if ("year" in options || "season" in options) {
        throw new Error(chalk `{redBright year and season should both be specified together  [very haram brother]}`);
    }
};
export const parseOptions = (options) => {
    //guard against the errors
    errorDetection(options);
    let year = 2021;
    let season = "fall";
    let limit = 20;
    if ("year" in options) {
        let specified_year = parseInt(options.year);
        if (specified_year > 2001 && specified_year < 2022) {
            year = specified_year;
        }
    }
    if ("season" in options) {
        let specified_season = SeasonType.find((validSeason) => validSeason == options.season);
        if (specified_season != undefined) {
            season = specified_season;
        }
    }
    if ("limit" in options) {
        //check if the limit is a number or not
        if (isNaN(options.limit) == false)
            limit = parseInt(options.limit);
        // limit cannot be more than 100
        limit = Math.min(100, limit);
    }
    let options_data = { year: year, season: season, limit: limit };
    return options_data;
};
const seasonalAnime = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora("fetchin resources...").start();
    try {
        yield axios
            .get(`https://api.jikan.moe/v3/season/${options.year}/${options.season}`, {
            timeout: 10000,
        })
            .then((res) => {
            //console.log(res.data.anime[0]);
            spinner.succeed("fetching done");
            showResults(res.data.anime, options.limit);
        });
    }
    catch (err) {
        spinner.fail("Something went wrong.Try again");
        // console.log(err);
    }
    process.on("uncaughtException", (err) => {
        spinner.fail("Fetching timed out,Try again");
    });
});
export default seasonalAnime;
