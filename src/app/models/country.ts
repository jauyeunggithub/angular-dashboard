export interface Country {
  fields: {
    iso3: string;
    [key: string]: any; // optional for other fields
  };
}
