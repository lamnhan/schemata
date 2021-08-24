#### Security rules

```js
match /users/{uid} {
  allow list: if false;
  allow get: if isMine(uid);
  allow create: if (
    // for new user only
    !isDocExists("users", uid)
    // basic fields
    && creationMandatory(uid)
    // only allow 'default' type
    && request.resource.data.type == 'default'        
    // uid must match auth user uid
    && isMine(uid)
    // uid sync
    && request.resource.data.uid == uid
    // only allow 'publish' status
    && request.resource.data.status == 'publish'
    // must include these fields
    && ('createdAt' in request.resource.data && request.resource.data['createdAt'] != null)
    && ('updatedAt' in request.resource.data && request.resource.data['updatedAt'] != null)
  );
  allow update: if (
    isMine(uid)
    // unchangable fields
    && unchangableFields()
    // can not change username
    && !isRequestContains("username")
  );
  allow delete: if false;
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `isDocExists`
- `isMine`
- `isRequestContains`
- `creationMandatory`
- `unchangableFields`
