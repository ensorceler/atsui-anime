![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)
##


<p align="center">
<a ><img src="https://img.shields.io/badge/release-version%201.0.0-orange" alt="Latest release" /></a>
<a ><img src="https://img.shields.io/badge/license-gplv3-red" alt="License" /></a>
<a ><img src="https://img.shields.io/badge/ci-passing-green" alt="Build Status" /></a>
</p>


Atsui-anime is CLI power tool to get anything anime related data. It can show data about any anime you search,it shows the currently airing anime and all the seasonal anime there has ever been. You can get full info about an anime by searching with its mal id.
Atsui-anime uses Jikan api under the hood.

**Here are some usage examples**

1. check all the commands and their options:
``` 
atsui-anime --help 
```
2. search for a particular anime (e.g: Naruto):
```
atsui-anime search Naruto
```
3. search the currently airing seasonal anime (2021,fall):
```
atsui-anime getseason 
```
4. search for any particular season of any particular year (e.g: 2019,winter season):
```
atsui-anime getseason --year 2019 --season winter
```
5. getinfo about a single anime,anime-movie or ova (e.g 16498 mal_id for Attack on Titan):
```
atsui-anime getanime 16498
```

### Installation

##### dependencies
Atsui-anime requires node version 16.13.0 or later. and also the latest version of npm is preferred.Install both Nodejs and npm on your machine before proceeding.
Install git if you don't have git on your machine.

Clone the repository to your local machine:
```
git clone https://github.com/ensorceler/atsui-anime
```
get into the project folder:
```
cd atsui-anime
```

Install Atsui-anime with npm:

```
npm install
```
create a symlink to use the package globally:
```
npm link 
```

now you can use this package and use the CLI anywhere you wish 


## Authors

- [@ensorceler](https://www.github.com/ensorceler)



