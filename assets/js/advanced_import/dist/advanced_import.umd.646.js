"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[646],{

/***/ 646:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Index; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/import/Index.vue?vue&type=template&id=24c7e0bd&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "wizard"
  }, [_c('FilePreview'), _c('b-card', {
    staticClass: "mt-2"
  }, [_c('b-tabs', {
    staticClass: "wizard-tabs",
    attrs: {
      "no-nav-style": "",
      "content-class": "mt-0"
    },
    model: {
      value: _vm.step_index,
      callback: function ($$v) {
        _vm.step_index = $$v;
      },
      expression: "step_index"
    }
  }, _vm._l(_vm.steps, function (item, index) {
    return _c('b-tab', {
      key: index,
      attrs: {
        "title": ``,
        "title-link-class": "d-none"
      }
    }, [_c('div', {
      staticClass: "steps text-center mb-2"
    }, [_c('b-badge', {
      attrs: {
        "variant": "light"
      }
    }, [_vm._v("Step " + _vm._s(_vm.step_index + 1) + " of " + _vm._s(_vm.steps.length))])], 1), _c(item.element, {
      tag: "component",
      scopedSlots: _vm._u([{
        key: "left",
        fn: function () {
          return [_vm.step_index > 0 ? _c('button', {
            staticClass: "btn btn-outline-primary",
            attrs: {
              "disabled": _vm.step_index == 0
            },
            on: {
              "click": _vm.goToPrevStep
            }
          }, [_vm._v("go back")]) : _c('span')];
        },
        proxy: true
      }, {
        key: "default",
        fn: function () {
          return undefined;
        },
        proxy: true
      }, {
        key: "right",
        fn: function ({
          validation,
          processFunction
        }) {
          return [_c('button', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.step_index < _vm.steps.length - 1,
              expression: "step_index<(steps.length-1)"
            }],
            staticClass: "btn btn-outline-primary",
            attrs: {
              "disabled": validation.$invalid
            },
            on: {
              "click": function ($event) {
                return _vm.goToNextStep(processFunction);
              }
            }
          }, [_vm._v("next")])];
        }
      }], null, true)
    })], 1);
  }), 1)], 1)], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=template&id=00265252&scoped=true&
var FilePreviewvue_type_template_id_00265252_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm.items_proxy && _vm.items_proxy.length > 0 ? _c('b-card', {
    staticClass: "mt-2",
    attrs: {
      "id": "table-container",
      "title": _vm.title
    }
  }, [_c('b-table', {
    attrs: {
      "id": "my-table",
      "items": _vm.items_proxy,
      "small": "",
      "bordered": "",
      "striped": "",
      "hover": "",
      "thClass": "th-head"
    },
    scopedSlots: _vm._u([{
      key: "head()",
      fn: function (data) {
        return [_c('section', [_c('span', {
          staticClass: "d-block small",
          attrs: {
            "title": "REDCap field"
          }
        }, [_c('non-blank-space'), Boolean(_vm.getRedcapField(data.column)) ? _c('b-badge', {
          attrs: {
            "variant": "info"
          }
        }, [_c('span', [_vm._v(_vm._s(_vm.getRedcapField(data.column)))]), _vm.isPrimaryKey(data.column) ? _c('font-awesome-icon', {
          staticClass: "ml-1 text-warning",
          attrs: {
            "icon": "star",
            "title": "primary key",
            "fixed-width": ""
          }
        }) : _vm.isDynamic(data.column) ? _c('font-awesome-icon', {
          staticClass: "ml-1 text-danger",
          attrs: {
            "icon": "level-down-alt",
            "title": "dynamic",
            "fixed-width": ""
          }
        }) : _c('font-awesome-icon', {
          staticClass: "ml-1 text-secondary",
          attrs: {
            "icon": "check-circle",
            "title": "standard",
            "fixed-width": ""
          }
        })], 1) : _vm._e()], 1), _c('span', {
          staticClass: "d-block small",
          attrs: {
            "title": "CSV column"
          }
        }, [_vm._v(_vm._s(data.column))])])];
      }
    }], null, false, 95129129)
  })], 1) : _vm._e()], 1);
};
var FilePreviewvue_type_template_id_00265252_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=script&lang=js&

