"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[317],{

/***/ 1656:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ MapFields; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/MapFields.vue?vue&type=template&id=524a07fe&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('p', [_vm._v("The wizard guessed the mapping for you but you can adjust the mapping as needed and select the dynamic fields.")]), _c('table', {
    staticClass: "table table-striped table-bordered"
  }, [_c('thead', [_c('tr', [_c('th', {
    staticClass: "text-nowrap"
  }, [_vm._v("Dynamic "), _c('b-button', {
    directives: [{
      name: "b-modal",
      rawName: "v-b-modal.modal-dynamic-fields",
      modifiers: {
        "modal-dynamic-fields": true
      }
    }],
    attrs: {
      "size": "sm",
      "variant": "outline-info"
    }
  }, [_c('font-awesome-icon', {
    staticClass: "icon",
    attrs: {
      "icon": ['fas', 'question-circle']
    }
  })], 1)], 1), _c('th', [_vm._v("Destination Field (REDCap)")]), _c('th', [_vm._v("Source Field (CSV file)")])])]), _c('tbody', _vm._l(_vm.form_fields, function (form_field, index) {
    return _c('tr', {
      key: index
    }, [_c('td', {
      staticClass: "min text-right"
    }, [form_field.field_name !== _vm.primary_key ? _c('b-form-checkbox', {
      attrs: {
        "disabled": !_vm.hasMapping(form_field.field_name),
        "checked": _vm.isDynamic(form_field.field_name),
        "switch": ""
      },
      on: {
        "input": function ($event) {
          return _vm.onDynamicToggle(form_field.field_name, $event);
        }
      }
    }) : _vm._e()], 1), _c('td', [_c('span', {
      staticClass: "d-flex flex-row align-items-center"
    }, [_c('span', {
      staticClass: "font-weight-bold"
    }, [_vm._v(_vm._s(form_field.field_name))]), form_field.field_name === _vm.primary_key ? _c('font-awesome-icon', {
      staticClass: "icon text-warning ml-1",
      attrs: {
        "title": "primary key",
        "icon": ['fas', 'star']
      }
    }) : _vm._e()], 1), _c('span', {
      staticClass: "small",
      domProps: {
        "innerHTML": _vm._s(form_field.element_label)
      }
    })]), _c('td', [form_field.element_type == 'checkbox' ? [_c('CsvFieldsDropDown', {
      attrs: {
        "redcapFieldName": form_field.field_name,
        "redcapFieldType": form_field.element_type
      }
    })] : [_c('CsvFieldsSingleSelect', {
      attrs: {
        "redcapFieldName": form_field.field_name
      }
    })]], 2)]);
  }), 0)]), _c('b-modal', {
    attrs: {
      "id": "modal-dynamic-fields",
      "title": "Dynamic fields",
      "ok-only": ""
    }
  }, [_c('div', {
    staticClass: "my-4"
  }, [_c('p', [_vm._v("Mark as \"dynamic\" the fields that are not relevant in determining the uniqueness of an entry (i.e. can be different compared to existing data).")]), _c('p', [_vm._v("If you are importing \"medications\" in a repeated form, for example, you may want to mark the \"status\" field as dynamic since it could have changed since the previous import.")]), _c('p', [_vm._v("Dynamic fields will be ignored when the wizard will try to determine the uniqueness of a row.")])])]), _c('p', [_vm._v("Remember to map the primary key to proceed.")]), _c('div', {
    staticClass: "buttons d-flex flex-row justify-content-between"
  }, [_vm._t("left"), _vm._t("default"), _vm._t("right", null, {
    "validation": _vm.$v
  })], 2)], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=template&id=0c8532ff&scoped=true&
var CsvFieldsDropDownvue_type_template_id_0c8532ff_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('b-container', _vm._l(_vm.checkboxOptions, function (option, index) {
    return _c('b-row', {
      key: index,
      staticClass: "d-flex flex-column option"
    }, [_c('b-col', {
      staticClass: "small"
    }, [_c('span', [_vm._v("[" + _vm._s(index) + "]:")]), _c('span', {
      staticClass: "ml-1"
    }, [_vm._v(_vm._s(option))])]), _c('b-col', {}, [_c('CsvFieldsSingleSelect', {
      attrs: {
        "redcapFieldName": _vm.redcapFieldName,
        "fieldIndex": index
      }
    })], 1)], 1);
  }), 1);
};
var CsvFieldsDropDownvue_type_template_id_0c8532ff_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsSingleSelect.vue?vue&type=template&id=275dd28e&scoped=true&
var CsvFieldsSingleSelectvue_type_template_id_275dd28e_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-dropdown', {
    staticClass: "w-100",
    attrs: {
      "text": "Dropdown Button",
      "variant": _vm.hasMapping ? 'success' : 'outline-primary',
      "lazy": ""
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function () {
        return [_c('span', [_vm._v(_vm._s(_vm.selectedText))])];
      },
      proxy: true
    }])
  }, [_c('b-dropdown-item', {
    attrs: {
      "active": _vm.skip
    },
    on: {
      "click": function ($event) {
        return _vm.onChange(null);
      }
    }
  }, [_vm._v("-- skip --")]), _vm._l(_vm.csv_fields, function (field, index) {
    return _c('b-dropdown-item', {
      key: index,
      attrs: {
        "disabled": !_vm.isMapped(index) && _vm.isMappedElsewhere(index),
        "active": _vm.isMapped(index)
      },
      on: {
        "click": function ($event) {
          return _vm.onChange(index);
        }
      }
    }, [_c('span', [_vm._v(_vm._s(field))])]);
  })], 2)], 1);
};
var CsvFieldsSingleSelectvue_type_template_id_275dd28e_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsSingleSelect.vue?vue&type=script&lang=js&


