var $jscomp = { scope: {} }
$jscomp.defineProperty =
  'function' == typeof Object.defineProperties
    ? Object.defineProperty
    : function(b, r, f) {
        if (f.get || f.set) throw new TypeError('ES3 does not support getters and setters.')
        b != Array.prototype && b != Object.prototype && (b[r] = f.value)
      }
$jscomp.getGlobal = function(b) {
  return 'undefined' != typeof window && window === b ? b : 'undefined' != typeof global && null != global ? global : b
}
$jscomp.global = $jscomp.getGlobal(this)
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_'
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {}
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
$jscomp.symbolCounter_ = 0
$jscomp.Symbol = function(b) {
  return $jscomp.SYMBOL_PREFIX + (b || '') + $jscomp.symbolCounter_++
}
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol()
  var b = $jscomp.global.Symbol.iterator
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol('iterator'))
  'function' != typeof Array.prototype[b] &&
    $jscomp.defineProperty(Array.prototype, b, {
      configurable: !0,
      writable: !0,
      value: function() {
        return $jscomp.arrayIterator(this)
      },
    })
  $jscomp.initSymbolIterator = function() {}
}
$jscomp.arrayIterator = function(b) {
  var r = 0
  return $jscomp.iteratorPrototype(function() {
    return r < b.length ? { done: !1, value: b[r++] } : { done: !0 }
  })
}
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator()
  b = { next: b }
  b[$jscomp.global.Symbol.iterator] = function() {
    return this
  }
  return b
}
;(function(b) {
  function r(c) {
    'string' !== typeof c && (c = String(c))
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(c)) throw new TypeError('Invalid character in header field name')
    return c.toLowerCase()
  }
  function f(c) {
    'string' !== typeof c && (c = String(c))
    return c
  }
  function x(c) {
    var a = {
      next: function() {
        var a = c.shift()
        return { done: void 0 === a, value: a }
      },
    }
    w.iterable &&
      ($jscomp.initSymbol(),
      $jscomp.initSymbolIterator(),
      (a[Symbol.iterator] = function() {
        return a
      }))
    return a
  }
  function q(c) {
    this.map = {}
    c instanceof q
      ? c.forEach(function(c, a) {
          this.append(a, c)
        }, this)
      : c &&
        Object.getOwnPropertyNames(c).forEach(function(a) {
          this.append(a, c[a])
        }, this)
  }
  function d(c) {
    if (c.bodyUsed) return Promise.reject(new TypeError('Already read'))
    c.bodyUsed = !0
  }
  function C(c) {
    return new Promise(function(a, b) {
      c.onload = function() {
        a(c.result)
      }
      c.onerror = function() {
        b(c.error)
      }
    })
  }
  function E(c) {
    var a = new FileReader(),
      b = C(a)
    a.readAsArrayBuffer(c)
    return b
  }
  function F(c) {
    c = new Uint8Array(c)
    for (var a = Array(c.length), b = 0; b < c.length; b++) a[b] = String.fromCharCode(c[b])
    return a.join('')
  }
  function D(c) {
    if (c.slice) return c.slice(0)
    var a = new Uint8Array(c.byteLength)
    a.set(new Uint8Array(c))
    return a.buffer
  }
  function G() {
    this.bodyUsed = !1
    this._initBody = function(c) {
      if ((this._bodyInit = c))
        if ('string' === typeof c) this._bodyText = c
        else if (w.blob && Blob.prototype.isPrototypeOf(c)) this._bodyBlob = c
        else if (w.formData && FormData.prototype.isPrototypeOf(c)) this._bodyFormData = c
        else if (w.searchParams && URLSearchParams.prototype.isPrototypeOf(c)) this._bodyText = c.toString()
        else if (w.arrayBuffer && w.blob && c && DataView.prototype.isPrototypeOf(c))
          (this._bodyArrayBuffer = D(c.buffer)), (this._bodyInit = new Blob([this._bodyArrayBuffer]))
        else if (w.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(c) || n(c))) this._bodyArrayBuffer = D(c)
        else throw Error('unsupported BodyInit type')
      else this._bodyText = ''
      this.headers.get('content-type') ||
        ('string' === typeof c
          ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
          : this._bodyBlob && this._bodyBlob.type
            ? this.headers.set('content-type', this._bodyBlob.type)
            : w.searchParams &&
              URLSearchParams.prototype.isPrototypeOf(c) &&
              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8'))
    }
    w.blob &&
      (this.blob = function() {
        var c = d(this)
        if (c) return c
        if (this._bodyBlob) return Promise.resolve(this._bodyBlob)
        if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        if (this._bodyFormData) throw Error('could not read FormData body as blob')
        return Promise.resolve(new Blob([this._bodyText]))
      })
    this.text = function() {
      var c = d(this)
      if (c) return c
      if (this._bodyBlob) {
        var c = this._bodyBlob,
          a = new FileReader(),
          b = C(a)
        a.readAsText(c)
        return b
      }
      if (this._bodyArrayBuffer) return Promise.resolve(F(this._bodyArrayBuffer))
      if (this._bodyFormData) throw Error('could not read FormData body as text')
      return Promise.resolve(this._bodyText)
    }
    w.arrayBuffer &&
      (this.arrayBuffer = function() {
        return this._bodyArrayBuffer ? d(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(E)
      })
    w.formData &&
      (this.formData = function() {
        return this.text().then(y)
      })
    this.json = function() {
      return this.text().then(JSON.parse)
    }
    return this
  }
  function v(c, a) {
    a = a || {}
    var b = a.body
    if ('string' === typeof c) this.url = c
    else {
      if (c.bodyUsed) throw new TypeError('Already read')
      this.url = c.url
      this.credentials = c.credentials
      a.headers || (this.headers = new q(c.headers))
      this.method = c.method
      this.mode = c.mode
      b || null == c._bodyInit || ((b = c._bodyInit), (c.bodyUsed = !0))
    }
    this.credentials = a.credentials || this.credentials || 'omit'
    if (a.headers || !this.headers) this.headers = new q(a.headers)
    var d = a.method || this.method || 'GET',
      f = d.toUpperCase()
    this.method = -1 < p.indexOf(f) ? f : d
    this.mode = a.mode || this.mode || null
    this.referrer = null
    if (('GET' === this.method || 'HEAD' === this.method) && b) throw new TypeError('Body not allowed for GET or HEAD requests')
    this._initBody(b)
  }
  function y(c) {
    var a = new FormData()
    c
      .trim()
      .split('&')
      .forEach(function(c) {
        if (c) {
          var b = c.split('=')
          c = b.shift().replace(/\+/g, ' ')
          b = b.join('=').replace(/\+/g, ' ')
          a.append(decodeURIComponent(c), decodeURIComponent(b))
        }
      })
    return a
  }
  function z(c) {
    var a = new q()
    c.split('\r\n').forEach(function(c) {
      var b = c.split(':')
      if ((c = b.shift().trim())) (b = b.join(':').trim()), a.append(c, b)
    })
    return a
  }
  function t(c, a) {
    a || (a = {})
    this.type = 'default'
    this.status = 'status' in a ? a.status : 200
    this.ok = 200 <= this.status && 300 > this.status
    this.statusText = 'statusText' in a ? a.statusText : 'OK'
    this.headers = new q(a.headers)
    this.url = a.url || ''
    this._initBody(c)
  }
  if (!b.fetch) {
    $jscomp.initSymbol()
    var A = 'Symbol' in b && 'iterator' in Symbol,
      u
    if ((u = 'FileReader' in b && 'Blob' in b))
      try {
        new Blob(), (u = !0)
      } catch (c) {
        u = !1
      }
    var w = {
      searchParams: 'URLSearchParams' in b,
      iterable: A,
      blob: u,
      formData: 'FormData' in b,
      arrayBuffer: 'ArrayBuffer' in b,
    }
    if (w.arrayBuffer)
      var a = '[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]'.split(
          ';'
        ),
        n =
          ArrayBuffer.isView ||
          function(c) {
            return c && -1 < a.indexOf(Object.prototype.toString.call(c))
          }
    q.prototype.append = function(c, a) {
      c = r(c)
      a = f(a)
      var b = this.map[c]
      this.map[c] = b ? b + ',' + a : a
    }
    q.prototype['delete'] = function(c) {
      delete this.map[r(c)]
    }
    q.prototype.get = function(c) {
      c = r(c)
      return this.has(c) ? this.map[c] : null
    }
    q.prototype.has = function(c) {
      return this.map.hasOwnProperty(r(c))
    }
    q.prototype.set = function(c, a) {
      this.map[r(c)] = f(a)
    }
    q.prototype.forEach = function(a, b) {
      for (var c in this.map) this.map.hasOwnProperty(c) && a.call(b, this.map[c], c, this)
    }
    q.prototype.keys = function() {
      var a = []
      this.forEach(function(c, b) {
        a.push(b)
      })
      return x(a)
    }
    q.prototype.values = function() {
      var a = []
      this.forEach(function(c) {
        a.push(c)
      })
      return x(a)
    }
    q.prototype.entries = function() {
      var a = []
      this.forEach(function(c, b) {
        a.push([b, c])
      })
      return x(a)
    }
    w.iterable && ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), (q.prototype[Symbol.iterator] = q.prototype.entries))
    var p = 'DELETE GET HEAD OPTIONS POST PUT'.split(' ')
    v.prototype.clone = function() {
      return new v(this, { body: this._bodyInit })
    }
    G.call(v.prototype)
    G.call(t.prototype)
    t.prototype.clone = function() {
      return new t(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new q(this.headers), url: this.url })
    }
    t.error = function() {
      var a = new t(null, { status: 0, statusText: '' })
      a.type = 'error'
      return a
    }
    var B = [301, 302, 303, 307, 308]
    t.redirect = function(a, b) {
      if (-1 === B.indexOf(b)) throw new RangeError('Invalid status code')
      return new t(null, { status: b, headers: { location: a } })
    }
    b.Headers = q
    b.Request = v
    b.Response = t
    b.fetch = function(a, b) {
      return new Promise(function(c, d) {
        var f = new v(a, b),
          g = new XMLHttpRequest()
        g.onload = function() {
          var a = { status: g.status, statusText: g.statusText, headers: z(g.getAllResponseHeaders() || '') }
          a.url = 'responseURL' in g ? g.responseURL : a.headers.get('X-Request-URL')
          c(new t('response' in g ? g.response : g.responseText, a))
        }
        g.onerror = function() {
          d(new TypeError('Network request failed'))
        }
        g.ontimeout = function() {
          d(new TypeError('Network request failed'))
        }
        g.open(f.method, f.url, !0)
        'include' === f.credentials && (g.withCredentials = !0)
        'responseType' in g && w.blob && (g.responseType = 'blob')
        f.headers.forEach(function(a, c) {
          g.setRequestHeader(c, a)
        })
        g.send('undefined' === typeof f._bodyInit ? null : f._bodyInit)
      })
    }
    b.fetch.polyfill = !0
  }
})('undefined' !== typeof self ? self : this)
;(function(b, r) {
  'undefined' != typeof module && (b = global)
  var f = '0123456789abcdef'.split(''),
    x = [-2147483648, 8388608, 32768, 128],
    q = [24, 16, 8, 0],
    d = [],
    C = function(b) {
      var r = 'string' != typeof b
      r && b.constructor == ArrayBuffer && (b = new Uint8Array(b))
      var v,
        y,
        z,
        t,
        A,
        u = 0,
        w = !1,
        a,
        n,
        p,
        B = 0,
        c = 0,
        D = 0,
        C = b.length
      v = 1732584193
      y = 4023233417
      z = 2562383102
      t = 271733878
      A = 3285377520
      do {
        d[0] = u
        d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0
        if (r) for (a = c; B < C && 64 > a; ++B) d[a >> 2] |= b[B] << q[a++ & 3]
        else
          for (a = c; B < C && 64 > a; ++B)
            (u = b.charCodeAt(B)),
              128 > u
                ? (d[a >> 2] |= u << q[a++ & 3])
                : (2048 > u
                    ? (d[a >> 2] |= (192 | (u >> 6)) << q[a++ & 3])
                    : (55296 > u || 57344 <= u
                        ? (d[a >> 2] |= (224 | (u >> 12)) << q[a++ & 3])
                        : ((u = 65536 + (((u & 1023) << 10) | (b.charCodeAt(++B) & 1023))),
                          (d[a >> 2] |= (240 | (u >> 18)) << q[a++ & 3]),
                          (d[a >> 2] |= (128 | ((u >> 12) & 63)) << q[a++ & 3])),
                      (d[a >> 2] |= (128 | ((u >> 6) & 63)) << q[a++ & 3])),
                  (d[a >> 2] |= (128 | (u & 63)) << q[a++ & 3]))
        D += a - c
        c = a - 64
        B == C && ((d[a >> 2] |= x[a & 3]), ++B)
        u = d[16]
        B > C && 56 > a && ((d[15] = D << 3), (w = !0))
        for (p = 16; 80 > p; ++p) (a = d[p - 3] ^ d[p - 8] ^ d[p - 14] ^ d[p - 16]), (d[p] = (a << 1) | (a >>> 31))
        var h = v,
          k = y,
          g = z,
          l = t,
          m = A
        for (p = 0; 20 > p; p += 5)
          (n = (k & g) | (~k & l)),
            (a = (h << 5) | (h >>> 27)),
            (m = (a + n + m + 1518500249 + d[p]) << 0),
            (k = (k << 30) | (k >>> 2)),
            (n = (h & k) | (~h & g)),
            (a = (m << 5) | (m >>> 27)),
            (l = (a + n + l + 1518500249 + d[p + 1]) << 0),
            (h = (h << 30) | (h >>> 2)),
            (n = (m & h) | (~m & k)),
            (a = (l << 5) | (l >>> 27)),
            (g = (a + n + g + 1518500249 + d[p + 2]) << 0),
            (m = (m << 30) | (m >>> 2)),
            (n = (l & m) | (~l & h)),
            (a = (g << 5) | (g >>> 27)),
            (k = (a + n + k + 1518500249 + d[p + 3]) << 0),
            (l = (l << 30) | (l >>> 2)),
            (n = (g & l) | (~g & m)),
            (a = (k << 5) | (k >>> 27)),
            (h = (a + n + h + 1518500249 + d[p + 4]) << 0),
            (g = (g << 30) | (g >>> 2))
        for (; 40 > p; p += 5)
          (n = k ^ g ^ l),
            (a = (h << 5) | (h >>> 27)),
            (m = (a + n + m + 1859775393 + d[p]) << 0),
            (k = (k << 30) | (k >>> 2)),
            (n = h ^ k ^ g),
            (a = (m << 5) | (m >>> 27)),
            (l = (a + n + l + 1859775393 + d[p + 1]) << 0),
            (h = (h << 30) | (h >>> 2)),
            (n = m ^ h ^ k),
            (a = (l << 5) | (l >>> 27)),
            (g = (a + n + g + 1859775393 + d[p + 2]) << 0),
            (m = (m << 30) | (m >>> 2)),
            (n = l ^ m ^ h),
            (a = (g << 5) | (g >>> 27)),
            (k = (a + n + k + 1859775393 + d[p + 3]) << 0),
            (l = (l << 30) | (l >>> 2)),
            (n = g ^ l ^ m),
            (a = (k << 5) | (k >>> 27)),
            (h = (a + n + h + 1859775393 + d[p + 4]) << 0),
            (g = (g << 30) | (g >>> 2))
        for (; 60 > p; p += 5)
          (n = (k & g) | (k & l) | (g & l)),
            (a = (h << 5) | (h >>> 27)),
            (m = (a + n + m - 1894007588 + d[p]) << 0),
            (k = (k << 30) | (k >>> 2)),
            (n = (h & k) | (h & g) | (k & g)),
            (a = (m << 5) | (m >>> 27)),
            (l = (a + n + l - 1894007588 + d[p + 1]) << 0),
            (h = (h << 30) | (h >>> 2)),
            (n = (m & h) | (m & k) | (h & k)),
            (a = (l << 5) | (l >>> 27)),
            (g = (a + n + g - 1894007588 + d[p + 2]) << 0),
            (m = (m << 30) | (m >>> 2)),
            (n = (l & m) | (l & h) | (m & h)),
            (a = (g << 5) | (g >>> 27)),
            (k = (a + n + k - 1894007588 + d[p + 3]) << 0),
            (l = (l << 30) | (l >>> 2)),
            (n = (g & l) | (g & m) | (l & m)),
            (a = (k << 5) | (k >>> 27)),
            (h = (a + n + h - 1894007588 + d[p + 4]) << 0),
            (g = (g << 30) | (g >>> 2))
        for (; 80 > p; p += 5)
          (n = k ^ g ^ l),
            (a = (h << 5) | (h >>> 27)),
            (m = (a + n + m - 899497514 + d[p]) << 0),
            (k = (k << 30) | (k >>> 2)),
            (n = h ^ k ^ g),
            (a = (m << 5) | (m >>> 27)),
            (l = (a + n + l - 899497514 + d[p + 1]) << 0),
            (h = (h << 30) | (h >>> 2)),
            (n = m ^ h ^ k),
            (a = (l << 5) | (l >>> 27)),
            (g = (a + n + g - 899497514 + d[p + 2]) << 0),
            (m = (m << 30) | (m >>> 2)),
            (n = l ^ m ^ h),
            (a = (g << 5) | (g >>> 27)),
            (k = (a + n + k - 899497514 + d[p + 3]) << 0),
            (l = (l << 30) | (l >>> 2)),
            (n = g ^ l ^ m),
            (a = (k << 5) | (k >>> 27)),
            (h = (a + n + h - 899497514 + d[p + 4]) << 0),
            (g = (g << 30) | (g >>> 2))
        v = (v + h) << 0
        y = (y + k) << 0
        z = (z + g) << 0
        t = (t + l) << 0
        A = (A + m) << 0
      } while (!w)
      return (
        f[(v >> 28) & 15] +
        f[(v >> 24) & 15] +
        f[(v >> 20) & 15] +
        f[(v >> 16) & 15] +
        f[(v >> 12) & 15] +
        f[(v >> 8) & 15] +
        f[(v >> 4) & 15] +
        f[v & 15] +
        f[(y >> 28) & 15] +
        f[(y >> 24) & 15] +
        f[(y >> 20) & 15] +
        f[(y >> 16) & 15] +
        f[(y >> 12) & 15] +
        f[(y >> 8) & 15] +
        f[(y >> 4) & 15] +
        f[y & 15] +
        f[(z >> 28) & 15] +
        f[(z >> 24) & 15] +
        f[(z >> 20) & 15] +
        f[(z >> 16) & 15] +
        f[(z >> 12) & 15] +
        f[(z >> 8) & 15] +
        f[(z >> 4) & 15] +
        f[z & 15] +
        f[(t >> 28) & 15] +
        f[(t >> 24) & 15] +
        f[(t >> 20) & 15] +
        f[(t >> 16) & 15] +
        f[(t >> 12) & 15] +
        f[(t >> 8) & 15] +
        f[(t >> 4) & 15] +
        f[t & 15] +
        f[(A >> 28) & 15] +
        f[(A >> 24) & 15] +
        f[(A >> 20) & 15] +
        f[(A >> 16) & 15] +
        f[(A >> 12) & 15] +
        f[(A >> 8) & 15] +
        f[(A >> 4) & 15] +
        f[A & 15]
      )
    }
  if (b.JS_SHA1_TEST || 'undefined' == typeof module) b && (b.sha1 = C)
  else {
    var E = require('crypto'),
      F = require('buffer').Buffer
    module.exports = function(b) {
      if ('string' == typeof b)
        return E.createHash('sha1')
          .update(b, 'utf8')
          .digest('hex')
      b.constructor == ArrayBuffer && (b = new Uint8Array(b))
      return E.createHash('sha1')
        .update(new F(b))
        .digest('hex')
    }
  }
})(this)
var ps_status = 'undefined',
  ps_user_token = !1,
  ps_endpoint = !1,
  ps_incognito = !1,
  ps_app_token = !1,
  ps_app_subdomain = !1,
  ps_reg = !1
