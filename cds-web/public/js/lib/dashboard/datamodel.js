
define(["angular"],function(angular){


angular.module('app.service', []);

angular.module('app.service')
  .factory('RestTimeSeriesDataModel', function (settings, WidgetDataModel, $http) {
    function RestTimeSeriesDataModel() {
    }

    RestTimeSeriesDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RestTimeSeriesDataModel.prototype.init = function () {
      WidgetDataModel.prototype.init.call(this);
      this.mode = this.dataModelOptions ? this.dataModelOptions.mode : 'MINUTES';

      this.widgetScope.$on('modeChanged', function (event, mode) {
        this.mode = mode;
        this.load();
      }.bind(this));

      this.load();
    };

    RestTimeSeriesDataModel.prototype.load = function () {
      var params = {
        bucket: this.mode,
        metric: this.dataModelOptions.metric
      };

      $http.get('/data', {
        params: params
      }).success(function (data) {
          var chart = {
            data: data,
            chartOptions: {
              vAxis: {}
            }
          };

          this.updateScope(chart);
        }.bind(this));
    };

    return RestTimeSeriesDataModel;
  })
  .factory('RestTopNDataModel', function (settings, WidgetDataModel, $http) {
    function RestTopNDataModel() {
    }

    RestTopNDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RestTopNDataModel.prototype.init = function () {
      WidgetDataModel.prototype.init.call(this);

      this.load();
    };

    RestTopNDataModel.prototype.load = function () {
      $http.get('/topn', {
        params: {
          limit: this.dataModelOptions.limit,
          dimension: this.dataModelOptions.dimension
        }
      }).success(function (data) {
        this.updateScope(data);
      }.bind(this));
    };

    return RestTopNDataModel;
  })
  .factory('MeteorTimeSeriesDataModel', function (settings, MeteorDdp, WidgetDataModel) {
    function MeteorTimeSeriesDataModel() {
      var ddp = new MeteorDdp(settings.meteorURL); //TODO
      this.ddp = ddp;

      var that = this;

      ddp.connect().done(function() {
        console.log('Meteor connected');
        that.update();
      });
    }

    MeteorTimeSeriesDataModel.prototype = Object.create(WidgetDataModel.prototype);

    MeteorTimeSeriesDataModel.prototype.init = function () {
      WidgetDataModel.prototype.init.call(this);
    };

    //TODO
    MeteorTimeSeriesDataModel.prototype.update = function (collection) {
      this.items = [];
      collection = collection ? collection : this.dataModelOptions.collection;

      this.ddp.subscribe(collection); //TODO

      var that = this;

      this.ddp.watch(collection, function(doc, msg) {
        if (msg === 'added') {
          that.updateScope(doc);
          that.widgetScope.$apply();
        }
      });
    };

    MeteorTimeSeriesDataModel.prototype.updateScope = function (value) {
      if (value.hasOwnProperty('history')) {
        //console.log(_.pluck(value.history, 'timestamp'));
        this.items.push.apply(this.items, value.history);
      } else {
        this.items.push(value);
      }

      if (this.items.length > 100) { //TODO
        this.items.splice(0, this.items.length - 100);
      }

      var chart = {
        data: this.items,
        max: 30
      };

      WidgetDataModel.prototype.updateScope.call(this, chart);
      this.data = [];
    };

    return MeteorTimeSeriesDataModel;
  })
  .factory('MeteorDataModel', function (settings, MeteorDdp, WidgetDataModel) {
    function MeteorTimeSeriesDataModel() {
      var ddp = new MeteorDdp(settings.meteorURL); //TODO
      this.ddp = ddp;

      var that = this;

      ddp.connect().done(function() {
        console.log('Meteor connected');
        that.update();
      });
    }

    MeteorTimeSeriesDataModel.prototype = Object.create(WidgetDataModel.prototype);

    MeteorTimeSeriesDataModel.prototype.init = function () {
      WidgetDataModel.prototype.init.call(this);
    };

    //TODO
    MeteorTimeSeriesDataModel.prototype.update = function (collection) {
      this.items = [];
      collection = collection ? collection : this.dataModelOptions.collection;

      this.ddp.subscribe(collection); //TODO get whole collection instead of 'added' events

      var that = this;

      this.ddp.watch(collection, function(value) {
        //console.log(value);
        that.updateScope(value);
        that.widgetScope.$apply();
      });
    };

    return MeteorTimeSeriesDataModel;
  })
  .factory('WebSocketWidgetDataModel', function (WidgetDataModel, webSocket) {
    function WebSocketDataModel() {
    }

    WebSocketDataModel.prototype = Object.create(WidgetDataModel.prototype);

    WebSocketDataModel.prototype.init = function () {
      this.topic = null;
      this.callback = null;
      if (this.dataModelOptions && this.dataModelOptions.defaultTopic) {
        this.update(this.dataModelOptions.defaultTopic);
      }
    };

    WebSocketDataModel.prototype.update = function (newTopic) {
      var that = this;

      if (this.topic && this.callback) {
        webSocket.unsubscribe(this.topic, this.callback);
      }

      var callback = function (message) {
        that.updateScope(message);
        that.widgetScope.$apply();
      };

      this.topic = newTopic;
      this.callback = webSocket.subscribe(this.topic, callback, this.widgetScope);
    };

    WebSocketDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);

      if (this.topic && this.callback) {
        webSocket.unsubscribe(this.topic, this.callback);
      }
    };

    return WebSocketDataModel;
  })
  .factory('RandomValueDataModel', function (WidgetDataModel, $interval) {
    function RandomValueDataModel() {
    }

    RandomValueDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RandomValueDataModel.prototype.init = function () {
      var base = Math.floor(Math.random() * 10) * 10;

      this.updateScope(base);

      var that = this;

      this.intervalPromise = $interval(function () {
        var random = base + Math.random();
        that.updateScope(random);
      }, 500);
    };

    RandomValueDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomValueDataModel;
  })
  .factory('RandomTopNDataModel', function (WidgetDataModel, $interval) {
    function RandomTopNDataModel() {
    }

    RandomTopNDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RandomTopNDataModel.prototype.init = function () {
      this.intervalPromise = $interval(function () {
        var topTen = _.map(_.range(0, 10), function (index) {
          return {
            name: 'item' + index,
            value: Math.floor(Math.random() * 100)
          };
        });
        this.updateScope(topTen);
      }.bind(this), 500);
    };

    RandomTopNDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomTopNDataModel;
  })
  .factory('RandomTimeSeriesDataModel', function (WidgetDataModel, $interval) {
    function RandomTimeSeriesDataModel() {
    }

    RandomTimeSeriesDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RandomTimeSeriesDataModel.prototype.init = function () {
      var max = 30;
      var data = [];
      var chartValue = 50;

      function nextValue() {
        chartValue += Math.random() * 40 - 20;
        chartValue = chartValue < 0 ? 0 : chartValue > 100 ? 100 : chartValue;
        return chartValue;
      }

      var now = Date.now();
      for (var i = max - 1; i >= 0; i--) {
        data.push({
          timestamp: now - i * 1000,
          value: nextValue()
        });
      }
      var chart = {
        data: data,
        max: max,
        chartOptions: {
          vAxis: {}
        }
      };
      this.updateScope(chart);

      this.intervalPromise = $interval(function () {
        data.shift();
        data.push({
          timestamp: Date.now(),
          value: nextValue()
        });

        var chart = {
          data: data,
          max: max
        };

        this.updateScope(chart);
      }.bind(this), 1000);
    };

    RandomTimeSeriesDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomTimeSeriesDataModel;
  })
  .factory('RandomD3TimeSeriesDataModel', function (WidgetDataModel, $interval) {
    function RandomTimeSeriesDataModel() {
    }

    RandomTimeSeriesDataModel.prototype = Object.create(WidgetDataModel.prototype);

    RandomTimeSeriesDataModel.prototype.init = function () {
      var max = 30;
      var data = [];
      var chartValue = 50;

      function nextValue() {
        chartValue += Math.round(Math.random() * 40 - 20);
        chartValue = chartValue < 0 ? 0 : chartValue > 100 ? 100 : chartValue;
        return chartValue;
      }

      var now = Date.now();
      for (var i = max - 1; i >= 0; i--) {
        data.push({
          timestamp: now - i * 1000,
          value: nextValue()
        });
      }
      var chart = [
        {
          'key': 'Series',
          values: data
        }
      ];

      this.updateScope(chart);

      this.intervalPromise = $interval(function () {
        data.shift();
        data.push({
          timestamp: Date.now(),
          value: nextValue()
        });

        var chart = [
          {
            'key': 'Series',
            values: data
          }
        ];

        this.updateScope(chart);
      }.bind(this), 1000);
    };

    RandomTimeSeriesDataModel.prototype.destroy = function () {
      WidgetDataModel.prototype.destroy.call(this);
      $interval.cancel(this.intervalPromise);
    };

    return RandomTimeSeriesDataModel;
  })
