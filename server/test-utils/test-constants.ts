export const validationChargerIdError = /^\[VALIDATION_CHARGER_ID\]##[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}::[0-9]{1,4}## Charger id can not be found -- .*: .*$/gs;
export const validationInputError = /^\[VALIDATION_INPUT\]##[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}::[0-9]{1,4}## Ivalid input object -- .*: .*$/gs;
export const readingDocumentError = /^\[ERROR_READING_DOCUMENT\]##[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}::[0-9]{1,4}## Data document can not be read -- .*: .*$/gs;