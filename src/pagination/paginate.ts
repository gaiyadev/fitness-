import { PaginationMetaData } from './pagination-meta-data';
import { PaginationLink } from './pagination-link';

export class Paginate<T> {
  items: T[] = [];
  meta: PaginationMetaData = new PaginationMetaData();
  links: PaginationLink = new PaginationLink(1, 0, 0);
}
