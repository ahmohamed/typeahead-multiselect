# Typeahead-multiselect: a tiny extension to twitter typeahead to allow multiple selections
===========================================================================================


Typeahead-multiselect extends the current functionality of [Twitter Typeahead](https://github.com/twitter/typeahead.js/) to allow multiple selections.


### Usage

You can use Typeahead-multiselect using the same signature as Typeahead.

```html
<div id="typeaheadmulti">
  <input class="typeahead" type="text" placeholder="States of USA">
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

### Styling
You can use the styles accompanied with the package `typeahead-multiselect.min`, which gives similar look and feel as Twitter typeahead. You can also change the style of the selection container using the class `"ttmulti-selections"`.

### Limitations
These are the current limitations for typeaheadmulti. All these limitations
can be easily supported (the souce code is marked with TODOs).
Contributions through pull requests all very welcome.
 
 - No support for multiple datasets.
 - No support for selection templates (to control how selected options are rendered).
 - Setting the selections programmatically by `$.typehead('val', someVal)`
 
### License
Licensed under the MIT License.