import loopback   from 'loopback';
import boot       from 'loopback-boot';
import bodyParser from 'body-parser';
import multer     from 'multer';

const app = module.exports = loopback();

app.start = ()=> {
  // start the web server
  return app.listen(()=> {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err)=> {
  if (err) {throw err;}

  // start the server if `$ node server.js`
  if (require.main === module){
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
  }
  app.start();
});
