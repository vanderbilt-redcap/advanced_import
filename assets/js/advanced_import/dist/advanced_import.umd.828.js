((typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackChunkadvanced_import"] || []).push([[828],{

/***/ 7008:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ FormatOptions; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FormatOptions.vue?vue&type=template&id=7c675e5d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"field_name_row"}},[_c('span',[_vm._v("Dates Format ")]),_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-datetime-formats",modifiers:{"modal-datetime-formats":true}}],attrs:{"size":"sm","variant":"outline-info"}},[_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":['fas', 'question-circle']}})],1)],1),_c('b-input-group',{scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('DateHelper',{staticClass:"date-helper",on:{"dateDetected":function ($event){ return _vm.dates_format=$event; }}})]},proxy:true}])},[_c('b-form-input',{attrs:{"id":"dates_format"},model:{value:(_vm.dates_format),callback:function ($$v) {_vm.dates_format=$$v},expression:"dates_format"}})],1)],1),_c('b-modal',{attrs:{"size":"xl","id":"modal-datetime-formats","title":"Date/time formats","ok-only":""}},[_c('div',{staticClass:"my-4"},[_c('p',[_vm._v("The following characters are recognized by the date parser.")]),_c('DateFormatsTable')],1)]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v})],2)],1)}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateFormatsTable.vue?vue&type=template&id=aab527cc&
var DateFormatsTablevue_type_template_id_aab527cc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table table-striped table-bordered"},[_vm._m(0),_c('tbody',_vm._l((_vm.formats),function(format,index){return _c('tr',{key:index},[_c('td',[_vm._v(_vm._s(format.format))]),_c('td',[_vm._v(_vm._s(format.description))]),_c('td',[_vm._v(_vm._s(format.example))])])}),0)])}
var DateFormatsTablevue_type_template_id_aab527cc_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Format/character")]),_c('th',[_vm._v("Description")]),_c('th',[_vm._v("Example")])])])}]


;// CONCATENATED MODULE: ./src/components/DateFormatsTable.vue?vue&type=template&id=aab527cc&

