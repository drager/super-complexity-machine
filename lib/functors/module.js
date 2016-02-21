export var MaybeVisitor = function(visitor) {
    this.__value = visitor;
};

MaybeVisitor.of = function(visitor) {
    return new MaybeVisitor(visitor);
};

MaybeVisitor.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
};

MaybeVisitor.prototype.map = function(traverseAst) {
    return this.isNothing() ?
    MaybeVisitor.of(null) :
    MaybeVisitor.of(traverseAst(this.__value, {}, {}, {}));
};
