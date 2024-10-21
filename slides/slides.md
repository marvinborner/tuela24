---
#theme: seriph
canvasWidth: 750
title: Really Functional Data Structures
author: Marvin Borner
colorSchema: light
class: text-center
transition: instant
mdc: true
# take snapshot for each slide in the overview
# overviewSnapshots: true
---

# *Really* Functional<br>Data Structures

[Marvin Borner](https://marvinborner.de)

<!--
Datenstrukturen nur aus Funktionen! Und wie man mit ihnen umgeht!
Frage: Erfahrung mit Lambdakalkül und Datenstrukturen?
Wieso, weshalb???
-->

---

# Goal/Motivation

<v-clicks>

- Represent arbitrary data using only functions
    - No classes, structs, numbers, etc.
    - Basically pure lambda calculus
- Think/program more functionally
- Elegant and minimal solutions
- Useful for theorem proving?
- Really fun!

</v-clicks>

<!--
- ..
- übertragbar
- e.g. easily typable
- ..
-->

---

# Anonymous Functions (Lambdas)

- Functions (abstractions) have an argument and a body
- Applying a function with an argument substitutes it
- Functions can be assigned to names (easier to read)

---

## JavaScript Notation

```js {monaco-run} {showOutputAt:1}
f = x => x + 42
console.log(f(2))
```

<div v-click=2>
```js {monaco-run} {showOutputAt:3}
f = x => y => x + y
console.log(f(2)(42))
```
</div>

---

# Really Functional Data Structures

<v-clicks>

- Only use pure, closed terms
- Multiple states are encoded via (unapplied) arguments and applications
    - Carefully, such that data doesn't reduce itself!
- State can often be extracted using "selector" argument

</v-clicks>

<!--
Wie Daten rein funktional darstellen?
-->

---
layout: cover
---

# Common

---

# Boolean Logic

- **Capacity**: 1 Bit (true/false)
- **Operations**: and/not/etc.

<!--
mit was einfachem starten :)
-->

---

## Church Booleans

```js
tru = t => f => t
fls = t => f => f
```

---

## Church Booleans

```js {monaco-run} {showOutputAt:'+1'}
tru = t => f => t
fls = t => f => f

evalBool = bool => bool("true")("false")
console.log(evalBool(tru))
console.log(evalBool(fls))
```

---

## Example: Negation

<v-clicks>

- We know: `bool = t => f => t/f`
- If `bool = t => f => t`, then `!bool = t => f => f`
- If `bool = t => f => f`, then `!bool = t => f => t`
- Therefore:
    ``` js
    negate = bool => t => f => bool(f)(t)
    //                              ^  ^
    //                     one will be eliminated!
    ```

</v-clicks>

---

## Example: Negation

```js {monaco-run} {showOutputAt:'+1'}
tru = t => f => t
fls = t => f => f
negate = bool => t => f => bool(f)(t)

evalBool = bool => bool("true")("false")
console.log(evalBool(negate(tru)))
console.log(evalBool(negate(fls)))
```

---

## Other Operators

- ``` js
  and = a => b => b(a)(b)
  ```
- ``` js
  xor = a => b => b(a(fls)(b))(a)
  ```
- ``` js
  xnor = a => b => b(a)(a(b)(tru))
  ```
- ``` js
  impl = a => b => a(b)(tru)
  ```
- ...

---

# Church Pairs

<v-clicks>

- Stores two values
- The selector function gets applied to both values:
    ``` js
    examplePair = s => s(A)(B)
    ```

</v-clicks>

---

## Construction/Selection

```js {monaco-run} {showOutputAt:'+1'}
cons = a => b => s => s(a)(b)
car = pair => pair(a => b => a)
cdr = pair => pair(a => b => b)
//                 ^^^^^^^^^^^
//              selector function

examplePair = cons("a")("b")
console.log(car(examplePair))
console.log(cdr(examplePair))
```

---
layout: cover
---

# Lists

---

# Church Lists

<v-clicks depth=2>

- Idea: A list is just a composition of pairs:<br>`[A, B, C, D] = (A, (B, (C, (D, NIL))))`
- But what is `NIL`?
    - marks the end of the list
    - differentiable from other elements

</v-clicks>

---

## `isNil`?

- We define NIL such that it *ignores* its selector argument

```js
cons = a => b => s => s(a)(b)
nil = s => x => x
exampleList = cons("a")(cons("b")(cons("c")(nil)))
//          = s1 => s1("a")(s2 => s2("b")(s3 => s3("c")(nil)))
```

---

## `isNil`?

- We define NIL such that it *ignores* its selector argument

```js {monaco-run} {showOutputAt:'+1'}
cons = a => b => s => s(a)(b)
nil = s => x => x
exampleList = cons("a")(cons("b")(cons("c")(nil)))
//          = s1 => s1("a")(s2 => s2("b")(s3 => s3("c")(nil)))

isNil = list => list(head => tail => right => fls)(tru)
//      ^^^^         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^
//    cons/nil               pair selector     nil selector

console.log(evalBool(isNil(nil)))
console.log(evalBool(isNil(exampleList)))
```

