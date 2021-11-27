"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[978],{

/***/ 9978:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ TargetForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/TargetForm.vue?vue&type=template&id=646a890d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',[_vm._v("Select a destination form.")]),_c('EventFormSelect',{model:{value:(_vm.form),callback:function ($$v) {_vm.form=$$v},expression:"form"}}),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v,"processFunction":_vm.processSettings})],2)],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(8792);
// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(5666);
// EXTERNAL MODULE: ./node_modules/vuelidate/lib/validators/index.js
var validators = __webpack_require__(379);
// EXTERNAL MODULE: ./src/components/EventFormSelect.vue + 3 modules
var EventFormSelect = __webpack_require__(7288);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/TargetForm.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var TargetFormvue_type_script_lang_js_ = ({
  components: {
    EventFormSelect: EventFormSelect/* default */.Z
  },
  computed: {
    form: {
      get: function get() {
        var event_id = this.$store.state.import_settings.event_id;
        var form_name = this.$store.state.import_settings.form_name;
        return {
          event_id: event_id,
          form_name: form_name
        };
      },
      set: function set(_ref) {
        var event_id = _ref.event_id,
            form_name = _ref.form_name;
        this.$store.dispatch('import_settings/setStateProperty', {
          key: 'mapping',
          value: {}
        }); //reset the mapping

        this.$store.dispatch('import_settings/setStateProperty', {
          key: 'event_id',
          value: event_id
        });
        this.$store.dispatch('import_settings/setStateProperty', {
          key: 'form_name',
          value: form_name
        });
      }
    }
  },
  methods: {
    // this function is processed befo switching to the next tab in the import wizard
    processSettings: function processSettings() {
      var _this = this;

      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _this.$store.dispatch('import_settings/guessMapping'));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  validations: {
    form: {
      isValidObject: function isValidObject(_ref2) {
        var event_id = _ref2.event_id,
            form_name = _ref2.form_name;
        return (0,validators/* required */.C1)(event_id) && (0,validators/* required */.C1)(form_name);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/import/TargetForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_TargetFormvue_type_script_lang_js_ = (TargetFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/import/TargetForm.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  import_TargetFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TargetForm = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.978.js.map