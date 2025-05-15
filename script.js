// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize lightbox gallery
    initLightbox();
    
    // Initialize category tabs (product filtering)
    initCategoryTabs();
    
    
    // Initialize form validation
    initFormValidation();

    // Initialize cart functionality
    initCart();

});

/**
 * Mobile Navigation Toggle
 * Handles opening and closing the mobile menu
 */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && closeMenuBtn && mobileNav) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
        });
        
        // Close mobile menu
        closeMenuBtn.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target) && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    }
}

/**
 * Lightbox Gallery
 * Creates a lightbox effect for gallery images
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.getElementById('closeLightbox');
    
    if (galleryItems.length && lightbox && lightboxImage && closeLightbox) {
        // Open lightbox when clicking on gallery images
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            
            if (img) {
                img.addEventListener('click', function() {
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt;
                    lightbox.classList.add('active');
                });
            }
        });
        
        // Close lightbox when clicking the close button
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Close lightbox when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }
}

/**
 * Category Tabs
 * Filters gallery items based on selected category
 */
function initCategoryTabs() {
    const categoryTabs = document.getElementById('categoryTabs');
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (categoryTabs && galleryGrid) {
        const tabs = categoryTabs.querySelectorAll('.category-tab');
        const items = galleryGrid.querySelectorAll('.gallery-item');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get category to filter
                const category = this.getAttribute('data-category');
                
                // Show all items or filter by category
                items.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}



/**
 * Form Validation
 * Validates form input and provides feedback
 */
function initFormValidation() {
    const newsletterForm = document.getElementById('newsletterForm');
    const contactForm = document.getElementById('contactForm');
    
    // Newsletter form validation
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && validateEmail(emailInput.value)) {
                // In a real implementation, this would submit to a server

                const successMessage = document.createElement('div');
                successMessage.textContent = `Thank you for subscribing with ${emailInput.value}! You'll receive our sweet updates soon.`;
                successMessage.className = 'form-success';
                successMessage.style.backgroundColor = 'rgba(255,255,255,0.9)';
                successMessage.style.color = '#FF6B98';
                successMessage.style.padding = '10px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.marginTop = '10px';
                
                // Insert success message and reset form
                newsletterForm.appendChild(successMessage);
                newsletterForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                // Show error for invalid email
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate inputs
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showInputError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                clearInputError(nameInput);
            }
            
            if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
                showInputError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearInputError(emailInput);
            }
            
            if (!subjectInput.value) {
                showInputError(subjectInput, 'Please select a subject');
                isValid = false;
            } else {
                clearInputError(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                showInputError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                clearInputError(messageInput);
            }
            
            // If all inputs are valid, submit the form
            if (isValid) {
                // In a real implementation, this would submit to a server
                const formContainer = contactForm.closest('.form-container');
                
                if (formContainer) {
                    // Hide form
                    contactForm.style.display = 'none';
                    
                    // Show success message
                    const successDiv = document.createElement('div');
                    successDiv.className = 'form-success';
                    successDiv.innerHTML = `
                        <h3>Thank you for your message!</h3>
                        <p>We've received your inquiry and will get back to you as soon as possible.</p>
                        <button class="btn btn-primary" id="resetFormBtn">Send Another Message</button>
                    `;
                    successDiv.style.textAlign = 'center';
                    
                    formContainer.appendChild(successDiv);
                    
                    // Reset form functionality
                    const resetBtn = document.getElementById('resetFormBtn');
                    if (resetBtn) {
                        resetBtn.addEventListener('click', function() {
                            contactForm.reset();
                            successDiv.remove();
                            contactForm.style.display = 'grid';
                        });
                    }
                }
            }
        });
    }
}

function validateEmail(email) {
    // Handle empty inputs
    if (!email) return false;
    
    // Convert to string and remove whitespace
    email = String(email).trim();
    
    // Make sure @ exists and isn't the first character
    const atIndex = email.indexOf('@');
    if (atIndex <= 0) return false;
    
    // Make sure there's a dot after the @ symbol
    const dotIndex = email.lastIndexOf('.');
    if (dotIndex <= atIndex) return false;
    
    // Make sure there's text after the dot
    if (dotIndex >= email.length - 1) return false;
    
    // If all checks pass, email is valid
    return true;
}

function showInputError(input, message) {
    // Clear existing errors first
    clearInputError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const error = document.createElement('div');
    error.className = 'input-error';
    error.textContent = message;
    
    // Add to parent
    input.parentNode.appendChild(error);
}

function clearInputError(input) {
    // Remove error class
    input.classList.remove('error');
    
    // Find and remove error message
    const error = input.parentNode.querySelector('.input-error');
    if (error) error.remove();
}

