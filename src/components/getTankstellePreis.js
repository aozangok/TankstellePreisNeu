const htmlparser2 = require('htmlparser2');

let inPreis = false;
let inName = false;
let inAdress = false;
let inTime = false;
let item = 0;
let href_value = false;

let Tansktelle = {
  name: '',
  preis: null,
  adress: '',
  updateTime: null,
};
let Tankstellen = [];

const parser = new htmlparser2.Parser(
  {
    onattribute(name, value) {
      if (
        (name === 'href' &&
          value ===
            '/tankstelle/877a6b0f/senftl-gmbh-hauptstr-9-84174-eching-viecht') ||
        value ===
          '/tankstelle/ba87ba9/omv-erlbacher-str-4-84172-buch-am-erlbach' ||
        value ===
          '/tankstelle/63106b10/aral-tankstelle-gewerbepark-sporer-au-1-85368-wang-bei-moosburg' ||
        value === '/tankstelle/ba264f06/agip-wittstrasse-15-84036-landshut' ||
        value === '/tankstelle/adda526f/avia-am-lenghardt-5-84174-eching'
      ) {
        Tankstellen.push(Object.create(Tansktelle));
        href_value = true;
      }
      if (
        name === 'class' &&
        value === 'PriceList__itemPrice h1' &&
        href_value === true
      ) {
        inPreis = true;
      }
      if (
        name === 'class' &&
        value === 'PriceList__itemTitle' &&
        href_value === true
      ) {
        inName = true;
      }
      if (
        name === 'class' &&
        value === 'PriceList__itemSubtitle' &&
        href_value === true
      ) {
        inAdress = true;
      }
      if (
        name === 'class' &&
        value === 'PriceList__itemUpdated' &&
        href_value === true
      ) {
        inTime = true;
      }
    },
    ontext(text) {
      if (inPreis) {
        inPreis = false;
        Tankstellen[item].preis = text.trim();
      }
      if (inName) {
        inName = false;
        Tankstellen[item].name = text.trim();
      }
      if (inAdress) {
        inAdress = false;
        Tankstellen[item].adress = text.trim();
      }
      if (inTime) {
        inTime = false;
        Tankstellen[item].updateTime = text.trim();
        item++;
        href_value = false;
      }
    },
    onclosetag(tagname) {
      if (tagname === 'html') {
        inPreis = false;
      }
    },
  },
  { decodeEntities: true }
);

const getTankstelleData = (data) => {
  if (Tankstellen.length > 0) {
    Tankstellen = [];
    item = 0;
  }

  parser.write(data);
  parser.end();
  return Tankstellen;
};

module.exports = getTankstelleData;
