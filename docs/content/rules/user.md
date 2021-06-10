```js
match /users/{uid} {
  allow read: if isMine(uid);
  allow create:
    if isAuth()
    // for new user only
    && !isDocExists("users", uid);
  allow update:
    if isMine(uid)
    // check .username
    && (
      // not changed
      !isRequestContains("username")
      // OR, user change username
      // current doc exists in /profiles
      // new doc must not exists in /profiles
      || (
        isDocExists("profiles", resource.data.username)
        && !isDocExists("profiles", request.resource.data.username)
      )
    );
  allow delete: if false;
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `isAuth`
- `isMine`
- `isDocExists`
- `isRequestContains`
