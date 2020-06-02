export interface Columns {
  label: string;
  type: string;
  sort?: boolean;
  filter?: boolean; // <- wether the table can be filtered by this field
  pipe?: Function;
  indexField?: string; // -> The name of the corresponding search index name
}
