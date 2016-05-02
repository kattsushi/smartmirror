module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  var multer  =   require('multer');

  router.get('/', server.loopback.status());

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, __dirname +'/../../client/dist/assets/images');
      // console.log('/image');
    },
    filename: function (req, file, callback) {
      console.log(server.models.enlace.find());
      var Enlace = server.models.enlace;

      Enlace
      .find({where:{id_espejo: '001'}})
      .then(function (data) {
        var logoId = data[0].logo + 1;
        Enlace
        .updateAll({id_espejo: '001'},{logo:logoId})
        .then(function (data) {
            console.log(data);
            callback(null, logoId.toString() +'.png');
        },function (err) {
            console.log(err);
        });
      }, function (err) {
        console.log(err);
      });


    }
  });

  var upload = multer({ storage : storage}).single('file');

  router.post('/api/photo',function(req,res){

      upload(req,res,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
          // res.end("File is uploaded");
          res.jsonp(req.files);
          // console.log(req.files);
      });
  });

  server.use(router);
};
