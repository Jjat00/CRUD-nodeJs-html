const basedatos = require('./basedatos');
module.exports = (app) => {
  app.use('/basedatos', basedatos);
};