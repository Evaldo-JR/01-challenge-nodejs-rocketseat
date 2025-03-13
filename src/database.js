import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  async #persist() {
    await fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) =>
        // Filtra todas as propriedades que inclui a pesquisa.
        Object.entries(search).some(([key, value]) =>
          row[key].toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    // Retorna false caso a atualização falhe.
    if (!this.#database[table]) return false;

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex === -1) return false;

    // Se a alteração for para o campo `completed_at`, alterna entre null e a data atual
    if (data.hasOwnProperty('completed_at')) {
      const currentCompletedAt = this.#database[table][rowIndex].completed_at;
      data.completed_at = currentCompletedAt ? null : new Date().toISOString();
    }

    /**
     * Persiste ou atualiza os dados atuais como: title, description e completed_at
     * caso eles já existam e alterando a sua data de atualização.
     */
    this.#database[table][rowIndex] = {
      ...this.#database[table][rowIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };

    this.#persist();
    return this.#database[table][rowIndex];
  }

  delete(table, id) {
    // Retorna false caso a deleção falhe.
    if (!this.#database[table]) return false;

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex === -1) return false;

    const deletedTask = this.#database[table].splice(rowIndex, 1)[0];

    this.#persist();
    return deletedTask;
  }
}
