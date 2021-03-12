((typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpadvanced_import"] || []).push([[20],{

/***/ "d622":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6d3536b3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/FormatOptions.vue?vue&type=template&id=1156d71f&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"field_name_row"}},[_vm._v("Dates Format "),_c('b-button',{directives:[{name:"b-modal",rawName:"v-b-modal.modal-datetime-formats",modifiers:{"modal-datetime-formats":true}}],attrs:{"size":"sm","variant":"outline-info"}},[_c('font-awesome-icon',{staticClass:"icon",attrs:{"icon":['fas', 'question-circle']}})],1)],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dates_format),expression:"dates_format"}],staticClass:"form-control",attrs:{"type":"text","id":"dates_format"},domProps:{"value":(_vm.dates_format)},on:{"input":function($event){if($event.target.composing){ return; }_vm.dates_format=$event.target.value}}})]),_c('b-modal',{attrs:{"size":"xl","id":"modal-datetime-formats","title":"Date/time formats","ok-only":""}},[_c('div',{staticClass:"my-4"},[_c('p',[_vm._v("The following characters are recognized by the date parser.")]),_c('DateFormatsTable')],1)]),_c('div',{staticClass:"buttons d-flex flex-row justify-content-between"},[_vm._t("left"),_vm._t("default"),_vm._t("right",null,{"validation":_vm.$v})],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/import/FormatOptions.vue?vue&type=template&id=1156d71f&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6d3536b3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DateFormatsTable.vue?vue&type=template&id=aab527cc&
var DateFormatsTablevue_type_template_id_aab527cc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table table-striped table-bordered"},[_vm._m(0),_c('tbody',_vm._l((_vm.formats),function(format,index){return _c('tr',{key:index},[_c('td',[_vm._v(_vm._s(format.format))]),_c('td',[_vm._v(_vm._s(format.description))]),_c('td',[_vm._v(_vm._s(format.example))])])}),0)])}
var DateFormatsTablevue_type_template_id_aab527cc_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Format/character")]),_c('th',[_vm._v("Description")]),_c('th',[_vm._v("Example")])])])}]


// CONCATENATED MODULE: ./src/components/DateFormatsTable.vue?vue&type=template&id=aab527cc&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DateFormatsTable.vue?vue&type=script&lang=js&
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
// CONCATENATED MODULE: ./src/components/DateFormatsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DateFormatsTablevue_type_script_lang_js_ = (DateFormatsTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/DateFormatsTable.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_DateFormatsTablevue_type_script_lang_js_,
  DateFormatsTablevue_type_template_id_aab527cc_render,
  DateFormatsTablevue_type_template_id_aab527cc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DateFormatsTable = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/import/FormatOptions.vue?vue&type=script&lang=js&
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
    DateFormatsTable: DateFormatsTable
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
// CONCATENATED MODULE: ./src/components/import/FormatOptions.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_FormatOptionsvue_type_script_lang_js_ = (FormatOptionsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/import/FormatOptions.vue





/* normalize component */

var FormatOptions_component = Object(componentNormalizer["a" /* default */])(
  import_FormatOptionsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FormatOptions = __webpack_exports__["default"] = (FormatOptions_component.exports);

/***/ })

}]);
//# sourceMappingURL=advanced_import.common.20.js.map