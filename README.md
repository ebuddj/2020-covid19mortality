# 2020-covid19mortality

**Live demo** https://ebuddj.github.io/2020-covid19mortality/

## Weekly mortality

This project compares the average weekly cumulative mortality in European countries between 2010 and 2019 to cumulative mortality in 2020.

We see that in many countries the mortality went up during the first wave of Covid-19. 

For example in France at worst the cumulative mortality was at worst after week 17, rising to +15,099, while the latest data from week 29 shows that the cumulative mortality is -1,126 meaning that less people have died in France in 2020 than in average compared to the last decade. 

On the other hand in Spain the mortality is much higher showing +26,011 more deaths up to week 29 in year 2020 than in average between 2010 and 2019.

See `data/data.xlsx` for complete dataset.

**Sources**
* [Eurostat](https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=demo_r_mwk_ts&lang=en)

**EBU links**
* []()

**Used by**
* []()

## How to use

If you are interested in using the interactive version please contact Teemo Tebest, tebest@ebu.ch

This visualization is part of the EBU News Exchange’s Data Journalism project. Other projects are available: https://news-exchange.ebu.ch/data-journalism

## Rights of usage

The material may be used only by [Eurovision active members and sub-licensees](https://www.ebu.ch/eurovision-news/members-and-sublicensees).

## How to build and develop

This is a Webpack + React project.

* `npm install`
* `npm start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`