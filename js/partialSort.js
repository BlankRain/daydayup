const fs = require('fs')

const partialSort = (fn) => {
    return function (o) {
        var r = []
        for (var k in o) {
            r.push({ k: k, v: o[k] })
        }
        return r.sort(fn).map(x => x.k)
    }
}
const keysByMostLong = partialSort((x, y) => x.k.length > y.k.length ? -1 : 1)
const keysByMostCount = partialSort((x, y) => x.v > y.v ? 1 : -1)
const partialRecursive = (fn) => {
    var _fn = function (inx, obj) {
        if (['string', 'number', 'boolean'].indexOf(typeof obj) > -1) {
            return fn(inx, obj)
        }
        if (obj instanceof Array) {
            var result = []
            for (var vi of obj) {
                result.push(_fn(inx, vi))
            }
            return result
        }
        if (obj instanceof Object) {
            var result = {}
            for (var i in obj) {
                var k = i
                var v = obj[i]
                var ki = _fn(inx, k)
                var vi = _fn(inx, v)
                result[ki] = vi
            }
            return result
        }

    }
    return _fn
}

const index = partialRecursive((inx, obj) => {
    if (inx[obj]) {
        inx[obj]++
    } else {
        inx[obj] = 1
    }
})
const encode = partialRecursive((inx, obj) => {
    return inx.indexOf(String(obj))
})
const decode = partialRecursive((inx, obj) => {
    var v = inx[Number(obj)]
    if (v == 'true' || v == 'false') {
        return { 'true': true, 'false': false }[v]
    }
    return v
})
const isSame = function (a, b) {
    if (a instanceof Array || a instanceof Object) {
        for (var i in a) {
            if (!isSame(a[i], b[i])) {
                return false
            }
        }
        return true
    } else {
        return String(a) == String(b)
    }

}
var str = fs.readFileSync('a.json')
var x = JSON.parse(str)
var inx = {}
index(inx, x)
var k = keysByMostLong(inx)
var b = encode(k, x)
var c = decode(k, b)
var result = [k, b]
console.log('Is the same? ', isSame(x, c) ? "yes!" : "oh,no")
console.log("压缩率(压缩后/压缩前):", JSON.stringify(result).length / JSON.stringify(x).length)

