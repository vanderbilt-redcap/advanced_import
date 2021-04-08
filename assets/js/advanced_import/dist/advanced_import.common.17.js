((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[17],{

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

/***/ "ab0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e25c8372-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/MapFields.vue?vue&type=template&id=76d310d2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("The wizard guessed the mapping for you but you can adjust the mapping as needed and select the dynamic fields.")]),_c('table',{staticClass:"table table-striped table-bordered"},[_c('thead',[_c('tr',[_c('th',[_vm._v("Destination Field (REDCap)")]),_c('th',[_vm._v("Source Field (CSV file)")]),_c('th',[_vm._v("Dynamic "),_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-dynamic-fields",modifiers:{"modal-dynamic-fields":true}}],attrs:{"size":"sm","variant":"outline-info"}},[_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":['fas', 'question-circle']}})],1)],1)])]),_c('tbody',_vm._l((_vm.form_fields),function(field,index){return _c('tr',{key:index},[_c('td',[_c('span',{staticClass:"d-flex flex-row align-items-center"},[_c('span',[_vm._v(_vm._s(field.element_label))]),(field.field_name===_vm.primary_key)?_c('font-awesome-icon',{staticClass:"icon text-warning ml-1",attrs:{"title":"primary key","icon":['fas', 'star']}}):_vm._e()],1),_c('span',{staticClass:"small"},[_vm._v("("+_vm._s(field.field_name)+")")])]),_c('td',[_c('select',{staticClass:"form-control",domProps:{"value":_vm.mapping[field.field_name]},on:{"change":function($event){_vm.onInput(field.field_name)($event)}}},[_c('option',{attrs:{"value":""}},[_vm._v("--- skip ---")]),_vm._l((_vm.csv_fields),function(csv_field,index){return _c('option',{key:index,attrs:{"disabled":Object.values(_vm.mapping).includes(index)},domProps:{"value":index}},[_vm._v(_vm._s(csv_field))])})],2),_c('div')]),_c('td',[(field.field_name!==_vm.primary_key)?_c('b-form-checkbox',{attrs:{"disabled":!field.field_name || isNaN(_vm.mapping[field.field_name]),"value":field.field_name,"switch":""},model:{value:(_vm.dynamic_keys),callback:function ($$v) {_vm.dynamic_keys=$$v},expression:"dynamic_keys"}}):_vm._e()],1)])}),0)]),_c('b-modal',{attrs:{"id":"modal-dynamic-fields","title":"Dynamic fields","ok-only":""}},[_c('div',{staticClass:"my-4"},[_c('p',[_vm._v("Mark as \"dynamic\" the fields that could change in an entry.")]),_c('p',[_vm._v("If you are importing \"medications\" in a repeated form, for example, you may want to mark the \"status\" field as dynamic since it could change in time.")]),_c('p',[_vm._v("Dynamic fields will be ignored when the wizard will try to determine the uniqueness of a row.")])])]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v})],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=template&id=76d310d2&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__("2909");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

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
//
//
//
//
//
//
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
  data: function data() {
    return {};
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapState */])({
    csv_fields: function csv_fields(state) {
      return state.csv_data.fields;
    },
    mapping: function mapping(state) {
      return state.import_settings.mapping;
    },
    primary_key: function primary_key(state) {
      return state.import_settings.primary_key;
    }
  })), {}, {
    dynamic_keys: {
      get: function get() {
        return this.$store.state.import_settings.dynamic_keys;
      },
      set: function set(value) {
        this.$store.dispatch('import_settings/setStateProperty', {
          key: 'dynamic_keys',
          value: value
        });
      }
    },
    form_fields: function form_fields() {
      var form_name = this.$store.state.import_settings.form_name;
      var fields = this.$store.getters['settings/form_fields'](form_name);
      return fields;
    }
  }),
  methods: {
    onInput: function onInput(field_name) {
      var _this = this;

      return function (event) {
        var value = Number(event.target.value);

        if (!field_name || isNaN(value)) {
          console.log("error mapping the field ".concat(field_name));
          return;
        }

        _this.$store.dispatch('import_settings/setMapping', {
          target: field_name,
          source: value
        });
      };
    }
  },
  validations: function validations() {
    var form_field_names = Object(toConsumableArray["a" /* default */])(this.form_fields).map(function (field) {
      return field.field_name;
    });

    return {
      mapping: {
        required: function required(mapping) {
          var mapping_keys = Object.keys(mapping);
          var mapped_form_fields = form_field_names.filter(function (value) {
            return mapping_keys.includes(value);
          });
          return mapped_form_fields.length >= 1;
        },
        primaryKeyIsMapped: function primaryKeyIsMapped(mapping) {
          var mapping_keys = Object.keys(mapping);
          var primary_key = this.primary_key;
          return mapping_keys.includes(primary_key);
        }
      }
    };
  }
});
// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_MapFieldsvue_type_script_lang_js_ = (MapFieldsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/import/MapFields.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  import_MapFieldsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MapFields = __webpack_exports__["default"] = (component.exports);

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


/***/ })

}]);
//# sourceMappingURL=advanced_import.common.17.js.map