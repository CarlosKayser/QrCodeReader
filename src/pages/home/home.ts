import { Vibration } from '@ionic-native/vibration';
import { MensagemdaoProvider } from './../../providers/mensagemdao/mensagemdao';
import { Mensagem } from './../../model/Mensagem';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scanData: {};
  encodeData: string;
  encodedData: {};
  options: BarcodeScannerOptions;
  mensagem: Mensagem;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner, private mensagemDAO: MensagemdaoProvider, private vibration: Vibration, private toastCtrl: ToastController) {

  }

  scan() {

    console.log(">>>>Scan()");

    this.options = {
      prompt: "Aproxime do QrCode",
      showFlipCameraButton: true,
      showTorchButton: true
    }
    this.barcodeScanner.scan(this.options)
      .then((barcodeData) => {

        this.verifyBarcodeData(barcodeData);

      }, (err) => {
        console.log("Error occured : " + err);
      });

  }

  verifyBarcodeData(barcodeData) {

    //this.encodedData = this.barcodeScanner.encode("string", barcodeData);

    if (barcodeData != "undefined") {

      var texto: string = (barcodeData.text).toUpperCase();

      // se é válido
      if ((texto.indexOf("SHA1SUM:") > -1) && (texto.indexOf("FRASE:") > -1)) {
        console.log("é valido");

        var data: Date = new Date();
        var frase: string;
        var codigo: string;

        frase = barcodeData.text.slice(0, texto.search("SHA1SUM:"));
        codigo = barcodeData.text.slice(texto.search("SHA1SUM:"), barcodeData.text.length);

        console.log(">>>> Frase: " + frase);
        console.log(">>>> Codigo: " + codigo);

        this.mensagem = new Mensagem(null, frase, codigo, data);

        // gravar no banco de dados
        this.mensagemDAO.insert(this.mensagem)
          .then((e) =>
            this.toastCtrl.create({
              message: "Código gravado!",
              duration: 2000,
              position: 'bottom'
            }).present());

      } else {
        console.log("n é valido");
        // chamar vibra
        this.toastCtrl.create({
          message: "Código Inválido!",
          duration: 2000,
          position: 'bottom'
        })
          .present()
          .then((e) => this.vibrate());
      }
    }
  }

  vibrate() {
    this.vibration.vibrate(1000);
  }

}