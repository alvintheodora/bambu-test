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

#### Sample responses

**Match found**

    GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false

```json
{
  "peopleLikeYou": [
    {
      "name": "Dorthea",
      "age": 24,
      "latitude": "40.7232",
      "longitude": "19.55256",
      "monthlyIncome": 5532,
      "experienced": false, 
      "score": 0.9
    },
    {
      "name": "Francesco",
      "age": 25,
      "latitude": "40.7223",
      "longitude": "19.55264",
      "monthlyIncome": 5578,
      "experienced": false,
      "score": 0.9
    },
    {
      "name": "Jarib",
      "age": 20,
      "latitude": "40.7232",
      "longitude": "19.55256",
      "monthlyIncome": 5700,
      "experienced": true,
      "score": 0.8
    },
    {
      "name": "Merv",
      "age": 22,
      "latitude": "40.7233",
      "longitude": "19.5526",
      "monthlyIncome": 6309,
      "experienced": true,
      "score": 0.6
    },
    {
      "name": "Jorrie",
      "age": 19,
      "latitude": "40.7344",
      "longitude": "19.6200",
      "monthlyIncome": 6488,
      "experienced": false,
      "score": 0.6
    },
    {
      "name": "Branden",
      "age": 27,
      "latitude": "40.4522",
      "longitude": "19.67011",
      "monthlyIncome": 4312,
      "experienced": false,
      "score": 0.5
    },
    {
      "name": "Delila",
      "age": 30,
      "latitude": "40.49492",
      "longitude": "19.25686",
      "monthlyIncome": 7340,
      "experienced": false,
      "score": 0.5
    },
    {
      "name": "Franzen",
      "age": 40,
      "latitude": "40.99926",
      "longitude": "20.55256",
      "monthlyIncome": 7437,
      "experienced": false,
      "score": 0.4
    },
    {
      "name": "Latrena",
      "age": 42,
      "latitude": "40.99232",
      "longitude": "19.55256",
      "monthlyIncome": 8822,
      "experienced": true,
      "score": 0.4
    },
    {
      "name": "Ulberto",
      "age": 37,
      "latitude": "41.7232",
      "longitude": "19.75256",
      "monthlyIncome": 8129,
      "experienced": true,
      "score": 0.4
    },
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
