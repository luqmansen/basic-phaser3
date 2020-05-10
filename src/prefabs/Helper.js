
export default class Helper{

    
}


export function importAll(r) {
    let assets = {};
    r.keys().map((item, index) => { assets[item.replace('./', '')] = r(item); });
    return assets;
  }