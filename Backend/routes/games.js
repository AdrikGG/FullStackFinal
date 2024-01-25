const express = require('express');
const fs = require('fs');

require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();

// Endpoint to append data to JSON and write to a file
router.post('/update-names', (req, res) => {
  const { name, id } = req.body;

  // Load existing JSON data from the file
  const filePath = './islandNames.json';
  const jsonData = require(filePath);

  // Append new data to the JSON array
  jsonData.islands.push({ name, id });

  // Write the updated JSON data to the file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  res.send('Data appended and written to the file successfully.');
});

router.get('/silhouettes', async (req, res) => {
  try {
    // Fetch all images in the 'country_silhouettes' folder
    const images = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'country_silhouettes/',
      max_results: 1000
    });

    // Extract URLs from the response
    const imageUrls = images.resources.map((resource) => resource.url);

    // Send the URLs as a JSON response
    res.json({ images: imageUrls });
  } catch (error) {
    console.error('Error retrieving images from Cloudinary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
