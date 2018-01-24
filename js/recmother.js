
const keys = (o) => {
    var r = []
    for (var k in o) {
        r.push(k)
    }
    return r.sort((x, y) => x.length > y.length ? -1 : 1)
}

const recurMother = (fn) => {
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

const index = recurMother((inx, obj) => {
    if (inx[obj]) {
        inx[obj]++
    } else {
        inx[obj] = 1
    }
})
const encode = recurMother((inx, obj) => {
    return inx.indexOf(String(obj))
})
const decode = recurMother((inx, obj) => {
    var v = inx[Number(obj)]
    if (v == 'true' || v == 'false') {
        return { 'true': true, 'false': false }[v]
    }
    return v
})
var x = {
    "status": 0,
    "ok": false,
    "msg": "\u64cd\u4f5c\u6210\u529f",
    "data": {
        "list": [
            {
                "id": "1125900325099109",
                "out_order_id": "17598418671158",
                "city": "1",
                "dest_city": "1",
                "district": "010"
            }]
    }
}
var inx = {}
index(inx, x)
console.log(keys(inx))
var b = encode(keys(inx), x)
var c = decode(keys(inx), b)
console.log(JSON.stringify(x))
console.log(JSON.stringify(c))
console.log(JSON.stringify(x) == JSON.stringify(c))
console.log("压缩比:", JSON.stringify(b).length / JSON.stringify(x).length)
