Material Floating Button
========================

Material design floating button action implementation.

Made to be semantic, fast and easy to customize.
~~Shamelessly~~ inspired by action buttons from Google Inbox, Evernote and Path.

See a demo [here](http://nobitagit.github.io/material-floating-button/) to see it in action or just take a look at this awesome gif:

<img src="http://zippy.gfycat.com/LimitedTatteredFieldmouse.gif">

Test all the available effects to date in the [demo](http://nobitagit.github.io/material-floating-button/).

##Other versions##
Also available as:

- [Angular directive](https://github.com/nobitagit/ng-material-floating-button)
- [React Component](https://github.com/nobitagit/react-material-floating-button)

##How to use##
###Basic usage###
Clone/download the repo from Github or just use npm:
```
npm install mfb --save
```

(Optionally) run `npm install` to have access to the configured Grunt tasks if you use them, then reference the basic css styles in your `<head>` like so:

```html
<link href="path/to/css/mfb.css" rel="stylesheet">
```

Use the appropriate html structure (better explained later), for example:

```html
<ul class="mfb-component--tl mfb-slidein" data-mfb-hover>
  <!-- the menu content -->
</ul>
```
Everything should already work fine.

You may or may not want to include the provided `mfb.js` script depending on the need to support click/touch.

```html
<script src="path/to/js/mfb.js"></script>
```

For a breakdown on why and when you need to include the script please refer to [Toggling options and touch devices support](#toggling-opts).

###Customising the component###
####HTML####
The basic structure of the component is the following (the customisable classes/attributes are in curly braces):

```html
<ul class="{{placement-class}} {{effect-class}}" {{hover/click-to-open}} {{menu-state}}>
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

The best way to tweak them is leave the `src/mfb.scss` source as is, import it in your own style sheet and define your custom variables before the `@import` statement right there. For example:

```scss
// your .scss working file
$main-color: #4991EF;

@import "path/to/src/mfb.scss";
```

This will leave the core files unchanged from the source. You will then be able to keep this repo as upstream and pull in any future changes without having to worry about overwriting your changes.

Here below is a breakdown of all the variables currently available, along with their defaults.

#####Basic#####

Variable name | Default value | Explanation
--- | --- | ---
$main-color | #E40A5D | main/primary color of the component
$bright-text | rgba(255, 255, 255, 0.8) | color of icons and text
$number-of-child-buttons | 4 | how many child buttons the component supports

#####Effects#####
**n.b.** - set to true to include the effect styles in the compiled .css file. To actually activate the desired effect you need to reference the corresponding class in the markup (see [here](#html))

Variable name | Default value
--- | ---
$effects-zoomin | true
$effects-slidein | true
$effects-slidein-spring | true
$effects-fountain | true

As a suggestion, try to only include the animation you're using in production in order to have a much lighter css.

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

<a name="toggling-opts"></a>
####Toggling options and touch devices support####
The menu can be customised to be activated either on hover or on click/tap. To assign the desired toggling method the component provides some attributes to add this functionality in a declarative way right from the markup.

#####Hover toggling#####

If you're only interested in desktop support and want the menu to be activated on hover you won't need to include any scripts as that animation is CSS-based and included in the stylesheet provided. Just set the `data-mfb-toggle` attribute to `hover` like so:

```html
<ul class="mfb-component--tl mfb-slidein" data-mfb-toggle="hover">
```

#####Click toggling#####

To add click and touch support (and to support the open/close animation programmatically, more on this later) include the `mfb.js` file and reference it in the page. Finally set the `data-mfb-toggle` attribute to `click`, along with the initial state you want the menu to appear at load time, using the `data-mfb-state` attribute. An example:

```html
<ul class="mfb-component--tl mfb-slidein" data-mfb-toggle="click" data-mfb-state="closed">
```

If you want the menu to appear open at load time, do this instead:

```html
<ul class="mfb-component--tl mfb-slidein" data-mfb-toggle="click" data-mfb-state="open">
```

#####Hover toggling along with touch support#####

If you want the menu to work on hover but need support for touch devices you first need to include Modernizr to detect touch support. If you are alreay using it in your project just make sure that the touch detection is enabled.

If you're not using Modernizr already, just include the provided `modernizr.touch.js` script (look in the `src/lib/` folder) in your `<head>` or get the latest version of this very script right from [here](http://modernizr.com/download/#-touch-teststyles-prefixes). Note that this is a custom build and will only detect for touch support, it's not the full library.

Then include the `mfb.js` file, ideally at the bottom of your page.
Once the scripts are in place just set up a normal button with hover toggling like so:

```html
<ul class="mfb-component--tl mfb-slidein" data-mfb-toggle="hover">
```

The script will take care of changing the behavior when the page is viewed from a touch enabled device.

#####Opening/closing the menu programmatically#####

If you need to close the menu after a certain event (or open it without user interaction) you can easily do so just by setting its state to `closed` or `open`. Once you have selected the menu in your desired way just close it like so:

```js
menu.setAttribute('data-mfb-state', 'closed');
```
Or open it with:

```js
menu.setAttribute('data-mfb-state', 'open');
```

##Contributions?##
Yes please!
If you submit a PR please add the relative documentation in this README (if needed) and don't forget to add you name and/or email to the contributors list in the package.json file.

##Credits##
- Andrey Sitnik's [Easings.net](http://easings.net/) for visualizing animations.
- Demo icons courtesy of [Ionicons](ionicons.com).
- All the [contributors](https://github.com/nobitagit/material-floating-button/graphs/contributors) to this project.

##Todos##

- [x] provide minified script and stylesheet
- [ ] replace `@extend`s as much as possible from the SCSS to optimize output
- [ ] more animations
- [ ] add to bower
- [ ] provide more variables/get rid of currently hard-coded values
