export var Module = function(x) {
    this.__value = x;
};

Module.of = function(x) {
    return new Module(x);
};

Module.prototype.map = function(traverse) {
    return Module.of(traverse(this.__value, {}, {}, {}));
};
