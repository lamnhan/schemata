```js
match /posts/{document=**} {
  allow read: if true;
  allow create:
    if request.resource.data.uid == request.auth.uid
    && (
      allowedLevel(3)
      || (
        isRole('contributor')
        && request.resource.data.status == 'draft'
      )
    );
  allow update:
    if !isRequestContainsAny(['id', 'uid'])
    && (
      allowStatistics()
      || allowedLevel(4)
      || (
        isRole('author')
        && resource.data.uid == request.auth.uid
      )
      || (
        isRole('contributor')
        && resource.data.uid == request.auth.uid
        && !isRequestContains('status')
      )
    );
  allow delete:
    if allowedLevel(4)
    || resource.data.uid == request.auth.uid;
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `isRole`
- `allowedLevel`
- `isRequestContains`
- `isRequestContainsAny`
- `allowStatistics`
