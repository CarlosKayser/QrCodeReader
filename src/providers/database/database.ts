import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  public getDB() {
    return this.sqlite.create({
      name: 'pdm.db',
      location: 'default'
    })
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTable(db);
      })
      .catch(e => console.error("Erro no fim createDatabase " + e));
  }

  private createTable(db: SQLiteObject) {
    db.sqlBatch([
      ['create table if not exists mensagem(id integer primary key AUTOINCREMENT not null, frase text, sha1sum text, dataHora text)']
    ])
      .then(() => {
        console.log("Tabelas criadas com sucesso!");
      })
      .catch(e => console.error("Erro no fim da criação das tabelas " + e));
  }

}