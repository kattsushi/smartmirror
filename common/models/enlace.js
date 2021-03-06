module.exports = function(Enlace) {

Enlace.Event = function (status, id_espejo, cb) {

    //console.log(status);
    if (status){
        Enlace.updateAll({id_espejo: id_espejo},{screen: status}).then(function (data) {
            console.log(data);
        },function (err) {
            console.log(err);
        });
        Enlace.find({ where: {id_espejo: id_espejo}},
          function (err,result) {
            if (err) throw err;

            if (result.length>0){
                var timeoff = result[0].timeoff;
                var idespejo = result[0].id_espejo;
                console.log(status);

                cb(null,status,timeoff,idespejo);
            }
        });
    }else{
        Enlace.updateAll({id_espejo: id_espejo},{screen: status}).then(function (data) {
            console.log(data);
        },function (err) {
            console.log(err);
        });
        Enlace.find({ where: {id_espejo: id_espejo}},
          function (err,result) {
            if (err) throw err;

            if (result.length>0){
                var timeoff = result[0].timeoff;
                var idespejo = result[0].id_espejo;
                console.log(status);

                cb(null,status,timeoff,idespejo);
            }
        });
    }

};

    //Evento que se comunica con detector de rostros
    Enlace.remoteMethod('Event', {

          accepts: [
            {arg: 'status', type: 'boolean'},
            {arg: 'id_espejo', type: 'string'}
          ],
          returns: [
          {arg: 'screen', type: 'boolean'},
          {arg: 'timeoff', type: 'number'},
          {arg: 'id_espejo', type: 'string'}
          ],
          http: {path:'/Event', verb: 'get'}

      });

      //Metodo que obtiene los parametros del espejo
      Enlace.parameterMirror = function (id_espejo, view, cb) {
        //cb(null,false);
        Enlace.find({fields: {_id: false,view: false,description: false,coment: false,name: false,logo: false},where: {id_espejo: id_espejo, view: view}},
          function (err,result) {
            if (err) { throw err; }

            if (result.length>0){

                var ip = result[0].ip;
                var port = result[0].port;
                var timeoff = result[0].timeoff;
                var interval = result[0].interval;
                var id_espejo = result[0].id_espejo;
                var dir = result[0].dir;
                var vscreen = result[0].screen;
                var update = result[0].update;
                var effect = result[0].effect;
                var flash = result[0].flash;
                var cres_width = result[0].cres_width;
                var cres_height = result[0].cres_height;
                var front_camera = result[0].front_camera;

                //cb(null,status,timeoff,idespejo);
                cb(null,ip,port,timeoff,interval,id_espejo,dir,vscreen,update,effect,flash,cres_width,cres_height,front_camera);
            }
            else {
              var errQrcode = new Error('Error the data it was not obtained.');
              errQrcode.statusCode = 400;
              cb(errQrcode,false);
            }

        });
      };

      //Obtener parametros del espejo
      Enlace.remoteMethod('parameterMirror', {

            accepts: [
              {arg: 'id_espejo', type: 'string'},
              {arg: 'view', type: 'number'}
            ],
            returns:[
              {arg: 'ip', type: 'string'},
              {arg: 'port', type: 'string'},
              {arg: 'timeoff', type: 'string'},
              {arg: 'interval', type: 'number'},
              {arg: 'id_espejo', type: 'string'},
              {arg: 'dir', type: 'number'},
              {arg: 'screen', type: 'boolean'},
              {arg: 'update', type: 'boolean'},
              {arg: 'effect', type: 'string'},
              {arg: 'flash', type: 'string'},
              {arg: 'cres_width', type: 'number'},
              {arg: 'cres_height', type: 'number'},
              {arg: 'front_camera', type: 'boolean'}
            ],
            http: {path:'/parameterMirror', verb: 'get'}

        });

};
