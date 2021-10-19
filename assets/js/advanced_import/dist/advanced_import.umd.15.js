((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[15],{

/***/ "01bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13d50d64-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/Review.vue?vue&type=template&id=b4f43024&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h6',[_vm._v("Review your settings")]),_c('table',{staticClass:"table table-bordered table-striped"},[_vm._m(0),_c('tbody',_vm._l((_vm.settings),function(value,key){return _c('tr',{key:key},[_c('td',[_vm._v(_vm._s(key))]),_c('td',[_c('pre',[_vm._v(_vm._s(value))])])])}),0)]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_c('section',[_c('button',{staticClass:"btn btn-primary ml-2",attrs:{"disabled":_vm.processing},on:{"click":_vm.importCSV}},[(_vm.processing)?_c('font-awesome-icon',{attrs:{"icon":"spinner","spin":"","fixed-width":""}}):_c('font-awesome-icon',{attrs:{"icon":"file-import","fixed-width":""}}),_c('span',[_vm._v(" import")])],1)]),_vm._t("right",null,{"validation":_vm.$v})],2),_c('b-modal',{ref:"modal-success",attrs:{"title":"Process completed","ok-only":"","size":"xl"},on:{"hidden":_vm.onCloseModal}},[_c('p',{staticClass:"my-4"},[_vm._v("The import proces is completed. Please check the "),_c('router-link',{attrs:{"to":{name:'logs'}}},[_vm._v("logs")]),_vm._v(" for details.")],1),_c('LogsTable',{ref:"logs"})],1),_c('b-modal',{ref:"modal-upload",attrs:{"title":"Uploading CSV file","ok-only":"","no-close-on-esc":"","no-close-on-backdrop":"","hide-header-close":"","ok-title":"cancel"},on:{"ok":_vm.onProcessStopped}},[_c('FileUploader',{ref:"uploader",attrs:{"files":_vm.files}})],1),_c('b-modal',{ref:"modal-process",attrs:{"id":"modal-process","title":"Processing CSV file","ok-only":"","no-close-on-esc":"","no-close-on-backdrop":"","hide-header-close":"","ok-title":"cancel","size":"xl"},on:{"ok":_vm.onProcessStopped}},[_c('FileProcesser',{ref:"processer",attrs:{"background_process":_vm.background_process}}),_c('LogsTable',{ref:"logs"})],1),_c('b-modal',{ref:"modal-abort",attrs:{"id":"modal-abort","title":"Process stopped","ok-only":""},on:{"ok":_vm.onProcessStopped}},[_c('p',{staticClass:"my-4"},[_vm._v("The process has been stopped by the user")])])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("key")]),_c('th',[_vm._v("value")])])])}]


// CONCATENATED MODULE: ./src/components/import/Review.vue?vue&type=template&id=b4f43024&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/components/FileUploader.vue + 4 modules
var FileUploader = __webpack_require__("b929");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13d50d64-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FileProcesser.vue?vue&type=template&id=084c3311&
var FileProcesservue_type_template_id_084c3311_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.processing && !_vm.background_process)?_c('div',[_c('b-progress',{attrs:{"max":_vm.max,"show-progress":"","animated":"","variant":"success","height":"2rem"}},[_c('b-progress-bar',{attrs:{"value":_vm.progress,"label":(((_vm.progress*100).toFixed(2)) + "%")}})],1),_c('div',{staticClass:"text-muted small my-2"},[(_vm.total_lines && _vm.total_lines>0)?_c('span',[_vm._v("Processed "+_vm._s(_vm.current_line)+"/"+_vm._s(_vm.total_lines))]):_vm._e(),_c('non-blank-space')],1)],1):_vm._e(),(false)?undefined:_vm._e()])}
var FileProcesservue_type_template_id_084c3311_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FileProcesser.vue?vue&type=template&id=084c3311&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FileProcesser.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FileProcesservue_type_script_lang_js_ = ({
  data: function data() {
    return {
      cancel: null,
      max: 1,
      current_line: 0,
      processing: false,
      abort: false,
      progress: 0
    };
  },
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    settings: function settings(state) {
      return state.import_settings;
    },
    total_lines: function total_lines(state) {
      return state.csv_data.total_lines;
    }
  })),
  props: {
    background_process: {
      type: Boolean,
      default: false
    }
  },
  destroyed: function destroyed() {
    this.reset();
  },
  methods: {
    /**
     * process a remote file.
     * start from line 1 by default
     * since on line 0 we usually have field names
     */
    process: function process(file_name) {
      var _arguments = arguments,
          _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var line, next;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                line = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : 1;

                if (!_this.abort) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                _this.processing = true;
                _context2.prev = 4;

                next = /*#__PURE__*/function () {
                  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(line) {
                    var settings, promise, response, data, _data$line, _line, progress;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            settings = Object(objectSpread2["a" /* default */])({}, _this.settings);
                            settings.background_process = _this.background_process; //set the background process flag

                            settings.data_row_start = line;
                            promise = _this.$API.dispatch('importData/processCSV', file_name, settings);
                            _this.cancel = promise.cancel;
                            _context.next = 7;
                            return promise;

                          case 7:
                            response = _context.sent;
                            data = response.data;

                            if (!data) {
                              _context.next = 16;
                              break;
                            }

                            if (!_this.background_process) {
                              _context.next = 12;
                              break;
                            }

                            return _context.abrupt("return", true);

                          case 12:
                            _data$line = data.line, _line = _data$line === void 0 ? 1 : _data$line;
                            progress = _this.updateProgress({
                              line: _line
                            });

                            _this.$emit('progress', {
                              progress: progress
                            });

                            return _context.abrupt("return", next(_line));

                          case 16:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function next(_x) {
                    return _ref.apply(this, arguments);
                  };
                }(); // await new Promise(resolve=>setTimeout(resolve, 10000))


                _context2.next = 8;
                return next(line);

              case 8:
                _this.$emit('completed');

                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](4);

                _this.$emit('error', _context2.t0);

              case 14:
                _context2.prev = 14;
                _this.processing = false;
                return _context2.finish(14);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 11, 14, 17]]);
      }))();
    },
    updateProgress: function updateProgress(_ref2) {
      var line = _ref2.line;
      if (this.total_lines <= 0) return;
      if (line) this.current_line = line;
      if (isNaN(this.current_line) || isNaN(this.total_lines)) return;
      if (this.current_line > this.total_lines) this.current_line = this.total_lines;
      var progress = this.current_line / this.total_lines;
      this.progress = progress;
      return progress;
    },
    reset: function reset() {
      if (typeof this.cancel === 'function') this.cancel();
      this.abort = true;
    }
  }
});
// CONCATENATED MODULE: ./src/components/FileProcesser.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FileProcesservue_type_script_lang_js_ = (FileProcesservue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/FileProcesser.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_FileProcesservue_type_script_lang_js_,
  FileProcesservue_type_template_id_084c3311_render,
  FileProcesservue_type_template_id_084c3311_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FileProcesser = (component.exports);
