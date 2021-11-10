#!/usr/bin/env node

import { program } from "commander";
import searchAnime from "./components/searchAnime.js";
import seasonalAnime, { parseOptions } from "./components/seasonalAnime.js";
import getAnime from "./components/getAnime.js";
import figlet from "figlet";
import lolcatjs from "./config/lolcatConfig.js";

// banner statement
lolcatjs.fromString(
  figlet.textSync("Atsui-Anime", {
    font: "Slant",
    horizontalLayout: "full",
  })
);
// lolcat

program.version("1.0.0");
program
  .command("search <anime_name>")
  .option(
    "-l,--limit <limit_no>",
    "limit number of animes in search results, default is 5"
  )
  .description("search for an anime by specified name")
  .action((anime_name: string, options: { limit?: string }) => {
    if ("limit" in options) {
      let limit_no: any = options.limit;
      limit_no = limit_no as number;
      searchAnime(anime_name, limit_no);
    } else {
      searchAnime(anime_name);
    }
  });

program
  .command("getseason")
  .option(
    "-l,--limit <limit_no>",
    "limit how many animes can appear in your search result ,default is 20"
  )
  .option("-y,--year <year>", "specify the year")
  .option("-s,--season <season_type>", "specify the season")
  .description(
    " get currently airing anime, [if you specify the year ,season has to specified as well and vice-versa]"
  )
  .action((options: any) => {
    // default option
    seasonalAnime(parseOptions(options));
  });

program
  .command("getanime <anime_id>")
  .description("get the anime by the specified mal_id")
  .action((anime_id: string) => {
    getAnime(anime_id);
  });

program.parse(process.argv);
