((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[11],{

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "b929":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e25c8372-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FileUploader.vue?vue&type=template&id=1a009a86&
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

// EXTERNAL MODULE: ./src/libs/Utility.js + 1 modules
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

/***/ "c961":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e25c8372-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Test.vue?vue&type=template&id=aeed68c8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('FileUploader',{on:{"completed":_vm.onUploadCompleted}}),_c('div',{staticClass:"d-flex flex-row justify-content-center align-items-center"},[_c('b-card',{attrs:{"title":"This is a test","img-src":_vm.cat},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('h6',{staticClass:"mb-0"},[_vm._v("Header Slot")])]},proxy:true},{key:"footer",fn:function(){return [_c('h6',{staticClass:"mb-0"},[_vm._v("Footer Slot")])]},proxy:true}])},[_c('b-card-text',[_vm._v(" This is a test ")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Test.vue?vue&type=template&id=aeed68c8&

// EXTERNAL MODULE: ./src/assets/crying-cat.jpg
var crying_cat = __webpack_require__("e2f7");
var crying_cat_default = /*#__PURE__*/__webpack_require__.n(crying_cat);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__("4ec9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./src/libs/Uploader/CanTriggerEvents.js









/**
 * add sub capabilities to a class:
 * in the class file: import CanNotify from './CanNotify'
 * in the class constructor: Object.assign(self, CanNotify(this))
 */
/* harmony default export */ var CanTriggerEvents = (function (self) {
  return {
    callbacks: new Map(),
    on: function on(event, callback) {
      if (!self.callbacks.has(event)) self.callbacks.set(event, []);
      var event_callbacks = self.callbacks.get(event);
      if (!event_callbacks.includes(callback)) event_callbacks.push(callback);
    },
    off: function off(event, callback) {
      if (!self.callbacks.has(event)) return;
      var event_callbacks = self.callbacks.get(event);
      if (event_callbacks.includes(callback)) delete event_callbacks[callback];
    },
    // Notify all observers about an event.
    trigger: function trigger(event) {
      var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var callbacks = self.callbacks.get(event);
      if (!callbacks) return;
      callbacks.forEach(function (callback) {
        callback({
          type: event,
          details: details
        });
      });
    }
  };
});
// CONCATENATED MODULE: ./src/libs/Uploader/Uploader.js










var Uploader_Uploader = /*#__PURE__*/function () {
  function Uploader(_ref) {
    var chunk_size = _ref.chunk_size,
        upload_callback = _ref.upload_callback;

    Object(classCallCheck["a" /* default */])(this, Uploader);

    Object(defineProperty["a" /* default */])(this, "chunk_size", 1000 * 1024);

    Object(defineProperty["a" /* default */])(this, "upload_url", void 0);

    if (chunk_size) this.chunk_size = chunk_size;
    if (upload_callback) this.upload_callback = upload_callback;else {
      this.upload_callback = this.defaultUploadCallback;
    } // add event triggering capabilities

    Object.assign(this, CanTriggerEvents(this));
  }

  Object(createClass["a" /* default */])(Uploader, [{
    key: "defaultUploadCallback",
    value: function defaultUploadCallback(form_data) {
      return axios_default.a.post(this.upload_url, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data' // works without as well

        }
      });
    }
  }, {
    key: "setUploadCallback",
    value: function setUploadCallback(callback) {
      this.upload_callback = callback;
    }
  }, {
    key: "upload",
    value: function upload(file) {
      var _this = this;

      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = start + this.chunk_size + 1;
      if (end > file.size) end = file.size; // limit max to file size

      var blob = file.slice(start, end);

      var onChunkRead = function onChunkRead(file, end) {
        return /*#__PURE__*/function () {
          var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
            var chunk, response, data, progress;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;

                    if (!(event.target.readyState !== FileReader.DONE)) {
                      _context.next = 3;
                      break;
                    }

                    return _context.abrupt("return");

                  case 3:
                    // exit
                    chunk = event.target.result;
                    _context.next = 6;
                    return _this.sendChunk(file, chunk);

                  case 6:
                    response = _context.sent;
                    data = response.data;

                    if (data) {
                      _context.next = 10;
                      break;
                    }

                    throw new Error('no response');

                  case 10:
                    //exit if no response data
                    progress = _this.calculateProgress(file, end);

                    _this.trigger('progress', {
                      file: file,
                      progress: progress,
                      response: response
                    }); // notify advancement


                    if (!(end < file.size)) {
                      _context.next = 16;
                      break;
                    }

                    return _context.abrupt("return", _this.upload(file, end));

                  case 16:
                    return _context.abrupt("return", _this.trigger('completed', {
                      file: file,
                      progress: progress,
                      response: response
                    }));

                  case 17:
                    _context.next = 23;
                    break;

                  case 19:
                    _context.prev = 19;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);
                    return _context.abrupt("return", _this.trigger('error', {
                      file: file,
                      error: _context.t0
                    }));

                  case 23:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 19]]);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }();
      };

      var file_reader = new FileReader();
      file_reader.onloadend = onChunkRead(file, end);
      file_reader.readAsDataURL(blob); // this triggers the ajax upload when done
    }
  }, {
    key: "calculateProgress",
    value: function calculateProgress(file, position) {
      return Math.floor(position / file.size * 100);
    }
    /**
     * notify the progress
     * @param {File} file 
     * @param {int} position position where the file has been read so far
     * @param {object} response 
     */

    /* notify(file, position, response) {
        var percent_done = Math.floor( ( position / file.size ) * 100 )
        console.log(percent_done, response)
    } */

    /**
     * send a chunk of file
     * @param {File} file 
     * @param {string} chunk 
     */

  }, {
    key: "sendChunk",
    value: function sendChunk(file, chunk) {
      console.log(file);
      var form_data = new FormData();
      var file_keys = ['name', 'lastModified', 'lastModifiedDate', 'size', 'type'];
      file_keys.forEach(function (key) {
        form_data.append(key, file[key]);
      });
      form_data.append('chunk', chunk);

      if (typeof this.upload_callback === 'function') {
        return this.upload_callback(form_data);
      }
    }
  }]);

  return Uploader;
}();