// EXTERNAL MODULE: ./src/components/LogsTable.vue + 4 modules
var LogsTable = __webpack_require__("fb4a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/Review.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Reviewvue_type_script_lang_js_ = ({
  components: {
    FileUploader: FileUploader["a" /* default */],
    FileProcesser: FileProcesser,
    LogsTable: LogsTable["a" /* default */]
  },
  data: function data() {
    return {
      processing: false,
      background_process: false
    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    files: function files(state) {
      return state.import_settings.files;
    },
    event_id: function event_id(state) {
      return state.import_settings.event_id;
    },
    form_name: function form_name(state) {
      return state.import_settings.form_name;
    },
    import_settings: function import_settings(state) {
      return state.import_settings;
    }
  })), {}, {
    dynamic_fields: function dynamic_fields() {
      return this.$store.getters['import_settings/mappedDynamicFields'];
    },
    mappedFieldsWithCsvNames: function mappedFieldsWithCsvNames() {
      return this.$store.getters['import_settings/mappedFieldsWithCsvNames'];
    },
    settings: function settings() {
      var _ref = this.files || {},
          _ref$name = _ref.name,
          file_name = _ref$name === void 0 ? '' : _ref$name;

      var import_settings = Object(objectSpread2["a" /* default */])({}, this.import_settings);

      var settings = {
        'file name': file_name,
        'event ID': import_settings.event_id,
        'form name': import_settings.form_name,
        'field delimiter': import_settings.field_delimiter,
        'text qualifier': import_settings.text_qualifier,
        'dates format': import_settings.dates_format,
        'import mode': import_settings.import_mode,
        'primary key': import_settings.primary_key,
        'dynamic fields': this.dynamic_fields,
        'mapping': this.mappedFieldsWithCsvNames
      };
      return settings;
    }
  }),
  methods: {
    showModal: function showModal(ref_name) {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        var modal_element = _this.$refs[ref_name];
        if (!modal_element) return reject();

        var onShown = function onShown() {
          modal_element.$off('shown', onShown);
          resolve();
        };

        modal_element.$on('shown', onShown);
        modal_element.show();
      });
      return promise;
    },
    closeModal: function closeModal(ref_name) {
      var _this2 = this;

      var promise = new Promise(function (resolve, reject) {
        var modal_element = _this2.$refs[ref_name];
        if (!modal_element) return reject();

        var onShown = function onShown() {
          modal_element.$off('hidden', onShown);
          resolve();
        };

        modal_element.$on('hidden', onShown);
        modal_element.hide();
      });
      return promise;
    },

    /**
     * upload a file for later processing
     */
    upload: function upload() {
      var _this3 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var uploader;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this3.showModal('modal-upload');

              case 2:
                uploader = _this3.$refs.uploader;
                uploader.$on('completed', function () {
                  _this3.closeModal('modal-upload');
                });
                uploader.$on('error', function (_ref2) {
                  var message = _ref2.message,
                      file = _ref2.file,
                      error = _ref2.error;
                  console.log({
                    message: message,
                    file: file,
                    error: error
                  });
                });
                return _context.abrupt("return", uploader.upload());

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateLogs: function updateLogs() {
      var getLogs = this.$refs.logs.getLogs;
      if (typeof getLogs !== 'function') return;
      getLogs();
    },
    showCompleted: function showCompleted() {
      var _this4 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this4.showModal('modal-success');

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * process the reomte file
     */
    enqueProcess: function enqueProcess(file_name) {
      var _this5 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var settings, response, data, message, error_message, _data, _data$message, _message;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                settings = Object(objectSpread2["a" /* default */])({}, _this5.import_settings);
                settings.dynamic_fields = _this5.dynamic_fields; // only gey dynamic fields that are actually mapped

                _context3.next = 5;
                return _this5.$API.dispatch('importData/enqueue', file_name, settings);

              case 5:
                response = _context3.sent;
                data = response.data;
                message = "Import process created (ID ".concat(data['job_id'], "). Please check your logs.");
                _context3.next = 10;
                return _this5.$bvModal.msgBoxOk(message, {
                  title: 'Success',
                  buttonSize: 'sm'
                });

              case 10:
                _this5.$router.push({
                  name: 'home'
                });

                _context3.next = 18;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                error_message = _context3.t0;

                if (Object(esm_typeof["a" /* default */])(_context3.t0) === 'object') {
                  _data = _context3.t0.response.data;
                  _data$message = _data.message, _message = _data$message === void 0 ? 'error' : _data$message;
                  error_message = "".concat(_message);
                }

                _this5.$bvModal.msgBoxOk(error_message, {
                  title: 'Error',
                  buttonSize: 'sm'
                });

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }))();
    },
    onProcessStopped: function onProcessStopped() {
      var _this6 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this6.showModal('modal-abort');

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },

    /**
     * start the process:
     * - upload the file
     * - process the remote file
     */
    importCSV: function importCSV() {
      var _this7 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _yield$_this7$upload, file_name;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _this7.upload();

              case 3:
                _yield$_this7$upload = _context5.sent;
                file_name = _yield$_this7$upload.file_name;

                if (file_name) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return");

              case 7:
                _context5.next = 9;
                return _this7.enqueProcess(file_name);

              case 9:
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);

              case 14:
                _context5.prev = 14;
                _this7.processing = false;
                _this7.background_process = false;
                return _context5.finish(14);

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11, 14, 18]]);
      }))();
    },
    onCloseModal: function onCloseModal() {
      // this.$router.push({name: 'home'})
      console.log('done');
    }
  },
  validations: function validations() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/import/Review.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_Reviewvue_type_script_lang_js_ = (Reviewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/import/Review.vue





/* normalize component */

var Review_component = Object(componentNormalizer["a" /* default */])(
  import_Reviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "b4f43024",
  null
  
)

/* harmony default export */ var Review = __webpack_exports__["default"] = (Review_component.exports);

/***/ }),

