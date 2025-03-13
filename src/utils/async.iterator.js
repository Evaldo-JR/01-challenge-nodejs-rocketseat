import assert from 'node:assert';
import { generate } from 'csv-generate';
import { parse } from 'csv-parse';

(async () => {
  // Inicialize o conversor gerando registros aleatórios
  const parser = generate({
    high_water_mark: 64 * 64,
    length: 100,
  }).pipe(parse());

  let count = 0;

  // Início do CSV
  process.stdout.write('start\n');

  // Iterar por cada registro
  for await (const record of parser) {
    // Escrever cada linha
    process.stdout.write(`${count++} ${record.join(',')}\n`);

    // Operação assíncrona falsa.
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Fim da escrita.
  process.stdout.write('...done\n');

  // Validar o tamanho e itens gravados.
  assert.strictEqual(count, 100);
})();
