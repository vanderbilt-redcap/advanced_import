((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[646],{

/***/ 9646:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ MapFields; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/MapFields.vue?vue&type=template&id=524a07fe&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("The wizard guessed the mapping for you but you can adjust the mapping as needed and select the dynamic fields.")]),_c('table',{staticClass:"table table-striped table-bordered"},[_c('thead',[_c('tr',[_c('th',{staticClass:"text-nowrap"},[_vm._v("Dynamic "),_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-dynamic-fields",modifiers:{"modal-dynamic-fields":true}}],attrs:{"size":"sm","variant":"outline-info"}},[_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":['fas', 'question-circle']}})],1)],1),_c('th',[_vm._v("Destination Field (REDCap)")]),_c('th',[_vm._v("Source Field (CSV file)")])])]),_c('tbody',_vm._l((_vm.form_fields),function(form_field,index){return _c('tr',{key:index},[_c('td',{staticClass:"min text-right"},[(form_field.field_name!==_vm.primary_key)?_c('b-form-checkbox',{attrs:{"disabled":!_vm.hasMapping(form_field.field_name),"checked":_vm.isDynamic(form_field.field_name),"switch":""},on:{"input":function($event){return _vm.onDynamicToggle(form_field.field_name, $event)}}}):_vm._e()],1),_c('td',[_c('span',{staticClass:"d-flex flex-row align-items-center"},[_c('span',{staticClass:"font-weight-bold"},[_vm._v(_vm._s(form_field.field_name))]),(form_field.field_name===_vm.primary_key)?_c('font-awesome-icon',{staticClass:"icon text-warning ml-1",attrs:{"title":"primary key","icon":['fas', 'star']}}):_vm._e()],1),_c('span',{staticClass:"small",domProps:{"innerHTML":_vm._s(form_field.element_label)}})]),_c('td',[(form_field.element_type=='checkbox')?[_c('CsvFieldsDropDown',{attrs:{"redcapFieldName":form_field.field_name,"redcapFieldType":form_field.element_type}})]:[_c('CsvFieldsSingleSelect',{attrs:{"redcapFieldName":form_field.field_name}})]],2)])}),0)]),_c('b-modal',{attrs:{"id":"modal-dynamic-fields","title":"Dynamic fields","ok-only":""}},[_c('div',{staticClass:"my-4"},[_c('p',[_vm._v("Mark as \"dynamic\" the fields that are not relevant in determining the uniqueness of an entry (i.e. can be different compared to existing data).")]),_c('p',[_vm._v("If you are importing \"medications\" in a repeated form, for example, you may want to mark the \"status\" field as dynamic since it could have changed since the previous import.")]),_c('p',[_vm._v("Dynamic fields will be ignored when the wizard will try to determine the uniqueness of a row.")])])]),_c('p',[_vm._v("Remember to map the primary key to proceed.")]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v})],2)],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8327);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(7810);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(2479);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(9720);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(2023);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=template&id=0c8532ff&scoped=true&
var CsvFieldsDropDownvue_type_template_id_0c8532ff_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-container',_vm._l((_vm.checkboxOptions),function(option,index){return _c('b-row',{key:index,staticClass:"d-flex flex-column option"},[_c('b-col',{staticClass:"small"},[_c('span',[_vm._v("["+_vm._s(index)+"]:")]),_c('span',{staticClass:"ml-1"},[_vm._v(_vm._s(option))])]),_c('b-col',{},[_c('CsvFieldsSingleSelect',{attrs:{"redcapFieldName":_vm.redcapFieldName,"fieldIndex":index}})],1)],1)}),1)}
var CsvFieldsDropDownvue_type_template_id_0c8532ff_scoped_true_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsSingleSelect.vue?vue&type=template&id=275dd28e&scoped=true&
var CsvFieldsSingleSelectvue_type_template_id_275dd28e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-dropdown',{staticClass:"w-100",attrs:{"text":"Dropdown Button","variant":_vm.hasMapping ? 'success': 'outline-primary',"lazy":""},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('span',[_vm._v(_vm._s(_vm.selectedText))])]},proxy:true}])},[_c('b-dropdown-item',{attrs:{"active":_vm.skip},on:{"click":function($event){return _vm.onChange(null)}}},[_vm._v("-- skip --")]),_vm._l((_vm.csv_fields),function(field,index){return _c('b-dropdown-item',{key:index,attrs:{"disabled":!_vm.isMapped(index) && _vm.isMappedElsewhere(index),"active":_vm.isMapped(index)},on:{"click":function($event){return _vm.onChange(index)}}},[_c('span',[_vm._v(_vm._s(field))])])})],2)],1)}
var CsvFieldsSingleSelectvue_type_template_id_275dd28e_scoped_true_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.is-integer.js
var es_number_is_integer = __webpack_require__(3161);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(9653);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(7327);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsSingleSelect.vue?vue&type=script&lang=js&








