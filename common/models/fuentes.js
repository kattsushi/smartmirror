import { ObjectID } from 'mongodb';
// import feedparser   from 'ortoo-feedparser';
// import FeedParser   from 'feedparser';
// import request      from 'request';
module.exports = (Fuentes)=> {

  //Obtener guardar y obtener lista de noticias por rss
  Fuentes.remoteMethod('Sources', {
        accepts: [],
        returns: [{
          arg: 'screen',
          type: 'json'
        }],
        http: {
          path:'/Sources',
          verb: 'get'
        }
  });
  //Función para eliminar la lista de noticias de un RSS especifico
  function deleteRss(idFuentes){
    return new Promise((resolve,reject)=> {
      Fuentes.getApp((err, app)=> {
          app.models.listFuentes
          .destroyAll({
            idFuentes: idFuentes
          })
          .then((result)=> {
            console.log(result);
            resolve(result);
          },(err)=> {
            if (err) { reject(err); }
          });
      });
    });
  }

  /*
  Función que se encarga de obtener las noticias rss
  y guardarlas en base de datos
  */
  function getRSS(getUrl,idFuentes) {
    return new Promise((resolve,reject)=> {
      var url = getUrl;
      var datos = [];
      // feedparser.parseUrl(url).
        on('article',(article)=> {
          console.log(article);
          var object = {};
          object.title = article.title;
          object.description = article.description;
          object.idFuentes = new ObjectID(idFuentes);
          datos.push(object);
          Fuentes.getApp((err, app)=> {
            if (err) { throw err; }
            var ListFuentes = app.models.listFuentes;
            ListFuentes
              .create(datos, (err,result)=> {
                if (err) { reject(err);}
                resolve(result);
            });
          });
        });
      });
  }
  //Metodo que obtiene los parametros del espejo
  Fuentes.Sources = (cb)=> {
    Fuentes.getApp((err, app)=> {
      app.models.Fuentes
        .find({
          where: {status: true}
        },(err,sources)=> {
          if (err) { throw err; }
          if (sources.length > 0) {
            var idFuentes = new ObjectID(sources[0].id);
            //------------------Llamar Funciones-----------------
              deleteRss(idFuentes)
                .then( getRSS( sources[0].url, idFuentes)
                .then(()=>{
                  var listFuentes = app.models.listFuentes;
                  listFuentes
                    .find({
                      where: {
                        idFuentes: sources[0]._id
                      }
                    },(err,result)=> {
                      cb(null,result);
                    });
              }));
            //------------------Llamar Funciones-----------------
          } else {
            var errQrcode = new Error('No registered sources.');
            errQrcode.statusCode = 400;
            cb(errQrcode,false);
          }
        });
    });
  };
};
