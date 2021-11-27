"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[298],{

/***/ 8021:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ RecordFormat; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/export/RecordFormat.vue?vue&type=template&id=7a3be3d4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("Select the field delimiter and the text qualifier.")]),_c('div',{staticClass:"d-flex flex-row align-items-center"},[_c('FieldDelimiter',{staticClass:"col pl-0",model:{value:(_vm.field_delimiter),callback:function ($$v) {_vm.field_delimiter=$$v},expression:"field_delimiter"}}),_c('TextQualifier',{staticClass:"col px-0",model:{value:(_vm.text_qualifier),callback:function ($$v) {_vm.text_qualifier=$$v},expression:"text_qualifier"}})],1),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v})],2)])}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/vuelidate/lib/validators/index.js
var validators = __webpack_require__(379);
// EXTERNAL MODULE: ./src/components/FieldDelimiter.vue + 3 modules
var FieldDelimiter = __webpack_require__(6250);
// EXTERNAL MODULE: ./src/components/TextQualifier.vue + 3 modules
var TextQualifier = __webpack_require__(7755);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/export/RecordFormat.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var RecordFormatvue_type_script_lang_js_ = ({
  components: {
    FieldDelimiter: FieldDelimiter/* default */.ZP,
    TextQualifier: TextQualifier/* default */.Z
  },
  data: function data() {
    return {};
  },
  computed: {
    field_delimiter: {
      get: function get() {
        return this.$store.state.export_settings.field_delimiter;
      },
      set: function set(value) {
        this.$store.dispatch('export_settings/setStateProperty', {
          key: 'field_delimiter',
          value: value
        });
      }
    },
    text_qualifier: {
      get: function get() {
        return this.$store.state.export_settings.text_qualifier;
      },
      set: function set(value) {
        this.$store.dispatch('export_settings/setStateProperty', {
          key: 'text_qualifier',
          value: value
        });
      }
    }
  },
  validations: function validations() {
    return {
      field_delimiter: {
        required: (0,validators/* requiredIf */.CF)(function (value) {
          return !(0,FieldDelimiter/* isStandardDelimiter */.Et)(value);
        })
      },
      text_qualifier: {
        required: validators/* required */.C1
      }
    };
  }
});
;// CONCATENATED MODULE: ./src/components/export/RecordFormat.vue?vue&type=script&lang=js&
 /* harmony default export */ var export_RecordFormatvue_type_script_lang_js_ = (RecordFormatvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/export/RecordFormat.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  export_RecordFormatvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RecordFormat = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.common.298.js.map