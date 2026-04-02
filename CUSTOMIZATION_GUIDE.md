# 🎨 CAWK Website Customization Guide

Quick reference for common customizations.

---

## 🔧 Quick Edits

### 1. Change WhatsApp Number
**File:** `script.js` (Line ~160)
```javascript
const whatsappNumber = '919535917824'; // Change this
```

### 2. Update Product Price
**Files to update:**
- `index.html` - Product section (search for "₹999")
- `script.js` - Quantity calculator function (line ~100)

### 3. Change Colors
**File:** `styles.css` (Lines 10-15)
```css
:root {
    --primary-blue: #007BFF;      /* Your primary color */
    --healthcare-green: #28A745;  /* Your secondary color */
    --border-radius: 12px;        /* Corner roundness */
}
```

### 4. Update Contact Information
**File:** `index.html`
- Footer section (search for "+91 9535917824")
- WhatsApp link (search for "wa.me/919535917824")
- Instagram link (search for "instagram.com/cawk.in/")

### 5. Modify Product Features
**File:** `index.html` - Product Showcase section
```html
<ul class="features-list">
    <li><i class="fas fa-check"></i> Your feature here</li>
    <!-- Add/remove features -->
</ul>
```

---

## 📸 Adding Real Images

### Logo
Replace `placeholder_logo.svg` with your logo file:
- Recommended: SVG or PNG with transparent background
- Size: 200x200px (or vector SVG)
- Name it the same or update HTML references

### Product Image
In `index.html`, replace the `.image-placeholder` div:
```html
<div class="product-image" data-aos="fade-right">
    <img src="your-product-photo.jpg" alt="CAWK Kit" style="width: 100%; border-radius: 20px;">
    <div class="product-badge">Best Seller</div>
</div>
```

