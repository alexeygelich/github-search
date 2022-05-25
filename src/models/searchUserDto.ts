import { UserSearchDto } from 'models/userSearchDto';

export interface SearchUserDto {
  total_count: number;
  incomplete_results: boolean;
  items: UserSearchDto[];
}
