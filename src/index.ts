import {
  ConvertToCoordinatesClient,
  ConvertToCoordinatesOptions,
  LocationJsonResponse,
} from '@what3words/api';
const fs = require('fs');

const API_KEY = '<YOUR-API-KEY>';
const client: ConvertToCoordinatesClient =
  ConvertToCoordinatesClient.init(API_KEY);

const words = [
  'dawn', 'parrot', 'chickens', 'locker', 'cannonball', 'washed', 'handy', 'turkey', 'misfits', 'goat', 'diet', 'lives', 'frost', 'shady', 'rocked', 'chest', 'robot'
];

fs.writeFile('w3w.csv', '', () => {})
words.forEach( w1 => {
  words.forEach( w2 => {
    words.forEach( w3 => {
      if ( w1 != w2 && w2 != w3 && w1 != w3 ) {
        const options: ConvertToCoordinatesOptions = { words: w1+'.'+w2+'.'+w3 };
          client
          .run({ ...options, format: 'json' }) // { format: 'json' } is the default response
          .then((res: LocationJsonResponse) => {
            const text = `https://what3words.com/${w1}.${w2}.${w3}\t${res.country}\t${res.language}\t${res.nearestPlace? res.nearestPlace : 'NONE'}\t${res.coordinates.lng}\t${res.coordinates.lat}\n`;
            fs.appendFileSync('w3w.csv', text);
          })
      }
    })
  })
})