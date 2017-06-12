import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule, ApplicationRef } from "@angular/core";
import { removeNgStyles, createNewHosts, createInputTransfer } from "@angularclass/hmr";
import { RouterModule } from "@angular/router";
import { ENV_PROVIDERS } from "./environment";
import { ROUTES } from "./app.routes";
import { AppComponent } from "./app.component";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState, InternalStateType } from "./app.service";
import { AboutComponent } from "./about";
import { NoContentComponent } from "./no-content";
import { BlogService } from "./service/blog.service";
import { BlogListComponent } from "./component/blog_list.component";
import { BlogDetailComponent } from "./component/blog_details.component";
import { MenuComponent } from "./component/menu.component";
import { WidgetsComponent } from "./component/blog_widgets.component";
import { OtherWidgetComponent } from "./component/blog_other_widget.component";
import { TagCategoryComponent } from "./component/tag_category.component";
import { SearchComponent } from "./component/blog_search.component";
import { FooterComponent } from "./component/footer.component";
import { HighlightJsModule, HighlightJsService } from "angular2-highlight-js";
/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    NoContentComponent,
    BlogListComponent,
    BlogDetailComponent,
    FooterComponent,
    MenuComponent,
    SearchComponent,
    TagCategoryComponent,
    OtherWidgetComponent,
    WidgetsComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HighlightJsModule,
    RouterModule.forRoot(ROUTES)
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    BlogService,
    HighlightJsService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
