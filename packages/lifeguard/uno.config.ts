import { defineConfig } from 'unocss'

export default defineConfig({
    //css
    theme: {
        colors: {
            red: '#ED6A5A',
            yellow: '#F4F1BB',
            green: '#9AC1BC',
            dark_green: '#5CA4A9',
            black: '#000000',
            gray: '#F5F5F5',
            dark_grey: '#E9E9E9',
        },
        fontFamily: {
            lato: ['Lato', 'sans-serif'],
        },
        fontSize: {
            xs: '14px',  // Extra klein
            sm: '16px',  // Klein
            base: '18px',  // Standaard
            lg: '20px',  // Groot
            xl: '30px',  // Extra groot
            xxl: '40px',  // 2 keer groot
        },
      },
})