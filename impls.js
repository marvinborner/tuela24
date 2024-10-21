/**
 * Meta
 */

print = console.log
y = f => x => f(y(f))(x)
k = t => f => t
ki = t => f => f

/**
 * Logic
 */

// true/false Church booleans
tru = t => f => t
fls = t => f => f

// evaluate 
evalBool = bool => bool("true")("false")

print(evalBool(tru)) // "true"
print(evalBool(fls)) // "false"

// negate (c combinator)
negate = bool => t => f => bool(f)(t)

print(evalBool(negate(tru))) // "false"
print(evalBool(negate(fls))) // "true"

// logical and
and = a => b => b(a)(b)

// how?
// - if b is true, then b is re-bound to a (first arg, see lines 1,3)
// - if b is false, then b is re-bound to b (second arg, always false, see lines 2,4)

print(evalBool(and(tru)(tru))) // "true"
print(evalBool(and(tru)(fls))) // "false"
print(evalBool(and(fls)(tru))) // "false"
print(evalBool(and(fls)(fls))) // "false"

/**
 * Church Pairs
 */

// construction
cons = a => b => s => s(a)(b)

// example
examplePair = cons("a")("b")

// selectors
car = pair => pair(a => b => a)
cdr = pair => pair(a => b => b)

print(car(examplePair)) // "a"
print(cdr(examplePair)) // "b"

/**
 * Church Lists
 */

// ["a", "b", "c"] => pair "a" (pair "b" (pair "c" nil))
//                 => s1 => (s1 "a" (s2 => (s2 "b" (s3 => (s3 "c" nil)))))

// end of list
nil = head => tail => tail

exampleList = cons("a")(cons("b")(cons("c")(nil)))

// true if list is empty
isNil = list => list(head => tail => rest => fls)(tru)
// first argument gets substituted into first selector (s1)
//   just ignore all arguments and return false
//   "rest" is the right argument "tru"
// nil ignores first argument, second one is just returned as is ("true")

print(evalBool(isNil(nil))) // "true"
print(evalBool(isNil(exampleList))) // "false"

// length = y(rec => n => list => isNil(list)(n)(rec(n + 1)(cdr(list))))(0)

// thunked due to JS' strictness..
length = y(rec => n => list => isNil(list)(() => n)(() => rec(n + 1)(cdr(list))()))(0)

print(length(exampleList)())

/**
 * Scott Lists
 */

exampleScottList = end => s1 => s2("a")(s2 => s2("b")(end))

/**
 * Parigot Lists
 */

exampleParigotList = s1 => end1 => s1("a")(s2 => end2 => s2("b")(s3 => end3 => end3))

/**
 * Product types
 */

// data Friends = Friends { best :: String, friendly :: String, weird :: String }
Friends = best => friendly => weird => s => s(best)(friendly)(weird)
best = friends => friends(best => _ => _ => best)
friendly = friends => friends(_ => friendly => _ => friendly)
weird = friends => friends(_ => _ => weird => weird)

friends = Friends("Alice")("Bob")("Carol")
print(best(friends))

/**
 * Sum types, tagged unions
 */

// data Tree = Leaf Int | Node Tree Tree
Leaf = n => leaf => node => leaf(n)
Node = a => b => leaf => node => node(a)(b)
nodeLeft = node => node(_ => _)(a => b => a)
nodeRight = node => node(_ => _)(a => b => b)
leafValue = leaf => leaf(n => n)(_ => _)
isLeaf = tree => tree(n => tru)(a => b => fls)
isNode = tree => tree(n => fls)(a => b => tru)

exampleTree = Node(Leaf(1))(Node(Leaf(2))(Leaf(3)))
print(evalBool(isNode(exampleTree)))
print(evalBool(isLeaf(nodeLeft(exampleTree))))
print(leafValue(nodeLeft(exampleTree)))
print(leafValue(nodeRight(nodeRight(exampleTree))))

/**
 * Rose, Balanced, binary, finger, etc. trees
 */

// skipped, see bruijn std
// for example: AVL - can even be used for sets and hashmaps!

/**
 * Strings, chars
 */

// just a list of numbers/bits/etc.

