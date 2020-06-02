import { Action } from "./actions.model";


export interface Options {
  title: string | boolean;
  menu: string | boolean;
  select?: string | boolean; // uniq | limited | true -> limited is for multi selection without the 'all' option
  filter?: string | boolean;
  add?: string | boolean;
  remove?: string | boolean;
  pagination?: string | boolean;
  actions?: Action[]; // <- these are the actions in the little menu
  tabs?: Action[]; // <- these are the actions that appear on selection
  autoPager?: boolean; // <- for simple tables, let MatPaginator handle the pagination
  autoSort?: boolean; // <- for simple tables, let MatSort handle the sort
}
