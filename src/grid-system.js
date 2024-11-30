class GridSystem {
  constructor(options = {}) {
    this.options = {
      columns: options.columns || 12,
      breakpoints: options.breakpoints || {
        xs: 0, // Extra small devices
        sm: 576, // Small devices
        md: 768, // Medium devices
        lg: 992, // Large devices
        xl: 1200, // Extra large devices
      },
      containerClass: options.containerClass || "container",
      rowClass: options.rowClass || "row",
      colClass: options.colClass || "col",
      gap: options.gap || 16, // Gap between columns in pixels
    };

    this.init();
  }

  init() {
    this.createStyles();
    this.setupResizeListener();
  }

  createStyles() {
    const styleElement = document.createElement("style");
    styleElement.textContent = this.generateCSS();
    document.head.appendChild(styleElement);
  }

  generateCSS() {
    return `
            .${this.options.containerClass} {
                width: 100%;
                margin-right: auto;
                margin-left: auto;
                padding-right: ${this.options.gap}px;
                padding-left: ${this.options.gap}px;
                box-sizing: border-box;
            }

            .${this.options.rowClass} {
                display: flex;
                flex-wrap: wrap;
                margin-right: -${this.options.gap/2}px;
                margin-left: -${this.options.gap/2}px;
            }

            .${this.options.colClass} {
                position: relative;
                width: 100%;
                padding-right: ${this.options.gap/2}px;
                padding-left: ${this.options.gap/2}px;
                box-sizing: border-box;
            }

            .${this.options.colClass}.auto {
                flex: 1 1 0;
                max-width: 100%;
            }

            ${this.generateResponsiveClasses()}
        `;
  }

  generateResponsiveClasses() {
    let css = '';
    const breakpoints = Object.entries(this.options.breakpoints);

    breakpoints.forEach(([breakpoint, minWidth], index) => {
      const mediaQuery = index === 0 
        ? '' // No media query for smallest breakpoint
        : `@media (min-width: ${minWidth}px)`;

      // Generate column classes for each breakpoint
      for (let i = 1; i <= this.options.columns; i++) {
        const width = (i / this.options.columns) * 100;
        css += `
            ${mediaQuery} {
                .${this.options.colClass}.${breakpoint}${i} {
                    flex: 0 0 ${width}%;
                    max-width: ${width}%;
                }
            }
        `;
      }

      // Add custom span classes
      for (let start = 1; start <= this.options.columns; start++) {
        for (let end = start + 1; end <= this.options.columns; end++) {
          const spanWidth = ((end - start + 1) / this.options.columns) * 100;
          const offset = ((start - 1) / this.options.columns) * 100;
          css += `
              ${mediaQuery} {
                  .${this.options.colClass}.${breakpoint}${start}-${end} {
                      flex: 0 0 ${spanWidth}%;
                      max-width: ${spanWidth}%;
                      margin-left: ${offset}%;
                  }
              }
          `;
        }
      }
    });

    return css;
  }

  setupResizeListener() {
    let timeout;
    window.addEventListener("resize", () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(() => {
        this.updateLayout();
      });
    });
  }

  updateLayout() {
    // This method can be extended to handle dynamic layout updates
    const event = new CustomEvent("gridUpdate", {
      detail: {
        windowWidth: window.innerWidth,
        currentBreakpoint: this.getCurrentBreakpoint(),
      },
    });
    window.dispatchEvent(event);
  }

  getCurrentBreakpoint() {
    const width = window.innerWidth;
    const breakpoints = Object.entries(this.options.breakpoints).sort(
      ([, a], [, b]) => b - a
    );

    for (const [name, minWidth] of breakpoints) {
      if (width >= minWidth) {
        return name;
      }
    }
    return Object.keys(this.options.breakpoints)[0];
  }

  createContainer() {
    const container = document.createElement("div");
    container.className = this.options.containerClass;
    return container;
  }

  createRow() {
    const row = document.createElement("div");
    row.className = this.options.rowClass;
    return row;
  }

  createColumn(breakpoint, size, offset = 0) {
    const column = document.createElement("div");
    const classes = [this.options.colClass];

    if (size) {
      classes.push(`${breakpoint}${size}`);
    }
    if (offset) {
      classes.push(`${breakpoint}-${offset}-${offset + size}`);
    }

    column.className = classes.join(" ");
    return column;
  }
}

// Export for different module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = GridSystem;
} else if (typeof define === "function" && define.amd) {
  define([], function () {
    return GridSystem;
  });
} else {
  window.GridSystem = GridSystem;
}
