import { provideHttpClient, withXhr } from '@angular/common/http';
import {
  type ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { MyPreset } from './primeng/mypreset';
import { initTransloco } from './transloco/transloco-init';
import { TranslocoHttpLoader } from './transloco/transloco-loader';
import { Language } from './utils/enums';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
      ripple: true,
      license: environment.primeUiLicenseKey,
    }),
    provideHttpClient(withXhr()),
    provideTransloco({
      config: {
        availableLangs: [
          Language.English,
          Language.Hungarian,
        ],
        defaultLang: Language.Hungarian,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(initTransloco),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBJv-Qu7ZPqFojHiwTVNI3ObuuH2Fn9Krc',
        authDomain: 'hegedusp-website.firebaseapp.com',
        projectId: 'hegedusp-website',
        storageBucket: 'hegedusp-website.firebasestorage.app',
        messagingSenderId: '874961804401',
        appId: '1:874961804401:web:ce2d0008717fc76b108fd0',
        measurementId: 'G-3QJ0447MW8',
      }),
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
  ],
};
