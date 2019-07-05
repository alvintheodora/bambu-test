# BAMBU Backend Engineer Test - Alvin Theodora

With a data in this repo, build an API that sends 10 potential investor similar with a person described in the query parameters.

- the endpoint is exposed at `people-like-you`
- each of the terms in the query parameters is optional
- the endpoint returns a JSON response with an array of scored suggested matches
    - the suggestions are sorted by descending score
    - each suggestion has a score between 0 and 1 indicating confidence in the suggestion (1 is most confident)

## Alvin's Task Description

- Using [express](https://expressjs.com/) as the Node.js web application framework
- Using [babel](https://babeljs.io/) to support `import`
- The scoring system is implemented in `utils.js` and can be described as follows:
    - `getNameScore` using Levenshtein distance [https://en.wikipedia.org/wiki/Levenshtein_distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
    - `getNumberRangeScore` using custom min&max value for `age, latitude, longitude, monthly income`, for example `age` using min age 18 and max age 100.
    - `getExperiencedScore` returns `1` if `experienced` is matched, otherwise returns `0`
- Each query parameters/category has the same weight contributing to the score using the `result.score = totalScore/scoreCategory;`
- The result will only be shown if the `score` is in the range of >=0 and <=1

## Setup - Development

### **1. Clone the repository**

```bash
git clone https://github.com/alvintheodora/bambu-test.git
cd bambu-test
```

### **2. NPM**

```bash
npm install
npm run devStart
```

## Sample responses

**Match found**

    GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false

```json
{
    "peopleLikeYou": [
        {
            "name": "Seumas",
            "age": "23",
            "latitude": "42.0384767",
            "longitude": "21.5739781",
            "monthly income": "5266",
            "experienced": "false",
            "score": 0.9946632135457516
        },
        {
            "name": "Lulu",
            "age": "25",
            "latitude": "41.4410475",
            "longitude": "22.0126949",
            "monthly income": "5256",
            "experienced": "false",
            "score": 0.990087596373107
        },
        {
            "name": "Orran",
            "age": "21",
            "latitude": "41.96571",
            "longitude": "22.7708273",
            "monthly income": "5290",
            "experienced": "false",
            "score": 0.9894834533731072
        },
        {
            "name": "Gwennie",
            "age": "21",
            "latitude": "41.9662209",
            "longitude": "23.0756589",
            "monthly income": "5213",
            "experienced": "false",
            "score": 0.9884076524646102
        },
        {
            "name": "Arlette",
            "age": "22",
            "latitude": "44.2682727",
            "longitude": "19.8906547",
            "monthly income": "5999",
            "experienced": "false",
            "score": 0.9875641706522398
        },
        {
            "name": "Jeddy",
            "age": "25",
            "latitude": "38.0329785",
            "longitude": "23.831904",
            "monthly income": "5305",
            "experienced": "false",
            "score": 0.9874763796835644
        },
        {
            "name": "Trudi",
            "age": "21",
            "latitude": "40.2259198",
            "longitude": "21.8296162",
            "monthly income": "6005",
            "experienced": "false",
            "score": 0.9873783044155907
        },
        {
            "name": "Dex",
            "age": "21",
            "latitude": "44.9794968",
            "longitude": "19.6209662",
            "monthly income": "5760",
            "experienced": "false",
            "score": 0.9872964889123228
        },
        {
            "name": "Kathlin",
            "age": "22",
            "latitude": "43.6158299",
            "longitude": "13.518915",
            "monthly income": "5131",
            "experienced": "false",
            "score": 0.9866386464725011
        },
        {
            "name": "Neils",
            "age": "25",
            "latitude": "44.4410356",
            "longitude": "18.1173229",
            "monthly income": "5167",
            "experienced": "false",
            "score": 0.9862609273273553
        }
    ]
}
```

**Match not found**

    GET /people-like-you?age=1000

```json
{
  "peopleLikeYou": []
}
```
