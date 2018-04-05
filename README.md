# gif-grab

A simple interface through which you can "grab your gifs."

deployed: https://benoctopus.github.io/gif-grab

## instructions

The app is used through accessing the searchbar on the left side of the content section. After typing something into the search bar, click on the add button to save the term. Then click on the new button that appears in the search bar to populate the content section with gifs. The arrow buttons will load more gifs under the same search term. Click on a gif's image to see the gif animated in a larger frame. 

## Dependencies

- bootstrab 4

- jQuery

- Giphy API

## known issues

this app is currently bug ridden. Doing the following things may break the app:

- using special charecters in a search term
- searching for a keyword that the giphy api does not like, ie "community" for some reason
- searching for a duplicate term may break the app, although this is not only the app.

It is also worth noting that the bigger gif frames may be prone to browser compatibility issues. 
I'm working on it. In the meantime, simply refresh the page if you encounter any of these issues.
