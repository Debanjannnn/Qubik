import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        "background-position-spin": {
          "0%": {
            backgroundPosition: "top center"
          },
          "100%": {
            backgroundPosition: "bottom center"
          }
        },
        "shiny-text": {
          "0%, 90%, 100%": {
            backgroundPosition: "calc(-100% - var(--shiny-width)) 0"
          },
          "30%, 60%": {
            backgroundPosition: "calc(100% + var(--shiny-width)) 0"
          }
        },
        "pink-shine": {
          "0%, 90%, 100%": {
            backgroundSize: "200% 100%",
            backgroundPosition: "left center"
          },
          "30%, 60%": {
            backgroundSize: "200% 100%",
            backgroundPosition: "right center"
          }
        },
        aurora: {
          "0%": {
            backgroundPosition: "0% 50%",
            transform: "rotate(-5deg) scale(0.9)"
          },
          "25%": {
            backgroundPosition: "50% 100%",
            transform: "rotate(5deg) scale(1.1)"
          },
          "50%": {
            backgroundPosition: "100% 50%",
            transform: "rotate(-3deg) scale(0.95)"
          },
          "75%": {
            backgroundPosition: "50% 0%",
            transform: "rotate(3deg) scale(1.05)"
          },
          "100%": {
            backgroundPosition: "0% 50%",
            transform: "rotate(-5deg) scale(0.9)"
          }
        },
        "shimmer-slide": {
          "to": {
            transform: "translate(calc(100cqw - 100%), 0)"
          }
        },
        "spark-spin": {
          "0%": {
            rotate: "0deg"
          },
          "15%, 35%": {
            rotate: "90deg"
          },
          "65%, 85%": {
            rotate: "270deg"
          },
          "100%": {
            rotate: "360deg"
          }
        },
        "slide-across": {
          "to": {
            translate: "calc(100cqw + 100%) -50%"
          }
        },
        "lazy-spin": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        },
        "spin-around": {
          "to": {
            transform: "rotate(1turn)"
          }
        },
        "border-spin": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        }
      },
      animation: {
        "background-position-spin": "background-position-spin 3000ms infinite alternate",
        "shiny-text": "shiny-text 12s infinite",
        "pink-shine": "pink-shine 8s infinite ease-in-out",
        "aurora": "aurora 8s ease-in-out infinite alternate",
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spark-spin": "spark-spin calc(var(--speed) * 2) infinite linear",
        "slide-across": "slide-across var(--speed) infinite linear",
        "lazy-spin": "lazy-spin 2s infinite linear",
        "spin-around": "spin-around var(--speed) infinite linear",
        "border-spin": "border-spin 4s linear infinite"
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
