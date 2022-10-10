// Run:  node index.js <Number of records> <filename> <type>
// For remote: node index.js 10000 records remote
// else: node index.js 10000 recordsElse

const faker = require('faker');
const ObjectsToCsv = require('objects-to-csv');

if (process.argv.length > 3) {
  const records = process.argv[2];

  const fileName = process.argv[3];

  const generateRecords = () => {
    let objects = [];

    for (let i = 0; i < records; i++) {
      const tempObject = {
        node_id: faker.datatype.uuid(),
        bounding_boxes: null,
        bridge_device_id: faker.datatype.uuid(),
        lat: faker.address.latitude(),
        lon: faker.address.longitude(),
        mahbatt: faker.lorem.word(),
        mobile_device_id: faker.datatype.uuid(),
        mvbatt: faker.datatype.number(),
        temp: faker.datatype.float(),
        update_timestamp: faker.date.past(),
        x: faker.datatype.float(),
        y: faker.datatype.float(),
        z: faker.datatype.float(),
      };

      objects.push(tempObject);
    }

    return objects;
  };

  const generateRecordsRemote = () => {
    let objects = [];

    for (let i = 0; i < records; i++) {
      const tempObject = {
        crl_id: faker.datatype.uuid(),
        crl_name: faker.lorem.word(),
        sw_lat: faker.address.latitude(),
        sw_lon: faker.address.longitude(),
        ne_lat: faker.address.latitude(),
        ne_lon: faker.address.longitude(),
      };

      objects.push(tempObject);
    }

    return objects;
  };

  let dataObj = [];

  if (process.argv[4] === 'remote') {
    dataObj = generateRecordsRemote();
  } else {
    dataObj = generateRecords();
  }

  (async () => {
    const csv = new ObjectsToCsv(dataObj);
    await csv.toDisk(fileName + '.csv');
  })();
} else {
  console.log('Please provide required params');
}
