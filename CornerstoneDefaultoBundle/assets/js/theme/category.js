import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

const access_token = 'lpbg5b2f95cbe0f6klulqd9muvnoja6'; // theres likely a much better place/method to store this 
let cartId; // initializing for later global-ish use

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
        this.secondImageHoverHandler();
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
    secondImageHoverHandler() {
        const specialCard = document.querySelector('.special-hover');
        console.log(specialCard);

        specialCard.addEventListener('mouseenter', function() {
            // Your code to execute when hovering over the special-hover div
            console.log("Hovering over special-hover div!");
            // Add more code here if needed
          });
        
          specialCard.addEventListener('mouseleave', function() {
            // Your code to execute when leaving the special-hover div
            console.log("Leaving special-hover div!");
            // Add more code here if needed
          });
    }
    addAllToCart() {

        //get all productId's in special items category

        let cardElements = document.querySelectorAll('.card.special-hover');
        let productIdValues = [];

        cardElements.forEach(function(cardElement) {
            var specialProductId = cardElement.getAttribute('data-entity-id');
            if (specialProductId) {
              productIdValues.push(specialProductId);
            }
          });

        console.log(productIdValues[0]);

        // const apiEndpoint = 'https://api.bigcommerce.com/stores/ammk1evssl/v3/carts';

        let endpoint = {
            // route: "/carts/123abc45-de67-89f0-123a-bcd456ef7890/items", 
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
              console.log(response);
              if(response.status === endpoint.success) {
                window.alert('Product has been added to the cart.');
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
              console.log(result); // requested data
              // set the new cartId
              cartId = result.id
              console.log(cartId);
              const removeCartButton = document.getElementById('remove-all-addToCart');
              removeCartButton.classList.remove('special-items-hide');
            })
            .catch(error => console.error(error));
        }

        addCartApiCall(endpoint, requestBody);
    }
    cartChecker(){
        const removeCartButton = document.getElementById('remove-all-addToCart');

        let endpoint = {
            route: "/carts",
            method: "GET", 
            accept: "application/json",
            success: 200
        }

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
              console.log(response);
              if(response.status === endpoint.success) {
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
              console.log(result); // requested data
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
              console.log(response);
              const removeCartButton = document.getElementById('remove-all-addToCart');
                removeCartButton.classList.add('special-items-hide');
              if(response.status === endpoint.success) {
                window.alert('Your cart is now empty');
                return response.json(); // or response.text()
              } else {
                return new Error(`response.status is ${response.status}`);
              }
            })
            .then(result => {
                console.log(result); // requested data
            })
            .catch(error => console.error(error));
        }

        deleteCartCall(endpoint);
    }
}
