#### Security rules

```js
match /profiles/{username} {
  allow read: if true;
  allow create: if (
    // new user only
    !isDocExists("profiles", username)
    // basic fields
    && creationMandatory(username)
    // only allow these types
    // NOTE: add your custom to the list
    && request.resource.data.type in ['default', /* ... */]
    // uid must match auth user uid
    && isMine(request.resource.data.uid)
    // only 'subscriber' role on creation
    && request.resource.data.role == 'subscriber'
    // can not contains
    && !isRequestContainsAny(["rank", "legit", "badges"])
    // 1 user => 1 profile doc
    // 1 user => multiple author-alike doc
    && (
      // not a profile doc
      request.resource.data.type != 'default' ||
      // if it is a profile doc, then for new user only
      !isDocExists("users", request.resource.data.uid)
    )
  );
  allow update: if (
    // unchangable fields
    unchangableFields()
    // AND, author
    && (
      // 'admin' role or higher
      allowedLevel(5)
      // OR, user change their profile
      || (
        // .uid must match auth user uid
        isMine(resource.data.uid)
        // can not contains
        && !isRequestContainsAny(["role", "rank", "legit", "badges"])
      )
    )
  );
  allow delete: if false;
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `isDocExists`
- `isMine`
- `creationMandatory`
- `isRequestContainsAny`
- `unchangableFields`

#### Indexing

```sh
status Ascending
type Ascending
createdAt Descending
```

#### Others

For advanced mode (counting, search, ...).

- Create one or more search index in `metas` collection:

```js
// id = a unique any/auto id
{
  uid: '[your uid]',
  id: '[a unique any/auto id]',
  title: 'profiles_search-index-0', // [collection name]_[some kind of identification] or just some text
  type: 'default',
  status: 'publish',
  createdAt: '[ISO timestamp]',
  updatedAt: '[ISO timestamp]',
  master: 'profiles',
  group: 'search_index',
  value: {
    items: {}
  }
}
```

- Create the collection meta doc in `metas` collection:

```js
// id = '$profiles'
{
  uid: '[your uid]',
  id: '$profiles',
  title: 'profiles_collection-metas',
  type: 'default',
  status: 'publish',
  createdAt: '[ISO timestamp]',
  updatedAt: '[ISO timestamp]',
  master: 'profiles',
  group: 'collection_meta',
  value: {
    documentCounting: {
      // group by type
      'default': {
        // group by locale 
        'en-US': {
          draft: 0,
          publish: 0,
          archive: 0,
          trash: 0,
        }
        // repeat for multiple locales
      }
      // repeat for multiple types
    },
    searchIndexing: {
      currentId: '[a search index id]',
      map: {
        '[a search index id]': {
          count: 0,
          next: '[next search index id]' // for multiple indexes
        }
        // repeat for multiple search indexes
      }
    }
  }
}
```
