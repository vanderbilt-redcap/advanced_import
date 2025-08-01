"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[842],{

/***/ 9762:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ MainLayout; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=7e338910&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('section', {
    staticClass: "layout"
  }, [_c('div', {
    staticClass: "page-wrapper"
  }, [_c('Menu'), _c('transition', {
    attrs: {
      "name": "fade",
      "appear": ""
    }
  }, [_c('router-view')], 1)], 1)]);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Menu.vue?vue&type=template&id=5ed14ebe&scoped=true&
var Menuvue_type_template_id_5ed14ebe_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "mb-2 menu-wrapper"
  }, [_c('router-link', {
    attrs: {
      "to": {
        name: 'home'
      },
      "exact": ""
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "home"
    }
  }), _c('span', [_vm._v(" Dashboard")])], 1), _c('router-link', {
    attrs: {
      "to": {
        name: 'import'
      }
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "file-import"
    }
  }), _c('span', [_vm._v(" Import")])], 1), _c('router-link', {
    attrs: {
      "to": {
        name: 'export'
      }
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "file-export"
    }
  }), _c('span', [_vm._v(" Export")])], 1), _c('router-link', {
    attrs: {
      "to": {
        name: 'logs'
      }
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "clipboard-list"
    }
  }), _c('span', [_vm._v(" Logs")])], 1), _c('router-link', {
    attrs: {
      "to": {
        name: 'jobs'
      }
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "tasks"
    }
  }), _c('span', [_vm._v(" Jobs")])], 1), _c('a', {
    attrs: {
      "href": _vm.project_dashboard_url
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "th"
    }
  }), _c('span', [_vm._v(" Record status dashboard")])], 1)], 1);
};
var Menuvue_type_template_id_5ed14ebe_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Menu.vue?vue&type=script&lang=js&

/* harmony default export */ var Menuvue_type_script_lang_js_ = ({
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      project_id: state => state.settings.project_id,
      project_dashboard_url: state => state.settings.project_dashboard_url
    })
  }
});
;// CONCATENATED MODULE: ./src/components/Menu.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Menuvue_type_script_lang_js_ = (Menuvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Menu.vue?vue&type=style&index=0&id=5ed14ebe&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Menu.vue?vue&type=style&index=0&id=5ed14ebe&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/Menu.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_Menuvue_type_script_lang_js_,
  Menuvue_type_template_id_5ed14ebe_scoped_true_render,
  Menuvue_type_template_id_5ed14ebe_scoped_true_staticRenderFns,
  false,
  null,
  "5ed14ebe",
  null
  
)

/* harmony default export */ var Menu = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=script&lang=js&

/* harmony default export */ var MainLayoutvue_type_script_lang_js_ = ({
  components: {
    Menu: Menu
  }
});
;// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_MainLayoutvue_type_script_lang_js_ = (MainLayoutvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=style&index=0&id=7e338910&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=style&index=0&id=7e338910&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/layouts/MainLayout.vue



;


/* normalize component */

var MainLayout_component = (0,componentNormalizer/* default */.Z)(
  layouts_MainLayoutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7e338910",
  null
  
)

/* harmony default export */ var MainLayout = (MainLayout_component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.842.js.map