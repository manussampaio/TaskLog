import * as SQLite from 'expo-sqlite';
let db = null;

export async function getDB() {
  if (db === null) {
    db = await SQLite.openDatabaseAsync('tasktracker.db');
  }

  return db;
}

export async function createTable() {
  const database = await getDB();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descricao TEXT,
      status INTEGER,
      foto TEXT
    );
  `);

}

export async function insertTask(titulo, descricao) {

  const database = await getDB();

  await database.runAsync(
    `
      INSERT INTO tarefas
      (titulo, descricao, status, foto)
      VALUES (?, ?, ?, ?)
    `,
    [
      titulo,
      descricao,
      0,
      ''
    ]
  );

}

export async function getTasks() {

  const database = await getDB();

  const result =
    await database.getAllAsync(
      `
        SELECT *
        FROM tarefas
      `
    );

  return result;

}

export async function deleteTask(id) {

  const database = await getDB();

  await database.runAsync(
    `
      DELETE FROM tarefas
      WHERE id = ?
    `,
    [id]
  );

}

export async function completeTask(
  id,
  foto
) {

  const database = await getDB();

  await database.runAsync(
    `
      UPDATE tarefas
      SET
        status = 1,
        foto = ?
      WHERE id = ?
    `,
    [
      foto,
      id
    ]
  );

}