try {
  new Promise(function(b) {
    var r,
      f = function() {
        b(!0)
      },
      x = function() {
        b(!1)
      }
    if (window.webkitRequestFileSystem) webkitRequestFileSystem(0, 0, x, f)
    else if ('MozAppearance' in document.documentElement.style) (r = indexedDB.open('test')), (r.onerror = f), (r.onsuccess = x)
    else if (/constructor/i.test(window.HTMLElement))
      try {
        localStorage.length ? x() : ((localStorage.x = 1), localStorage.removeItem('x'), x())
      } catch (q) {
        navigator.cookieEnabled ? f() : x()
      }
    else window.indexedDB || (!window.PointerEvent && !window.MSPointerEvent) ? x() : f()
  }).then(function(b) {
    b && ((ps_incognito = !0), ps_cb_incognito_detected())
  })
} catch (b) {}
function ps_submitData(b, r) {
  fetch(b)
    .then(function(b) {
      console.log(b.status)
      200 == b.status && (r.call(), ps_cb_loading_end())
    })
    .then(function(b) {})
    ['catch'](function(b) {
      ps_cb_loading_end()
    })
}
function ps_localPush(b, r, f, x) {
  new Notification(b, { body: void 0 === r ? '' : r, icon: void 0 === f ? '' : f }).onclick = function(b) {
    x.call(e)
  }
}
function ps_swIsSupported() {
  var b = !1
  'serviceWorker' in navigator && ((ps_status = Notification.permission), (b = !0))
  return b
}
function ps_swRegister() {
  if ('https:' != window.location.protocol) throw 'Shutting down.... : (https) SSL Required'
  if (!ps_app_subdomain) throw 'Shutting down.... : ps_app_subdomain not declared !!!'
  if (!ps_swIsSupported()) return ps_cb_not_supported(), !1
  navigator.serviceWorker.register('/sw.js').then(function(b) {
    b.pushManager.getSubscription().then(function(r) {
      window.ps_reg = b
      'granted' == ps_status && r
        ? ((ps_status = 'subscribed'), (ps_endpoint = r.endpoint), (ps_user_token = sha1(ps_endpoint)), ps_cb_subscribed())
        : 'granted' != ps_status || r
          ? 'default' == ps_status ? ps_cb_default() : 'denied' == ps_status && ps_cb_denied()
          : ((ps_status = 'unsubscribed'), ps_cb_unsubscribed())
    })
    ps_cb_sw_registered()
  })
}
function ps_requestAndSubscribe() {
  if (!ps_reg) throw 'Service Worker No Registered!'
  if ('undefined' == ps_status) return !1
  if (ps_isSubscribed()) return ps_cb_subscribed(), !1
  if (!navigator.onLine) return ps_cb_connection_failed(), !1
  window.ps_reg.pushManager
    .subscribe({ userVisibleOnly: !0 })
    .then(function(b) {
      ps_cb_loading_start()
      ps_endpoint = b.endpoint
      b = b.getKey('p256dh')
      b = btoa(String.fromCharCode.apply(null, new Uint8Array(b)))
      ps_user_token = sha1(ps_endpoint)
      ps_status = 'subscribed'
      timezone = new Date().getTimezoneOffset()
      ps_submitData(
        'https://' +
          ps_app_subdomain +
          '.pushido.com/sw/register.php?app_token=' +
          ps_app_token +
          '&token=' +
          ps_endpoint +
          '&utc_timezone_offset=' +
          timezone +
          '&key=' +
          b,
        ps_cb_subscribed
      )
    })
    ['catch'](function(b) {
      ps_status = Notification.permission
      if ('denied' === ps_status) ps_cb_denied()
      else {
        if ('AbortError' == b.name) throw 'Something went wrong, did you installed and reference the manifest?'
        if ('default' == ps_status) (ps_status = 'closed'), ps_cb_closed()
        else return !1
      }
    })
}
function ps_isSubscribed() {
  return 'subscribed' == ps_status ? !0 : !1
}
function ps_unsubscribe() {
  if (!ps_reg) throw 'Service Worker No Registered!'
  if ('unsubscribed' == ps_status) return ps_cb_unsubscribed(), !1
  if ('denied' == ps_status) return ps_cb_denied(), !1
  if ('subscribed' != ps_status) return !1
  if (!navigator.onLine) return ps_cb_connection_failed(), !1
  'serviceWorker' in navigator &&
    (ps_cb_loading_start(),
    navigator.serviceWorker.ready.then(function(b) {
      b.pushManager.getSubscription().then(function(b) {
        b
          .unsubscribe()
          .then(function(f) {
            ps_endpoint = b.endpoint
            ps_submitData(
              'https://' +
                ps_app_subdomain +
                '.pushido.com/sw/unregister.php?app_token=' +
                ps_app_token +
                '&token_hash=' +
                ps_user_token,
              ps_cb_unsubscribed
            )
            ps_endpoint = ps_user_token = !1
            ps_status = 'unsubscribed'
          })
          ['catch'](function(b) {
            ps_cb_loading_end()
            ps_cb_connection_failed()
          })
      })
    }))
}
function ps_cb_sw_registered() {
  console.log('ps_sw_registered callback called')
  return !1
}
function ps_cb_incognito_detected() {
  console.log('ps_incognito callback called')
  return !1
}
function ps_cb_default() {
  console.log('ps_cb_default callback called')
  return !1
}
function ps_cb_denied() {
  console.log('ps_cb_denied callback called')
  return !1
}
function ps_cb_closed() {
  console.log('ps_cb_closed callback called')
  return !1
}
function ps_cb_subscribed() {
  console.log('ps_cb_subscribed callback called')
  return !1
}
function ps_cb_unsubscribed() {
  console.log('ps_cb_unsubscribed callback called')
  return !1
}
function ps_cb_granted() {
  console.log('ps_cb_granted callback called')
  return !1
}
function ps_cb_not_supported() {
  console.log('ps_cb_not_supported callback called')
  return !1
}
function ps_cb_connection_failed() {
  console.log('ps_cb_connection_failed callback called')
  return !1
}
function ps_cb_loading_start() {
  console.log('ps_cb_loading_start callback called')
  return !1
}
function ps_cb_loading_end() {
  console.log('ps_cb_loading_end callback called')
  return !1
}
