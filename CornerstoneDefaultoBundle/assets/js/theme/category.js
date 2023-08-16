import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

// with more time, I would find a better way to initialize these global variables and scope them properly 
const access_token = 'lpbg5b2f95cbe0f6klulqd9muvnoja6'; 
let cartId;
const removeCartButton = document.getElementById('remove-all-addToCart'); 

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.arrangeFocusOnSortBy();
        this.cartChecker();

        $('#add-all-addToCart').on('click', (e) => this.addAllToCart());
        $('#remove-all-addToCart').on('click', (e) => this.cartRemover()); 

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
    addAllToCart() {
        //get all productIds in special items category

        let cardElements = document.querySelectorAll('.card.special-hover');
        let productIdValues = [];

        //add product ids to array

        cardElements.forEach(function(cardElement) {
            var specialProductId = cardElement.getAttribute('data-entity-id');
            if (specialProductId) {
              productIdValues.push(specialProductId);
            }
          });

        // configure request

        let endpoint = {
            route: "/carts",
            method: "POST", 
            accept: "application/json",
            content: "application/json",
            success: 200
        }
           
        let requestBody = {
            lineItems: [
                {
                    productId: productIdValues[0],
                    quantity: 1
                }
            ]
        }

        //request

        const addCartApiCall = (endpoint, requestBody = null) => {
            let resource = `${window.location.origin}/api/storefront${endpoint.route}`;
            let init = {
              method: endpoint.method,
              credentials: "same-origin",
              headers: {
                'X-Auth-Token': access_token,
                "Accept": endpoint.accept,
              }
            }
            if(requestBody) {
              init.body = JSON.stringify(requestBody);
              init.headers["Content-Type"] = endpoint.content;
            }
           
            return fetch(resource, init)
            .then(response => {
              if(response.status === endpoint.success) {
                window.alert('Product has been added to the cart.');
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
              // set the new cartId
              cartId = result.id
              removeCartButton.classList.remove('special-items-hide');
            })
            .catch(error => console.error(error));
        }

        addCartApiCall(endpoint, requestBody);
    }
    cartChecker(){
        // configure request

        let endpoint = {
            route: "/carts",
            method: "GET", 
            accept: "application/json",
            success: 200
        }

        //request

        const getCartApiCall = (endpoint, requestBody = null) => {
            let resource = `${window.location.origin}/api/storefront${endpoint.route}`;
            let init = {
              method: endpoint.method,
              credentials: "same-origin",
              headers: {
                'X-Auth-Token': access_token,
                "Accept": endpoint.accept,
              }
            }
            if(requestBody) {
              init.body = JSON.stringify(requestBody);
              init.headers["Content-Type"] = endpoint.content;
            }
           
            return fetch(resource, init)
            .then(response => {
              if(response.status === endpoint.success) {
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
              if(!result.length){  // if there is no data in the result array hide the clear all button
                // unhide clear all button
                removeCartButton.classList.add('special-items-hide');
              } else { // if there is data in the result array, capture the cartId and hide the clear all button
                cartId = result;
                removeCartButton.classList.remove('special-items-hide');
              }
            })
            .catch(error => console.error(error));
        }

        getCartApiCall(endpoint);
    }
    cartRemover(){
        let endpoint = {
            route: "/carts/" + cartId,
            method: "DELETE", 
            accept: "application/json",
            success: 204
        }

        //request

        const deleteCartCall = (endpoint, requestBody = null) => {
            let resource = `${window.location.origin}/api/storefront${endpoint.route}`;
            let init = {
              method: endpoint.method,
              credentials: "same-origin",
              headers: {
                'X-Auth-Token': access_token,
                "Accept": endpoint.accept,
              }
            }
            if(requestBody) {
              init.body = JSON.stringify(requestBody);
              init.headers["Content-Type"] = endpoint.content;
            }
           
            return fetch(resource, init)
            .then(response => {
                removeCartButton.classList.add('special-items-hide');
              if(response.status === endpoint.success) {
                window.alert('Your cart is now empty');
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
            })
            .catch(error => console.error(error));
        }

        deleteCartCall(endpoint);
    }
}
