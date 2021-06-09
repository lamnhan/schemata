```js
match /tags/{document=**} {
  allow read: if true;
  allow create: if true;
  allow update: if isRole("admin");      
  allow delete: if isRole("admin");
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `isRole`