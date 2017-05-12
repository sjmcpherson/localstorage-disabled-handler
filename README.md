# localStorageHandler
Replacement non-persistant handler for localStorage to catch execution stopping errors &amp; provide fallback functionality, mainly for th e purpose of when Browsers are set to not store client-side data.

Note: This is not a polyfill for localStorage, as data will not persist between pages or when a browser closes.

## Handles the following situations:

- Handles Browsers which have been specifically set to not store client-side data i.e. In Chrome - "Settings > Privacy > Content Settings > Block sites from setting any data" and provides fallback non-persistant functionality.
- Handles QUOTA_EXCEEDED_ERR error & provides fallback for localStorage when using iOS Safari Private Browser mode 
- Catches Firefox NS_ERROR_FILE_CORRUPTED error and attempts to fix on setItem(UNTESTED) if unable to fix provides fallback for localStorage 
- Provides fallback for older browsers which don't support localStorage

## Usage
Add localstorage-handler.js before any usage of localStorage and replace any calls to localStorage with 'localStorageHandler'

i.e
```javascript
localStorageHandler.setItem('myCat', 'Tom');  //Replaces localStorage.setItem('myCat', 'Tom');
localStorageHandler.getItem('myCat');  //Replaces localStorage.getItem('myCat');
```
