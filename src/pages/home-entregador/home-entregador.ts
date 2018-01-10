import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaDeEntregasPage } from '../lista-de-entregas/lista-de-entregas'
import { PerfilEntregadorPage } from '../perfil-entregador/perfil-entregador'
import { ConfiguracaoPage } from '../configuracao/configuracao'

/**
 * Generated class for the HomeEntregadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-entregador',
  templateUrl: 'home-entregador.html',
})
export class HomeEntregadorPage {
  
  entregas: any
  perfil: any
  configuracao: any
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.entregas = ListaDeEntregasPage;
    this.perfil = PerfilEntregadorPage;
    this.configuracao = ConfiguracaoPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeEntregadorPage');
  }

}
