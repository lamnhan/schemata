## Security helpers

To use shared security helper functions, add them before any collection rule:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
    /* 1. HELPER FUNTIONS */
    // ...

    /* 2. COLLECTION RULES */
    // ...

  }
}
```

### List of functions

#### `isAuth()`

Only signed in user.

```js
function isAuth() {
  return request.auth != null;
}
```

#### `isMine(uid)`

Something belongs to an user.

```js
function isMine(uid) {
  return isAuth() && request.auth.uid == uid;
}
```

#### `isRole(role)`

Check user role.

```js
function isRole(role) {
  return isAuth()
    && role in request.auth.token
    && request.auth.token.role == role;
}
```

#### `allowedLevel(atLeast)`

Check user level at least.

```js
function allowedLevel(atLeast) {
  let level =
    (request.auth.token.role == 'sadmin')
    ? 6
    : (request.auth.token.role == 'admin')
    ? 5
    : (request.auth.token.role == 'editor')
    ? 4
    : (request.auth.token.role == 'author')
    ? 3
    : (request.auth.token.role == 'contributor')
    ? 2
    : 1;
  return level >= atLeast;
}
```

#### `isDocExists(collection, doc)`

Check a doc exists in a collection.

```js
function isDocExists(collection, doc) {
  return exists(/databases/$(database)/documents/$(collection)/$(doc));
}
```

#### `isRequestContains(field)`

The request doc contains a field and not null

```js
function isRequestContains(field) {
  return field in request.resource.data
    && request.resource.data[field] != null
    && (
      !(field in resource.data)
      || request.resource.data[field] != resource.data[field]
    );
}
```

#### `isRequestContainsAny(fields)`

The request doc contains any fields

```js
function isRequestContainsAny(fields) {
  return request.resource.data.diff(resource.data).affectedKeys().hasAny(fields);
}
```

#### `isRequestContainsOnly(fields)`

The request doc contains only fields

```js
function isRequestContainsOnly(fields) {
  return request.resource.data.diff(resource.data).affectedKeys().hasOnly(fields);
}
```

#### `allowStatistics()`

The request doc contains only statistic fields

`TODO: only allow +1 increment`

```js
function allowStatistics() {
  return isRequestContainsOnly(['viewCount', 'likeCount', 'commentCount', 'rateCount', 'shareCount'])
}
```
