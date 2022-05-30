import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
import {Form} from "react-bootstrap";


ReactDOM.render(
    <React.StrictMode>
        {/*<link rel="stylesheet" href="chat.css"/>*/}

        <head>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
            {/*<script src=*/}
            {/*            {'https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js'} />*/}
        </head>
        <App/>
        {/*<footer>*/}
        {/*    <>Author: Hege Refsnes</>*/}
        {/*    /!*<p><a href="mailto:hege@example.com">hege@example.com</a></p>*!/*/}
        {/*</footer>*/}

    {/*    <head>*/}
    {/*        <meta charSet="utf-8"/>*/}
    {/*            <meta name="viewport" content="width=device-width, initial-scale=1"/>*/}

    {/*                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"*/}
    {/*                      rel="stylesheet"*/}
    {/*                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"*/}
    {/*                      crossOrigin="anonymous"/>*/}

    {/*                    <title>Hello, world!</title>*/}
    {/*    </head>*/}
    {/*    <body>*/}
    {/*    <h1>Hello, world!</h1>*/}


    {/*    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"*/}
    {/*integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"*/}
    {/*crossOrigin="anonymous"/>*/}

    {/*    /! <!-- Option 2: Separate Popper and Bootstrap JS --> */ }
    {/*     <!--*/}
    {/*    // <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>*/}
    {/*    // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>*/}
    {/*    // -->/*!/*/}
    {/*    </body>*/}
    </React.StrictMode>,
    document.getElementById('root')
);

document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");


