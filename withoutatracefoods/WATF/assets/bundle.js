Bundle = {
      Defaults: {
        // Convenience functions to reference various important divs within the build.
        // If you structure your HTML differently than our example build, you can alter these
        // functions to reference the correct divs.
        getBundleDiv: function () {
          return $(".bundle");
        },
        getBundleGridDiv: function () {
          return Bundle.Defaults.getBundleDiv().find(".bundle-grid");
        },
        getBundleDetailsDiv: function () {
          return Bundle.Defaults.getBundleDiv().find(".bundle-details");
        },
        getAddToCartDiv: function () {
          return $("#bundle-add-to-cart");
        },
      },
      Utils: {
        // Utilty functions used throughout the rest of the build
        generateGuid: function () {
          // Generates a unique guid to be used for the bundle_id
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
              var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            }
          );
        },
        calculateBundleQuantity: function ($bundle) {
          // Calculates the total number of items selected on the page.
          // Will loop through all grid items and sum up the total bundle
          // quantity based on the data-qty attribute of each variant.
          // 1.) $bundle = top level bundle div of the grid matrix
          var bundle_qty = 0;
          $bundle.find(".bundle-item").each(function () {
            bundle_qty += Number($(this).attr("data-qty"));
          });
          return bundle_qty;
        },
        calculateBundlePrice: function ($bundle) {
            // Calculates the total number of items selected on the page.
            // Will loop through all grid items and sum up the total bundle
            // quantity based on the data-qty attribute of each variant.
            // 1.) $bundle = top level bundle div of the grid matrix
            var bundle_price = 0;
            $bundle.find(".bundle-item").each(function () {
              bundle_price += Number($(this).attr("data-price")) * Number($(this).attr("data-qty"));
            });
            return bundle_price;
          },
        updateBundleQuantity: function ($item, increment) {
          // Main function to handle quantity manipulation. Pass in the grid
          // item along with the quantity to increment or decrement. Then it will
          // determine the current and new item/bundle quantities. Then it checks
          // constraints, and if valid, update all necessary data attributes,
          // interface output, and enable/disable any buttons.
          // 1.) $item = the clicked plus or minus .bundle-item parent div
          // 2.) increment = the amount to increase or decrease the quantity
          // Get bundle parent reference and min/max numbers
          var $bundle = $item.closest(".bundle-grid");
          var bundle_min = Number($bundle.attr("data-bundle-min"));
          var bundle_max = Number($bundle.attr("data-bundle-max"));
          // Calculate current item and bundle quantity
          var bundle_qty = Bundle.Utils.calculateBundleQuantity($bundle);
          var total_price = Bundle.Utils.calculateBundlePrice($bundle);
          var item_qty = Number($item.attr("data-qty"));
          var item_price = Number($item.attr("data-price"));
          // Calculate the new bundle and item quantities with the increment added
          var new_bundle_qty = bundle_qty + increment;
          var new_item_qty = item_qty + increment;
          var newtotal_price = total_price + item_price * increment;
          // Check constraints to make sure we can perform the action
          if (
            Bundle.Constraints.isItemGreaterThanZero(new_item_qty) &&
            Bundle.Constraints.isBundleGreaterThanMin(new_bundle_qty, bundle_min) &&
            Bundle.Constraints.isBundleLessThanMax(new_bundle_qty, bundle_max)
          ) {
            //Update quantities
            $item.attr("data-qty", new_item_qty);
            $item.find(".quantity").html(new_item_qty);
            $(".current-qty").html(new_bundle_qty);
            //Toggle the Add to Cart Button if max items is reached
            var is_disabled = Bundle.Constraints.isBundleEqualMax(
              new_bundle_qty,
              bundle_max
            )
              ? false
              : true;
            Bundle.Defaults.getAddToCartDiv().prop("disabled", is_disabled);
            //Update plus/minus button's disabled property
            $bundle.find(".bundle-item").each(function () {
              var item_qty = $(this).attr("data-qty");
              var item_limit = $(this).attr("data-max");
              var is_disabled = Bundle.Constraints.isBundleEqualParam(
                new_bundle_qty,
                bundle_max
              ) || Bundle.Constraints.isBundleEqualParam(item_qty, item_limit)
                ? true
                : false;
              $(this).find(".plus").find(".btn").prop("disabled", is_disabled);
              var is_disabled =
                Bundle.Constraints.isBundleEqualParam(new_bundle_qty, bundle_min) ||
                Bundle.Constraints.isBundleEqualParam(item_qty, 0)
                  ? true
                  : false;
              $(this).find(".minus").find(".btn").prop("disabled", is_disabled);
            });

          }
          var bundleprice = '$' + newtotal_price/100;
          $(".bundle-price").html(bundleprice);
        },
      },
      Constraints: {
        // Requirement functions to determine whether the user is
        // performing an action that is forbidden
        isItemGreaterThanZero: function (qty) {
          // Check that the item quantity doesn't fall below zero
          // 1.) qty = item quantity of the variant
          if (qty < 0) {
            console.log("Item quantity cannot be less than 0.");
            return false;
          }
          return true;
        },
        isBundleGreaterThanMin: function (qty, min) {
          // Check that the bundle quantity doesn't fall below the minimum quantity
          // 1.) qty = total bundle quantity of the page
          // 2.) min = minimum value the bundle quantity can't fall below
          if (qty < min) {
            console.log("Quantity cannot be less than the minimum.");
            return false;
          }
          return true;
        },
        isBundleLessThanMax: function (qty, max) {
          // Check that the bundle quantity doesn't go above the maximum quantity
          // 1.) qty = total bundle quantity of the page
          // 2.) max = maximum value the bundle quantity can't rise above
          if (qty > max) {
            console.log("Quantity cannot be greater than maximum.");
            return false;
          }
          return true;
        },
        isBundleEqualMax: function (qty, max) {
          // Check that the bundle quantity is equal to the maximum quantity
          // 1.) qty = total bundle quantity of the page
          // 2.) max = maximum value the bundle quantity can't rise above
          return qty == max ? true : false;
        },
        isBundleEqualParam: function (qty, param) {
          // Check that the bundle quantity is equal to param
          // 1.) qty = total bundle quantity of the page
          // 2.) param = value to compare qty against
          return qty == param ? true : false;
        },
      },
      Cart: {
        // Functions used when adding the bundle to the cart and removing a bundle from the cart
        processAddToCart: function () {
          // Top level function tied to the Add to Cart button.
          // Function will check constraints to make sure we can
          // add the bundle to the cart, then it will generate
          // the cart array and make the AJAX call to Shopify's API.
          // Once added to cart, we redirect to the /cart page.
          // Get bundle parent, bundle max value, and total bundle quantity values
          var $bundle = Bundle.Defaults.getBundleGridDiv();
          var qty = Bundle.Utils.calculateBundleQuantity($bundle);
          var bundle_max = Number($bundle.attr("data-bundle-max"));
          // Ensure we can process the cart, and if not, break out of function
          if (!Bundle.Constraints.isBundleEqualMax(qty, bundle_max)) {
            console.log(
              "Cannot process Add to Cart. Qty does not equal max total."
            );
            return;
          }
          //Generate the product array to pass to AJAX call
          var items = Bundle.Cart.generateCart($bundle);
          // Ensure there are items to add to cart, and if so, make
          // API call and redirect to /cart page
          if (items.length > 0) {
            Bundle.Cart.processToCart(items);
          } else {
            console.log("No items available to add to cart.");
          }
        },
        generateCart: function ($bundle) {
          // Check that the bundle quantity is equal to param
          // 1.) $bundle = top level bundle div of the grid matrix
          // 2.) widget = the ReCharge widget object tied to the page
          var cart = [];
          // bundle_id that we will pass to each product object as a
          // line item property to associate them to this bundle
          var bundle_id = Bundle.Utils.generateGuid();
          // Determine whether the user has the One-time purchase or
          // Subscribe & Save purchase type option selected. If Subscribe
          // & Save, generate the shipping interval unit_type and frequency
          // that are passed through on ReCharge orders.
          // Loop through each product grid item
          $bundle.find(".bundle-item").each(function () {
            // If item's quantity is greater than 0, add
            // to the cart array
            var qty = $(this).attr("data-qty");
            var data_url = $(this).attr("data-url");
            var shipping = $('.bundle-details .rc_select.rc_select__frequency').children("option:selected");
            var shippingfrequency=shipping.val();
            var shippingunit=shipping.text().replace(/\s+/g, '').replace(parseInt(shipping.text().replace(/\s+/g, '')),"");
            if (Number(qty) > 0) {
              var variant_id = $(this).attr("data-variant-id");
              // Pass the variant_id, quantity, and bundle_id
              // for each grid item we process
              var item = {
                id: variant_id,
                quantity: qty,
                properties: {
                  bundle_id: bundle_id,
                  data_url: data_url,
                  shipping_interval_unit_type: shippingunit,
                  shipping_interval_frequency: shippingfrequency,
                },
              };
              // If this is a Subscribe & Save bundle, pass in the
              // ReCharge properties too
              cart.push(item);
            }
          });
          return cart;
        },
        processToCart: function (items) {
          // Makes API call to add bundle items to cart. If the
          // call is successful, redirect to /cart page. If error,
          // display the error to the console.
          // 1.) items = the product array to be passed to the Shopify
          // API. Bundle.Cart.generateCart() function builds this array.
          $.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: {
              items: items,
            },
            dataType: "json",
            success: function () {
              window.location.href = "/cart";
            },
            error: function (jqXHR, text_status, error_thrown) {
              console.log(text_status, error_thrown);
            },
          });
        },
        removeBundleItems: function (bundle_id, data_url) {
          // Removes all bundle items from cart when user clicks remove on cart page
          // Get current cart contents
          jQuery.getJSON("/cart.js", function (cart) {
            // Create new updates object to send to cart update AJAX call
            let data = { updates: {} };
            cart.items.forEach((item, i) => {
              if (
                item.properties.bundle_id &&
                item.properties.bundle_id == bundle_id
              ) {
                data.updates[item.key] = 0;
              }
            });
            // API call to update the cart contents and set the bundle item quantities to 0
            $.ajax({
              type: "POST",
              url: "/cart/update.js",
              data: data,
              dataType: "json",
              success: function () {
                window.location.href = data_url;
              },
            });
          });
        },
      },
      init: function () {
        // Initialization function to register all click handlers
        // Registers each grid item's minus button
        $(".bundle .minus").on("click", function () {
          var item = $(this).closest(".bundle-item");
          Bundle.Utils.updateBundleQuantity(item, -1);
        });
        // Registers each grid item's plus button
        $(".bundle .plus").on("click", function () {
          var item = $(this).closest(".bundle-item");
          Bundle.Utils.updateBundleQuantity(item, 1);
        });
        // Registers the page's Add to Cart button
        $("#bundle-add-to-cart").on("click", function () {
          console.log(1);
          event.preventDefault();
          Bundle.Cart.processAddToCart();
        });
        // Registers each cart bundle item's remove button
        $(".cart__remove-bundle .newremove").on("click", function () {
          var bundle_id = $(this)
            .closest(".cart__remove-bundle")
            .attr("data-bundle-id");
          var data_url = $(this)
            .closest(".cart__remove-bundle")
            .attr("data-url");
            Bundle.Cart.removeBundleItems(bundle_id, data_url);
        });
        $(".grid.bundle-item .bundle_link").on("click", function(){
          var modal = $(this).nextAll(".modal").first();
          modal.css('display', 'block');
        });
        $(".grid.bundle-item .modal .modal-content .close").on("click", function(){
          var modal = $(this).closest(".modal");
          modal.css('display', 'none');
        });
        $(window).on("click", function(event){
          var target = $( event.target );
          var modal = $(".grid.bundle-item .modal");
          if ( target.is(".grid.bundle-item .modal") ){
          modal.css('display', 'none');
          }
        });
      },
    };
    // Call the init() function to register click handlers
    $(document).ready(function(){
      Bundle.init();
    });
      