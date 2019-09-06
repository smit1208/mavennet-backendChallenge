var express = require('express');
var router = express.Router();
var albums = require('../models/album');

// fetch the list of all available albums
router.get('/', function (req, res, next) {
  let albumData = [];
  let user = req.user;
  let userId = user.id;
  albums.forEach((album) => {
    if (album.uid == userId) {
      albumData.push(album);
    }
  })
  res.json(albumData);
});

// retrieve the albums based on the album id
router.get('/:id', function (req, res, next) {
  let albumId = req.params.id;
  let user = req.user;
  let userId = user.id;
  let albumData;
  let flag = false;
  albums.forEach((album) => {
    if (album.albumId == albumId) {
      albumData = album;
      if(albumData.uid == userId){
        flag = true;
      }
    }
  })
  if(flag){
    res.json(albumData);
  }else{
    res.json({'status':400, 'message':'Album id not matched with logged in user'})
  }
});

module.exports = router;