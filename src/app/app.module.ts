import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { config } from './app.firebase.config';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';

//import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement:'top'}),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    //IonicStorageModule.forRoot()
    //AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    File,
    FilePath,
    FileChooser,
    RequestsProvider,
    ChatProvider,
    ChatProvider,
    GroupsProvider
  ]
})
export class AppModule {}
