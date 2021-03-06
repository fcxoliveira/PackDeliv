import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { SessionProvider } from '../../providers/session/session';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the EditarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  user =SessionProvider.getUser();
  
  
  public dados = {
    email: null,
    emailConf: null,
    cep:null,
    bairro:null,
    complemento:null,
    numero:null,
    logradouro:null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public sessionProvider: SessionProvider,private toastCtrl: ToastController,public usuarioProvider:UsuarioProvider) {
  }
  
  public Atualizar(): void {
    // Pega o e-mail do usuário
    var email = this.dados.email;
    var emailConf = this.dados.emailConf;
    //verifica se o campo não está vazio
    
    
    // Compara se os e-mails digitados são correspondentes
    if (email !== emailConf) {
      // Faz algo caso não sejam
      this.presentToast('Os E-mails não são correspondentes.');
      return;
    }


    var cep = this.dados.cep;
    var bairro = this.dados.bairro;
    var complemento = this.dados.complemento;
    var numero = this.dados.numero;
    var logradouro = this.dados.logradouro;
    if(cep!=null){
      SessionProvider.getUser().addresses.postal_code=cep
    }
    if(bairro!=null){
      SessionProvider.getUser().addresses.district=bairro
    }
    if(complemento!=null){
      SessionProvider.getUser().addresses.complement=complemento
    }
    if(numero!=null){
      SessionProvider.getUser().addresses.number=numero
    }
    if(logradouro!=null){
      SessionProvider.getUser().addresses.street=logradouro
    }
    
    SessionProvider.getUser().email=email
    
    this.usuarioProvider.atualizarPerfilEmpresa(SessionProvider.getUser(),  () => {
      this.navCtrl.push(PerfilPage);
    });

    this.navCtrl.push(PerfilPage)

  }
  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  abrirPerfil(){
    this.navCtrl.push(PerfilPage)
  }

}
