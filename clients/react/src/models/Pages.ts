export interface PageRequestDto {
  size?: number;
  page: number;
}

export interface PageResponseDto<T> {
  content: Array<T>;
  pageIndex: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
