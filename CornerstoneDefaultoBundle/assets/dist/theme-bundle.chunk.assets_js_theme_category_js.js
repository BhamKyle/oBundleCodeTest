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





var access_token = 'lpbg5b2f95cbe0f6klulqd9muvnoja6'; // theres likely a much better place/method to store this 
var cartId; // initializing for later global-ish use
var removeCartButton = document.getElementById('remove-all-addToCart'); // initializing for later global-ish use
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DO0FBRXZGLElBQU1LLFlBQVksR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3hELElBQUlDLE1BQU0sQ0FBQyxDQUFDO0FBQ1osSUFBTUMsZ0JBQWdCLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztBQUFBLElBRXJEQyxRQUFRLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsUUFBQSxFQUFBQyxZQUFBO0VBQ3pCLFNBQUFELFNBQVlHLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakJBLEtBQUEsR0FBQUgsWUFBQSxDQUFBSSxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHWixtR0FBMkIsQ0FBQ1MsT0FBTyxDQUFDO0lBQUMsT0FBQUMsS0FBQTtFQUNyRTtFQUFDLElBQUFHLE1BQUEsR0FBQVAsUUFBQSxDQUFBUSxTQUFBO0VBQUFELE1BQUEsQ0FFREUsdUJBQXVCLEdBQXZCLFNBQUFBLHdCQUF3QkMsUUFBUSxFQUFFQyxRQUFRLEVBQUVDLGNBQWMsRUFBRTtJQUN4REYsUUFBUSxDQUFDRyxJQUFJLENBQUM7TUFDVkMsSUFBSSxFQUFFSCxRQUFRO01BQ2QsV0FBVyxFQUFFQztJQUNqQixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUFMLE1BQUEsQ0FFRFEsK0JBQStCLEdBQS9CLFNBQUFBLGdDQUFBLEVBQWtDO0lBQUEsSUFBQUMsTUFBQTtJQUM5QixJQUFJLENBQUNDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7SUFFdkMsSUFBSUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUM1Q0YsQ0FBQyxD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ZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbmNvbnN0IGFjY2Vzc190b2tlbiA9ICdscGJnNWIyZjk1Y2JlMGY2a2x1bHFkOW11dm5vamE2JzsgLy8gdGhlcmVzIGxpa2VseSBhIG11Y2ggYmV0dGVyIHBsYWNlL21ldGhvZCB0byBzdG9yZSB0aGlzIFxubGV0IGNhcnRJZDsgLy8gaW5pdGlhbGl6aW5nIGZvciBsYXRlciBnbG9iYWwtaXNoIHVzZVxuY29uc3QgcmVtb3ZlQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmUtYWxsLWFkZFRvQ2FydCcpOyAvLyBpbml0aWFsaXppbmcgZm9yIGxhdGVyIGdsb2JhbC1pc2ggdXNlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgICAgICBpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLCAnc3RhdHVzJywgJ2Fzc2VydGl2ZScpKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG4gICAgICAgIHRoaXMuY2FydENoZWNrZXIoKTtcblxuICAgICAgICAkKCcjYWRkLWFsbC1hZGRUb0NhcnQnKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5hZGRBbGxUb0NhcnQoKSk7XG4gICAgICAgICQoJyNyZW1vdmUtYWxsLWFkZFRvQ2FydCcpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLmNhcnRSZW1vdmVyKCkpOyBcblxuICAgICAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCk7XG5cbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG4gICAgfVxuXG4gICAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICAgICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEFsbFRvQ2FydCgpIHtcbiAgICAgICAgLy9nZXQgYWxsIHByb2R1Y3RJZHMgaW4gc3BlY2lhbCBpdGVtcyBjYXRlZ29yeVxuXG4gICAgICAgIGxldCBjYXJkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC5zcGVjaWFsLWhvdmVyJyk7XG4gICAgICAgIGxldCBwcm9kdWN0SWRWYWx1ZXMgPSBbXTtcblxuICAgICAgICAvL2FkZCBwcm9kdWN0IGlkcyB0byBhcnJheVxuXG4gICAgICAgIGNhcmRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNhcmRFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgc3BlY2lhbFByb2R1Y3RJZCA9IGNhcmRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1lbnRpdHktaWQnKTtcbiAgICAgICAgICAgIGlmIChzcGVjaWFsUHJvZHVjdElkKSB7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZFZhbHVlcy5wdXNoKHNwZWNpYWxQcm9kdWN0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNvbmZpZ3VyZSByZXF1ZXN0XG5cbiAgICAgICAgbGV0IGVuZHBvaW50ID0ge1xuICAgICAgICAgICAgcm91dGU6IFwiL2NhcnRzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLCBcbiAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBjb250ZW50OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IDIwMFxuICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICBsZXQgcmVxdWVzdEJvZHkgPSB7XG4gICAgICAgICAgICBsaW5lSXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkVmFsdWVzWzBdLFxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vcmVxdWVzdFxuXG4gICAgICAgIGNvbnN0IGFkZENhcnRBcGlDYWxsID0gKGVuZHBvaW50LCByZXF1ZXN0Qm9keSA9IG51bGwpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9zdG9yZWZyb250JHtlbmRwb2ludC5yb3V0ZX1gO1xuICAgICAgICAgICAgbGV0IGluaXQgPSB7XG4gICAgICAgICAgICAgIG1ldGhvZDogZW5kcG9pbnQubWV0aG9kLFxuICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQXV0aC1Ub2tlbic6IGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBlbmRwb2ludC5hY2NlcHQsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlcXVlc3RCb2R5KSB7XG4gICAgICAgICAgICAgIGluaXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KTtcbiAgICAgICAgICAgICAgaW5pdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gZW5kcG9pbnQuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2gocmVzb3VyY2UsIGluaXQpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnUHJvZHVjdCBoYXMgYmVlbiBhZGRlZCB0byB0aGUgY2FydC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOyAvLyBvciByZXNwb25zZS50ZXh0KClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGByZXNwb25zZS5zdGF0dXMgaXMgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAvLyBzZXQgdGhlIG5ldyBjYXJ0SWRcbiAgICAgICAgICAgICAgY2FydElkID0gcmVzdWx0LmlkXG4gICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENhcnRBcGlDYWxsKGVuZHBvaW50LCByZXF1ZXN0Qm9keSk7XG4gICAgfVxuICAgIGNhcnRDaGVja2VyKCl7XG4gICAgICAgIC8vIGNvbmZpZ3VyZSByZXF1ZXN0XG5cbiAgICAgICAgbGV0IGVuZHBvaW50ID0ge1xuICAgICAgICAgICAgcm91dGU6IFwiL2NhcnRzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsIFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IDIwMFxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXF1ZXN0XG5cbiAgICAgICAgY29uc3QgZ2V0Q2FydEFwaUNhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1BdXRoLVRva2VuJzogYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IGVuZHBvaW50LmFjY2VwdCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgaW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgICBpbml0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBlbmRwb2ludC5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChyZXNvdXJjZSwgaW5pdClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSBlbmRwb2ludC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgLy8gb3IgcmVzcG9uc2UudGV4dCgpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVzcG9uc2Uuc3RhdHVzIGlzICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgaWYoIXJlc3VsdC5sZW5ndGgpeyAgLy8gaWYgdGhlcmUgaXMgbm8gZGF0YSBpbiB0aGUgcmVzdWx0IGFycmF5IGhpZGUgdGhlIGNsZWFyIGFsbCBidXR0b25cbiAgICAgICAgICAgICAgICAvLyB1bmhpZGUgY2xlYXIgYWxsIGJ1dHRvblxuICAgICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGlmIHRoZXJlIGlzIGRhdGEgaW4gdGhlIHJlc3VsdCBhcnJheSwgY2FwdHVyZSB0aGUgY2FydElkIGFuZCBoaWRlIHRoZSBjbGVhciBhbGwgYnV0dG9uXG4gICAgICAgICAgICAgICAgY2FydElkID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Q2FydEFwaUNhbGwoZW5kcG9pbnQpO1xuICAgIH1cbiAgICBjYXJ0UmVtb3Zlcigpe1xuICAgICAgICBsZXQgZW5kcG9pbnQgPSB7XG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHMvXCIgKyBjYXJ0SWQsXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsIFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IDIwNFxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXF1ZXN0XG5cbiAgICAgICAgY29uc3QgZGVsZXRlQ2FydENhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1BdXRoLVRva2VuJzogYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IGVuZHBvaW50LmFjY2VwdCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgaW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgICBpbml0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBlbmRwb2ludC5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChyZXNvdXJjZSwgaW5pdClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ1lvdXIgY2FydCBpcyBub3cgZW1wdHknKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOyAvLyBvciByZXNwb25zZS50ZXh0KClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGByZXNwb25zZS5zdGF0dXMgaXMgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGVDYXJ0Q2FsbChlbmRwb2ludCk7XG4gICAgfVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sIm5hbWVzIjpbImhvb2tzIiwiQ2F0YWxvZ1BhZ2UiLCJjb21wYXJlUHJvZHVjdHMiLCJGYWNldGVkU2VhcmNoIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiYWNjZXNzX3Rva2VuIiwiY2FydElkIiwicmVtb3ZlQ2FydEJ1dHRvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJDYXRlZ29yeSIsIl9DYXRhbG9nUGFnZSIsIl9pbmhlcml0c0xvb3NlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiY2FydENoZWNrZXIiLCJlIiwiYWRkQWxsVG9DYXJ0IiwiY2FydFJlbW92ZXIiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsImNhcmRFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9kdWN0SWRWYWx1ZXMiLCJmb3JFYWNoIiwiY2FyZEVsZW1lbnQiLCJzcGVjaWFsUHJvZHVjdElkIiwiZ2V0QXR0cmlidXRlIiwicHVzaCIsImVuZHBvaW50Iiwicm91dGUiLCJtZXRob2QiLCJhY2NlcHQiLCJzdWNjZXNzIiwicmVxdWVzdEJvZHkiLCJsaW5lSXRlbXMiLCJwcm9kdWN0SWQiLCJxdWFudGl0eSIsImFkZENhcnRBcGlDYWxsIiwicmVzb3VyY2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsImluaXQiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiYWxlcnQiLCJqc29uIiwiRXJyb3IiLCJyZXN1bHQiLCJpZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImVycm9yIiwiY29uc29sZSIsImdldENhcnRBcGlDYWxsIiwiYWRkIiwiZGVsZXRlQ2FydENhbGwiLCJkZWZhdWx0IiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJwYXJzZSIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwic291cmNlUm9vdCI6IiJ9