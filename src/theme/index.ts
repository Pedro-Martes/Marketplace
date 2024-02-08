import { extendTheme } from "native-base";

export const THEME = extendTheme(
    {
        colors: {
            red: {
                100: "#EE7979",
            },
            blue: {
                primary: "#647AC7",

                secondary: '#364D9D',
            },
            gray: {
                primary: '#C4C4CC',
                secondary: '#7C7C8A',

                700: '#121214',
                600: '#202024',
                500: '#29292E',
                400: '#323238',
                300: '#7C7C8A',
                200: '#C4C4CC',
                100: '#E1E1E6'

            },

            white: '#ffffff',

            black: {
                primary: '#121214',
                secondary: '#202024',
            },
        },
        fonts: {
            
            heading: 'Roboto-700bold',
            body: 'Roboto_400Regular',
            mono: 'Poppins-Regular',
            title: 'Montserrat_400Regular'
        }
    }

)