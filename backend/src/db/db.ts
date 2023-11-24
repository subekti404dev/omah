import {
  PathOrFileDescriptor,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import path from "path";
const dataDir = path.join(process.cwd(), "data");
const filePathCfg = path.join(dataDir, "config.json");

export type IUser = {
  name: string;
  email: string;
  password_hash: string;
  avatar: string;
};

export type IData = {
  user: IUser;
  bookmarks: IBookmark[];
};

export type IBookmark = {
  id: number;
  name: string;
  sort: number;
  items: IBookmarkItem[];
};
export type IBookmarkItem = {
  id: number;
  name: string;
  sort: number;
  url: string;
  icon: string;
};

const initValue = {
  user: {
    name: "Admin",
    email: "admin@admin.com",
    password_hash: "admin",
    avatar: "male_24.png",
  },
  bookmarks: [],
};

class Database {
  private _data: IData = initValue;

  private writeToFile(file: PathOrFileDescriptor, data: any) {
    writeFileSync(file, JSON.stringify(data, null, 3));
  }

  private loadFromFileCfg(file: PathOrFileDescriptor, defaultValue: any) {
    return JSON.parse(readFileSync(file, "utf-8") || defaultValue);
  }

  public init() {
    if (existsSync(filePathCfg)) {
      this._data = this.loadFromFileCfg(filePathCfg, initValue);
    } else {
      if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
      this.writeToFile(filePathCfg, this._data);
    }
  }

  public getUser() {
    return this._data?.user;
  }

  public getBookmarks() {
    return this._data.bookmarks;
  }

  public addCategory(data: any) {
    this._data.bookmarks = [...this._data.bookmarks, data];
    this.writeToFile(filePathCfg, this._data);
  }

  public addItem(data: any) {
    const { category_id, ...item_data } = data;
    const categoryIndex = this._data.bookmarks.findIndex(
      (c) => c.id === category_id
    );
    if (categoryIndex >= 0) {
      this._data.bookmarks[categoryIndex].items = [
        ...this._data.bookmarks[categoryIndex].items,
        item_data,
      ];
      this.writeToFile(filePathCfg, this._data);
    }
  }
}

export const database = new Database();
