var express = require('express');
var router = express.Router();
var photos = require('../models/photo');

// fetch all the list of photos
router.get('/', function (req, res, next) {
  let photoData = [];
  let user = req.user;
  let userId = user.id;
  photos.forEach((photo) => {
    if (photo.userId == userId) {
      photoData.push(photo);
    }
  })
  res.json(photoData);
});

// fetch the photo based on specific photo id
router.get('/:id', function (req, res, next) {
  let photoId = req.params.id;
  let user = req.user;
  let userId = user.id;
  let photoData;
  let flag = false;
  photos.forEach((photo) => {
    if (photo.photoId == photoId) {
      photoData = photo;
      if(photoData.userId == userId){
        flag = true;
      }
    }
  })
  if(flag){
    res.json(photoData);
  }
  else{
    res.json({'status':400, 'message':'photo id not matched with logged in user'})
  }
  
});

module.exports = router;