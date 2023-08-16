"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_category_js"],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






// with more time, I would find a better way to initialize these global variables and scope them properly 
var access_token = 'lpbg5b2f95cbe0f6klulqd9muvnoja6';
var cartId;
var removeCartButton = document.getElementById('remove-all-addToCart');
var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = (0,_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$('[data-shop-by-price]').length) return;
    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }
    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.arrangeFocusOnSortBy();
    this.cartChecker();
    $('#add-all-addToCart').on('click', function (e) {
      return _this3.addAllToCart();
    });
    $('#remove-all-addToCart').on('click', function (e) {
      return _this3.cartRemover();
    });
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on('sortBy-submitted', this.onSortBySubmit);
    }
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  _proto.addAllToCart = function addAllToCart() {
    //get all productIds in special items category

    var cardElements = document.querySelectorAll('.card.special-hover');
    var productIdValues = [];

    //add product ids to array

    cardElements.forEach(function (cardElement) {
      var specialProductId = cardElement.getAttribute('data-entity-id');
      if (specialProductId) {
        productIdValues.push(specialProductId);
      }
    });

    // configure request

    var endpoint = {
      route: "/carts",
      method: "POST",
      accept: "application/json",
      content: "application/json",
      success: 200
    };
    var requestBody = {
      lineItems: [{
        productId: productIdValues[0],
        quantity: 1
      }]
    };

    //request

    var addCartApiCall = function addCartApiCall(endpoint, requestBody) {
      if (requestBody === void 0) {
        requestBody = null;
      }
      var resource = window.location.origin + "/api/storefront" + endpoint.route;
      var init = {
        method: endpoint.method,
        credentials: "same-origin",
        headers: {
          'X-Auth-Token': access_token,
          "Accept": endpoint.accept
        }
      };
      if (requestBody) {
        init.body = JSON.stringify(requestBody);
        init.headers["Content-Type"] = endpoint.content;
      }
      return fetch(resource, init).then(function (response) {
        if (response.status === endpoint.success) {
          window.alert('Product has been added to the cart.');
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {
        // set the new cartId
        cartId = result.id;
        removeCartButton.classList.remove('special-items-hide');
      })["catch"](function (error) {
        return console.error(error);
      });
    };
    addCartApiCall(endpoint, requestBody);
  };
  _proto.cartChecker = function cartChecker() {
    // configure request

    var endpoint = {
      route: "/carts",
      method: "GET",
      accept: "application/json",
      success: 200
    };

    //request

    var getCartApiCall = function getCartApiCall(endpoint, requestBody) {
      if (requestBody === void 0) {
        requestBody = null;
      }
      var resource = window.location.origin + "/api/storefront" + endpoint.route;
      var init = {
        method: endpoint.method,
        credentials: "same-origin",
        headers: {
          'X-Auth-Token': access_token,
          "Accept": endpoint.accept
        }
      };
      if (requestBody) {
        init.body = JSON.stringify(requestBody);
        init.headers["Content-Type"] = endpoint.content;
      }
      return fetch(resource, init).then(function (response) {
        if (response.status === endpoint.success) {
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {
        if (!result.length) {
          // if there is no data in the result array hide the clear all button
          // unhide clear all button
          removeCartButton.classList.add('special-items-hide');
        } else {
          // if there is data in the result array, capture the cartId and hide the clear all button
          cartId = result;
          removeCartButton.classList.remove('special-items-hide');
        }
      })["catch"](function (error) {
        return console.error(error);
      });
    };
    getCartApiCall(endpoint);
  };
  _proto.cartRemover = function cartRemover() {
    var endpoint = {
      route: "/carts/" + cartId,
      method: "DELETE",
      accept: "application/json",
      success: 204
    };

    //request

    var deleteCartCall = function deleteCartCall(endpoint, requestBody) {
      if (requestBody === void 0) {
        requestBody = null;
      }
      var resource = window.location.origin + "/api/storefront" + endpoint.route;
      var init = {
        method: endpoint.method,
        credentials: "same-origin",
        headers: {
          'X-Auth-Token': access_token,
          "Accept": endpoint.accept
        }
      };
      if (requestBody) {
        init.body = JSON.stringify(requestBody);
        init.headers["Content-Type"] = endpoint.content;
      }
      return fetch(resource, init).then(function (response) {
        removeCartButton.classList.add('special-items-hide');
        if (response.status === endpoint.success) {
          window.alert('Your cart is now empty');
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {})["catch"](function (error) {
        return console.error(error);
      });
    };
    deleteCartCall(endpoint);
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DOztBQUV2RjtBQUNBLElBQU1LLFlBQVksR0FBRyxpQ0FBaUM7QUFDdEQsSUFBSUMsTUFBTTtBQUNWLElBQU1DLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQztBQUFDLElBRXBEQyxRQUFRLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsUUFBQSxFQUFBQyxZQUFBO0VBQ3pCLFNBQUFELFNBQVlHLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakJBLEtBQUEsR0FBQUgsWUFBQSxDQUFBSSxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHWixtR0FBMkIsQ0FBQ1MsT0FBTyxDQUFDO0lBQUMsT0FBQUMsS0FBQTtFQUNyRTtFQUFDLElBQUFHLE1BQUEsR0FBQVAsUUFBQSxDQUFBUSxTQUFBO0VBQUFELE1BQUEsQ0FFREUsdUJBQXVCLEdBQXZCLFNBQUFBLHdCQUF3QkMsUUFBUSxFQUFFQyxRQUFRLEVBQUVDLGNBQWMsRUFBRTtJQUN4REYsUUFBUSxDQUFDRyxJQUFJLENBQUM7TUFDVkMsSUFBSSxFQUFFSCxRQUFRO01BQ2QsV0FBVyxFQUFFQztJQUNqQixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUFMLE1BQUEsQ0FFRFEsK0JBQStCLEdBQS9CLFNBQUFBLGdDQUFBLEVBQWtDO0lBQUEsSUFBQUMsTUFBQTtJQUM5QixJQUFJLENBQUNDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7SUFFdkMsSUFBSUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUM1Q0YsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUNHLEtBQUssQ0FBQyxDQUFDO0lBQzNDO0lBRUFILENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFO01BQUEsT0FBTUwsTUFBSSxDQUFDUCx1QkFBdUIsQ0FBQ1EsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQztJQUFBLEVBQUM7RUFDaEksQ0FBQztFQUFBVixNQUFBLENBRURlLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFBQSxJQUFBQyxNQUFBO0lBQ04sSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzNCLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFFbEJSLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUNLLENBQUM7TUFBQSxPQUFLSCxNQUFJLENBQUNJLFlBQVksQ0FBQyxDQUFDO0lBQUEsRUFBQztJQUMvRFYsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQ0ssQ0FBQztNQUFBLE9BQUtILE1BQUksQ0FBQ0ssV0FBVyxDQUFDLENBQUM7SUFBQSxFQUFDO0lBRWpFWCxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDSyxDQUFDO01BQUEsT0FBS0gsTUFBSSxDQUFDZCx1QkFBdUIsQ0FBQ1EsQ0FBQyxDQUFDUyxDQUFDLENBQUNHLGFBQWEsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7SUFBQSxFQUFDO0lBRWxJLElBQUksQ0FBQ2YsK0JBQStCLENBQUMsQ0FBQztJQUV0Q3ZCLG9FQUFlLENBQUMsSUFBSSxDQUFDVyxPQUFPLENBQUM7SUFFN0IsSUFBSWMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDaEMsSUFBSSxDQUFDYSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVCLENBQUMsTUFBTTtNQUNILElBQUksQ0FBQ0MsY0FBYyxHQUFHLElBQUksQ0FBQ0EsY0FBYyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQ3BEM0MsNkRBQUssQ0FBQytCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNXLGNBQWMsQ0FBQztJQUNyRDtJQUVBZixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7TUFBQSxPQUFNRSxNQUFJLENBQUNXLHdCQUF3QixDQUFDakIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztJQUFBLEVBQUM7SUFFOUcsSUFBSSxDQUFDa0Isb0JBQW9CLENBQUMsQ0FBQztFQUMvQixDQUFDO0VBQUE1QixNQUFBLENBRUQ0QixvQkFBb0IsR0FBcEIsU0FBQUEscUJBQUEsRUFBdUI7SUFDbkIsSUFBTUMsa0JBQWtCLEdBQUduQixDQUFDLENBQUMsaUNBQWlDLENBQUM7SUFDL0QsSUFBSW1CLGtCQUFrQixDQUFDbEIsTUFBTSxFQUFFO01BQzNCa0Isa0JBQWtCLENBQUNoQixLQUFLLENBQUMsQ0FBQztJQUM5QjtFQUNKLENBQUM7RUFBQWIsTUFBQSxDQUVEd0IsaUJBQWlCLEdBQWpCLFNBQUFBLGtCQUFBLEVBQW9CO0lBQ2hCLElBQUFNLHFCQUFBLEdBTUksSUFBSSxDQUFDL0Isb0JBQW9CO01BTEhnQyxlQUFlLEdBQUFELHFCQUFBLENBQXJDRSxvQkFBb0I7TUFDRUMsZUFBZSxHQUFBSCxxQkFBQSxDQUFyQ0ksb0JBQW9CO01BQ0dDLGtCQUFrQixHQUFBTCxxQkFBQSxDQUF6Q00scUJBQXFCO01BQ0VDLGtCQUFrQixHQUFBUCxxQkFBQSxDQUF6Q1EscUJBQXFCO01BQ0FDLGNBQWMsR0FBQVQscUJBQUEsQ0FBbkNVLG1CQUFtQjtJQUV2QixJQUFNQyx3QkFBd0IsR0FBRy9CLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQztJQUNoRSxJQUFNZ0MsdUJBQXVCLEdBQUdoQyxDQUFDLENBQUMsMkJBQTJCLENBQUM7SUFDOUQsSUFBTWlDLGVBQWUsR0FBRyxJQUFJLENBQUMvQyxPQUFPLENBQUNnRCx1QkFBdUI7SUFDNUQsSUFBTUMsY0FBYyxHQUFHO01BQ25CQyxNQUFNLEVBQUU7UUFDSkMsUUFBUSxFQUFFO1VBQ05DLGFBQWEsRUFBRSxJQUFJO1VBQ25CQyxRQUFRLEVBQUU7WUFDTkMsS0FBSyxFQUFFUDtVQUNYO1FBQ0o7TUFDSixDQUFDO01BQ0RRLFFBQVEsRUFBRTtRQUNOQyxjQUFjLEVBQUUsMEJBQTBCO1FBQzFDQyxPQUFPLEVBQUU7TUFDYixDQUFDO01BQ0RDLFFBQVEsRUFBRTtJQUNkLENBQUM7SUFFRCxJQUFJLENBQUNDLGFBQWEsR0FBRyxJQUFJckUsOERBQWEsQ0FBQzJELGNBQWMsRUFBRSxVQUFDVyxPQUFPLEVBQUs7TUFDaEVmLHdCQUF3QixDQUFDZ0IsSUFBSSxDQUFDRCxPQUFPLENBQUNKLGNBQWMsQ0FBQztNQUNyRFYsdUJBQXVCLENBQUNlLElBQUksQ0FBQ0QsT0FBTyxDQUFDSCxPQUFPLENBQUM7TUFFN0MzQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNnRCxjQUFjLENBQUMsY0FBYyxDQUFDO01BRXhDaEQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDaUQsT0FBTyxDQUFDO1FBQ3BCQyxTQUFTLEVBQUU7TUFDZixDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ1gsQ0FBQyxFQUFFO01BQ0NDLHVCQUF1QixFQUFFO1FBQ3JCOUIsZUFBZSxFQUFmQSxlQUFlO1FBQ2ZFLGVBQWUsRUFBZkEsZUFBZTtRQUNmRSxrQkFBa0IsRUFBbEJBLGtCQUFrQjtRQUNsQkUsa0JBQWtCLEVBQWxCQSxrQkFBa0I7UUFDbEJFLGNBQWMsRUFBZEE7TUFDSjtJQUNKLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQXZDLE1BQUEsQ0FDRG9CLFlBQVksR0FBWixTQUFBQSxhQUFBLEVBQWU7SUFDWDs7SUFFQSxJQUFJMEMsWUFBWSxHQUFHdkUsUUFBUSxDQUFDd0UsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7SUFDbkUsSUFBSUMsZUFBZSxHQUFHLEVBQUU7O0lBRXhCOztJQUVBRixZQUFZLENBQUNHLE9BQU8sQ0FBQyxVQUFTQyxXQUFXLEVBQUU7TUFDdkMsSUFBSUMsZ0JBQWdCLEdBQUdELFdBQVcsQ0FBQ0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDO01BQ2pFLElBQUlELGdCQUFnQixFQUFFO1FBQ3BCSCxlQUFlLENBQUNLLElBQUksQ0FBQ0YsZ0JBQWdCLENBQUM7TUFDeEM7SUFDRixDQUFDLENBQUM7O0lBRUo7O0lBRUEsSUFBSUcsUUFBUSxHQUFHO01BQ1hDLEtBQUssRUFBRSxRQUFRO01BQ2ZDLE1BQU0sRUFBRSxNQUFNO01BQ2RDLE1BQU0sRUFBRSxrQkFBa0I7TUFDMUJqQixPQUFPLEVBQUUsa0JBQWtCO01BQzNCa0IsT0FBTyxFQUFFO0lBQ2IsQ0FBQztJQUVELElBQUlDLFdBQVcsR0FBRztNQUNkQyxTQUFTLEVBQUUsQ0FDUDtRQUNJQyxTQUFTLEVBQUViLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDN0JjLFFBQVEsRUFBRTtNQUNkLENBQUM7SUFFVCxDQUFDOztJQUVEOztJQUVBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBY0EsQ0FBSVQsUUFBUSxFQUFFSyxXQUFXLEVBQVk7TUFBQSxJQUF2QkEsV0FBVztRQUFYQSxXQUFXLEdBQUcsSUFBSTtNQUFBO01BQ2hELElBQUlLLFFBQVEsR0FBTUMsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sdUJBQWtCYixRQUFRLENBQUNDLEtBQU87TUFDMUUsSUFBSWEsSUFBSSxHQUFHO1FBQ1RaLE1BQU0sRUFBRUYsUUFBUSxDQUFDRSxNQUFNO1FBQ3ZCYSxXQUFXLEVBQUUsYUFBYTtRQUMxQkMsT0FBTyxFQUFFO1VBQ1AsY0FBYyxFQUFFbEcsWUFBWTtVQUM1QixRQUFRLEVBQUVrRixRQUFRLENBQUNHO1FBQ3JCO01BQ0YsQ0FBQztNQUNELElBQUdFLFdBQVcsRUFBRTtRQUNkUyxJQUFJLENBQUNHLElBQUksR0FBR0MsSUFBSSxDQUFDQyxTQUFTLENBQUNkLFdBQVcsQ0FBQztRQUN2Q1MsSUFBSSxDQUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUdoQixRQUFRLENBQUNkLE9BQU87TUFDakQ7TUFFQSxPQUFPa0MsS0FBSyxDQUFDVixRQUFRLEVBQUVJLElBQUksQ0FBQyxDQUMzQk8sSUFBSSxDQUFDLFVBQUFDLFFBQVEsRUFBSTtRQUNoQixJQUFHQSxRQUFRLENBQUNDLE1BQU0sS0FBS3ZCLFFBQVEsQ0FBQ0ksT0FBTyxFQUFFO1VBQ3ZDTyxNQUFNLENBQUNhLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQztVQUNuRCxPQUFPRixRQUFRLENBQUNHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLE1BQU07VUFDTCxPQUFPLElBQUlDLEtBQUsseUJBQXVCSixRQUFRLENBQUNDLE1BQVEsQ0FBQztRQUMzRDtNQUNGLENBQUMsQ0FBQyxDQUNERixJQUFJLENBQUMsVUFBQU0sTUFBTSxFQUFJO1FBQ2Q7UUFDQTVHLE1BQU0sR0FBRzRHLE1BQU0sQ0FBQ0MsRUFBRTtRQUNsQjVHLGdCQUFnQixDQUFDNkcsU0FBUyxDQUFDQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7TUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFBQyxLQUFLO1FBQUEsT0FBSUMsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQztNQUFBLEVBQUM7SUFDekMsQ0FBQztJQUVEdEIsY0FBYyxDQUFDVCxRQUFRLEVBQUVLLFdBQVcsQ0FBQztFQUN6QyxDQUFDO0VBQUEzRSxNQUFBLENBQ0RrQixXQUFXLEdBQVgsU0FBQUEsWUFBQSxFQUFhO0lBQ1Q7O0lBRUEsSUFBSW9ELFFBQVEsR0FBRztNQUNYQyxLQUFLLEVBQUUsUUFBUTtNQUNmQyxNQUFNLEVBQUUsS0FBSztNQUNiQyxNQUFNLEVBQUUsa0JBQWtCO01BQzFCQyxPQUFPLEVBQUU7SUFDYixDQUFDOztJQUVEOztJQUVBLElBQU02QixjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQUlqQyxRQUFRLEVBQUVLLFdBQVcsRUFBWTtNQUFBLElBQXZCQSxXQUFXO1FBQVhBLFdBQVcsR0FBRyxJQUFJO01BQUE7TUFDaEQsSUFBSUssUUFBUSxHQUFNQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSx1QkFBa0JiLFFBQVEsQ0FBQ0MsS0FBTztNQUMxRSxJQUFJYSxJQUFJLEdBQUc7UUFDVFosTUFBTSxFQUFFRixRQUFRLENBQUNFLE1BQU07UUFDdkJhLFdBQVcsRUFBRSxhQUFhO1FBQzFCQyxPQUFPLEVBQUU7VUFDUCxjQUFjLEVBQUVsRyxZQUFZO1VBQzVCLFFBQVEsRUFBRWtGLFFBQVEsQ0FBQ0c7UUFDckI7TUFDRixDQUFDO01BQ0QsSUFBR0UsV0FBVyxFQUFFO1FBQ2RTLElBQUksQ0FBQ0csSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ2QsV0FBVyxDQUFDO1FBQ3ZDUyxJQUFJLENBQUNFLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBR2hCLFFBQVEsQ0FBQ2QsT0FBTztNQUNqRDtNQUVBLE9BQU9rQyxLQUFLLENBQUNWLFFBQVEsRUFBRUksSUFBSSxDQUFDLENBQzNCTyxJQUFJLENBQUMsVUFBQUMsUUFBUSxFQUFJO1FBQ2hCLElBQUdBLFFBQVEsQ0FBQ0MsTUFBTSxLQUFLdkIsUUFBUSxDQUFDSSxPQUFPLEVBQUU7VUFDdkMsT0FBT2tCLFFBQVEsQ0FBQ0csSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsTUFBTTtVQUNMLE9BQU8sSUFBSUMsS0FBSyx5QkFBdUJKLFFBQVEsQ0FBQ0MsTUFBUSxDQUFDO1FBQzNEO01BQ0YsQ0FBQyxDQUFDLENBQ0RGLElBQUksQ0FBQyxVQUFBTSxNQUFNLEVBQUk7UUFDZCxJQUFHLENBQUNBLE1BQU0sQ0FBQ3RGLE1BQU0sRUFBQztVQUFHO1VBQ25CO1VBQ0FyQixnQkFBZ0IsQ0FBQzZHLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLG9CQUFvQixDQUFDO1FBQ3RELENBQUMsTUFBTTtVQUFFO1VBQ1BuSCxNQUFNLEdBQUc0RyxNQUFNO1VBQ2YzRyxnQkFBZ0IsQ0FBQzZHLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ3pEO01BQ0YsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFBQyxLQUFLO1FBQUEsT0FBSUMsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQztNQUFBLEVBQUM7SUFDekMsQ0FBQztJQUVERSxjQUFjLENBQUNqQyxRQUFRLENBQUM7RUFDNUIsQ0FBQztFQUFBdEUsTUFBQSxDQUNEcUIsV0FBVyxHQUFYLFNBQUFBLFlBQUEsRUFBYTtJQUNULElBQUlpRCxRQUFRLEdBQUc7TUFDWEMsS0FBSyxFQUFFLFNBQVMsR0FBR2xGLE1BQU07TUFDekJtRixNQUFNLEVBQUUsUUFBUTtNQUNoQkMsTUFBTSxFQUFFLGtCQUFrQjtNQUMxQkMsT0FBTyxFQUFFO0lBQ2IsQ0FBQzs7SUFFRDs7SUFFQSxJQUFNK0IsY0FBYyxHQUFHLFNBQWpCQSxjQUFjQSxDQUFJbkMsUUFBUSxFQUFFSyxXQUFXLEVBQVk7TUFBQSxJQUF2QkEsV0FBVztRQUFYQSxXQUFXLEdBQUcsSUFBSTtNQUFBO01BQ2hELElBQUlLLFFBQVEsR0FBTUMsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sdUJBQWtCYixRQUFRLENBQUNDLEtBQU87TUFDMUUsSUFBSWEsSUFBSSxHQUFHO1FBQ1RaLE1BQU0sRUFBRUYsUUFBUSxDQUFDRSxNQUFNO1FBQ3ZCYSxXQUFXLEVBQUUsYUFBYTtRQUMxQkMsT0FBTyxFQUFFO1VBQ1AsY0FBYyxFQUFFbEcsWUFBWTtVQUM1QixRQUFRLEVBQUVrRixRQUFRLENBQUNHO1FBQ3JCO01BQ0YsQ0FBQztNQUNELElBQUdFLFdBQVcsRUFBRTtRQUNkUyxJQUFJLENBQUNHLElBQUksR0FBR0MsSUFBSSxDQUFDQyxTQUFTLENBQUNkLFdBQVcsQ0FBQztRQUN2Q1MsSUFBSSxDQUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUdoQixRQUFRLENBQUNkLE9BQU87TUFDakQ7TUFFQSxPQUFPa0MsS0FBSyxDQUFDVixRQUFRLEVBQUVJLElBQUksQ0FBQyxDQUMzQk8sSUFBSSxDQUFDLFVBQUFDLFFBQVEsRUFBSTtRQUNkdEcsZ0JBQWdCLENBQUM2RyxTQUFTLENBQUNLLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RCxJQUFHWixRQUFRLENBQUNDLE1BQU0sS0FBS3ZCLFFBQVEsQ0FBQ0ksT0FBTyxFQUFFO1VBQ3ZDTyxNQUFNLENBQUNhLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztVQUN0QyxPQUFPRixRQUFRLENBQUNHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLE1BQU07VUFDTCxPQUFPLElBQUlDLEtBQUsseUJBQXVCSixRQUFRLENBQUNDLE1BQVEsQ0FBQztRQUMzRDtNQUNGLENBQUMsQ0FBQyxDQUNERixJQUFJLENBQUMsVUFBQU0sTUFBTSxFQUFJLENBQ2hCLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQUksS0FBSztRQUFBLE9BQUlDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7TUFBQSxFQUFDO0lBQ3pDLENBQUM7SUFFREksY0FBYyxDQUFDbkMsUUFBUSxDQUFDO0VBQzVCLENBQUM7RUFBQSxPQUFBN0UsUUFBQTtBQUFBLEVBclFpQ1QsZ0RBQVc7Ozs7Ozs7Ozs7Ozs7OztBQ1hqRCxJQUFNMkgsWUFBWSxHQUFHLGNBQWM7QUFDbkMsSUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUErQkEsQ0FBSUMsVUFBVTtFQUFBLE9BQUssQ0FBQyxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQ0YsVUFBVSxDQUFDRixZQUFZLENBQUMsQ0FBQyxDQUFDaEcsTUFBTTtBQUFBO0FBQ3RHLElBQU1xRyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFBLEVBQThCO0VBQ3RELEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHQyxTQUFBLENBQW1CdkcsTUFBTSxFQUFFc0csQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUosVUFBVSxHQUFHckIsSUFBSSxDQUFDMkIsS0FBSyxDQUFvQkYsQ0FBQyxRQUFBQyxTQUFBLENBQUF2RyxNQUFBLElBQURzRyxDQUFDLEdBQUFHLFNBQUEsR0FBQUYsU0FBQSxDQUFERCxDQUFDLENBQUMsQ0FBQztJQUNwRCxJQUFJTCwrQkFBK0IsQ0FBQ0MsVUFBVSxDQUFDLEVBQUU7TUFDN0MsT0FBT0EsVUFBVTtJQUNyQjtFQUNKO0FBQ0osQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNMUgsMkJBQTJCLEdBQUcsU0FBOUJBLDJCQUEyQkEsQ0FBSVMsT0FBTyxFQUFLO0VBQ3BELElBQVF5SCx3QkFBd0IsR0FBd0V6SCxPQUFPLENBQXZHeUgsd0JBQXdCO0lBQUVDLGdDQUFnQyxHQUFzQzFILE9BQU8sQ0FBN0UwSCxnQ0FBZ0M7SUFBRUMsK0JBQStCLEdBQUszSCxPQUFPLENBQTNDMkgsK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHUixzQkFBc0IsQ0FBQ0ssd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdYLE1BQU0sQ0FBQ1ksTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ2IsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWdCLGVBQWUsR0FBR2IsTUFBTSxDQUFDQyxJQUFJLENBQUNTLGdCQUFnQixDQUFDYixZQUFZLENBQUMsQ0FBQyxDQUFDaUIsR0FBRyxDQUFDLFVBQUFDLEdBQUc7SUFBQSxPQUFJQSxHQUFHLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUM7RUFBQSxFQUFDO0VBRXBHLE9BQU9KLGVBQWUsQ0FBQ0ssTUFBTSxDQUFDLFVBQUNDLEdBQUcsRUFBRUosR0FBRyxFQUFFWixDQUFDLEVBQUs7SUFDM0NnQixHQUFHLENBQUNKLEdBQUcsQ0FBQyxHQUFHSixhQUFhLENBQUNSLENBQUMsQ0FBQztJQUMzQixPQUFPZ0IsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbi8vIHdpdGggbW9yZSB0aW1lLCBJIHdvdWxkIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGluaXRpYWxpemUgdGhlc2UgZ2xvYmFsIHZhcmlhYmxlcyBhbmQgc2NvcGUgdGhlbSBwcm9wZXJseSBcbmNvbnN0IGFjY2Vzc190b2tlbiA9ICdscGJnNWIyZjk1Y2JlMGY2a2x1bHFkOW11dm5vamE2JzsgXG5sZXQgY2FydElkO1xuY29uc3QgcmVtb3ZlQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmUtYWxsLWFkZFRvQ2FydCcpOyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICAgICAgICAnYXJpYS1saXZlJzogYXJpYUxpdmVTdGF0dXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgICAgIGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAoJCgnLm5hdkxpc3QtYWN0aW9uJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksICdzdGF0dXMnLCAnYXNzZXJ0aXZlJykpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcbiAgICAgICAgdGhpcy5jYXJ0Q2hlY2tlcigpO1xuXG4gICAgICAgICQoJyNhZGQtYWxsLWFkZFRvQ2FydCcpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLmFkZEFsbFRvQ2FydCgpKTtcbiAgICAgICAgJCgnI3JlbW92ZS1hbGwtYWRkVG9DYXJ0Jykub24oJ2NsaWNrJywgKGUpID0+IHRoaXMuY2FydFJlbW92ZXIoKSk7IFxuXG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICB9XG5cbiAgICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICAgICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkQWxsVG9DYXJ0KCkge1xuICAgICAgICAvL2dldCBhbGwgcHJvZHVjdElkcyBpbiBzcGVjaWFsIGl0ZW1zIGNhdGVnb3J5XG5cbiAgICAgICAgbGV0IGNhcmRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkLnNwZWNpYWwtaG92ZXInKTtcbiAgICAgICAgbGV0IHByb2R1Y3RJZFZhbHVlcyA9IFtdO1xuXG4gICAgICAgIC8vYWRkIHByb2R1Y3QgaWRzIHRvIGFycmF5XG5cbiAgICAgICAgY2FyZEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oY2FyZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzcGVjaWFsUHJvZHVjdElkID0gY2FyZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eS1pZCcpO1xuICAgICAgICAgICAgaWYgKHNwZWNpYWxQcm9kdWN0SWQpIHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkVmFsdWVzLnB1c2goc3BlY2lhbFByb2R1Y3RJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uZmlndXJlIHJlcXVlc3RcblxuICAgICAgICBsZXQgZW5kcG9pbnQgPSB7XG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjAwXG4gICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIGxldCByZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWRWYWx1ZXNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXF1ZXN0XG5cbiAgICAgICAgY29uc3QgYWRkQ2FydEFwaUNhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1BdXRoLVRva2VuJzogYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IGVuZHBvaW50LmFjY2VwdCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgaW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgICBpbml0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBlbmRwb2ludC5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChyZXNvdXJjZSwgaW5pdClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSBlbmRwb2ludC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdQcm9kdWN0IGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBjYXJ0LicpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIC8vIHNldCB0aGUgbmV3IGNhcnRJZFxuICAgICAgICAgICAgICBjYXJ0SWQgPSByZXN1bHQuaWRcbiAgICAgICAgICAgICAgcmVtb3ZlQ2FydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzcGVjaWFsLWl0ZW1zLWhpZGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2FydEFwaUNhbGwoZW5kcG9pbnQsIHJlcXVlc3RCb2R5KTtcbiAgICB9XG4gICAgY2FydENoZWNrZXIoKXtcbiAgICAgICAgLy8gY29uZmlndXJlIHJlcXVlc3RcblxuICAgICAgICBsZXQgZW5kcG9pbnQgPSB7XG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgXG4gICAgICAgICAgICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjAwXG4gICAgICAgIH1cblxuICAgICAgICAvL3JlcXVlc3RcblxuICAgICAgICBjb25zdCBnZXRDYXJ0QXBpQ2FsbCA9IChlbmRwb2ludCwgcmVxdWVzdEJvZHkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvc3RvcmVmcm9udCR7ZW5kcG9pbnQucm91dGV9YDtcbiAgICAgICAgICAgIGxldCBpbml0ID0ge1xuICAgICAgICAgICAgICBtZXRob2Q6IGVuZHBvaW50Lm1ldGhvZCxcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLUF1dGgtVG9rZW4nOiBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogZW5kcG9pbnQuYWNjZXB0LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICBpbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSk7XG4gICAgICAgICAgICAgIGluaXQuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGVuZHBvaW50LmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlc291cmNlLCBpbml0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOyAvLyBvciByZXNwb25zZS50ZXh0KClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGByZXNwb25zZS5zdGF0dXMgaXMgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICBpZighcmVzdWx0Lmxlbmd0aCl7ICAvLyBpZiB0aGVyZSBpcyBubyBkYXRhIGluIHRoZSByZXN1bHQgYXJyYXkgaGlkZSB0aGUgY2xlYXIgYWxsIGJ1dHRvblxuICAgICAgICAgICAgICAgIC8vIHVuaGlkZSBjbGVhciBhbGwgYnV0dG9uXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzcGVjaWFsLWl0ZW1zLWhpZGUnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gaWYgdGhlcmUgaXMgZGF0YSBpbiB0aGUgcmVzdWx0IGFycmF5LCBjYXB0dXJlIHRoZSBjYXJ0SWQgYW5kIGhpZGUgdGhlIGNsZWFyIGFsbCBidXR0b25cbiAgICAgICAgICAgICAgICBjYXJ0SWQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzcGVjaWFsLWl0ZW1zLWhpZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRDYXJ0QXBpQ2FsbChlbmRwb2ludCk7XG4gICAgfVxuICAgIGNhcnRSZW1vdmVyKCl7XG4gICAgICAgIGxldCBlbmRwb2ludCA9IHtcbiAgICAgICAgICAgIHJvdXRlOiBcIi9jYXJ0cy9cIiArIGNhcnRJZCxcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIiwgXG4gICAgICAgICAgICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjA0XG4gICAgICAgIH1cblxuICAgICAgICAvL3JlcXVlc3RcblxuICAgICAgICBjb25zdCBkZWxldGVDYXJ0Q2FsbCA9IChlbmRwb2ludCwgcmVxdWVzdEJvZHkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvc3RvcmVmcm9udCR7ZW5kcG9pbnQucm91dGV9YDtcbiAgICAgICAgICAgIGxldCBpbml0ID0ge1xuICAgICAgICAgICAgICBtZXRob2Q6IGVuZHBvaW50Lm1ldGhvZCxcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLUF1dGgtVG9rZW4nOiBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogZW5kcG9pbnQuYWNjZXB0LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICBpbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSk7XG4gICAgICAgICAgICAgIGluaXQuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGVuZHBvaW50LmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlc291cmNlLCBpbml0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnWW91ciBjYXJ0IGlzIG5vdyBlbXB0eScpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZUNhcnRDYWxsKGVuZHBvaW50KTtcbiAgICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwibmFtZXMiOlsiaG9va3MiLCJDYXRhbG9nUGFnZSIsImNvbXBhcmVQcm9kdWN0cyIsIkZhY2V0ZWRTZWFyY2giLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJhY2Nlc3NfdG9rZW4iLCJjYXJ0SWQiLCJyZW1vdmVDYXJ0QnV0dG9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIl90aGlzMiIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiX3RoaXMzIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJjYXJ0Q2hlY2tlciIsImUiLCJhZGRBbGxUb0NhcnQiLCJjYXJ0UmVtb3ZlciIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJzZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIl90aGlzJHZhbGlkYXRpb25EaWN0aSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiY2FyZEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInByb2R1Y3RJZFZhbHVlcyIsImZvckVhY2giLCJjYXJkRWxlbWVudCIsInNwZWNpYWxQcm9kdWN0SWQiLCJnZXRBdHRyaWJ1dGUiLCJwdXNoIiwiZW5kcG9pbnQiLCJyb3V0ZSIsIm1ldGhvZCIsImFjY2VwdCIsInN1Y2Nlc3MiLCJyZXF1ZXN0Qm9keSIsImxpbmVJdGVtcyIsInByb2R1Y3RJZCIsInF1YW50aXR5IiwiYWRkQ2FydEFwaUNhbGwiLCJyZXNvdXJjZSIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiaW5pdCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJhbGVydCIsImpzb24iLCJFcnJvciIsInJlc3VsdCIsImlkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZXJyb3IiLCJjb25zb2xlIiwiZ2V0Q2FydEFwaUNhbGwiLCJhZGQiLCJkZWxldGVDYXJ0Q2FsbCIsImRlZmF1bHQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsImFyZ3VtZW50cyIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=