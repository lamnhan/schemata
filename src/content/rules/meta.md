```js
match /metas/{document=**} {
  allow list: if allowedLevel(4);
  allow get: if true;
  allow write: if allowedLevel(4);
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `allowedLevel`
