# localStorageHandler
Handler/Polyfill for LocalStorage to handle execution stopping errors &amp; provide fallback functionality.

## Handles the Following situations:

- Handles QUOTA_EXCEEDED_ERR error & provides fallback for localStorage when using iOS Safari Private Browser mode 
- Handles Browsers which have been specifically set to not store client-side data i.e. In Chrome - "Settings > Privacy > Content Settings > Block sites from setting any data"
- Catches Firefox NS_ERROR_FILE_CORRUPTED error and attempts to fix(UNTESTED) provides fallback for localStorage 
- Provides fallback for older browsers which don't support localStorage

## Usage
Add localstorage-handler.js before any usage of localStorage
Use localStorageHandler just as you would use the localStorage namespace

i.e
```javascript
localStorageHandler.setItem('myCat', 'Tom');  //Replaces localStorage.setItem('myCat', 'Tom');
localStorageHandler.getItem('myCat');  //Replaces localStorage.getItem('myCat');
```
