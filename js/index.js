function get(url, cb) {
    var x = new XMLHttpRequest()
    x.open('GET', url)
    x.send(null)
    x.onreadystatechange = () => {
        if (x.statusText == 'OK' && x.readyState == 4) {
            var res = x.responseText
            if (cb) {
                cb(res)
            }
        }
    }
}

function fecthOneDayData(day, cb) {
    //2018-01-22
    var now = new Date()
    var url = '$URL'
    get(url, cb)
}

function handleResponse(x) {
    console.log('I am call back')
    console.log(x)
}
function createHandleResponse() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = 'function handleResponse(x){ console.log("I am callback",x)} '
    head.appendChild(script);
}
function jsonp(url) {
    var script = document.createElement("script");
    script.src = url + '&callback=handleResponse';
    document.body.insertBefore(script, document.body.firstChild);
}
function createFunction(fnString) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = fnString
    script.onerror = (e) => { console.log(e) }
    head.appendChild(script);

}
function fixRateCall(argarr, fn, rate) {
    let _i = 0, handler

    handler = setInterval(() => {
        if (_i == argarr.length) {
            if (handler) {
                clearInterval(handler)
                return
            }
        }
        fn(argarr[_i])
        _i++
    }, rate)
}

setTimeout(function () {
    console.log('Data Picker Plugin is loading.')
    createHandleResponse()
    fecthOneDayData('2018-01-22', (x) => {
        console.log('success', x)
        fixRateCall([4, 3, 1, 2, 6, 32, 12], (x) => {
            console.log(x)
        }, 2000)
    })
    // jsonp()
}, 3000);
