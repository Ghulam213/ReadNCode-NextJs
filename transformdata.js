const data = require('./data.json');
const fs = require('fs');

for (d in data) {
  data[d].publishedDate = data[d].publishedDate.$date;
  data[d].authors = data[d].authors.join(', ');
  data[d].categories = data[d].categories.join(', ');
}

const jsonData = JSON.stringify(data);

fs.writeFile('newData.json', jsonData, function () {
  console.log(jsonData);
  console.log('done');
});
