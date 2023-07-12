export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = "ea4c4d3e-4d75-4b59-be1f-6c01b4f42ab0";
export const MODAL_CLOSE_SEC = 2.5;
export let SORTED = false;
export function changeSortCondition() {
  SORTED = !SORTED;
}
