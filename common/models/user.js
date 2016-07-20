import { ObjectID } from 'mongodb';

module.exports = (User)=> {
  User.observe('after save', (ctx, next)=> {
    var Config = ctx.Model.app.models.config;
    Config
      .find({
        where: {

        }
      }, (err, config)=> {
        var Role = ctx.Model.app.models.Role;
        Role
          .find({
            where: {
              name: config[0].rolDefault
            }
          }, (err,role)=> {
            if (err) {throw err;}
            var RoleMapping = ctx.Model.app.models.RoleMapping;
            RoleMapping
              .create({
                principalType: 'USER',
                principalId: ctx.instance.id,
                roleId: new ObjectID(role[0].id)
              },(err, roleMapping )=> {
                if (err) {throw err;}
                console.log(roleMapping);
            });
        });
      });
    next();
  });
};
