const handleOperation = (preises) => {
  let Text;
  let alert = false;
  if (preises.preisSenftl >= preises.preisAvia) {
    this.setState({ alert: true });
    let diff = (preises.preisSenftl - preises.preisAvia).toFixed(2);
    Text =
      ' Alerttt!!! The Preises of AviaTankstelle is ' +
      diff +
      ' Cent' +
      ' cheaper than ours... ';
  } else if (preises.preisSenftl > preises.preisOMV) {
    Text =
      ' Alerttt!!! The Preises of OMV Tankstelle is ' +
      preises.preisSenftl -
      preises.preisAvia +
      ' cheaper than ours... ';
    alert = true;
  } else if (preises.preisSenftl > preises.preisAral) {
    Text =
      ' Alerttt!!! The Preises of Aral Tankstelle is ' +
      preises.preisSenftl -
      preises.preisAvia +
      ' cheaper than ours... ';
    alert = true;
  } else if (preises.preisSenftl > preises.preisAgip) {
    this.setState({ alert: true });

    Text =
      ' Alerttt!!! The Preises of Agip Tankstelle is ' +
      preises.preisSenftl -
      preises.preisAvia +
      ' cheaper than ours... ';
    alert = true;
  } else {
    Text = 'Alles in Ordnung';
  }
  return { alert, Text };
};

module.exports = handleOperation;
