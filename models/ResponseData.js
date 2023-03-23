const mongoose = require("mongoose");

const responseDataSchema = new mongoose.Schema({
	resource: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "LocationData",
	},
	URL: {
		type: String,
    required: true,
	},
  waypoints: {
    type: JSON,
    required: false,
  },
  quantity: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: false,
  },
	disaster: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "DisasterData",
	},
	status : {
		type: String,
		enum: ["Pending","Active","Resolved"],
    required: true,
	}
});

module.exports = mongoose.model("ResponseData", responseDataSchema);
