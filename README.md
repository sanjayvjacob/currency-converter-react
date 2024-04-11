## Currency Converter App

## Screenshot

![](./screenshot.png)

## Live site URL

https://sanjayvjacob.github.io/currency-converter-react/

## comments

fixer.io api is not responding in gitHub pages.
Reason: website is tunning with https and im requesting the api with http, so chrome is blocking the request.
fix: add https to the fetch request. also, fixer.io has paid subscription for https. Hence problem not solved with fixer.api.
