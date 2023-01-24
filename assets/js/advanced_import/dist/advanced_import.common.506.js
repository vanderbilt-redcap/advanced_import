"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[506],{

/***/ 1506:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ TargetForm; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/TargetForm.vue?vue&type=template&id=646a890d&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('p', [_vm._v("Select a destination form.")]), _c('EventFormSelect', {
    model: {
      value: _vm.form,
      callback: function ($$v) {
        _vm.form = $$v;
      },
      expression: "form"
    }
  }), _c('div', {
    staticClass: "buttons d-flex flex-row justify-content-between"
  }, [_vm._t("left"), _vm._t("default"), _vm._t("right", null, {
    "validation": _vm.$v,
    "processFunction": _vm.processSettings
  })], 2)], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuelidate/lib/validators/index.js
var validators = __webpack_require__(379);
// EXTERNAL MODULE: ./src/components/EventFormSelect.vue + 3 modules
var EventFormSelect = __webpack_require__(2160);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/TargetForm.vue?vue&type=script&lang=js&


/* harmony default export */ var TargetFormvue_type_script_lang_js_ = ({
  components: {
    EventFormSelect: EventFormSelect/* default */.Z
  },
  computed: {
    form: {
      get() {
        const event_id = this.$store.state.import_settings.event_id;
        const form_name = this.$store.state.import_settings.form_name;
        return {
          event_id,
          form_name
        };
      },
      set({
        event_id,
        form_name
      }) {
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
    async processSettings() {
      // await this.$store.dispatch('import_settings/setStateProperty', {key: 'dynamic_keys', value:[]}) // reset the dynamic keys
      // await this.$store.dispatch('import_settings/setStateProperty',{key:'mapping', value: {}}) // reset the mappimg before guessing
      return this.$store.dispatch('import_settings/guessMapping');
    }
  },
  validations: {
    form: {
      isValidObject: ({
        event_id,
        form_name
      }) => {
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
//# sourceMappingURL=advanced_import.common.506.js.map