;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DateFormatsTable.vue?vue&type=script&lang=js&
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
var formats = [{
  format: "Day",
  description: "---",
  example: "---"
}, {
  format: "d",
  description: "Day of the month, 2 digits with leading zeros",
  example: "01 to 31"
}, {
  format: "D",
  description: "A textual representation of a day, three letters",
  example: "Mon through Sun"
}, {
  format: "j",
  description: "Day of the month without leading zeros",
  example: "1 to 31"
}, {
  format: "l (lowercase 'L')",
  description: "A full textual representation of the day of the week",
  example: "Sunday through Saturday"
}, {
  format: "N",
  description: "ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)",
  example: "1 (for Monday) through 7 (for Sunday)"
}, {
  format: "S",
  description: "English ordinal suffix for the day of the month, 2 characters",
  example: "st, nd, rd or th. Works well with j"
}, {
  format: "w",
  description: "Numeric representation of the day of the week",
  example: "0 (for Sunday) through 6 (for Saturday)"
}, {
  format: "z",
  description: "The day of the year (starting from 0)",
  example: "0 through 365"
}, {
  format: "Week",
  description: "---",
  example: "---"
}, {
  format: "W",
  description: "ISO-8601 week number of year, weeks starting on Monday",
  example: "Example: 42 (the 42nd week in the year)"
}, {
  format: "Month",
  description: "---",
  example: "---"
}, {
  format: "F",
  description: "A full textual representation of a month, such as January or March",
  example: "January through December"
}, {
  format: "m",
  description: "Numeric representation of a month, with leading zeros",
  example: "01 through 12"
}, {
  format: "M",
  description: "A short textual representation of a month, three letters",
  example: "Jan through Dec"
}, {
  format: "n",
  description: "Numeric representation of a month, without leading zeros",
  example: "1 through 12"
}, {
  format: "t",
  description: "Number of days in the given month",
  example: "28 through 31"
}, {
  format: "Year",
  description: "---",
  example: "---"
}, {
  format: "L",
  description: "Whether it's a leap year",
  example: "1 if it is a leap year, 0 otherwise."
}, {
  format: "o",
  description: "ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)",
  example: "Examples: 1999 or 2003"
}, {
  format: "Y",
  description: "A full numeric representation of a year, 4 digits",
  example: "Examples: 1999 or 2003"
}, {
  format: "y",
  description: "A two digit representation of a year",
  example: "Examples: 99 or 03"
}, {
  format: "Time",
  description: "---",
  example: "---"
}, {
  format: "a",
  description: "Lowercase Ante meridiem and Post meridiem",
  example: "am or pm"
}, {
  format: "A",
  description: "Uppercase Ante meridiem and Post meridiem",
  example: "AM or PM"
}, {
  format: "B",
  description: "Swatch Internet time",
  example: "000 through 999"
}, {
  format: "g",
  description: "12-hour format of an hour without leading zeros",
  example: "1 through 12"
}, {
  format: "G",
  description: "24-hour format of an hour without leading zeros",
  example: "0 through 23"
}, {
  format: "h",
  description: "12-hour format of an hour with leading zeros",
  example: "01 through 12"
}, {
  format: "H",
  description: "24-hour format of an hour with leading zeros",
  example: "00 through 23"
}, {
  format: "i",
  description: "Minutes with leading zeros",
  example: "00 to 59"
}, {
  format: "s",
  description: "Seconds with leading zeros",
  example: "00 through 59"
}, {
  format: "u",
  description: "Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds if DateTime was created with microseconds.",
  example: "Example: 654321"
}, {
  format: "v",
  description: "Milliseconds (added in PHP 7.0.0). Same note applies as for u.",
  example: "Example: 654"
}, {
  format: "Timezone",
  description: "---",
  example: "---"
}, {
  format: "e",
  description: "Timezone identifier (added in PHP 5.1.0)",
  example: "Examples: UTC, GMT, Atlantic/Azores"
}, {
  format: "I (capital i)",
  description: "Whether or not the date is in daylight saving time",
  example: "1 if Daylight Saving Time, 0 otherwise."
}, {
  format: "O",
  description: "Difference to Greenwich time (GMT) without colon between hours and minutes",
  example: "Example: +0200"
}, {
  format: "P",
  description: "Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)",
  example: "Example: +02:00"
}, {
  format: "T",
  description: "Timezone abbreviation",
  example: "Examples: EST, MDT ..."
}, {
  format: "Z",
  description: "Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.",
  example: "-43200 through 50400"
}, {
  format: "Full Date/Time",
  description: "---",
  example: "---"
}, {
  format: "c",
  description: "ISO 8601 date (added in PHP 5)",
  example: "2004-02-12T15:19:21+00:00"
}, {
  format: "r",
  description: "» RFC 2822 formatted date",
  example: "Example: Thu, 21 Dec 2000 16:01:07 +0200"
}, {
  format: "U",
  description: "Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)",
  example: "336421800"
}];
/* harmony default export */ var DateFormatsTablevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      formats: formats
    };
  }
});
;// CONCATENATED MODULE: ./src/components/DateFormatsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DateFormatsTablevue_type_script_lang_js_ = (DateFormatsTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3736);
;// CONCATENATED MODULE: ./src/components/DateFormatsTable.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  components_DateFormatsTablevue_type_script_lang_js_,
  DateFormatsTablevue_type_template_id_aab527cc_render,
  DateFormatsTablevue_type_template_id_aab527cc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DateFormatsTable = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9c96ad4-vue-loader-template"}!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/DateHelper.vue?vue&type=template&id=77bf9938&
var DateHelpervue_type_template_id_77bf9938_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-dropdown',{attrs:{"id":"dropdown-text","text":"Auto detect","variant":"info"},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('font-awesome-icon',{staticClass:"mr-2",attrs:{"icon":['fas', 'cogs'],"fixed-width":""}}),_c('span',[_vm._v("Auto detect")])]},proxy:true}])},[_c('b-dropdown-text',{staticStyle:{"width":"240px"}},[_vm._v(" Select a field that contains dates to start the auto-detection process ")]),_c('b-dropdown-divider'),_vm._l((_vm.csv_fields),function(field,index){return _c('b-dropdown-item-button',{key:index,attrs:{"active":field==_vm.selected},on:{"click":function($event){return _vm.detectDate(field)}}},[_vm._v(_vm._s(field))])})],2),_c('b-modal',{ref:"modal-date-detected",attrs:{"title":"Date detected","hide-footer":"","centered":""}},[_c('span',{staticClass:"d-block"},[_vm._v("The format '"),_c('b',[_vm._v(_vm._s(_vm.detectedFormat))]),_vm._v("' has been detected.")]),_c('span',{staticClass:"d-block"},[_vm._v("Click \"ok\" if you want to use this format.")]),_c('span',{staticClass:"d-block font-italic mt-2"},[_vm._v("Please double check the \"dates format\" reference for any doubt.")]),_c('div',{staticClass:"d-flex justify-content-end mt-2"},[_c('b-button',{on:{"click":function($event){return _vm.$refs['modal-date-detected'].hide()}}},[_vm._v("Cancel")]),_c('b-button',{staticClass:"ml-2",attrs:{"variant":"primary"},on:{"click":_vm.useDetectedFormat}},[_vm._v("Ok")])],1)])],1)}
var DateHelpervue_type_template_id_77bf9938_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(1531);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(7810);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8327);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.freeze.js
var es_object_freeze = __webpack_require__(3371);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(9720);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(381);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(629);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/DateHelper.vue?vue&type=script&lang=js&






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


