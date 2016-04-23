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

    //
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
};
