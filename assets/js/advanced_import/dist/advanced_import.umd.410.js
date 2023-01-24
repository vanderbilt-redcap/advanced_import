"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[410],{

/***/ 6410:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Review; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/export/Review.vue?vue&type=template&id=4342c729&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('p', [_vm._v("Export to CSV")]), _c('table', {
    staticClass: "table table-bordered table-striped"
  }, [_vm._m(0), _c('tbody', _vm._l(_vm.settings, function (value, key) {
    return _c('tr', {
      key: key
    }, [_c('td', [_vm._v(_vm._s(key))]), _c('td', [_vm._v(_vm._s(value))])]);
  }), 0)]), _c('div', {
    staticClass: "buttons d-flex flex-row justify-content-between"
  }, [_vm._t("left"), _vm._t("default"), _c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": _vm.exportCSV
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "file-export"
    }
  }), _c('span', [_vm._v(" Download")])], 1)], 2)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("key")]), _c('th', [_vm._v("value")])])]);
}];

;// CONCATENATED MODULE: ./src/components/export/Review.vue?vue&type=template&id=4342c729&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/export/Review.vue?vue&type=script&lang=js&


/* harmony default export */ var Reviewvue_type_script_lang_js_ = ({
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      settings: state => state.export_settings,
      field_delimiter: state => state.export_settings.field_delimiter,
      text_qualifier: state => state.export_settings.text_qualifier,
      event_id: state => state.export_settings.event_id,
      form_name: state => state.export_settings.form_name
    }),
    download_url() {
      console.log(this.settings);
      return this.$API.dispatch('exportData/getExportUrl', this.settings);
    }
  },
  methods: {
    async exportCSV() {
      const settings = {
        ...this.settings
      };
      await this.$API.dispatch('exportData/download', settings);
      this.$router.push({
        name: 'home'
      });
    }
  },
  validations: {}
});
;// CONCATENATED MODULE: ./src/components/export/Review.vue?vue&type=script&lang=js&
 /* harmony default export */ var export_Reviewvue_type_script_lang_js_ = (Reviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/export/Review.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  export_Reviewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Review = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.410.js.map