var commonDateFormats = Object.freeze({
  ATOM: {
    js_format: 'YYYY-MM-DDTHH:mm',
    php_format: 'Y-m-d\\TH:i:sP' // 2005-08-15T15:52:01+00:00

  },
  COOKIE: {
    js_format: 'dddd, DD-MMM-YYYY HH:mm:ss T',
    php_format: 'l, d-M-y H:i:s T' // Monday, 15-Aug-2005 15:52:01 UTC

  },
  ISO8601: {
    js_format: 'YYYY-MM-DDTHH:mm:ssZ',
    php_format: 'Y-m-d\\TH:i:sO' // 2005-08-15T15:52:01+0000

  },
  RFC822: {
    js_format: 'ddd, DD MMM YY HH:mm:ss Z',
    php_format: 'D, d M y H:i:s O' // Mon, 15 Aug 05 15:52:01 +0000

  },
  RFC850: {
    js_format: 'dddd, DD-MMM-YY HH:mm:ss T',
    php_format: 'l, d-M-y H:i:s T' // Monday, 15-Aug-05 15:52:01 UTC

  },
  RFC1036: {
    js_format: 'ddd, DD MMM YY HH:mm:ss Z',
    php_format: 'D, d M y H:i:s O' // Mon, 15 Aug 05 15:52:01 +0000

  },
  RFC1123: {
    js_format: 'ddd, DD MMM YYYY HH:mm:ss Z',
    php_format: 'D, d M Y H:i:s O' // Mon, 15 Aug 2005 15:52:01 +0000

  },
  RFC2822: {
    js_format: 'ddd, DD MMM YYYY HH:mm:ss Z',
    php_format: 'D, d M Y H:i:s O' // Mon, 15 Aug 2005 15:52:01 +0000

  },
  RSS: {
    js_format: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
    php_format: 'D, d M Y H:i:s O' // Mon, 15 Aug 2005 15:52:01 +0000

  },
  W3C: {
    js_format: 'YYYY-MM-DDTHH:mm:ssZZ',
    php_format: 'Y-m-d\\TH:i:sP' // 2005-08-15T15:52:01+00:00

  },
  // non standard
  NO_TZ_MYSQL: {
    js_format: 'YYYY-MM-DD HH:mm:ss',
    php_format: 'Y-m-d H:i:s' // 2005-08-15 15:52:01

  },
  NO_TZ_NO_SECS: {
    js_format: 'YYYY-MM-DD HH:mm',
    php_format: 'Y-m-d H:i' // 2005-08-15 15:52

  },
  NO_TIME: {
    js_format: 'YYYY-MM-DD',
    php_format: 'Y-m-d' // 2005-08-15

  },
  US_DATE_SHORT: {
    js_format: 'MM-DD-YY HH:mm',
    php_format: 'm-d-y H:i' // 08-15-20

  },
  NO_TIME_US_DATE_SHORT: {
    js_format: 'MM-DD-YY',
    php_format: 'm-d-y' // 08-15-20

  },
  US_DATE_SHORT_SLASH: {
    js_format: 'MM/DD/YY HH:mm',
    php_format: 'm/d/y H:i' // 08/15/20

  },
  NO_TIME_US_DATE_SHORT_SLASH: {
    js_format: 'MM/DD/YY',
    php_format: 'm/d/y' // 08/15/20

  },
  SAMMC: {
    js_format: 'M/D/YYYY H:mm',
    php_format: 'n/j/Y G:i' // 8/1/2020 7:02

  }
});

