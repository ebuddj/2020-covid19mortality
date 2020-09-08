# 2020-covid19mortality

**Live demo** https://ebuddj.github.io/2020-covid19mortality/

## Weekly mortality

This project compares the average weekly cumulative mortality in selected countries between 2015 and 2019 to the weekly mortality in 2020.

For example in France the cumulative mortality in 2020 compared to 2015–2019 was at the worst after week 26, rising up to +22,646. Respectively in Spain the mortality is showing +44,635 deaths up to week 33 in year 2020 than in average between 2015 and 2019.

Respectively other countries have survived with much less extra mortality. These countries include for example the Baltic Countries, Norway and Finland.

In the animation the bars show the weekly comparision and the line represents the cumulative value.

Countries included in the dataset: Austria, Belgium, Bulgaria, Czech Republic, Denmark, England & Wales, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Israel, Italy, Latvia, Lithuania, Luxembourg, Netherlands, Norway, Poland, Portugal, Scotland, Slovakia, Slovenia, Spain, Sweden, Switzerland and U.S.A.

Croatia and Russia only have data preceding 2020.

See `data/data_mortality.xlsx` for complete dataset.

Data has been updated 2020-09-04.

### Mortality data collected by media

* [The Economist](https://github.com/TheEconomist/covid-19-excess-deaths-tracker) 
* [The New York Times](https://github.com/nytimes/covid-19-data/tree/master/excess-deaths)
* [The Financial Times](https://github.com/Financial-Times/coronavirus-excess-mortality-data)

### Studies and articles

* [Estimating the burden of COVID-19 on mortality, life expectancy and lifespan
inequality in England and Wales: A population-level analysis](https://www.medrxiv.org/content/10.1101/2020.07.16.20155077v1.full.pdf)
* [¿Qué nos dicen las actas de defunción de la CDMX?](https://datos.nexos.com.mx/?p=1388)
** [Vähäinen testaus ja epidemian piilottelu vääristävät maailman koronatilastoja – iso osa kuolemista ei päädy niihin](https://yle.fi/uutiset/3-11374008)
* [A pandemic primer on excess mortality statistics and their comparability across countries](https://ourworldindata.org/covid-excess-mortality)

**Sources**
* [Eurostat](https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=demo_r_mwk_ts&lang=en)
* [Office for National Statistics](https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/weeklyprovisionalfiguresondeathsregisteredinenglandandwales)
* [The Human Mortality Database](https://www.mortality.org/)

**EBU links**
* []()

**Used by**
* [Yle/Finland]()

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