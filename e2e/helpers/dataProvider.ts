import { INoteDataType, IUrlDataType, IUserDataType } from "../dataTypes/dataTypes";


export class DataProvider {
  private urlTestData: IUrlDataType = require('../testData/urlTestData.json');
  private userTestData: IUserDataType[] = require('../testData/userTestData.json');
  private noteTestData: INoteDataType[] = require('../testData/noteTestData.json');

  public getUrlTestData(): IUrlDataType {
    return this.urlTestData;
  }

  public getUserTestData(userIndex = 1): IUserDataType {
    return this.userTestData.find(user => user.index === userIndex);
  }

  public getNoteTestData(noteIndex = 1): INoteDataType {
    return this.noteTestData.find(note => note.index === noteIndex);
  }

  public getNoteListTestData(): INoteDataType[] {
    return this.noteTestData;
  }
}
