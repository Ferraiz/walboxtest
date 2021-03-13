export const wsIncommingChargerSchema = {
  "id": "/IncommingChargerSchema",
  "type": "object",
  "properties": {
    "event": {
      "type": "string",
      "enum": [ "StateOfCharge" ]
    },
    "data": {
      "type": "object",
      "properties": {
        "soc": {
          "type": "number"
        }
      },
      "required": ["soc"]
    }
  },
  "required": ["event", "data"]
};