/**
 * @description Extrai cada query params da rota e coverte todos para um objeto.
 * @param {string} query
 */
export function extractQueryParams(query) {
  return query
    .substring(1)
    .split('&')
    .reduce((queryParams, param) => {
      const [key, value] = param.split('=');

      queryParams[key] = value;

      return queryParams;
    }, {});
}
