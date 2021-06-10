```js
match /profiles/{username} {
  allow read: if true;
  allow create:
    if isAuth()
    // new user only
    && !isDocExists("profiles", username)
    // .id must equals username
    && request.resource.data.id == username
    // .uid must match auth user uid
    && request.resource.data.uid == request.auth.uid        
    // can not contains
    && !isRequestContainsAny(["badges"]);
  allow update:
    if isAuth()
    // .uid must match auth user uid
    && resource.data.uid == request.auth.uid
    // unchangable fields
    && !isRequestContainsAny(["id", "uid", "badges"]);
  allow delete: if false;
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `isAuth`
- `isDocExists`
- `isRequestContainsAny`
