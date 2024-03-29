const express = require('express');
const routes = require('./routes');
const mongoose = require("mongoose")
const supertest = require("supertest");
const config = require("./config");

jest.setTimeout(30000);
function startServer() {
  const server = express()
  server.use(express.json());
  server.use('/',routes());
  server.get('/', (req, res) => res.send('Its working!'));
  return server;
}

beforeEach((done) => {
  const { username, password, host, port, database } = config.mongoDB;
  mongoose.connect(`mongodb://${username}:${password}@${host}:${port}`, {
    dbName: database,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },() => done())
})

afterEach((done) => {
  mongoose.connection.close()
  done()
})

const app = startServer();

const testPackage = {
  "transaction_id": "d0a55a45-539f-879a-8274-899b9970b5a1",
  "customer_name": "PT. AMARA PRIMATIGA",
  "customer_code": "1678593",
  "transaction_amount": "70700",
  "transaction_discount": "0",
  "transaction_additional_field": "",
  "transaction_payment_type": "29",
  "transaction_state": "PAID",
  "transaction_code": "CGKFT20200715121",
  "transaction_order": 121,
  "location_id": "5cecb20b6c49615b174c3e74",
  "organization_id": 6,
  "created_at": "2020-07-15T11:11:12+0700",
  "updated_at": "2020-07-15T11:11:22+0700",
  "transaction_payment_type_name": "Invoice",
  "transaction_cash_amount": 0,
  "transaction_cash_change": 0,
  "customer_attribute": {
    "Nama_Sales": "Radit Fitrawikarsa",
    "TOP": "14 Hari",
    "Jenis_Pelanggan": "B2B"
  },
  "connote": {
    "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
    "connote_number": 1,
    "connote_service": "ECO",
    "connote_service_price": 70700,
    "connote_amount": 70700,
    "connote_code": "AWB00100209082020",
    "connote_booking_code": "",
    "connote_order": 326931,
    "connote_state": "PAID",
    "connote_state_id": 2,
    "zone_code_from": "CGKFT",
    "zone_code_to": "SMG",
    "surcharge_amount": null,
    "transaction_id": "d0090c40-539f-479a-8274-899b9970bddc",
    "actual_weight": 20,
    "volume_weight": 0,
    "chargeable_weight": 20,
    "created_at": "2020-07-15T11:11:12+0700",
    "updated_at": "2020-07-15T11:11:22+0700",
    "organization_id": 6,
    "location_id": "5cecb20b6c49615b174c3e74",
    "connote_total_package": "3",
    "connote_surcharge_amount": "0",
    "connote_sla_day": "4",
    "location_name": "Hub Jakarta Selatan",
    "location_type": "HUB",
    "source_tariff_db": "tariff_customers",
    "id_source_tariff": "1576868",
    "pod": null,
    "history": []
  },
  "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
  "origin_data": {
    "customer_name": "PT. NARA OKA PRAKARSA",
    "customer_address": "JL. KH. AHMAD DAHLAN NO. 100, SEMARANG TENGAH 12420",
    "customer_email": "info@naraoka.co.id",
    "customer_phone": "024-1234567",
    "customer_address_detail": null,
    "customer_zip_code": "12420",
    "zone_code": "CGKFT",
    "organization_id": 6,
    "location_id": "5cecb20b6c49615b174c3e74"
  },
  "destination_data": {
    "customer_name": "PT AMARIS HOTEL SIMPANG LIMA",
    "customer_address": "JL. KH. AHMAD DAHLAN NO. 01, SEMARANG TENGAH",
    "customer_email": null,
    "customer_phone": "0248453499",
    "customer_address_detail": "KOTA SEMARANG SEMARANG TENGAH KARANGKIDUL",
    "customer_zip_code": "50241",
    "zone_code": "SMG",
    "organization_id": 6,
    "location_id": "5cecb20b6c49615b174c3e74"
  },
  "koli_data": [
    {
      "koli_length": 0,
      "awb_url": "https://tracking.mile.app/label/AWB00100209082020.1",
      "created_at": "2020-07-15 11:11:13",
      "koli_chargeable_weight": 9,
      "koli_width": 0,
      "koli_surcharge": [],
      "koli_height": 0,
      "updated_at": "2020-07-15 11:11:13",
      "koli_description": "V WARP",
      "koli_formula_id": null,
      "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
      "koli_volume": 0,
      "koli_weight": 9,
      "koli_id": "e2cb6d86-0bb9-409b-a1f0-389ed4f2df2d",
      "koli_custom_field": {
        "awb_sicepat": null,
        "harga_barang": null
      },
      "koli_code": "AWB00100209082020.1"
    },
    {
      "koli_length": 0,
      "awb_url": "https://tracking.mile.app/label/AWB00100209082020.2",
      "created_at": "2020-07-15 11:11:13",
      "koli_chargeable_weight": 9,
      "koli_width": 0,
      "koli_surcharge": [],
      "koli_height": 0,
      "updated_at": "2020-07-15 11:11:13",
      "koli_description": "V WARP",
      "koli_formula_id": null,
      "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
      "koli_volume": 0,
      "koli_weight": 9,
      "koli_id": "3600f10b-4144-4e58-a024-cc3178e7a709",
      "koli_custom_field": {
        "awb_sicepat": null,
        "harga_barang": null
      },
      "koli_code": "AWB00100209082020.2"
    },
    {
      "koli_length": 0,
      "awb_url": "https://tracking.mile.app/label/AWB00100209082020.3",
      "created_at": "2020-07-15 11:11:13",
      "koli_chargeable_weight": 2,
      "koli_width": 0,
      "koli_surcharge": [],
      "koli_height": 0,
      "updated_at": "2020-07-15 11:11:13",
      "koli_description": "LID HOT CUP",
      "koli_formula_id": null,
      "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
      "koli_volume": 0,
      "koli_weight": 2,
      "koli_id": "2937bdbf-315e-4c5e-b139-fd39a3dfd15f",
      "koli_custom_field": {
        "awb_sicepat": null,
        "harga_barang": null
      },
      "koli_code": "AWB00100209082020.3"
    }
  ],
  "custom_field": {
    "catatan_tambahan": "JANGAN DI BANTING / DI TINDIH"
  },
  "currentLocation": {
    "name": "Hub Jakarta Selatan",
    "code": "JKTS01",
    "type": "Agent"
  }
}

const put_test_id="d0a55a45-539f-879a-8274-899b9970bad9";
const patch_test_id="d0090c40-539f-479a-8274-899b9970bddc";

test("GET all package", async () => {

  await supertest(app).get("/package")
    .expect(200);
    
});

test("POST package", async () => {

  await supertest(app).post("/package").send(testPackage)
  .expect(200);
      
});

test("GET package", async () => {

    await supertest(app).get("/package/"+testPackage.transaction_id)
      .expect(200);
      
});

test("DELETE package", async () => {

    await supertest(app).delete("/package/"+testPackage.transaction_id)
    .expect(200);
      
});

test("PUT package", async () => {
  // testPackage.transaction_id=put_test_id;
  await supertest(app).put("/package/"+put_test_id).send(testPackage)
  .expect(200);
    
});

test("PATCH package", async () => {
  // testPackage.transaction_id=patch_test_id;
  await supertest(app).patch("/package/"+patch_test_id).send(testPackage)
  .expect(200);
    
});