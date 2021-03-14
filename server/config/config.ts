const defaultConfig = {
  database: {
    jsonPath: 'data/charger-document.json'
  },
  device: {
    baseUrl: 'ws://localhost:3200/widgets/',
    maxTries: 10,
  }
}

export const config = {
  database: {
    jsonPath: process.env.JSON_PATH || defaultConfig.database.jsonPath
  },
  device: {
    baseUrl: process.env.DEVICE_WS_BASE_URL || defaultConfig.device.baseUrl,
    maxTries: process.env.MAX_TRIES || defaultConfig.device.maxTries,
  }
};