/* harmony default export */ var CsvFieldsSingleSelectvue_type_script_lang_js_ = ({
  data() {
    return {};
  },
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      csv_fields: state => state.csv_data.fields,
      mapping: state => state.import_settings.mapping
    }),
    options() {
      const fields = this.csv_fields;
      const options = [];
      const skipOption = {
        value: null,
        text: '-- skip --'
      };
      options.push(skipOption);
      for (let index in fields) {
        const option = {
          value: index,
          text: fields[index]
        };
        options.push(option);
      }
      return options;
    },
    csvIndexes() {
      return this.$store.getters['import_settings/mappedCsvFields'](this.redcapFieldName);
    },
    selectedText() {
      const skipText = '--- skip ---';
      const csvIndexes = this.csvIndexes;
      if (csvIndexes.length < 1) return skipText;
      const csvIndex = csvIndexes[this.fieldIndex];
      if (!Number.isInteger(csvIndex)) return skipText;
      return this.csv_fields[csvIndex];
    },
    skip() {
      if (!Array.isArray(this.csvIndexes)) return true;
      return !Number.isInteger(this.csvIndexes[this.fieldIndex]);
    },
    hasMapping() {
      return Number.isInteger(this.csvIndexes[this.fieldIndex]);
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
    isMappedElsewhere(csvIndex) {
      const mapping = {
        ...this.mapping
      };
      for (let [redcapField, csvIndexes = {}] of Object.entries(mapping)) {
        if (redcapField == this.redcapFieldName) {
          let otherIndexes = Object.values(csvIndexes).filter((value, index) => index != csvIndex);
          if (otherIndexes.indexOf(csvIndex) >= 0) return true;
        } else if (Object.values(csvIndexes).indexOf(csvIndex) >= 0) return true;
      }
      return false;
    },
    /**
     * check if a REDCap field has a specific CSV column assigned
     */
    isMapped(csvIndex) {
      return this.csvIndexes[this.fieldIndex] == csvIndex;
    },
    onChange(value) {
      const fieldName = this.redcapFieldName;
      const csvIndex = value;
      const fieldIndex = this.fieldIndex;
      this.$store.dispatch('import_settings/setFieldMapping', {
        fieldName,
        csvIndex,
        fieldIndex
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
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=script&lang=js&

/* harmony default export */ var CsvFieldsDropDownvue_type_script_lang_js_ = ({
  components: {
    CsvFieldsSingleSelect: CsvFieldsSingleSelect
  },
  computed: {
    checkboxOptions() {
      const options = this.$store.getters['settings/checkboxFieldOptions'](this.redcapFieldName);
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
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/CsvFieldsDropDown.vue?vue&type=style&index=0&id=0c8532ff&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/CsvFieldsDropDown.vue?vue&type=style&index=0&id=0c8532ff&prod&scoped=true&lang=css&

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
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/MapFields.vue?vue&type=script&lang=js&




/* harmony default export */ var MapFieldsvue_type_script_lang_js_ = ({
  components: {
    CsvFieldsDropDown: CsvFieldsDropDown,
    CsvFieldsSingleSelect: CsvFieldsSingleSelect
  },
  data() {
    return {};
  },
  computed: {
    ...(0,vuex_esm/* mapState */.rn)({
      csv_fields: state => state.csv_data.fields,
      // mappingList: state => state.import_settings.mappingList,
      primary_key: state => state.import_settings.primary_key,
      mapping: state => state.import_settings.mapping,
      dynamic_fields: state => state.import_settings.dynamic_fields
    }),
    form_fields() {
      const {
        form_name
      } = this.$store.state.import_settings;
      const primaryKey = this.primary_key;
      const fields = this.$store.getters['settings/mappable_fields'](form_name, primaryKey);
      return fields;
    }
  },
  methods: {
    onDynamicToggle(field, checked) {
      this.$store.dispatch('import_settings/toggleDynamicField', {
        field,
        checked
      });
    },
    /**
     * check if a REDCap field has at least a CSV column associated
     */
    hasMapping(redcapField) {
      const csvFields = this.$store.getters['import_settings/mappedCsvFields'](redcapField);
      return Object.values(csvFields).length > 0;
    },
    isDynamic(redcapField) {
      return this.dynamic_fields.indexOf(redcapField) >= 0;
    }
  },
  validations() {
    const getMappedFields = list => {
      const mappedFields = [];
      for (let [fieldName, indexes = {}] of Object.entries(list)) {
        if (Object.values(indexes).length > 0) mappedFields.push(fieldName);
      }
      return mappedFields;
    };
    return {
      mapping: {
        required(list) {
          const mappedFields = getMappedFields(list);
          return mappedFields.length > 0;
        },
        primaryKeyIsMapped(list) {
          const mappedFields = getMappedFields(list);
          const primary_key = this.primary_key;
          return mappedFields.includes(primary_key);
        }
      }
    };
  }
});
;// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_MapFieldsvue_type_script_lang_js_ = (MapFieldsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/MapFields.vue?vue&type=style&index=0&id=524a07fe&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/MapFields.vue?vue&type=style&index=0&id=524a07fe&prod&scoped=true&lang=css&

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

/***/ })

}]);
//# sourceMappingURL=advanced_import.common.317.js.map