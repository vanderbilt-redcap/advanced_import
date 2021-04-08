((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[20],{

/***/ "0ec0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e25c8372-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/export/Review.vue?vue&type=template&id=031818f2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("Export to CSV")]),_c('table',{staticClass:"table table-bordered table-striped "},[_vm._m(0),_c('tbody',_vm._l((_vm.settings),function(value,key){return _c('tr',{key:key},[_c('td',[_vm._v(_vm._s(key))]),_c('td',[_vm._v(_vm._s(value))])])}),0)]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default",[_c('button',{staticClass:"btn btn-primary",on:{"click":_vm.exportCSV}},[_c('font-awesome-icon',{attrs:{"icon":"file-export"}}),_c('span',[_vm._v(" Download")])],1)])],2)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("key")]),_c('th',[_vm._v("value")])])])}]


// CONCATENATED MODULE: ./src/components/export/Review.vue?vue&type=template&id=031818f2&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/export/Review.vue?vue&type=script&lang=js&



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
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    settings: function settings(state) {
      return state.export_settings;
    },
    field_delimiter: function field_delimiter(state) {
      return state.export_settings.field_delimiter;
    },
    text_qualifier: function text_qualifier(state) {
      return state.export_settings.text_qualifier;
    },
    event_id: function event_id(state) {
      return state.export_settings.event_id;
    },
    form_name: function form_name(state) {
      return state.export_settings.form_name;
    }
  })), {}, {
    download_url: function download_url() {
      console.log(this.settings);
      return this.$API.dispatch('exportData/getExportUrl', this.settings);
    }
  }),
  methods: {
    exportCSV: function exportCSV() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var settings;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                settings = Object(objectSpread2["a" /* default */])({}, _this.settings);
                _context.next = 3;
                return _this.$API.dispatch('exportData/download', settings);

              case 3:
                _this.$router.push({
                  name: 'home'
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  validations: {}
});
// CONCATENATED MODULE: ./src/components/export/Review.vue?vue&type=script&lang=js&
 /* harmony default export */ var export_Reviewvue_type_script_lang_js_ = (Reviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/export/Review.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  export_Reviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Review = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.20.js.map