**Tips:**
- Use high-quality photos (min 1000x1000px)
- Compress images using [TinyPNG](https://tinypng.com/)
- Use WebP format for better performance

---

## ✏️ Text Content Changes

### Hero Section
**File:** `index.html` (Lines ~60-80)
```html
<h1 class="hero-title">Your Headline Here</h1>
<p class="hero-subtitle">Your subheadline here</p>
```

### Benefits Cards
**File:** `index.html` - Benefits section
```html
<div class="benefit-card">
    <h3>Your Benefit Title</h3>
    <p>Your benefit description</p>
</div>
```

### How It Works Steps
**File:** `index.html` - How It Works section
```html
<div class="step">
    <h3>Step Title</h3>
    <p>Step description</p>
</div>
```

---

## 🎬 Animation Customization

### Adjust Animation Speed
**File:** `script.js` (Line 5)
```javascript
AOS.init({
    duration: 800,     // Animation duration in ms
    easing: 'ease-in-out',
    once: true,        // Animate only once
    offset: 100        // Trigger distance from viewport
});
```

### Disable Animations
Comment out AOS initialization in `script.js`:
```javascript
// AOS.init({ ... });
```

Remove AOS CSS link in `index.html`:
```html
<!-- Remove or comment this line -->
<!-- <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"> -->
```

---

## 📱 Mobile Adjustments

### Change Mobile Breakpoints
**File:** `styles.css` (Responsive section at bottom)
```css
@media (max-width: 768px) {
    /* Mobile styles here */
}
```

### Adjust Mobile CTA Visibility
**File:** `script.js` - `updateMobileCTA()` function
```javascript
function updateMobileCTA() {
    // Customize when mobile CTA appears
}
```

---

## 💰 Pricing & Discounts

### Update Quantity Discounts
**File:** `script.js` - `updateOrderSummary()` function
```javascript
if (quantity === 2) {
    discount = 100;  // Change discount amount
} else if (quantity === 3) {
    discount = 200;
}
```

Update matching values in `handleOrderSubmit()` function.

### Add More Quantity Options
**File:** `index.html` - Order form quantity select
```html
<select id="quantity" name="quantity" required>
    <option value="1">1 Kit - ₹999</option>
    <option value="2">2 Kits - ₹1,998 (Save ₹100)</option>
    <option value="3">3 Kits - ₹2,897 (Save ₹200)</option>
    <option value="4">4 Kits - ₹3,796 (Save ₹300)</option> <!-- Add new option -->
    <option value="5">5 Kits - ₹4,795 (Save ₹500)</option>
</select>
```

Then update JavaScript calculator logic.

---

## 🎯 Form Validation

### Change Phone Number Format
**File:** `index.html` - Phone input
```html
<input 
    type="tel" 
    pattern="[0-9]{10}"  <!-- Change regex for different format -->
    title="Please enter a valid phone number"
>
```

**File:** `script.js` - `handleOrderSubmit()` function
```javascript
const phoneRegex = /^[0-9]{10}$/;  // Update regex pattern
```

### Add More Form Fields
**File:** `index.html` - Order form
```html
<div class="form-group">
    <label for="newField">
        <i class="fas fa-icon"></i> Field Name *
    </label>
    <input type="text" id="newField" name="newField" required>
</div>
```

Then retrieve value in `script.js`:
```javascript
const newFieldValue = document.getElementById('newField').value;
```

Add to WhatsApp message:
```javascript
const message = `Hello CAWK, I want to order:

Name: ${fullName}
Phone: ${phone}
New Field: ${newFieldValue}
...`;
```

---

## 🌐 SEO & Meta Tags

### Update Page Title
**File:** `index.html` (Line 6)
```html
<title>Your Custom Title | CAWK</title>
```

### Add Meta Description
**File:** `index.html` (add after `<meta charset="UTF-8">`)
```html
<meta name="description" content="Your SEO description here">
<meta name="keywords" content="keyword1, keyword2, keyword3">
```

### Social Media Preview
Add Open Graph tags to `index.html`:
```html
<meta property="og:title" content="Your OG Title">
<meta property="og:description" content="Your OG description">
<meta property="og:image" content="URL_to_image.jpg">
<meta property="og:url" content="https://yoursite.com">
```

---

## 🔍 Troubleshooting Common Issues

### Issue: Logo not showing
**Solution:** Check file path and name match exactly (case-sensitive on some servers)

### Issue: Form not submitting
**Solution:** Check browser console (F12) for JavaScript errors

### Issue: WhatsApp opens but no message
**Solution:** Verify phone number format (no + symbol, include country code)

### Issue: Animations janky on mobile
**Solution:** Reduce animation count or simplify effects in CSS

### Issue: Page loads slowly
**Solution:** 
- Compress images
- Minify CSS/JS files
- Use CDN for libraries

---

## 🚀 Performance Optimization

### Minify Files for Production
```bash
# Install tools
npm install -g terser clean-css-cli

# Minify CSS
cleancss styles.css -o styles.min.css

# Minify JS
terser script.js -o script.min.js

# Update HTML to use minified files
```

### Enable Browser Caching
Add to your hosting platform's configuration:
```
Cache-Control: public, max-age=31536000
```

---

## 📊 Adding Analytics

### Google Analytics
Paste in `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Button Clicks
Add to `script.js`:
```javascript
document.querySelector('.btn-primary').addEventListener('click', () => {
    if(typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'engagement',
            'event_label': 'Order Button Click'
        });
    }
});
```

---

## 🎨 Advanced Styling Tips

### Change Font
**File:** `index.html` - Google Fonts link
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

**File:** `styles.css`
```css
body {
    font-family: 'Poppins', sans-serif;  /* Change font family */
}
```

### Add Custom Gradient
**File:** `styles.css`
```css
.custom-gradient {
    background: linear-gradient(135deg, #color1, #color2);
}
```

---

## 📞 Support Resources

**Font Awesome Icons:** [fontawesome.com/icons](https://fontawesome.com/icons)  
**Google Fonts:** [fonts.google.com](https://fonts.google.com)  
**Color Palettes:** [coolors.co](https://coolors.co)  
**Image Compression:** [tinypng.com](https://tinypng.com)  
**SVG Editor:** [figma.com](https://figma.com)

---

## 💡 Pro Tips

1. **Always backup** before making changes
2. **Test locally** before deploying updates
3. **Use browser DevTools** (F12) to preview changes
4. **Keep file names consistent** (case-sensitive)
5. **Compress all images** before uploading
6. **Use version control** (Git) for tracking changes
7. **Check mobile view** regularly during development

---

**Need more help? Check README.md or DEPLOYMENT_GUIDE.md**
