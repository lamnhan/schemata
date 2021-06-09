```js
match /pages/{document=**} {
  allow read: if true;
  allow write: if allowedLevel(4);
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `allowedLevel`