---

## Example: Iteration

```js {monaco-run} {showOutputAt:'+1'}
y = f => x => f(y(f))(x)
exampleList = cons("a")(cons("b")(cons("c")(nil)))
length = y(rec => n => list => isNil(list)
            (() => n)
            (() => rec(n + 1)(cdr(list))()))
          (0)

console.log(length(exampleList)())
```

---

# Other Lists

Example: Encoding of `["a", "b"]`

<v-clicks>

- Parigot:
    ```js
    end => s1 => s2("a")(s2 => s2("b")(end))
    ```
- Scott:
    ```js
    s1 => end1 => s1("a")(s2 => end2 => s2("b")(s3 => end3 => end3))
    ```
- $n$-Tuple:
    ```js
    s => s("a")("b")...
    ```

</v-clicks>

<!--
Parigot: Triviales append
Scott: Kein wirklicher Sinn
n-Tupel: Vorteile siehe später, length/pop schwierig/unmöglich
-->

---
layout: cover
---

# Numbers

(brief overview)

---

# Church Numerals

- Idea: Represent a number $n$ by applying $n$ composed functions to some argument!

---

# Church Numerals

- Idea: Represent a number $n$ by applying $n$ composed functions to some argument!
- For example:

```js {monaco-run} {showOutputAt:'+1'}
three = s => z => s(s(s(z)))

evalChurch = n => n(x => x + 1)(0)
console.log(evalChurch(three))
```

---

## Successor

- Add another `s` to the composition
- We also need to "rebind" existing `s` and `z`!

---

## Successor

- Add another `s` to the composition
- We also need to "rebind" existing `s` and `z`!

```js {monaco-run} {showOutputAt:'+1'}
// three = s => z => s(s(s(z)))

zero = s => z => z
succ = n => s => z => s(n(s)(z))

console.log(evalChurch(succ(succ(succ(zero)))))
```

