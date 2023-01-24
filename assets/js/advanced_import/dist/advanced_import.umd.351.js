"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[351],{

/***/ 8059:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ LogsTable; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/LogsTable.vue?vue&type=template&id=d102da56&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "overflow-auto"
  }, [_c('div', {
    staticClass: "d-flex flex-row justify-content-start align-items-start"
  }, [_c('b-button', {
    attrs: {
      "size": "sm",
      "variant": "info",
      "disabled": _vm.loading
    },
    on: {
      "click": _vm.getLogs
    }
  }, [_vm.loading ? _c('font-awesome-icon', {
    attrs: {
      "icon": "spinner",
      "spin": ""
    }
  }) : _c('font-awesome-icon', {
    attrs: {
      "icon": "sync"
    }
  }), _c('span', [_vm._v(" Reload")])], 1), _vm.hasItems ? _c('b-button', {
    directives: [{
      name: "b-modal",
      rawName: "v-b-modal.modal-delete",
      modifiers: {
        "modal-delete": true
      }
    }],
    staticClass: "ml-2",
    attrs: {
      "size": "sm",
      "variant": "danger",
      "disabled": _vm.loading
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "trash"
    }
  }), _c('span', [_vm._v(" Delete logs")])], 1) : _vm._e(), _c('b-modal', {
    attrs: {
      "id": "modal-delete",
      "title": "Delete logs"
    },
    on: {
      "ok": _vm.handleOkDelete
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("Are you sure you want to delete all logs for the current project?")])]), _vm.hasItems ? _c('b-pagination', {
    staticClass: "ml-2",
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.per_page,
      "aria-controls": "my-table",
      "size": "sm"
    },
    model: {
      value: _vm.current_page,
      callback: function ($$v) {
        _vm.current_page = $$v;
      },
      expression: "current_page"
    }
  }) : _vm._e()], 1), _c('b-table', {
    staticClass: "my-2",
    attrs: {
      "id": "my-table",
      "items": _vm.items_proxy,
      "_per-page": "per_page",
      "_current-page": "current_page",
      "small": "",
      "bordered": "",
      "striped": "",
      "hover": ""
    }
  }), _vm.hasItems ? _c('b-pagination', {
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.per_page,
      "aria-controls": "my-table",
      "size": "sm"
    },
    model: {
      value: _vm.current_page,
      callback: function ($$v) {
        _vm.current_page = $$v;
      },
      expression: "current_page"
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/LogsTable.vue?vue&type=script&lang=js&


/* harmony default export */ var LogsTablevue_type_script_lang_js_ = ({
  data() {
    return {
      per_page: 20,
      current_page: 1,
      loading: false
    };
  },
  async created() {},
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      items: state => state.logs.list
    }),
    items_proxy() {
      const items = [...this.items];
      let per_page = this.per_page;
      let remainder = this.current_page * per_page - items.length;
      if (remainder < 0) remainder = 0;
      const empty_value = "";
      let placeholder = {
        'no logs': empty_value
      };
      if (items.length > 0) {
        placeholder = {};
        let first_item = items[0];
        for (let key of Object.keys(first_item)) {
          placeholder[key] = empty_value;
        }
      }
      for (let i = 0; i < remainder; i++) items.push(placeholder);
      return items;
    },
    rows() {
      const total = this.$store.getters['logs/total'];
      return total || this.items.length;
    },
    hasItems() {
      try {
        return this.items.length > 0;
      } catch (error) {
        return false;
      }
    }
  },
  watch: {
    current_page: {
      immediate: true,
      handler() {
        this.getLogs();
      }
    }
  },
  methods: {
    async getLogs() {
      try {
        this.loading = true;
        const limit = this.per_page;
        const start = this.per_page * (this.current_page - 1);
        const response = await this.$API.dispatch('logs/get', {
          start,
          limit
        });
        const {
          data = {}
        } = response;
        const {
          data: list = {},
          metadata = {}
        } = data;
        await this.$store.dispatch('logs/setState', {
          list,
          metadata
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async handleOkDelete() {
      const response = await this.$API.dispatch('logs/delete');
      console.log(response);
      this.getLogs();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LogsTablevue_type_script_lang_js_ = (LogsTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/LogsTable.vue?vue&type=style&index=0&id=d102da56&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/LogsTable.vue?vue&type=style&index=0&id=d102da56&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/LogsTable.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_LogsTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d102da56",
  null
  
)

/* harmony default export */ var LogsTable = (component.exports);

/***/ }),

/***/ 4351:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Logs; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Logs.vue?vue&type=template&id=2ca240f8&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('p', [_vm._v("Check the logs for errors or warnings.")]), _c('LogsTable')], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/LogsTable.vue + 5 modules
var LogsTable = __webpack_require__(8059);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Logs.vue?vue&type=script&lang=js&

/* harmony default export */ var Logsvue_type_script_lang_js_ = ({
  components: {
    LogsTable: LogsTable/* default */.Z
  },
  computed: {}
});
;// CONCATENATED MODULE: ./src/pages/Logs.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Logsvue_type_script_lang_js_ = (Logsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/pages/Logs.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  pages_Logsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2ca240f8",
  null
  
)

/* harmony default export */ var Logs = (component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.351.js.map