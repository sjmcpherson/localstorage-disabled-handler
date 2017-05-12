var localStorageHandler = (function(window) {
    /**
     * localStorageHandler Module
     * JavaScript object with methods to provide fallback for localStorage
     * You can safely use this wrapper even browser has no localStorage support.
     * @name localStorageHandler
     * Add above any usage of localStorage & replace any references to localStorate with localStorageHandler;
     */

    //can be used to report exceptions i.e. external error logger.
    var exceptionFunc = function(e, type, name){
        if (typeof(name) == 'undefined') {name = 'undefined'}
        console.log('localStorageHandler initiated for error ' + e.name + ' on method ' + type + ' using key ' + name);
    }
    //use localStorageHandlerException to set exceptionFunc externally
    exceptionFunc = window.localStorageHandlerException || exceptionFunc;

    var ls = null;
    try {
        ls = window.localStorage;
    } catch(e) {
        exceptionFunc(e, 'parent'); 
    }

    function setItemHandler(key, data, e){
        if(typeof localStorageHandler._data[key] === 'undefined'){
            localStorageHandler.length++;
        }
        localStorageHandler._data[key] = data;
        exceptionFunc(e, 'setItem', key); 
        return true;         
    }


   

    return {

        /**
         * Store key.
         * @param {String} key
         * @param {String} data
         * @return {Boolean}
         */
        length : 0,
        _data : {},
        setItem: function(key, data) {
            try {
                ls.setItem(key, data);
                return true;
            } catch (e) {      
                if(e.name == 'NS_ERROR_FILE_CORRUPTED') { //Handle Firefox LocalStorage corruption
                    //attempt localStorage Clear();
                    try {
                        ls.clear();
                        ls.setItem(key, data);
                    } catch (e) {  
                        return setItemHandler(key, data, e);          
                    }
                }else{
                   return setItemHandler(key, data, e);                 
                }
                // iPad workaround
                /*if (this.removeItem(key)) {
                    try {
                        ls.setItem(key, data);
                        return true;
                    } catch(e) {
                    }
                }*/

            }
            return false;
        },

        /**
         * Get key.
         * @param {String} key
         * @return {String}
         */
        getItem: function(key) {
            try {
                return ls.getItem(key);
            } catch (e) {
               exceptionFunc(e, 'getItem', key); 

               return this._data[key] === undefined ? null : this._data[key];
            }
            return null;
        },

        /**
         * Clear storage.
         * @return {Boolean}
         */
        clear: function() {
            try {
                ls.clear();
                return true;
            } catch(e) {
               exceptionFunc(e, 'clear'); 
               this._data = {};
               this.length = 0;
               return true;
            }
            return false;
        },

        /**
         * Remove key.
         * @param {String} key
         * @return {Boolean}
         */
        removeItem: function(key) {
            try {
                ls.removeItem(key);
                return true;
            } catch(e) {
                if(typeof this._data[key] !== 'undefined'){
                    delete this._data[key];
                    this.length--;
                    //this._length--;
                    return true;
                }else{
                    return false;
                }
                exceptionFunc(e, 'removeItem', key); 
            }
            return false;
        },

        /**
         * Return key name by index.
         * @param {Number} index
         * @return {String}
         */
        key: function(index) {
            try {
                return ls.key(index);
            } catch (e) {
               exceptionFunc(e, 'key', index); 
                    // not perfect, but works
              var ctr = 0;
              for (var k in this._data) {
                  if (ctr == index) return k;
                  else ctr++;
              }
              return null;
            }
            return '';
        }
    };


}(window));
