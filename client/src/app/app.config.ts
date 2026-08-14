import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './core/i18n/custom-paginator-intl';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    }
  ]
};
