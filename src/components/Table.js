import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const getTankstelleData = require('./getTankstellePreis');
const handleOperation = require('./handleOperation');

const URL_3 = '/tankstellen?searchText=84174&brand=0&fuel=2&range=15';

const sweetAlarm = (text) => {
  Swal.fire({
    title: text,
    width: 600,
    padding: '3em',
    background: '#ff0000',
    backdrop: `
    rgba(255, 99, 71, 0.8)    `,
  });
};
const findTankstelle = (tankstellenPreis) => {
  let preises = {
    preisAvia: null,
    preisAgip: null,
    preisOMV: null,
    preisAral: null,
    preisSenftl: null,
  };

  for (let element of tankstellenPreis) {
    if (element.name.includes('Senftl')) {
      preises.preisSenftl = element.preis;
    } else if (element.name.includes('AVIA')) {
      preises.preisAvia = element.preis;
    } else if (element.name.includes('OMV')) {
      preises.preisOMV = element.preis;
    } else if (element.name.includes('Agip')) {
      preises.preisAgip = element.preis;
    } else if (element.name.includes('Aral')) {
      preises.preisAral = element.preis;
    } else {
    }
  }

  return preises;
};

const PriceTable = () => {
  const [aTankstelle, aSetTankstelle] = useState([]);
  const [date, setDate] = useState('');

  const getTankstelleProps = async () => {
    axios
      .get(URL_3, {
        headers: {
          //'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
      })
      .then((resp) => {
        let aSetTankstellen = getTankstelleData(resp.data);
        aSetTankstelle(aSetTankstellen);
        let tankstellenPreis = findTankstelle(aSetTankstellen);
        let opResults = handleOperation();
        if (opResults.alert) {
          sweetAlarm(opResults.Text);
        }

        var now = new Date();
        setDate(now.toLocaleString());
        console.log(tankstellenPreis);
      })
      .catch((err) => {
        sweetAlarm('SERVER IS NOT AVAILABLE');
      });
  };
  useEffect(() => {
    getTankstelleProps();
    const interval = setInterval(() => {
      getTankstelleProps();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ui segment">
      {/*      <button className="ui button" onClick={() => setCount(count + 1)}>
        Click Here
      </button> */}
      <p>Letzte aktualisierung: {date} </p>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>tankstelle</TableCell>
              <TableCell align="right">preis</TableCell>
              <TableCell align="right">adresse</TableCell>
              <TableCell align="right">aktualisiert</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aTankstelle.map((tankstelle) => {
              return (
                <TableRow key={tankstelle.name}>
                  <TableCell component="th" scope="row">
                    {tankstelle.name}
                  </TableCell>
                  <TableCell align="right">{tankstelle.preis}</TableCell>
                  <TableCell align="right">{tankstelle.adress}</TableCell>
                  <TableCell align="right">{tankstelle.updateTime}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PriceTable;
