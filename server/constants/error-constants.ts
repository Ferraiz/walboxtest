export enum typeErrors {
  VALIDATION_INPUT = 'VALIDATION_INPUT',
  VALIDATION_CHARGER_ID ='VALIDATION_CHARGER_ID'
}

export const errorMessage = {
  [typeErrors.VALIDATION_INPUT]: 'Ivalid input object',
  [typeErrors.VALIDATION_CHARGER_ID]: 'Charger id can not be found'
}