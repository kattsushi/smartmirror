module.exports = function(Fuentes) {
  'use strict';

  //Obtener guardar y obtener lista de noticias por rss
  Fuentes.remoteMethod('Sources', {

        accepts: [
        ],
        returns: [
        {arg: 'screen', type: 'json'},
        ],
        http: {path:'/Sources', verb: 'get'}

    });

    //Función para eliminar la lista de noticias de un RSS especifico
    function deleteRss(idFuentes){
      return new Promise(function (resolve,reject) {
        Fuentes.getApp(function (err, app) {
            app.models.listFuentes
            .destroyAll({idFuentes: idFuentes}).then(
                  function (result) {
                    console.log(result);
                    resolve(result);
                  },function (err) {
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
      return new Promise(function (resolve,reject) {
          var ObjectID = require('mongodb').ObjectID;
          var feedparser = require('ortoo-feedparser');
          var url = getUrl;

          var datos = new Array();
          feedparser.parseUrl(url).
            on('article',
              function (article){
                console.log(article);
                var object = new Object();
                object.title = article.title;
                object.description = article.description;
                object.idFuentes = new ObjectID(idFuentes);
                datos.push(object);
                Fuentes.getApp(function (err, app) {
                      if (err) { throw err; }

                      var ListFuentes = app.models.listFuentes;
                      ListFuentes
                      .create(datos,
                      function (err,result) {
                            if (err) { throw err; }
                            resolve(result);
                      });
                });
          });
        });
    }

    //Metodo que obtiene los parametros del espejo
    Fuentes.Sources = function (cb) {
      var ObjectID = require('mongodb').ObjectID;
      var FeedParser = require('feedparser');
      var request = require('request');

      Fuentes.getApp(function (err, app) {
          app.models.Fuentes
          .find({
                  where: {status: true}
                },
                function (err,sources) {
                  if (err) { throw err; }

                      if (sources.length>0) {
                          var idFuentes = new ObjectID(sources[0].id);
                          //------------------Llamar Funciones-----------------
                            deleteRss(idFuentes).
                              then(getRSS(sources[0].url,idFuentes).
                                then(function() {

                                    var listFuentes = app.models.listFuentes;
                                    listFuentes.
                                    find({
                                            where: {idFuentes: sources[0]._id}
                                          },function (err,result) {
                                            cb(null,result);
                                    });
                            }));
                          //------------------Llamar Funciones-----------------
                      }
                      else {
                            var errQrcode = new Error('No registered sources.');
                            errQrcode.statusCode = 400;
                            cb(errQrcode,false);
                      }
                });
          });
      };
};
