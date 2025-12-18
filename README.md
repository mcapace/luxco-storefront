# Luxco Yellowstone Storefront

A premium Shopify theme for Yellowstone Bourbon and Luxco whiskey products.

## Theme Overview

This custom Shopify 2.0 theme is designed specifically for premium spirits brands, featuring:

- **Premium Design Aesthetic**: Dark, sophisticated color palette with gold accents
- **Age Verification**: Built-in age gate for alcohol compliance
- **Product Showcase**: Optimized product pages with tasting notes and specifications
- **Responsive Design**: Mobile-first approach for all device sizes
- **Performance Optimized**: Lazy loading, minimal JS, efficient CSS

## Featured Products

### Yellowstone Limited Edition 2025
- Aged 10 years, 105 proof
- 10th Anniversary commemorative release
- Collaboration between Limestone Branch Distillery and Ross & Squibb Distillery
- Blend of barrels from Indiana and Kentucky distilleries
- **Tasting Notes**: Aromas of vanilla, oak, and citrus; flavors of rich caramel, toffee, and stonefruit; finish of charred oak, honey, cherry, and cinnamon

### Lux Row Small Batch PX Sherry Cask Finished
- 112 proof
- Ryed Kentucky Straight Bourbon Whiskey
- Finished in PX Sherry casks
- **Tasting Notes**: Aromatic bouquet of dried figs and dates; decadent flavors of grape syrup and candied fruit; hints of spice, roasted coffee, and dark chocolate

## Theme Structure

```
luxco-storefront/
├── assets/
│   ├── base.css                    # Core styles
│   ├── component-product-card.css  # Product card component
│   ├── global.js                   # Global JavaScript
│   ├── yellowstone-hero.jpg        # Hero banner image
│   ├── yellowstone-le.jpg          # Yellowstone LE product image
│   └── px-sherry.jpg               # PX Sherry product image
├── config/
│   ├── settings_data.json          # Theme settings data
│   └── settings_schema.json        # Theme settings schema
├── layout/
│   └── theme.liquid                # Main layout template
├── locales/
│   └── en.default.json             # English translations
├── sections/
│   ├── header.liquid               # Header section
│   ├── footer.liquid               # Footer section
│   ├── hero.liquid                 # Hero banner
│   ├── featured-products.liquid    # Featured products grid
│   ├── about-distillery.liquid     # About section
│   ├── product-template.liquid     # Product page template
│   ├── collection-banner.liquid    # Collection header
│   ├── collection-products.liquid  # Collection grid
│   ├── header-group.json           # Header section group
│   └── footer-group.json           # Footer section group
├── snippets/
│   ├── meta-tags.liquid            # SEO meta tags
│   └── age-verification.liquid     # Age gate modal
└── templates/
    ├── index.json                  # Homepage template
    ├── product.json                # Product page template
    └── collection.json             # Collection page template
```

## Installation

1. Zip the theme folder
2. In Shopify Admin, go to **Online Store > Themes**
3. Click **Add theme > Upload zip file**
4. Upload the zipped theme
5. Click **Customize** to configure settings

## Theme Settings

### Colors
- Primary: `#1a1a1a` (Dark)
- Secondary: `#c9a227` (Gold)
- Accent: `#8b5a2b` (Brown)

### Typography
- Headings: Cinzel (serif)
- Body: Lato (sans-serif)

### Age Verification
Enable/disable the age gate modal in theme settings. Required for alcohol sales compliance.

## Product Metafields

The theme supports custom metafields for whiskey products:

| Metafield | Namespace | Key | Type |
|-----------|-----------|-----|------|
| Age | custom | age | Single line text |
| Proof | custom | proof | Single line text |
| Volume | custom | volume | Single line text |
| Aroma | custom | aroma | Multi-line text |
| Taste | custom | taste | Multi-line text |
| Finish | custom | finish | Multi-line text |
| Badge | custom | badge | Single line text |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Luxco, Inc. All rights reserved.
