import fs from 'node:fs';
import { parse } from 'csv-parse';

/**
 * @description Função para processar um arquivo CSV e retornar os dados como um array de objetos.
 * @param {string} filePath Caminho do arquivo CSV.
 * @returns {Promise<Array>} Lista de tarefas extraídas do CSV.
 */
export async function importCSV(filePath) {
  return new Promise((resolve, reject) => {
    const tasks = [];

    // Stream de leitura para ler o arquivo CSV sem carregá-lo todo na memória.
    const stream = fs.createReadStream(filePath);

    const parser = parse({
      delimiter: ',',
      from_line: 2, // Pular o cabeçalho do CSV
      trim: true, // Remover espaços extras
      skip_empty_lines: true, // Ignorar linhas vazias
    });

    stream.pipe(parser); // Encaminhar os dados do arquivo para o parser

    parser.on('data', (row) => {
      const [title, description] = row;
      tasks.push({ title, description });
    });

    parser.on('end', () => resolve(tasks));
    parser.on('error', (err) => reject(err));
  });
}
