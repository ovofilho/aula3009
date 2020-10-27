import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto,
        CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public fotos: Foto[] = [];

  constructor() { }

  private async salvarFoto(CameraPhoto: CameraPhoto){
    const base64Data = await this.readAsBase64(Camera);
    const fileName = new Date().getTime() + '.jpeg';
    const fotoSalva = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });


  }

  public async adcionarFoto(){
    // metodo usado para tirar foto
    const captureFoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100
    });
    this.fotos.unshift({
      filepath: 'breve',
      webviewpath: captureFoto.webPath
    });
  }
}

export interface Foto{
  filepath: string;
  webviewpath: string;
}
