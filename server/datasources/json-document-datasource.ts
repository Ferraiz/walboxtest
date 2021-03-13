import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { typeErrors } from '../constants';
import { ServerError } from '../utils';

class JsonDocumentDatasource {

  public async find (document: string, filter: string): Promise<any> {
    const promiseReadFile = promisify(readFile);

    let jsonDocument: {[key: string]: any};

    try {
      jsonDocument = JSON.parse(await promiseReadFile(join(process.cwd(), document), 'utf8'));
    } catch (err) {
      throw new ServerError(typeErrors.ERROR_READING_DOCUMENT, err.message);
    }

    return jsonDocument[filter];
  }
}

export const jsonDocumentDatasource = new JsonDocumentDatasource();