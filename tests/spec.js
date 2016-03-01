var FakeDB = require('../lib/index.js');
var should = require('should');

describe('DB', function() {
    beforeEach(function() {
        this.collection = [
            {title: 'foo'},
            {title: 'bar'}
        ];
        this.db = new FakeDB(this.collection);
    });
    afterEach(function() {
        this.db = null;
    });

    describe('#getCollection', function() {
        it('should return the whole collection', function(done) {
            this.db.getCollection().then(function(collection) {
                collection.should.be.eql(this.collection);
                done();
            }.bind(this));
        });
    });

    describe('#setItem', function() {
        it('should set a new item without specified id', function(done) {
            this.db.setItem({title: 'baz'})
                .then(function(db) {
                    return db.getCollection();
                })
                .then(function(collection) {
                    collection.should.have.lengthOf(3);
                    done();
                });
        });
        it('should set a new item with specified id', function(done) {
            var id = Date.now();

            this.db.setItem(id, {title: 'baz'})
                .then(function(db) {
                    return db.getCollection();
                })
                .then(function(collection) {
                    collection.should.have.lengthOf(3);
                    collection[collection.length - 1].id.should.eql(id);
                    done();
                });
        });
    });

    describe('#removeItem', function() {
        it('should remove an item with specified id', function(done) {
            var db = this.db;

            db.getCollection()
                .then(function(collection) {
                    var id = collection[0].id;
                    return db.removeItem(id);
                })
                .then(function() {
                    return db.getCollection();
                })
                .then(function(collection) {
                    collection.should.have.lengthOf(1);
                    done();
                });
        });
    });
})
