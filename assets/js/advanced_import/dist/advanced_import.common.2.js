"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[2],{

/***/ 4580:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ FileUploader; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileUploader.vue?vue&type=template&id=786ceae4&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm.processing ? _c('div', [_c('b-progress', {
    attrs: {
      "max": _vm.max,
      "show-progress": "",
      "animated": false,
      "variant": "primary",
      "size": "sm"
    }
  }, [_c('b-progress-bar', {
    attrs: {
      "value": _vm.progress,
      "label": `${(_vm.progress * 100).toFixed(2)}%`
    }
  })], 1), _c('div', {
    staticClass: "text-muted small"
  }, [_vm.uploaded_bytes && _vm.uploaded_bytes > 0 ? _c('span', [_vm._v("uploaded " + _vm._s(_vm.formatBytes(_vm.uploaded_bytes)) + " of " + _vm._s(_vm.formatBytes(_vm.file_size)))]) : _vm._e(), _c('non-blank-space')], 1)], 1) : _vm._e(),  false ? 0 : _vm._e()]);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./src/libs/FileReaderAsync.js
var FileReaderAsync = __webpack_require__(9821);
// EXTERNAL MODULE: ./src/libs/Utility.js
var Utility = __webpack_require__(4933);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileUploader.vue?vue&type=script&lang=js&
// import { mapState } from 'vuex'


