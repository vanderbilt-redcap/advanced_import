"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[986],{

/***/ 9629:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ FileUploader; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileUploader.vue?vue&type=template&id=786ceae4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.processing)?_c('div',[_c('b-progress',{attrs:{"max":_vm.max,"show-progress":"","animated":false,"variant":"primary","size":"sm"}},[_c('b-progress-bar',{attrs:{"value":_vm.progress,"label":(((_vm.progress*100).toFixed(2)) + "%")}})],1),_c('div',{staticClass:"text-muted small"},[(_vm.uploaded_bytes && _vm.uploaded_bytes>0)?_c('span',[_vm._v("uploaded "+_vm._s(_vm.formatBytes(_vm.uploaded_bytes))+" of "+_vm._s(_vm.formatBytes(_vm.file_size)))]):_vm._e(),_c('non-blank-space')],1)],1):_vm._e(),( false)?0:_vm._e()])}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(9103);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(5340);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(7010);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
// EXTERNAL MODULE: ./src/libs/FileReaderAsync.js + 10 modules
var FileReaderAsync = __webpack_require__(7828);
// EXTERNAL MODULE: ./src/libs/Utility.js
var Utility = __webpack_require__(5640);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileUploader.vue?vue&type=script&lang=js&







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

var UploadMetadata = function UploadMetadata(_ref) {
  var file_size = _ref.file_size,
      name = _ref.name,
      percentage = _ref.percentage,
      progress = _ref.progress,
      unique_name = _ref.unique_name,
      uploaded_bytes = _ref.uploaded_bytes,
      written_bytes = _ref.written_bytes;

  (0,classCallCheck/* default */.Z)(this, UploadMetadata);

  this.file_size = file_size;
  this.name = name;
  this.percentage = percentage;
  this.progress = progress;
  this.unique_name = unique_name;
  this.uploaded_bytes = uploaded_bytes;
  this.written_bytes = written_bytes;
};

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
      formatBytes: Utility/* formatBytes */.td
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
      if ((0,esm_typeof/* default */.Z)(files) === 'object') file = files;else if (Array.isArray(files) && files.length > 0) file = files[0];
      if (file) return new File([file], file.name);else return null;
    },
    chunk_size: function chunk_size() {
      return this.calcChunkSize(this.file);
    },
    processed: function processed() {
      var uploaded_bytes = this.uploaded_bytes || 0;
      var file_size = this.file_size || 0;
      var formatted_uploaded_bytes = (0,Utility/* formatBytes */.td)(uploaded_bytes);
      var formatted_file_size = (0,Utility/* formatBytes */.td)(file_size);
      return "".concat(formatted_uploaded_bytes, "/").concat(formatted_file_size);
    }
  },
  destroyed: function destroyed() {
    this.stop();
  },
  methods: {
    processChunk: function processChunk(file, chunk) {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, data, metadata, _error$response, _response, _response$data, _data, _data$message, message;

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

                if (data) {
                  _context.next = 9;
                  break;
                }

                throw new Error('no response');

              case 9:
                //exit if no response data
                metadata = new UploadMetadata(data);

                _this.updateMetadata(metadata);

                _this.$emit('progress', {
                  file: file,
                  metadata: metadata
                }); // notify advancement
                // advance the start


                _this.start = _this.end;

                if (!(!_this.paused && _this.end < file.size)) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", _this.upload());

              case 17:
                // exit if we are done
                _this.reset();

                _this.$emit('completed', metadata); // notify completed


                return _context.abrupt("return", metadata);

              case 20:
                _context.next = 29;
                break;

              case 22:
                _context.prev = 22;
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

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
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
    updateMetadata: function updateMetadata(_ref2) {
      var file_size = _ref2.file_size,
          progress = _ref2.progress,
          unique_name = _ref2.unique_name,
          uploaded_bytes = _ref2.uploaded_bytes;
      this.file.unique_name = unique_name;
      this.remote_file_name = unique_name;
      this.uploaded_bytes = uploaded_bytes;
      this.file_size = file_size;
      this.progress = progress;
      return progress;
    },
    upload: function upload() {
      var _this2 = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
                file_reader = new FileReaderAsync/* default */.Z();
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
;// CONCATENATED MODULE: ./src/components/FileUploader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FileUploadervue_type_script_lang_js_ = (FileUploadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/FileUploader.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  components_FileUploadervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FileUploader = (component.exports);

/***/ }),

/***/ 4986:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Test; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=template&id=7d9880e0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('FileUploader',{ref:"uploader",attrs:{"files":_vm.files}}),_c('b-form-file',{ref:"file",attrs:{"id":"file","DISABLED-state":"Boolean(files)","placeholder":"Choose a file or drop it here...","drop-placeholder":"Drop file here..."},model:{value:(_vm.files),callback:function ($$v) {_vm.files=$$v},expression:"files"}}),_c('b-button',{on:{"click":_vm.upload}},[_vm._v("upload")]),_c('div',{staticClass:"d-flex flex-row justify-content-center align-items-center"},[_c('b-card',{attrs:{"title":"This is a test","img-src":_vm.cat},scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('h6',{staticClass:"mb-0"},[_vm._v("Header Slot")])]},proxy:true},{key:"footer",fn:function(){return [_c('h6',{staticClass:"mb-0"},[_vm._v("Footer Slot")])]},proxy:true}])},[_c('b-card-text',[_vm._v(" This is a test ")])],1)],1)],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./src/assets/crying-cat.jpg
var crying_cat = __webpack_require__(5349);
// EXTERNAL MODULE: ./src/components/FileUploader.vue + 3 modules
var FileUploader = __webpack_require__(9629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=script&lang=js&
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


/* harmony default export */ var Testvue_type_script_lang_js_ = ({
  components: {
    FileUploader: FileUploader/* default */.Z
  },
  data: function data() {
    return {
      cat: crying_cat,
      files: null,
      progress: 0,
      max: 100,
      uploading: false,
      completed: false
    };
  },
  computed: {},
  methods: {
    onUploadCompleted: function onUploadCompleted() {
      console.log(arguments);
    },
    upload: function upload() {
      var _arguments = arguments;
      var uploader = this.$refs.uploader;
      uploader.$on('completed', function () {
        console.log(_arguments);
      });
      uploader.$on('error', function (_ref) {
        var message = _ref.message,
            file = _ref.file,
            error = _ref.error;
        console.log({
          message: message,
          file: file,
          error: error
        });
      });
      return uploader.upload();
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/Test.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Testvue_type_script_lang_js_ = (Testvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/pages/Test.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  pages_Testvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Test = (component.exports);

/***/ }),

/***/ 5349:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/crying-cat.99949377.jpg";

/***/ })

}]);
//# sourceMappingURL=advanced_import.common.986.js.map