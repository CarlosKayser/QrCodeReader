import { DatabaseProvider } from './../database/database';
import { Mensagem } from './../../model/Mensagem';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/*
  Generated class for the MensagemdaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensagemdaoProvider {

  constructor(public dbProvider: DatabaseProvider) {
    console.log('Hello RegistroDaoProvider Provider');
  }

  public insert(mensagem: Mensagem) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into mensagem (frase, sha1sum, dataHora) values (?, ?, ?)';
        let data = [mensagem.getFrase(), mensagem.getSha1Sum(), mensagem.getDatahora()];

        console.log(">>>> data: " + data);

        return db.executeSql(sql, data)
          .then(() => console.log('Sucesso executeSQL'))
          .catch(e => console.error('Erro executeSQL ' + e))
      })
      .catch(e => console.error('Erro no insert do registro ' + e))
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from mensagem where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "SELECT * FROM MENSAGEM";
        let data: any[] = [];

        return db.executeSql(sql, data)
          .then((resultSet: any) => {
            if (resultSet.rows.length > 0) {
              let regs: any[] = [];
              for (var i = 0; i < resultSet.rows.length; i++) {
                let reg = resultSet.rows.item(i);
                regs.push(reg);
              }
              return regs;
            } else {
              return [];
            }
          })
          .catch(e => console.error("Erro no executeSQL " + e)
          )
      })
      .catch(e => console.error("Erro fim do getAll " + e)
      );
  }

}