var detectFormat = function detectFormat(date) {
  for (var _i = 0, _Object$entries = Object.entries(commonDateFormats); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
        name = _Object$entries$_i[0],
        _Object$entries$_i$ = _Object$entries$_i[1],
        js_format = _Object$entries$_i$.js_format,
        php_format = _Object$entries$_i$.php_format;

    var momentDate = moment_default()(date, js_format, true);

    if (momentDate.isValid()) {
      return {
        name: name,
        format: php_format
      };
    }
  }

  return false;
};

/* harmony default export */ var DateHelpervue_type_script_lang_js_ = ({
  data: function data() {
    return {
      selected: null,
      detectedFormat: null
    };
  },
  computed: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, (0,vuex_esm/* mapState */.rn)({
    csv_fields: function csv_fields(state) {
      return state.csv_data.fields;
    },
    csv_lines: function csv_lines(state) {
      return state.csv_data.lines;
    },
    csv_data: function csv_data(state) {
      return state.csv_data.data;
    }
  })), {}, {
    options: function options() {
      return [{
        value: null,
        text: 'Please select an option'
      }].concat((0,toConsumableArray/* default */.Z)(this.csv_fields));
    }
  }),
  methods: {
    useDetectedFormat: function useDetectedFormat() {
      this.$emit('dateDetected', this.detectedFormat);
      var modal = this.$refs['modal-date-detected'];
      if (modal) modal.hide();
    },
    detectDate: function detectDate(field) {
      this.selected = field;
      this.detectedFormat = null;
      var detectedFormat = null;
      var counter = {};
      var minSamples = 20;
      var totalSamples = Math.min(minSamples, this.csv_data.length);

      for (var i = 0; i < totalSamples; i++) {
        var lastDetectedCount = counter[detectedFormat] || 0;
        var date = this.csv_data[i][field];

        var _detectFormat = detectFormat(date),
            format = _detectFormat.format;

        if (!format) continue;
        var formatCount = counter[format] || 0;
        counter[format] = ++formatCount;

        if (format != detectedFormat && lastDetectedCount < formatCount) {
          lastDetectedCount = formatCount;
          detectedFormat = format;
        }
      }

      this.detectedFormat = detectedFormat || false;

      if (this.detectedFormat == false) {
        this.$bvModal.msgBoxOk('Please select another field or use the "dates format" reference.', {
          title: 'No valid date detected',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'secondary',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        });
      } else {
        var modal = this.$refs['modal-date-detected'];
        if (modal) modal.show();
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/import/DateHelper.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_DateHelpervue_type_script_lang_js_ = (DateHelpervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/import/DateHelper.vue





/* normalize component */
;
var DateHelper_component = (0,componentNormalizer/* default */.Z)(
  import_DateHelpervue_type_script_lang_js_,
  DateHelpervue_type_template_id_77bf9938_render,
  DateHelpervue_type_template_id_77bf9938_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DateHelper = (DateHelper_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-80[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FormatOptions.vue?vue&type=script&lang=js&
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


/* harmony default export */ var FormatOptionsvue_type_script_lang_js_ = ({
  components: {
    DateFormatsTable: DateFormatsTable,
    DateHelper: DateHelper
  },
  computed: {
    dates_format: {
      get: function get() {
        return this.$store.state.import_settings.dates_format;
      },
      set: function set(value) {
        this.$store.dispatch('import_settings/setStateProperty', {
          key: 'dates_format',
          value: value
        });
      }
    }
  },
  validations: {}
});
;// CONCATENATED MODULE: ./src/components/import/FormatOptions.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_FormatOptionsvue_type_script_lang_js_ = (FormatOptionsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-52[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/css-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[1]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/@vue/cli-service/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-52[0].rules[0].use[2]!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ruleSet[0].rules[0].use[0]!./node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/import/FormatOptions.vue?vue&type=style&index=0&id=7c675e5d&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/import/FormatOptions.vue?vue&type=style&index=0&id=7c675e5d&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/import/FormatOptions.vue



;


/* normalize component */

var FormatOptions_component = (0,componentNormalizer/* default */.Z)(
  import_FormatOptionsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7c675e5d",
  null
  
)

/* harmony default export */ var FormatOptions = (FormatOptions_component.exports);

/***/ }),

/***/ 6700:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./af": 2786,
	"./af.js": 2786,
	"./ar": 867,
	"./ar-dz": 4130,
	"./ar-dz.js": 4130,
	"./ar-kw": 6737,
	"./ar-kw.js": 6737,
	"./ar-ly": 6440,
	"./ar-ly.js": 6440,
	"./ar-ma": 7702,
	"./ar-ma.js": 7702,
	"./ar-sa": 6040,
	"./ar-sa.js": 6040,
	"./ar-tn": 7100,
	"./ar-tn.js": 7100,
	"./ar.js": 867,
	"./az": 1083,
	"./az.js": 1083,
	"./be": 9808,
	"./be.js": 9808,
	"./bg": 8338,
	"./bg.js": 8338,
	"./bm": 7438,
	"./bm.js": 7438,
	"./bn": 8905,
	"./bn-bd": 6225,
	"./bn-bd.js": 6225,
	"./bn.js": 8905,
	"./bo": 1560,
	"./bo.js": 1560,
	"./br": 1278,
	"./br.js": 1278,
	"./bs": 622,
	"./bs.js": 622,
	"./ca": 2468,
	"./ca.js": 2468,
	"./cs": 5822,
	"./cs.js": 5822,
	"./cv": 877,
	"./cv.js": 877,
	"./cy": 7373,
	"./cy.js": 7373,
	"./da": 4780,
	"./da.js": 4780,
	"./de": 9740,
	"./de-at": 217,
	"./de-at.js": 217,
	"./de-ch": 894,
	"./de-ch.js": 894,
	"./de.js": 9740,
	"./dv": 5300,
	"./dv.js": 5300,
	"./el": 837,
	"./el.js": 837,
	"./en-au": 8348,
	"./en-au.js": 8348,
	"./en-ca": 7925,
	"./en-ca.js": 7925,
	"./en-gb": 2243,
	"./en-gb.js": 2243,
	"./en-ie": 6436,
	"./en-ie.js": 6436,
	"./en-il": 7207,
	"./en-il.js": 7207,
	"./en-in": 4175,
	"./en-in.js": 4175,
	"./en-nz": 6319,
	"./en-nz.js": 6319,
	"./en-sg": 1662,
	"./en-sg.js": 1662,
	"./eo": 2915,
	"./eo.js": 2915,
	"./es": 7093,
	"./es-do": 5251,
	"./es-do.js": 5251,
	"./es-mx": 6112,
	"./es-mx.js": 6112,
	"./es-us": 1146,
	"./es-us.js": 1146,
	"./es.js": 7093,
	"./et": 5603,
	"./et.js": 5603,
	"./eu": 7763,
	"./eu.js": 7763,
	"./fa": 6959,
	"./fa.js": 6959,
	"./fi": 1897,
	"./fi.js": 1897,
	"./fil": 2549,
	"./fil.js": 2549,
	"./fo": 4694,
	"./fo.js": 4694,
	"./fr": 4470,
	"./fr-ca": 3049,
	"./fr-ca.js": 3049,
	"./fr-ch": 2330,
	"./fr-ch.js": 2330,
	"./fr.js": 4470,
	"./fy": 5044,
	"./fy.js": 5044,
	"./ga": 9295,
	"./ga.js": 9295,
	"./gd": 2101,
	"./gd.js": 2101,
	"./gl": 8794,
	"./gl.js": 8794,
	"./gom-deva": 4980,
	"./gom-deva.js": 4980,
	"./gom-latn": 3168,
	"./gom-latn.js": 3168,
	"./gu": 341,
	"./gu.js": 341,
	"./he": 4206,
	"./he.js": 4206,
	"./hi": 94,
	"./hi.js": 94,
	"./hr": 316,
	"./hr.js": 316,
	"./hu": 2138,
	"./hu.js": 2138,
	"./hy-am": 1423,
	"./hy-am.js": 1423,
	"./id": 9218,
	"./id.js": 9218,
	"./is": 135,
	"./is.js": 135,
	"./it": 626,
	"./it-ch": 150,
	"./it-ch.js": 150,
	"./it.js": 626,
	"./ja": 9183,
	"./ja.js": 9183,
	"./jv": 4286,
	"./jv.js": 4286,
	"./ka": 2105,
	"./ka.js": 2105,
	"./kk": 7772,
	"./kk.js": 7772,
	"./km": 8758,
	"./km.js": 8758,
	"./kn": 9282,
	"./kn.js": 9282,
	"./ko": 3730,
	"./ko.js": 3730,
	"./ku": 1408,
	"./ku.js": 1408,
	"./ky": 3291,
	"./ky.js": 3291,
	"./lb": 6841,
	"./lb.js": 6841,
	"./lo": 5466,
	"./lo.js": 5466,
	"./lt": 7010,
	"./lt.js": 7010,
	"./lv": 7595,
	"./lv.js": 7595,
	"./me": 9861,
	"./me.js": 9861,
	"./mi": 5493,
	"./mi.js": 5493,
	"./mk": 5966,
	"./mk.js": 5966,
	"./ml": 7341,
	"./ml.js": 7341,
	"./mn": 5115,
	"./mn.js": 5115,
	"./mr": 370,
	"./mr.js": 370,
	"./ms": 9847,
	"./ms-my": 1237,
	"./ms-my.js": 1237,
	"./ms.js": 9847,
	"./mt": 2126,
	"./mt.js": 2126,
	"./my": 6165,
	"./my.js": 6165,
	"./nb": 4924,
	"./nb.js": 4924,
	"./ne": 6744,
	"./ne.js": 6744,
	"./nl": 3901,
	"./nl-be": 9814,
	"./nl-be.js": 9814,
	"./nl.js": 3901,
	"./nn": 3877,
	"./nn.js": 3877,
	"./oc-lnc": 2135,
	"./oc-lnc.js": 2135,
	"./pa-in": 5858,
	"./pa-in.js": 5858,
	"./pl": 4495,
	"./pl.js": 4495,
	"./pt": 9520,
	"./pt-br": 7971,
	"./pt-br.js": 7971,
	"./pt.js": 9520,
	"./ro": 6459,
	"./ro.js": 6459,
	"./ru": 238,
	"./ru.js": 238,
	"./sd": 950,
	"./sd.js": 950,
	"./se": 7930,
	"./se.js": 7930,
	"./si": 124,
	"./si.js": 124,
	"./sk": 4249,
	"./sk.js": 4249,
	"./sl": 4985,
	"./sl.js": 4985,
	"./sq": 1104,
	"./sq.js": 1104,
	"./sr": 9131,
	"./sr-cyrl": 9915,
	"./sr-cyrl.js": 9915,
	"./sr.js": 9131,
	"./ss": 5893,
	"./ss.js": 5893,
	"./sv": 8760,
	"./sv.js": 8760,
	"./sw": 1172,
	"./sw.js": 1172,
	"./ta": 7333,
	"./ta.js": 7333,
	"./te": 3110,
	"./te.js": 3110,
	"./tet": 2095,
	"./tet.js": 2095,
	"./tg": 7321,
	"./tg.js": 7321,
	"./th": 9041,
	"./th.js": 9041,
	"./tk": 9005,
	"./tk.js": 9005,
	"./tl-ph": 5768,
	"./tl-ph.js": 5768,
	"./tlh": 9444,
	"./tlh.js": 9444,
	"./tr": 2397,
	"./tr.js": 2397,
	"./tzl": 8254,
	"./tzl.js": 8254,
	"./tzm": 1106,
	"./tzm-latn": 699,
	"./tzm-latn.js": 699,
	"./tzm.js": 1106,
	"./ug-cn": 9288,
	"./ug-cn.js": 9288,
	"./uk": 7691,
	"./uk.js": 7691,
	"./ur": 3795,
	"./ur.js": 3795,
	"./uz": 6791,
	"./uz-latn": 588,
	"./uz-latn.js": 588,
	"./uz.js": 6791,
	"./vi": 9822,
	"./vi.js": 9822,
	"./x-pseudo": 4378,
	"./x-pseudo.js": 4378,
	"./yo": 5805,
	"./yo.js": 5805,
	"./zh-cn": 3839,
	"./zh-cn.js": 3839,
	"./zh-hk": 5726,
	"./zh-hk.js": 5726,
	"./zh-mo": 9807,
	"./zh-mo.js": 9807,
	"./zh-tw": 4152,
	"./zh-tw.js": 4152
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6700;

/***/ })

}]);
//# sourceMappingURL=advanced_import.umd.828.js.map