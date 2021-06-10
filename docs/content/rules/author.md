```js
match /authors/{document=**} {
  allow read: if true;
  allow write: if allowedLevel(4);
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `allowedLevel`
