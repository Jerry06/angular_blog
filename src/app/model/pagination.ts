export class PaginationPage<T> {

  content: T[];
  last: boolean;
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  sort: PaginationPropertySort[];
}

export class PaginationPropertySort {
  direction: string;
  property: string;

}
