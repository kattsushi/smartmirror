module.exports = function(HPersona) {

  //Hooks que se encarga de apagar(false) todos los status de un idespejo para quede activo el que esta proximo a crear
  HPersona.observe('before save', function (ctx, next) {
    console.log(ctx.instance);
    console.log(ctx.instance.enlaceId);
    console.log(ctx.instance.id);


      //var Persona = ctx.Model.app.models.hPersona;
      //console.log(Persona);
      HPersona.updateAll({enlaceId: ctx.instance.enlaceId.toString()},{status: false},function (err,data) {
          if (err) throw err;
          console.log("hola");
          console.log(data);
      });

      next();
});

}


/*
    //Atualiza el code el _id automatico de mongodb
    Qrcode.updateAll({id: idCodeQr},{code: idCodeQr.toString()},function (err,info){
      if (err) throw err;
      console.log(info.count);
    });
*/
