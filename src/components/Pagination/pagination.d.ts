export type PaginationEvent =
  | { type: "click_next_btn" }
  | { type: "click_prev_btn" }
  | { type: "jump_to_page"; page: number }
  | { type: "go_to_first_page" }
  | { type: "go_to_last_page" };

export type ExceptPaginationEvent =
  | { type: "click_prev_btn_in_page_1" }
  | { type: "click_next_btn_in_last_page" }
  | { type: "connected_again_from_other_page" }
  | { type: "refresh_pagination" }
  | { type: "page_out_of_range" }
  | { type: "page_connected" };
