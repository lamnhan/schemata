## Security helpers

To use shared security helper functions, add them before any collection rules:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
    /* HELPER FUNTIONS */
  
    // ...

    /* COLLECTION RULES */
  
    // ...

  }
}
```

### General helpers

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
  return (isAuth() && request.auth.uid == uid);
}
```

#### `isRole(role)`

Check user role.

```js
function isRole(role) {
  return (
    // auth user
    isAuth()
    // token.role !== undefined
    && role in request.auth.token
    // token.role === role
    && request.auth.token.role == role
  );
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
  return (
    field in request.resource.data
    && request.resource.data[field] != null
    && (
      !(field in resource.data)
      || request.resource.data[field] != resource.data[field]
    )
  );
}
```

#### `isRequestContainsAny(fields)`

The request doc contains any fields

```js
function isRequestContainsAny(fields) {
  return (
    resource != null
    && request.resource.data.diff(resource.data).affectedKeys().hasAny(fields)
  );
}
```

#### `isRequestContainsOnly(fields)`

The request doc contains only fields

```js
function isRequestContainsOnly(fields) {
  return (
    resource == null
    || request.resource.data.diff(resource.data).affectedKeys().hasOnly(fields)
  );
}
```

### Content helpers

#### `creationMandatory(docId)`

Requirements on creation.

```js
function creationMandatory(docId) {
  return (
    // the doc id must equal .id field
    request.resource.data.id == docId
    // only allow these statuses
    && request.resource.data.status in ['draft', 'publish', 'archive', 'trash']
    // must include these fields (and .id, .status)
    && ('uid' in request.resource.data && request.resource.data['uid'] != null)
    && ('title' in request.resource.data && request.resource.data['title'] != null)
    && ('type' in request.resource.data && request.resource.data['type'] != null)
    && ('createdAt' in request.resource.data && request.resource.data['createdAt'] != null)
    && ('updatedAt' in request.resource.data && request.resource.data['updatedAt'] != null)
  );
}
```

#### `localizedMandatory()`

I18N enabled requirements. 

```js
function localizedMandatory() {
  return (
    ('locale' in request.resource.data && request.resource.data['locale'] != null)
    && ('origin' in request.resource.data && request.resource.data['origin'] != null)
  );
}
```

#### `unchangableFields()`

Requirements on update. 

```js
function unchangableFields() {
  return !isRequestContainsAny([
    'uid',
    'id',
    'type',
    'createdAt',
    'locale',
    'ogirin'
  ]);
}
```

#### `changableStatistics()`

The request doc contains only allowed statistic fields.

`TODO: only allow +1 increment`

```js
function changableStatistics() {
  return isRequestContainsOnly([
    'viewCount',
    'likeCount',
    'commentCount',
    'rateCount',
    'shareCount',
  ]);
}
```

### Post-alike helpers

#### `postAlikeCreate(docId)`

Post-alike content requirements on creation.

```js
function postAlikeCreate(docId) {
  return (
    // basic fields
    creationMandatory(docId)
    // localized
    && localizedMandatory()
    // only allow these type
    // NOTE: add your custom to the list
    && request.resource.data.type in ['default', /* ... */]
    // match user uid
    && isMine(request.resource.data.uid)
    // AND, author
    && (
      // role 'author' or higher
      allowedLevel(3)
      // OR, contributor then only create a draft
      || (
        isRole('contributor')
        && request.resource.data.status == 'draft'
      )
    )
  );
}
```

#### `postAlikeUpdate()`

Post-alike content requirements on update.

```js
function postAlikeUpdate() {
  return (
    // can not change lock-in fields
    unchangableFields()
    // AND
    && (
      // role 'editor' or higher
      allowedLevel(4)
      // OR, only changing stastistics
      || changableStatistics()
      // OR, role 'author' and the doc is theirs
      || (isRole('author') && isMine(resource.data.uid))
      // OR, role 'contributor' and their doc and no status changing
      || (
        isRole('contributor')
        && isMine(resource.data.uid)
        && !isRequestContains('status')
      )
    )
  );
}
```

#### `postAlikeDelete()`

Post-alike content requirements on delete.

```js
function postAlikeDelete() {
  return (
    // role 'editor' or higher
    allowedLevel(4)
    // OR, my doc
    || isMine(resource.data.uid)
  );
}
```
