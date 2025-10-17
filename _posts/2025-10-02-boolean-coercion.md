---
title: I want to intercept Boolean Coercion for Objects in JavaScript
toot: https://fediverse.zachleat.com/@zachleat/115300801628689509
---
MDN takes a strong stance against using `new` with `Boolean`:

> …all objects, including a Boolean object whose wrapped value is false, are truthy and evaluate to true in places such as conditional statements. — [MDN: Boolean: Boolean primitives and Boolean objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_primitives_and_boolean_objects)

_(…though it makes [use of it on other pages without a warning](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/valueOf))_

```js
!!(Boolean(false)) // false

// Don’t use this!
!!(new Boolean(false)) // true
```

_A quick shout out to previously unknown (to me) [`new.target` for detecting use of `new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target) in your own classes._

But how do I customize this behavior? I want to make my own Boolean-esque object and I need a low-level mechanism to intercept boolean primitive coercion to do it!

Consider this class that extends `Boolean`:

```js
class MyBoolean extends Boolean {
	[Symbol.toPrimitive]() {
		return this.valueOf();
	}
}

!!(new MyBoolean(true)) // true
!!(new MyBoolean(false)) // true (I want `false`)
```

Or this example creating a new Boolean-esque class:

```js
class MyBoolean {
	#v;
	constructor(val) {
		this.#v = Boolean(val);
	}
	// not triggered
	valueOf() {
		return this.#v;
	}
	// not triggered
	[Symbol.toPrimitive]() {
		return this.#v;
	}
}

!!(new MyBoolean(true)) // true
!!(new MyBoolean(false)) // true (I want `false`)
```

MDN again, with a quick quip:

> Note: Unlike other type conversions like string coercion or number coercion, boolean coercion does not attempt to convert objects to primitives by calling user methods.—[MDN: Boolean: Boolean coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion)

I wish I could end this blog post with some magical hack that I found to workaround this behavior, but I have yet to make such a discovery. I’m only left with this blog-post-as-comment-card hoping that someone will see my plea to unlock this new power. ECMAScriptarians, help!

Related:

- [a gist from Dr. Axel Rauschmayer](https://gist.github.com/rauschma/505256190982dec4f66dbf0a28872db4)
- [Fake Operator Overloading (a blog post from Dr. Axel Rauschmayer)](https://2ality.com/2011/12/fake-operator-overloading.html)
