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
          // 'X-Auth-Token': access_token,
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
          // 'X-Auth-Token': access_token,
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
          // 'X-Auth-Token': access_token,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DOztBQUV2RjtBQUNBLElBQUlLLE1BQU07QUFDVixJQUFNQyxnQkFBZ0IsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsc0JBQXNCLENBQUM7QUFBQyxJQUVwREMsUUFBUSwwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLFFBQUEsRUFBQUMsWUFBQTtFQUN6QixTQUFBRCxTQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFILFlBQUEsQ0FBQUksSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR1gsbUdBQTJCLENBQUNRLE9BQU8sQ0FBQztJQUFDLE9BQUFDLEtBQUE7RUFDckU7RUFBQyxJQUFBRyxNQUFBLEdBQUFQLFFBQUEsQ0FBQVEsU0FBQTtFQUFBRCxNQUFBLENBRURFLHVCQUF1QixHQUF2QixTQUFBQSx3QkFBd0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxjQUFjLEVBQUU7SUFDeERGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO01BQ1ZDLElBQUksRUFBRUgsUUFBUTtNQUNkLFdBQVcsRUFBRUM7SUFDakIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBTCxNQUFBLENBRURRLCtCQUErQixHQUEvQixTQUFBQSxnQ0FBQSxFQUFrQztJQUFBLElBQUFDLE1BQUE7SUFDOUIsSUFBSSxDQUFDQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ0MsTUFBTSxFQUFFO0lBRXZDLElBQUlELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7TUFDNUNGLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxLQUFLLENBQUMsQ0FBQztJQUMzQztJQUVBSCxDQUFD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O01BQzdDLE9BQU9BLFVBQVU7SUFDckI7RUFDSjtBQUNKLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTXpILDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlRLE9BQU8sRUFBSztFQUNwRCxJQUFReUgsd0JBQXdCLEdBQXdFekgsT0FBTyxDQUF2R3lILHdCQUF3QjtJQUFFQyxnQ0FBZ0MsR0FBc0MxSCxPQUFPLENBQTdFMEgsZ0NBQWdDO0lBQUVDLCtCQUErQixHQUFLM0gsT0FBTyxDQUEzQzJILCtCQUErQjtFQUNuRyxJQUFNQyxnQkFBZ0IsR0FBR1Isc0JBQXNCLENBQUNLLHdCQUF3QixFQUFFQyxnQ0FBZ0MsRUFBRUMsK0JBQStCLENBQUM7RUFDNUksSUFBTUUsYUFBYSxHQUFHWCxNQUFNLENBQUNZLE1BQU0sQ0FBQ0YsZ0JBQWdCLENBQUNiLFlBQVksQ0FBQyxDQUFDO0VBQ25FLElBQU1nQixlQUFlLEdBQUdiLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDUyxnQkFBZ0IsQ0FBQ2IsWUFBWSxDQUFDLENBQUMsQ0FBQ2lCLEdBQUcsQ0FBQyxVQUFBQyxHQUFHO0lBQUEsT0FBSUEsR0FBRyxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxDQUFDO0VBQUEsRUFBQztFQUVwRyxPQUFPSixlQUFlLENBQUNLLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVKLEdBQUcsRUFBRVosQ0FBQyxFQUFLO0lBQzNDZ0IsR0FBRyxDQUFDSixHQUFHLENBQUMsR0FBR0osYUFBYSxDQUFDUixDQUFDLENBQUM7SUFDM0IsT0FBT2dCLEdBQUc7RUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XHJcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XHJcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcclxuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XHJcblxyXG4vLyB3aXRoIG1vcmUgdGltZSwgSSB3b3VsZCBmaW5kIGEgYmV0dGVyIHdheSB0byBpbml0aWFsaXplIHRoZXNlIGdsb2JhbCB2YXJpYWJsZXMgYW5kIHNjb3BlIHRoZW0gcHJvcGVybHkgXHJcbmxldCBjYXJ0SWQ7XHJcbmNvbnN0IHJlbW92ZUNhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlLWFsbC1hZGRUb0NhcnQnKTsgXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcclxuICAgICAgICAkZWxlbWVudC5hdHRyKHtcclxuICAgICAgICAgICAgcm9sZTogcm9sZVR5cGUsXHJcbiAgICAgICAgICAgICdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xyXG4gICAgICAgIGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZScpLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksICdzdGF0dXMnLCAnYXNzZXJ0aXZlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xyXG4gICAgICAgIHRoaXMuY2FydENoZWNrZXIoKTtcclxuXHJcbiAgICAgICAgJCgnI2FkZC1hbGwtYWRkVG9DYXJ0Jykub24oJ2NsaWNrJywgKGUpID0+IHRoaXMuYWRkQWxsVG9DYXJ0KCkpO1xyXG4gICAgICAgICQoJyNyZW1vdmUtYWxsLWFkZFRvQ2FydCcpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLmNhcnRSZW1vdmVyKCkpOyBcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xyXG5cclxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcclxuXHJcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XHJcblxyXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xyXG4gICAgICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcclxuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxyXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxyXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxyXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xyXG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxyXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xyXG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xyXG5cclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcclxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcclxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkQWxsVG9DYXJ0KCkge1xyXG4gICAgICAgIC8vZ2V0IGFsbCBwcm9kdWN0SWRzIGluIHNwZWNpYWwgaXRlbXMgY2F0ZWdvcnlcclxuXHJcbiAgICAgICAgbGV0IGNhcmRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkLnNwZWNpYWwtaG92ZXInKTtcclxuICAgICAgICBsZXQgcHJvZHVjdElkVmFsdWVzID0gW107XHJcblxyXG4gICAgICAgIC8vYWRkIHByb2R1Y3QgaWRzIHRvIGFycmF5XHJcblxyXG4gICAgICAgIGNhcmRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNhcmRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzcGVjaWFsUHJvZHVjdElkID0gY2FyZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eS1pZCcpO1xyXG4gICAgICAgICAgICBpZiAoc3BlY2lhbFByb2R1Y3RJZCkge1xyXG4gICAgICAgICAgICAgIHByb2R1Y3RJZFZhbHVlcy5wdXNoKHNwZWNpYWxQcm9kdWN0SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY29uZmlndXJlIHJlcXVlc3RcclxuXHJcbiAgICAgICAgbGV0IGVuZHBvaW50ID0ge1xyXG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIiwgXHJcbiAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAyMDBcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3RCb2R5ID0ge1xyXG4gICAgICAgICAgICBsaW5lSXRlbXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZFZhbHVlc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlcXVlc3RcclxuXHJcbiAgICAgICAgY29uc3QgYWRkQ2FydEFwaUNhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvc3RvcmVmcm9udCR7ZW5kcG9pbnQucm91dGV9YDtcclxuICAgICAgICAgICAgbGV0IGluaXQgPSB7XHJcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXHJcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcclxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAnWC1BdXRoLVRva2VuJzogYWNjZXNzX3Rva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogZW5kcG9pbnQuYWNjZXB0LFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyZXF1ZXN0Qm9keSkge1xyXG4gICAgICAgICAgICAgIGluaXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KTtcclxuICAgICAgICAgICAgICBpbml0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBlbmRwb2ludC5jb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChyZXNvdXJjZSwgaW5pdClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdQcm9kdWN0IGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBjYXJ0LicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgLy8gb3IgcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgY2FydElkXHJcbiAgICAgICAgICAgICAgY2FydElkID0gcmVzdWx0LmlkXHJcbiAgICAgICAgICAgICAgcmVtb3ZlQ2FydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzcGVjaWFsLWl0ZW1zLWhpZGUnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENhcnRBcGlDYWxsKGVuZHBvaW50LCByZXF1ZXN0Qm9keSk7XHJcbiAgICB9XHJcbiAgICBjYXJ0Q2hlY2tlcigpe1xyXG4gICAgICAgIC8vIGNvbmZpZ3VyZSByZXF1ZXN0XHJcblxyXG4gICAgICAgIGxldCBlbmRwb2ludCA9IHtcclxuICAgICAgICAgICAgcm91dGU6IFwiL2NhcnRzXCIsXHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgXHJcbiAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IDIwMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXF1ZXN0XHJcblxyXG4gICAgICAgIGNvbnN0IGdldENhcnRBcGlDYWxsID0gKGVuZHBvaW50LCByZXF1ZXN0Qm9keSA9IG51bGwpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XHJcbiAgICAgICAgICAgIGxldCBpbml0ID0ge1xyXG4gICAgICAgICAgICAgIG1ldGhvZDogZW5kcG9pbnQubWV0aG9kLFxyXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgLy8gJ1gtQXV0aC1Ub2tlbic6IGFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IGVuZHBvaW50LmFjY2VwdCxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVxdWVzdEJvZHkpIHtcclxuICAgICAgICAgICAgICBpbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSk7XHJcbiAgICAgICAgICAgICAgaW5pdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gZW5kcG9pbnQuY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2gocmVzb3VyY2UsIGluaXQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGByZXNwb25zZS5zdGF0dXMgaXMgJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKCFyZXN1bHQubGVuZ3RoKXsgIC8vIGlmIHRoZXJlIGlzIG5vIGRhdGEgaW4gdGhlIHJlc3VsdCBhcnJheSBoaWRlIHRoZSBjbGVhciBhbGwgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAvLyB1bmhpZGUgY2xlYXIgYWxsIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzcGVjaWFsLWl0ZW1zLWhpZGUnKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiB0aGVyZSBpcyBkYXRhIGluIHRoZSByZXN1bHQgYXJyYXksIGNhcHR1cmUgdGhlIGNhcnRJZCBhbmQgaGlkZSB0aGUgY2xlYXIgYWxsIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY2FydElkID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2FydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzcGVjaWFsLWl0ZW1zLWhpZGUnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRDYXJ0QXBpQ2FsbChlbmRwb2ludCk7XHJcbiAgICB9XHJcbiAgICBjYXJ0UmVtb3Zlcigpe1xyXG4gICAgICAgIGxldCBlbmRwb2ludCA9IHtcclxuICAgICAgICAgICAgcm91dGU6IFwiL2NhcnRzL1wiICsgY2FydElkLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsIFxyXG4gICAgICAgICAgICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAyMDRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVxdWVzdFxyXG5cclxuICAgICAgICBjb25zdCBkZWxldGVDYXJ0Q2FsbCA9IChlbmRwb2ludCwgcmVxdWVzdEJvZHkgPSBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9zdG9yZWZyb250JHtlbmRwb2ludC5yb3V0ZX1gO1xyXG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcclxuICAgICAgICAgICAgICBtZXRob2Q6IGVuZHBvaW50Lm1ldGhvZCxcclxuICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC8vICdYLUF1dGgtVG9rZW4nOiBhY2Nlc3NfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBlbmRwb2ludC5hY2NlcHQsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlcXVlc3RCb2R5KSB7XHJcbiAgICAgICAgICAgICAgaW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpO1xyXG4gICAgICAgICAgICAgIGluaXQuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGVuZHBvaW50LmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlc291cmNlLCBpbml0KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xyXG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdZb3VyIGNhcnQgaXMgbm93IGVtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOyAvLyBvciByZXNwb25zZS50ZXh0KClcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVzcG9uc2Uuc3RhdHVzIGlzICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZUNhcnRDYWxsKGVuZHBvaW50KTtcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwibmFtZXMiOlsiaG9va3MiLCJDYXRhbG9nUGFnZSIsImNvbXBhcmVQcm9kdWN0cyIsIkZhY2V0ZWRTZWFyY2giLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJjYXJ0SWQiLCJyZW1vdmVDYXJ0QnV0dG9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIl90aGlzMiIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiX3RoaXMzIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJjYXJ0Q2hlY2tlciIsImUiLCJhZGRBbGxUb0NhcnQiLCJjYXJ0UmVtb3ZlciIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJzZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIl90aGlzJHZhbGlkYXRpb25EaWN0aSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiY2FyZEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInByb2R1Y3RJZFZhbHVlcyIsImZvckVhY2giLCJjYXJkRWxlbWVudCIsInNwZWNpYWxQcm9kdWN0SWQiLCJnZXRBdHRyaWJ1dGUiLCJwdXNoIiwiZW5kcG9pbnQiLCJyb3V0ZSIsIm1ldGhvZCIsImFjY2VwdCIsInN1Y2Nlc3MiLCJyZXF1ZXN0Qm9keSIsImxpbmVJdGVtcyIsInByb2R1Y3RJZCIsInF1YW50aXR5IiwiYWRkQ2FydEFwaUNhbGwiLCJyZXNvdXJjZSIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiaW5pdCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJhbGVydCIsImpzb24iLCJFcnJvciIsInJlc3VsdCIsImlkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZXJyb3IiLCJjb25zb2xlIiwiZ2V0Q2FydEFwaUNhbGwiLCJhZGQiLCJkZWxldGVDYXJ0Q2FsbCIsImRlZmF1bHQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsImFyZ3VtZW50cyIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=