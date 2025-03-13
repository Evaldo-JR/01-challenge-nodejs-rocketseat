export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  /**
   * @description Captura os parâmetros não-nomeados da rota que
   * iniciam com ":" para criar os grupos Regex.
   */
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-_]+)');

  /**
   * @description Captura os parâmetros nomeados da rota (query params) para criar a regra Regex.
   */
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