/**
 * Church numerals
 */

churchZero = s => z => z
churchSucc = n => s => z => s(n(s)(z))
churchPred = n => f => x => n(g => h => h(g(f)))(u => x)(u => u)
churchIsZero = n => n(z => fls)(tru)

print(evalBool(churchIsZero(churchZero))) // true
print(evalBool(churchIsZero(churchSucc(churchZero)))) // false
print(evalBool(churchIsZero(churchPred(churchSucc(churchZero))))) // true

/**
 * Scott numerals
 */

scottZero = z => s => z
scottSucc = n => z => s => s(n)
scottPred = n => n(scottZero)(x => x)
scottIsZero = n => n(tru)(x => fls)

print(evalBool(scottIsZero(scottZero))) // true
print(evalBool(scottIsZero(scottSucc(scottZero)))) // false
print(evalBool(scottIsZero(scottPred(scottSucc(scottZero))))) // true

/**
 * Parigot numerals
 */

parigotZero = n => n
parigotSucc = n => a => b => b(n(a))
parigotPred = n => a => n(a(x => x))

/**
 * Wadsworth numerals
 */

wadsworthZero = n => n(u => k)
wadsworthSucc = n => a => b => n(c => a(b(c))(b))
wadsworthPred = n => a => n(b => k(a(b)))(x => x)
wadsworthIsZero = n => n(x => x)(k(k(ki)))

print(evalBool(wadsworthIsZero(wadsworthZero))) // true
print(evalBool(wadsworthIsZero(wadsworthSucc(wadsworthZero)))) // false
print(evalBool(wadsworthIsZero(wadsworthPred(wadsworthSucc(wadsworthZero))))) // true

/**
 * de Bruijn numerals
 */

bruijnZero = n => n
bruijnSucc = n => a => b => n(a)
bruijnPred = n => a => n(a)(a)
bruijnMult = a => b => a(b)

/**
 * n-ary numerals
 */

exampleMogensenBinary = end => b1 => b0 => b1(b1(end))
exampleMogensenTernary = end => tn => tp => t0 => t0(tp(end))

/**
 * rational, real, complex
 */

// skipped, see bruijn std

/**
 * Maybe monad
 */

Nothing = empty => full => empty
Just = v => empty => full => full(v)
isNothing = m => m(tru)(u => fls)
isJust = m => m(fls)(u => tru)
map => f => m => m(nothing)(v => just(f(v)))

pure = Just
bind = mx => f => mx(mx)(f)
//       ------------^^  ^-----------------
//       case Nothing     case Just (apply)

evalMaybe = maybe => maybe("Nothing")(v => "Just " + v)
print(evalMaybe(bind(Nothing)(n => pure(n + 1))))
print(evalMaybe(bind(Just(42))(n => pure(n + 1))))

/**
 * Either monad
 */

// data Either a b = Left a | Right b
Left = a => left => right => left(a)
Right = b => left => right => right(b)

// instance Monad
pure = Right
bind = mx => f => mx(Left)(f)
//          ---------^^^^  ^------------------
//          case Left       case Right (apply)

evalEither = either => either(a => "Left " + a)(b => "Right " + b)
print(evalEither(bind(Left(42))(n => pure(n + 1))))
print(evalEither(bind(Right(42))(n => pure(n + 1))))

/**
 * Mogensen-Scott meta
 */

// enc[x]      = sym => app => lam => sym(x)
// enc[f(x)]   = sym => app => lam => app(enc[f])(enc[x])
// enc[x => m] = sym => app => lam => lam(x => enc[m])

evalMeta = term => term
  (x => x)
  (f => x => eval(f)(eval(x)))
  (m => x => eval(m(x)))

/**
 * Bruijn-Church meta
 */

// enc[i]    = idx => app => lam => church[idx]
// enc[f(x)] = idx => app => lam => app(enc[f])(enc[x])
// enc[b]    = idx => app => lam => lam(enc[b])

/**
 * Lambda Screen
 */

// a screen is (s => s(tl)(tr)(bl)(br)), where tl,tr,bl,br in [screen, pixel]
//   pixel is (w => b => w) || (w => b => b)
