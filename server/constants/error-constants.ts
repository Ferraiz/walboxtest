export enum typeErrors {
  VALIDATION_INPUT = 'VALIDATION_INPUT',
  VALIDATION_CHARGER_ID ='VALIDATION_CHARGER_ID',
  ERROR_READING_DOCUMENT = 'ERROR_READING_DOCUMENT'
}

export const errorMessage = {
  [typeErrors.VALIDATION_INPUT]: 'Ivalid input object',
  [typeErrors.VALIDATION_CHARGER_ID]: 'Charger id can not be found',
  [typeErrors.ERROR_READING_DOCUMENT]: 'Data document can not be read'
}