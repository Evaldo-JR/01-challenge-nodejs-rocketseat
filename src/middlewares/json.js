export async function json(req, res) {
  /**
   * Ignora a leitura do corpo para métodos GET e DELETE
   * pois não enviam dados no corpo da requisição.
   */
  if (req.method === 'GET' || req.method === 'DELETE') {
    res.setHeader('Content-Type', 'application/json');
    return;
  }

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // Se não houver corpo, apenas define como null e continua
  if (buffers.length === 0) {
    req.body = null;
  } else {
    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (error) {
      /**
       * Se o frontend enviar um JSON mal formatado
       * no body, retornamos um erro HTTP 400 Bad Request.
       */
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Formato de JSON inválido.' }));
    }
  }

  res.setHeader('Content-type', 'application/json');
}
