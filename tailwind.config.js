/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    // colors: {
      // night: '#000000'
    // }
    extend: {
      flexGrow: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
      },
      backgroundImage: {
        'radial-white': 'radial-gradient(transparent 20% , white 120%)'
      }
    }
  },
  plugins: [],
  safelist: [
    'col-span-1', 
    'col-span-2', 
    'col-span-3', 
    'col-span-4', 
    'col-span-5', 
    'col-span-6', 
    'col-span-7', 
    'col-span-8', 
    'col-span-9', 
    'col-span-10', 
    'col-span-11', 
    'col-span-12',
    'columns-1',
    'columns-2',
    'columns-3',
    'columns-4',
    'columns-5',
    'columns-6',
    'columns-7',
    'columns-8',
    'columns-9',
    'columns-10',
    'px-10',
    'px-4',
    'grow-1',
    'grow-2',
    'grow-3',
    'grow-4',
    'grow-5'
  ]
};
