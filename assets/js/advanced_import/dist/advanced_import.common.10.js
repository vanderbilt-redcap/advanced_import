((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[10],{

/***/ "2278":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6b7c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "91b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePreview_vue_vue_type_style_index_0_id_5c0e1aa0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2278");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePreview_vue_vue_type_style_index_0_id_5c0e1aa0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePreview_vue_vue_type_style_index_0_id_5c0e1aa0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilePreview_vue_vue_type_style_index_0_id_5c0e1aa0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a955":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6d3536b3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/import/Index.vue?vue&type=template&id=475f86c6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard"},[_c('FilePreview'),_c('b-card',{staticClass:"mt-2"},[_c('b-tabs',{staticClass:"wizard-tabs",attrs:{"no-nav-style":"","content-class":"mt-0"},model:{value:(_vm.step_index),callback:function ($$v) {_vm.step_index=$$v},expression:"step_index"}},_vm._l((_vm.steps),function(item,index){return _c('b-tab',{key:index,attrs:{"title":"","title-link-class":"d-none"}},[_c('div',{staticClass:"steps text-center mb-2"},[_c('b-badge',{attrs:{"variant":"light"}},[_vm._v("Step "+_vm._s(_vm.step_index+1)+" of "+_vm._s(_vm.steps.length))])],1),_c(item.component,{tag:"component",scopedSlots:_vm._u([{key:"left",fn:function(){return [(_vm.step_index>0)?_c('button',{staticClass:"btn btn-outline-primary",attrs:{"disabled":_vm.step_index==0},on:{"click":_vm.goToPrevStep}},[_vm._v("go back")]):_c('span')]},proxy:true},{key:"default",fn:function(){return undefined},proxy:true},{key:"right",fn:function(ref){
var validation = ref.validation;
var processFunction = ref.processFunction;
return [_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.step_index<(_vm.steps.length-1)),expression:"step_index<(steps.length-1)"}],staticClass:"btn btn-outline-primary",attrs:{"disabled":validation.$invalid},on:{"click":function($event){return _vm.goToNextStep(processFunction)}}},[_vm._v("next")])]}}],null,true)})],1)}),1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/import/Index.vue?vue&type=template&id=475f86c6&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6d3536b3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=template&id=5c0e1aa0&scoped=true&
var FilePreviewvue_type_template_id_5c0e1aa0_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.items_proxy && _vm.items_proxy.length>0)?_c('b-card',{staticClass:"mt-2",attrs:{"id":"table-container","title":_vm.title}},[_c('b-table',{attrs:{"id":"my-table","items":_vm.items_proxy,"small":"","bordered":"","striped":"","hover":"","thClass":"th-head"},scopedSlots:_vm._u([{key:"head()",fn:function(data){return [_c('section',[_c('span',{staticClass:"d-block small",attrs:{"title":"REDCap field"}},[_c('non-blank-space'),(Boolean(_vm.getMappingIndex(data.column)))?_c('b-badge',{attrs:{"variant":"info"}},[_c('span',[_vm._v(_vm._s(_vm.getMappingIndex(data.column)))]),(_vm.isPrimaryKey(data.column))?_c('font-awesome-icon',{staticClass:"ml-1 text-warning",attrs:{"icon":"star","title":"primary key"}}):_vm._e(),(_vm.isDynamic(data.column))?_c('font-awesome-icon',{staticClass:"ml-1 text-danger",attrs:{"icon":"level-down-alt","title":"dynamic"}}):_vm._e()],1):_vm._e()],1),_c('span',{staticClass:"d-block small",attrs:{"title":"CSV column"}},[_vm._v(_vm._s(data.column))])])]}}],null,false,3827963304)}),_c('section',[(_vm.counting)?_c('span',[_vm._v("Counting lines:")]):_c('span',[_vm._v("Total lines:")]),_c('span',[_vm._v(" "+_vm._s(_vm.formatNumber(_vm.total_lines)))])])],1):_vm._e()],1)}
var FilePreviewvue_type_template_id_5c0e1aa0_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/import/FilePreview.vue?vue&type=template&id=5c0e1aa0&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=script&lang=js&










