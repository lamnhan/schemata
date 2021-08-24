#### Security rules

```js
match /metas/{docId} {
  allow read: if (
    // 1. default
    (
      resource.data.type == 'default'
      &&
      (
        (resource.data.group != 'user_search_index') ||
        (resource.data.group == 'user_search_index' && isMine(resource.data.uid))
      )
    )
    ||
    // 2. system
    (resource.data.type == 'system' && allowedLevel(5))
  );
  allow create: if (
    creationMandatory(docId)
    // only allow these type
    // NOTE: add your custom to the list
    && request.resource.data.type in ['default', 'system', /* ... */]
    && (
      // 1. default
      (
        request.resource.data.type == 'default'
        &&
        (
          (request.resource.data.group == 'public_meta') ||
          (request.resource.data.group == 'user_search_index' && isMine(request.resource.data.uid))
        )
      )
      ||
      // 2. system
      (request.resource.data.type == 'system' && allowedLevel(5))
    )
  );
  allow update: if (
    unchangableFields()
    &&
    (
      // 1. default
      (
        resource.data.type == 'default'
        &&
        (
          (resource.data.group == 'public_meta') ||
          (resource.data.group == 'collection_meta' && allowedLevel(5)) ||
          (resource.data.group == 'search_index' && allowedLevel(5)) ||
          (resource.data.group == 'user_search_index' && isMine(resource.data.uid))
        )
      )
      ||
      // 2. system
      (resource.data.type == 'system' && allowedLevel(5))
    )
  );
  allow delete: if allowedLevel(5);
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `allowedLevel`
- `isMine`
- `creationMandatory`
- `unchangableFields`

#### Indexing

```sh
group Ascending
master Ascending
type Ascending
createdAt Descending
```
