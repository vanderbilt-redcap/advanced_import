"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[531],{

/***/ 8847:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ FileUploader; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileUploader.vue?vue&type=template&id=786ceae4&
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
var FileReaderAsync = __webpack_require__(3375);
// EXTERNAL MODULE: ./src/libs/Utility.js
var Utility = __webpack_require__(5444);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileUploader.vue?vue&type=script&lang=js&
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

/***/ 8059:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ LogsTable; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/LogsTable.vue?vue&type=template&id=d102da56&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "overflow-auto"
  }, [_c('div', {
    staticClass: "d-flex flex-row justify-content-start align-items-start"
  }, [_c('b-button', {
    attrs: {
      "size": "sm",
      "variant": "info",
      "disabled": _vm.loading
    },
    on: {
      "click": _vm.getLogs
    }
  }, [_vm.loading ? _c('font-awesome-icon', {
    attrs: {
      "icon": "spinner",
      "spin": ""
    }
  }) : _c('font-awesome-icon', {
    attrs: {
      "icon": "sync"
    }
  }), _c('span', [_vm._v(" Reload")])], 1), _vm.hasItems ? _c('b-button', {
    directives: [{
      name: "b-modal",
      rawName: "v-b-modal.modal-delete",
      modifiers: {
        "modal-delete": true
      }
    }],
    staticClass: "ml-2",
    attrs: {
      "size": "sm",
      "variant": "danger",
      "disabled": _vm.loading
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "trash"
    }
  }), _c('span', [_vm._v(" Delete logs")])], 1) : _vm._e(), _c('b-modal', {
    attrs: {
      "id": "modal-delete",
      "title": "Delete logs"
    },
    on: {
      "ok": _vm.handleOkDelete
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("Are you sure you want to delete all logs for the current project?")])]), _vm.hasItems ? _c('b-pagination', {
    staticClass: "ml-2",
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.per_page,
      "aria-controls": "my-table",
      "size": "sm"
    },
    model: {
      value: _vm.current_page,
      callback: function ($$v) {
        _vm.current_page = $$v;
      },
      expression: "current_page"
    }
  }) : _vm._e()], 1), _c('b-table', {
    staticClass: "my-2",
    attrs: {
      "id": "my-table",
      "items": _vm.items_proxy,
      "_per-page": "per_page",
      "_current-page": "current_page",
      "small": "",
      "bordered": "",
      "striped": "",
      "hover": ""
    }
  }), _vm.hasItems ? _c('b-pagination', {
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.per_page,
      "aria-controls": "my-table",
      "size": "sm"
    },
    model: {
      value: _vm.current_page,
      callback: function ($$v) {
        _vm.current_page = $$v;
      },
      expression: "current_page"
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/LogsTable.vue?vue&type=script&lang=js&


/* harmony default export */ var LogsTablevue_type_script_lang_js_ = ({
  data() {
    return {
      per_page: 20,
      current_page: 1,
      loading: false
    };
  },
  async created() {},
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      items: state => state.logs.list
    }),
    items_proxy() {
      const items = [...this.items];
      let per_page = this.per_page;
      let remainder = this.current_page * per_page - items.length;
      if (remainder < 0) remainder = 0;
      const empty_value = "";
      let placeholder = {
        'no logs': empty_value
      };
      if (items.length > 0) {
        placeholder = {};
        let first_item = items[0];
        for (let key of Object.keys(first_item)) {
          placeholder[key] = empty_value;
        }
      }
      for (let i = 0; i < remainder; i++) items.push(placeholder);
      return items;
    },
    rows() {
      const total = this.$store.getters['logs/total'];
      return total || this.items.length;
    },
    hasItems() {
      try {
        return this.items.length > 0;
      } catch (error) {
        return false;
      }
    }
  },
  watch: {
    current_page: {
      immediate: true,
      handler() {
        this.getLogs();
      }
    }
  },
  methods: {
    async getLogs() {
      try {
        this.loading = true;
        const limit = this.per_page;
        const start = this.per_page * (this.current_page - 1);
        const response = await this.$API.dispatch('logs/get', {
          start,
          limit
        });
        const {
          data = {}
        } = response;
        const {
          data: list = {},
          metadata = {}
        } = data;
        await this.$store.dispatch('logs/setState', {
          list,
          metadata
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async handleOkDelete() {
      const response = await this.$API.dispatch('logs/delete');
      console.log(response);
      this.getLogs();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LogsTablevue_type_script_lang_js_ = (LogsTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/LogsTable.vue?vue&type=style&index=0&id=d102da56&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=style&index=0&id=d102da56&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/LogsTable.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_LogsTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d102da56",
  null
  
)

/* harmony default export */ var LogsTable = (component.exports);

/***/ }),

/***/ 6531:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Review; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/Review.vue?vue&type=template&id=fcebd24e&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('h6', [_vm._v("Review your settings")]), _c('table', {
    staticClass: "table table-bordered table-striped"
  }, [_vm._m(0), _c('tbody', _vm._l(_vm.settings, function (value, key) {
    return _c('tr', {
      key: key
    }, [_c('td', [_vm._v(_vm._s(key))]), _c('td', [_c('pre', [_vm._v(_vm._s(value))])])]);
  }), 0)]), _c('div', {
    staticClass: "buttons d-flex flex-row justify-content-between"
  }, [_vm._t("left"), _c('section', [_c('button', {
    staticClass: "btn btn-primary ml-2",
    attrs: {
      "disabled": _vm.processing
    },
    on: {
      "click": _vm.importCSV
    }
  }, [_vm.processing ? _c('font-awesome-icon', {
    attrs: {
      "icon": "spinner",
      "spin": "",
      "fixed-width": ""
    }
  }) : _c('font-awesome-icon', {
    attrs: {
      "icon": "file-import",
      "fixed-width": ""
    }
  }), _c('span', [_vm._v(" import")])], 1)]), _vm._t("right", null, {
    "validation": _vm.$v
  })], 2), _c('b-modal', {
    ref: "modal-success",
    attrs: {
      "title": "Process completed",
      "ok-only": "",
      "size": "xl"
    },
    on: {
      "hidden": _vm.onCloseModal
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("The import proces is completed. Please check the "), _c('router-link', {
    attrs: {
      "to": {
        name: 'logs'
      }
    }
  }, [_vm._v("logs")]), _vm._v(" for details.")], 1), _c('LogsTable', {
    ref: "logs"
  })], 1), _c('b-modal', {
    ref: "modal-upload",
    attrs: {
      "title": "Uploading CSV file",
      "ok-only": "",
      "no-close-on-esc": "",
      "no-close-on-backdrop": "",
      "hide-header-close": "",
      "ok-title": "cancel"
    },
    on: {
      "ok": _vm.onProcessStopped
    }
  }, [_c('FileUploader', {
    ref: "uploader",
    attrs: {
      "files": _vm.files
    }
  })], 1), _c('b-modal', {
    ref: "modal-process",
    attrs: {
      "id": "modal-process",
      "title": "Processing CSV file",
      "ok-only": "",
      "no-close-on-esc": "",
      "no-close-on-backdrop": "",
      "hide-header-close": "",
      "ok-title": "cancel",
      "size": "xl"
    },
    on: {
      "ok": _vm.onProcessStopped
    }
  }, [_c('FileProcesser', {
    ref: "processer",
    attrs: {
      "background_process": _vm.background_process
    }
  }), _c('LogsTable', {
    ref: "logs"
  })], 1), _c('b-modal', {
    ref: "modal-abort",
    attrs: {
      "id": "modal-abort",
      "title": "Process stopped",
      "ok-only": ""
    },
    on: {
      "ok": _vm.onProcessStopped
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("The process has been stopped by the user")])])], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("key")]), _c('th', [_vm._v("value")])])]);
}];

