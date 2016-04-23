module.exports = function(HPersona) {

  //Hooks que se encarga de apagar(false) todos los status de un idespejo para quede activo el que esta proximo a crear
  HPersona.observe('before save', function (ctx, next) {
    console.log(ctx.instance);
    console.log(ctx.instance.enlaceId);

    if (ctx.instance){
      var Persona = ctx.Model.app.models.hPersona;
      console.log(Persona);
      Persona.updateAll({enlaceId: ctx.instance.enlaceId},{status: false}).then(function (data) {
          console.log("hola");
          console.log(data);
      },function (err) {
          console.log(err);
      });

      next();
    }
});

};
