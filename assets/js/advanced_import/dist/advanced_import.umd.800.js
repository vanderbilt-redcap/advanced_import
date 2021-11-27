"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[800],{

/***/ 1800:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Index; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/import/Index.vue?vue&type=template&id=24c7e0bd&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard"},[_c('FilePreview'),_c('b-card',{staticClass:"mt-2"},[_c('b-tabs',{staticClass:"wizard-tabs",attrs:{"no-nav-style":"","content-class":"mt-0"},model:{value:(_vm.step_index),callback:function ($$v) {_vm.step_index=$$v},expression:"step_index"}},_vm._l((_vm.steps),function(item,index){return _c('b-tab',{key:index,attrs:{"title":"","title-link-class":"d-none"}},[_c('div',{staticClass:"steps text-center mb-2"},[_c('b-badge',{attrs:{"variant":"light"}},[_vm._v("Step "+_vm._s(_vm.step_index+1)+" of "+_vm._s(_vm.steps.length))])],1),_c(item.element,{tag:"component",scopedSlots:_vm._u([{key:"left",fn:function(){return [(_vm.step_index>0)?_c('button',{staticClass:"btn btn-outline-primary",attrs:{"disabled":_vm.step_index==0},on:{"click":_vm.goToPrevStep}},[_vm._v("go back")]):_c('span')]},proxy:true},{key:"default",fn:function(){return undefined},proxy:true},{key:"right",fn:function(ref){
var validation = ref.validation;
var processFunction = ref.processFunction;
return [_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.step_index<(_vm.steps.length-1)),expression:"step_index<(steps.length-1)"}],staticClass:"btn btn-outline-primary",attrs:{"disabled":validation.$invalid},on:{"click":function($event){return _vm.goToNextStep(processFunction)}}},[_vm._v("next")])]}}],null,true)})],1)}),1)],1)],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(8792);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=template&id=9bd7fb0c&scoped=true&
var FilePreviewvue_type_template_id_9bd7fb0c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.items_proxy && _vm.items_proxy.length>0)?_c('b-card',{staticClass:"mt-2",attrs:{"id":"table-container","title":_vm.title}},[_c('b-table',{attrs:{"id":"my-table","items":_vm.items_proxy,"small":"","bordered":"","striped":"","hover":"","thClass":"th-head"},scopedSlots:_vm._u([{key:"head()",fn:function(data){return [_c('section',[_c('span',{staticClass:"d-block small",attrs:{"title":"REDCap field"}},[_c('non-blank-space'),(Boolean(_vm.getRedcapField(data.column)))?_c('b-badge',{attrs:{"variant":"info"}},[_c('span',[_vm._v(_vm._s(_vm.getRedcapField(data.column)))]),(_vm.isPrimaryKey(data.column))?_c('font-awesome-icon',{staticClass:"ml-1 text-warning",attrs:{"icon":"star","title":"primary key","fixed-width":""}}):(_vm.isDynamic(data.column))?_c('font-awesome-icon',{staticClass:"ml-1 text-danger",attrs:{"icon":"level-down-alt","title":"dynamic","fixed-width":""}}):_c('font-awesome-icon',{staticClass:"ml-1 text-secondary",attrs:{"icon":"check-circle","title":"standard","fixed-width":""}})],1):_vm._e()],1),_c('span',{staticClass:"d-block small",attrs:{"title":"CSV column"}},[_vm._v(_vm._s(data.column))])])]}}],null,false,95129129)}),_c('section',[(_vm.counting)?_c('span',[_vm._v("Counting lines:")]):_c('span',[_vm._v("Total lines:")]),_c('span',[_vm._v(" "+_vm._s(_vm.formatNumber(_vm.total_lines)))])])],1):_vm._e()],1)}
var FilePreviewvue_type_template_id_9bd7fb0c_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8327);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(1531);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(7810);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(1249);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(9720);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(2479);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=script&lang=js&










