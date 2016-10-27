# Typeahead-multiselect: a tiny extension to twitter typeahead to allow multiple selections

Typeahead-multiselect extends the current functionality of [Twitter Typeahead](https://github.com/twitter/typeahead.js/) to allow multiple selections.

### Usage

You can use Typeahead-multiselect using the same signature as Typeahead. [See it live](http://codepen.io/ahmohamed/pen/JRkErJ)

```html
<div id="typeaheadmulti">
  <input class="typeahead" type="text" placeholder="Search Languages">
</div>
```


```javascript
var language = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: ["English", "Arabic", "Japanese"]
});

$('#typeaheadmulti .typeahead').typeaheadmulti({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'language',
  source: language
});
```
### Options
All typeahead.js options are valid. In addition:

*selectionsContainer*: A Jquery-valid selector for the container where the selections will be added.

#### Dataset templates:
Templates should either be a string of a function that returns a string to be rendered. Handlebar temaplates are not supported.

*emptySelection*: Will be used to fill the container when no selections are selected.
*selection*: Should be a function that takes the selected object and returns a html string.

### Events

`selectionAdded` and `selectionRemoved` are fired after a selection is added or removed from the selection container.

### Styling
You can use the styles accompanied with the package `typeahead-multiselect.css.min`, which provides styling for the suggestion container. Selection container and selections are classed as `list-group` and `list-group-item` for bootrap compatiblity. If you want to use Boostrap for styling, make sure to include [`typeaheadjs.css`](https://github.com/bassjobsen/typeahead.js-bootstrap-css).

### Limitations
These are the current limitations for typeaheadmulti. All these limitations
can be easily supported (the souce code is marked with TODOs).
Contributions through pull requests all very welcome.
 
 - No support for multiple datasets.
 - Setting the selections programmatically by `$.typehead('val', someVal)`
 
### License
Licensed under the MIT License.
