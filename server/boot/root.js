module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  var multer  =   require('multer');

  router.get('/', server.loopback.status());

  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './image');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now()+'.png');
    }
  });

  var upload = multer({ storage : storage}).single('photo');

  router.post('/api/photo',function(req,res){
      upload(req,res,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
          res.end("File is uploaded");
      });
  });

  server.use(router);
};