/***/ "83c4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b929":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13d50d64-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FileUploader.vue?vue&type=template&id=1a009a86&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.processing)?_c('div',[_c('b-progress',{attrs:{"max":_vm.max,"show-progress":"","animated":"","variant":"success","height":"2rem","size":"sm"}},[_c('b-progress-bar',{attrs:{"value":_vm.progress,"label":(((_vm.progress*100).toFixed(2)) + "%")}})],1),_c('div',{staticClass:"text-muted small"},[(_vm.uploaded_bytes && _vm.uploaded_bytes>0)?_c('span',[_vm._v("uploaded "+_vm._s(_vm.formatBytes(_vm.uploaded_bytes))+" of "+_vm._s(_vm.formatBytes(_vm.file_size)))]):_vm._e(),_c('non-blank-space')],1)],1):_vm._e(),(false)?undefined:_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FileUploader.vue?vue&type=template&id=1a009a86&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./src/libs/FileReaderAsync.js + 10 modules
var FileReaderAsync = __webpack_require__("6846");

// EXTERNAL MODULE: ./src/libs/Utility.js
var Utility = __webpack_require__("d234");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FileUploader.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { mapState } from 'vuex'


var MIN_CHUNK_SIZE = 1000 * 1024;
var MAX_CHUNK_SIZE = 1000 * 1024 * 5;
var TOTAL_CHUNKS = 20;
/* harmony default export */ var FileUploadervue_type_script_lang_js_ = ({
  data: function data() {
    return {
      cancel: null,
      // placeholder for canceling the promsie
      content: '',
      start: 0,
      end: 0,
      max: 1,
      processing: false,
      paused: false,
      abort: false,
      remote_file_name: null,
      // unique file name used to save the file on the server
      progress: 0,
      uploaded_bytes: 0,
      file_size: 0,
      formatBytes: Utility["a" /* formatBytes */]
    };
  },
  props: {
    files: {
      type: [File, Array],
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    /* ...mapState({
        file: state => state.import_settings.files,
    }), */
    file: function file() {
      var files = this.files;
      var file;
      if (Object(esm_typeof["a" /* default */])(files) === 'object') file = files;else if (Array.isArray(files) && files.length > 0) file = files[0];
      if (file) return new File([file], file.name);else return null;
    },
    chunk_size: function chunk_size() {
      return this.calcChunkSize(this.file);
    },
    processed: function processed() {
      var uploaded_bytes = this.uploaded_bytes || 0;
      var file_size = this.file_size || 0;
      var formatted_uploaded_bytes = Object(Utility["a" /* formatBytes */])(uploaded_bytes);
      var formatted_file_size = Object(Utility["a" /* formatBytes */])(file_size);
      return "".concat(formatted_uploaded_bytes, "/").concat(formatted_file_size);
    }
  },
  destroyed: function destroyed() {
    this.stop();
  },
  methods: {
    processChunk: function processChunk(file, chunk) {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, data, uploaded_bytes, file_size, progress, unique_name, result, _error$response, _response, _response$data, _data, _data$message, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!_this.abort) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _context.next = 5;
                return _this.sendChunk(file, chunk);

              case 5:
                response = _context.sent;
                data = response.data;
                uploaded_bytes = data.uploaded_bytes, file_size = data.file_size;

                if (data) {
                  _context.next = 10;
                  break;
                }

                throw new Error('no response');

              case 10:
                //exit if no response data
                progress = _this.updateProgress(uploaded_bytes, file_size);

                _this.$emit('progress', {
                  file: file,
                  progress: progress,
                  response: response
                }); // notify advancement
                // advance the start


                _this.start = _this.end;
                unique_name = data.unique_name;
                if (unique_name) _this.updateUniqueFileName(unique_name);

                if (!(!_this.paused && _this.end < file.size)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", _this.upload());

              case 19:
                // exit if we are done
                _this.reset();

                result = {
                  component: _this,
                  file_name: _this.remote_file_name
                };

                _this.$emit('completed', result); // notify completed


                return _context.abrupt("return", result);

              case 23:
                _context.next = 32;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](0);
                _error$response = _context.t0.response, _response = _error$response === void 0 ? {} : _error$response;
                _response$data = _response.data, _data = _response$data === void 0 ? {} : _response$data;
                _data$message = _data.message, message = _data$message === void 0 ? '' : _data$message; // console.log(message, file, error)

                _this.$emit('error', {
                  message: message,
                  file: file,
                  error: _context.t0
                }); // notify error


                _this.reset();

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 25]]);
      }))();
    },
    calculateProgress: function calculateProgress(file, position) {
      try {
        var value = position / file.size;
        if (position < 0) return 0;
        if (position > file.size) return 1;
        return value;
      } catch (error) {
        return 0;
      }
    },
    sendChunk: function sendChunk(file, chunk) {
      var promise = this.$API.dispatch('upload/upload', file, chunk);
      this.cancel = promise.cancel;
      return promise;
    },
    calcChunkSize: function calcChunkSize(file) {
      if (!file) return MIN_CHUNK_SIZE;
      var _file$size = file.size,
          size = _file$size === void 0 ? 0 : _file$size;
      var chunk_size = size / TOTAL_CHUNKS;
      if (chunk_size < MIN_CHUNK_SIZE) return MIN_CHUNK_SIZE;
      if (chunk_size > MAX_CHUNK_SIZE) return MAX_CHUNK_SIZE;
      return chunk_size;
    },
    updateProgress: function updateProgress(uploaded_bytes, file_size) {
      this.uploaded_bytes = uploaded_bytes;
      this.file_size = file_size;
      if (isNaN(uploaded_bytes) || isNaN(file_size)) return;
      if (file_size <= 0) return;
      var percentage = uploaded_bytes / file_size;
      this.progress = percentage;
      return percentage;
    },
    upload: function upload() {
      var _this2 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var file, blob, file_reader, chunk;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.file) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                file = _this2.file;
                _this2.processing = true;
                _this2.paused = false;
                _this2.end = _this2.start + _this2.chunk_size + 1;
                blob = file.slice(_this2.start, _this2.end);
                file_reader = new FileReaderAsync["a" /* default */]();
                _context2.next = 10;
                return file_reader.readAsDataURLAsync(blob);

              case 10:
                chunk = _context2.sent;
                return _context2.abrupt("return", _this2.processChunk(file, chunk));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    stop: function stop() {
      if (typeof this.cancel === 'function') this.cancel();
      this.abort = true;
    },
    onPause: function onPause() {
      this.processing = false;
      this.paused = true;
    },
    updateUniqueFileName: function updateUniqueFileName() {
      var unique_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.file.unique_name) {
        this.file.unique_name = unique_name;
        this.remote_file_name = unique_name;
      }
    },
    reset: function reset() {
      var _this3 = this;

      setTimeout(function () {
        _this3.cancel = null;
        _this3.start = 0;
        _this3.end = 0;
        _this3.processing = false;
        _this3.paused = false;
        _this3.abort = false;
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./src/components/FileUploader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FileUploadervue_type_script_lang_js_ = (FileUploadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/FileUploader.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_FileUploadervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FileUploader = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "f6c6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_d102da56_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("83c4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_d102da56_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_d102da56_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fb4a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13d50d64-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LogsTable.vue?vue&type=template&id=d102da56&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overflow-auto"},[_c('div',{staticClass:"d-flex flex-row justify-content-start align-items-start"},[_c('b-button',{attrs:{"size":"sm","variant":"info","disabled":_vm.loading},on:{"click":_vm.getLogs}},[(_vm.loading)?_c('font-awesome-icon',{attrs:{"icon":"spinner","spin":""}}):_c('font-awesome-icon',{attrs:{"icon":"sync"}}),_c('span',[_vm._v(" Reload")])],1),(_vm.hasItems)?_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-delete",modifiers:{"modal-delete":true}}],staticClass:"ml-2",attrs:{"size":"sm","variant":"danger","disabled":_vm.loading}},[_c('font-awesome-icon',{attrs:{"icon":"trash"}}),_c('span',[_vm._v(" Delete logs")])],1):_vm._e(),_c('b-modal',{attrs:{"id":"modal-delete","title":"Delete logs"},on:{"ok":_vm.handleOkDelete}},[_c('p',{staticClass:"my-4"},[_vm._v("Are you sure you want to delete all logs for the current project?")])]),(_vm.hasItems)?_c('b-pagination',{staticClass:"ml-2",attrs:{"total-rows":_vm.rows,"per-page":_vm.per_page,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}):_vm._e()],1),_c('b-table',{staticClass:"my-2",attrs:{"id":"my-table","items":_vm.items_proxy,"_per-page":"per_page","_current-page":"current_page","small":"","bordered":"","striped":"","hover":""}}),(_vm.hasItems)?_c('b-pagination',{attrs:{"total-rows":_vm.rows,"per-page":_vm.per_page,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=template&id=d102da56&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LogsTable.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var LogsTablevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      per_page: 20,
      current_page: 1,
      loading: false
    };
  },
  created: function created() {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    items: function items(state) {
      return state.logs.list;
    }
  })), {}, {
    items_proxy: function items_proxy() {
      var items = Object(toConsumableArray["a" /* default */])(this.items);

      var per_page = this.per_page;
      var remainder = this.current_page * per_page - items.length;
      if (remainder < 0) remainder = 0;
      var empty_value = "";
      var placeholder = {
        'no logs': empty_value
      };

      if (items.length > 0) {
        placeholder = {};
        var first_item = items[0];

        for (var _i = 0, _Object$keys = Object.keys(first_item); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          placeholder[key] = empty_value;
        }
      }

      for (var i = 0; i < remainder; i++) {
        items.push(placeholder);
      }

      return items;
    },
    rows: function rows() {
      var total = this.$store.getters['logs/total'];
      return total || this.items.length;
    },
    hasItems: function hasItems() {
      try {
        return this.items.length > 0;
      } catch (error) {
        return false;
      }
    }
  }),
  watch: {
    current_page: {
      immediate: true,
      handler: function handler() {
        this.getLogs();
      }
    }
  },
  methods: {
    getLogs: function getLogs() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var limit, start, response, _response$data, data, _data$data, list, _data$metadata, metadata;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _this.loading = true;
                limit = _this.per_page;
                start = _this.per_page * (_this.current_page - 1);
                _context2.next = 6;
                return _this.$API.dispatch('logs/get', {
                  start: start,
                  limit: limit
                });

              case 6:
                response = _context2.sent;
                _response$data = response.data, data = _response$data === void 0 ? {} : _response$data;
                _data$data = data.data, list = _data$data === void 0 ? {} : _data$data, _data$metadata = data.metadata, metadata = _data$metadata === void 0 ? {} : _data$metadata;
                _context2.next = 11;
                return _this.$store.dispatch('logs/setState', {
                  list: list,
                  metadata: metadata
                });

              case 11:
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 16:
                _context2.prev = 16;
                _this.loading = false;
                return _context2.finish(16);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13, 16, 19]]);
      }))();
    },
    handleOkDelete: function handleOkDelete() {
      var _this2 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this2.$API.dispatch('logs/delete');

              case 2:
                response = _context3.sent;
                console.log(response);

                _this2.getLogs();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LogsTablevue_type_script_lang_js_ = (LogsTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/LogsTable.vue?vue&type=style&index=0&id=d102da56&scoped=true&lang=css&
var LogsTablevue_type_style_index_0_id_d102da56_scoped_true_lang_css_ = __webpack_require__("f6c6");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/LogsTable.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_LogsTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d102da56",
  null
  
)

/* harmony default export */ var LogsTable = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.15.js.map