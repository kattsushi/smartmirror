module.exports = function(HPersona) {
/*
  //Hooks que se encarga de apagar(false) todos los status de un idespejo para quede activo el que esta proximo a crear
  HPersona.observe('before save', function (ctx, next) {
    console.log(ctx.instance);
    console.log(ctx.instance.fkEnlaceId);

      var Persona = ctx.instance.models.hPersona;
      Persona.updateAll({fkEnlaceId: ctx.instance.fkEnlaceId},{status: false},function (err,data) {
          if (err) throw err;
          console.log("hola");
          console.log(data);
      });

      next();
});
*/
}



/*
    //Atualiza el code el _id automatico de mongodb
    Qrcode.updateAll({id: idCodeQr},{code: idCodeQr.toString()},function (err,info){
      if (err) throw err;
      console.log(info.count);
    });
*/
