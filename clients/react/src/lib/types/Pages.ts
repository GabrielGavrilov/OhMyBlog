export type PageRequestDto = {
  size: number;
  page: number;
};

export type PageResponseDto<T> = {
  content: Array<T>;
  pageIndex: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
