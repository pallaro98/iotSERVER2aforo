function getAverageByHour(sensorData) {
    let myMap = new Map();

    sensorData.forEach(element => {
        if(myMap.has(element['timestamp'])){
            myMap.set(element['timestamp'], myMap.get(element['timestamp'])+1);
        }else {
            myMap.set(element['timestamp'], 1);
        }
    });

    let sumMap = new Map();
    let countMap = new Map();

    myMap.forEach(function(valor, clave) {
        let claveDate = new Date(clave);
        claveDate.setHours(claveDate.getHours() - 5);
        let hour = claveDate.getUTCHours();
        if(sumMap.has(hour)){
            sumMap.set(hour, sumMap.get(hour)+valor);
            countMap.set(hour, countMap.get(hour)+1);
        }else {
            sumMap.set(hour, valor);
            countMap.set(hour, 1);
        }
      })

      let today = new Date(Date.now());
      today.setHours(today.getHours() - 5);
      let strJson = '{"id": "c1", "name": "Cafeteria central", "date": "'+ today.getUTCDate()  +'/'+ (today.getUTCMonth()+1) +'/'+ today.getUTCFullYear() +'","maxCapacity": 50, "capacityLog": {';

      let isFirst = true;
      sumMap.forEach(function(valor, clave) {
        let avrg = valor/countMap.get(clave);
        if(isFirst){
            isFirst = false;
            strJson = strJson + '"' + clave + ':00": ' + avrg ;
        }else{
            strJson = strJson + ', "' + clave + ':00": ' + avrg;
        }
      })

      strJson = strJson + '}}';

      var obj = JSON.parse(strJson);

    return obj;
  }
  
  module.exports = {
    getAverageByHour
  };