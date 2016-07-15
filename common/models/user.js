module.exports = function(User) {

  /*Hooks que crea automaticamente un grupo
  (defaul - lista de contactos) y
  RoleMapping (visit - rol del usuario)
  para el nuevo usuario registrado*/
  User.observe('after save', function (ctx, next) {

    var ObjectID = require('mongodb').ObjectID;
    var Config = ctx.Model.app.models.config;

    Config
      .find({
                where: {}
            },
      function (err, config) {
            var Role = ctx.Model.app.models.Role;
            Role
              .find({
                      where: {
                                name: config[0].rolDefault
                             }
                    },
              function (err,role) {
                if (err) {throw err;}
                  var RoleMapping = ctx.Model.app.models.RoleMapping;
                  RoleMapping
                    .create({
                              principalType: 'USER',
                              principalId: ctx.instance.id,
                              roleId: new ObjectID(role[0].id)
                            },
                    function (err, roleMapping) {
                      if (err) {throw err;}
                  });
            });
      });
    next();
  });

};
