import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, SettingOutline, TransactionOutline, FileTextOutline, ShoppingCartOutline,UnorderedListOutline,MailOutline,TabletOutline,HeartOutline,LogoutOutline, EditOutline} from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
    
    //Đăng ký thêm các icon
    NzIconModule,
    {
      provide: NZ_ICONS,
      useValue: [UserOutline, SettingOutline, TransactionOutline, FileTextOutline,ShoppingCartOutline,UnorderedListOutline, MailOutline, TabletOutline, HeartOutline, LogoutOutline, EditOutline] // Đăng ký các icon \
    }
  ]
  

};
