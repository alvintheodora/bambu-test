import { getNameScore, getNumberRangeScore, getExperiencedScore } from './utils';
import express from 'express';
import csv from 'csv-parser';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000

const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => { });

app.get('/', function (req, res) {
  res.send('BAMBU Backend Engineer Test - Alvin Theodora');
})

app.get('/people-like-you', function (req, res) {   
    results.forEach((result)=>{
      let totalScore = 0;
      let scoreCategory = 0;
      if(req.query.name){
        totalScore += getNameScore(result.name, req.query.name);      
        scoreCategory++;   
      }  
      if(req.query.age){
        totalScore += getNumberRangeScore(result.age, req.query.age, 18 , 100);  
        scoreCategory++;          
      }  
      if(req.query.latitude){
        totalScore += getNumberRangeScore(result.latitude, req.query.latitude, -90, 90);  
        scoreCategory++;         
      }   
      if(req.query.longitude){
        totalScore += getNumberRangeScore(result.longitude, req.query.longitude, -180, 180);  
        scoreCategory++;         
      }   
      if(req.query.monthlyIncome){
        totalScore += getNumberRangeScore(result["monthly income"], req.query.monthlyIncome, 3000, 20000);  
        scoreCategory++;         
      }   
       if(req.query.experienced){
        totalScore += getExperiencedScore(result.experienced, req.query.experienced);  
        scoreCategory++;          
      }   
     
      result.score = totalScore/scoreCategory;
    })

    //sort descending based on score
    const topResults = results.sort((a,b) => b.score-a.score).slice(0,10).filter((result)=>{return result.score >= 0 && result.score <= 1});

    res.send({ "peopleLikeYou": topResults });
  })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
