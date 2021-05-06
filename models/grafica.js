var {mongoose} = require('../config/mongodb-connect');

const Schema = mongoose.Schema;

const graficaSchema = new Schema ({
    address: String,
    rssi: Number,
    manufacturerData: String,
    timestamp: Number
})

//get all
graficaSchema.statics.queryGrafica = function () {
    let Grafica = this;
    let hoy = Date.now();
    let ayer = new Date();
    ayer.setDate(ayer.getDate()-1);
    var query = Grafica.find({ timestamp: { $gt: ayer.getTime(), $lt: hoy} });
    return query.exec();
}

let Grafica = mongoose.model('sensorData', graficaSchema);

module.exports = {Grafica};
