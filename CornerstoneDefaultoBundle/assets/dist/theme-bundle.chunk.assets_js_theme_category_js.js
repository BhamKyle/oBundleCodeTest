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
    this.productChecker();
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
    //get all productId's in special items category

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
        console.log(response);
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
  _proto.productChecker = function productChecker() {
    // https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}

    var store_hash = 'ammk1evssl';
    var endpoint = {
      route: "/catalog/products/" + 112,
      //hardcoded product ID
      method: "GET",
      accept: "application/json",
      success: 200
    };

    //request

    var getProductObject = function getProductObject(endpoint, requestBody) {
      if (requestBody === void 0) {
        requestBody = null;
      }
      var resource = "https://api.bigcommerce.com/stores/" + store_hash + "/v3" + endpoint.route;
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
        console.log(result);
      })["catch"](function (error) {
        return console.error(error);
      });
    };
    getProductObject(endpoint);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRlZ29yeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DO0FBRXZGLElBQU1LLFlBQVksR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3hELElBQUlDLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFFU0MsUUFBUSwwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLFFBQUEsRUFBQUMsWUFBQTtFQUN6QixTQUFBRCxTQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFILFlBQUEsQ0FBQUksSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR1QsbUdBQTJCLENBQUNNLE9BQU8sQ0FBQztJQUFDLE9BQUFDLEtBQUE7RUFDckU7RUFBQyxJQUFBRyxNQUFBLEdBQUFQLFFBQUEsQ0FBQVEsU0FBQTtFQUFBRCxNQUFBLENBRURFLHVCQUF1QixHQUF2QixTQUFBQSx3QkFBd0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxjQUFjLEVBQUU7SUFDeERGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO01BQ1ZDLElBQUksRUFBRUgsUUFBUTtNQUNkLFdBQVcsRUFBRUM7SUFDakIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBTCxNQUFBLENBRURRLCtCQUErQixHQUEvQixTQUFBQSxnQ0FBQSxFQUFrQztJQUFBLElBQUFDLE1BQUE7SUFDOUIsSUFBSSxDQUFDQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ0MsTUFBTSxFQUFFO0lBRXZDLElBQUlELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7TUFDNUNGLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxLQUFLLENBQUMsQ0FBQztJQUMzQztJQUVBSCxDQUFDLENBQUMsa0JBQWtCLENB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QkEsMkJBQTJCQSxDQUFJTSxPQUFPLEVBQUs7RUFDcEQsSUFBUWlJLHdCQUF3QixHQUF3RWpJLE9BQU8sQ0FBdkdpSSx3QkFBd0I7SUFBRUMsZ0NBQWdDLEdBQXNDbEksT0FBTyxDQUE3RWtJLGdDQUFnQztJQUFFQywrQkFBK0IsR0FBS25JLE9BQU8sQ0FBM0NtSSwrQkFBK0I7RUFDbkcsSUFBTUMsZ0JBQWdCLEdBQUdSLHNCQUFzQixDQUFDSyx3QkFBd0IsRUFBRUMsZ0NBQWdDLEVBQUVDLCtCQUErQixDQUFDO0VBQzVJLElBQU1FLGFBQWEsR0FBR1gsTUFBTSxDQUFDWSxNQUFNLENBQUNGLGdCQUFnQixDQUFDYixZQUFZLENBQUMsQ0FBQztFQUNuRSxJQUFNZ0IsZUFBZSxHQUFHYixNQUFNLENBQUNDLElBQUksQ0FBQ1MsZ0JBQWdCLENBQUNiLFlBQVksQ0FBQyxDQUFDLENBQUNpQixHQUFHLENBQUMsVUFBQUMsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQztFQUFBLEVBQUM7RUFFcEcsT0FBT0osZUFBZSxDQUFDSyxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFSixHQUFHLEVBQUVaLENBQUMsRUFBSztJQUMzQ2dCLEdBQUcsQ0FBQ0osR0FBRyxDQUFDLEdBQUdKLGFBQWEsQ0FBQ1IsQ0FBQyxDQUFDO0lBQzNCLE9BQU9nQixHQUFHO0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhdGVnb3J5LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcblxuY29uc3QgYWNjZXNzX3Rva2VuID0gJ2xwYmc1YjJmOTVjYmUwZjZrbHVscWQ5bXV2bm9qYTYnOyAvLyB0aGVyZXMgbGlrZWx5IGEgbXVjaCBiZXR0ZXIgcGxhY2UvbWV0aG9kIHRvIHN0b3JlIHRoaXMgXG5sZXQgY2FydElkOyAvLyBpbml0aWFsaXppbmcgZm9yIGxhdGVyIGdsb2JhbC1pc2ggdXNlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgICAgICBpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLCAnc3RhdHVzJywgJ2Fzc2VydGl2ZScpKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG4gICAgICAgIHRoaXMuc2Vjb25kSW1hZ2VIb3ZlckhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5jYXJ0Q2hlY2tlcigpO1xuICAgICAgICB0aGlzLnByb2R1Y3RDaGVja2VyKCk7XG5cbiAgICAgICAgJCgnI2FkZC1hbGwtYWRkVG9DYXJ0Jykub24oJ2NsaWNrJywgKGUpID0+IHRoaXMuYWRkQWxsVG9DYXJ0KCkpO1xuICAgICAgICAkKCcjcmVtb3ZlLWFsbC1hZGRUb0NhcnQnKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5jYXJ0UmVtb3ZlcigpKTsgXG5cbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICAgIH1cblxuICAgIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgICAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKCdbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dJyk7XG4gICAgICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRBbGxUb0NhcnQoKSB7XG4gICAgICAgIC8vZ2V0IGFsbCBwcm9kdWN0SWQncyBpbiBzcGVjaWFsIGl0ZW1zIGNhdGVnb3J5XG5cbiAgICAgICAgbGV0IGNhcmRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkLnNwZWNpYWwtaG92ZXInKTtcbiAgICAgICAgbGV0IHByb2R1Y3RJZFZhbHVlcyA9IFtdO1xuXG4gICAgICAgIC8vYWRkIHByb2R1Y3QgaWRzIHRvIGFycmF5XG5cbiAgICAgICAgY2FyZEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oY2FyZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzcGVjaWFsUHJvZHVjdElkID0gY2FyZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eS1pZCcpO1xuICAgICAgICAgICAgaWYgKHNwZWNpYWxQcm9kdWN0SWQpIHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkVmFsdWVzLnB1c2goc3BlY2lhbFByb2R1Y3RJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uZmlndXJlIHJlcXVlc3RcblxuICAgICAgICBsZXQgZW5kcG9pbnQgPSB7XG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsIFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjAwXG4gICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgIGxldCByZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWRWYWx1ZXNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXF1ZXN0XG5cbiAgICAgICAgY29uc3QgYWRkQ2FydEFwaUNhbGwgPSAoZW5kcG9pbnQsIHJlcXVlc3RCb2R5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL3N0b3JlZnJvbnQke2VuZHBvaW50LnJvdXRlfWA7XG4gICAgICAgICAgICBsZXQgaW5pdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBlbmRwb2ludC5tZXRob2QsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1BdXRoLVRva2VuJzogYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IGVuZHBvaW50LmFjY2VwdCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgaW5pdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpO1xuICAgICAgICAgICAgICBpbml0LmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBlbmRwb2ludC5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChyZXNvdXJjZSwgaW5pdClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ1Byb2R1Y3QgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGNhcnQuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgLy8gb3IgcmVzcG9uc2UudGV4dCgpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVzcG9uc2Uuc3RhdHVzIGlzICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgLy8gcmVxdWVzdGVkIGRhdGFcbiAgICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgY2FydElkXG4gICAgICAgICAgICAgIGNhcnRJZCA9IHJlc3VsdC5pZFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjYXJ0SWQpO1xuICAgICAgICAgICAgICBjb25zdCByZW1vdmVDYXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZS1hbGwtYWRkVG9DYXJ0Jyk7XG4gICAgICAgICAgICAgIHJlbW92ZUNhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc3BlY2lhbC1pdGVtcy1oaWRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENhcnRBcGlDYWxsKGVuZHBvaW50LCByZXF1ZXN0Qm9keSk7XG4gICAgfVxuICAgIGNhcnRDaGVja2VyKCl7XG4gICAgICAgIGNvbnN0IHJlbW92ZUNhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlLWFsbC1hZGRUb0NhcnQnKTtcblxuICAgICAgICBsZXQgZW5kcG9pbnQgPSB7XG4gICAgICAgICAgICByb3V0ZTogXCIvY2FydHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiwgXG4gICAgICAgICAgICBhY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogMjAwXG4gICAgICAgIH1cblxuICAgICAgICAvL3JlcXVlc3RcblxuICAgICAgICBjb25zdCBnZXRDYXJ0QXBpQ2FsbCA9IChlbmRwb2ludCwgcmVxdWVzdEJvZHkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvc3RvcmVmcm9udCR7ZW5kcG9pbnQucm91dGV9YDtcbiAgICAgICAgICAgIGxldCBpbml0ID0ge1xuICAgICAgICAgICAgICBtZXRob2Q6IGVuZHBvaW50Lm1ldGhvZCxcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdYLUF1dGgtVG9rZW4nOiBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogZW5kcG9pbnQuYWNjZXB0LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICBpbml0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSk7XG4gICAgICAgICAgICAgIGluaXQuaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IGVuZHBvaW50LmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHJlc291cmNlLCBpbml0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gZW5kcG9pbnQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7IC8vIG9yIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlc3BvbnNlLnN0YXR1cyBpcyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIGlmKCFyZXN1bHQubGVuZ3RoKXsgIC8vIGlmIHRoZXJlIGlzIG5vIGRhdGEgaW4gdGhlIHJlc3VsdCBhcnJheSBoaWRlIHRoZSBjbGVhciBhbGwgYnV0dG9uXG4gICAgICAgICAgICAgICAgLy8gdW5oaWRlIGNsZWFyIGFsbCBidXR0b25cbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xuICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiB0aGVyZSBpcyBkYXRhIGluIHRoZSByZXN1bHQgYXJyYXksIGNhcHR1cmUgdGhlIGNhcnRJZCBhbmQgaGlkZSB0aGUgY2xlYXIgYWxsIGJ1dHRvblxuICAgICAgICAgICAgICAgIGNhcnRJZCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldENhcnRBcGlDYWxsKGVuZHBvaW50KTtcbiAgICB9XG4gICAgY2FydFJlbW92ZXIoKXtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0ge1xuICAgICAgICAgICAgcm91dGU6IFwiL2NhcnRzL1wiICsgY2FydElkLFxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLCBcbiAgICAgICAgICAgIGFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiAyMDRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcmVxdWVzdFxuXG4gICAgICAgIGNvbnN0IGRlbGV0ZUNhcnRDYWxsID0gKGVuZHBvaW50LCByZXF1ZXN0Qm9keSA9IG51bGwpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9zdG9yZWZyb250JHtlbmRwb2ludC5yb3V0ZX1gO1xuICAgICAgICAgICAgbGV0IGluaXQgPSB7XG4gICAgICAgICAgICAgIG1ldGhvZDogZW5kcG9pbnQubWV0aG9kLFxuICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQXV0aC1Ub2tlbic6IGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBlbmRwb2ludC5hY2NlcHQsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlcXVlc3RCb2R5KSB7XG4gICAgICAgICAgICAgIGluaXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KTtcbiAgICAgICAgICAgICAgaW5pdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gZW5kcG9pbnQuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2gocmVzb3VyY2UsIGluaXQpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUNhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlLWFsbC1hZGRUb0NhcnQnKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDYXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NwZWNpYWwtaXRlbXMtaGlkZScpO1xuICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IGVuZHBvaW50LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ1lvdXIgY2FydCBpcyBub3cgZW1wdHknKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOyAvLyBvciByZXNwb25zZS50ZXh0KClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGByZXNwb25zZS5zdGF0dXMgaXMgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8vIHJlcXVlc3RlZCBkYXRhXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZUNhcnRDYWxsKGVuZHBvaW50KTtcbiAgICB9XG4gICAgcHJvZHVjdENoZWNrZXIoKXtcbiAgICAgICAgLy8gaHR0cHM6Ly9hcGkuYmlnY29tbWVyY2UuY29tL3N0b3Jlcy97c3RvcmVfaGFzaH0vdjMvY2F0YWxvZy9wcm9kdWN0cy97cHJvZHVjdF9pZH1cblxuICAgICAgICBsZXQgc3RvcmVfaGFzaCA9ICdhbW1rMWV2c3NsJ1xuXG4gICAgICAgIGxldCBlbmRwb2ludCA9IHtcbiAgICAgICAgICAgIHJvdXRlOiBcIi9jYXRhbG9nL3Byb2R1Y3RzL1wiICsgMTEyLCAvL2hhcmRjb2RlZCBwcm9kdWN0IElEXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsIFxuICAgICAgICAgICAgYWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IDIwMFxuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXF1ZXN0XG5cbiAgICAgICAgY29uc3QgZ2V0UHJvZHVjdE9iamVjdCA9IChlbmRwb2ludCwgcmVxdWVzdEJvZHkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBgaHR0cHM6Ly9hcGkuYmlnY29tbWVyY2UuY29tL3N0b3Jlcy8ke3N0b3JlX2hhc2h9L3YzJHtlbmRwb2ludC5yb3V0ZX1gO1xuICAgICAgICAgICAgbGV0IGluaXQgPSB7XG4gICAgICAgICAgICAgIG1ldGhvZDogZW5kcG9pbnQubWV0aG9kLFxuICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ1gtQXV0aC1Ub2tlbic6IGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBlbmRwb2ludC5hY2NlcHQsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlcXVlc3RCb2R5KSB7XG4gICAgICAgICAgICAgIGluaXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KTtcbiAgICAgICAgICAgICAgaW5pdC5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gZW5kcG9pbnQuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2gocmVzb3VyY2UsIGluaXQpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSBlbmRwb2ludC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTsgLy8gb3IgcmVzcG9uc2UudGV4dCgpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgcmVzcG9uc2Uuc3RhdHVzIGlzICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm9kdWN0T2JqZWN0KGVuZHBvaW50KTtcbiAgICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwibmFtZXMiOlsiaG9va3MiLCJDYXRhbG9nUGFnZSIsImNvbXBhcmVQcm9kdWN0cyIsIkZhY2V0ZWRTZWFyY2giLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJhY2Nlc3NfdG9rZW4iLCJjYXJ0SWQiLCJDYXRlZ29yeSIsIl9DYXRhbG9nUGFnZSIsIl9pbmhlcml0c0xvb3NlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5Iiwic2Vjb25kSW1hZ2VIb3ZlckhhbmRsZXIiLCJjYXJ0Q2hlY2tlciIsInByb2R1Y3RDaGVja2VyIiwiZSIsImFkZEFsbFRvQ2FydCIsImNhcnRSZW1vdmVyIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJjYXJkRWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9kdWN0SWRWYWx1ZXMiLCJmb3JFYWNoIiwiY2FyZEVsZW1lbnQiLCJzcGVjaWFsUHJvZHVjdElkIiwiZ2V0QXR0cmlidXRlIiwicHVzaCIsImVuZHBvaW50Iiwicm91dGUiLCJtZXRob2QiLCJhY2NlcHQiLCJzdWNjZXNzIiwicmVxdWVzdEJvZHkiLCJsaW5lSXRlbXMiLCJwcm9kdWN0SWQiLCJxdWFudGl0eSIsImFkZENhcnRBcGlDYWxsIiwicmVzb3VyY2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsImluaXQiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInN0YXR1cyIsImFsZXJ0IiwianNvbiIsIkVycm9yIiwicmVzdWx0IiwiaWQiLCJyZW1vdmVDYXJ0QnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJlcnJvciIsImdldENhcnRBcGlDYWxsIiwiYWRkIiwiZGVsZXRlQ2FydENhbGwiLCJzdG9yZV9oYXNoIiwiZ2V0UHJvZHVjdE9iamVjdCIsImRlZmF1bHQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsImFyZ3VtZW50cyIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=