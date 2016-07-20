import multer  from 'multer';


export default (server) => {
  const router = server.loopback.Router();
  // Install a `/` route that returns server status

  router.get('/', server.loopback.status());

  //Proceso para carga de logo ----------INICIO--------------
  var storage =   multer.diskStorage({
    destination: (req, file, callback)=> {
      callback(null, `${__dirname}/../../admin/release/assets/pictures`);
    },
    filename: (req, file, callback)=> {
      // console.log(server.models.enlace.find());
      var Enlace = server.models.enlace;
      Enlace
        .find({
          where: {
            id_espejo: '001'
          }
        })
        .then((data)=> {
          var logoId = data[0].logo + 1;
          Enlace
            .updateAll({
              id_espejo: '001'
            },{
              logo: logoId
            })
            .then((data)=> {
                console.log(data);
                callback(null, `${logoId.toString()}.png`);
            },(err)=> {
                console.log(err);
            });
        },(err)=> {
          console.log(err);
        });
    }
  });

  var upload = multer({
    storage : storage
  }).single('file');

  router.post('/api/photo',(req,res)=> {
      upload(req,res,(err)=> {
          if(err) {
              return res.end(`Error uploading file.`);
          }
          // res.end("File is uploaded");
          res.jsonp(req.files);
          // console.log(req.files);
      });
  });
  //Proceso para carga de logo ----------FIN--------------

  //Proceso para carga de volante ----------INICIO--------------
  var storageHandout =   multer.diskStorage({
    destination: (req, file, callback)=> {
      callback(null, `${__dirname}/../../admin/release/assets/img/handout`);
      // console.log('/image');
    },
    filename: (req, file, callback)=> {
      console.log(server.models.enlace.find());
      var Enlace = server.models.enlace;
      Enlace
        .find({
          where: {
            id_espejo: '001'
          }
        })
        .then((data)=> {
          var handoutId = data[0].handout + 1;
          Enlace
            .updateAll({
              id_espejo: '001'
            },{
              handout: handoutId
            })
            .then((data)=> {
                console.log(data);
                callback(null, `${handoutId.toString()}.png`);
            },(err)=> {
                console.log(err);
            });
        },(err)=> {
          console.log(err);
        });
    }
  });

  var uploadHandout = multer({
    storage : storageHandout
  }).single('file');

  router.post('/api/handout',(req,res)=> {
    uploadHandout(req,res, (err)=> {
        if(err) {
            return res.end(`Error uploading file. ${err}`);
        }
        // res.end("File is uploaded");
        res.jsonp(req.files);
        //res.send("Hello World");
        // console.log(req.files);
    });
  });
  //Proceso para carga de volante ----------FIN--------------
  server.use(router);
};
