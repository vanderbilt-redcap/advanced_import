((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[10],{

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

/***/ "3f68":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "699c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ab0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13d50d64-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/MapFields.vue?vue&type=template&id=5a94eca1&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("The wizard guessed the mapping for you but you can adjust the mapping as needed and select the dynamic fields.")]),_vm._v(" "+_vm._s(_vm.mapping)+" "),_c('table',{staticClass:"table table-striped table-bordered"},[_c('thead',[_c('tr',[_c('th',{staticClass:"text-nowrap"},[_vm._v("Dynamic "),_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-dynamic-fields",modifiers:{"modal-dynamic-fields":true}}],attrs:{"size":"sm","variant":"outline-info"}},[_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":['fas', 'question-circle']}})],1)],1),_c('th',[_vm._v("Destination Field (REDCap)")]),_c('th',[_vm._v("Source Field (CSV file)")])])]),_c('tbody',_vm._l((_vm.form_fields),function(form_field,index){return _c('tr',{key:index,class:{mapped: _vm.hasMapping(form_field.field_name)}},[_c('td',{staticClass:"min text-right"},[(form_field.field_name!==_vm.primary_key)?_c('b-form-checkbox',{attrs:{"disabled":!_vm.hasMapping(form_field.field_name),"checked":_vm.isDynamic(form_field.field_name),"switch":""},on:{"input":function($event){return _vm.onDynamicToggle(form_field.field_name, $event)}}}):_vm._e()],1),_c('td',[_c('span',{staticClass:"d-flex flex-row align-items-center"},[_c('span',[_vm._v(_vm._s(form_field.element_label))]),(form_field.field_name===_vm.primary_key)?_c('font-awesome-icon',{staticClass:"icon text-warning ml-1",attrs:{"title":"primary key","icon":['fas', 'star']}}):_vm._e()],1),_c('span',{staticClass:"small"},[_vm._v("("+_vm._s(form_field.field_name)+")")])]),_c('td',[_c('CsvFieldsDropDown',{attrs:{"redcapFieldName":form_field.field_name,"redcapFieldType":form_field.element_type}})],1)])}),0)]),_c('b-modal',{attrs:{"id":"modal-dynamic-fields","title":"Dynamic fields","ok-only":""}},[_c('div',{staticClass:"my-4"},[_c('p',[_vm._v("Mark as \"dynamic\" the fields that are not relevant in determining the uniqueness of an entry (i.e. can be different compared to existing data).")]),_c('p',[_vm._v("If you are importing \"medications\" in a repeated form, for example, you may want to mark the \"status\" field as dynamic since it could have changed since the previous import.")]),_c('p',[_vm._v("Dynamic fields will be ignored when the wizard will try to determine the uniqueness of a row.")])])]),_c('p',[_vm._v("Remember to map the primary key to proceed.")]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v})],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=template&id=5a94eca1&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__("3835");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__("4fad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13d50d64-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=template&id=4e0303e8&scoped=true&
var CsvFieldsDropDownvue_type_template_id_4e0303e8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-dropdown',{staticClass:"checkbox-dropdown bg-white",attrs:{"variant":"outline-secondary"},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('div',[_c('span',[_vm._v(_vm._s(_vm.buttonText))])])]},proxy:true}])},[_c('b-dropdown-text',[(_vm.multiSelectEnabled)?_c('span',{staticClass:"small font-italic text-info"},[_vm._v("multiple selection")]):_c('span',{staticClass:"small font-italic text-muted"},[_vm._v("single selection")])]),_vm._l((_vm.csv_fields),function(csv_field,csvIndex){return _c('b-dropdown-text',{key:csvIndex},[_c('div',{staticClass:"d-flex"},[_c('b-form-checkbox',{attrs:{"disabled":_vm.isDisabled(csvIndex),"checked":_vm.isMapped(csvIndex),"switch":""},nativeOn:{"input":function($event){$event.preventDefault();return _vm.onSelected(csvIndex, $event.target.checked)}}},[_c('span',[_vm._v(_vm._s(csv_field))])])],1)])})],2)}
var CsvFieldsDropDownvue_type_template_id_4e0303e8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue?vue&type=template&id=4e0303e8&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var CsvFieldsDropDownvue_type_script_lang_js_ = ({
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    csv_fields: function csv_fields(state) {
      return state.csv_data.fields;
    },
    mapping: function mapping(state) {
      return state.import_settings.mapping;
    }
  })), {}, {
    buttonText: function buttonText() {
      var total = this.selected.length;
      if (total == 0) return '--- skip ---';
      var firstCsvIndex = this.selected[0];
      var firstCsvColumn = this.csv_fields[firstCsvIndex];
      if (total == 1) return firstCsvColumn;else return "".concat(firstCsvColumn, " and ").concat(total - 1, " more");
    },
    selected: function selected() {
      return this.$store.getters['import_settings/mappedCsvFields'](this.redcapFieldName);
    },
    multiSelectEnabled: function multiSelectEnabled() {
      return this.redcapFieldType == 'checkbox';
    }
  }),
  props: {
    redcapFieldName: {
      type: String,
      default: ''
    },
    redcapFieldType: {
      type: String,
      default: ''
    }
  },
  methods: {
    isDisabled: function isDisabled(csvIndex) {
      if (this.isMappedElsewhere(csvIndex)) return true;
      var otherindexes = this.selected.filter(function (index) {
        return index != csvIndex;
      }); // list of other mapped indexes excluded the current one

      if (otherindexes.length > 0 && !this.multiSelectEnabled) return true;
      return false;
    },

    /**
     * check if a CSV index is assigned to any REDCap field but the one specified
     */
    isMappedElsewhere: function isMappedElsewhere(csvIndex) {
      var mapping = Object(objectSpread2["a" /* default */])({}, this.mapping);

      for (var _i = 0, _Object$entries = Object.entries(mapping); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = Object(slicedToArray["a" /* default */])(_Object$entries[_i], 2),
            redcapField = _Object$entries$_i[0],
            csvIndexes = _Object$entries$_i[1];

        if (redcapField == this.redcapFieldName) continue;
        if (csvIndexes.indexOf(csvIndex) >= 0) return true;
      }

      return false;
    },

    /**
     * check if a REDCap field has a specific CSV column assigned
     */
    isMapped: function isMapped(csvIndex) {
      return this.selected.indexOf(csvIndex) >= 0;
    },
    onSelected: function onSelected(csvIndex, checked) {
      var fieldName = this.redcapFieldName;
      this.$store.dispatch('import_settings/toggleCsvField', {
        fieldName: fieldName,
        csvIndex: csvIndex,
        checked: checked
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_CsvFieldsDropDownvue_type_script_lang_js_ = (CsvFieldsDropDownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/import/CsvFieldsDropDown.vue?vue&type=style&index=0&id=4e0303e8&scoped=true&lang=css&
var CsvFieldsDropDownvue_type_style_index_0_id_4e0303e8_scoped_true_lang_css_ = __webpack_require__("e213");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  import_CsvFieldsDropDownvue_type_script_lang_js_,
  CsvFieldsDropDownvue_type_template_id_4e0303e8_scoped_true_render,
  CsvFieldsDropDownvue_type_template_id_4e0303e8_scoped_true_staticRenderFns,
  false,
  null,
  "4e0303e8",
  null
  
)

/* harmony default export */ var CsvFieldsDropDown = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/MapFields.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var MapFieldsvue_type_script_lang_js_ = ({
  components: {
    CsvFieldsDropDown: CsvFieldsDropDown
  },
  data: function data() {
    return {};
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    csv_fields: function csv_fields(state) {
      return state.csv_data.fields;
    },
    // mappingList: state => state.import_settings.mappingList,
    primary_key: function primary_key(state) {
      return state.import_settings.primary_key;
    },
    mapping: function mapping(state) {
      return state.import_settings.mapping;
    },
    dynamic_fields: function dynamic_fields(state) {
      return state.import_settings.dynamic_fields;
    }
  })), {}, {
    form_fields: function form_fields() {
      var form_name = this.$store.state.import_settings.form_name;
      var fields = this.$store.getters['settings/form_fields'](form_name);
      return fields;
    }
  }),
  methods: {
    onDynamicToggle: function onDynamicToggle(field, checked) {
      this.$store.dispatch('import_settings/toggleDynamicField', {
        field: field,
        checked: checked
      });
    },

    /**
     * check if a REDCap field has at least a CSV column associated
     */
    hasMapping: function hasMapping(redcapField) {
      var csvFields = this.$store.getters['import_settings/mappedCsvFields'](redcapField);
      return csvFields.length > 0;
    },
    isDynamic: function isDynamic(redcapField) {
      return this.dynamic_fields.indexOf(redcapField) >= 0;
    }
  },
  validations: function validations() {
    var getMappedFields = function getMappedFields(list) {
      var mappedFields = [];

      for (var _i = 0, _Object$entries = Object.entries(list); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = Object(slicedToArray["a" /* default */])(_Object$entries[_i], 2),
            fieldName = _Object$entries$_i[0],
            indexes = _Object$entries$_i[1];

        if (indexes.length > 0) mappedFields.push(fieldName);
      }

      return mappedFields;
    };

    return {
      mapping: {
        required: function required(list) {
          var mappedFields = getMappedFields(list);
          return mappedFields.length > 0;
        },
        primaryKeyIsMapped: function primaryKeyIsMapped(list) {
          var mappedFields = getMappedFields(list);
          var primary_key = this.primary_key;
          return mappedFields.includes(primary_key);
        }
      }
    };
  }
});
// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_MapFieldsvue_type_script_lang_js_ = (MapFieldsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/import/MapFields.vue?vue&type=style&index=0&id=5a94eca1&scoped=true&lang=css&
var MapFieldsvue_type_style_index_0_id_5a94eca1_scoped_true_lang_css_ = __webpack_require__("f992");

// CONCATENATED MODULE: ./src/components/import/MapFields.vue






/* normalize component */

var MapFields_component = Object(componentNormalizer["a" /* default */])(
  import_MapFieldsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5a94eca1",
  null
  
)

/* harmony default export */ var MapFields = __webpack_exports__["default"] = (MapFields_component.exports);

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

/***/ "e213":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CsvFieldsDropDown_vue_vue_type_style_index_0_id_4e0303e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3f68");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CsvFieldsDropDown_vue_vue_type_style_index_0_id_4e0303e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CsvFieldsDropDown_vue_vue_type_style_index_0_id_4e0303e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f992":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapFields_vue_vue_type_style_index_0_id_5a94eca1_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("699c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapFields_vue_vue_type_style_index_0_id_5a94eca1_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MapFields_vue_vue_type_style_index_0_id_5a94eca1_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=advanced_import.common.10.js.map