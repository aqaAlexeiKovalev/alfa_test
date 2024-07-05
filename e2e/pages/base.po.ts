import {DataProvider} from '../helpers/dataProvider';
import {LocalStorage} from 'node-localstorage';

export class BasePo {
  public dataProvider: DataProvider = new DataProvider();
  public path: string = `storage`;
  public localStorage: LocalStorage = new LocalStorage(this.path);
}
