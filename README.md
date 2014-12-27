material-floating-button
========================

Material design floating button action implementation.

Made to be semantic, fast and easy to customize.
~~Shamelessly~~ inspired by action buttons from Google Inbox, Evernote and Path.  

See a demo [here](http://nobitagit.github.io/material-floating-button/) and test the available effects in the [showcase](http://nobitagit.github.io/material-floating-button/showcase.html).

Demo icons courtesy of [Ionicons](ionicons.com)

##Other versions##
Also available as:

- [Angular directive](https://github.com/nobitagit/material-floating-button)

##How to use##
###Basic usage###
Download the whole repo directly on Github or clone it, (optionally) run `npm install` to have access to the configured Grunt tasks if you use them, then reference the basic css styles in your `<head>` like so:

```html
<link href="path/to/css/mfb.css" rel="stylesheet">
```

Use the appropriate html structure (better explained later), for example:

```html
<ul class="mfb-component--tl mfb-slidein">
  <!-- the menu content -->
</ul>
```
Everything should already work fine.

###Customising the component###
####HTML####
The basic structure of the component is the following (the customisable classes are in curly braces):

```html
<ul class="{{placement-class}} {{effect-class}}">
  <li class="mfb-component__wrap">
    <!-- the main menu button -->
    <a data-mfb-label="{{the label text of the main button}}" class="mfb-component__button--main">
      <!-- the main button icon visibile by default -->
      <i class="mfb-component__main-icon--resting {{icon-class}}"></i>
      <!-- the main button icon visibile when the user is hovering/interacting with the menu -->
      <i class="mfb-component__main-icon--active {{active-icon-class}}"></i>
    </a>     
    <ul class="mfb-component__list">
      <!-- a child button, repeat as many times as needed -->
      <li>
        <a href="link.html" data-mfb-label="{{the label text of the a child button}}" class="mfb-component__button--child">
          <i class="mfb-component__child-icon {{icon-class}}"></i>
        </a>
      </li>
    </ul>        
  </li>  
</ul>
```

####SCSS/CSS####
Although you can use the provided css as is, it's highly likely that you will want to customise the looks and behavior of the component by changing its underlying css. A number of variables is provided for your convenience in the SASS file. 

The suggested way to tweak them is to leave the `src/mfb.scss` unchanged and instead override its default values from the `_customise.scss` file. This will leave the core file unchanged from the source and you will be able to keep this repo as upstream and pull in any future changes without having to worry about overwriting your changes. An example of this can be found in `_customise-example.scss`.

Here below is a breakdown of all the variables currently available, along with their defaults.

#####Basic#####

Variable name | Default value | Explanation
--- | --- | ---
$main-color | #E40A5D | main/primary color of the component
$bright-text | rgba(255, 255, 255, 0.8) | color of icons and text
$number-of-child-buttons | 4 | how many child buttons the component supports

#####Effects#####
**n.b.** - set to true to include the effect styles in the compiled .css file. To actually activate the desired effect you need to reference the corresponding class in the markup (see [here](#html))

Variable name | Default value | Explanation
--- | --- | ---
$effects-zoomin | true | include zoomin styles in the css
$effects-slidein | true | include slidein styles in the css
$effects-fountain | true | include fountain styles in the css

#####Speeds#####

Variable name | Default value | Explanation
--- | --- | ---
$delay-staggering-inflate | 0.1s | each child button can appear with a slight, more natural delay (set to 0 for no-delay)
$slide-speed | 0.5s | the child buttons animate at this speed
$label-hover-off | 0.5s | the child buttons labels fade *in* at this speed
$label-hover-on | 0.3s | the child buttons labels fade *out* at this speed

#####Sizes#####

Variable name | Default value | Explanation
--- | --- | ---
$main_button_size | 25px | the distance of the main button from the closest corners of the screen
$labels-font-size | 13px |font-size for all labels
$labels-padding-vertical | 4px | top & bottom padding for the labels
$labels-padding-horizontal | 10px | left & right padding for the labels

You can compile the final css on your own or use the provided, pre-configured Grunt tasks for it. After installing all dependencies (by running `npm install` from the terminal) type `grunt sass` (on time compilation) or `grunt watch-css` (live reload triggered after the scss files are changed).


