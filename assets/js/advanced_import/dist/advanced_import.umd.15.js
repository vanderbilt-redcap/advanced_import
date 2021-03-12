((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[15],{

/***/ "0a39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_3a697109_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6382");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_3a697109_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_3a697109_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LogsTable_vue_vue_type_style_index_0_id_3a697109_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6382":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e19e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6d3536b3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Logs.vue?vue&type=template&id=2ca240f8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("Check the logs for errors or warnings.")]),_c('LogsTable')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Logs.vue?vue&type=template&id=2ca240f8&scoped=true&

// EXTERNAL MODULE: ./src/components/LogsTable.vue + 4 modules
var LogsTable = __webpack_require__("fb4a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Logs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//

/* harmony default export */ var Logsvue_type_script_lang_js_ = ({
  components: {
    LogsTable: LogsTable["a" /* default */]
  },
  computed: {}
});
// CONCATENATED MODULE: ./src/pages/Logs.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Logsvue_type_script_lang_js_ = (Logsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/pages/Logs.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Logsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2ca240f8",
  null
  
)

/* harmony default export */ var Logs = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "fb4a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6d3536b3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LogsTable.vue?vue&type=template&id=3a697109&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overflow-auto"},[_c('div',{staticClass:"d-flex flex-row justify-content-start align-items-start"},[_c('b-button',{attrs:{"size":"sm","variant":"info","disabled":_vm.loading},on:{"click":_vm.getLogs}},[(_vm.loading)?_c('font-awesome-icon',{attrs:{"icon":"spinner","spin":""}}):_c('font-awesome-icon',{attrs:{"icon":"sync"}}),_c('span',[_vm._v(" Reload")])],1),(_vm.hasItems)?_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-delete",modifiers:{"modal-delete":true}}],staticClass:"ml-2",attrs:{"size":"sm","variant":"danger","disabled":_vm.loading}},[_c('font-awesome-icon',{attrs:{"icon":"trash"}}),_c('span',[_vm._v(" Delete logs")])],1):_vm._e(),_c('b-modal',{attrs:{"id":"modal-delete","title":"Delete logs"},on:{"ok":_vm.handleOkDelete}},[_c('p',{staticClass:"my-4"},[_vm._v("Are you sure you want to delete all logs for the current project?")])]),(_vm.hasItems)?_c('b-pagination',{staticClass:"ml-2",attrs:{"total-rows":_vm.rows,"per-page":_vm.per_page,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}):_vm._e()],1),_c('b-table',{staticClass:"my-2",attrs:{"id":"my-table","items":_vm.items_proxy,"_per-page":"per_page","_current-page":"current_page","small":"","bordered":"","striped":"","hover":""}}),(_vm.hasItems)?_c('b-pagination',{attrs:{"total-rows":_vm.rows,"per-page":_vm.per_page,"aria-controls":"my-table","size":"sm"},model:{value:(_vm.current_page),callback:function ($$v) {_vm.current_page=$$v},expression:"current_page"}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=template&id=3a697109&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

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

var empty_value = "";
/* harmony default export */ var LogsTablevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      per_page: 50,
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
      var min_rows = 5;
      if (per_page > min_rows) per_page = min_rows;
      var remainder = per_page - items.length % per_page;
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
// EXTERNAL MODULE: ./src/components/LogsTable.vue?vue&type=style&index=0&id=3a697109&scoped=true&lang=css&
var LogsTablevue_type_style_index_0_id_3a697109_scoped_true_lang_css_ = __webpack_require__("0a39");

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
  "3a697109",
  null
  
)

/* harmony default export */ var LogsTable = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.15.js.map