/* harmony default export */ var FilePreviewvue_type_script_lang_js_ = ({
  data() {
    return {};
  },
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      items: state => state.csv_data.data,
      csvFields: state => state.csv_data.fields,
      total_lines: state => state.csv_data.total_lines,
      counting: state => state.csv_data.counting,
      files: state => state.import_settings.files,
      mapping: state => state.import_settings.mapping,
      dynamic_fields: state => state.import_settings.dynamic_fields
    }),
    title() {
      let title = 'Preview';
      if (this.files && this.files.name) {
        let {
          name = false
        } = this.files;
        if (name) title = `${name} (preview)`;
      }
      return title;
    },
    /**
     * proxy for items.
     * return dummy data if no file is selected
     */
    items_proxy() {
      let files = this.files;
      if (!files) {
        const dummy_items = [...Array(5).keys()].map(() => ({
          'no data': ""
        }));
        return dummy_items;
      }
      return this.items;
    }
  },
  destroyed() {
    this.$store.dispatch('csv_data/stopCounting');
  },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat('en-US', {}).format(number);
    },
    getRedcapField(column_name) {
      const mapping = {
        ...this.mapping
      };
      const index = this.csvFields.indexOf(column_name);
      for (let [fieldName, csvIndexes] of Object.entries(mapping)) {
        if (Object.values(csvIndexes).indexOf(index) >= 0) return fieldName;
      }
      return;
    },
    isDynamic(column_name) {
      const redcapField = this.getRedcapField(column_name);
      if (!redcapField) return false;
      return this.dynamic_fields.indexOf(redcapField) >= 0;
    },
    isPrimaryKey(column_name) {
      const redcapField = this.getRedcapField(column_name);
      if (!redcapField) return false;
      const {
        primary_key
      } = {
        ...this.$store.state.import_settings
      };
      return redcapField == primary_key;
    }
  },
  watch: {
    /* files: {
        immediate: true,
        handler(file) {
            this.$store.dispatch('csv_data/countFileLinesFast', file)
        }
    }, */
  }
});
;// CONCATENATED MODULE: ./src/components/import/FilePreview.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_FilePreviewvue_type_script_lang_js_ = (FilePreviewvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FilePreview.vue?vue&type=style&index=0&id=00265252&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/FilePreview.vue?vue&type=style&index=0&id=00265252&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/import/FilePreview.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  import_FilePreviewvue_type_script_lang_js_,
  FilePreviewvue_type_template_id_00265252_scoped_true_render,
  FilePreviewvue_type_template_id_00265252_scoped_true_staticRenderFns,
  false,
  null,
  "00265252",
  null
  
)

/* harmony default export */ var FilePreview = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/import/Index.vue?vue&type=script&lang=js&

const steps = [{
  element: () => __webpack_require__.e(/* import() */ 300).then(__webpack_require__.bind(__webpack_require__, 300))
}, {
  element: () => Promise.all(/* import() */[__webpack_require__.e(130), __webpack_require__.e(999)]).then(__webpack_require__.bind(__webpack_require__, 8999))
}, {
  element: () => Promise.all(/* import() */[__webpack_require__.e(762), __webpack_require__.e(359)]).then(__webpack_require__.bind(__webpack_require__, 1576))
}, {
  element: () => Promise.all(/* import() */[__webpack_require__.e(529), __webpack_require__.e(828)]).then(__webpack_require__.bind(__webpack_require__, 828))
}, {
  element: () => __webpack_require__.e(/* import() */ 138).then(__webpack_require__.bind(__webpack_require__, 1138))
}, {
  element: () => __webpack_require__.e(/* import() */ 605).then(__webpack_require__.bind(__webpack_require__, 4605))
}, {
  element: () => __webpack_require__.e(/* import() */ 189).then(__webpack_require__.bind(__webpack_require__, 7189))
}, {
  element: () => __webpack_require__.e(/* import() */ 531).then(__webpack_require__.bind(__webpack_require__, 6531))
}];
/* harmony default export */ var Indexvue_type_script_lang_js_ = ({
  components: {
    FilePreview: FilePreview
  },
  data() {
    return {
      step_index: 0,
      steps: steps,
      processing: false
    };
  },
  created() {
    this.step = this.steps[0];
  },
  destroyed() {
    this.$store.dispatch('import_settings/reset');
    this.$store.dispatch('csv_data/reset');
  },
  methods: {
    goToPrevStep() {
      let index = this.step_index;
      if (--index <= 0) index = 0;
      this.step_index = index;
    },
    async goToNextStep(processFunction) {
      if (processFunction && typeof processFunction == 'function') {
        const result = await processFunction();
        if (!result) throw new Error('error going to next step');
      }
      let index = this.step_index;
      if (++index >= this.steps.length) index = this.steps.length - 1;
      this.step_index = index;
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/import/Index.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_Indexvue_type_script_lang_js_ = (Indexvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/import/Index.vue?vue&type=style&index=0&id=24c7e0bd&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/pages/import/Index.vue?vue&type=style&index=0&id=24c7e0bd&prod&scoped=true&lang=css&

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

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.646.js.map