import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonitorarEntregasPage } from "../monitorar-entregas/monitorar-entregas";
import { PerfilPage } from "../perfil/perfil";
import { SolicitarEntregasPage } from "../solicitar-entregas/solicitar-entregas";
import { CadastroPacotePage } from "../cadastro-pacote/cadastro-pacote"


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  rootPage = PerfilPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  abrirPerfil(){
    this.navCtrl.push(PerfilPage);
  }
  abrirSolicitarEntregas(){
    this.navCtrl.push(CadastroPacotePage);
  }
  abrirMonitorarEntregas(){
    this.navCtrl.push(MonitorarEntregasPage);
  }
  sair(){
    this.navCtrl.popToRoot();
  }
}