// EXTERNAL MODULE: ./src/components/FileUploader.vue + 4 modules
var FileUploader = __webpack_require__("b929");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Test.vue?vue&type=script&lang=js&
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



/* harmony default export */ var Testvue_type_script_lang_js_ = ({
  components: {
    FileUploader: FileUploader["a" /* default */]
  },
  data: function data() {
    return {
      cat: crying_cat_default.a,
      file: null,
      progress: 0,
      max: 100,
      uploading: false,
      completed: false
    };
  },
  computed: {},
  methods: {
    upload: function upload() {
      var _this = this;

      try {
        this.uploading = true;
        this.completed = false;
        this.progress = 0;

        var upload_callback = function upload_callback(form_data) {
          return _this.$API.dispatch('upload/upload', form_data);
        };

        var uploader = new Uploader_Uploader({
          upload_callback: upload_callback,
          chunk_size: 1000 * 1024 * 1
        });
        uploader.on('progress', function (event) {
          var type = event.type,
              details = event.details;
          var progress = details.progress;
          _this.progress = progress;
          console.log(details, type, progress);
        });
        uploader.on('completed', function (event) {
          console.log(event);
          _this.uploading = false;
          _this.completed = true;
        });
        uploader.on('error', function (event) {
          console.log(event);
          _this.uploading = false;
          _this.completed = false;
        });
        uploader.upload(this.file);
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange: function onFileChange(event) {
      console.log(event);
      var file_element = this.$refs.file;
      var file_list = file_element.files;
      var file = file_list[0] || false;
      this.file = file;
    },
    update: function update(subject, event, data) {
      console.log(subject, event, data);
    },
    onUploadCompleted: function onUploadCompleted(_ref) {
      var component = _ref.component,
          file_name = _ref.file_name;
      console.log(component, file_name);
    }
  }
});
// CONCATENATED MODULE: ./src/pages/Test.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Testvue_type_script_lang_js_ = (Testvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Test.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Testvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Test = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "e2f7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/crying-cat.3e8409dc.jpg";

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.11.js.map