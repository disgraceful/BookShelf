# BookShelf

This pet project is a web application for searching books, authors and series to read, rate them, favorite or put on different "shelves" - read later, currently reading, finished, etc. Users can write reviews and track their reading progress. Also application tracks user stats, in particular read genres, and displays them in a chart.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Directories](#directories)

## General info

The end-goal of the projet is create a simple solution to organizing your "virtual" library. The application should have all the CRUD functionality to manipulate books, but also be simplstic enough to not be overloaded with social network functionality.

## Technologies

- Vue.js - 2.6.11
- Vuex - 3.1.2
- VueRouter - 3.1.3
- Vuetify - 2.1.15
- Rxjs - 6.5.4
- Chart.js - 2.9.3

## Setup

```
npm install
```

Development build with hot-reloads

```
npm run serve
```

Produciton build

```
npm run build
```

## Features

- [x] Search books
- [x] Favorite books
- [x] View favorites
- [x] Sort by categories (2read, read, reading)
- [x] User genre statistics
- [x] Rate & Review

### To-do

- [ ] User reading feed !important
- [ ] Account settings (security) !important
- [ ] Advanced user stats
- [ ] Advanced search
- [ ] Add 'private' books to service
- [ ] Language & Theme selection
- [ ] Deploy

## Directories

```
/src/components/... - mostly feature components that define layout of different pages
```

```
/src/components/shared - utility-based reusable components (loaders, alerts, etc)
```

```
/src/mixins - mixins for logic sharing
```

```
/src/services - promise-based methods for backend calls
```

```
/src/router - Vue Router configuration
```

```
/src/store - Vuex configuration
```

```
/public - index.html and public exposed files (future logo and stuff)
```
