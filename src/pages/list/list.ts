import { Mensagem } from './../../model/Mensagem';
import { MensagemdaoProvider } from './../../providers/mensagemdao/mensagemdao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  mensagens: Mensagem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensagemDAO: MensagemdaoProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ListPage');
    this.buscarTodos();
  }

  buscarTodos(){
    this.mensagemDAO.getAll()
    .then((mensagens: Mensagem[]) => {
      this.mensagens = mensagens;
    })
  }

  removeMessage(mensagem: Mensagem) {
    this.mensagemDAO.remove(mensagem.id)
      .then(() => {
        var index = this.mensagens.indexOf(mensagem);
        this.mensagens.splice(index, 1);
        this.toast.create({ message: 'Mensagem removida.', duration: 3000, position: 'botton' }).present();
      })
  }

}