/**
 * Interactive Cupcake Customizer
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const options = document.querySelectorAll('.custom-option');
    const priceDisplay = document.getElementById('customPrice');
    const base = document.getElementById('cupcakeBase');
    const frosting = document.getElementById('cupcakeFrosting');
    const topping = document.getElementById('cupcakeTopping');
    const addToCartBtn = document.getElementById('addCustomToCart');
    
    // Exit if elements don't exist
    if (!options.length || !priceDisplay || !base || !frosting || !topping) return;
    
    // Initial prices from default selections
    let totalPrice = 3.99; // 2.99 (vanilla base) + 1.00 (vanilla frosting) + 0.00 (no topping)
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const part = this.dataset.part;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const cssClass = this.dataset.class;
            
            // Update active state for this category
            document.querySelectorAll(`.custom-option[data-part="${part}"]`)
                .forEach(opt => {
                    if (opt === this) {
                        opt.classList.add('active');
                    } else {
                        opt.classList.remove('active');
                    }
                });
            
            // Update visual appearance using CSS classes
            if (part === 'base') {
                // Get old price
                const oldOption = document.querySelector(`.custom-option[data-part="base"].active`);
                const oldPrice = oldOption && oldOption !== this ? 
                    parseFloat(oldOption.dataset.price) : 2.99;
                
                // Update price
                totalPrice = totalPrice - oldPrice + price;
                
                // Update class
                base.className = 'cupcake-base ' + cssClass;
            } 
            else if (part === 'frosting') {
                // Get old price
                const oldOption = document.querySelector(`.custom-option[data-part="frosting"].active`);
                const oldPrice = oldOption && oldOption !== this ? 
                    parseFloat(oldOption.dataset.price) : 1.00;
                
                // Update price
                totalPrice = totalPrice - oldPrice + price;
                
                // Update class
                frosting.className = 'cupcake-frosting ' + cssClass;
            }
            else if (part === 'topping') {
                // Get old price
                const oldOption = document.querySelector(`.custom-option[data-part="topping"].active`);
                const oldPrice = oldOption && oldOption !== this ? 
                    parseFloat(oldOption.dataset.price) : 0.00;
                
                // Update price
                totalPrice = totalPrice - oldPrice + price;
                
                // Update class
                topping.className = 'cupcake-topping ' + cssClass;
            }
            
            // Update price display
            priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            priceDisplay.classList.add('price-updated');
            
            // Remove animation class after animation completes
            setTimeout(() => priceDisplay.classList.remove('price-updated'), 500);
        });
    });
    
    // Add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Get currently selected options
            const baseOption = document.querySelector('.custom-option[data-part="base"].active');
            const frostingOption = document.querySelector('.custom-option[data-part="frosting"].active');
            const toppingOption = document.querySelector('.custom-option[data-part="topping"].active');
            
            // Create description
            const baseName = baseOption ? baseOption.dataset.name : 'Vanilla';
            const frostingName = frostingOption ? frostingOption.dataset.name : 'Vanilla Buttercream';
            const toppingName = toppingOption ? toppingOption.dataset.name : 'None';
            
            const description = `Custom Cupcake: ${baseName} base with ${frostingName} frosting` + 
                (toppingName !== 'None' ? ` and ${toppingName} topping` : '');
            
            alert(`Added to cart: ${description}\nPrice: $${totalPrice.toFixed(2)}`);
        });
    }
});

/**
 * Interactive Nutritional Information
 * Allows users to search, toggle, and view nutritional information for cupcakes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const items = document.querySelectorAll('.nutrition-item');
    const toggles = document.querySelectorAll('.nutrition-toggle');
    const unitBtns = document.querySelectorAll('.unit-btn');
    const searchInput = document.getElementById('nutritionSearch');
    const noResultsMsg = document.getElementById('noNutritionResults');
    
    // Exit if elements not found
    if (!items.length || !toggles.length) return;
    
    // Toggle nutrition details visibility
    toggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            // Prevent event bubbling to header
            e.stopPropagation();
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle details visibility
            const details = items[index].querySelector('.nutrition-details');
            details.classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('.nutrition-icon');
            icon.textContent = this.classList.contains('active') ? '✕' : '+';
        });
        
        // Make header clickable
        const header = items[index].querySelector('.nutrition-header');
        header.addEventListener('click', function(e) {
            // Only trigger if not clicked on the toggle button
            if (!e.target.closest('.nutrition-toggle')) {
                toggles[index].click();
            }
        });
    });
    
    // Unit toggle functionality
    unitBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            unitBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected unit
            const unit = this.dataset.unit;
            
            // Show/hide values based on selected unit
            if (unit === 'g') {
                document.querySelectorAll('.g-value').forEach(el => {
                    el.style.display = 'inline';
                });
                document.querySelectorAll('.oz-value').forEach(el => {
                    el.style.display = 'none';
                });
            } else {
                document.querySelectorAll('.g-value').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.oz-value').forEach(el => {
                    el.style.display = 'inline';
                });
            }
        });
    });
    
    // Search functionality
    if (searchInput && noResultsMsg) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase().trim();
            let found = false;
            
            items.forEach(item => {
                const name = item.dataset.name.toLowerCase();
                const keywords = item.dataset.keywords ? item.dataset.keywords.toLowerCase() : '';
                const isMatch = term === '' || name.includes(term) || keywords.includes(term);
                
                // Using classList for toggling visibility
                if (isMatch) {
                    item.classList.remove('hidden');
                    found = true;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Show/hide no results message
            if (found) {
                noResultsMsg.classList.remove('visible');
            } else {
                noResultsMsg.classList.add('visible');
            }
        });
    }
});

const cartItems = []; // Array to store cart items

function addToCart(cupcake) {
    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item.id === cupcake.id);

    if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity += cupcake.quantity;
    } else {
        // Otherwise, add it to the cart
        cartItems.push(cupcake);
    }

    console.log('Updated cart:', cartItems); // For demonstration

    updateCartDisplay(); // Call this function to update the cart page
}

    function updateCartDisplay() {
    // Get the cart items container in cart.html
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return; // Exit if the cart page isn't loaded

    // Clear the current cart display
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Loop through the cart items and generate HTML
    cartItems.forEach(item => {
        const itemTotalPrice = (item.price * item.quantity).toFixed(2); // Calculate total for the item
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">$${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <p class="item-total-price">Total: $${itemTotalPrice}</p> <button class="remove-item" onclick="removeItem('${item.id}')">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        total += parseFloat(itemTotalPrice); // Use parseFloat to ensure correct addition
    });

    // Update the total price
    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = $$;{total.toFixed(2)};
}
}