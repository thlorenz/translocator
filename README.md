# translocator [![build status](https://secure.travis-ci.org/thlorenz/translocator.png)](http://travis-ci.org/thlorenz/translocator)

[![testling badge](https://ci.testling.com/thlorenz/translocator.png)](https://ci.testling.com/thlorenz/translocator)

Convert line-column locations to ranges and vice-versa.

```js
var assert = require('assert');

var text = [
    'line0'
  , 'line1'
].join('\n');

var translocator = require('../')(text);

var locations = { start: { line: 0, column: 2 }, end: { line: 1, column: 3 } };
var range     = translocator.range(locations.start, locations.end)

console.dir({ range: range, subtext: text.slice(range[0], range[1]) });

assert.deepEqual(translocator.locations(range), locations);

// => { range: [ 2, 9 ], subtext: 'ne0\nlin' }
```

## Installation

    npm install translocator

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="translocator"><span class="type-signature"></span>translocator<span class="signature">(text)</span><span class="type-signature"> &rarr; {Translocator}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a translocator for the given text.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>text</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js#L5">lineno 5</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>translocator</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Translocator</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="translocator::index"><span class="type-signature"></span>translocator::index<span class="signature">(loc)</span><span class="type-signature"> &rarr; {number}</span></h4>
</dt>
<dd>
<div class="description">
<p>Finds the index in the text that matches the given location.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>loc</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>location of format: <code>{ line: number, column: number }</code></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js#L23">lineno 23</a>
</li>
</ul></dd>
</dl>
<h5>Throws:</h5>
<dl>
<dt>
<div class="param-desc">
when the given location is outside of the text
</div>
</dt>
<dt>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Error</span>
</dd>
</dl>
</dt>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the index of the given location in the text</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">number</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="translocator::location"><span class="type-signature"></span>translocator::location<span class="signature">(index)</span><span class="type-signature"> &rarr; {Object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Finds the location of the character in the text at the given index.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>index</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="description last"><p>the index of the character in the text to locate</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js#L60">lineno 60</a>
</li>
</ul></dd>
</dl>
<h5>Throws:</h5>
<dl>
<dt>
<div class="param-desc">
when the given index is outside of the text
</div>
</dt>
<dt>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Error</span>
</dd>
</dl>
</dt>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>location of format: <code>{ line: number, column: number }</code></p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Object</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="translocator::locations"><span class="type-signature"></span>translocator::locations<span class="signature">(range)</span><span class="type-signature"> &rarr; {Object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Finds the start and end locations for the given range</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>range</code></td>
<td class="type">
<span class="param-type">Array.&lt;number></span>
</td>
<td class="description last"><p>start and end indexes of the format <code>[ start, end ]</code></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js#L84">lineno 84</a>
</li>
</ul></dd>
</dl>
<h5>Throws:</h5>
<dl>
<dt>
<div class="param-desc">
when the given index is outside of the text
</div>
</dt>
<dt>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Error</span>
</dd>
</dl>
</dt>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>locations of the format <code>{ start: { line: number, column, number }, end: { line: number, column: number } }</code></p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Object</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="translocator::range"><span class="type-signature"></span>translocator::range<span class="signature">(locs, to)</span><span class="type-signature"> &rarr; {Arrary.&lt;number>}</span></h4>
</dt>
<dd>
<div class="description">
<p>Finds start and end index for the given locations.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>locs</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>start and end locationx of format:
<code>{ start: { line: number, column, number }, end: { line: number, column: number } }</code></p></td>
</tr>
<tr>
<td class="name"><code>to</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>end location of format: <code>{ line: number, column: number }</code></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/translocator/blob/master/index.js#L45">lineno 45</a>
</li>
</ul></dd>
</dl>
<h5>Throws:</h5>
<dl>
<dt>
<div class="param-desc">
when the given location is outside of the text
</div>
</dt>
<dt>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Error</span>
</dd>
</dl>
</dt>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the range of the locations within the text of format <code>[ start, end ]</code></p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Arrary.&lt;number></span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