//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var CsvFieldsSingleSelectvue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  computed: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, (0,vuex_esm/* mapState */.rn)({
    csv_fields: function csv_fields(state) {
      return state.csv_data.fields;
    },
    mapping: function mapping(state) {
      return state.import_settings.mapping;
    }
  })), {}, {
    options: function options() {
      var fields = this.csv_fields;
      var options = [];
      var skipOption = {
        value: null,
        text: '-- skip --'
      };
      options.push(skipOption);

      for (var index in fields) {
        var option = {
          value: index,
          text: fields[index]
        };
        options.push(option);
      }

      return options;
    },
    csvIndexes: function csvIndexes() {
      return this.$store.getters['import_settings/mappedCsvFields'](this.redcapFieldName);
    },
    selectedText: function selectedText() {
      var skipText = '--- skip ---';
      var csvIndexes = this.csvIndexes;
      if (csvIndexes.length < 1) return skipText;
      var csvIndex = csvIndexes[this.fieldIndex];
      if (!Number.isInteger(csvIndex)) return skipText;
      return this.csv_fields[csvIndex];
    },
    skip: function skip() {
      if (!Array.isArray(this.csvIndexes)) return true;
      return !Number.isInteger(this.csvIndexes[this.fieldIndex]);
    },
    hasMapping: function hasMapping() {
      return Number.isInteger(this.csvIndexes[this.fieldIndex]);
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
    },
    fieldIndex: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    /**
     * check if a CSV index is assigned to any REDCap field but the one specified
     */
    isMappedElsewhere: function isMappedElsewhere(csvIndex) {
      var mapping = (0,objectSpread2/* default */.Z)({}, this.mapping);

      for (var _i = 0, _Object$entries = Object.entries(mapping); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
            redcapField = _Object$entries$_i[0],
            _Object$entries$_i$ = _Object$entries$_i[1],
            csvIndexes = _Object$entries$_i$ === void 0 ? {} : _Object$entries$_i$;

        if (redcapField == this.redcapFieldName) {
          var otherIndexes = Object.values(csvIndexes).filter(function (value, index) {
            return index != csvIndex;
          });
          if (otherIndexes.indexOf(csvIndex) >= 0) return true;
        } else if (Object.values(csvIndexes).indexOf(csvIndex) >= 0) return true;
      }

      return false;
    },

    /**
     * check if a REDCap field has a specific CSV column assigned
     */
    isMapped: function isMapped(csvIndex) {
      return this.csvIndexes[this.fieldIndex] == csvIndex;
    },
    onChange: function onChange(value) {
      var fieldName = this.redcapFieldName;
      var csvIndex = value;
      var fieldIndex = this.fieldIndex;
      this.$store.dispatch('import_settings/setFieldMapping', {
        fieldName: fieldName,
        csvIndex: csvIndex,
        fieldIndex: fieldIndex
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/components/import/CsvFieldsSingleSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_CsvFieldsSingleSelectvue_type_script_lang_js_ = (CsvFieldsSingleSelectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/import/CsvFieldsSingleSelect.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  import_CsvFieldsSingleSelectvue_type_script_lang_js_,
  CsvFieldsSingleSelectvue_type_template_id_275dd28e_scoped_true_render,
  CsvFieldsSingleSelectvue_type_template_id_275dd28e_scoped_true_staticRenderFns,
  false,
  null,
  "275dd28e",
  null
  
)

/* harmony default export */ var CsvFieldsSingleSelect = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=script&lang=js&
//
//
//
//
//
//
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
  components: {
    CsvFieldsSingleSelect: CsvFieldsSingleSelect
  },
  computed: {
    checkboxOptions: function checkboxOptions() {
      var options = this.$store.getters['settings/checkboxFieldOptions'](this.redcapFieldName);
      return options;
    }
  },
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
  methods: {}
});
;// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_CsvFieldsDropDownvue_type_script_lang_js_ = (CsvFieldsDropDownvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=style&index=0&id=0c8532ff&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue?vue&type=style&index=0&id=0c8532ff&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue



;


/* normalize component */

var CsvFieldsDropDown_component = (0,componentNormalizer/* default */.Z)(
  import_CsvFieldsDropDownvue_type_script_lang_js_,
  CsvFieldsDropDownvue_type_template_id_0c8532ff_scoped_true_render,
  CsvFieldsDropDownvue_type_template_id_0c8532ff_scoped_true_staticRenderFns,
  false,
  null,
  "0c8532ff",
  null
  
)

/* harmony default export */ var CsvFieldsDropDown = (CsvFieldsDropDown_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/MapFields.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    CsvFieldsDropDown: CsvFieldsDropDown,
    CsvFieldsSingleSelect: CsvFieldsSingleSelect
  },
  data: function data() {
    return {};
  },
  computed: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, (0,vuex_esm/* mapState */.rn)({
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
      var primaryKey = this.primary_key;
      var fields = this.$store.getters['settings/mappable_fields'](form_name, primaryKey);
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
      return Object.values(csvFields).length > 0;
    },
    isDynamic: function isDynamic(redcapField) {
      return this.dynamic_fields.indexOf(redcapField) >= 0;
    }
  },
  validations: function validations() {
    var getMappedFields = function getMappedFields(list) {
      var mappedFields = [];

      for (var _i = 0, _Object$entries = Object.entries(list); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
            fieldName = _Object$entries$_i[0],
            _Object$entries$_i$ = _Object$entries$_i[1],
            indexes = _Object$entries$_i$ === void 0 ? {} : _Object$entries$_i$;

        if (Object.values(indexes).length > 0) mappedFields.push(fieldName);
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
;// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_MapFieldsvue_type_script_lang_js_ = (MapFieldsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/MapFields.vue?vue&type=style&index=0&id=524a07fe&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=style&index=0&id=524a07fe&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/import/MapFields.vue



;


/* normalize component */

var MapFields_component = (0,componentNormalizer/* default */.Z)(
  import_MapFieldsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "524a07fe",
  null
  
)

/* harmony default export */ var MapFields = (MapFields_component.exports);

/***/ }),

/***/ 4964:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

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

/***/ 3929:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isRegExp = __webpack_require__(7850);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 6699:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $includes = (__webpack_require__(1318).includes);
var addToUnscopables = __webpack_require__(1223);

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

/***/ 2023:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var notARegExp = __webpack_require__(3929);
var requireObjectCoercible = __webpack_require__(4488);
var correctIsRegExpLogic = __webpack_require__(4964);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.646.js.map