;// CONCATENATED MODULE: ./src/components/import/Review.vue?vue&type=template&id=fcebd24e&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
// EXTERNAL MODULE: ./src/components/FileUploader.vue + 3 modules
var FileUploader = __webpack_require__(8847);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileProcesser.vue?vue&type=template&id=084c3311&
var FileProcesservue_type_template_id_084c3311_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm.processing && !_vm.background_process ? _c('div', [_c('b-progress', {
    attrs: {
      "max": _vm.max,
      "show-progress": "",
      "animated": "",
      "variant": "success",
      "height": "2rem"
    }
  }, [_c('b-progress-bar', {
    attrs: {
      "value": _vm.progress,
      "label": `${(_vm.progress * 100).toFixed(2)}%`
    }
  })], 1), _c('div', {
    staticClass: "text-muted small my-2"
  }, [_vm.total_lines && _vm.total_lines > 0 ? _c('span', [_vm._v("Processed " + _vm._s(_vm.current_line) + "/" + _vm._s(_vm.total_lines))]) : _vm._e(), _c('non-blank-space')], 1)], 1) : _vm._e(),  false ? 0 : _vm._e()]);
};
var FileProcesservue_type_template_id_084c3311_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FileProcesser.vue?vue&type=script&lang=js&

/* harmony default export */ var FileProcesservue_type_script_lang_js_ = ({
  data() {
    return {
      cancel: null,
      max: 1,
      current_line: 0,
      processing: false,
      abort: false,
      progress: 0
    };
  },
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      settings: state => state.import_settings,
      total_lines: state => state.csv_data.total_lines
    })
  },
  props: {
    background_process: {
      type: Boolean,
      default: false
    }
  },
  destroyed() {
    this.reset();
  },
  methods: {
    /**
     * process a remote file.
     * start from line 1 by default
     * since on line 0 we usually have field names
     */
    async process(file_name, line = 1) {
      if (this.abort) return;
      this.processing = true;
      try {
        const next = async line => {
          const settings = {
            ...this.settings
          };
          settings.background_process = this.background_process; //set the background process flag
          settings.data_row_start = line;
          const promise = this.$API.dispatch('importData/processCSV', file_name, settings);
          this.cancel = promise.cancel;
          const response = await promise;
          const {
            data
          } = response;
          if (data) {
            // exit if background process started
            if (this.background_process) return true;
            const {
              line = 1
            } = data;
            let progress = this.updateProgress({
              line
            });
            this.$emit('progress', {
              progress
            });
            return next(line);
          }
        };
        // await new Promise(resolve=>setTimeout(resolve, 10000))
        await next(line);
        this.$emit('completed');
      } catch (error) {
        this.$emit('error', error);
      } finally {
        this.processing = false;
      }
    },
    updateProgress({
      line
    }) {
      if (this.total_lines <= 0) return;
      if (line) this.current_line = line;
      if (isNaN(this.current_line) || isNaN(this.total_lines)) return;
      if (this.current_line > this.total_lines) this.current_line = this.total_lines;
      let progress = this.current_line / this.total_lines;
      this.progress = progress;
      return progress;
    },
    reset() {
      if (typeof this.cancel === 'function') this.cancel();
      this.abort = true;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/FileProcesser.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FileProcesservue_type_script_lang_js_ = (FileProcesservue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/FileProcesser.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  components_FileProcesservue_type_script_lang_js_,
  FileProcesservue_type_template_id_084c3311_render,
  FileProcesservue_type_template_id_084c3311_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FileProcesser = (component.exports);
// EXTERNAL MODULE: ./src/components/LogsTable.vue + 5 modules
var LogsTable = __webpack_require__(8059);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/Review.vue?vue&type=script&lang=js&





/* harmony default export */ var Reviewvue_type_script_lang_js_ = ({
  components: {
    FileUploader: FileUploader/* default */.Z,
    FileProcesser: FileProcesser,
    LogsTable: LogsTable/* default */.Z
  },
  data() {
    return {
      processing: false,
      background_process: false
    };
  },
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      files: state => state.import_settings.files,
      event_id: state => state.import_settings.event_id,
      form_name: state => state.import_settings.form_name,
      import_settings: state => state.import_settings
    }),
    dynamic_fields() {
      return this.$store.getters['import_settings/mappedDynamicFields'];
    },
    mappedFieldsWithCsvNames() {
      return this.$store.getters['import_settings/mappedFieldsWithCsvNames'];
    },
    settings() {
      const {
        name: file_name = ''
      } = this.files || {};
      const import_settings = {
        ...this.import_settings
      };
      const settings = {
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
  },
  methods: {
    showModal(ref_name) {
      const promise = new Promise((resolve, reject) => {
        const modal_element = this.$refs[ref_name];
        if (!modal_element) return reject();
        const onShown = () => {
          modal_element.$off('shown', onShown);
          resolve();
        };
        modal_element.$on('shown', onShown);
        modal_element.show();
      });
      return promise;
    },
    closeModal(ref_name) {
      const promise = new Promise((resolve, reject) => {
        const modal_element = this.$refs[ref_name];
        if (!modal_element) return reject();
        const onShown = () => {
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
    async upload() {
      await this.showModal('modal-upload');
      const uploader = this.$refs.uploader;
      uploader.$on('completed', () => {
        this.closeModal('modal-upload');
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
    },
    updateLogs() {
      const {
        getLogs
      } = this.$refs.logs;
      if (typeof getLogs !== 'function') return;
      getLogs();
    },
    async showCompleted() {
      await this.showModal('modal-success');
    },
    /**
     * process the reomte file
     */
    async enqueProcess(file_name) {
      try {
        const settings = {
          ...this.import_settings
        };
        settings.dynamic_fields = this.dynamic_fields; // only gey dynamic fields that are actually mapped
        const response = await this.$API.dispatch('importData/enqueue', file_name, settings);
        const {
          data
        } = response;
        const message = `Import process created (ID ${data['job_id']}). Please check your logs.`;
        await this.$bvModal.msgBoxOk(message, {
          title: 'Success',
          buttonSize: 'sm'
        });
        this.$router.push({
          name: 'home'
        });
      } catch (error) {
        let error_message = error;
        if (typeof error === 'object') {
          const {
            response: {
              data
            }
          } = error;
          const {
            message = 'error'
          } = data;
          error_message = `${message}`;
        }
        this.$bvModal.msgBoxOk(error_message, {
          title: 'Error',
          buttonSize: 'sm'
        });
      }
    },
    async onProcessStopped() {
      await this.showModal('modal-abort');
    },
    /**
     * start the process:
     * - upload the file
     * - process the remote file
     */
    async importCSV() {
      try {
        const {
          unique_name
        } = await this.upload();
        if (!unique_name) return;
        // let file_name = 'Data8277.csv'
        await this.enqueProcess(unique_name);
      } catch (error) {
        console.log(error);
      } finally {
        this.processing = false;
        this.background_process = false;
      }
    },
    onCloseModal() {
      // this.$router.push({name: 'home'})
      console.log('done');
    }
  },
  validations() {
    return {};
  }
});
;// CONCATENATED MODULE: ./src/components/import/Review.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_Reviewvue_type_script_lang_js_ = (Reviewvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/import/Review.vue





/* normalize component */
;
var Review_component = (0,componentNormalizer/* default */.Z)(
  import_Reviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "fcebd24e",
  null
  
)

/* harmony default export */ var Review = (Review_component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.531.js.map