<!--
Predecessor really hard :(
-->

---

## `isZero`?

Similar to `isNil`!

```js {monaco-run} {showOutputAt:'+1'}
// three = s => z => s(s(s(z)))

isZero = n => n(z => fls)(tru)

console.log(evalBool(isZero(zero)))
console.log(evalBool(isZero(succ(zero))))
```

---

# Other Numeral Systems

Example: Encoding of $3$ 

<v-clicks>

- Scott:
    ```js
    s1 => z1 => s1(s2 => z2 => s2(s3 => z3 => s3(s4 => z4 => z4)))
    ```
- Parigot:
    ```js
    end => s1 => s1(s2 => s2(s3 => s3(s4 => end)))
    ```
- Mogensen:
    ```js
    end => b1 => b0 => b1(b1(end))       // binary
    end => tn => tp => t0 => t0(tp(end)) // balanced ternary
    ```
- Wadsworth, de Bruijn, Rationals, ...

</v-clicks>

<!--
Scott: Trivial pred, add komplexer
Parigot: pred/add beide in einem Schritt!
-->

---
layout: cover
---

# Algebraic Types

<!--
Wie man diese speichern kann
Typen haben wir natürlich nicht
-->

---

# Products/Records

- Stores multiple elements, supports construction and extraction
- For two elements: Just a Church pair
- For multiple elements: Extend the pair!

---

# Products/Records

- Stores multiple elements, supports construction and extraction
- For two elements: Just a Church pair
- For multiple elements: Extend the pair!

```js {monaco-run} {showOutputAt:'+1'}
// data Friends = Friends { best :: String, friendly :: String, weird :: String }
Friends = best => friendly => weird => s => s(best)(friendly)(weird)
best = friends => friends(best => _ => _ => best)
friendly = friends => friends(_ => friendly => _ => friendly)
weird = friends => friends(_ => _ => weird => weird)

friends = Friends("Alice")("Bob")("Carol")
console.log(best(friends))
```

---

# Sums/Unions

- Similar: Stores multiple *types*, but only one at a time
- Typical functional data structure (e.g. Haskell's `data` "|")

<!--
Selektion/etc. sehr ähnlich zu Produkttypen, nur mit *mehr* Selektoren!
-->

---

```js {monaco-run}
// data Tree = Leaf Int | Node Tree Tree
Leaf = n => leaf => node => leaf(n)
Node = a => b => leaf => node => node(a)(b)
nodeLeft = node => node(_ => _)(a => b => a)
nodeRight = node => node(_ => _)(a => b => b)
leafValue = leaf => leaf(n => n)(_ => _)
isLeaf = tree => tree(n => tru)(a => b => fls)
isNode = tree => tree(n => fls)(a => b => tru)
```

---

```js {monaco-run}
// data Tree = Leaf Int | Node Tree Tree
Leaf = n => leaf => node => leaf(n)
Node = a => b => leaf => node => node(a)(b)
nodeLeft = node => node(_ => _)(a => b => a)
nodeRight = node => node(_ => _)(a => b => b)
leafValue = leaf => leaf(n => n)(_ => _)
isLeaf = tree => tree(n => tru)(a => b => fls)
isNode = tree => tree(n => fls)(a => b => tru)

exampleTree = Node(Leaf(1))(Node(Leaf(2))(Leaf(3)))
console.log(evalBool(isNode(exampleTree)))
console.log(evalBool(isLeaf(nodeLeft(exampleTree))))
console.log(leafValue(nodeLeft(exampleTree)))
console.log(leafValue(nodeRight(nodeRight(exampleTree))))
```

---
layout: cover
---

# Trees

Trivial with presented data structures

- Rose trees
- Binary trees
- Finger trees
- Balanced trees

---
layout: cover
---

# Monads

---

# Maybe

Stores either nothing or a value, but *tagged*

```js {monaco-run} {showOutputAt:'+1'}
// data Maybe a = Nothing | Just a
Nothing = nothing => just => nothing
Just = v => nothing => just => just(v)

// instance Monad
pure = Just
bind = mx => f => mx(mx)(f)
//       ------------^^  ^-----------------
//       case Nothing     case Just (apply)

evalMaybe = maybe => maybe("Nothing")(v => "Just " + v)
console.log(evalMaybe(bind(Nothing)(n => pure(n + 1))))
console.log(evalMaybe(bind(Just(42))(n => pure(n + 1))))
```

<!--
Basically just a tagged union... boring
-->

---

# Either

Stores either a value or another value, but *tagged*

```js {monaco-run} {showOutputAt:'+1'}
// data Either a b = Left a | Right b
Left = a => left => right => left(a)
Right = b => left => right => right(b)

// instance Monad
pure = Right
bind = mx => f => mx(Left)(f)
//          ---------^^^^  ^------------------
//          case Left       case Right (apply)

evalEither = either => either(a => "Left " + a)(b => "Right " + b)
console.log(evalEither(bind(Left(42))(n => pure(n + 1))))
console.log(evalEither(bind(Right(42))(n => pure(n + 1))))
```

---
layout: cover
---

# Meta

(little detour)

---

# Mogensen-Scott

- Meta encoding of lambda terms
- Tagged union: `Symbol x | Application Term Term | Lambda Term`
- Translation:
    ```js
    enc[x]      = sym => app => lam => sym(x)
    enc[f(x)]   = sym => app => lam => app(enc[f])(enc[x])
    enc[x => m] = sym => app => lam => lam(x => enc[m])
    ```

---

## Meta-Circular Interpreter

Evaluate lambda terms using the lambda implementation of the language itself!

```js
enc[x]      = sym => app => lam => sym(x)
enc[f(x)]   = sym => app => lam => app(enc[f])(enc[x])
enc[x => m] = sym => app => lam => lam(x => enc[m])
```

```js
eval = term => term
  (x => x)
  (f => x => eval(f)(eval(x)))
  (m => x => eval(m(x)))
```

---

# de Bruijn-Church

- Idea: Encode symbols as Church-encoded de Bruijn indices
- Abstractions are simpler and allow open terms
- Translation:
    ```js
    enc[i]    = idx => app => lam => church[idx]
    enc[f(x)] = idx => app => lam => app(enc[f])(enc[x])
    enc[b]    = idx => app => lam => lam(enc[b])
    ```

---

## 194 bit self interpreter

Minimal data structures allow minimal interpreters!

<style>
pre, code, pre * {
  color: black !important;
  background-color: transparent !important;
  margin: 0 auto;
  width: min-content;
  font-size: 90%;
  line-height: 1.1 !important;
}
small {
  font-size: 50%;
  }
</style>

```
01010001                                    00011100
11010000               ######               11100110
10000               ############               00001
01011              #####    #####              00001
11100             ####        ####             00101
01110             ####       #####             00011
00000             ####      ######             10100
00011             ####    ### ####             00111
10000             ####   ##   ####             11111
00001             #### ###    ####             11110
00010             ######      ####             11110
10011             #####       ####             10100
11110             ####        ####             00011
11000              #####    #####              00011
11000               ############               01011
01101110               ######               00011001
00011010                                    00011010
```

<small>

See [Metaprogramming and Self-Interpretation](https://text.marvinborner.de/2023-09-03-21.html)

</small>

<!--
Learning: minimale Datenstrukturen können zu minimalem Code führen!
-->

---
layout: cover
class: text-left
---

# Other Data?

- Strings? List of 2-ary numerals.
- Bits? List of Church booleans.
- Maps? Balanced tree with Church pairs.

---
layout: cover
---

# Images

---

# Quad Trees

- Leafs/pixels:
    ```js
    black = w => b => b
    white = w => b => w
    ```
- 4-tuple (product type):
    ```js
    screen = s => s(TL)(TR)(BL)(BR)
    ```
- Where `TL`,`TR`,`BL`,`BR` are either a screen or a pixel

---
layout: cover
---

# Demo

[Lambda Screen](https://lambda-screen.marvinborner.de)
