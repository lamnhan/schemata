#### Security rules

```js
match /options/{docId} {
  allow read: if true;
  allow create: if (
    allowedLevel(5) &&
    creationMandatory(docId) &&
    // only allow these types
    // NOTE: add your custom to the list
    request.resource.data.type in ['default', /* ... */]
  );
  allow update: if allowedLevel(5) && unchangableFields();
  allow delete: if allowedLevel(5);
}
```

Requires shared security helpers, see [the list](/guide/security-helpers):
- `allowedLevel`
- `creationMandatory`
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
  title: 'options_search-index-0', // [collection name]_[some kind of identification] or just some text
  type: 'default',
  status: 'publish',
  createdAt: '[ISO timestamp]',
  updatedAt: '[ISO timestamp]',
  master: 'options',
  group: 'search_index',
  value: {
    items: {}
  }
}
```

- Create the collection meta doc in `metas` collection:

```js
// id = '$options'
{
  uid: '[your uid]',
  id: '$options',
  title: 'options_collection-metas',
  type: 'default',
  status: 'publish',
  createdAt: '[ISO timestamp]',
  updatedAt: '[ISO timestamp]',
  master: 'options',
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