//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  computed: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, (0,vuex_esm/* mapState */.rn)({
    items: function items(state) {
      return state.csv_data.data;
    },
    csvFields: function csvFields(state) {
      return state.csv_data.fields;
    },
    total_lines: function total_lines(state) {
      return state.csv_data.total_lines;
    },
    counting: function counting(state) {
      return state.csv_data.counting;
    },
    files: function files(state) {
      return state.import_settings.files;
    },
    mapping: function mapping(state) {
      return state.import_settings.mapping;
    },
    dynamic_fields: function dynamic_fields(state) {
      return state.import_settings.dynamic_fields;
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
        var dummy_items = (0,toConsumableArray/* default */.Z)(Array(5).keys()).map(function () {
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
    getRedcapField: function getRedcapField(column_name) {
      var mapping = (0,objectSpread2/* default */.Z)({}, this.mapping);

      var index = this.csvFields.indexOf(column_name);

      for (var _i = 0, _Object$entries = Object.entries(mapping); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
            fieldName = _Object$entries$_i[0],
            csvIndexes = _Object$entries$_i[1];

        if (Object.values(csvIndexes).indexOf(index) >= 0) return fieldName;
      }

      return;
    },
    isDynamic: function isDynamic(column_name) {
      var redcapField = this.getRedcapField(column_name);
      if (!redcapField) return false;
      return this.dynamic_fields.indexOf(redcapField) >= 0;
    },
    isPrimaryKey: function isPrimaryKey(column_name) {
      var redcapField = this.getRedcapField(column_name);
      if (!redcapField) return false;

      var _this$$store$state$im = (0,objectSpread2/* default */.Z)({}, this.$store.state.import_settings),
          primary_key = _this$$store$state$im.primary_key;

      return redcapField == primary_key;
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
;// CONCATENATED MODULE: ./src/components/import/FilePreview.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_FilePreviewvue_type_script_lang_js_ = (FilePreviewvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=style&index=0&id=9bd7fb0c&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/FilePreview.vue?vue&type=style&index=0&id=9bd7fb0c&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/import/FilePreview.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  import_FilePreviewvue_type_script_lang_js_,
  FilePreviewvue_type_template_id_9bd7fb0c_scoped_true_render,
  FilePreviewvue_type_template_id_9bd7fb0c_scoped_true_staticRenderFns,
  false,
  null,
  "9bd7fb0c",
  null
  
)

/* harmony default export */ var FilePreview = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/import/Index.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  element: function element() {
    return __webpack_require__.e(/* import() */ 465).then(__webpack_require__.bind(__webpack_require__, 2465));
  }
}, {
  element: function element() {
    return Promise.all(/* import() */[__webpack_require__.e(493), __webpack_require__.e(884)]).then(__webpack_require__.bind(__webpack_require__, 9884));
  }
}, {
  element: function element() {
    return Promise.all(/* import() */[__webpack_require__.e(762), __webpack_require__.e(828)]).then(__webpack_require__.bind(__webpack_require__, 7008));
  }
}, {
  element: function element() {
    return Promise.all(/* import() */[__webpack_require__.e(2), __webpack_require__.e(978)]).then(__webpack_require__.bind(__webpack_require__, 9978));
  }
}, {
  element: function element() {
    return __webpack_require__.e(/* import() */ 842).then(__webpack_require__.bind(__webpack_require__, 6842));
  }
}, {
  element: function element() {
    return __webpack_require__.e(/* import() */ 646).then(__webpack_require__.bind(__webpack_require__, 9646));
  }
}, {
  element: function element() {
    return __webpack_require__.e(/* import() */ 772).then(__webpack_require__.bind(__webpack_require__, 3772));
  }
}, {
  element: function element() {
    return __webpack_require__.e(/* import() */ 304).then(__webpack_require__.bind(__webpack_require__, 5304));
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

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
;// CONCATENATED MODULE: ./src/pages/import/Index.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_Indexvue_type_script_lang_js_ = (Indexvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/import/Index.vue?vue&type=style&index=0&id=24c7e0bd&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/pages/import/Index.vue?vue&type=style&index=0&id=24c7e0bd&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/pages/import/Index.vue



;


/* normalize component */

var Index_component = (0,componentNormalizer/* default */.Z)(
  import_Indexvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "24c7e0bd",
  null
  
)

/* harmony default export */ var Index = (Index_component.exports);

/***/ }),

/***/ 1249:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(2109);
var $map = (__webpack_require__(2092).map);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.800.js.map