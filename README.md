![Responsive Grid System Banner](https://github.com/haikallfiqih/responsive-grid-system/blob/main/src/rgs.png)


# Responsive Grid System

A lightweight, modern, and flexible grid system built with vanilla JavaScript and CSS. No dependencies, no frameworks required - just pure, efficient code for creating responsive layouts.

## ✨ Features

- 🎯 Simple, intuitive class naming system
- 🔄 Responsive breakpoints (xs, sm, md, lg, xl)
- 📱 Auto-width columns that adapt to content
- 🎨 Custom column spans with precise control
- 🌐 Built with vanilla JavaScript and CSS - no dependencies
- 🔌 Framework-agnostic (works with any JS framework or none at all)
- 🪶 Lightweight and performant
- 🛠 Highly customizable

## 🔧 Tech Stack

- **JavaScript**: Pure vanilla JavaScript with no dependencies
- **CSS**: Modern CSS features including Flexbox and Grid
- **Build Size**: Lightweight, < 10KB minified and gzipped
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## 📦 Installation

```bash
npm install @haikallfiqih/responsive-grid-system
```

Or include directly in your HTML:

```html
<script src="https://unpkg.com/@haikallfiqih/responsive-grid-system@1.0.0/src/grid-system.js"></script>
```

## 🚀 Quick Start

### Basic Setup

```javascript
const grid = new GridSystem({
    columns: 12,          // Number of columns
    gap: 20,             // Gap between columns in pixels
});
```

### Simple Grid Layout

```html
<div class="container">
    <div class="row">
        <div class="col md6">Half width on medium screens</div>
        <div class="col md6">Half width on medium screens</div>
    </div>
</div>
```

## 📖 Class Naming Guide
### Custom Class Names

By default, the grid system uses the class names `container`, `row`, and `col`. You can customize these names to fit your needs:

### 1. Basic Structure

- Container: `container`
- Row: `row`
- Column: `col`

### 2. Responsive Columns

Format: `col {breakpoint}{size}`

```html
<!-- Full width by default, half width on medium screens -->
<div class="col md6">Content</div>

<!-- One-third width on large screens -->
<div class="col lg4">Content</div>
```

### 3. Auto-width Columns

Columns that automatically adjust to share available space:

```html
<div class="row">
    <div class="col auto">Adapts to content</div>
    <div class="col auto">Adapts to content</div>
    <div class="col auto">Adapts to content</div>
</div>
```

### 4. Custom Column Spans

Custom Column Spans let you position elements precisely within the 12-column grid by specifying where they start and end. The format is:
`col {breakpoint}{start}-{end}`

For example, in a 12-column grid:
```
Column Numbers:  1  2  3  4  5  6  7  8  9  10  11  12
                ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
                │  │  │  │  │  │  │  │  │  │  │  │  │
                └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
```

Examples:
```html
<!-- Takes up columns 2-6 (spans 5 columns) -->
<div class="col md2-6">
    This content starts at column 2 and ends at column 6
</div>

<!-- Takes up columns 6-10 (spans 4 columns) -->
<div class="col lg6-10">
    This content starts at column 6 and ends at column 10
</div>

<!-- Example of multiple spans in a row -->
<div class="row">
    <div class="col md2-5">Spans cols 2-5</div>
    <div class="col md5-9">Spans cols 5-9</div>
    <div class="col md9-12">Spans cols 9-12</div>
</div>
```

This is particularly useful when you need:
- Precise control over column positioning
- Asymmetric layouts
- Complex grid arrangements
- Offset columns without extra markup

The span numbers represent:
- First number: Which column to start from (1-12)
- Second number: Which column to end at (1-12)

### 5. Multiple Breakpoints

Combine classes for different screen sizes:

```html
<div class="col sm12 md6 lg4">
    <!-- Full width on small screens -->
    <!-- Half width on medium screens -->
    <!-- One-third on large screens -->
</div>
```

## 📱 Breakpoints

Default breakpoints included:

```javascript
{
    xs: 0,    // Extra small: 0px and up
    sm: 576,  // Small: 576px and up
    md: 768,  // Medium: 768px and up
    lg: 992,  // Large: 992px and up
    xl: 1200, // Extra large: 1200px and up
}
```

### Custom Breakpoints

You can define your own breakpoints:

```javascript
const grid = new GridSystem({
    breakpoints: {
        mobile: 0,
        tablet: 640,
        desktop: 1024,
        wide: 1400
    }
});
```


## 🔄 Events

Listen for layout updates:

```javascript
window.addEventListener('gridUpdate', (event) => {
    console.log('Current breakpoint:', event.detail.currentBreakpoint);
    console.log('Window width:', event.detail.windowWidth);
});
```

## 💻 Browser Support

Works in all modern browsers that support:

- CSS Flexbox
- CSS Grid (for span functionality)
- CSS Custom Properties

## 📄 License

MIT
