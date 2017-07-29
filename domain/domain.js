/**
 * Created by sanja on 7/28/2017.
 */
// domain.js

var t = require('tcomb');

var AddressInput = t.struct({
    buildingNumber: t.Str,
    unitNumber: t.maybe(t.Str),
    lat: t.maybe(t.Num),
    latm: t.maybe(t.Num),
    lon: t.maybe(t.Num),
    postcode: t.Str,
    state: t.Str,
    street: t.Str,
    suburb: t.Str
}, { name: 'AddressInput', strict: true });

var PropertyInput = t.struct({
    address: AddressInput,
    propertyTypeId: t.Num,
    readyState: t.Str,
    reference: t.Str,
    shortId: t.Str,
    status: t.Num,
    type: t.Str,
    valfirm: t.maybe(t.Str),
    workflow: t.Str
}, { name: 'PropertyInput', strict: true });

var PropertyListInput = t.list(
    PropertyInput
);

var PropertyListPayloadInput = t.struct({
    payload: PropertyListInput},{ name: 'PropertyListPayloadInput', strict: true }
);

var FilteredPayloadOutput = t.struct({
    id:       t.Num,
    username: t.Str
});

module.exports = {
    PropertyInput:  PropertyInput,
    PropertyListInput:  PropertyListInput,
    PropertyListPayloadInput: PropertyListPayloadInput,
    AddressInput: AddressInput,
    FilteredPayloadOutput: FilteredPayloadOutput
};
