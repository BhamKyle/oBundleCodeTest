# oBundleCodeTest
Code Test for oBundle 

**Overview:**

* Hours Taken: 6
* BigCommerce URL: https://obundletest.mybigcommerce.com/?showStore=yes&ctk=f684cd02-2029-4880-8483-ddaac7fa2c2d&_gl=1*pfx9oy*_ga*OTg4NTE1MjAxLjE2OTE4Nzc4Mjg.*_ga_WS2VZYPC6G*MTY5MjIyMjY3Mi45LjEuMTY5MjIyMjcwMy4yOS4wLjA.
* BigCommerce Preview Code: p7j8ymtelh

Thank you for the opportunity to show my skills and apply for your open position. I took about 6 hours to complete this challenge. 

This challenge was to show that I could learn a new ecommerce framework quickly and without much trouble. I enjoyed the tasks and found it to be an engaging challenge. 

I learned that BigCommerce and Stencil have extensive built-in tools that I just barely scratched the surface on as I completed each of the tasks. 

**My process:**

I spent most of my time initially reading the BigCommerce documentation and going through the file structure to get familiarized. 

I broke down the code challenge into 16 distinct steps:

1. sign up for bigcommerce trial store
2. install stencil cli for local development using default cornerstone theme
3. create a product called Special Item which is assigned to a new category called Special Items
4. add at least 2 images to product creation
5. special item should be only item which shows in the category
6. connect local to github
7. create a feature that will show the product’s second image when its hovered
8. add a button on top of category page labeled add all to cart
9. when clicked the button product will be added to the cart using storefront API
10. notify the user that the product has been added
11. if the cart has an item in it, show a button next to the add all to cart button which says remove all items, using storefront API
12. when clicked, it should clear the cart and notify the user
13. create a github repo for codebase 
14. add a readme file that removes current data and add your own which describes a brief overview of the test
15. include preview code for bigcommerce store, along with URL in readme 
16. reply to this email with github repo link

**Notes:**

I got stuck on the image hover, normally I would just locate the JS object from a composite listing API and source it directly in JS, but I discovered that the objects are available as arrays in the handlebar templating. 

I had only used Mustache templating, so this was a bit of a learning curve

The storefront API and documetation are extremely straightforward 

**If I had more time I would:**

* explore the objects available on each page and their scoping
* comment more of my code for later re-use
* find a better way to scope the global variables on category.js
* add a conditional to the responsive image so it only changes to second image for the special items category
* add report.html and theme-bundle.chunk.assets files in git.ignore
* use something like a toast notification instead of a basic alert (i thought about hijacking the search dropdown with a fadeout) but my solution satisfies the requirements
* add a check to see if the cart already exists, if so, just add items to it, if not, create a cart, so my solution is likely a bit brittle
* attempt the extra credit portion
