export const DBConfig = {
    name: "dinomiteDB",
    version: 1.0,
    objectStoresMeta: [
      {
        store: "people",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keyPath: "name", options: { unique: false } },
          { name: "email", keyPath: "email", options: { unique: false } },
        ],
      },
      {
        store: "product",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "lebille", keyPath: "lebille", options: { unique: false } },
          { name: "pu", keyPath: "pu", options: { unique: false } },
        ],
      },
    ],
  };