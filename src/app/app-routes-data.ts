// 模块
import { LoginComponent } from './main/login/login.component';
import { MainComponent } from './main/main.component';
import { MonitorComponent } from './main/monitor/monitor.component';
import { MonitorDetailComponent } from './main/monitor/monitor-detail/monitor-detail.component';
import { HealthRecordsComponent } from './main/health/health-records/health-records.component';
import { HistoryFaultComponent } from './main/health/history-data/history-fault/history-fault.component';
import { HistoryLifeComponent } from './main/health/history-data/history-life/history-life.component';
import { VersionComponent } from './main/version/version.component';
import { AuthorizedComponent } from './main/authorized/authorized.component';

// 路由拦截
import { LoginGuard } from "../service/login-guard.service";

// 路由配置
export const RouteData = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full',
    meta: {
      hide: true
    }
  },
  {
    path: "login",
    meta: {
      hide: true
    },
    component: LoginComponent
  },
  {
    path: "",
    meta: {
      hide: true
    },
    component: MainComponent,
    children: [
      {
        path: "home",
        meta: {
          name: "实时监视",
          icon: "home"
        },
        component: MonitorComponent
      },
      {
        path: "monitorDetail",
        meta: {
          hide: true
        },
        component: MonitorDetailComponent
      },
      {
        path: "",
        meta: {
          name: "健康管理",
          icon: "coffee"
        },
        children: [
          {
            path: "health-records",
            meta: {
              name: "健康档案",
              icon: "exception"
            },
            component: HealthRecordsComponent
          },
          {
            path: "",
            meta: {
              name: "历史数据查询",
              icon: "exception"
            },
            children: [
              {
                path: "history-fault",
                meta: {
                  name: "历史故障",
                  icon: "notification"
                },
                component: HistoryFaultComponent
              },
              {
                path: "history-life",
                meta: {
                  name: "历史寿命",
                  icon: "bulb"
                },
                component: HistoryLifeComponent
              }
            ]
          }
        ]
      },
      {
        path: "version",
        meta: {
          name: "版本管理",
          icon: "trophy"
        },
        component: VersionComponent
      },
      {
        path: "authorized",
        meta: {
          name: "权限控制",
          icon: "user"
        },
        component: AuthorizedComponent,
        canActivate: [LoginGuard]
      }
    ]
  },
];