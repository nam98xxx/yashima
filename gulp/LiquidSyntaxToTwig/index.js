"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExceptionOfCodeLiquid = exports.handleReplaceSchemaSettingToLiquidVariables = exports.liquidSyntaxToTwig = exports.handleGetTwigScope = exports.handleClauseInTagShopify = exports.VARIABLES_NAME = void 0;
var ramda_1 = require("ramda");
var control_flow_1 = require("./control_flow");
var filters_1 = require("./filters");
var getExceptionOfCodeLiquid_1 = require("./getExceptionOfCodeLiquid");
Object.defineProperty(exports, "getExceptionOfCodeLiquid", { enumerable: true, get: function () { return getExceptionOfCodeLiquid_1.getExceptionOfCodeLiquid; } });
var global_object_1 = require("./global_object");
var handleReplaceSchemaSettingToLiquidVariables_1 = require("./handleReplaceSchemaSettingToLiquidVariables");
Object.defineProperty(exports, "handleReplaceSchemaSettingToLiquidVariables", { enumerable: true, get: function () { return handleReplaceSchemaSettingToLiquidVariables_1.handleReplaceSchemaSettingToLiquidVariables; } });
var handleReplaceToGeneralAssign_1 = require("./handleReplaceToGeneralAssign");
var handleReplaceToGeneralIfElseElseIf_1 = require("./handleReplaceToGeneralIfElseElseIf");
var handleReplaceToGeneralOpenCloseBlock_1 = require("./handleReplaceToGeneralOpenCloseBlock");
var iteration_1 = require("./iteration");
var section_schema_1 = require("./section_schema");
var theme_tags_1 = require("./theme_tags");
var variable_tags_1 = require("./variable_tags");
var liquidSyntaxToTwig = function (_a) {
    var liquid = _a.liquid, settings = _a.settings;
    var _twig = (0, ramda_1.compose)(function (liquid) {
        // Ti???n x??? l?? c??c ki???u code liquid
        var _liquid = (0, handleReplaceToGeneralOpenCloseBlock_1.handleReplaceGeneralOpenCloseBlock)(liquid);
        _liquid = (0, handleReplaceToGeneralIfElseElseIf_1.handleReplaceToGeneralIfElseElseIf)(_liquid);
        _liquid = (0, handleReplaceToGeneralAssign_1.handleReplaceToGeneralAssign)(_liquid);
        // B???t ?????u
        _liquid = (0, handleReplaceSchemaSettingToLiquidVariables_1.handleReplaceSchemaSettingToLiquidVariables)({ liquid: _liquid, settings: settings });
        // Filters
        _liquid = (0, filters_1.abs)(_liquid);
        _liquid = (0, filters_1.append)(_liquid);
        _liquid = (0, filters_1.asset_img_url)(_liquid);
        _liquid = (0, filters_1.asset_url)(_liquid);
        _liquid = (0, filters_1.at_least)(_liquid);
        _liquid = (0, filters_1.at_most)(_liquid);
        _liquid = (0, filters_1.base64_decode)(_liquid);
        _liquid = (0, filters_1.base64_encode)(_liquid);
        _liquid = (0, filters_1.base64_url_safe_decode)(_liquid);
        _liquid = (0, filters_1.base64_url_safe_encode)(_liquid);
        _liquid = (0, filters_1.brightness_difference)(_liquid);
        _liquid = (0, filters_1.camelcase)(_liquid);
        _liquid = (0, filters_1.capitalize)(_liquid);
        _liquid = (0, filters_1.ceil)(_liquid);
        _liquid = (0, filters_1.color_brightness)(_liquid);
        _liquid = (0, filters_1.color_contrast)(_liquid);
        _liquid = (0, filters_1.color_darken)(_liquid);
        _liquid = (0, filters_1.color_desaturate)(_liquid);
        _liquid = (0, filters_1.color_difference)(_liquid);
        _liquid = (0, filters_1.color_extract)(_liquid);
        _liquid = (0, filters_1.color_lighten)(_liquid);
        _liquid = (0, filters_1.color_mix)(_liquid);
        _liquid = (0, filters_1.color_modify)(_liquid);
        _liquid = (0, filters_1.color_saturate)(_liquid);
        _liquid = (0, filters_1.color_to_hex)(_liquid);
        _liquid = (0, filters_1.color_to_hsl)(_liquid);
        _liquid = (0, filters_1.color_to_rgb)(_liquid);
        _liquid = (0, filters_1.compact)(_liquid);
        _liquid = (0, filters_1.concat)(_liquid);
        _liquid = (0, filters_1.customer_login_link)(_liquid);
        _liquid = (0, filters_1.date)(_liquid);
        _liquid = (0, filters_1.default_errors)(_liquid);
        _liquid = (0, filters_1.default_pagination)(_liquid);
        _liquid = (0, filters_1.divided_by)(_liquid);
        _liquid = (0, filters_1.downcase)(_liquid);
        _liquid = (0, filters_1.escape_once)(_liquid);
        _liquid = (0, filters_1.escape)(_liquid);
        _liquid = (0, filters_1.external_video_tag)(_liquid);
        _liquid = (0, filters_1.external_video_url)(_liquid);
        _liquid = (0, filters_1.file_img_url)(_liquid);
        _liquid = (0, filters_1.file_url)(_liquid);
        _liquid = (0, filters_1.first)(_liquid);
        _liquid = (0, filters_1.floor)(_liquid);
        _liquid = (0, filters_1.font_face)(_liquid);
        _liquid = (0, filters_1.font_modify)(_liquid);
        _liquid = (0, filters_1.font_url)(_liquid);
        _liquid = (0, filters_1.forloop)(_liquid);
        _liquid = (0, filters_1.format_address)(_liquid);
        _liquid = (0, filters_1.global_asset_url)(_liquid);
        _liquid = (0, filters_1.handle)(_liquid);
        _liquid = (0, filters_1.handleize)(_liquid);
        _liquid = (0, filters_1.highlight)(_liquid);
        _liquid = (0, filters_1.highlight_active_tag)(_liquid);
        _liquid = (0, filters_1.hmac_sha1)(_liquid);
        _liquid = (0, filters_1.hmac_sha256)(_liquid);
        _liquid = (0, filters_1.image_tag)(_liquid);
        _liquid = (0, filters_1.image_url)(_liquid);
        _liquid = (0, filters_1.img_url)(_liquid);
        _liquid = (0, filters_1.join)(_liquid);
        _liquid = (0, filters_1.json)(_liquid);
        _liquid = (0, filters_1.last)(_liquid);
        _liquid = (0, filters_1.link_to)(_liquid);
        _liquid = (0, filters_1.link_to_add_tag)(_liquid);
        _liquid = (0, filters_1.link_to_remove_tag)(_liquid);
        _liquid = (0, filters_1.link_to_tag)(_liquid);
        _liquid = (0, filters_1.link_to_type)(_liquid);
        _liquid = (0, filters_1.link_to_vendor)(_liquid);
        _liquid = (0, filters_1.lstrip)(_liquid);
        _liquid = (0, filters_1.map)(_liquid);
        _liquid = (0, filters_1.md5)(_liquid);
        _liquid = (0, filters_1.media_tag)(_liquid);
        _liquid = (0, filters_1.metafield_tag)(_liquid);
        _liquid = (0, filters_1.metafield_text)(_liquid);
        _liquid = (0, filters_1.minus)(_liquid);
        _liquid = (0, filters_1.model_viewer_tag)(_liquid);
        _liquid = (0, filters_1.modulo)(_liquid);
        _liquid = (0, filters_1.money)(_liquid);
        _liquid = (0, filters_1.newline_to_br)(_liquid);
        _liquid = (0, filters_1.payment_type_img_url)(_liquid);
        _liquid = (0, filters_1.payment_type_svg_tag)(_liquid);
        _liquid = (0, filters_1.placeholder_svg_tag)(_liquid);
        _liquid = (0, filters_1.pluralize)(_liquid);
        _liquid = (0, filters_1.plus)(_liquid);
        _liquid = (0, filters_1.preload_tag)(_liquid);
        _liquid = (0, filters_1.prepend)(_liquid);
        _liquid = (0, filters_1.remove)(_liquid);
        _liquid = (0, filters_1.remove_first)(_liquid);
        _liquid = (0, filters_1.replace)(_liquid);
        _liquid = (0, filters_1.replace_first)(_liquid);
        _liquid = (0, filters_1.reverse)(_liquid);
        _liquid = (0, filters_1.round)(_liquid);
        _liquid = (0, filters_1.rstrip)(_liquid);
        _liquid = (0, filters_1.script_tag)(_liquid);
        _liquid = (0, filters_1.sha1)(_liquid);
        _liquid = (0, filters_1.sha256)(_liquid);
        _liquid = (0, filters_1.shopify_asset_url)(_liquid);
        _liquid = (0, filters_1.size)(_liquid);
        _liquid = (0, filters_1.slice)(_liquid);
        _liquid = (0, filters_1.sort_natural)(_liquid);
        _liquid = (0, filters_1.sort)(_liquid);
        _liquid = (0, filters_1.sort_by)(_liquid);
        _liquid = (0, filters_1.split)(_liquid);
        _liquid = (0, filters_1.strip)(_liquid);
        _liquid = (0, filters_1.strip_html)(_liquid);
        _liquid = (0, filters_1.strip_newlines)(_liquid);
        _liquid = (0, filters_1.stylesheet_tag)(_liquid);
        _liquid = (0, filters_1.t)(_liquid);
        _liquid = (0, filters_1.times)(_liquid);
        _liquid = (0, filters_1.time_tag)(_liquid);
        _liquid = (0, filters_1.truncate)(_liquid);
        _liquid = (0, filters_1.truncatewords)(_liquid);
        _liquid = (0, filters_1.uniq)(_liquid);
        _liquid = (0, filters_1.upcase)(_liquid);
        _liquid = (0, filters_1.url_encode)(_liquid);
        _liquid = (0, filters_1.url_escape)(_liquid);
        _liquid = (0, filters_1.url_for_type)(_liquid);
        _liquid = (0, filters_1.url_for_vendor)(_liquid);
        _liquid = (0, filters_1.url_param_escape)(_liquid);
        _liquid = (0, filters_1.video_tag)(_liquid);
        _liquid = (0, filters_1.weight_with_unit)(_liquid);
        _liquid = (0, filters_1.where)(_liquid);
        _liquid = (0, filters_1.within)(_liquid);
        _liquid = (0, filters_1._default)(_liquid);
        // theme_tags
        _liquid = (0, theme_tags_1.comment)(_liquid);
        _liquid = (0, theme_tags_1.layout)(_liquid);
        _liquid = (0, theme_tags_1.liquid)(_liquid);
        _liquid = (0, theme_tags_1.paginate)(_liquid);
        _liquid = (0, theme_tags_1.raw)(_liquid);
        _liquid = (0, theme_tags_1.render)(_liquid);
        _liquid = (0, theme_tags_1.section)(_liquid);
        _liquid = (0, theme_tags_1.style)(_liquid);
        // theme_tags/forms
        _liquid = (0, theme_tags_1.form)(_liquid);
        // control_flow
        _liquid = (0, control_flow_1.case_when)(_liquid);
        _liquid = (0, control_flow_1.unless)(_liquid);
        // iteration
        _liquid = (0, iteration_1._break)(_liquid);
        _liquid = (0, iteration_1._continue)(_liquid);
        _liquid = (0, iteration_1.cycle)(_liquid);
        _liquid = (0, iteration_1.limit)(_liquid);
        _liquid = (0, iteration_1.offset)(_liquid);
        _liquid = (0, iteration_1.reversed)(_liquid);
        _liquid = (0, iteration_1.tablerow)(_liquid);
        // variable_tags
        _liquid = (0, variable_tags_1.capture)(_liquid);
        _liquid = (0, variable_tags_1.decrement)(_liquid);
        _liquid = (0, variable_tags_1.increment)(_liquid);
        // global_object
        _liquid = (0, global_object_1.powered_by_link)(_liquid);
        // section_schema
        _liquid = (0, section_schema_1.schema)(_liquid);
        // L???i trong code
        _liquid = (0, getExceptionOfCodeLiquid_1.getExceptionOfCodeLiquid)(_liquid);
        return _liquid;
    })(liquid);
    return _twig;
};
exports.liquidSyntaxToTwig = liquidSyntaxToTwig;
var const_1 = require("./const");
Object.defineProperty(exports, "VARIABLES_NAME", { enumerable: true, get: function () { return const_1.VARIABLES_NAME; } });
var handleClauseInTagShopify_1 = require("./handleClauseInTagShopify");
Object.defineProperty(exports, "handleClauseInTagShopify", { enumerable: true, get: function () { return handleClauseInTagShopify_1.handleClauseInTagShopify; } });
var handleGetTwigScope_1 = require("./handleGetTwigScope");
Object.defineProperty(exports, "handleGetTwigScope", { enumerable: true, get: function () { return handleGetTwigScope_1.handleGetTwigScope; } });
__exportStar(require("./objects"), exports);
