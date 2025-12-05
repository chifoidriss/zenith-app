export class Paginate {
  current_page: number = 0;
  data: any[] = [];
  first_page_url: string;
  from: number = 0;
  last_page: number = 0;
  last_page_url: string;
  links: any[] = [];
  next_page_url: string;
  path: string;
  per_page: number = 0;
  prev_page_url: string;
  to: number = 0;
  total: number = 0;
}
