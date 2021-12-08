const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    transaction_id: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_code: {
      type: String,
      required: true,
    },
    transaction_amount: {
      type: String,
      required: true,
    },
    transaction_discount: {
      type: String,
      required: true,
    },
    transaction_additional_field: {
      type: String,
      required: false,
    },
    transaction_payment_type: {
      type: String,
      required: true,
    },
    transaction_state: {
      type: String,
      required: true,
    },
    transaction_code: {
      type: String,
      required: true,
    },
    transaction_order: {
      type: Number,
      required: true,
    },
    location_id: {
      type: String,
      required: true,
    },
    organization_id: {
      type: Number,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    updated_at: {
      type: String,
      required: true,
    },
    transaction_payment_type_name: {
      type: String,
      required: true,
    },
    transaction_cash_amount: {
      type: Number,
      required: true,
    },
    transaction_cash_change: {
      type: Number,
      required: true,
    },
    customer_attribute: {
      type: Object,
      required: false,
    },
    connote: {
      type: Object
      // connote_id: {
      //   type: String,
      // },
      // connote_number: {
      //   type: Number,
      // },
      // connote_service: {
      //   type: String,
      // },
      // connote_service_price: {
      //   type: Number,
      // },
      // connote_amount: {
      //   type: Number,
      // },
      // connote_code: {
      //   type: String,
      // },
      // connote_booking_code: {
      //   type: String,
      // },
      // connote_order: {
      //   type: Number,
      // },
      // connote_state_id: {
      //   type: Number,
      // },
      // surcharge_amount: {
      //   type: Number,
      // },
      // transaction_id: {
      //   type: String,
      // },
      // actual_weight: {
      //   type: Number,
      // },
      // volume_weight: {
      //   type: Number,
      // },
      // chargeable_weight: {
      //   type: Number,
      // },
      // created_at: {
      //   type: String,
      // },
      // updated_at: {
      //   type: String,
      // },
      // organization_id: {
      //   type: Number,
      // },
      // location_id: {
      //   type: String,
      // },
      // connote_total_package: {
      //   type: String,
      // },
      // connote_surcharge_amount: {
      //   type: String,
      // },
      // connote_sla_day: {
      //   type: String,
      // },
      // location_name: {
      //   type: String,
      // },
      // location_type: {
      //   type: String,
      // },
      // source_tariff_db: {
      //   type: String,
      // },
      // id_source_tariff: {
      //   type: String,
      // },
      // pod: {
      //   type: String,
      // },
      // history: {
      //   type: Object,
      // },
    },
    connote_id:{
      type: String,
    },
    origin_data: {
      type: Object,
      required: true,
    },
    destination_data: {
      type: Object,
      required: true,
    },
    koli_data: {
      type: Object,
      required: false,
    },
    custom_field: {
      type: Object,
      required: false,
    },
    currentLocation: {
      type: Object,
      required: false,
    },
  },
  { collection: "package" }
);

packageSchema.index(
  {"_id": 1},
  {"transaction_id": 1},
);

const packageMongo = mongoose.model("package", packageSchema);

module.exports = {
  packageMongo,
};
