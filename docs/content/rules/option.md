```js
match /options/{document=**} {
  allow read: if true;
  allow write: if allowedLevel(5);
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `allowedLevel`