//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FilePreviewvue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    items: function items(state) {
      return state.csv_data.data;
    },
    total_lines: function total_lines(state) {
      return state.csv_data.total_lines;
    },
    counting: function counting(state) {
      return state.csv_data.counting;
    },
    files: function files(state) {
      return state.import_settings.files;
    }
  })), {}, {
    title: function title() {
      var title = 'Preview';

      if (this.files && this.files.name) {
        var _this$files$name = this.files.name,
            name = _this$files$name === void 0 ? false : _this$files$name;
        if (name) title = "".concat(name, " (preview)");
      }

      return title;
    },

    /**
     * proxy for items.
     * return dummy data if no file is selected
     */
    items_proxy: function items_proxy() {
      var files = this.files;

      if (!files) {
        var dummy_items = Object(toConsumableArray["a" /* default */])(Array(5).keys()).map(function () {
          return {
            'no data': ""
          };
        });

        return dummy_items;
      }

      return this.items;
    }
  }),
  destroyed: function destroyed() {
    this.$store.dispatch('csv_data/stopCounting');
  },
  methods: {
    formatNumber: function formatNumber(number) {
      return new Intl.NumberFormat('en-US', {}).format(number);
    },
    getMappingIndex: function getMappingIndex(column_name) {
      var _this$$store$state$im = Object(objectSpread2["a" /* default */])({}, this.$store.state.import_settings),
          mapping = _this$$store$state$im.mapping;

      var first_item = this.items[0] || {};
      var items_keys = Object.keys(first_item);
      var index = items_keys.indexOf(column_name);
      var redcap_field = Object.keys(mapping).find(function (key) {
        return mapping[key] === index;
      });
      return redcap_field;
    },
    isDynamic: function isDynamic(column_name) {
      var redcap_field = this.getMappingIndex(column_name);

      var _this$$store$state$im2 = Object(objectSpread2["a" /* default */])({}, this.$store.state.import_settings),
          dynamic_keys = _this$$store$state$im2.dynamic_keys;

      return dynamic_keys.indexOf(redcap_field) >= 0;
    },
    isPrimaryKey: function isPrimaryKey(column_name) {
      var redcap_field = this.getMappingIndex(column_name);

      var _this$$store$state$im3 = Object(objectSpread2["a" /* default */])({}, this.$store.state.import_settings),
          primary_key = _this$$store$state$im3.primary_key;

      return redcap_field && redcap_field == primary_key;
    }
  },
  watch: {
    files: {
      immediate: true,
      handler: function handler(file) {
        this.$store.dispatch('csv_data/countFileLinesFast', file);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/import/FilePreview.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_FilePreviewvue_type_script_lang_js_ = (FilePreviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/import/FilePreview.vue?vue&type=style&index=0&id=5c0e1aa0&scoped=true&lang=css&
var FilePreviewvue_type_style_index_0_id_5c0e1aa0_scoped_true_lang_css_ = __webpack_require__("91b4");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/import/FilePreview.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  import_FilePreviewvue_type_script_lang_js_,
  FilePreviewvue_type_template_id_5c0e1aa0_scoped_true_render,
  FilePreviewvue_type_template_id_5c0e1aa0_scoped_true_staticRenderFns,
  false,
  null,
  "5c0e1aa0",
  null
  
)

/* harmony default export */ var FilePreview = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/import/Index.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var steps = [{
  component: function component() {
    return __webpack_require__.e(/* import() */ 6).then(__webpack_require__.bind(null, "8761"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, "5a78"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 20).then(__webpack_require__.bind(null, "d622"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, "43f0"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 9).then(__webpack_require__.bind(null, "12bd"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 16).then(__webpack_require__.bind(null, "ab0f"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 8).then(__webpack_require__.bind(null, "7406"));
  }
}, {
  component: function component() {
    return __webpack_require__.e(/* import() */ 14).then(__webpack_require__.bind(null, "01bd"));
  }
}];
/* harmony default export */ var Indexvue_type_script_lang_js_ = ({
  components: {
    FilePreview: FilePreview
  },
  data: function data() {
    return {
      step_index: 0,
      steps: steps,
      processing: false
    };
  },
  created: function created() {
    this.step = this.steps[0];
  },
  destroyed: function destroyed() {
    this.$store.dispatch('import_settings/reset');
    this.$store.dispatch('csv_data/reset');
  },
  methods: {
    goToPrevStep: function goToPrevStep() {
      var index = this.step_index;
      if (--index <= 0) index = 0;
      this.step_index = index;
    },
    goToNextStep: function goToNextStep(processFunction) {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result, index;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(processFunction && typeof processFunction == 'function')) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return processFunction();

              case 3:
                result = _context.sent;

                if (result) {
                  _context.next = 6;
                  break;
                }

                throw new Error('error going to next step');

              case 6:
                index = _this.step_index;
                if (++index >= _this.steps.length) index = _this.steps.length - 1;
                _this.step_index = index;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/pages/import/Index.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_Indexvue_type_script_lang_js_ = (Indexvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/import/Index.vue?vue&type=style&index=0&id=475f86c6&scoped=true&lang=css&
var Indexvue_type_style_index_0_id_475f86c6_scoped_true_lang_css_ = __webpack_require__("d83a");

// CONCATENATED MODULE: ./src/pages/import/Index.vue






/* normalize component */

var Index_component = Object(componentNormalizer["a" /* default */])(
  import_Indexvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "475f86c6",
  null
  
)

/* harmony default export */ var Index = __webpack_exports__["default"] = (Index_component.exports);

/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "d83a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_475f86c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6b7c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_475f86c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_475f86c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_475f86c6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=advanced_import.common.10.js.map