
var expect = require ('expect');
var getter = require ('./property-resolver.js');


describe ('property-resolver', function() {

    it ('should resolve the property of an object', function () {
        var response = {data: {}};

        expect (getter ('data', response)).toEqual ({});
    });

    it ('should eventually resolve the property when called with an object', function () {
        var response = {data: {hero: {name: 'Batman', city: 'Arkham'}}};

        expect (getter ('data')('hero')('name')(response)).toEqual ('Batman');
        expect (getter ('data')('hero')('city')(response)).toEqual ('Arkham');
    });

    it ('should be callable with multiple arguments', function () {
        var response = {data: {hero: {name: 'Batman'}}};

        expect (getter ('data')('hero', 'name', response)).toEqual ('Batman');
        expect (getter ('data', 'hero')('name', response)).toEqual ('Batman');
        expect (getter ('data', 'hero', 'name', response)).toEqual ('Batman');
        expect (getter ('data', 'hero', 'name')(response)).toEqual ('Batman');
        expect (getter ('data', 'hero', 'name', response)).toEqual ('Batman');
    });

    it ('should resolve the item of an array', function () {
        var response = {data: {heroes: [{name: 'Batman'}, {name: 'Superman'}]}};

        expect (getter ('data')('heroes[0]')('name')(response)).toEqual ('Batman'  );
        expect (getter ('data')('heroes[1]')('name')(response)).toEqual ('Superman');
    });
});