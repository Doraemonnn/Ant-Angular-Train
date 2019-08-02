import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';

// 路由和公共组件
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SideMenuComponent } from './main/common/side-menu/side-menu.component';
import { UserComponent } from './main/common/user/user.component';
import { BreadNavComponent } from './main/common/bread-nav/bread-nav.component';
import { NoDataComponent } from './main/common/no-data/no-data.component';

// 模块 ~ 登录
import { LoginComponent } from './main/login/login.component';

// 模块 ~ 实时监视
import { MonitorComponent } from './main/monitor/monitor.component';
import { MonitorCardComponent } from './main/monitor/monitor-card/monitor-card.component';
import { MonitorDetailComponent } from './main/monitor/monitor-detail/monitor-detail.component';
import { EchartSpeedComponent } from './main/monitor/echart-speed/echart-speed.component';
import { EchartVoltageComponent } from './main/monitor/echart-voltage/echart-voltage.component';

// 模块 ~ 健康管理
import { HealthRecordsComponent } from './main/health/health-records/health-records.component';
import { HealthEchartComponent } from './main/health/health-records/health-echart/health-echart.component';
import { HealthListComponent } from './main/health/health-records/health-list/health-list.component';
import { HistoryFaultComponent } from './main/health/history-data/history-fault/history-fault.component';
import { HistoryLifeComponent } from './main/health/history-data/history-life/history-life.component';

// 模块 ~ 版本管理
import { VersionComponent } from './main/version/version.component';

// 模块 ~ 权限校验
import { AuthorizedComponent } from './main/authorized/authorized.component';

// 服务
import { HttpInterceptorService } from "../service/http.service";
import { ConfigService } from "../service/config.service";
import { TrainService } from "../api/train.service";
import { UserInfoService } from "../service/userinfo.service";
import { LoginGuard } from "../service/login-guard.service";

@NgModule({
  declarations: [
    // 公共组件
    AppComponent,
    MainComponent,
    SideMenuComponent,
    UserComponent,
    BreadNavComponent,
    NoDataComponent,
    // 模块
    LoginComponent,
    MonitorComponent,
    MonitorCardComponent,
    MonitorDetailComponent,
    EchartSpeedComponent,
    EchartVoltageComponent,
    HealthRecordsComponent,
    HealthEchartComponent,
    HealthListComponent,
    HistoryFaultComponent,
    HistoryLifeComponent,
    VersionComponent,
    AuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    NgxEchartsModule
  ],
  providers: [
    // 服务
    HttpInterceptorService,
    ConfigService,
    TrainService,
    UserInfoService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
