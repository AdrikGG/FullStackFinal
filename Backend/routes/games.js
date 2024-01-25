const express = require('express');
const fs = require('fs');

const router = express.Router();

// Endpoint to append data to JSON and write to a file
router.post('/update-names', (req, res) => {
  const { name, id } = req.body;

  // Load existing JSON data from the file
  const filePath = './islandnames.json';
  const jsonData = require(filePath);

  // Append new data to the JSON array
  jsonData.islands.push({ name, id });

  // Write the updated JSON data to the file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  res.send('Data appended and written to the file successfully.');
});

module.exports = router;
