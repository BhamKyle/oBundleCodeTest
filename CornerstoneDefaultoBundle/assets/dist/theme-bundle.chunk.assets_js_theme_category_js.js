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
    this.secondImageHoverHandler();
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
  _proto.secondImageHoverHandler = function secondImageHoverHandler() {
    var specialCard = document.querySelector('.special-hover');
    console.log(specialCard);
    specialCard.addEventListener('mouseenter', function () {
      // Your code to execute when hovering over the special-hover div
      console.log("Hovering over special-hover div!");
      // Add more code here if needed
    });

    specialCard.addEventListener('mouseleave', function () {
      // Your code to execute when leaving the special-hover div
      console.log("Leaving special-hover div!");
      // Add more code here if needed
    });
  };
  _proto.addAllToCart = function addAllToCart() {
    //get all productId's in special items category

    var cardElements = document.querySelectorAll('.card.special-hover');
    var productIdValues = [];
    cardElements.forEach(function (cardElement) {
      var specialProductId = cardElement.getAttribute('data-entity-id');
      if (specialProductId) {
        productIdValues.push(specialProductId);
      }
    });
    console.log(productIdValues[0]);

    // const apiEndpoint = 'https://api.bigcommerce.com/stores/ammk1evssl/v3/carts';

    var endpoint = {
      // route: "/carts/123abc45-de67-89f0-123a-bcd456ef7890/items", 
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
        console.log(response);
        if (response.status === endpoint.success) {
          window.alert('Product has been added to the cart.');
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {
        console.log(result); // requested data
        // set the new cartId
        cartId = result.id;
        console.log(cartId);
        var removeCartButton = document.getElementById('remove-all-addToCart');
        removeCartButton.classList.remove('special-items-hide');
      })["catch"](function (error) {
        return console.error(error);
      });
    };
    addCartApiCall(endpoint, requestBody);
  };
  _proto.cartChecker = function cartChecker() {
    var removeCartButton = document.getElementById('remove-all-addToCart');
    var endpoint = {
      route: "/carts",
      method: "GET",
      accept: "application/json",
      success: 200
    };
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
        console.log(response);
        if (response.status === endpoint.success) {
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {
        console.log(result); // requested data
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
        console.log(response);
        var removeCartButton = document.getElementById('remove-all-addToCart');
        removeCartButton.classList.add('special-items-hide');
        if (response.status === endpoint.success) {
          window.alert('Your cart is now empty');
          return response.json(); // or response.text()
        } else {
          return new Error("response.status is " + response.status);
        }
      }).then(function (result) {
        console.log(result); // requested data
      })["catch"](function (error) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DO0FBRXZGLElBQU1LLFlBQVksR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3hELElBQUlDLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFFU0MsUUFBUSwwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLFFBQUEsRUFBQUMsWUFBQTtFQUN6QixTQUFBRCxTQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFILFlBQUEsQ0FBQUksSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR1QsbUdBQTJCLENBQUNNLE9BQU8sQ0FBQztJQUFDLE9BQUFDLEtBQUE7RUFDckU7RUFBQyxJQUFBRyxNQUFBLEdBQUFQLFFBQUEsQ0FBQVEsU0FBQTtFQUFBRCxNQUFBLENBRURFLHVCQUF1QixHQUF2QixTQUFBQSx3QkFBd0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxjQUFjLEVBQUU7SUFDeERGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO01BQ1ZDLElBQUksRUFBRUgsUUFBUTtNQUNkLFdBQVcsRUFBRUM7SUFDakIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBTCxNQUFBLENBRURRLCtCQUErQixHQUEvQixTQUFBQSxnQ0FBQSxFQUFrQztJQUFBLElBQUFDLE1BQUE7SUFDOUIsSUFBSSxDQUFDQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ0MsTUFBTSxFQUFFO0lBRXZDLElBQUlELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7TUFDNUNGLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxLQUFLLENBQUMsQ0FBQztJQUMzQztJQUVBSCxDQUFDLENBQUMsa0JBQWtCLENB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aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbmNvbnN0IGFjY2Vzc190b2tlbiA9ICdscGJnNWIyZjk1Y2JlMGY2a2x1bHFkOW11dm5vamE2JzsgLy8gdGhlcmVzIGxpa2VseSBhIG11Y2ggYmV0dGVyIHBsYWNlL21ldGhvZCB0byBzdG9yZSB0aGlzIFxubGV0IGNhcnRJZDsgLy8gaW5pdGlhbGl6aW5nIGZvciBsYXRlciBnbG9iYWwtaXNoIHVzZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgIH1cblxuICAgIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcbiAgICAgICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgICAgICAgICdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICAgICAgaWYgKCEkKCdbZGF0YS1zaG9wLWJ5LXByaWNlXScpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoJ3NwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdhc3NlcnRpdmUnKSk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuICAgICAgICB0aGlzLnNlY29uZEltYWdlSG92ZXJIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuY2FydENoZWNrZXIoKTtcblxuICAgICAgICAkKCcjYWRkLWFsbC1hZGRUb0NhcnQnKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5hZGRBbGxUb0NhcnQoKSk7XG4gICAgICAgICQoJyNyZW1vdmUtYWxsLWFkZFRvQ2FydCcpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLmNhcnRSZW1vdmVyKCkpOyBcblxuICAgICAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCk7XG5cbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG4gICAgfVxuXG4gICAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICAgICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNlY29uZEltYWdlSG92ZXJIYW5kbGVyKCkge1xuICAgICAgICBjb25zdCBzcGVjaWFsQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGVjaWFsLWhvdmVyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNwZWNpYWxDYXJkKTtcblxuICAgICAgICBzcGVjaWFsQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBZb3VyIGNvZGUgdG8gZXhlY3V0ZSB3aGVuIGhvdmVyaW5nIG92ZXIgdGhlIHNwZWNpYWwtaG92ZXIgZGl2XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhvdmVyaW5nIG92ZXIgc3BlY2lhbC1ob3ZlciBkaXYhXCIpO1xuICAgICAgICAgICAgLy8gQWRkIG1vcmUgY29kZSBoZXJlIGlmIG5lZWRlZFxuICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICBzcGVjaWFsQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBZb3VyIGNvZGUgdG8gZXhlY3V0ZSB3aGVuIGxlYXZpbmcgdGhlIHNwZWNpYWwtaG92ZXIgZGl2XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxlYXZpbmcgc3BlY2lhbC1ob3ZlciBkaXYhXCIpO1xuICAgICAgICAgICAgLy8gQWRkIG1vcmUgY29kZSBoZXJlIGlmIG5lZWRlZFxuICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRBbGxUb0NhcnQoKSB7XG5cbiAgICAgICAgLy9nZXQgYWxsIHByb2R1Y3RJZCdzIGluIHNwZWNpYWwgaXRlbXMgY2F0ZWdvcnlcblxuICAgICAgICBsZXQgY2FyZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQuc3BlY2lhbC1ob3ZlcicpO1xuICAgICAgICBsZXQgcHJvZHVjdElkVmFsdWVzID0gW107XG5cbiAgICAgICAgY2FyZEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oY2FyZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzcGVjaWFsUHJvZHVjdElkID0gY2FyZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eS1pZCcpO1xuICAgICAgICAgICAgaWYgKHNwZWNpYWxQcm9kdWN0SWQpIHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkVmFsdWVzLnB1c2goc3BlY2lhbFByb2R1Y3RJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdElkVmFsdWVzWzBdKTtcblxuICAgICAgICAvLyBjb25zdCBhcGlFbmRwb2ludCA9ICdodHRwczovL2FwaS5iaWdjb21tZXJjZS5jb20vc3RvcmVzL2FtbWsxZXZzc2wvdjMvY2FydHMnO1xuXG4gICAgICAgIGxldCBlbmRwb2ludCA9IHtcbiAgICAgICAgICAgIC8vIHJvdXRlOiBcIi9jYXJ0cy8xMjNhYmM0NS1kZTY3LTg5ZjAtMTIzYS1iY2Q0NTZlZjc4OTAvaXRlbXNcIiwgXG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjAwXG4gICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIGxldCByZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWRWYWx1ZXNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWRkQ2FydEFwaUNhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1BdXRoLVRva2VuJzogYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IGVuZHBvaW50LmFjY2VwdCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgaW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgICBpbml0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBlbmRwb2ludC5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChyZXNvdXJjZSwgaW5pdClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ1Byb2R1Y3QgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGNhcnQuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgLy8gb3IgcmVzcG9uc2UudGV4dCgpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVzcG9uc2Uuc3RhdHVzIGlzICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgLy8gcmVxdWVzdGVkIGRhdGFcbiAgICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgY2FydElkXG4gICAgICAgICAgICAgIGNhcnRJZCA9IHJlc3VsdC5pZFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjYXJ0SWQpO1xuICAgICAgICAgICAgICBjb25zdCByZW1vdmVDYXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZS1hbGwtYWRkVG9DYXJ0Jyk7XG4gICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENhcnRBcGlDYWxsKGVuZHBvaW50LCByZXF1ZXN0Qm9keSk7XG4gICAgfVxuICAgIGNhcnRDaGVja2VyKCl7XG4gICAgICAgIGNvbnN0IHJlbW92ZUNhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlLWFsbC1hZGRUb0NhcnQnKTtcblxuICAgICAgICBsZXQgZW5kcG9pbnQgPSB7XG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgXG4gICAgICAgICAgICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjAwXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnZXRDYXJ0QXBpQ2FsbCA9IChlbmRwb2ludCwgcmVxdWVzdEJvZHkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvc3RvcmVmcm9udCR7ZW5kcG9pbnQucm91dGV9YDtcbiAgICAgICAgICAgIGxldCBpbml0ID0ge1xuICAgICAgICAgICAgICBtZXRob2Q6IGVuZHBvaW50Lm1ldGhvZCxcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLUF1dGgtVG9rZW4nOiBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogZW5kcG9pbnQuYWNjZXB0LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICBpbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSk7XG4gICAgICAgICAgICAgIGluaXQuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGVuZHBvaW50LmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlc291cmNlLCBpbml0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8vIHJlcXVlc3RlZCBkYXRhXG4gICAgICAgICAgICAgIGlmKCFyZXN1bHQubGVuZ3RoKXsgIC8vIGlmIHRoZXJlIGlzIG5vIGRhdGEgaW4gdGhlIHJlc3VsdCBhcnJheSBoaWRlIHRoZSBjbGVhciBhbGwgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy8gdW5oaWRlIGNsZWFyIGFsbCBidXR0b25cbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiB0aGVyZSBpcyBkYXRhIGluIHRoZSByZXN1bHQgYXJyYXksIGNhcHR1cmUgdGhlIGNhcnRJZCBhbmQgaGlkZSB0aGUgY2xlYXIgYWxsIGJ1dHRvblxuICAgICAgICAgICAgICAgIGNhcnRJZCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldENhcnRBcGlDYWxsKGVuZHBvaW50KTtcbiAgICB9XG4gICAgY2FydFJlbW92ZXIoKXtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0ge1xuICAgICAgICAgICAgcm91dGU6IFwiL2NhcnRzL1wiICsgY2FydElkLFxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLCBcbiAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiAyMDRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUNhcnRDYWxsID0gKGVuZHBvaW50LCByZXF1ZXN0Qm9keSA9IG51bGwpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9zdG9yZWZyb250JHtlbmRwb2ludC5yb3V0ZX1gO1xuICAgICAgICAgICAgbGV0IGluaXQgPSB7XG4gICAgICAgICAgICAgIG1ldGhvZDogZW5kcG9pbnQubWV0aG9kLFxuICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQXV0aC1Ub2tlbic6IGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBlbmRwb2ludC5hY2NlcHQsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlcXVlc3RCb2R5KSB7XG4gICAgICAgICAgICAgIGluaXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KTtcbiAgICAgICAgICAgICAgaW5pdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gZW5kcG9pbnQuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2gocmVzb3VyY2UsIGluaXQpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlQ2FydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmUtYWxsLWFkZFRvQ2FydCcpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnWW91ciBjYXJ0IGlzIG5vdyBlbXB0eScpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgLy8gcmVxdWVzdGVkIGRhdGFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlQ2FydENhbGwoZW5kcG9pbnQpO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJuYW1lcyI6WyJob29rcyIsIkNhdGFsb2dQYWdlIiwiY29tcGFyZVByb2R1Y3RzIiwiRmFjZXRlZFNlYXJjaCIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImFjY2Vzc190b2tlbiIsImNhcnRJZCIsIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIl90aGlzMiIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiX3RoaXMzIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJzZWNvbmRJbWFnZUhvdmVySGFuZGxlciIsImNhcnRDaGVja2VyIiwiZSIsImFkZEFsbFRvQ2FydCIsImNhcnRSZW1vdmVyIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJzcGVjaWFsQ2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwiY2FyZEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInByb2R1Y3RJZFZhbHVlcyIsImZvckVhY2giLCJjYXJkRWxlbWVudCIsInNwZWNpYWxQcm9kdWN0SWQiLCJnZXRBdHRyaWJ1dGUiLCJwdXNoIiwiZW5kcG9pbnQiLCJyb3V0ZSIsIm1ldGhvZCIsImFjY2VwdCIsInN1Y2Nlc3MiLCJyZXF1ZXN0Qm9keSIsImxpbmVJdGVtcyIsInByb2R1Y3RJZCIsInF1YW50aXR5IiwiYWRkQ2FydEFwaUNhbGwiLCJyZXNvdXJjZSIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiaW5pdCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJhbGVydCIsImpzb24iLCJFcnJvciIsInJlc3VsdCIsImlkIiwicmVtb3ZlQ2FydEJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZXJyb3IiLCJnZXRDYXJ0QXBpQ2FsbCIsImFkZCIsImRlbGV0ZUNhcnRDYWxsIiwiZGVmYXVsdCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiYXJndW1lbnRzIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sInNvdXJjZVJvb3QiOiIifQ==