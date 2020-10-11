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

- Vue.js 2.6.11 - main framework
- Vuex 3.1.2 - for sharing user state
- VueRouter 3.1.3 - for route managment, guards, navigation
- Vuetify 2.1.15 - ui component library
- Rxjs 6.5.4 - tiny bit of code for request spam prevention
- Chart.js 2.9.3 - used for stat pie chart
- Vue Test Utils 1.0.3 & Jest 24.9 - running tests
- Moment.js 2.24 - working with time

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
- [x] Sort by categories (2read, read, reading)
- [x] User genre statistics
- [x] Rate & Review
- [x] User reading feed
- [x] Add private books
- [x] OAuth Authorization (Google + Twitter)

### To-do

- [ ] Account settings (security) !important
- [ ] Advanced user stats
- [ ] Advanced search
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
/src/http - Vue Resource configuration, interceptors
```

```
/public - index.html and public exposed files (future logo and stuff)
```
