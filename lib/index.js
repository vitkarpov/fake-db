/**
 * Creates a new storage for fake database
 * @class
 * @param {Array} collection
 */
var FakeDB = function(collection) {
    this.__initHashMap(collection);
};
var gid = 0;

FakeDB.prototype =
/**
 * @lends FakeDB
 */
{
    /**
     * Sets the data by specified key
     * @param {String} id
     * @param {*} data
     * @returns {Promise}
     */
    setItem: function(id, data) {
        return this.__getPromise(function(res) {
            if (typeof id === 'object') {
                data = id;
                id = ++gid;
            }
            data.id = id;
            this.__hashMap[id] = data;
            res(this);
        });
    },

    /**
     * Gets the record binded to the specified key
     * @param  {String} id
     * @returns {Promise}
     */
    getItem: function(id) {
        return this.__getPromise(function(res) {
            res(this.__hashMap[id]);
        });
    },

    /**
     * Removes the record binded to the specified key
     * @param  {String} id
     * @return {Promise}
     */
    removeItem: function(id) {
        return this.__getPromise(function(res) {
            this.__hashMap[id] = null;
            res(this);
        });
    },

    /**
     * Gets the whole collection
     * @return {Promise}
     */
    getCollection: function() {
        return this.__getPromise(function(res) {
            res(this.__getCollection());
        });
    },

    /**
     * Returns a promise emulates async call to bd
     * @param  {Function} callback
     * @return {Promise}
     */
    __getPromise: function(callback) {
        return new Promise(function(res, rej) {
            process.nextTick(callback.bind(this, res, rej));
        }.bind(this));
    },

    /**
     * Converts initial collection to hash map for convenient search
     * @private
     * @param {Array} collection
     * @returns {Object}
     */
    __initHashMap: function(collection) {
        // A new objects gets nothing as its prototype,
        // it's convenient to store data in it 'cause of iteration with for-in loop
        // doesn't require checking values with hasOwnProperty
        var hashMap = Object.create(null);

        collection.forEach(function(item) {
            var id = ++gid;

            item.id = id;
            hashMap[id] = item;
        });
        this.__hashMap = hashMap;
    },

    /**
     * Converts underlying hashmap to collection
     * @return {Array}
     */
    __getCollection: function() {
        var result = [];
        var item;

        for (var id in this.__hashMap) {
            item = this.__hashMap[id];
            if (item) {
                result.push(item);
            }
        }
        return result;
    }
};

module.exports = FakeDB;
