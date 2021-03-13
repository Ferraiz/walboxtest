import { errorMessage, typeErrors} from '../constants';

export class ServerError extends Error {

  private errorServerType: typeErrors;
  private errorServerMsg: string;

  get customMessage(): string {
    return `[${this.errorServerType}]##${this.getCurrentDate()}## ${this.errorServerMsg} -- ${this.message}: ${this.stack}`;
  }

  constructor(errorType: typeErrors, message: string) {
    super(message);
    this.errorServerType = errorType;
    this.errorServerMsg = errorMessage[this.errorServerType] || 'Undefined error';
  }

  private getCurrentDate() {
    const currentDate = new Date();

    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}::${currentDate.getMilliseconds()}`;
  }
}