.constant('pieChartSampleData', [
    {
      key: 'One',
      y: 5
    },
    {
      key: 'Two',
      y: 2
    },
    {
      key: 'Three',
      y: 9
    },
    {
      key: 'Four',
      y: 7
    },
    {
      key: 'Five',
      y: 4
    },
    {
      key: 'Six',
      y: 3
    },
    {
      key: 'Seven',
      y: 7
    },
    {
      key: 'Eight',
      y: 4
    },
    {
      key: 'Nine',
      y: 3
    }
  ])
  .constant('stackedAreaChartSampleData', [
    {
      key: 'Series 1',
      values: [
        [ 1051675200000 , 0] ,
        [ 1054353600000 , 7.2481659343222] ,
        [ 1056945600000 , 9.2512381306992] ,
        [ 1059624000000 , 11.341210982529] ,
        [ 1062302400000 , 14.734820409020] ,
        [ 1064894400000 , 12.387148007542] ,
        [ 1067576400000 , 18.436471461827] ,
        [ 1070168400000 , 19.830742266977] ,
        [ 1072846800000 , 22.643205829887] ,
        [ 1075525200000 , 26.743156781239] ,
        [ 1078030800000 , 29.597478802228] ,
        [ 1080709200000 , 30.831697585341] ,
        [ 1083297600000 , 28.054068024708] ,
        [ 1085976000000 , 29.294079423832] ,
        [ 1088568000000 , 30.269264061274] ,
        [ 1091246400000 , 24.934526898906] ,
        [ 1093924800000 , 24.265982759406] ,
        [ 1096516800000 , 27.217794897473] ,
        [ 1099195200000 , 30.802601992077] ,
        [ 1101790800000 , 36.331003758254] ,
        [ 1104469200000 , 43.142498700060] ,
        [ 1107147600000 , 40.558263931958] ,
        [ 1109566800000 , 42.543622385800] ,
        [ 1112245200000 , 41.683584710331] ,
        [ 1114833600000 , 36.375367302328] ,
        [ 1117512000000 , 40.719688980730] ,
        [ 1120104000000 , 43.897963036919] ,
        [ 1122782400000 , 49.797033975368] ,
        [ 1125460800000 , 47.085993935989] ,
        [ 1128052800000 , 46.601972859745] ,
        [ 1130734800000 , 41.567784572762] ,
        [ 1133326800000 , 47.296923737245] ,
        [ 1136005200000 , 47.642969612080] ,
        [ 1138683600000 , 50.781515820954] ,
        [ 1141102800000 , 52.600229204305] ,
        [ 1143781200000 , 55.599684490628] ,
        [ 1146369600000 , 57.920388436633] ,
        [ 1149048000000 , 53.503593218971] ,
        [ 1151640000000 , 53.522973979964] ,
        [ 1154318400000 , 49.846822298548] ,
        [ 1156996800000 , 54.721341614650] ,
        [ 1159588800000 , 58.186236223191] ,
        [ 1162270800000 , 63.908065540997] ,
        [ 1164862800000 , 69.767285129367] ,
        [ 1167541200000 , 72.534013373592] ,
        [ 1170219600000 , 77.991819436573] ,
        [ 1172638800000 , 78.143584404990] ,
        [ 1175313600000 , 83.702398665233] ,
        [ 1177905600000 , 91.140859312418] ,
        [ 1180584000000 , 98.590960607028] ,
        [ 1183176000000 , 96.245634754228] ,
        [ 1185854400000 , 92.326364432615] ,
        [ 1188532800000 , 97.068765332230] ,
        [ 1191124800000 , 105.81025556260] ,
        [ 1193803200000 , 114.38348777791] ,
        [ 1196398800000 , 103.59604949810] ,
        [ 1199077200000 , 101.72488429307] ,
        [ 1201755600000 , 89.840147735028] ,
        [ 1204261200000 , 86.963597532664] ,
        [ 1206936000000 , 84.075505208491] ,
        [ 1209528000000 , 93.170105645831] ,
        [ 1212206400000 , 103.62838083121] ,
        [ 1214798400000 , 87.458241365091] ,
        [ 1217476800000 , 85.808374141319] ,
        [ 1220155200000 , 93.158054469193] ,
        [ 1222747200000 , 65.973252382360] ,
        [ 1225425600000 , 44.580686638224] ,
        [ 1228021200000 , 36.418977140128] ,
        [ 1230699600000 , 38.727678144761] ,
        [ 1233378000000 , 36.692674173387] ,
        [ 1235797200000 , 30.033022809480] ,
        [ 1238472000000 , 36.707532162718] ,
        [ 1241064000000 , 52.191457688389] ,
        [ 1243742400000 , 56.357883979735] ,
        [ 1246334400000 , 57.629002180305] ,
        [ 1249012800000 , 66.650985790166] ,
        [ 1251691200000 , 70.839243432186] ,
        [ 1254283200000 , 78.731998491499] ,
        [ 1256961600000 , 72.375528540349] ,
        [ 1259557200000 , 81.738387881630] ,
        [ 1262235600000 , 87.539792394232] ,
        [ 1264914000000 , 84.320762662273] ,
        [ 1267333200000 , 90.621278391889] ,
        [ 1270008000000 , 102.47144881651] ,
        [ 1272600000000 , 102.79320353429] ,
        [ 1275278400000 , 90.529736050479] ,
        [ 1277870400000 , 76.580859994531] ,
        [ 1280548800000 , 86.548979376972] ,
        [ 1283227200000 , 81.879653334089] ,
        [ 1285819200000 , 101.72550015956] ,
        [ 1288497600000 , 107.97964852260] ,
        [ 1291093200000 , 106.16240630785] ,
        [ 1293771600000 , 114.84268599533] ,
        [ 1296450000000 , 121.60793322282] ,
        [ 1298869200000 , 133.41437346605] ,
        [ 1301544000000 , 125.46646042904] ,
        [ 1304136000000 , 129.76784954301] ,
        [ 1306814400000 , 128.15798861044] ,
        [ 1309406400000 , 121.92388706072] ,
        [ 1312084800000 , 116.70036100870] ,
        [ 1314763200000 , 88.367701837033] ,
        [ 1317355200000 , 59.159665765725] ,
        [ 1320033600000 , 79.793568139753] ,
        [ 1322629200000 , 75.903834028417] ,
        [ 1325307600000 , 72.704218209157] ,
        [ 1327986000000 , 84.936990804097] ,
        [ 1330491600000 , 93.388148670744]
      ]
    }
  ])
 .factory('Gateway', function ($rootScope, $q, $http, webSocket, settings) {
    return {
      getDataTopics: function () {
        var deferred = $q.defer();

        webSocket.subscribe('_latestTopics', function (message) {
          var list = _.reject(message, function (topic) {
            return topic.indexOf('AppData{\"schema\"') !== 0;
          });

          var topics = _.map(list, function (topic) {
            var jsonInd = topic.indexOf('{');

            var jsonString = topic.substr(jsonInd);

            var topicData = JSON.parse(jsonString);

            return {
              topic: topic,
              appId: topicData.appId,
              name: topicData.topicName,
              schema: topicData.schema,
              type: topicData.schema.type
            };
          });

          deferred.resolve(topics);
          //$rootScope.$apply();
        }, $rootScope);
        webSocket.send({ type: 'getLatestTopics' });
        //TODO unsubscribe

        return deferred.promise;
      },

      getRunningApps: function () {
        var deferred = $q.defer();

        var url = settings.restBaseURL + 'applications?states=running&jsonp=JSON_CALLBACK';
        $http.jsonp(url)
          .success(function (data) {
            if (data && data.apps && data.apps.length > 0) {
              var apps = _.reject(data.apps, function (app) {
                return app.state !== 'RUNNING';
              });
              apps = _.sortBy(apps, function (app) {
                return (-app.startedTime);
              });

              deferred.resolve(apps);
            }
          });

        return deferred.promise;
      },

      getTopics: function () {
        var deferred = $q.defer();

        var topicsPromise = this.getDataTopics();
        var appsPromise = this.getRunningApps();

        $q.all({ topics: topicsPromise, apps: appsPromise }).then(function (resolutions) {
          var topics = resolutions.topics;
          var apps = resolutions.apps;

          var appIdMap = {};
          _.each(apps, function (app) {
            appIdMap[app.id] = app;
          });

          topics = _.reject(topics, function (topic) {
            return !appIdMap.hasOwnProperty(topic.appId);
          });

          _.each(topics, function (topic) {
            var app = appIdMap[topic.appId];
            topic.appName = app.name;
            topic.appStartedTime = app.startedTime;
          });

          topics = _.sortBy(topics, function (topic) {
            return topic.name;
          });

          deferred.resolve(topics);
        });

        return deferred.promise;
      }
    };
  })
 .factory('widgetDefs', function (settings, WebSocketWidgetDataModel, TimeSeriesDataModel, PieChartDataModel) {
    return [
      {
        name: 'Value',
        directive: 'wt-scope-watch',
        dataAttrName: 'value',
        attrs: {
          'value-class': 'alert-info'
        },
        dataTypes: ['percentage', 'simple'],
        dataModelType: WebSocketWidgetDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.piValue
        }
      },
      {
        name: 'Progressbar',
        directive: 'progressbar',
        attrs: {
          class: 'progress-striped',
          type: 'success'
        },
        dataAttrName: 'value',
        dataTypes: ['percentage', 'simple'],
        dataModelType: WebSocketWidgetDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.progress
        }
      },
      {
        name: 'Line Chart',
        directive: 'wt-line-chart',
        dataAttrName: 'chart',
        dataTypes: ['timeseries'],
        dataModelType: TimeSeriesDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.chartValue
        },
        style: {
          width: '50%'
        }
      },
      {
        name: 'TopN',
        directive: 'wt-top-n',
        attrs: {
          data: 'serverTopTen'
        },
        dataAttrName: 'data',
        dataTypes: ['topN'],
        dataModelType: WebSocketWidgetDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.topn
        }
      },
      {
        name: 'Pie Chart',
        directive: 'wt-pie-chart',
        style: {
          width: '350px',
          height: '350px'
        },
        dataAttrName: 'data',
        dataTypes: ['piechart'],
        dataModelType: PieChartDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.pieChart
        }
      },
      {
        name: 'Gauge',
        directive: 'wt-gauge',
        dataAttrName: 'value',
        dataTypes: ['percentage', 'simple'],
        dataModelType: WebSocketWidgetDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.percentage
        },
        style: {
          width: '250px'
        }
      },
      {
        name: 'JSON',
        directive: 'wt-json',
        dataAttrName: 'value',
        dataModelType: WebSocketWidgetDataModel,
        dataModelOptions: {
          defaultTopic: settings.topic.visualdata.topn
        }
      },
      {
        name: 'WebSocket Debugger',
        templateUrl: 'template/topics.html'
      }
    ];
  });


});