const MIN_CHUNK_SIZE = 1000 * 1024;
const MAX_CHUNK_SIZE = 1000 * 1024 * 5;
const TOTAL_CHUNKS = 20;
class UploadMetadata {
  constructor({
    file_size,
    name,
    percentage,
    progress,
    unique_name,
    uploaded_bytes,
    written_bytes
  }) {
    this.file_size = file_size;
    this.name = name;
    this.percentage = percentage;
    this.progress = progress;
    this.unique_name = unique_name;
    this.uploaded_bytes = uploaded_bytes;
    this.written_bytes = written_bytes;
  }
}
/* harmony default export */ var FileUploadervue_type_script_lang_js_ = ({
  data() {
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
      default: () => []
    }
  },
  computed: {
    /* ...mapState({
        file: state => state.import_settings.files,
    }), */
    file() {
      let files = this.files;
      let file;
      if (typeof files === 'object') file = files;else if (Array.isArray(files) && files.length > 0) file = files[0];
      if (file) return new File([file], file.name);else return null;
    },
    chunk_size() {
      return this.calcChunkSize(this.file);
    },
    processed() {
      let uploaded_bytes = this.uploaded_bytes || 0;
      let file_size = this.file_size || 0;
      let formatted_uploaded_bytes = (0,Utility/* formatBytes */.td)(uploaded_bytes);
      let formatted_file_size = (0,Utility/* formatBytes */.td)(file_size);
      return `${formatted_uploaded_bytes}/${formatted_file_size}`;
    }
  },
  destroyed() {
    this.stop();
  },
  methods: {
    async processChunk(file, chunk) {
      try {
        if (this.abort) return;
        const response = await this.sendChunk(file, chunk);
        const {
          data
        } = response;
        if (!data) throw new Error('no response'); //exit if no response data
        const metadata = new UploadMetadata(data);
        this.updateMetadata(metadata);
        this.$emit('progress', {
          file,
          metadata
        }); // notify advancement
        // advance the start
        this.start = this.end;
        if (!this.paused && this.end < file.size) {
          return this.upload();
        } else {
          // exit if we are done
          this.reset();
          this.$emit('completed', metadata); // notify completed
          return metadata;
        }
      } catch (error) {
        const {
          response = {}
        } = error;
        const {
          data = {}
        } = response;
        const {
          message = ''
        } = data;
        // console.log(message, file, error)
        this.$emit('error', {
          message,
          file,
          error
        }); // notify error
        this.reset();
      }
    },
    calculateProgress(file, position) {
      try {
        const value = position / file.size;
        if (position < 0) return 0;
        if (position > file.size) return 1;
        return value;
      } catch (error) {
        return 0;
      }
    },
    sendChunk(file, chunk) {
      const promise = this.$API.dispatch('upload/upload', file, chunk);
      this.cancel = promise.cancel;
      return promise;
    },
    calcChunkSize(file) {
      if (!file) return MIN_CHUNK_SIZE;
      const {
        size = 0
      } = file;
      let chunk_size = size / TOTAL_CHUNKS;
      if (chunk_size < MIN_CHUNK_SIZE) return MIN_CHUNK_SIZE;
      if (chunk_size > MAX_CHUNK_SIZE) return MAX_CHUNK_SIZE;
      return chunk_size;
    },
    updateMetadata({
      file_size,
      progress,
      unique_name,
      uploaded_bytes
    }) {
      this.file.unique_name = unique_name;
      this.remote_file_name = unique_name;
      this.uploaded_bytes = uploaded_bytes;
      this.file_size = file_size;
      this.progress = progress;
      return progress;
    },
    async upload() {
      if (!this.file) return;
      const file = this.file;
      this.processing = true;
      this.paused = false;
      this.end = this.start + this.chunk_size + 1;
      const blob = file.slice(this.start, this.end);
      const file_reader = new FileReaderAsync/* default */.Z();
      const chunk = await file_reader.readAsDataURLAsync(blob);
      return this.processChunk(file, chunk);
    },
    stop() {
      if (typeof this.cancel === 'function') this.cancel();
      this.abort = true;
    },
    onPause() {
      this.processing = false;
      this.paused = true;
    },
    reset() {
      setTimeout(() => {
        this.cancel = null;
        this.start = 0;
        this.end = 0;
        this.processing = false;
        this.paused = false;
        this.abort = false;
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

/***/ 3524:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Test; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=template&id=7d9880e0&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('FileUploader', {
    ref: "uploader",
    attrs: {
      "files": _vm.files
    }
  }), _c('b-form-file', {
    ref: "file",
    attrs: {
      "id": "file",
      "DISABLED-state": "Boolean(files)",
      "placeholder": "Choose a file or drop it here...",
      "drop-placeholder": "Drop file here..."
    },
    model: {
      value: _vm.files,
      callback: function ($$v) {
        _vm.files = $$v;
      },
      expression: "files"
    }
  }), _c('b-button', {
    on: {
      "click": _vm.upload
    }
  }, [_vm._v("upload")]), _c('div', {
    staticClass: "d-flex flex-row justify-content-center align-items-center"
  }, [_c('b-card', {
    attrs: {
      "title": "This is a test",
      "img-src": _vm.cat
    },
    scopedSlots: _vm._u([{
      key: "header",
      fn: function () {
        return [_c('h6', {
          staticClass: "mb-0"
        }, [_vm._v("Header Slot")])];
      },
      proxy: true
    }, {
      key: "footer",
      fn: function () {
        return [_c('h6', {
          staticClass: "mb-0"
        }, [_vm._v("Footer Slot")])];
      },
      proxy: true
    }])
  }, [_c('b-card-text', [_vm._v(" This is a test ")])], 1)], 1)], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./src/assets/crying-cat.jpg
var crying_cat_namespaceObject = __webpack_require__.p + "img/crying-cat.99949377.jpg";
// EXTERNAL MODULE: ./src/components/FileUploader.vue + 3 modules
var FileUploader = __webpack_require__(4580);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=script&lang=js&


/* harmony default export */ var Testvue_type_script_lang_js_ = ({
  components: {
    FileUploader: FileUploader/* default */.Z
  },
  data() {
    return {
      cat: crying_cat_namespaceObject,
      files: null,
      progress: 0,
      max: 100,
      uploading: false,
      completed: false
    };
  },
  computed: {},
  methods: {
    onUploadCompleted() {
      console.log(arguments);
    },
    upload() {
      const uploader = this.$refs.uploader;
      uploader.$on('completed', () => {
        console.log(arguments);
      });
      uploader.$on('error', ({
        message,
        file,
        error
      }) => {
        console.log({
          message,
          file,
          error
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

/***/ })

}]);
//# sourceMappingURL=advanced_import.common.2.js.map