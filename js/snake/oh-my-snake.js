/**
 *  [0-n] n{n} n+1{n+2} [n-0]
 * @param {*} n 
 */
function An_x(n) {
    // [0-n]
    var r = [];
    for (var i = 0; i <= n; i++) {
        r.push(i);
    }
    // n{n}
    for (var i = 0; i < n; i++) {
        r.push(n);
    }
    // n+1 {n+2}
    for (var i = 1; i <= n + 2; i++) {
        r.push(n + 1);
    }
    // [n-0]
    for (var i = n; i >= 0; i--) {
        r.push(i);
    }
    return r;
}

/**
 * [0-x] x{x} x+1 {x+2} [x-0]
 * @param {*} n 
 */
function An_y(n) {
    var r = [];
    //[0-n]
    for (var i = 0; i <= n; i++) {
        r.push(i);
    }
    // x{x}
    for (var i = 1; i <= n; i++) {
        r.push(n);
    }
    //x+1 {x+2}
    for (var i = 1; i <= n + 2; i++) {
        r.push(n + 1);
    }
    // [x-0]
    for (var i = n; i >= 0; i--) {
        r.push(i);
    }
    return r;
}
/**
 *  
 * @param {*} index 
 */
function indexToN(index) {
    var i = 0;
    var as_x = 0;
    while (index > as_x) {
        as_x = allSum(i, len_An_x);
        i++;
    }
    var xi = i - 1;
    i = 0;
    var as_y = 0;
    while (index > as_y) {
        as_y = allSum(i, len_An_y);
        i++;
    }
    var yi = i - 1;
    return [xi, index - (as_x - len_An_x(xi)), yi, index - (as_y - len_An_y(yi))];
}

function len_An_y(i) {
    return (8 * i) + 4;
}

function len_An_x(i) {
    if (i == 0) {
        return 1;
    }
    return 8 * i;
}

function allSum(n, f) {
    if (n == 0) {
        return f(n);
    } else {
        return f(n) + allSum(n - 1, f);
    }
}

function pickPositon([xi, x, yi, y]) {
    return [An_x(2 * xi - 1)[x - 1], An_y(2 * yi)[y - 1]];
}

function take(n) {
    var ret = [];
    for (var i = 1; i < n; i++) {
        var inx = indexToN(i);
        ret.push(pickPositon(inx));
    }
    return ret;
}

console.log(take(30))