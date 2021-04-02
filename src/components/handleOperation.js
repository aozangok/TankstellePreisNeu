const handleOperation = (preises) => {
  let Text;
  let alert = false;
  if (preises.preisSenftl >= preises.preisAvia && preises.preisAvia > 0) {
    let diff = Math.abs(preises.preisSenftl - preises.preisAvia).toFixed(2);
    Text =
      'Der Preis der AviaTankstelle is ' +
      diff +
      ' Cent' +
      ' günstiger als der unsere ';
    alert = true;
  } else if (preises.preisSenftl > preises.preisOMV && preises.preisOMV > 0) {
    let diff = Math.abs(preises.preisSenftl - preises.preisOMV).toFixed(2);
    Text =
      'Der Preis der OMV Tankstelle is ' + diff + ' günstiger als der unsere';
    alert = true;
  } else if (preises.preisSenftl > preises.preisAral && preises.preisAral > 0) {
    let diff = Math.abs(preises.preisSenftl - preises.preisAral).toFixed(2);
    Text =
      'Der Preis der Aral Tankstelle is ' + diff + ' günstiger als der unsere';
    alert = true;
  } else if (preises.preisSenftl > preises.preisAgip && preises.preisAgip > 0) {
    let diff = Math.abs(preises.preisSenftl - preises.preisAgip).toFixed(2);
    Text =
      'Der Preis der Agip Tankstelle is ' + diff + ' günstiger als der unsere';
    alert = true;
  } else {
    Text = 'Alles in Ordnung';
  }
  return { alert, Text };
};

module.exports = handleOperation;
