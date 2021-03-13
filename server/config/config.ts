const defaultConfig = {
  database: {
    jsonPath: 'data/charger-document.json'
  }
}

export const config = {
  database: {
    jsonPath: process.env.JSON_PATH || defaultConfig.database.jsonPath
  }
};