module.exports = function(Enlace) {

Enlace.Event = function (status, cb) {

    //console.log(status);
    if (status){
        Enlace.updateAll({id: 1},{status: status}).then(function (data) {
            console.log(data);
        },function (err) {
            console.log(err);
        });
        Enlace.find({ where: {id: 1}},
          function (err,result) {
            if (err) throw err;

            if (result.length>0){
                var seconds = result[0].seconds;
                console.log(result);
                cb(null,status,seconds);
            }
        });
    }else{
        Enlace.updateAll({id: 1},{status: status}).then(function (data) {
            console.log(data);
        },function (err) {
            console.log(err);
        });
        Enlace.find({ where: {id: 1}},
          function (err,result) {
            if (err) throw err;

            if (result.length>0){
                var seconds = result[0].seconds;
                console.log(result);
                cb(null,status,seconds);
            }
        });
    }

};

    //
    Enlace.remoteMethod('Event', {

          accepts: [
            {arg: 'status', type: 'boolean'},
          ],
          returns: [{arg: 'success', type: 'boolean'},
          {arg: 'seconds', type: 'number'}],
          http: {path:'/Event', verb: 'get'}

      });
};
