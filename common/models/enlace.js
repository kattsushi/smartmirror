module.exports = function(Enlace) {

Enlace.Event = function (status, cb) {
    console.log(status);
    if (status){
        Enlace.create({status: status}).then(function (data) {
            console.log(data);
        },function (err) {
            console.log(err);
        });
        cb(null,status);
    }else{
        Enlace.create({status: status}).then(function (data) {
            console.log(data);
        },function (err) {
            console.log(err);
        });
        cb(null,status);
    }

};

    Enlace.remoteMethod('Event', {

          accepts: [
            {arg: 'status', type: 'boolean'},
          ],
          returns: {arg: 'success', type: 'boolean'},
          http: {path:'/Event', verb: 'get'}

      });
};
