/* VimeoPlayer - v2.7.1 - 2015-06-26 */
var VimeoPlayer = function(e) {
    function t(o) {
        if (n[o])
            return n[o].exports;
        var i = n[o] = {exports: {}, id: o, loaded: !1};
        return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
        var o, i;
        o = [t, e, n(8), n(5), n(11), n(12), n(6), n(4), n(3), n(1), n(2), n(15), n(9), n(16), n(18), n(19), n(20), n(21), n(22), n(23), n(24), n(17), n(10), n(25), n(26), n(27), n(28), n(29)], i = function(e, t, n, o, i, r, a, s, l, d, u, c, f, v, p, h, m, g, b, w, y, E, k, _, L, x, C, T) {
            "use strict";
            function P(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function A(e, t, n, o) {
                function i(e) {
                    if (e && e.detail > 0)
                        try {
                            document.activeElement.blur()
                        } catch (t) {
                        }
                }
                function r(e) {
                    e && (ue.config = e, ue.storageModule.reset(ue.config), he.fire(d.Control.changeColor, ue.config.embed.color), he.fire(d.Events.configChanged, ue.config)), ue.videoModule || ue.config.view === d.View.privatePassword || ue.config.view === d.View.privateLocked ? ye.style.backgroundImage = "none" : (v(ue.config.video.thumbs), ue.videoModule = new Z["default"](ue.config, he, Ee))
                }
                function a() {
                    switch (ue.config.view) {
                        case d.View.privatePassword:
                            ce = ["password"], ge = !0, s();
                            break;
                        case d.View.privateLocked:
                            return we = !0, ce = ue.config.user.logged_in ? ["error", {title: "Private Video", message: "Sorry, you don&rsquo;t have permission to watch.", modal: !0, logo: !!ue.config.embed.settings.branding, icon: "lock"}] : ["private-locked"], ge = !0, void s();
                        case d.View.privateUnlocked:
                            r(), ue.config.embed.autoplay || we || (ce = ["private-unlocked"]), s();
                            break;
                        case d.View.contentRating:
                            ye.classList.add("invisible"), he.fire(d.Control.showOverlay, "content-rating"), he.once(d.Events.overlayClosed, function() {
                                ye.classList.remove("invisible")
                            })
                    }
                    we = null
                }
                function s() {
                    if (ge && Re && be) {
                        if (g(), ce)
                            return ce.unshift(d.Control.showOverlay), he.fire.apply(null, ce), ce = null, void window.requestAnimationFrame(function() {
                                ue.element.classList.remove("loading")
                            });
                        ue.element.classList.remove("loading")
                    }
                }
                function l(e, t) {
                    var n = (new Date).getTime(), o = ue.config && ue.config.video.id, i = ue.config && ue.config.request.session, r = ue.config && ue.config.request.referrer, s = ue.config && ue.config.embed.on_site, l = ue.config && ue.config.embed.context, u = e;
                    isNaN(e) || (u = (ue.config ? "//" + ue.config.player_url : "") + "/video/" + e + "/config" + window.location.search);
                    var c = new XMLHttpRequest;
                    c.open("GET", u, !0), c.withCredentials = !0, c.onload = function() {
                        ue.config = JSON.parse(c.responseText), ve = (new Date).getTime() + 1e3 * ue.config.request.expires, ue.config.video.id === o && (ue.config.request.session = i), r && (ue.config.request.referrer = r), s && (ue.config.embed.on_site = 1, ue.config.embed.context = l);
                        var e = (new Date).getTime() - n;
                        window._gaq && window._gaq.push(["player._trackTiming", "Player", "Config Load", e]), b(), ue.storageModule && ue.storageModule.reset(ue.config), he.fire(d.Control.changeColor, ue.config.embed.color), o && a(), ue.config.embed.on_site || (ue.config.view === d.View.main || ue.config.view === d.View.privateUnlocked ? document.title = ue.config.video.title + " from " + ue.config.video.owner.name + " on Vimeo" : document.title = "Private Video on Vimeo"), t.call(c)
                    }, c.send()
                }
                function c(e) {
                    var t = (new Date).getTime(), n = ue.config && ue.config.request.referrer, o = new XMLHttpRequest;
                    o.open("GET", "//" + ue.config.player_url + "/video/" + ue.config.video.id + "/config/request?session=" + ue.config.request.session + "&signature=" + ue.config.request.signature + "&time=" + ue.config.request.timestamp + "&expires=" + ue.config.request.expires, !0), o.withCredentials = !0, o.onload = function() {
                        ue.config.request = JSON.parse(o.responseText), n && (ue.config.request.referrer = n), ve = (new Date).getTime() + 1e3 * ue.config.request.expires;
                        var i = (new Date).getTime() - t;
                        window._gaq && window._gaq.push(["player._trackTiming", "Player", "Config.Request Load", i]), e.call(o)
                    }, o.send()
                }
                function f(e, t) {
                    ue.element.classList.add("loading"), me = !1, ge = !1, be = !1, l(e, function() {
                        he.fire(d.Control.changeColor, ue.config.embed.color), history && history.replaceState && !ue.config.embed.on_site && history.replaceState({id: ue.config.video.id}, "", "/video/" + ue.config.video.id);
                        var e = !0;
                        he.fire(d.Events.configChanged, ue.config, e), he.fire(d.Control.reset, e), be = !0, k(), window.requestAnimationFrame(s), t && t()
                    })
                }
                function v(e) {
                    if (ue.element.clientWidth) {
                        var t = ue.element.clientWidth * B["default"].devicePixelRatio, n = ue.element.clientHeight * B["default"].devicePixelRatio, o = e[640];
                        if (t >= 900 && e[960] && (o = e[960]), t >= 1e3 && e[1280] && (o = e[1280]), e.base) {
                            var i = t, r = n;
                            i % 320 !== 0 && (i = 100 * Math.ceil(t / 100), r = Math.round(i / t * n)), o = e.base + (ue.config.request.flags.webp ? ".webp" : ".jpg"), o += "?mw=" + i + "&mh=" + r, B["default"].devicePixelRatio > 1 && (o += "&q=70")
                        }
                        if (ye.setAttribute("data-thumb", o), me = !0, ue.config.embed.autoplay && "beginning" !== ue.config.embed.outro)
                            return void p();
                        var a = new Image;
                        if (a.src = o, ue.config.embed.autoplay)
                            return void p();
                        a.onload = function() {
                            "none" !== ye.style.backgroundImage && (ye.style.backgroundImage = "url(" + o + ")");
                            var e = ue.config.video.width / ue.config.video.height, t = a.width / a.height;
                            (.95 * e >= t || t >= 1.05 * e) && ye.classList.remove("cover"), p()
                        }, a.onerror = p, setTimeout(p, 2e3)
                    }
                }
                function p() {
                    ge = !0, s()
                }
                function h() {
                    var e = ue.element.clientWidth, t = ue.element.clientHeight, n = ue.config.video.width / ue.config.video.height, o = e - t * n, i = t - e / n, r = ye.querySelector(".flideo");
                    if (o > 0 && 10 > o || i > 0 && 10 > i) {
                        var a = e / (e - o), s = t / (t - i), l = Math.max(a, s);
                        return ye.classList.add("cover"), r.style.webkitTransform = "scale(" + l + ")", void(r.style.transform = "scale(" + l + ")")
                    }
                    ye.classList.remove("cover"), r.style.webkitTransform = "", r.style.transform = ""
                }
                function m(e, t, n) {
                    o && o[e.will] && o[e.will].apply(null, [ue.config.video.id].concat(n)) === !1 || (t.apply(null, [ue.config.video.id].concat(n)), o && o[e.did] && o[e.did]())
                }
                function g() {
                    var e = Ae, t = window.getComputedStyle(ue.element, ":after");
                    t && (Ae = t.getPropertyValue("content").replace(/["'\s]*/g, ""), Ae && e !== Ae && "undefined" != typeof Se[Ae] && he.fire(Se[Ae]))
                }
                function b() {
                    o && d.Delegate.tipJar.will in o || (ue.config.embed.settings.tipjar = 0), o && d.Delegate.collectionsOverlay.will in o || (ue.config.embed.settings.collections = 0)
                }
                function w() {
                    ue.storageModule = new K["default"](ue.config, he)
                }
                function y() {
                    var e = ue.config.video.vod && "purchase_options"in ue.config.video.vod && ue.config.video.vod.purchase_options.length, t = ue.element.querySelector("video");
                    ue.element.innerHTML = S["default"].render("outer", {showSidedock: ue.config.embed.settings.instant_sidedock || e}), t && ue.element.appendChild(t), ye = ue.element.querySelector(".video"), Ee = ue.element.querySelector(".video-wrapper"), ke = ue.element.querySelector(".title"), _e = ue.element.querySelector(".sidedock"), Le = ue.element.querySelector(".controls"), xe = ue.element.querySelector(".overlay-wrapper"), Ce = ue.element.querySelector(".notification-wrapper"), Te = ue.element.querySelector(".outro-wrapper"), Pe = ue.element.querySelector(".captions"), E()
                }
                function E() {
                    ue.config.view !== d.View.main && ue.config.view !== d.View.privateUnlocked || !ue.config.embed.settings || ue.config.embed.settings.playbar ? ue.element.classList.remove("no-playbar") : ue.element.classList.add("no-playbar"), ue.config.embed.settings.fullscreen ? ue.element.classList.add("with-fullscreen") : ue.element.classList.remove("with-fullscreen"), ue.config.embed.settings.custom_logo ? (ue.element.classList.add("with-custom-logo"), ue.config.embed.settings.custom_logo.sticky && ue.element.classList.add("with-sticky-custom-logo")) : (ue.element.classList.remove("with-custom-logo"), ue.element.classList.remove("with-sticky-custom-logo"))
                }
                function k() {
                    function e() {
                        ye.style.backgroundImage = "none"
                    }
                    ue.config.video.thumbs && v(ue.config.video.thumbs), he.on([d.Events.playInitiated, d.Events.playButtonPressed], e), h(), R["default"](window).on("resize", h), he.on(d.Events.didEnterFullscreen, function() {
                        ("none" !== ye.style.backgroundImage || "beginning" === ue.config.embed.outro) && v(ue.config.video.thumbs)
                    }), R["default"](window).on("resize", function() {
                        me || v(ue.config.video.thumbs)
                    })
                }
                function _() {
                    var e = u.parseTime(document.location.hash);
                    null !== e && (ue.config.embed.time = u.limit(e, 0, ue.config.video.duration), B["default"].touch || (ue.config.embed.autoplay = 1), document.location.hash.indexOf("at=") > -1 && history && history.replaceState && history.replaceState("", document.title, window.location.pathname))
                }
                function L() {
                    ue.apiModule = new I["default"](ue.config, he, q["default"]), Object.keys(ue.apiModule).forEach(function(e) {
                        if ("function" == typeof ue.apiModule[e])
                            return void Object.defineProperty(Me, e, {enumerable: !0, value: ue.apiModule[e]});
                        var t = {enumerable: !0, get: ue.apiModule[e].get};
                        ue.apiModule[e].set && (t.set = ue.apiModule[e].set), Object.defineProperty(Me, e, t)
                    }), ue.colorModule = new Y["default"](ue.config, he, {uuid: ue.uuid, id: ue.element.id, isMobileDevice: fe}), ue.overlayModule = new j["default"](ue.config, he, xe), ue.statsModule = new G["default"](ue.config, he), ue.analyticsModule = new F["default"](ue.config, he), ue.metricsModule = new W["default"](ue.config, he), ue.controlsModule = new D["default"](ue.config, he, ue.element), ue.titleModule = new J["default"](ue.config, he, ke), ue.controlBarModule = new N["default"](ue.config, he, Le), ue.sidedockModule = new X["default"](ue.config, he, _e), ue.notificationModule = new U["default"](ue.config, he, Ce), ue.outroModule = new z["default"](ue.config, he, Te), ue.popupModule = new $["default"](ue.config, he), ue.captionsModule = new V["default"](ue.config, he, Pe, ue.element), ue.keyboardModule = new H["default"](ue.config, he, ue.element), Object.defineProperties(Me, {pauseKeyboard: {enumerable: !0, value: ue.keyboardModule.pause}, unpauseKeyboard: {enumerable: !0, value: ue.keyboardModule.unpause}}), ue.config.view !== d.View.privatePassword && ue.config.view !== d.View.privateLocked && (ue.videoModule = new Z["default"](ue.config, he, Ee)), be = !0, s()
                }
                function x() {
                    function e(e, t) {
                        n || (n = !0, he.fire(d.Events.didEnterFullscreen, ue.element === e, o))
                    }
                    function t(e) {
                        n && (n = !1, he.fire(d.Events.didExitFullscreen, o), o || he.fire(d.Control.toggleNativeControls, !1), o = !1)
                    }
                    ue.config.embed.fullscreen = !0, (!M["default"].enabled || B["default"].browser.bb10) && (ue.element.classList.add("no-fullscreen-api-support"), M["default"].videoEnabled(ue.element) || (ue.element.classList.add("no-fullscreen-support"), ue.config.embed.fullscreen = !1));
                    var n = !1, o = !1;
                    he.on(d.Control.forceFullscreen, function() {
                        return M["default"].enabled || M["default"].videoEnabled(ue.element) ? (he.fire(d.Events.willEnterFullscreen), o = !1, void M["default"].request(ue.element)) : void he.fire(d.Control.toggleNativeControls, !0)
                    }), he.on(d.Events.fullscreenButtonPressed, function() {
                        M["default"].element ? (he.fire(d.Events.willExitFullscreen), M["default"].exit()) : (he.fire(d.Events.willEnterFullscreen), o = !0, M["default"].request(ue.element))
                    });
                    var i = M["default"].onenter, r = M["default"].onexit;
                    if (M["default"].onenter = function(t) {
                        return n ? void 0 : ue.element.contains(t) ? void e(t, !0) : void("function" == typeof i && i(t))
                    }, M["default"].onexit = function() {
                        return n ? t(!0) : void("function" == typeof r && r())
                    }, R["default"](ue.element).on("click", "a", function(e) {
                        M["default"].element === ue.element && M["default"].exit()
                    }), R["default"](ue.element).on("gestureend", function(e) {
                        e.scale > 1 && he.fire(d.Events.fullscreenButtonPressed)
                    }), "undefined" != typeof MSGesture) {
                        var a = 1, s = new MSGesture;
                        s.target = ue.element, R["default"](ue.element).on("pointerdown", function(e) {
                            s.addPointer(e.pointerId)
                        }).on(["MSGestureChange"], function(e) {
                            a *= e.scale
                        }).on(["MSGestureEnd"], function() {
                            (!n && a >= 2 || n && 1 > a) && he.fire(d.Events.fullscreenButtonPressed), a = 1
                        })
                    }
                }
                function C() {
                    he.on([d.Events.scrubbingStarted, d.Events.volumeScrubbingStarted], function() {
                        ue.element.classList.add("scrubbing")
                    }), he.on([d.Events.scrubbingEnded, d.Events.volumeScrubbingEnded], function() {
                        ue.element.classList.remove("scrubbing")
                    })
                }
                function T() {
                    function e(e) {
                        var t = ue.config.video.url;
                        if (!(!t || e && e.metaKey))
                            return ue.config._video.currentTime > 0 && ue.config._video.currentTime < ue.config.video.duration - 30 && !ue.config._video.paused && (t += "#at=" + Math.floor(ue.config._video.currentTime)), ue.config.embed.on_site ? void(window.location = t) : (window.open(t), i(e), he.fire(d.Events.pauseButtonPressed), !1)
                    }
                    R["default"](ue.element).on("click", "a[data-clip-link]", e), he.on(d.Control.openVimeo, e)
                }
                function P(e, t) {
                    if (he.fire(d.Control.checkSignatureExpiration), null === ve)
                        return void pe.push([e, t]);
                    var n = new XMLHttpRequest;
                    n.open(t, "//" + ue.config.player_url + "/video/" + ue.config.video.id + "/" + e + "?signature=" + ue.config.request.signature + "&session=" + ue.config.request.session + "&time=" + ue.config.request.timestamp + "&expires=" + ue.config.request.expires, !0), n.withCredentials = !0, n.send()
                }
                function A() {
                    he.on(d.Events.vodButtonPressed, function(e) {
                        return ue.config.user.purchased ? !ue.config.video.vod.is_feature && ue.config.video.vod.feature_id ? void f(ue.config.video.vod.feature_id, function() {
                            he.fire(d.Events.playButtonPressed)
                        }) : void he.fire(d.Events.playButtonPressed) : void m(d.Delegate.purchase, function() {
                            he.fire(d.Control.openPopup, "purchase", {productId: e})
                        }, e)
                    })
                }
                function Q() {
                    he.on(d.Events.tipJarButtonPressed, function() {
                        m(d.Delegate.tipJar, function() {
                            he.fire(d.Control.openPopup, "tip-jar")
                        })
                    })
                }
                function ee() {
                    he.on(d.Events.collectionsButtonPressed, function() {
                        m(d.Delegate.collectionsOverlay, function() {
                        })
                    })
                }
                function te() {
                    he.on(d.Events.likeButtonPressed, function() {
                        ue.config.user.logged_in ? ue.config.user.liked ? m(d.Delegate.unlike, function() {
                            P("like", "DELETE"), ue.config.user.liked = !1, he.fire(d.Events.unliked)
                        }) : m(d.Delegate.like, function() {
                            P("like", "PUT"), ue.config.user.liked = !0, he.fire(d.Events.liked)
                        }) : m(d.Delegate.loginForm, function() {
                            he.fire(d.Control.openPopup, "login-like")
                        }, "like")
                    })
                }
                function ne() {
                    he.on(d.Events.watchLaterButtonPressed, function() {
                        ue.config.video.url && (ue.config.user.logged_in ? ue.config.user.watch_later ? m(d.Delegate.removeFromWatchLater, function() {
                            P("watch-later", "DELETE"), ue.config.user.watch_later = !1, he.fire(d.Events.removedFromWatchLater)
                        }) : m(d.Delegate.addToWatchLater, function() {
                            P("watch-later", "PUT"), ue.config.user.watch_later = !0, he.fire(d.Events.addedToWatchLater)
                        }) : m(d.Delegate.loginForm, function() {
                            he.fire(d.Control.openPopup, "login-watch-later")
                        }, "watch-later"))
                    })
                }
                function oe() {
                    he.on(d.Events.shareButtonPressed, function() {
                        var e = function() {
                            he.fire(d.Control.showOverlay, "share", ue.config.embed.settings.share && ue.config.embed.settings.share.embed_only)
                        };
                        return M["default"].element ? void e() : void m(d.Delegate.shareOverlay, e)
                    }), he.on(d.Events.embedButtonPressed, function() {
                        ue.config.embed.settings.share.embed_only && m(d.Delegate.shareOverlay, function() {
                            he.fire(d.Control.showOverlay, "share", !0)
                        })
                    }), he.on(d.Events.overlayClosed, function() {
                        u.resetFocus(ue.element)
                    })
                }
                function ie() {
                    he.on(d.Control.loadVideo, f), he.on(d.Events.configChanged, function() {
                        E()
                    }), he.on(d.Events.userLoggedOut, function() {
                        l(ue.config.video.id, function() {
                            he.fire(d.Events.configChanged, ue.config)
                        })
                    }), he.on(d.Events.userLogIn, function(e) {
                        l(ue.config.video.id, function() {
                            if (he.fire(d.Events.configChanged, ue.config), !ue.config.user.logged_in)
                                return void he.fire(d.Events.loginFailure);
                            switch (he.fire(d.Events.userLoggedIn, e), e) {
                                case"like":
                                    ue.config.user.liked && he.fire(d.Events.liked);
                                    break;
                                case"watch-later":
                                    ue.config.user.watch_later && he.fire(d.Events.addedToWatchLater);
                                    break;
                                case"private":
                                    he.fire(d.Events.privateUnlocked)
                            }
                        })
                    })
                }
                function re() {
                    he.on([d.Events.passwordUnlocked, d.Events.privateUnlocked], r)
                }
                function ae() {
                    if (R["default"](window).on("resize", g), "undefined" != typeof MutationObserver) {
                        var e = new MutationObserver(g);
                        e.observe(ue.element, {attributes: !0, attributeFilter: ["class"]})
                    }
                }
                function se() {
                    var e = !1;
                    he.on(d.Control.checkSignatureExpiration, function() {
                        ve && ve - 1e3 <= (new Date).getTime() && (he.fire(d.Events.signatureExpired), ve = null)
                    }), he.on(d.Events.signatureExpired, function() {
                        e || (e = !0, c(function() {
                            e = !1, he.fire(d.Events.requestConfigReloaded, ue.config.request)
                        }))
                    }), he.on(d.Events.requestConfigReloaded, function() {
                        if (pe.length > 0)
                            for (var e = pe.shift(); e; )
                                P.apply(null, e), e = pe.shift()
                    })
                }
                function le() {
                    function e() {
                        var e = 90 === Math.abs(window.orientation) ? screen.height : screen.width;
                        return B["default"].mobileAndroid && !B["default"].browser.chrome && !B["default"].browser.opera && B["default"].android >= 4 && (e /= window.devicePixelRatio), e / window.innerWidth
                    }
                    function t(e) {
                        var t = Math.round(10 * Math.pow(e, -1.2));
                        return Math.max(t, 10) + "px"
                    }
                    function n(e) {
                        var t = Math.round(10 * Math.pow(e, -.7));
                        return Math.max(t, 10) + "px"
                    }
                    function o() {
                        if (0 === window.innerWidth)
                            return void setTimeout(o, 250);
                        var i = e(), r = t(i), a = n(i);
                        Le.style.fontSize = r, _e.style.fontSize = a, ke.style.fontSize = a
                    }
                    function i() {
                        Le.style.fontSize = "", _e.style.fontSize = "", ke.style.fontSize = ""
                    }
                    he.on(d.Events.didEnterFullscreen, i).on(d.Events.didExitFullscreen, o), B["default"].touch && ue.element.classList.add("touch-support"), fe && (ue.element.classList.add("mobile"), o())
                }
                function de() {
                    if (B["default"].iOS && !ue.config && null === ue.element.querySelector("video")) {
                        var e = document.createElement("video");
                        ue.element.appendChild(e), e.play(), e.pause()
                    }
                    if (!ue.config)
                        return l(t, de);
                    for (ve = (new Date).getTime() + 1e3 * ue.config.request.expires, ue.config._video = {}, (fe || B["default"].iPad || B["default"].android) && (ue.config.embed.autoplay = 0), b(), w(), _(), y(), k(), L(), x(), C(), T(), A(), Q(), ee(), te(), ne(), oe(), ie(), re(), ae(), se(), le(), R["default"](ue.element).on("click", ["a", "button", "[tabindex]"], i), a(), Object.preventExtensions && Object.preventExtensions(Me), he.fire(d.Events.ready); Oe.length; ) {
                        var n = Oe.shift();
                        n.call(Me)
                    }
                }
                var ue = this;
                ue.element = e, ue.uuid = Math.round(1e3 * Math.random() + (new Date).getTime()), e.classList.add("player-" + ue.uuid), e.id || (e.id = "player" + ue.uuid), ue.config = null, isNaN(t) && "string" != typeof t && (ue.config = t), o = o || null;
                var ce, fe = B["default"].mobileAndroid || B["default"].iPhone || B["default"].windowsPhone || B["default"].browser.bb10, ve = null, pe = [], he = O["default"].make(), me = !1, ge = !1, be = !1, we = null, ye = null, Ee = null, ke = null, _e = null, Le = null, xe = null, Ce = null, Te = null, Pe = null, Ae = null, Se = {tiny: d.Events.enteredTinyMode, mini: d.Events.enteredMiniMode, normal: d.Events.enteredNormalMode, none: d.Events.enteredNormalMode}, Me = {}, qe = !1, Oe = [];
                Object.defineProperties(Me, {config: {enumerable: !0, get: function() {
                            return ue.config
                        }, set: function(e) {
                            ue.config = e, he.fire(d.Events.configChanged, ue.config)
                        }}, delegate: {enumerable: !0, set: function(e) {
                            o = e
                        }}, ready: {enumerable: !0, value: function(e) {
                            if ("function" != typeof e)
                                throw new TypeError("You can only pass a function to ready().");
                            return qe ? void e.call(Me) : void Oe.push(e)
                        }}});
                var Re = n === !0;
                if (n !== !0) {
                    var Be = function() {
                        if (!Re) {
                            Re = !0, setTimeout(s, 100);
                            var e = (new Date).getTime() - n.startTime;
                            window._gaq && window._gaq.push(["player._trackTiming", "Player", "CSS Load", e])
                        }
                    };
                    n.link.addEventListener("load", Be, !1);
                    var Fe = function(e) {
                        var t = !1;
                        try {
                            var n, o = e.sheet;
                            o && (n = o.cssRules, t = null === n, !t && n && (o.insertRule("-curl-css-test {}", 0), o.deleteRule(0), t = !0))
                        } catch (i) {
                            t = "[object Opera]" !== Object.prototype.toString.call(window.opera) && /security|denied/i.test(i.message)
                        }
                        return t
                    }, Ie = function Ve() {
                        return Fe(n.link) ? void Be() : setTimeout(Ve, 50)
                    };
                    Ie()
                }
                return de(), Me
            }
            var S = (P(n), P(o)), M = P(i), q = P(r), O = P(a), R = P(s), B = P(l), F = P(c), I = P(f), V = P(v), N = P(p), D = P(h), H = P(m), W = P(g), U = P(b), z = P(w), j = P(y), Y = P(E), $ = P(k), X = P(_), G = P(L), K = P(x), J = P(C), Z = P(T);
            t.exports = A
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t], i = function(e) {
            "use strict";
            e.__esModule = !0;
            var t = {main: 1, privateLocked: 2, privateUnlocked: 3, privatePassword: 4, contentRating: 9}, n = {like: {will: "willLikeVideo", did: "didLikeVideo"}, unlike: {will: "willUnlikeVideo", did: "didUnlikeVideo"}, addToWatchLater: {will: "willAddToWatchLater", did: "didAddToWatchLater"}, removeFromWatchLater: {will: "willRemoveFromWatchLater", did: "didRemoveFromWatchLater"}, purchase: {will: "willOpenVodPurchaseForm", did: "didOpenVodPurchaseForm"}, shareOverlay: {will: "willOpenShareOverlay", did: "didOpenShareOverlay"}, loginForm: {will: "willOpenLoginForm", did: "didOpenLoginForm"}, tipJar: {will: "willOpenTipJarForm", did: "didOpenTipJarForm"}, collectionsOverlay: {will: "willOpenCollectionsOverlay", did: "didOpenCollectionsOverlay"}}, o = {seek: 1, loadVideo: 2, changeVolume: 3, changeScaling: 4, showOverlay: 5, openPopup: 6, reset: 7, changeLoop: 8, changeQuality: 9, openVimeo: 10, changeColor: 11, checkSignatureExpiration: 12, disableHd: 14, disableVolume: 15, forceFullscreen: 16, turnCaptionsOn: 17, turnCaptionsOff: 18, toggleNativeControls: 19}, i = {error: 49, playInitiated: 50, paused: 51, played: 52, loadProgress: 53, playProgress: 54, seeked: 55, ended: 56, bufferStarted: 57, bufferEnded: 58, volumeChanged: 59, qualityChanged: 60, targetTimeReached: 61, cueChanged: 62, fullscreenButtonPressed: 100, pauseButtonPressed: 101, playButtonPressed: 102, hdButtonPressed: 103, ccButtonPressed: 104, scrubbingStarted: 105, scrubbingEnded: 106, volumeScrubbingStarted: 107, volumeScrubbingEnded: 108, controlBarVisibilityChanged: 109, sidedockVisibilityChanged: 110, menuVisibilityChanged: 111, captionsChanged: 112, badgePressed: 140, willEnterFullscreen: 150, didEnterFullscreen: 151, willExitFullscreen: 152, didExitFullscreen: 153, likeButtonPressed: 200, watchLaterButtonPressed: 201, shareButtonPressed: 202, embedButtonPressed: 203, scalingButtonPressed: 204, vodButtonPressed: 205, tipJarButtonPressed: 206, collectionsButtonPressed: 207, overlayOpened: 250, overlayClosed: 251, overlayCleared: 252, overlayCloseButtonPressed: 253, facebookButtonPressed: 254, twitterButtonPressed: 255, tumblrButtonPressed: 256, emailButtonPressed: 257, embedCodeCopied: 258, popupOpened: 259, mousedOut: 300, mousedOver: 301, mouseTimeout: 302, liked: 303, unliked: 304, addedToWatchLater: 305, removedFromWatchLater: 306, userLogIn: 307, userLoggedIn: 308, userLoggedOut: 309, loginFailure: 310, colorChanged: 311, configChanged: 312, passwordUnlocked: 313, privateUnlocked: 314, enteredTinyMode: 315, enteredMiniMode: 320, enteredNormalMode: 316, signatureExpired: 317, requestConfigReloaded: 318, embedSettingChanged: 319, outroDisplayed: 321, outroHidden: 322, outroVideoPressed: 323, becameActive: 324, becameInactive: 325, tipped: 326, titleModuleReady: 350, sidedockModuleReady: 351, controlBarModuleReady: 352, videoModuleReady: 353, overlayModuleReady: 354, notificationModuleReady: 355, statsModuleReady: 356, apiModuleReady: 357, analyticsModuleReady: 358, ready: 359, notificationHidden: 400, airPlayAvailable: 500, airPlayNotAvailable: 501, airPlayActivated: 502, airPlayDeactivated: 503, airPlayButtonPressed: 504};
            e.View = t, e.Delegate = n, e.Control = o, e.Events = i
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t], i = function(e) {
            "use strict";
            function t(e, t) {
                if (Array.isArray(e))
                    return e;
                if (Symbol.iterator in Object(e)) {
                    var n = [], o = !0, i = !1, r = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0)
                            ;
                    } catch (l) {
                        i = !0, r = l
                    } finally {
                        try {
                            !o && s["return"] && s["return"]()
                        } finally {
                            if (i)
                                throw r
                        }
                    }
                    return n
                }
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
            e.__esModule = !0;
            var n = function(e, t, n) {
                try {
                    n = n || document.styleSheets[0], n.insertRule ? n.insertRule(e + "{" + t + "}", (n.cssRules || n.rules).length) : n.addRule(e, t)
                } catch (o) {
                }
            }, o = function(e, t, n) {
                return e > n ? n : t > e ? t : e
            }, i = function(e, t, n) {
                var o = n.width, i = n.height, r = n.scrollbars, a = void 0 === r ? "yes" : r, s = n.resizable, l = void 0 === s ? "yes" : s, d = n.toolbar, u = void 0 === d ? "no" : d, c = (window.screenY || window.screenTop || 0) + window.outerHeight / 2 - i / 2, f = (window.screenX || window.screenLeft || 0) + window.outerWidth / 2 - o / 2;
                window.chrome && -1 !== window.navigator.userAgent.toLowerCase().indexOf("mac os x") && (i += 27), window.safari && (i += 47);
                var v = "scrollbars=" + a + ",resizable=" + l + ",toolbar=" + u;
                return window.open(e, t, "width=" + o + ",height=" + i + ",left=" + f + ",top=" + c + "," + v)
            }, r = function(e) {
                var n = e.match(/t=([0-9hms:]+)/);
                null !== n && (e = n[1]);
                var o = !1, i = 0, r = 0, a = 0;
                if (n = e.match(/^([0-9]+)$/), n && n.length && (o = !0, a = n[1]), o === !1 && (n = e.match(/^(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s)?/), null !== n && "" !== n[0])) {
                    o = !0;
                    var s = t(n, 4), l = s[1];
                    i = void 0 === l ? 0 : l;
                    var d = s[2];
                    r = void 0 === d ? 0 : d, a = s[3]
                }
                if (o === !1 && (n = e.match(/^([0-9:]+)/), null !== n)) {
                    o = !0;
                    var u = e.split(":").reverse(), c = t(u, 3);
                    a = c[0];
                    var f = c[1];
                    r = void 0 === f ? 0 : f;
                    var v = c[2];
                    i = void 0 === v ? 0 : v
                }
                return o ? 60 * parseInt(i, 10) * 60 + 60 * parseInt(r, 10) + parseInt(a, 10) : null
            }, a = function(e) {
                for (var t, n, o = (e || document).querySelectorAll("[tabindex]"), i = [], r = 0, a = 0, s = o.length; s > a; a++)
                    t = o[a], n = window.getComputedStyle(t, ""), t.tabIndex > 0 && "none" !== n.display && n.opacity > 0 && "hidden" !== n.visibility && (i[r++] = t);
                var l = i.shift();
                l && (l.focus(), l.blur())
            }, s = function(e, t) {
                if (e = parseFloat(e), isNaN(e))
                    return 0;
                var n = Math.pow(10, t || 3);
                return Math.round(e * n) / n
            }, l = function(e, t) {
                var n, o, i, r, a = 0, s = function() {
                    a = new Date, i = null, r = e.apply(n, o)
                };
                return function() {
                    var l = new Date, d = t - (l - a);
                    return n = this, o = arguments, 0 >= d ? (clearTimeout(i), i = null, a = l, r = e.apply(n, o)) : i || (i = setTimeout(s, d)), r
                }
            };
            e.addCssRule = n, e.limit = o, e.openWindow = i, e.parseTime = r, e.resetFocus = a, e.round = s, e.throttle = l
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e], i = function(e, t) {
            "use strict";
            function n(e) {
                return new RegExp(e.toLowerCase()).test(r)
            }
            function o(e) {
                var t = document.createElement("div"), n = e.charAt(0).toUpperCase() + e.slice(1), o = (e + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n).split(" ");
                for (var i in o) {
                    var r = o[i];
                    if (void 0 !== t.style[r])
                        return r
                }
            }
            function i() {
                var e = navigator, t = !1, n = [0, 0, 0], o = null, i = "Shockwave Flash", r = "application/x-shockwave-flash", a = "ShockwaveFlash.ShockwaveFlash";
                if ("undefined" != typeof e.plugins && "object" == typeof e.plugins[i])
                    o = e.plugins[i].description, !o || "undefined" != typeof e.mimeTypes && e.mimeTypes[r] && !e.mimeTypes[r].enabledPlugin || (t = !0, o = o.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), n[0] = parseInt(o.replace(/^(.*)\..*$/, "$1"), 10), n[1] = parseInt(o.replace(/^.*\.(.*)\s.*$/, "$1"), 10), n[2] = /[a-zA-Z]/.test(o) ? parseInt(o.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if ("undefined" != typeof window.ActiveXObject)
                    try {
                        var s = new ActiveXObject(a);
                        s && (o = s.GetVariable("$version"), o && (t = !0, o = o.split(" ")[1].split(","), n = [parseInt(o[0], 10), parseInt(o[1], 10), parseInt(o[2], 10)]))
                    } catch (l) {
                    }
                return{installed: t, version: n.join("."), major: n[0], minor: n[1], revision: n[2], versionAtLeast: function(e, t, o) {
                        e = e || 10, t = t || 1, o = o || 0;
                        for (var i = n, r = arguments, a = Math.min(i.length, r.length), s = 0; a > s; s++) {
                            if (i[s] >= r[s]) {
                                if (a > s + 1 && i[s] === r[s])
                                    continue;
                                return!0
                            }
                            return!1
                        }
                    }}
            }
            var r = navigator.userAgent.toLowerCase(), a = n("android") ? parseFloat(r.replace(/^.* android (\d+)\.(\d+).*$/, "$1.$2")) || !0 : !1, s = window.devicePixelRatio || 1, l = n("windows phone") || n("iemobile") ? parseFloat(r.replace(/^.* windows phone (os )?(\d+)\.(\d+).*$/, "$2.$3")) || !0 : !1, d = n("msie") ? parseFloat(r.replace(/^.*msie (\d+).*$/, "$1")) : !1, u = n("trident") ? parseFloat(r.replace(/^.*trident\/(\d+)\.(\d+).*$/, "$1.$2")) + 4 : !1, c = n("ipad;") || n("iphone;") || n("ipod touch;") ? parseFloat(r.replace(/^.* os (\d+)_(\d+).*$/, "$1.$2")) : !1;
            t.exports = {airPlay: "WebKitPlaybackTargetAvailabilityEvent"in window, android: a, iOS: c, mobileAndroid: a && n("mobile"), browser: {bb10: n("bb10"), chrome: n("chrome"), firefox: n("firefox"), ie: d || u, edge: n("edge"), opera: n("opera"), safari: n("safari") && n("apple") && !n("chrome") && !n("android")}, devicePixelRatio: s, flash: i(), iPhone: n("iphone;") || n("ipod touch;") || n("ipod;"), iPad: n("ipad;"), iPadNonRetina: n("ipad;") && 2 > s, mac: n("mac os"), pointerEvents: window.navigator.pointerEnabled || window.navigator.msPointerEnabled || !1, svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, touch: "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch || n("windows phone") || window.navigator.maxTouchPoints > 1 || window.navigator.msMaxTouchPoints || !1, transformProperty: o("transform"), windowsPhone: l}
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(32)], i = function(e, t, n) {
            "use strict";
            function o(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function i(e, t, n, o) {
                return o.relatedTarget ? n && e !== t ? !1 : t === o.relatedTarget ? !1 : t.contains(o.relatedTarget) ? !1 : !0 : !0
            }
            var r = o(n), a = r["default"].addEvent, s = "undefined" == typeof window.PointerEvent && "undefined" != typeof window.MSPointerEvent, l = {pointerdown: "MSPointerDown", pointerup: "MSPointerUp", pointercancel: "MSPointerCancel", pointermove: "MSPointerMove", pointerenter: "MSPointerEnter", pointerleave: "MSPointerLeave", pointerover: "MSPointerOver", pointerout: "MSPointerOut"}, d = "onmspointerenter"in document, u = "onmspointerleave"in document;
            r["default"].addEvent = function(e, t, n) {
                s && l[t] && (t = l[t]), "transitionend" === t && (a(e, "webkitTransitionEnd", n), a(e, "otransitionend", n)), "mouseenter" === t && (t = "mouseover"), "mouseleave" === t && (t = "mouseout"), "MSPointerEnter" !== t || d || (t = "MSPointerOver"), "MSPointerLeave" !== t || u || (t = "MSPointerOut"), a(e, t, n)
            }, r["default"].matchesEvent = function(e, t, n, o, r) {
                return"mouseenter" === e || "mouseleave" === e || !d && "MSPointerEnter" === e || !u && "MSPointerLeave" === e ? i(t, n, o, r) : !0
            }, t.exports = r["default"]
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t], i = function(t) {
            "use strict";
            !function() {
                var t = {};
                t.templates = {}, t.render = function(e, n) {
                    return t.templates[e] ? t.templates[e].call(t, n || {}) : ""
                }, t.map = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;"}, t.escape = function(e) {
                    return e.replace(/[&<>"'\/]/g, function(e) {
                        return t.map[e]
                    })
                }, t.templates.buffer = function(e) {
                    var t = '<svg width="110%"><defs><pattern id="buffer" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10" viewBox="0 0 10 10"><line x1="5" y1="-1" x2="-5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="10" y1="-1" x2="0" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="15" y1="-1" x2="5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /></pattern></defs><rect fill="url(#buffer)" width="100%" height="100%" /></svg>';
                    return t
                }, t.templates.content_rating = function(e) {
                    var t = '<div class="content-rating"><h1>Hold up!</h1><p class="subtitle">This video does not match your content rating preferences.</p><p>It may contain content indended for mature audiences including: nudity, strong language, and violence. <a href="">Edit your content rating preferences.</a></p><button>I still want to watch this video</button><div class="logo">' + e.logo + "</div></div>";
                    return t
                }, t.templates.controlbar = function(e) {
                    var t = '<button class="play rounded-box state-' + e.playState + '" title="Play" data-title-play="Play" data-title-pause="Pause" aria-label="Play"><div class="tiny-bars"><svg width="100%" height="100%" viewBox="0 0 65 40"><defs><clipPath id="rounded-border"><rect height="100%" width="100%" x="0" y="0" rx="5"/></clipPath><pattern id="buffer" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="4" viewBox="0 0 10 4"><line x1="5" y1="-1" x2="-5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="10" y1="-1" x2="0" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /><line x1="15" y1="-1" x2="5" y2="10" stroke-width="2" stroke="#666" stroke-linecap="butt" /></pattern></defs><g clip-path="url(#rounded-border)"><rect class="buffer hidden" height="3" width="110%" x="0" y="37" fill="url(#buffer)"/><rect class="loaded" height="3" width="0" x="0" y="37" fill="#666"/><rect class="played fill" height="3" width="0" x="0" y="37"/></g></svg></div><div class="play-icon">';
                    return t += this.render("icon_play") || "", t += '</div><div class="pause-icon">', t += this.render("icon_pause") || "", t += '</div></button><div class="play-bar rounded-box"><div class="progress"><div class="buffer hidden">', t += this.render("buffer") || "", t += '</div><div class="loaded" role="progressbar" aria-label="loaded" aria-valuemin="0" aria-valuemax="' + e.rawDuration + '" aria-valuenow="0"></div><div class="played" role="progressbar" aria-label="played" aria-valuemin="0" aria-valuemax="' + e.rawDuration + '" aria-valuenow="0"></div><div class="ghost-timecode invisible" role="presentation" aria-hidden="true"><div class="box">00:00</div></div><div class="timecode" role="presentation" aria-hidden="true"><div class="box">' + e.duration + "</div></div></div> ", e.volume && (t += ' <div class="volume" role="slider" aria-label="Volume (use arrow keys to change)" aria-valuemin="0" aria-valuemax="1" tabindex="0"><div></div><div></div><div></div><div></div><div></div></div> '), e.ccButton && (t += ' <button class="toggle cc ' + (e.ccOn ? "on" : "off") + '" title="Choose captions"> ', t += this.render("icon_cc") || "", t += " </button> "), e.hdButton && (t += ' <button class="toggle hd ' + (e.hdOn ? "on" : "off") + '" title="Turn HD ' + (e.hdOn ? "off" : "on") + '" data-title-on="Turn HD off" data-title-off="Turn HD on" aria-label="HD"> ', t += this.render("icon_hd") || "", t += " </button> "), e.airplayButton && (t += ' <button class="toggle airplay off hidden" title="Choose an AirPlay device" data-title-off="Choose an AirPlay device" data-title-on="Turn off AirPlay" hidden> ',
                            t += this.render("icon_airplay") || "", t += " </button> "), e.scalingButton && (t += ' <button class="scaling only-in-fullscreen" data-full-size="' + e.fullSize + '" data-title-full-size="View actual size" data-title-actual-size="View full size"> ', t += this.render("icon_scaling") || "", t += " </button> "), t += ' <button class="fullscreen', e.fullscreenButton || (t += " only-in-fullscreen"), t += '" title="Enter full screen" data-title-fullscreen="Enter full screen" data-title-unfullscreen="Exit full screen" aria-label="Fullscreen"><div class="fullscreen-icon">', t += this.render("icon_fullscreen") || "", t += '</div><div class="unfullscreen-icon">', t += this.render("icon_unfullscreen") || "", t += "</div></button> ", e.vimeoLogo.show && (t += ' <div class="logo"> ', e.vimeoLogo.showLink && (t += ' <a href="' + e.vimeoLogo.url + '"', e.targetBlank && (t += ' target="_blank"'), t += ' title="Watch on vimeo.com" aria-label="Watch on vimeo.com" data-clip-link> '), t += this.render("logo") || "", e.vimeoLogo.showLink && (t += " </a> "), t += " </div> "), t += ' <div class="mobile-timecode" role="presentation" aria-hidden="true">' + e.duration + "</div></div> ", e.customLogo && (t += ' <div class="custom-logo', e.customLogo.sticky && (t += " sticky"), t += '" style="width:' + e.customLogo.width + "px;height:" + e.customLogo.height + 'px"> ', e.customLogo.showLink && (t += '<a href="' + e.customLogo.url + '" target="_blank">'), t += ' <img src="' + e.customLogo.img + '" alt=""> ', e.customLogo.showLink && (t += "</a>"), t += " </div>"), t += ""
                }, t.templates.controlbar_trailer = function(e) {
                    var t = '<button class="play trailer rounded-box" title="Play Trailer" aria-label="Play Trailer"><div><span class="play-icon">';
                    return t += this.render("icon_play") || "", t += "</span><p>" + e.text + "</p></div></button>", e.vimeoLogo.show && (t += ' <div class="logo"> ', e.vimeoLogo.showLink && (t += ' <a href="' + e.vimeoLogo.url + '"', e.targetBlank && (t += ' target="_blank"'), t += ' title="Watch on vimeo.com" aria-label="Watch on vimeo.com" data-clip-link> '), t += this.render("logo") || "", e.vimeoLogo.showLink && (t += " </a> "), t += " </div>"), t += "", e.customLogo && (t += ' <div class="custom-logo', e.customLogo.sticky && (t += " sticky"), t += '" style="width:' + e.customLogo.width + "px;height:" + e.customLogo.height + 'px"> ', e.customLogo.showLink && (t += '<a href="' + e.customLogo.url + '" target="_blank">'), t += ' <img src="' + e.customLogo.img + '" alt=""> ', e.customLogo.showLink && (t += "</a>"), t += " </div>"), t += ""
                }, t.templates.error = function(e) {
                    var t = '<div class="window-wrapper error"><h1>' + e.title + "</h1> ";
                    return e.message && (t += " <p>" + e.message + "</p> "), t += "</div>"
                }, t.templates.hd_not_allowed = function(e) {
                    var t = '<div class="window-wrapper no-hd"><h1>' + e.title + '</h1><p class="subtitle">' + e.subtitle + '</p><a href="' + e.url + '" target="_blank" role="button" data-clip-link>' + e.button + "</button></div>";
                    return t
                }, t.templates.hd_notification = function(e) {
                    var t = '<div class="hd-notification"><div class="hd-stroke"> ' + e.stroke + ' </div><div class="hd-fill-wrapper"><div class="hd-fill"> ' + e.fill + " </div></div></div>";
                    return t
                }, t.templates.help = function(e) {
                    var t = '<div class="window-wrapper help"><h1>Keyboard Shortcuts</h1><dl><div class="volume-up secondary"><dt class="arrow">鈫�</dt><dd>Volume up</dd></div><div class="volume-down secondary"><dt class="arrow">鈫�</dt><dd>Volume down</dd></div><div class="scrub-forward secondary"><dt class="arrow">鈫�</dt><dd>Scrub forward</dd></div><div class="scrub-backwards secondary"><dt class="arrow">鈫�</dt><dd>Scrub backwards</dd></div><div class="like"><dt>L</dt><dd>Like</dd></div><div class="share"><dt>S</dt><dd>Share</dd></div><div class="watch-later"><dt>W</dt><dd>Watch Later</dd></div><div><dt>C</dt><dd>Toggle Captions</dd></div><div class="toggle-hd"><dt>H</dt><dd>Toggle HD</dd></div><div class="fullscreen"><dt>F</dt><dd>Fullscreen</dd></div> ';
                    return e.onSite || (t += '<div class="view-on-vimeo"><dt>V</dt><dd>View on Vimeo</dd></div>'), t += ' </dl><a href="https://vimeo.com" class="off-site" role="button">View on Vimeo.com</a></div>'
                }, t.templates.icon_airplay = function(e) {
                    var t = '<svg class="airplay-icon" viewBox="0 0 44 36"><defs><clipPath id="triangle"><polygon points="-2,-2 -2,36 2,36 22,15 42,36 46,36 46,-2"/></clipPath></defs><rect class="stroke" stroke-width="5" width="44" height="26" x="0" y="2" clip-path="url(#triangle)"/><polygon class="fill" points="7,36 22,18 37,36"/></svg>';
                    return t
                }, t.templates.icon_back = function(e) {
                    var t = '<svg class="icon-back" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid"><path class="fill" d="M0 32l32 32v-20h32l0-24h-32v-20z"/></svg>';
                    return t
                }, t.templates.icon_broken_heart = function(e) {
                    var t = '<svg class="unlike-icon" viewBox="0 0 110 81" preserveAspectRatio="xMidYMid"><path class="fill" d="M82.496 1c-14.594 0-23.198 10.043-25.948 14.48l-6.77 10.727 13.661 8.543-13.661 12.535 5.695 15.348-9.686-15.348 11.389-11.975-11.969-7.402s4.22-14.27 4.621-15.521c.782-2.438.782-2.438-.813-3.289-5.516-2.944-12.608-8.098-21.509-8.098-16.299 0-27.506 15.037-27.506 27.885 0 12.795 12.562 22.558 22.245 27.592 9.186 4.771 30.601 18.349 32.755 24.523 2.154-6.174 23.57-19.752 32.753-24.523 9.684-5.034 22.247-14.797 22.247-27.592 0-12.848-11.208-27.885-27.504-27.885z"/></svg>';
                    return t
                }, t.templates.icon_cc = function(e) {
                    var t = '<svg viewBox="0 0 20 14"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M17 0h-14c-1.657 0-3 1.343-3 3v8c0 1.656 1.343 3 3 3h14c1.657 0 3-1.344 3-3v-8c0-1.657-1.343-3-3-3zm-7.271 8.282c-.145.923-.516 1.686-1.105 2.268-.597.591-1.369.89-2.294.89-1.138 0-2.049-.402-2.706-1.195-.647-.786-.975-1.866-.975-3.215 0-1.458.372-2.603 1.105-3.403.65-.708 1.487-1.067 2.487-1.067 1.33 0 2.321.482 2.947 1.435.34.53.526 1.072.553 1.611l.013.236h-1.984l-.044-.169c-.092-.355-.207-.622-.343-.793-.239-.298-.591-.443-1.076-.443-.483 0-.856.209-1.14.641-.298.455-.449 1.12-.449 1.977 0 .851.156 1.49.466 1.898.298.395.666.588 1.122.588.469 0 .814-.16 1.058-.491.138-.183.255-.472.351-.856l.042-.17h2.013l-.041.258zm7.582 0c-.145.923-.516 1.686-1.104 2.268-.598.591-1.369.89-2.294.89-1.139 0-2.049-.402-2.707-1.195-.646-.785-.975-1.865-.975-3.214 0-1.458.372-2.603 1.106-3.403.649-.708 1.485-1.067 2.486-1.067 1.33 0 2.32.482 2.946 1.435.34.53.526 1.072.554 1.611l.012.236h-1.9829999999999999l-.043-.169c-.092-.355-.208-.623-.344-.793-.238-.298-.591-.443-1.076-.443-.483 0-.856.209-1.139.641-.299.455-.45 1.12-.45 1.977 0 .851.157 1.49.467 1.898.299.395.666.588 1.121.588.469 0 .814-.16 1.058-.491.138-.183.256-.472.352-.856l.042-.17h2.012l-.041.257z"/></svg>';
                    return t
                }, t.templates.icon_clock = function(e) {
                    var t = '<svg class="watch-later-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid"><polyline class="fill hour-hand" points="9.64,4.68 10.56,4.68 11.28,11.21 8.93,11.21 9.64,4.68" /><polyline class="fill minute-hand" points="14.19,13.65 13.7,14.14 8.58,10.4 10.44,8.5 14.19,13.65" /><circle class="stroke" cx="10" cy="10" r="8" stroke-width="2" /></svg>';
                    return t
                }, t.templates.icon_close = function(e) {
                    var t = '<svg class="icon-close" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid"><path class="fill" d="M60 48.796l-16.812-16.796 16.812-16.796-11.204-11.204-16.796 16.804-16.804-16.804-11.196 11.204 16.796 16.796-16.796 16.796 11.196 11.204 16.804-16.804 16.796 16.804z"/></svg>';
                    return t
                }, t.templates.icon_collections = function(e) {
                    var t = '<svg class="collections-icon" viewBox="0 0 24 24"><path class="fill" d="M24 12c0-.3-.1-.6-.4-.8l-2.7-2.3 2.4-1c.4-.1.7-.5.7-.9 0-.3-.1-.6-.4-.8l-7-6c-.1-.1-.4-.2-.6-.2-.1 0-.3 0-.4.1l-15 6c-.3.1-.6.5-.6.9 0 .3.1.6.4.8l2.7 2.3-2.4 1c-.4.1-.7.5-.7.9 0 .3.1.6.4.8l2.7 2.3-2.4 1c-.4.1-.7.5-.7.9 0 .3.1.6.4.8l7 6c.1.1.4.2.6.2.1 0 .3 0 .4-.1l15-6c.4-.1.6-.5.6-.9 0-.3-.1-.6-.4-.8l-2.7-2.3 2.4-1c.4-.1.7-.5.7-.9zm-8.2-9.8l5.3 4.5-12.9 5.1-5.3-4.5 12.9-5.1zm5.3 14.5L8.2 21.8l-5.3-4.5 1.9-.8 2.6 2.2c.1.2.4.3.6.3.1 0 .3 0 .4-.1l10.5-4.2 2.2 2zm-12.9.1l-5.3-4.5 1.9-.8 2.6 2.2c.1.2.4.3.6.3.1 0 .3 0 .4-.1l10.5-4.2 2.3 1.9-13 5.2z"/></svg>';
                    return t
                }, t.templates.icon_download = function(e) {
                    var t = '<svg class="download-icon" viewBox="0 0 100 78.3"><path class="fill" d="M87.9,31.5c0-0.6,0.1-1.2,0.1-1.8C88,13.3,74.6,0,58.2,0c-11.8,0-22,6.9-26.8,17c-2.3-1.8-5.2-2.9-8.4-2.9c-7.6,0-13.7,6.1-13.7,13.7c0,1.4,0.2,2.8,0.6,4.1C4,35.4,0,41.8,0,49.2c0,11,8.9,20,19.8,20.1v0h0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0H30l-6.4-7.6c-2.7-3.3-3.4-7.3-1.7-10.8c1.6-3.5,5.2-5.6,9.4-5.6h4.4V34.2c0-6.6,5.4-11.9,11.9-11.9h4.2c6.6,0,11.9,5.4,11.9,11.9v11.2h4.4c4.2,0,7.8,2.1,9.4,5.6c1.6,3.5,1,7.6-1.7,10.8l-6.4,7.6h9.8c0.4,0,0.7,0.1,1.1,0.1c10.9,0,19.7-8.8,19.7-19.7C100,41.5,95,34.5,87.9,31.5z"/><path class="fill" d="M68.1,53.6H59c-1,0-2.3,0-3.6,0V34.2c0-2-1.6-3.6-3.6-3.6h-4.2c-2,0-3.6,1.6-3.6,3.6v19.5c-1.3,0-2.6,0-3.6,0h-9.1c-2,0-2.6,1.2-1.3,2.8l17.4,20.8c0.6,0.8,1.5,1.1,2.3,1.1s1.7-0.4,2.3-1.1l17.4-20.8C70.7,54.9,70.1,53.6,68.1,53.6z"/></svg>';
                    return t
                }, t.templates.icon_embed = function(e) {
                    var t = '<svg class="embed-icon" viewBox="0 0 55 48" preserveAspectRatio="xMidYMid"><polygon class="fill" points="16.019,16.385 11.968,13.131 0,24.543 12.082,35.955 16.132,32.703 7.439,24.543"/><polygon class="fill" points="42.92,13.131 38.868,16.384 47.561,24.542 38.981,32.701 43.033,35.955 55,24.542"/><polygon class="fill" points="24.083,39.221 28.76,39.221 36.243,8.351 31.566,8.351"/></svg>';
                    return t
                }, t.templates.icon_facebook = function(e) {
                    var t = '<svg class="facebook-icon" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid"><path class="fill" d="M35.992 64h-11.992v-32h-8v-11.028l8-0.004-0.013-6.497c0-8.997 2.44-14.471 13.037-14.471h8.824v11.030h-5.514c-4.127 0-4.325 1.541-4.325 4.418l-0.016 5.52h9.918l-1.169 11.028-8.741 0.004-0.008 32z"/></svg>';
                    return t
                }, t.templates.icon_fullscreen = function(e) {
                    var t = '<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid"><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(90)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(180)" /><polyline class="fill" points="6,6 5.9,2 4.9,3 2.9,1 1,2.9 3,4.9 2,5.9" transform="translate(6,6) rotate(270)" /></svg>';
                    return t
                }, t.templates.icon_hd = function(e) {
                    var t = '<svg viewBox="';
                    return t += e.notification ? "-1 -1 104.717 49.035" : "0 0 102.717 47.035", t += '" preserveAspectRatio="xMidYMid"><path class="', t += e.stroke ? "stroke" : "fill", t += '" d="M100.014 6.758c-1.352-2.162-3.244-3.781-5.676-5.134-2.434-1.083-5.947-1.624-10.274-1.624h-21.625l-7.297 47.035h21.895c2.434 0 5.676-.274 8.92-1.352 2.434-.542 4.596-1.627 7.03-3.785 2.161-1.621 4.324-4.055 5.675-7.028 1.621-2.701 2.973-6.757 3.786-11.623.269-3.244.269-6.487.269-9.19-.54-2.704-1.352-5.138-2.703-7.299zm-12.433 16.76c-.541 3.783-1.352 6.485-2.165 8.109-1.08 1.893-2.162 2.703-3.782 3.514-1.083.541-3.515 1.082-6.217 1.082h-3.517l3.517-25.41h3.782c3.514 0 6.217.811 7.568 2.703 1.083 1.625 1.352 5.135.814 10.002z"/><path class="', t += e.stroke ? "stroke" : "fill", t += '" d="M37.572,0L35.14,16.491H19.463L21.895,0H7.027L0,47.035h14.866l2.703-18.922h15.677l-2.971,18.922h14.866L52.439,0H37.572z"/></svg>'
                }, t.templates.icon_heart = function(e) {
                    var t = '<svg class="like-icon" viewBox="0 0 110 81" preserveAspectRatio="xMidYMid"><path class="fill" d="M82.496 1c-14.698 0-25.969 11.785-27.496 13.457-1.526-1.672-12.798-13.457-27.494-13.457-16.299 0-27.506 15.037-27.506 27.885 0 12.795 12.562 22.558 22.245 27.592 9.186 4.771 30.601 18.349 32.755 24.523 2.154-6.174 23.57-19.752 32.755-24.523 9.684-5.034 22.245-14.797 22.245-27.592 0-12.848-11.206-27.885-27.504-27.885z"/></svg>';
                    return t
                }, t.templates.icon_lock = function(e) {
                    var t = '<svg viewBox="0 0 46 76" preserveAspectRatio="xMidYMid"><path class="fill bolt" d="M5,42v-15C8,5 39,5 42,27v30h-7v-30C32,14 15,14 12,27v15z"/><rect class="fill" x="0" y="41" height="35" width="46" rx="4" ry="4"/></svg>';
                    return t
                }, t.templates.icon_mail = function(e) {
                    var t = '<svg class="mail-icon" viewBox="0 0 72 72" preserveAspectRatio="xMidYMid"><path class="fill" d="M71.754,57.6C71.9,57.169,72,56.718,72,56.241V16.759c0-0.453-0.092-0.881-0.225-1.291l-23.487,19.86L71.754,57.6z"/><path class="fill" d="M35.999,40.118l6.187-4.971l3.131-2.516L68.9,12.693c-0.387-0.113-0.789-0.193-1.213-0.193H4.312c-0.424,0-0.827,0.08-1.215,0.194l23.599,19.949l3.132,2.517L35.999,40.118z"/><path class="fill" d="M67.688,60.5c0.405,0,0.791-0.074,1.164-0.18L45.157,37.843l-9.159,7.361l-9.145-7.351L3.15,60.322C3.522,60.426,3.907,60.5,4.312,60.5H67.688z"/><path class="fill" d="M0.226,15.468C0.092,15.878,0,16.307,0,16.759v39.482c0,0.478,0.099,0.929,0.247,1.356l23.476-22.261L0.226,15.468z"/></svg>';
                    return t
                }, t.templates.icon_pause = function(e) {
                    var t = '<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid"><rect class="fill" width="6" height="20" x="0" y="0" /><rect class="fill" width="6" height="20" x="12" y="0" /></svg>';
                    return t
                }, t.templates.icon_play = function(e) {
                    var t = '<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid"><polygon class="fill" points="1,0 20,10 1,20" /></svg>';
                    return t
                }, t.templates.icon_scaling = function(e) {
                    var t = '<svg viewBox="0 0 14 12" preserveAspectRatio="xMidYMid"><rect class="fill" y="6" width="8" height="6"/><polygon class="fill stroked" points="1,0 1,4 3,4 3,2 12,2 12,8 10,8 10,10 14,10 14,0"/><polygon class="fill filled" points="1,0 1,4 10,4 10,10 14,10 14,0"/></svg>';
                    return t
                }, t.templates.icon_share = function(e) {
                    var t = '<svg class="share-icon" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid"><polygon class="fill" points="20,0 0,12 5,15 17,4 7,16 7,19 9,17 14,20"/></svg>';
                    return t
                }, t.templates.icon_tipjar = function(e) {
                    var t = '<svg class="tipjar-icon" viewBox="0 0 24 24"><path class="fill" d="M17.9 5.1V3h.5c.8 0 1.5-.7 1.5-1.5S19.3 0 18.4 0h-13c-.8 0-1.5.7-1.5 1.5S4.6 3 5.4 3h.5v2.1C3.1 5.6.9 8 .9 11v10c0 1.7 1.3 3 3 3h16c1.7 0 3-1.3 3-3V11c0-3-2.1-5.4-5-5.9zm-6 13.9c-2.2-3-6-2.8-6-6 0-1.7 1.3-3 3-3s3 1.5 3 1.5 1.3-1.5 3-1.5 3 1.3 3 3c0 3.2-3.7 3-6 6z"/></svg>';
                    return t
                }, t.templates.icon_tumblr = function(e) {
                    var t = '<svg class="tumblr-icon" viewBox="0 0 12 20"><path class="fill" d="M7.865,19.958 C3.629,19.958 2.02,16.834 2.02,14.627 L2.02,8.105 L0,8.105 L0,5.527 C3.027,4.436 3.756,1.705 3.927,0.149 C3.938,0.042 4.022,0 4.07,0 L6.994,0 L6.994,5.084 L10.987,5.084 L10.987,8.105 L6.979,8.105 L6.979,14.318 C6.993,15.149 7.291,16.287 8.815,16.287 C8.843,16.287 8.872,16.287 8.9,16.286 C9.43,16.272 10.14,16.118 10.511,15.941 L11.471,18.788 C11.11,19.317 9.481,19.932 8.015,19.957 C7.964,19.958 7.915,19.958 7.865,19.958"/></svg>';
                    return t
                }, t.templates.icon_twitter = function(e) {
                    var t = '<svg class="twitter-icon" viewBox="0 0 274 223" preserveAspectRatio="xMidYMid"><path class="fill" d="M85.98,222 C54.305,222 24.822,212.715 0,196.801 C4.388,197.319 8.853,197.584 13.38,197.584 C39.658,197.584 63.843,188.617 83.039,173.574 C58.495,173.121 37.781,156.905 30.644,134.621 C34.068,135.276 37.582,135.627 41.196,135.627 C46.312,135.627 51.267,134.942 55.974,133.66 C30.314,128.508 10.981,105.838 10.981,78.662 C10.981,78.426 10.981,78.191 10.985,77.957 C18.548,82.158 27.196,84.681 36.391,84.972 C21.341,74.914 11.438,57.746 11.438,38.287 C11.438,28.008 14.204,18.373 19.032,10.089 C46.696,44.023 88.025,66.353 134.641,68.692 C133.685,64.587 133.188,60.306 133.188,55.91 C133.188,24.935 158.302,-0.178 189.279,-0.178 C205.411,-0.178 219.988,6.634 230.22,17.535 C242.996,15.019 255,10.351 265.837,3.924 C261.649,17.021 252.756,28.013 241.175,34.955 C252.521,33.599 263.331,30.584 273.39,26.123 C265.87,37.371 256.36,47.25 245.402,55.158 C245.51,57.563 245.564,59.982 245.564,62.414 C245.564,136.533 189.148,222 85.98,222"/></svg>';
                    return t
                }, t.templates.icon_unfullscreen = function(e) {
                    var t = '<svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid"><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) "/><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(90)" /><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(180)" /><polyline class="fill" points="-1,-1 -1.1,-5 -2.1,-4 -4.1,-6 -6,-4.1 -4,-2.1 -5,-1.1" transform="translate(6,6) rotate(270)" /></svg>';
                    return t
                }, t.templates.icon_vod = function(e) {
                    var t = '<svg class="vod-icon" viewBox="0 0 21 23"><path class="fill" d="M19.602,4.716l-7.665-4.385C11.169-0.108,9.91-0.111,9.139,0.327L1.4,4.721C0.63,5.158,0,6.234,0,7.112v8.776c0,0.878,0.63,1.955,1.398,2.393l0.526,0.3l7.176,4.09c0.77,0.438,2.028,0.438,2.798,0l7.702-4.39c0.77-0.438,1.4-1.516,1.4-2.393V7.112C21,6.234,20.37,5.156,19.602,4.716z M7.336,15.761L7.337,7.24l8.008,4.26L7.336,15.761z"/></svg>';
                    return t
                }, t.templates.logo = function(e) {
                    var t = '<svg viewBox="0 0 140 40" preserveAspectRatio="xMidYMid" role="img" aria-label="Vimeo"><title>Vimeo</title><g><path class="fill logo-v" d="M31.277 18.832c-.14 3.052-2.27 7.229-6.39 12.531-4.259 5.536-7.863 8.306-10.811 8.306-1.825 0-3.371-1.687-4.633-5.059l-2.529-9.275c-.938-3.372-1.943-5.06-3.019-5.06-.234 0-1.054.494-2.458 1.477l-1.474-1.901c1.546-1.358 3.071-2.717 4.572-4.078 2.062-1.783 3.609-2.72 4.642-2.814 2.438-.234 3.938 1.433 4.502 5.001.608 3.851 1.03 6.246 1.266 7.182.704 3.195 1.476 4.791 2.321 4.791.657 0 1.641-1.037 2.954-3.108 1.312-2.072 2.015-3.649 2.109-4.732.188-1.789-.516-2.686-2.109-2.686-.75 0-1.522.173-2.318.514 1.54-5.044 4.481-7.495 8.823-7.355 3.22.095 4.737 2.184 4.552 6.266z"/><path class="fill logo-i" d="M50.613 28.713c-1.313 2.484-3.119 4.733-5.417 6.748-3.143 2.718-6.285 4.076-9.425 4.076-1.456 0-2.57-.469-3.343-1.406-.773-.938-1.137-2.153-1.09-3.653.045-1.548.526-3.938 1.441-7.173.914-3.232 1.373-4.967 1.373-5.201 0-1.218-.423-1.828-1.266-1.828-.282 0-1.079.494-2.393 1.477l-1.618-1.901c1.501-1.358 3.001-2.717 4.502-4.078 2.017-1.783 3.518-2.72 4.504-2.814 1.546-.14 2.684.314 3.411 1.367.726 1.052.996 2.417.81 4.098-.61 2.852-1.268 6.472-1.972 10.864-.046 2.01.681 3.014 2.182 3.014.656 0 1.827-.693 3.518-2.083 1.406-1.156 2.555-2.243 3.447-3.262l1.336 1.755zm-6.12-25.016c-.047 1.168-.633 2.288-1.76 3.361-1.266 1.212-2.767 1.82-4.501 1.82-2.672 0-3.963-1.166-3.869-3.499.045-1.213.76-2.381 2.144-3.501 1.384-1.119 2.919-1.68 4.609-1.68.984 0 1.805.387 2.462 1.155.656.772.961 1.553.915 2.344z"/><path class="fill logo-m" d="M94.543 28.713c-1.314 2.484-3.117 4.733-5.416 6.748-3.145 2.718-6.285 4.076-9.426 4.076-3.051 0-4.527-1.687-4.432-5.06.045-1.501.338-3.306.877-5.415.539-2.108.832-3.748.879-4.921.049-1.779-.492-2.673-1.623-2.673-1.223 0-2.682 1.456-4.375 4.362-1.788 3.05-2.754 6.003-2.894 8.861-.095 2.02.103 3.568.592 4.645-3.272.096-5.565-.444-6.873-1.617-1.171-1.032-1.708-2.742-1.614-5.135.045-1.501.276-3.001.69-4.502.414-1.5.644-2.837.69-4.011.095-1.734-.54-2.604-1.9-2.604-1.177 0-2.444 1.339-3.806 4.011-1.361 2.673-2.113 5.465-2.253 8.371-.094 2.627.074 4.456.503 5.486-3.219.096-5.505-.582-6.857-2.035-1.122-1.214-1.634-3.06-1.539-5.54.044-1.214.258-2.911.645-5.084.386-2.175.603-3.87.647-5.087.093-.841-.119-1.263-.633-1.263-.281 0-1.079.475-2.393 1.424l-1.687-1.901c.234-.184 1.71-1.545 4.432-4.078 1.969-1.828 3.306-2.766 4.009-2.812 1.219-.095 2.204.409 2.954 1.511s1.126 2.38 1.126 3.834c0 .469-.047.915-.14 1.336.703-1.077 1.523-2.017 2.463-2.814 2.156-1.874 4.572-2.931 7.245-3.166 2.298-.187 3.938.352 4.925 1.617.795 1.033 1.17 2.511 1.125 4.433.329-.28.681-.586 1.056-.915 1.078-1.267 2.133-2.273 3.164-3.023 1.736-1.267 3.541-1.97 5.418-2.112 2.25-.187 3.867.35 4.852 1.611.844 1.028 1.219 2.5 1.127 4.415-.047 1.309-.363 3.213-.949 5.712-.588 2.501-.879 3.936-.879 4.31-.049.982.047 1.659.279 2.034.236.373.797.559 1.689.559.656 0 1.826-.693 3.518-2.083 1.406-1.156 2.555-2.243 3.447-3.262l1.337 1.757z"/><path class="fill logo-e" d="M120.922 28.642c-1.361 2.249-4.033 4.495-8.02 6.743-4.971 2.856-10.012 4.284-15.125 4.284-3.797 0-6.52-1.267-8.16-3.797-1.172-1.735-1.734-3.797-1.688-6.189.045-3.797 1.736-7.407 5.064-10.832 3.658-3.75 7.973-5.627 12.945-5.627 4.596 0 7.033 1.873 7.314 5.615.188 2.384-1.125 4.842-3.938 7.368-3.004 2.76-6.781 4.515-11.328 5.263.842 1.169 2.109 1.752 3.799 1.752 3.375 0 7.059-.855 11.045-2.574 2.859-1.207 5.111-2.461 6.754-3.76l1.338 1.754zm-15.969-7.345c.045-1.259-.469-1.89-1.547-1.89-1.406 0-2.83.969-4.283 2.906-1.451 1.936-2.201 3.789-2.248 5.562-.025 0-.025.305 0 .911 2.295-.839 4.287-2.122 5.971-3.849 1.357-1.491 2.06-2.707 2.107-3.64z"/><path class="fill logo-o" d="M140.018 23.926c-.189 4.31-1.781 8.031-4.783 11.169-3.002 3.137-6.73 4.706-11.186 4.706-3.705 0-6.52-1.195-8.441-3.585-1.404-1.777-2.182-4.001-2.32-6.668-.236-4.029 1.217-7.729 4.361-11.101 3.377-3.746 7.619-5.618 12.732-5.618 3.281 0 5.766 1.102 7.457 3.301 1.594 2.015 2.32 4.614 2.18 7.796zm-7.95-.264c.047-1.269-.129-2.434-.527-3.49-.4-1.057-.975-1.587-1.725-1.587-2.391 0-4.361 1.293-5.906 3.877-1.316 2.115-2.02 4.371-2.111 6.766-.049 1.176.164 2.21.633 3.104.514 1.032 1.242 1.549 2.182 1.549 2.109 0 3.914-1.244 5.416-3.735 1.267-2.068 1.945-4.23 2.038-6.484z"/></g></svg>';
                    return t
                }, t.templates.outer = function(e) {
                    var t = '<div class="video-wrapper"><div class="video"><div class="flideo"></div></div></div><div class="target"></div><div class="captions with-controls hidden" hidden aria-live="assertive"><span></span></div><div class="outro-wrapper hidden" hidden><div class="outro" role="dialog" aria-live="assertive"></div></div><div class="controls-wrapper"><div class="title" role="contentinfo"></div><div class="controls"></div><div class="sidedock';
                    return e.showSidedock || (t += " hidden"), t += '" role="toolbar"', e.showSidedock || (t += " hidden"), t += '></div></div><div class="overlay-wrapper hidden" hidden><div class="overlay-cell"><div class="overlay" role="dialog" aria-live="assertive"></div><div class="overlay-icon-wrapper hidden"><div class="overlay-icon"></div></div><div class="overlay-logo logo"></div></div><nav><button class="back cloaked" aria-label="Back">', t += this.render("icon_back") || "", t += '</button><button class="close" aria-label="Close overlay">', t += this.render("icon_close") || "", t += '</button></nav></div><div class="notification-wrapper hidden" hidden><div class="notification-cell"><div class="notification" role="dialog" aria-live="assertive"></div></div></div>'
                }, t.templates.outro_image = function(e) {
                    var t = "<div> ";
                    return e.url && (t += '<a href="' + e.url + '" target="_blank">'), t += '<img src="' + e.svg_url + '" class="outro-image">', e.url && (t += "</a>"), t += "</div>"
                }, t.templates.outro_link = function(e) {
                    var t = '<h1><a href="' + e.url + '" target="_blank">';
                    return t += this.escape(e.text ? e.text : e.url) || "", t += "</a></h1>"
                }, t.templates.outro_text = function(e) {
                    var t = '<div class="text-wrapper"><div class="text">' + e.text + "</div></div>";
                    return t
                }, t.templates.outro_videos = function(e) {
                    for (var t = "", n = 0, o = e.contexts.length; o > n; n++) {
                        t += "";
                        var i = e.contexts[n];
                        t += '<div class="video-section', i.promoted && (t += " promoted"), t += '" data-videos="' + i.videos.length + '"><div><h1>' + i.context + '</h1><ul class="videos"> ';
                        for (var r = 0, a = i.videos.length; a > r; r++)
                            t += ' <li><a href="' + i.videos[r].url + '"', e.target && (t += ' target="_blank"'), t += " title=\"'", t += this.escape(i.videos[r].title) || "", t += "'", i.videos[r].owner.id !== e.owner && (t += " from ", t += this.escape(i.videos[r].owner.name) || ""), t += '" data-video-id="' + i.videos[r].id + '"><div class="img-wrapper"><img src="' + i.videos[r].thumbnail + '" alt="" width="295" height="166"></div><div class="header-wrapper"><header><h1>', t += this.escape(i.videos[r].title) || "", t += "</h1> ", i.videos[r].owner.id !== e.owner && (t += " <h2><span>from</span>&nbsp;", t += this.escape(i.videos[r].owner.name) || "", t += "</h2> "), t += " </header></div></a> ";
                        t += " </ul></div></div>"
                    }
                    return t += ""
                }, t.templates.outro_vod = function(e) {
                    var t = '<div class="vod-wrapper"><h1 class="vod-header"><a href="' + e.url + '" target="_blank">';
                    if (t += this.escape(e.title) || "", t += "</a></h1> ", e.purchased)
                        t += ' <a class="vod-watch-button" role="button" href="' + e.url + '" target="_blank">', t += e.preorder ? "Watch on " + e.preorder : "Watch Now", t += "</a> ";
                    else {
                        t += ' <ul class="vod"> ';
                        for (var n = 0, o = e.buttons.length; o > n; n++)
                            t += ' <li><a class="vod-button ' + e.buttons[n].type + '" role="button" href="' + e.url + "#buy=" + e.buttons[n].product_id + '" target="_blank" data-product-id="' + e.buttons[n].product_id + '" role="button"><div class="icon"> ', t += "buy" === e.buttons[n].type ? this.render("icon_download") || "" : this.render("icon_vod") || "", t += " </div><p>" + e.buttons[n].type.substr(0, 1).toUpperCase() + e.buttons[n].type.substr(1) + " " + e.buttons[n].price + "</p></a></li> ";
                        t += " </ul> ", e.preorder && (t += " <p>Preorder now. Watch on " + e.preorder + ".</p> ")
                    }
                    return t += "</div>"
                }, t.templates.password = function(e) {
                    var t = '<div class="window-wrapper password form"><h1>' + e.title + '</h1><p class="subtitle">' + e.subtitle + '</p><form action="' + e.action + '" method="post" novalidate><div class="validation-bubble hidden"><div class="validation-bubble-arrow-clipper"><div class="validation-bubble-arrow"></div></div><div class="validation-bubble-message"></div></div><input type="password" name="password" placeholder="Password" required aria-required="true" aria-label="Password"><input type="submit" value="Watch Video"></form></div>';
                    return t
                }, t.templates.private_locked = function(e) {
                    var t = '<div class="window-wrapper login"><h1>' + e.title + '</h1><p class="subtitle">' + e.subtitle + '</p><a href="' + e.action + '" class="popup" target="_blank" role="button" aria-label="Log in (opens in a new window)">Log in</a></div>';
                    return t
                }, t.templates.private_unlocked = function(e) {
                    var t = '<div class="window-wrapper form unlocked"><h1>Private Video</h1><p class="subtitle">You are logged in and have permission to watch (congrats).</p><button>Watch Video</button></div>';
                    return t
                }, t.templates.share = function(e) {
                    var t = '<div class="share-wrapper"><section class="share-screen' + (e.embedOnly ? " cloaked" : "") + '"><h1>Share</h1><ul class="buttons"><li><a href="' + e.playerShareUrl + '/facebook" target="_blank" class="facebook" title="Share on Facebook" role="button" aria-label="Share on Facebook">';
                    return t += this.render("icon_facebook") || "", t += '</a><li><a href="' + e.playerShareUrl + '/twitter" target="_blank" class="twitter" title="Share on Twitter" role="button" aria-label="Share on Twitter">', t += this.render("icon_twitter") || "", t += '</a><li><a href="' + e.playerShareUrl + '/tumblr" target="_blank" class="tumblr" title="Share on Tumblr" role="button" aria-label="Share on Tumblr">', t += this.render("icon_tumblr") || "", t += "</a> ", e.url && (t += ' <li><a href="mailto:?subject=', t += encodeURIComponent("Check out 鈥�" + e.title + "鈥� by " + e.owner + " on Vimeo") || "", t += "&amp;body=", t += encodeURIComponent("Check out 鈥�" + e.title + "鈥� by " + e.owner + " on Vimeo.\n\nThe video is available for your viewing pleasure at " + e.shareUrl + "\n\nIf you like this video, make sure you share it, too!\n\nVimeo is filled with lots of amazing videos. See more at https://vimeo.com.") || "", t += '" class="email" title="Share via E-mail" role="button" aria-label="Share via E-Mail">', t += this.render("icon_mail") || "", t += "</a> "), t += " </ul> ", e.embed && (t += ' <ul class="buttons"><li><a href="' + e.url + '#share" target="_blank" class="embed" title="Get embed code" role="button" aria-label="Get embed code">', t += this.render("icon_embed") || "", t += "</a></li></ul> "), e.url && (t += ' <p class="footnote share"><a class="clip_url" href="' + e.url + '" target="_blank">' + e.shareUrl + "</a></p> "), t += " </section> ", e.embed && (t += ' <section class="embed-screen' + (e.embedOnly ? "" : " cloaked") + '"><div class="embed-wrapper"><h1>Embed</h1><p class="subtitle">Add this video to your site with the embed code below.</p><div class="embed-code form"><div><input type="text" name="embed_code" title="Embed code" value="' + e.embedCode + '" spellcheck="false" aria-readonly="true"', e.readOnly && (t += " readonly"), t += "></div> ", e.copyButton && (t += ' <button class="embed-copy" data-clipboard-text=\'' + e.embedCode + "'>Copy</button> "), t += " </div> ", e.customizeEmbed && (t += ' <p class="footnote"><a href="' + e.url + '#embed" target="_blank">Customize this embed</a> on Vimeo</p> '), t += " </div></section> "), t += "</div>"
                }, t.templates.sidedock = function(e) {
                    var t = "";
                    return e.vodButton && (t += ' <div class="box" data-vod-preorder="' + e.vodPreorder + '" data-vod-expiring="' + e.expiring + '" data-vod-purchased="' + e.purchased + '"><label class="rounded-box vod-label visible', e.expiring && (t += " expiring"), t += '" role="presentation"><span>' + e.vodLabel + '</span></label><button class="vod-button rounded-box', e.purchased && (t += " on"), t += '"> ', t += this.render("icon_vod") || "", t += " </button></div>"), e.likeButton && (t += ' <div class="box"><label class="rounded-box hidden like-label" role="presentation"><span>', t += e.liked ? "Unlike" : "Like", t += '</span></label><button class="like-button rounded-box', e.liked && (t += " on"), t += '" aria-label="', t += e.liked ? "Unlike" : "Like", e.loggedIn || (t += " (opens in a new window)"), t += '" data-label-add="Like" data-label-add-logged-out="Like (opens in a new window)" data-label-remove="Unlike"> ', t += this.render("icon_heart") || "", t += " </button></div>"), e.watchLaterButton && (t += ' <div class="box"><label class="rounded-box hidden watch-later-label" role="presentation"><span>', t += e.addedToWatchLater ? "Remove from" : "Add to", t += ' Watch Later</span></label><button class="watch-later-button rounded-box', e.addedToWatchLater && (t += " on"), t += '" aria-label="', t += e.addedToWatchLater ? "Remove from" : "Add to", t += " Watch Later", e.loggedIn || (t += " (opens in a new window)"), t += '" data-label-add="Add to Watch Later" data-label-add-logged-out="Add to Watch Later (opens in a new window)" data-label-remove="Remove from Watch Later"> ', t += this.render("icon_clock") || "", t += " </button></div>"), e.shareButton && (t += ' <div class="box"><label class="rounded-box hidden share-label" role="presentation"><span>' + e.shareButtonLabel + '</span></label><button class="share-button rounded-box" aria-label="' + e.shareButtonLabel + '"> ', t += this.render("icon_share") || "", t += " </button></div>"), e.collectionsButton && (t += ' <div class="box"><label class="rounded-box hidden collections-label" role="presentation"><span>Add to Collections</span></label><button class="collections-button rounded-box" aria-label="Add to Collections"> ', t += this.render("icon_collections") || "", t += " </button></div>"), e.tipJarButton && (t += ' <div class="box"><label class="rounded-box hidden tip-jar-label" role="presentation"><span>Tip this video</span></label><button class="tip-jar-button rounded-box" aria-label="Tip this video"> ', t += this.render("icon_tipjar") || "", t += " </button></div>"), t += ""
                }, t.templates.title = function(e) {
                    var t = "<header> ";
                    return e.badge && (t += ' <div class="badge"><a href="' + e.badge.link + '"', e.targetBlank && (t += ' target="_blank"'), t += '><img src="' + e.badge.img + '"', e.badge.offset && (t += ' style="margin-top:' + e.badge.offset.y + "px;margin-left:" + e.badge.offset.x + 'px"'), t += ' width="' + e.badge.width + '" height="' + e.badge.height + '" alt="' + e.badge.name + ' Badge"></a></div> '), e.showPortrait && (t += ' <div class="portrait" aria-hidden="true"> ', e.linkToOwner && (t += '<a tabindex="-1" href="' + e.ownerLink + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <img src="' + e.portraitImg + '" alt="Portrait image for ', t += this.escape(e.owner) || "", t += '" width="60" height="60"> ', e.linkToOwner && (t += "</a>"), t += " </div> "), t += ' <div class="headers"> ', e.showTitle && (t += " <h1> ", e.showTitleLink && (t += '<a href="' + e.titleLink + '"', e.targetBlank && (t += ' target="_blank"'), t += " data-clip-link>"), t += this.escape(e.title) || "", e.showTitleLink && (t += "</a>"), t += " </h1> "), e.showByline && (t += " <h2> from ", e.linkToOwner ? (t += '<a href="' + e.ownerLink + '"', e.targetBlank && (t += ' target="_blank"'), t += ">") : t += '<span class="user">', t += this.escape(e.owner) || "", t += e.linkToOwner ? "</a>" : "</span>", e.bylineBadge && (t += "&nbsp; ", e.bylineBadge.link && (t += '<a tabindex="-1" href="' + e.bylineBadge.link + '"', e.targetBlank && (t += ' target="_blank"'), t += ">"), t += ' <span class="byline-badge ' + e.bylineBadge.cssClass + '">' + e.bylineBadge.cssClass + "</span> ", e.bylineBadge.link && (t += "</a>")), t += " </h2> "), t += " </div></header>"
                }, "undefined" != typeof e && e.exports ? e.exports = t : window.Aftershave = t
            }()
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o;
        !function(i) {
            "use strict";
            var r = {make: function(e) {
                    e = e || {};
                    var t = {};
                    return e.on = function(n, o) {
                        n = [].concat(n);
                        for (var i = 0, r = n.length; r > i; i++) {
                            var a = n[i];
                            if (!a)
                                throw new Error("Tried to listen for an undefined event.");
                            t[a] || (t[a] = []), t[a].push(o)
                        }
                        return e
                    }, e.once = function(t, n) {
                        function o() {
                            n.apply(e.off(t, o), arguments)
                        }
                        return o.handler = n, e.on(t, o)
                    }, e.off = function(n, o) {
                        n = [].concat(n);
                        for (var i = 0, r = n.length; r > i; i++) {
                            var a = n[i];
                            if (!a)
                                throw new Error("Tried to remove an undefined event.");
                            if (a in t) {
                                var s = t[a].indexOf(o);
                                if (-1 === s) {
                                    for (var l = 0, d = t[a].length; d > l; l++)
                                        if (t[a][l].handler === o) {
                                            s = i;
                                            break
                                        }
                                    if (-1 === s)
                                        return e
                                }
                                t[a].splice(s, 1)
                            }
                        }
                        return e
                    }, e.fire = function(n) {
                        if (!n)
                            throw new Error("Tried to fire an undefined event.");
                        if (n in t)
                            for (var o = t[n].slice(0), i = 0, r = o.length; r > i; i++)
                                o[i].apply(e, o.slice.call(arguments, 1));
                        return e
                    }, e
                }};
            o = function() {
                return r
            }.call(t, n, t, e), !(void 0 !== o && (e.exports = o))
        }(this)
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(4)], i = function(e, t, n) {
            "use strict";
            function o(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            var i = o(n), r = function(e, t, n, o) {
                var r = !1;
                o = "function" == typeof t ? n : o, n = "function" == typeof t ? t : n, t = "function" == typeof t ? null : t;
                var a = function(e) {
                    var t = !0;
                    if (e.changedTouches) {
                        var i = e.changedTouches[0].pageX - window.pageXOffset, a = e.changedTouches[0].pageY - window.pageYOffset, s = document.elementFromPoint(i, a);
                        null !== s && this.contains(s) && (t = n.call(this, e))
                    }
                    return"function" == typeof o && o.call(this, e), r = !0, t
                }, s = function(e) {
                    return r ? void(r = !1) : n.call(this, e)
                };
                return t ? void i["default"](e).on("click", t, s).on("touchend", t, a) : void i["default"](e).on("click", s).on("touchend", a)
            };
            t.exports = r
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t], i = function(e) {
            "use strict";
            !function() {
                for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
                    var n = e[t];
                    window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]
                }
                !/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) && window.requestAnimationFrame && window.cancelAnimationFrame || (window.requestAnimationFrame = function(e) {
                    return setTimeout(e, 0)
                }, window.cancelAnimationFrame = clearTimeout)
            }(), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (t in this && this[t] === e)
                        return t;
                return-1
            })
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(6), n(3), n(2), n(1)], i = function(e, t, n, o, i, r) {
            "use strict";
            function a(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function s(e, t, n) {
                function o(e, t) {
                    this.message = t;
                    try {
                        c({event: "error", data: {message: t, code: e}})
                    } catch (n) {
                    }
                }
                function a() {
                    if (e.view === r.View.privateLocked)
                        throw new o("private_video", "The video is private.");
                    if (e.view === r.View.privatePassword)
                        throw new o("password_video", "The video is password-protected. The viewer must enter the password first.")
                }
                function s(e) {
                    if (!e || "" === e)
                        return{};
                    if ("object" == typeof e)
                        return e;
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        var n = {};
                        return e.split("&").forEach(function(e) {
                            try {
                                var t = e.split("="), o = decodeURIComponent(t[0]), i = decodeURIComponent(t[1]);
                                if ("id" === o)
                                    return;
                                "params" === o && (o = "value"), i = i.split(",")[0], n[o] = i
                            } catch (r) {
                            }
                        }), n
                    }
                }
                function u(e) {
                    var t = e.event;
                    for (var n in M)
                        if (M[n] === e.event) {
                            t = n;
                            break
                        }
                    switch (t) {
                        case"onSeek":
                        case"onProgress":
                            delete e.data.percent, delete e.data.duration;
                            break;
                        case"onLoading":
                            delete e.data.seconds, delete e.data.duration
                    }
                    var o = "method=" + encodeURIComponent(t || e.method);
                    o += "&params=";
                    var i = [];
                    if (void 0 !== e.value)
                        i.push(encodeURIComponent(e.value));
                    else if ("object" == typeof e.data)
                        for (var r in e.data)
                            i.push(encodeURIComponent(e.data[r]));
                    else
                        void 0 !== e.data && i.push(encodeURIComponent(e.data));
                    return e.player_id && i.push(e.player_id), o += i.join(",")
                }
                function c(t) {
                    if ((!t.event || (_.fire(t.event, t.data), k[t.event])) && L) {
                        var n = "";
                        if (e.embed.player_id && (t.player_id = e.embed.player_id), 1 === e.embed.api)
                            n = u(t);
                        else
                            try {
                                n = JSON.stringify(t)
                            } catch (o) {
                            }
                        if (window.parent != window)
                            try {
                                window.parent.postMessage(n, w)
                            } catch (i) {
                            }
                    }
                }
                function f(t) {
                    if (!t || "_" === t.substr(0, 1))
                        return null;
                    switch (1 === e.embed.api && (t = t.replace("api_", "")), t) {
                        case"changeColor":
                            return q.color.set;
                        case"paused":
                            return q.paused.get;
                        case"seekTo":
                            return q.currentTime.set
                    }
                    if ("function" == typeof q[t])
                        return q[t];
                    var n = t.substr(0, 3), o = t.substr(3, 1).toLowerCase() + t.substr(4);
                    return q[o] && q[o][n] ? q[o][n] : null
                }
                function v(e) {
                    var t = document.referrer || window.location.origin || window.location.href;
                    if (0 === t.indexOf(e.origin)) {
                        var n = s(e.data), o = n.method, i = n.value, r = f(o);
                        if (r) {
                            var a = r.call(e, i);
                            void 0 !== a && "" !== a && c({method: o, value: a})
                        }
                    }
                }
                function p() {
                    if (C && P) {
                        try {
                            switch (P) {
                                case"not-supported":
                                    throw new o("not_supported", "This video is not supported in this browser.");
                                case"no-files":
                                    throw new o("file_error", "There was an error loading the files for this video.");
                                default:
                                    throw new o("playback", "An error occurred during playback.")
                            }
                        } catch (e) {
                        }
                        P = null
                    }
                }
                function h() {
                    window.addEventListener ? window.addEventListener("message", v, !1) : window.attachEvent("onmessage", v)
                }
                function m() {
                    t.on(r.Events.played, function() {
                        T || (T = !0, c({event: "play"}))
                    }), t.on(r.Events.paused, function() {
                        T = !1, c({event: "pause"})
                    }), t.on(r.Events.ended, function() {
                        T = !1, c({event: "finish"})
                    }), t.on(r.Events.playProgress, function(e, t, n) {
                        c({event: "playProgress", data: {seconds: i.round(e), percent: i.round(n), duration: i.round(t)}})
                    }), t.on(r.Events.loadProgress, function(e, t, n) {
                        c({event: "loadProgress", data: {bytesLoaded: -1, bytesTotal: -1, percent: i.round(n), duration: i.round(t), seconds: i.round(e)}})
                    }), t.on(r.Events.seeked, function(e, t, n) {
                        c({event: "seek", data: {seconds: i.round(e), percent: i.round(n), duration: i.round(t)}})
                    }), t.on(r.Events.error, function(e) {
                        P = e, p()
                    }), t.on(r.Events.cueChanged, function(e, t) {
                        var n = null, o = null;
                        if (e) {
                            var i = e.split(".");
                            n = i[0], o = i[1]
                        }
                        c({event: "cuechange", data: {language: n, kind: o, cues: t}})
                    })
                }
                function g() {
                    t.on(r.Control.reset, function() {
                        P = null, A = !1
                    })
                }
                function b() {
                    t.on(r.Events.configChanged, function(n) {
                        e = n, x && setTimeout(function() {
                            var e = !0;
                            t.fire(r.Control.changeVolume, x, e)
                        }, 0)
                    })
                }
                var w = document.referrer || e.request.referrer;
                try {
                    w = decodeURIComponent(w)
                } catch (y) {
                    w = unescape(w)
                }
                var E, k = {ready: !0, error: !0}, _ = l["default"].make(), L = !(!window.postMessage || !window.parent.postMessage), x = null, C = !1, T = !1, P = null, A = !1, S = ["play", "pause", "finish", "playProgress", "loadProgress", "seek", "cuechange"], M = {onFinish: "finish", onLoading: "loadProgress", onLoad: "ready", onProgress: "playProgress", onPlay: "play", onPause: "pause", onSeek: "seek"};
                o.prototype = new Error;
                var q = {fireEvent: function(e) {
                        t.fire.apply(null, [].concat(e))
                    }, addEventListener: function(e, t) {
                        if (e in M && (e = M[e]), S.indexOf(e) < 0)
                            throw new o("invalid_event", '"' + e + '" is not a valid event. Valid events are: ' + S.join(", ") + ".");
                        t ? _.on(e, t) : k[e] = !0
                    }, removeEventListener: function(e, t) {
                        t ? _.off(e, t) : k[e] = !1
                    }, play: function() {
                        a();
                        var e = "[object MessageEvent]" === Object.prototype.toString.call(this);
                        if (e && "undefined" != typeof d["default"] && (d["default"].iPhone || d["default"].iPad || d["default"].iPod) && !A)
                            throw new o("play", "The viewer must initiate playback first.");
                        var n = !0;
                        t.fire(r.Events.playButtonPressed, n)
                    }, pause: function() {
                        a(), t.fire(r.Events.pauseButtonPressed)
                    }, loadVideo: function(n, i) {
                        if (!e.embed.on_site && isNaN(n))
                            throw new o("invalid_video", "The video id must be a number.");
                        t.fire(r.Control.loadVideo, n, i)
                    }, unload: function() {
                        (e.view === r.View.main || e.view === r.View.privateUnlocked) && t.fire(r.Control.reset)
                    }, _setEmbedSetting: function(n, o) {
                        e.embed.on_site && (n in e.embed.settings || "custom_logo" === n) && (o = "object" == typeof o ? o : Number(o), "badge" === n && (o ? o = E : E = e.embed.settings.badge), e.embed.settings[n] = o, t.fire(r.Events.embedSettingChanged, n, o), t.fire(r.Events.configChanged, e))
                    }, color: {get: function() {
                            return e.embed.color.replace("#", "")
                        }, set: function(i) {
                            if (e.embed.settings.color && !e.embed.on_site)
                                throw new o("color_locked", "The creator of the video has chosen to always use " + e.embed.color + ".");
                            i = (i + "").replace("#", "");
                            var a = "string" == typeof i && (3 === i.length || 6 === i.length) && !isNaN(parseInt(i, 16));
                            if (!a)
                                throw new o("invalid_color", "The color should be 3- or 6-digit hex value.");
                            if ("undefined" == typeof n)
                                return void t.fire(r.Control.changeColor, i);
                            try {
                                var s = new n(i);
                                t.fire(r.Control.changeColor, s.hex);
                                var l = new n(23, 35, 34, .75).contrast(s).ratio;
                                if (3 > l)
                                    throw new o("color_contrast", "Specified color does not meet minimum contrast ratio. We recommend using brighter colors. See WCAG 2.0 guidelines: http://www.w3.org/TR/WCAG/#visual-audio-contrast")
                            } catch (d) {
                            }
                        }}, currentTime: {get: function() {
                            return e._video && e._video.currentTime > .1 ? i.round(e._video.currentTime) : 0
                        }, set: function(n) {
                            if (n = parseFloat(n), isNaN(n) || 0 > n || n > e.video.duration)
                                throw new o("invalid_time", "Seconds must be a positive float less than the duration of the video (" + e.video.duration + ").");
                            var i = "[object MessageEvent]" === Object.prototype.toString.call(this);
                            if (i && "undefined" != typeof d["default"] && (d["default"].iPhone || d["default"].iPad || d["default"].iPod) && !A)
                                throw new o("play", "The viewer must initiate playback first.");
                            t.fire(r.Control.seek, null, n), t.fire(r.Events.mousedOver)
                        }}, duration: {get: function() {
                            return i.round(e.video.duration)
                        }}, loop: {get: function() {
                            return!!e.embed.loop
                        }, set: function(e) {
                            t.fire(r.Control.changeLoop, e)
                        }}, paused: {get: function() {
                            return e._video && "paused"in e._video ? !!e._video.paused : !0
                        }}, videoEmbedCode: {get: function() {
                            return e.video.embed_code
                        }}, videoHeight: {get: function() {
                            return e.video.video_height || e.video.height
                        }}, videoId: {get: function() {
                            return e.video.id
                        }}, videoTitle: {get: function() {
                            return e.video.title
                        }}, videoWidth: {get: function() {
                            return e.video.video_width || e.video.width
                        }}, videoUrl: {get: function() {
                            return e.video.url
                        }}, volume: {get: function() {
                            var t = i.round(e.request.cookie.volume);
                            return 1 === e.embed.api ? Math.round(100 * t) : t
                        }, set: function(n) {
                            if (n = parseFloat(n), 1 === e.embed.api && (n /= 100), isNaN(n) || 0 > n || n > 1)
                                throw new o("invalid_volume", "Volume should be a float between 0 and 1.");
                            x = n;
                            var i = !0;
                            t.fire(r.Control.changeVolume, n, i)
                        }}};
                return t.on(r.Events.playInitiated, function() {
                    A = !0
                }), h(), m(), g(), b(), t.fire(r.Events.apiModuleReady), t.on(r.Events.ready, function() {
                    C = !0, c({event: "ready"}), p()
                }), q
            }
            var l = a(n), d = a(o);
            t.exports = s
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(2), n(1)], i = function(e, t, n, o) {
            "use strict";
            function i(e, t) {
                function i() {
                    t.on(o.Control.openPopup, function(i, r) {
                        var a = "//" + e.player_url, s = a + "/video/" + e.video.id, d = 670, u = 545;
                        switch (i) {
                            case"login-like":
                                l = n.openWindow(s + "/login/like", "login", {width: d, height: u}), t.fire(o.Events.popupOpened, i);
                                break;
                            case"login-watch-later":
                                l = n.openWindow(s + "/login/watch-later", "login", {width: d, height: u}), t.fire(o.Events.popupOpened, i);
                                break;
                            case"login-private-locked":
                                l = n.openWindow(s + "/login/private", "login", {width: d, height: u}), t.fire(o.Events.popupOpened, i);
                                break;
                            case"purchase":
                                var c = a + "/video/" + (e.video.vod.feature_id || e.video.id) + "/purchase/vod";
                                r && r.productId && (c += "/" + r.productId), c += "?referrer=" + encodeURIComponent(e.request.referrer), l = n.openWindow(c, "purchase", {width: 790, height: 670}), t.fire(o.Events.popupOpened, i);
                                break;
                            case"tip-jar":
                                var f = a + "/video/" + e.video.id + "/purchase/tipjar?referrer=" + encodeURIComponent(e.request.referrer);
                                l = n.openWindow(f, "tip-jar", {width: 790, height: 670}), t.fire(o.Events.popupOpened, i)
                        }
                    }), window.closePopup = function() {
                        if (l) {
                            try {
                                l.close()
                            } catch (e) {
                            }
                            l = null
                        }
                    }
                }
                function r() {
                    e.embed.on_site || (window.confirmPurchase = function(e, n, i) {
                        return n ? t.fire(o.Control.loadVideo, e) : void(i && t.fire(o.Events.playButtonPressed))
                    })
                }
                function a() {
                    e.embed.on_site || (window.confirmTipJar = function(e) {
                        t.fire(o.Events.tipped)
                    })
                }
                function s() {
                    e.embed.on_site || (window.confirmLoginAction = function(e, n) {
                        t.fire(o.Events.userLogIn, n)
                    })
                }
                var l = null;
                return i(), r(), a(), s(), {}
            }
            t.exports = i
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        (function(t) {
            e.exports = t.BigScreen = n(14)
        }).call(t, function() {
            return this
        }())
    }, function(e, t, n) {
        var o, i;
        o = [t, e], i = function(e, t) {
            "use strict";
            function n(e) {
                return e = e.replace("#", ""), "string" == typeof e && (3 === e.length || 6 === e.length) && !isNaN(parseInt(e, 16))
            }
            function o(e) {
                var t = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*([\d\.]+))?\)/.exec(e);
                if (!t)
                    throw new Error("Invalid rgb value");
                return{red: parseInt(t[1], 10), green: parseInt(t[2], 10), blue: parseInt(t[3], 10), alpha: parseFloat(t[5]) || 1}
            }
            function i() {
                var e = arguments;
                if (1 === e.length && e[0]instanceof i) {
                    var t = e[0];
                    return this.red = t.red, this.green = t.green, this.blue = t.blue, this.alpha = t.alpha, this.hue = t.hue, this.saturation = t.saturation, this.lightness = t.lightness, this
                }
                if (1 === e.length) {
                    if ("string" == typeof e[0] && e[0].indexOf("rgb") >= 0)
                        return this.rgba = o(e[0]), this;
                    if (!n(e[0] + ""))
                        throw new Error("Invalid hex value");
                    return this.hex = e[0], this
                }
                if (3 === e.length || 4 === e.length) {
                    for (var r = 0; 3 > r; r++)
                        if (isNaN(parseInt(e[r], 10)) || parseInt(e[r], 10) < 0 || parseInt(e[r], 10) > 255)
                            throw new Error("Invalid rgb value");
                    if (e[3] && parseFloat(e[3]) < 0 || parseFloat(e[3]) > 1)
                        throw new Error("Invalid alpha value");
                    return this.rgba = {red: e[0], green: e[1], blue: e[2], alpha: parseFloat(e[3]) || 1}, this
                }
                throw new Error("Invalid color")
            }
            i.prototype = Object.defineProperties({clone: function() {
                    return new i(this)
                }, lighten: function(e, t, n) {
                    if (this.hsl = {hue: this.hue, saturation: this.saturation, lightness: this.lightness + e}, t && n)
                        for (var o = n.contrast(this).ratio; t > o && (this.lighten(5), o = n.contrast(this).ratio, !(this.lightness >= 100)); )
                            ;
                    return this
                }, darken: function(e, t, n) {
                    if (this.hsl = {hue: this.hue, saturation: this.saturation, lightness: this.lightness - e}, t && n)
                        for (var o = n.contrast(this).ratio; t > o && (this.darken(5), o = n.contrast(this).ratio, !(this.lightness <= 0)); )
                            ;
                    return this
                }, overlayOn: function(e) {
                    if (this.alpha >= 1)
                        return this;
                    var t = this.clone();
                    return t.rgba = {red: t.red * this.alpha + e.red * e.alpha * (1 - this.alpha), green: t.green * this.alpha + e.green * e.alpha * (1 - this.alpha), blue: t.blue * this.alpha + e.blue * e.alpha * (1 - this.alpha), alpha: t.alpha + e.alpha * (1 - this.alpha)}, t
                }, contrast: function(e) {
                    var t = this.alpha;
                    if (t >= 1) {
                        e.alpha < 1 && (e = e.overlayOn(this));
                        var n = this.luminance + .05, o = e.luminance + .05, r = n / o;
                        return o > n && (r = 1 / r), r = Math.round(10 * r) / 10, {ratio: r, error: 0, min: r, max: r}
                    }
                    var a = this.overlayOn(i.white).contrast(e).ratio, s = this.overlayOn(i.black).contrast(e).ratio, l = Math.max(a, s), d = {red: Math.min(Math.max(0, (e.red - this.red * t) / (1 - t)), 255), green: Math.min(Math.max(0, (e.green - this.green * t) / (1 - t)), 255), blue: Math.min(Math.max(0, (e.blue - this.blue * t) / (1 - t)), 255)}, u = this.clone();
                    u.rgb = d;
                    var c = this.overlayOn(u).contrast(e).ratio;
                    return{ratio: Math.round((c + l) / 2 * 10) / 10, error: Math.round((l - c) / 2 * 10) / 10, min: c, max: l, closest: u, farthest: s === l ? i.white : i.black}
                }, wcagAACompliant: function(e) {
                    return this.contrast(e).ratio >= 4.5
                }, wcagAAACompliant: function(e) {
                    return this.contrast(e).ratio >= 7
                }, yiqContrastColor: function() {
                    return this.yiq >= 120 ? new i(0, 0, 0) : new i(255, 255, 255)
                }}, {complement: {get: function() {
                        var e = this.clone();
                        return e.rgb = {red: 255 - this.red, green: 255 - this.green, blue: 255 - this.blue}, e
                    }, configurable: !0, enumerable: !0}, hex: {get: function() {
                        return i.rgbToHex(this.red, this.green, this.blue)
                    }, set: function(e) {
                        return this.rgba = i.hexToRgb(e), this
                    }, configurable: !0, enumerable: !0}, hsl: {get: function() {
                        return"hsl(" + this.hue + "," + this.saturation + "%," + Math.round(this.lightness) + "%)"
                    }, set: function(e) {
                        this.hue = e.hue, this.saturation = e.saturation, this.lightness = e.lightness;
                        var t = i.hslToRgb(e.hue, e.saturation, e.lightness);
                        return this.red = t.red, this.green = t.green, this.blue = t.blue, this.alpha = t.alpha, this
                    }, configurable: !0, enumerable: !0}, luminance: {get: function() {
                        function e(e) {
                            return.03928 >= e ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                        }
                        var t = e(this.red / 255), n = e(this.green / 255), o = e(this.blue / 255), i = .2126 * t + .7152 * n + .0722 * o;
                        return i
                    }, configurable: !0, enumerable: !0}, rgb: {get: function() {
                        return"rgb(" + this.red + "," + this.green + "," + this.blue + ")"
                    }, set: function(e) {
                        return this.rgba = e, this
                    }, configurable: !0, enumerable: !0}, rgba: {get: function() {
                        return"rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")"
                    }, set: function(e) {
                        this.red = e.red, this.green = e.green, this.blue = e.blue, this.alpha = e.alpha || 1;
                        var t = i.rgbToHsl(e.red, e.green, e.blue);
                        return this.hue = t.hue, this.saturation = t.saturation, this.lightness = t.lightness, this
                    }, configurable: !0, enumerable: !0}, yiq: {get: function() {
                        return(299 * this.red + 587 * this.green + 114 * this.blue) / 1e3
                    }, configurable: !0, enumerable: !0}}), i.hexToRgb = function(e) {
                var t;
                return e += "", 3 === e.length || 4 === e.length ? (t = /^#?([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/i.exec(e), t && (t[1] += t[1], t[2] += t[2], t[3] += t[3])) : t = /^#?([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$/i.exec(e), t ? {red: parseInt(t[1], 16), green: parseInt(t[2], 16), blue: parseInt(t[3], 16), alpha: 1} : null
            }, i.rgbToHex = function(e, t, n) {
                return"#" + ((1 << 24) + (Math.round(e) << 16) + (Math.round(t) << 8) + Math.round(n)).toString(16).slice(1)
            }, i.rgbToHsl = function(e, t, n) {
                e /= 255, t /= 255, n /= 255;
                var o = Math.max(e, t, n), i = Math.min(e, t, n), r = (o + i) / 2, a = r, s = r;
                if (o === i)
                    return{hue: 0, saturation: 0, lightness: 100 * s};
                var l = o - i;
                return a = s > .5 ? l / (2 - o - i) : l / (o + i), o === e ? r = (t - n) / l + (n > t ? 6 : 0) : o === t ? r = (n - e) / l + 2 : o === n && (r = (e - t) / l + 4), r /= 6, {hue: Math.round(360 * r), saturation: Math.round(100 * a), lightness: Math.round(100 * s)}
            }, i.hslToRgb = function(e, t, n) {
                function o(e, t, n) {
                    return 0 > n && (n += 1), n > 1 && (n -= 1), 1 > 6 * n ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + 6 * (t - e) * (2 / 3 - n) : e
                }
                if (e /= 360, t /= 100, n /= 100, 0 === t)
                    return{red: Math.floor(255 * n), green: Math.floor(255 * n), blue: Math.floor(255 * n)};
                var i = .5 > n ? n * (1 + t) : n + t - t * n, r = 2 * n - i;
                return{red: Math.floor(255 * o(r, i, e + 1 / 3)), green: Math.floor(255 * o(r, i, e)), blue: Math.floor(255 * o(r, i, e - 1 / 3))}
            }, i.hslToHex = function(e, t, n) {
                var o = i.hslToRgb(e, t, n);
                return i.rgbToHex(o.red, o.green, o.blue)
            }, i.white = new i("fff"), i.black = new i("000"), t.exports = i
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(6), n(3)], i = function(e, t, n, o) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function r(e, t, n) {
                if (!x) {
                    var o = new Error(t);
                    return o.code = e, o.name = n, o
                }
                return Object.create(DOMException.prototype, {code: {enumerable: !0, value: e}, message: {enumerable: !0, value: t}, name: {enumerable: !0, value: n}, toString: {value: function() {
                            return"Error: " + this.message
                        }}})
            }
            function a(e) {
                return x ? Object.create(MediaError.prototype, {code: {enumerable: !0, value: e}}) : {code: e, MEDIA_ERR_ABORTED: 1, MEDIA_ERR_DECODE: 3, MEDIA_ERR_NETWORK: 2, MEDIA_ERR_SRC_NOT_SUPPORTED: 4}
            }
            function s(e, t, n) {
                var o = function(e, t) {
                    if (!e || void 0 === e[t])
                        throw r("DOMException"in window ? DOMException.INDEX_SIZE_ERR : 1, "INDEX_SIZE_ERR: DOM Exception 1", "INDEX_SIZE_ERR");
                    return e[t]
                };
                if (!x)
                    return{length: e, start: function(e) {
                            return o(t, e)
                        }, end: function(e) {
                            return o(n, e)
                        }};
                var i = "object" == typeof TimeRanges ? TimeRanges.prototype : Object.prototype;
                return Object.create(i, {length: {enumerable: !0, value: e}, start: {value: function(e) {
                            return o(t, e)
                        }}, end: {value: function(e) {
                            return o(n, e)
                        }}})
            }
            function l(e) {
                return"undefined" == typeof TextTrackList ? Object.create(Object.prototype, {length: {enumerable: !0, value: e.length}, item: {enumerable: !0, value: function(t) {
                            return e[t]
                        }}}) : Object.create(TextTrackList.prototype, {length: {enumerable: !0, value: 0}})
            }
            function d(e, t) {
                return function() {
                    if (e.type === w.TYPE_FLASH && e.swf && e.swfLoaded) {
                        var n = "get" + t.charAt(0).toUpperCase() + t.slice(1);
                        return e.swf[n]()
                    }
                    return e.type === w.TYPE_HTML && e.video ? e.video[t] : t in e.propertyValues ? e.propertyValues[t] : w.properties[t].value
                }
            }
            function u(e, t) {
                return function(n) {
                    e.propertyValues[t] = n;
                    try {
                        if (e.type === w.TYPE_FLASH && e.swf && e.swfLoaded) {
                            var o = "set" + t.charAt(0).toUpperCase() + t.slice(1);
                            e.swf[o](n)
                        } else
                            e.type === w.TYPE_HTML && e.video && (e.video[t] = n)
                    } catch (i) {
                    }
                }
            }
            function c(e, t) {
                return function() {
                    return e.type === w.TYPE_FLASH ? e.swfLoaded ? e.swf["_" + t]() : e.queuedMethodCalls.push({method: t, args: arguments}) : e.type === w.TYPE_HTML ? e.video[t].apply(e.video, arguments) : void 0
                }
            }
            function f(e) {
                if (!e)
                    return null;
                var t = e.split("?")[0].split("."), n = t[t.length - 1];
                switch (n) {
                    case"mp4":
                    case"m3u8":
                        return"video/mp4";
                    case"web":
                    case"webm":
                        return"video/webm";
                    case"flv":
                        return"video/x-flv"
                }
                return null
            }
            function v(e) {
                var t = null;
                switch (e) {
                    case"video/mp4":
                        t = k && k.h264.baseline ? w.TYPE_HTML : w.TYPE_FLASH;
                        break;
                    case"video/webm":
                        t = k && k.webm ? w.TYPE_HTML : w.TYPE_FLASH;
                        break;
                    case"video/x-flv":
                        t = w.TYPE_FLASH
                }
                return t !== w.TYPE_FLASH || E["default"].flash.versionAtLeast(10, 1) ? t : null
            }
            function p(e, t, n) {
                for (var o = 0, i = w.events.length; i > o; o++)
                    e.addEventListener(w.events[o], t);
                for (var r = 0, a = n.length; a > r; r++)
                    e.appendChild(n[r])
            }
            function h(e, t) {
                var n = document.createElement("object");
                n.setAttribute("type", "application/x-shockwave-flash"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("data", t);
                var o = {flashvars: "ready=" + e + ".flashReady", movie: t, allowfullscreen: "true", allowscriptaccess: "always", bgcolor: "#000000", wmode: "opaque", quality: "high", scalemode: "noscale"};
                for (var i in o) {
                    var r = document.createElement("param");
                    r.setAttribute("name", i), r.setAttribute("value", o[i]), n.appendChild(r)
                }
                return n
            }
            function m(e, t, n, o) {
                var i = f(o), r = v(i);
                if (e.type = r, r === w.TYPE_HTML) {
                    for (var a = t.parentNode; a !== document && !a.classList.contains("js-player"); )
                        a = a.parentNode;
                    e.video || (e.video = a !== document ? a.querySelector("video") : null, e.video ? e.video.parentNode === a && a.removeChild(e.video) : e.video = document.createElement("video"), e.video.setAttribute("x-webkit-airplay", "allow"), p(e.video, e.eventCallback, e.textTracks), t.appendChild(e.video));
                    for (var s in e.propertyValues)
                        "currentTime" !== s && (e.video[s] = e.propertyValues[s]);
                    e.swf && b(e.swf), e.video.style.display = "", e.video.removeAttribute("hidden")
                } else
                    r === w.TYPE_FLASH ? (e.swf || (e.swf = h(e.global, n.swf), t.appendChild(e.swf)), e.video && g(e.video), e.swf.style.display = "", e.swf.removeAttribute("hidden"), e.swfLoaded && e.flashReady()) : (e.video && g(e.video), e.swf && b(e.swf));
                return r
            }
            function g(e) {
                e.style.display = "none", e.setAttribute("hidden", ""), e.pause(), e.src = ""
            }
            function b(e) {
                e.style.display = "none", e.setAttribute("hidden", "");
                try {
                    e._pause(), e.setSrc("")
                } catch (t) {
                }
            }
            function w(e, t) {
                if (!e)
                    throw new Error("You must pass a valid element");
                var n = this;
                n.uuid = Math.round(1e3 * Math.random() + (new Date).getTime()), n.global = "flideo_" + n.uuid, window[n.global] = n;
                var o = {};
                x || (o = document.createElement("flideo"), document.body.appendChild(o));
                var i = y["default"].make({});
                n.queuedMethodCalls = [], n.propertyValues = {}, n.textTracks = [];
                var r, f = ["webkitplaybacktargetavailabilitychanged", "webkitcurrentplaybacktargetiswirelesschanged"], v = {src: {enumerable: !0, get: d(n, "src"), set: function(o) {
                            n.propertyValues.src = o;
                            var r = m(n, e, t, o);
                            n.type = r, null === r && i.fire("error", {type: "error", target: {error: a(w.MEDIA_ERR_SRC_NOT_SUPPORTED)}})
                        }}, buffered: {enumerable: !0, get: function() {
                            if (n.type === w.TYPE_HTML && n.video)
                                return n.video.buffered;
                            if (n.type === w.TYPE_FLASH && n.swf && n.swfLoaded) {
                                var e = n.swf.getBuffered();
                                if (e)
                                    return s(e.length, e.start, e.end)
                            }
                            return s(0)
                        }}, seekable: {enumerable: !0, get: function() {
                            if (n.type === w.TYPE_HTML && n.video)
                                return n.video.seekable;
                            if (n.type === w.TYPE_FLASH && n.swf && n.swfLoaded) {
                                var e = n.swf.getSeekable();
                                if (e)
                                    return s(e.length, e.start, e.end)
                            }
                            return s(0)
                        }}, error: {enumerable: !0, get: function() {
                            if (n.type === w.TYPE_HTML && n.video)
                                return n.video.error;
                            if (n.type === w.TYPE_FLASH && n.swf && n.swfLoaded) {
                                var e = n.swf.getError();
                                if (e)
                                    return a(e.code)
                            }
                            return null
                        }}, textTracks: {enumerable: !0, get: function() {
                            if (n.type === w.TYPE_HTML && n.video && _) {
                                if (E["default"].browser.firefox) {
                                    for (var e = n.video.querySelectorAll("track"), t = [], o = 0, i = e.length; i > o; o++)
                                        t.push(e[o].track);
                                    return t
                                }
                                return n.video.textTracks
                            }
                            return l([])
                        }}, canvasImageSource: {enumerable: !0, get: function() {
                            return n.type === w.TYPE_HTML ? n.video : (n.type === w.TYPE_FLASH, null)
                        }}, renderer: {enumerable: !0, get: function() {
                            return n.type
                        }}, addEventListener: {enumerable: !0, value: function(e, t) {
                            return f.indexOf(e) >= 0 ? void(n.video && n.video.addEventListener(e, t)) : void i.on(e, t)
                        }}, removeEventListener: {enumerable: !0, value: function(e, t) {
                            return f.indexOf(e) >= 0 ? void(n.video && n.video.removeEventListener(e, t)) : void i.off(e, t)
                        }}, appendChild: {enumerable: !0, value: function(e) {
                            return n.type === w.TYPE_HTML && n.video ? ("TRACK" === e.nodeName && n.textTracks.push(e), void n.video.appendChild(e)) : void 0
                        }}, removeChild: {enumerable: !0, value: function(e) {
                            if (n.type === w.TYPE_HTML && n.video) {
                                if ("TRACK" === e.nodeName) {
                                    var t = n.textTracks.indexOf(e);
                                    t >= 0 && n.textTracks.splice(t, 1)
                                }
                                return n.video.removeChild(e), void(0 === n.video.children.length && n.video.removeAttribute("crossorigin"))
                            }
                        }}, firstChild: {enumerable: !0, get: function() {
                            return n.type === w.TYPE_HTML && n.video ? n.video.firstChild : null
                        }}, children: {enumerable: !1, get: function() {
                            return n.type === w.TYPE_HTML && n.video ? n.video.children : []
                        }}};
                for (var p in w.properties)
                    p in v || (r = {enumerable: !0, get: d(n, p)}, w.properties[p].readOnly || (r.set = u(n, p)), v[p] = r);
                for (var h = 0, g = w.methods.length; g > h; h++)
                    v[w.methods[h]] = {enumerable: !0, value: c(n, w.methods[h])};
                return"WebKitPlaybackTargetAvailabilityEvent"in window && (v.webkitShowPlaybackTargetPicker = {enumerable: !0, value: function() {
                        n.video && "webkitShowPlaybackTargetPicker"in n.video && n.video.webkitShowPlaybackTargetPicker()
                    }}, v.webkitCurrentPlaybackTargetIsWireless = {enumerable: !0, get: function() {
                        return n.video && "webkitCurrentPlaybackTargetIsWireless"in n.video ? n.video.webkitCurrentPlaybackTargetIsWireless : !1
                    }}), Object.defineProperties(o, v), n.eventCallback = function(e) {
                    if (n.type === w.TYPE_HTML) {
                        if ("error" === e.type && e.target.error && (e.target.error.code === w.MEDIA_ERR_DECODE || e.target.error.code === w.MEDIA_ERR_SRC_NOT_SUPPORTED))
                            return k.h264.baseline = "", k.h264.high = "", void(o.src = o.src);
                        i.fire(e.type, e)
                    }
                }, n.flashEventCallback = function(e) {
                    n.type === w.TYPE_FLASH && ("error" === e.type && (e.target = n.node), i.fire(e.type, e))
                }, n.flashReady = function() {
                    if (!n.swfLoaded) {
                        for (var e = 0, t = w.events.length; t > e; e++)
                            n.swf.api_addEventListener(w.events[e], n.global + ".flashEventCallback");
                        n.swfLoaded = !0
                    }
                    for (var o in n.propertyValues) {
                        var i = "set" + o.charAt(0).toUpperCase() + o.slice(1);
                        n.swf[i](n.propertyValues[o])
                    }
                    for (var r = n.queuedMethodCalls.shift(); r; )
                        n.swf["_" + r.method](), r = n.queuedMethodCalls.shift()
                }, o
            }
            var y = i(n), E = i(o), k = function() {
                function e(e) {
                    return new RegExp(e.toLowerCase()).test(t)
                }
                var t = navigator.userAgent.toLowerCase(), n = e("android") ? parseFloat(t.replace(/^.* android (\d+)\.(\d+).*$/, "$1.$2")) || !0 : !1, o = n && e("mobile"), i = e("iphone"), r = e("firefox"), a = document.createElement("video"), s = !1;
                try {
                    a.canPlayType && (s = {h264: {baseline: a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), high: a.canPlayType('video/mp4; codecs="avc1.64001E"').replace(/^no$/, "")}, webm: a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), flv: a.canPlayType('video/x-flv; codecs="vp6"'), hls: a.canPlayType("application/vnd.apple.mpegurl")})
                } catch (l) {
                }
                return n && (2.1 === n || 2.2 === n || r && !s.h264.baseline) && (s.h264.baseline = "probably"), n && !o && (s.h264.high = "probably"), n && (s.hls = ""), i && window.devicePixelRatio < 2 && (s.h264.high = ""), s
            }(), _ = function() {
                var e = document.createElement("video");
                return"undefined" != typeof e.textTracks && e.textTracks instanceof TextTrackList && "function" == typeof e.addTextTrack
            }(), L = _ && function() {
                var e = document.createElement("track");
                return"oncuechange"in e.track
            }(), x = function() {
                try {
                    Object.defineProperty({}, "fakeprop", {})
                } catch (e) {
                    return!1
                }
                return!0
            }();
            w.TYPE_HTML = "html", w.TYPE_FLASH = "flash", w.NETWORK_EMPTY = 0, w.NETWORK_IDLE = 1, w.NETWORK_LOADING = 2, w.NETWORK_NO_SOURCE = 3, w.HAVE_NOTHING = 0, w.HAVE_METADATA = 1, w.HAVE_CURRENT_DATA = 2, w.HAVE_FUTURE_DATA = 3, w.HAVE_ENOUGH_DATA = 4, w.MEDIA_ERR_ABORTED = 1, w.MEDIA_ERR_DECODE = 3, w.MEDIA_ERR_NETWORK = 2, w.MEDIA_ERR_SRC_NOT_SUPPORTED = 4, w.properties = {error: {value: null, readOnly: !0}, src: {value: ""}, currentSrc: {value: "", readOnly: !0}, networkState: {value: w.NETWORK_EMPTY, readOnly: !0}, preload: {value: "auto"}, buffered: {value: s(0), readOnly: !0}, readyState: {value: w.HAVE_NOTHING, readOnly: !0}, seeking: {value: !1, readOnly: !0}, currentTime: {value: 0}, duration: {value: NaN, readOnly: !0}, paused: {value: !0, readOnly: !0}, defaultPlaybackRate: {value: 1}, playbackRate: {value: 1}, played: {value: s(0), readOnly: !0}, seekable: {value: s(0), readOnly: !0}, ended: {value: !1, readOnly: !0}, autoplay: {value: !1}, loop: {value: !1}, controls: {value: !1}, volume: {value: 1}, muted: {value: !1}, defaultMuted: {value: !1}, textTracks: {value: l([]), readOnly: !0}, width: {value: 0}, height: {value: 0}, videoWidth: {value: 0, readOnly: !0}, videoHeight: {value: 0, readOnly: !0}, poster: {value: ""}}, w.methods = ["load", "play", "pause", "canPlayType", "addTextTrack"], w.events = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], w.support = {video: k, textTracks: _, cueChange: L}, t.exports = w
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t], i = function(t) {
            "use strict";
            !function(t, n, o) {
                function i() {
                    var e = Array.prototype.slice.apply(arguments), t = e.shift();
                    h[t].forEach(function(t) {
                        "function" == typeof t && t.apply(t, e)
                    })
                }
                function r(e) {
                    return function(t, n) {
                        -1 !== p.indexOf(t) && e.call(this, t, n)
                    }
                }
                function a(e) {
                    var t = null;
                    if ("VIDEO" === e.tagName)
                        t = e;
                    else {
                        var n = e.getElementsByTagName("video");
                        n[0] && (t = n[0])
                    }
                    return t
                }
                function s(e) {
                    var t = a(e);
                    if (t && t.webkitEnterFullscreen) {
                        try {
                            t.readyState < t.HAVE_METADATA ? (t.addEventListener("loadedmetadata", function o() {
                                t.removeEventListener("loadedmetadata", o, !1), t.webkitEnterFullscreen(), g = !!t.getAttribute("controls")
                            }, !1), t.load()) : (t.webkitEnterFullscreen(), g = !!t.getAttribute("controls")), m = t
                        } catch (n) {
                            return _("not_supported", e)
                        }
                        return!0
                    }
                    return _(void 0 === f.request ? "not_supported" : "not_enabled", e)
                }
                function l() {
                    L.element || (k(), u())
                }
                function d() {
                    o && "webkitfullscreenchange" === f.change && t.addEventListener("resize", l, !1)
                }
                function u() {
                    o && "webkitfullscreenchange" === f.change && t.removeEventListener("resize", l, !1)
                }
                var c = /i(Pad|Phone|Pod)/.test(navigator.userAgent) && parseInt(navigator.userAgent.replace(/^.*OS (\d+)_(\d+).*$/, "$1.$2"), 10) >= 7, f = function() {
                    var e = n.createElement("video"), t = {request: ["requestFullscreen", "webkitRequestFullscreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullscreen"], exit: ["exitFullscreen", "webkitCancelFullScreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"], enabled: ["fullscreenEnabled", "webkitFullscreenEnabled", "mozFullScreenEnabled", "msFullscreenEnabled"], element: ["fullscreenElement", "webkitFullscreenElement", "webkitCurrentFullScreenElement", "mozFullScreenElement", "msFullscreenElement"], change: ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"], error: ["fullscreenerror", "webkitfullscreenerror", "mozfullscreenerror", "MSFullscreenError"]}, o = {};
                    for (var i in t)
                        for (var r = 0, a = t[i].length; a > r; r++)
                            if (t[i][r]in e || t[i][r]in n || "on" + t[i][r].toLowerCase()in n) {
                                o[i] = t[i][r];
                                break
                            }
                    return o
                }(), v = {ENTER: "enter", EXIT: "exit", CHANGE: "change", ERROR: "error"}, p = [], h = {};
                Object.keys(v).forEach(function(e) {
                    p.push(v[e]), h[v[e]] = []
                });
                var m = null, g = null, b = function() {
                }, w = [], y = !1;
                navigator.userAgent.indexOf("Android") > -1 && navigator.userAgent.indexOf("Chrome") > -1 && (y = parseInt(navigator.userAgent.replace(/^.*Chrome\/(\d+).*$/, "$1"), 10) || !0);
                var E = function(e) {
                    var t = w[w.length - 1];
                    t && (e !== t.element && e !== m || !t.hasEntered) && ("VIDEO" === e.tagName && (m = e), 1 === w.length && L.onenter(L.element), t.enter.call(t.element, e || t.element), t.hasEntered = !0, i(v.ENTER, L.element))
                }, k = function() {
                    !m || g || c || (m.setAttribute("controls", "controls"), m.removeAttribute("controls")), m = null, g = null;
                    var e = w.pop();
                    e && (e.exit.call(e.element), i(v.EXIT, e.element), L.element || (w.forEach(function(e) {
                        e.exit.call(e.element), i(v.EXIT, e.element)
                    }), w = [], L.onexit()))
                }, _ = function(e, t) {
                    if (w.length > 0) {
                        var n = w.pop();
                        t = t || n.element, n.error.call(t, e), L.onerror(t, e), i(v.ERROR, t, e)
                    }
                }, L = {request: function(e, t, i, r) {
                        if (e = e || n.body, w.push({element: e, enter: t || b, exit: i || b, error: r || b}), void 0 === f.request)
                            return s(e);
                        if (o && n[f.enabled] === !1)
                            return s(e);
                        if (y !== !1 && 32 > y)
                            return s(e);
                        if (o && void 0 === f.enabled)
                            return f.enabled = "webkitFullscreenEnabled", e[f.request](), void setTimeout(function() {
                                n[f.element] ? n[f.enabled] = !0 : (n[f.enabled] = !1, s(e))
                            }, 250);
                        try {
                            e[f.request](), setTimeout(function() {
                                n[f.element] || _(o ? "not_enabled" : "not_allowed", e)
                            }, 100)
                        } catch (a) {
                            _("not_enabled", e)
                        }
                    }, exit: function() {
                        u(), n[f.exit]()
                    }, toggle: function(e, t, n, o) {
                        L.element ? L.exit() : L.request(e, t, n, o)
                    }, videoEnabled: function(e) {
                        if (L.enabled)
                            return!0;
                        e = e || n.body;
                        var t = a(e);
                       // return t && void 0 !== t.webkitSupportsFullscreen ? t.readyState < t.HAVE_METADATA ? "maybe" : t.webkitSupportsFullscreen : !1
                    }, on: r(function(e, t) {
                        h[e].push(t)
                    }), off: r(function(e, t) {
                        var n = h[e].indexOf(t);
                        n > -1 && h[e].splice(n, 1)
                    }), onenter: b, onexit: b, onchange: b, onerror: b};
                try {
                    Object.defineProperties(L, {
                        element: {enumerable: !0, get: function() {
                                return m && m.webkitDisplayingFullscreen ? m : n[f.element] || null
                            }}, enabled: {enumerable: !0, get: function() {
                                return"webkitCancelFullScreen" !== f.exit || o ? y !== !1 && 32 > y ? !1 : n[f.enabled] || !1 : !0
                            }}})
                } catch (x) {
                    L.element = null, L.enabled = !1
                }
                f.change && n.addEventListener(f.change, function(e) {
                    if (L.onchange(L.element), i(v.CHANGE, L.element), L.element) {
                        var t = w[w.length - 2];
                        t && t.element === L.element ? k() : (E(L.element), d())
                    } else
                        k()
                }, !1), n.addEventListener("webkitbeginfullscreen", function(e) {
                    var t = !0;
                    if (w.length > 0)
                        for (var n = 0, o = w.length; o > n; n++) {
                            var r = a(w[n].element);
                            if (r === e.srcElement) {
                                t = !1;
                                break
                            }
                        }
                    t && w.push({element: e.srcElement, enter: b, exit: b, error: b}), L.onchange(e.srcElement), i(v.CHANGE, L.srcElement), E(e.srcElement)
                }, !0), n.addEventListener("webkitendfullscreen", function(e) {
                    L.onchange(e.srcElement), i(v.CHANGE, e.srcElement), k(e.srcElement)
                }, !0), f.error && n.addEventListener(f.error, function(e) {
                    _("not_allowed")
                }, !1), "undefined" != typeof e && e.exports ? e.exports = L : t.BigScreen = L
            }(window, document, self !== top)
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(1)], i = function(e, t, n) {
            "use strict";
            function o(e, t) {
                function o() {
                    var t = e._video && e._video.currentRenderer;
                    switch (t) {
                        case"html":
                            return"HTML5";
                        case"flash":
                            return"Flideo";
                        case"moogaloop":
                            return"Moogaloop";
                        default:
                            return"Player"
                    }
                }
                function i(t, n) {
                    window._gaq && window._gaq.push(["player._trackSocial", t, n, e.video.share_url])
                }
                function r(e, t, n) {
                    var i = (new Date).getTime() - t;
                    window._gaq && window._gaq.push(["player._trackTiming", o(), e, i, n])
                }
                function a() {
                    e.request.flags.dnt || (t.on(n.Events.facebookButtonPressed, function() {
                        i("Facebook", "share")
                    }), t.on(n.Events.twitterButtonPressed, function() {
                        i("Twitter", "tweet")
                    }), t.on(n.Events.tumblrButtonPressed, function() {
                        i("Tumblr", "share")
                    }), t.on(n.Events.emailButtonPressed, function() {
                        i("Email", "email")
                    }))
                }
                function s() {
                    var o;
                    t.on([n.Events.bufferStarted, n.Events.scrubbingStarted], function(e) {
                        o || (o = e || (new Date).getTime())
                    }), t.on(n.Events.bufferEnded, function() {
                        if (o > 0) {
                            var t = e._video.currentFile.quality, n = "Buffer Time";
                            f && (f = !1, n = "Start Time"), r(n, o, t), o = null
                        }
                    })
                }
                function l() {
                    function o() {
                        s = document.createElement("script"), s.id = "player-comscore", s.async = !0, s.src = e.request.urls.comscore_js;
                        var t = document.getElementsByTagName("script")[0];
                        t.parentNode.insertBefore(s, t)
                    }
                    function i() {
                        try {
                            a = new ns_.StreamingTag({customerC2: e.request.comscore_id}), l && (r(), l = !1)
                        } catch (t) {
                        }
                    }
                    function r() {
                        try {
                            a.playContentPart({ns_st_ci: e.video.id})
                        } catch (t) {
                        }
                    }
                    if (!e.request.flags.dnt && e.request.flags.plays) {
                        var a, s = document.getElementById("player-comscore"), l = !1;
                        t.on(n.Events.played, function() {
                            if (!a) {
                                if ("undefined" == typeof ns_)
                                    return s || o(), s.addEventListener("load", i, !1), void(l = !0);
                                i()
                            }
                            r()
                        }), t.on(n.Events.paused, function() {
                            try {
                                a && a.stop()
                            } catch (e) {
                            }
                        })
                    }
                }
                function d() {
                    !e.request.flags.dnt && e.request.flags.plays && "tracking_pixel"in e.video && t.on(n.Events.playInitiated, function() {
                        try {
                            (new Image).src = e.video.tracking_pixel
                        } catch (t) {
                        }
                    })
                }
                function u() {
                    t.on(n.Events.configChanged, function(t) {
                        e = t, c !== t.request.session && (window._gaq && window._gaq.push(["player._trackPageview", "/video/" + e.video.id]), f = !0)
                    })
                }
                var c = e.request.session, f = !0;
                return a(), s(), l(), d(), u(), t.fire(n.Events.analyticsModuleReady), {}
            }
            t.exports = o
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, n(1)], i = function(e, t) {
            "use strict";
            function n(e, n, i, r) {
                function a() {
                    return Math.max(10, Math.round(.045 * r.clientHeight)) + "px"
                }
                function s() {
                    i.style.fontSize = a()
                }
                function l() {
                    i.classList.add("hidden"), i.setAttribute("hidden", "")
                }
                function d() {
                    i.classList.remove("hidden"), i.removeAttribute("hidden")
                }
                function u() {
                    n.on(t.Events.cueChanged, function(e, t) {
                        for (; i.firstChild; )
                            i.removeChild(i.firstChild);
                        if (t.length) {
                            var n = document.createDocumentFragment();
                            return t.forEach(function(e) {
                                var t = document.createElement("span");
                                t.innerHTML = e.html, n.appendChild(t)
                            }), i.appendChild(n), h ? void d() : void(m = !0)
                        }
                        l()
                    }).on(t.Events.captionsChanged, function(e) {
                        if (e) {
                            var t = e.split(".")[0];
                            return i.setAttribute("lang", t), void(o.indexOf(t) >= 0 ? i.setAttribute("dir", "rtl") : i.removeAttribute("dir"))
                        }
                        i.removeAttribute("dir"), i.removeAttribute("lang")
                    }).on(t.Events.playInitiated, function() {
                        h = !0, m && (m = !1, d())
                    }).on(t.Control.reset, function() {
                        h = !1
                    })
                }
                function c() {
                    s(), window.addEventListener("resize", s, !1), n.on([t.Events.didEnterFullscreen, t.Events.didExitFullscreen], s)
                }
                function f() {
                    n.on(t.Events.controlBarVisibilityChanged, function(e) {
                        return e ? void i.classList.add("with-controls") : void i.classList.remove("with-controls")
                    })
                }
                function v() {
                    n.on(t.Events.overlayOpened, function() {
                        i.classList.add("invisible")
                    }).on(t.Events.overlayClosed, function() {
                        i.classList.remove("invisible")
                    })
                }
                function p() {
                    n.on(t.Events.ended, function() {
                        "nothing" !== e.embed.outro && i.classList.add("invisible")
                    }).on([t.Events.played, t.Events.scrubbingStarted], function() {
                        i.classList.remove("invisible")
                    })
                }
                var h = !1, m = !1;
                return u(), c(), f(), v(), p(), {}
            }
            e.__esModule = !0;
            var o = ["ar", "fa", "he", "iw", "ku", "ps", "sd", "ur", "yi"];
            e["default"] = n, e.rtl = o
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(12), n(2), n(1)], i = function(e, t, n, o, i) {
            "use strict";
            function r(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function a(e, t, n) {
                function r(e, t) {
                    var n = ".player-" + M + " ", o = n + e.join("," + n);
                    if (t) {
                        var i = "#" + q + " ";
                        o += "," + i + e.join("," + i)
                    }
                    return O && (o = o.replace(/:hover/g, ":active")), o
                }
                function a() {
                    var e = document.createElement("style");
                    return e.setAttribute("data-player", M), document.querySelector("head").appendChild(e), R = e.sheet
                }
                function T() {
                    for (; R.cssRules.length > 0; )
                        R.deleteRule(0)
                }
                function P() {
                    R ? T() : a()
                }
                function A(e) {
                    P();
                    var t = e.complement, n = new s["default"](23, 35, 34, .75), i = new s["default"](0, 0, 0, .15), a = i.overlayOn(e);
                    n.contrast(t).ratio < 3 && t.lighten(5, 3, n);
                    var T, A = e.lightness < 40 ? e.clone().lighten(15, 3, e) : e.clone().darken(15, 3, e);
                    return o.addCssRule(r(l, !0), "color:" + e.hex + " !important", R), o.addCssRule(r(d, !0), "color:" + t.hex + " !important", R), o.addCssRule(r(u), "color:" + e.hex, R), o.addCssRule(r(v), "fill:" + e.hex, R), o.addCssRule(r(h), "stroke:" + e.hex, R), o.addCssRule(r(g), "background-color:" + e.hex, R), o.addCssRule(r(b), "border-color:" + e.hex, R), o.addCssRule(r(c), "color:" + t.hex, R), o.addCssRule(r(f), "fill:" + t.hex, R), o.addCssRule(r(p), "fill:" + A.hex, R), o.addCssRule(r(m), "stroke:" + A.hex, R), o.addCssRule(r(x), "border-color:" + a.hex, R), o.addCssRule(r(C), "background-color:" + a.hex, R), e.luminance > .95 && (t = e.clone().darken(15, 3, e), o.addCssRule(r(w), "color:" + t.hex, R), o.addCssRule(r(y), "fill:" + t.hex, R), o.addCssRule(r(E), "stroke:" + t.hex, R), A = t.clone().darken(15, 3, t), o.addCssRule(r(p), "fill:" + A.hex, R), o.addCssRule(r(m), "stroke:" + A.hex, R)), e.yiq > 175 && e.luminance < .95 && (T = A.clone().darken(15, 3, A), o.addCssRule(r(p), "fill:" + T.hex, R), o.addCssRule(r(m), "stroke:" + T.hex, R), o.addCssRule(r(k), "color:" + A.hex, R), o.addCssRule(r(_), "fill:" + A.hex, R), o.addCssRule(r(L), "stroke:" + A.hex, R)), {main: e.hex, selected: A.hex, sidedockHover: T ? A.hex : e.luminance > .95 ? t.hex : s["default"].white.hex, sidedockSelected: e.luminance > .95 ? t.hex : e.hex, sidedockSelectedHover: T ? T.hex : A.hex}
                }
                function S() {
                    t.on(i.Control.changeColor, function(n) {
                        var o;
                        try {
                            o = new s["default"](n)
                        } catch (r) {
                            o = new s["default"]("00adef")
                        }
                        var a = A(o);
                        e._colors = a, e.embed.color = a.main.replace("#", ""), t.fire(i.Events.colorChanged, e.embed.color)
                    }), t.fire(i.Control.changeColor, e.embed.color)
                }
                var M = n.uuid, q = n.id, O = n.isMobileDevice, R = null;
                return S(), {}
            }
            var s = r(n), l = [".title a"], d = [".title a:hover"], u = ["a", ".overlay-wrapper .footnote.share a:hover", ".title h1", ".title span.user", ".outro .video-section > div > h1 a:hover", ".outro .videos h1", ".outro .videos h2", ".menu li:hover", ".menu li.active"], c = ["a:hover"], f = [".overlay-wrapper .close:hover .fill", ".overlay-wrapper .back:hover .fill"], v = [".play-bar .on .fill", ".play-bar a:hover .fill", ".play-bar button:not(.toggle):hover .fill", ".tiny-bars .fill", ".sidedock .on .fill"], p = [".sidedock .on:hover .fill"], h = [".play-bar .on .stroke", ".sidedock .on .stroke"], m = [".sidedock .on:hover .stroke"], g = [".sidedock button:hover", ".player.touch-support .sidedock button:active", ".controls .play:hover", ".controls .play-bar .played", ".controls .play-bar .fullscreen.tiny:hover", ".controls .volume div", ".overlay .buttons li", ".overlay .window-wrapper button", '.overlay .window-wrapper input[type="submit"]', '.overlay .window-wrapper a[role="button"]', ".overlay .embed-copy", '.outro a[role="button"]', ".outro .videos li:hover img", ".outro .videos li a:focus img", ".outro .vod li", ".menu li.active:before"], b = [".outro .videos li:hover img", ".outro .videos li a:focus img", ".menu li.active:before"], w = [".overlay-wrapper .overlay .buttons li a", ".overlay-wrapper .overlay button.embed-copy", ".overlay-wrapper .footnote.share a:hover", ".overlay .window-wrapper button", '.overlay .window-wrapper input[type="submit"]', '.overlay .window-wrapper a[role="button"]', ".outro .vod-header a:hover", '.outro .vod-wrapper a[role="button"]', '.outro-wrapper .outro-inner a[role="button"]', ".sidedock button:hover", ".play:hover"], y = [".controls .play:hover .fill", ".sidedock button:hover .fill", ".play-bar a:hover .fill", ".play-bar button:not(.toggle):hover .fill", ".controls .play-bar .fullscreen.tiny:hover .fill", ".sidedock .on .fill", '.overlay .share-wrapper a[role="button"] .fill', '.outro .vod-wrapper a[role="button"] .fill'], E = [".controls .play:hover .stroke", ".sidedock button:hover .stroke", ".sidedock .on .stroke"], k = ['.overlay-wrapper .overlay a[role="button"]', ".overlay-wrapper .overlay button.embed-copy", ".sidedock button:hover", ".play:hover", '.outro a[role="button"]'], _ = [".controls .play:hover .fill", ".sidedock button:hover .fill", ".controls .play-bar .fullscreen.tiny:hover .fill"], L = [".sidedock button:hover .stroke"], x = [".menu li:active:before"], C = ['.overlay .window-wrapper input[type="submit"]:active', ".overlay .embed-copy.zeroclipboard-is-active", '.overlay a[role="button"]:active', ".outro .vod-watch-button:active", ".sidedock button:active"];
            t.exports = a
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, n(5), n(13), n(4), n(31), n(3), n(7), n(2), n(1)], i = function(e, t, n, o, i, r, a, s, l) {
            "use strict";
            function d(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function u(e, t, n) {
                return e += "", new Array(t - e.length + 1).join(n || "0") + e
            }
            function c(e, t) {
                var n = Math.floor(e / 3600 % 60), o = Math.floor(e / 60 % 60);
                if (e = Math.floor(e % 60), t) {
                    var i = e + " second" + (1 === e ? "" : "s");
                    return o > 0 && (i = o + " minute" + (1 === o ? "" : "s") + ", " + i), n > 0 && (i = n + " hour" + (1 === n ? "" : "s") + ", " + i), i
                }
                return(n > 0 ? n + ":" : "") + u(o, 2) + ":" + u(e, 2)
            }
            function f(e, t, n) {
                function o() {
                    if (!qe) {
                        var e = Q.getBoundingClientRect().left;
                        Q.offsetWidth < Q.clientWidth && (e *= 100);
                        var t = parseInt(window.getComputedStyle(Q, "").borderLeftWidth, 10);
                        qe = e + t
                    }
                    return qe
                }
                function i() {
                    if (!Me) {
                        var e = Q.getBoundingClientRect().right;
                        Q.offsetWidth < Q.clientWidth && (e *= 100);
                        var t = parseInt(window.getComputedStyle(Q, "").borderRightWidth, 10);
                        Me = e - t
                    }
                    return Me
                }
                function r(e) {
                    var t = o(), n = i(), r = n - t, a = e - t, l = a / r;
                    return s.limit(l, 0, 1)
                }
                function a() {
                    if ($ && !Te && Pe && (e._video.loadProgress || e._video.currentTime)) {
                        var t = (e._video.loadProgress || 0) / e.video.duration * 65, n = (e._video.currentTime || 0) / e.video.duration * 65;
                        window.requestAnimationFrame(function() {
                            K.setAttribute("width", t), J.setAttribute("width", n)
                        })
                    }
                }
                function d(t, n) {
                    ge && !Ce && (n = n || e.video.duration * t || 0, window.requestAnimationFrame(function() {
                        u(t, n), f(t, n)
                    }))
                }
                function u(e, t) {
                    oe.style.left = Math.min(s.round(100 * e), 100) + "%", ie.innerHTML = c(t)
                }
                function f(e, t) {
                    ne.style.width = Math.min(s.round(100 * e), 100) + "%", ne.setAttribute("aria-valuenow", s.round(t)), ne.setAttribute("aria-valuetext", c(Math.round(t), !0) + " played")
                }
                function w(e, t) {
                    te.style.width = Math.min(s.round(100 * e), 100) + "%", te.setAttribute("aria-valuenow", s.round(t)), te.setAttribute("aria-valuetext", c(t, !0) + " loaded")
                }
                function y() {
                    ge = !0, Se && (Pe = !1, n.classList.add("invisible"), A(), L()), X.classList.contains("state-playing") ? (t.fire(l.Events.pauseButtonPressed), E()) : (t.fire(l.Events.playButtonPressed), k())
                }
                function E() {
                    Ae = !1, X.classList.remove("state-playing"), X.classList.add("state-paused");
                    var e = X.getAttribute("data-title-play");
                    X.setAttribute("title", e), X.setAttribute("aria-label", e)
                }
                function k() {
                    Ae = !0, Se && A(), X.classList.add("state-playing"), X.classList.remove("state-paused");
                    var e = X.getAttribute("data-title-pause");
                    X.setAttribute("title", e), X.setAttribute("aria-label", e)
                }
                function _() {
                    Pe && (me || (ge && xe || we) && (be || (!Re || we) && (we && e.view === l.View.privateUnlocked || ke || ye || (Pe = !1, t.fire(l.Events.controlBarVisibilityChanged, Pe), n.classList.add("invisible")))))
                }
                function L() {
                    Pe || we || (n.classList.remove("hidden"), n.removeAttribute("hidden"), a(), setTimeout(function() {
                        Pe = !0, t.fire(l.Events.controlBarVisibilityChanged, Pe), n.classList.remove("invisible")
                    }, 0))
                }
                function x(n, o) {
                    var i = [];
                    "text_tracks"in e.request && (e.request.text_tracks.forEach(function(e) {
                        var t = e.lang + "." + e.kind, n = "CC" === e.label.substring(e.label.length - 2), o = "captions" !== e.kind || n ? "" : " CC";
                        i.push({label: e.label + o, id: t, active: Oe === t})
                    }), i.push({label: "None", id: "off", active: null === Oe}));
                    var r = new m["default"](i, n, o, t);
                    return r.on("selected", function(e) {
                        return"off" === e ? void t.fire(l.Control.turnCaptionsOff) : void t.fire(l.Control.turnCaptionsOn, e)
                    }), r
                }
                function C() {
                    window.requestAnimationFrame(function() {
                        u(0, e.video.duration), f(0, 0), w(0, 0)
                    })
                }
                function T() {
                    ge = !1, be = !1, ye = !1, _e = !1, Ce = !1, me = !1, xe = !1, ce && (ce.destroy(), ce = null)
                }
                function P() {
                    if (!e.embed.settings.custom_logo)
                        return null;
                    var t = e.embed.settings.custom_logo, n = t.img;
                    return g["default"].devicePixelRatio >= 2 && (n = n.replace(/(mw|mh)=(\d+)/g, function(e, t, n) {
                        return t + "=" + 2 * parseInt(n, 10)
                    })), {showLink: null !== t.url, url: t.url, img: n, sticky: t.sticky, width: t.width, height: t.height}
                }
                function A() {
                    if (e.view === l.View.main || e.view === l.View.privateUnlocked) {
                        var t = e.embed.settings, o = {show: t.logo, showLink: !!e.video.url, url: e.video.url}, i = P();
                        if (e.video.vod && (e.video.vod.is_trailer || e.video.vod.is_free_episode) && !ge && !Ae && !e.embed.autoplay)
                            return void S(o, i);
                        var r = "text_tracks"in e.request && e.request.text_tracks.length, a = {targetBlank: 0 === e.embed.on_site, playState: Ae ? "playing" : "paused", volume: he && t.volume, ccButton: p["default"].support.textTracks && r, ccOn: null !== Oe, hdButton: e.video.hd, hdOn: e.video.allow_hd && (null === e.request.cookie.hd ? e.video.default_to_hd : e.request.cookie.hd), airplayButton: g["default"].airPlay, scalingButton: t.scaling, fullSize: e.request.cookie.scaling ? 1 : 0, fullscreenButton: t.fullscreen, vimeoLogo: o, duration: c(e.video.duration), rawDuration: e.video.duration};
                        i && (a.customLogo = i), n.classList.remove("trailer"), Se = !1, n.innerHTML = v["default"].render("controlbar", a), X = n.querySelector(".play"), G = X.querySelector(".buffer"), K = X.querySelector(".loaded"), J = X.querySelector(".played"), Z = n.querySelector(".play-bar"), Q = n.querySelector(".progress"), ee = Z.querySelector(".buffer"), te = Z.querySelector(".loaded"), ne = Z.querySelector(".played"), oe = n.querySelector(".timecode"), ie = oe.querySelector(".box"), re = n.querySelector(".ghost-timecode"), ae = re.querySelector(".box"), se = n.querySelector(".volume"), se && (le = [].slice.call(se.querySelectorAll("div"), 0)), de = n.querySelector(".hd"), ue = n.querySelector(".play-bar .cc"), g["default"].airPlay && (fe = n.querySelector(".airplay")), ve = n.querySelector(".scaling"), pe = n.querySelector(".fullscreen"), be = !1
                    }
                }
                function S(t, o) {
                    n.classList.add("trailer");
                    var i = {vimeoLogo: t, text: e.video.vod.button_text || "Watch Trailer"};
                    o && (i.customLogo = o), n.innerHTML = v["default"].render("controlbar_trailer", i), X = n.querySelector(".play"), Se = !0
                }
                function M() {
                    b["default"](n, ".play", y), t.on([l.Events.playInitiated, l.Events.playButtonPressed], k), t.on([l.Events.pauseButtonPressed, l.Events.paused, l.Events.error], E), t.on(l.Events.played, function() {
                        k()
                    }), t.on(l.Events.ended, function() {
                        Ce = !1, E(), d(1)
                    }), t.on(l.Events.overlayOpened, function(e) {
                        "notsupported" === e && E()
                    })
                }
                function q() {
                    t.on(l.Events.loadProgress, function(e, t, n) {
                        me || window.requestAnimationFrame(function() {
                            w(n, e), a()
                        })
                    })
                }
                function O() {
                    t.on(l.Events.bufferStarted, function() {
                        ee.classList.remove("hidden"), G.setAttribute("class", G.getAttribute("class").replace(/\s+hidden/, "")), ke = !0, L()
                    }), t.on(l.Events.bufferEnded, function() {
                        ee.classList.add("hidden"), G.setAttribute("class", G.getAttribute("class") + " hidden"), ke = !1
                    })
                }
                function R() {
                    function o(e) {
                        if (!e.button || 2 !== e.button) {
                            t.fire(l.Events.scrubbingStarted);
                            var o = e.type;
                            if ("pointerdown" === o || "MSPointerDown" === o) {
                                u = e.pointerId;
                                try {
                                    e.target.msSetPointerCapture ? e.target.msSetPointerCapture(u) : e.target.setPointerCapture(u)
                                } catch (a) {
                                }
                                h["default"](n).on("pointermove", ".progress", i).on("pointerup", ".progress", s)
                            } else
                                "touchstart" === o ? h["default"](n).on("touchmove", i).on("touchend", s) : h["default"](document).on("mousemove", i).on("mouseup", s);
                            var c = e.clientX;
                            e.targetTouches && e.targetTouches.length > 0 && (c = e.targetTouches[0].clientX, e.preventDefault());
                            var f = r(c), v = null;
                            return d(f), t.fire(l.Control.seek, f, v), !1
                        }
                    }
                    function i(e) {
                        if (u === e.pointerId && e.isPrimary !== !1) {
                            var n = e.clientX;
                            e.targetTouches && e.targetTouches.length > 0 && (n = e.targetTouches[0].clientX, e.preventDefault());
                            var o = r(n);
                            d(o), t.fire(l.Control.seek, o)
                        }
                    }
                    function s(e) {
                        var o = e.type;
                        "pointerup" === o || "MSPointerUp" === o ? h["default"](n).off("pointermove", ".progress", i).off("pointerup", ".progress", s) : "touchend" === e.type ? h["default"](n).off("touchmove", i).off("touchend", s) : h["default"](document).off("mousemove", i).off("mouseup", s), t.fire(l.Events.scrubbingEnded)
                    }
                    t.on(l.Events.playProgress, function(t, n, o) {
                        Ce && (0 === e.embed.time || e.embed.time > 0 && t >= e.embed.time) && (Ce = !1), ye || (d(o, t), a())
                    }), t.on(l.Events.scrubbingStarted, function(e) {
                        ye = !0, Ee = e
                    }), t.on(l.Events.scrubbingEnded, function() {
                        ye = !1, Ee = !1
                    });
                    var u;
                    t.on(l.Events.seeked, function(e, t, n) {
                        Ee && d(n)
                    }), h["default"](n).on(g["default"].pointerEvents ? "pointerdown" : ["touchstart", "mousedown"], ".progress", o)
                }
                function B() {
                    function o(e) {
                        if (e.target === Z) {
                            var n = r(e.clientX);
                            d(n), t.fire(l.Control.seek, n)
                        }
                    }
                    function a(e) {
                        Le || (window.requestAnimationFrame(function() {
                            re.classList.remove("invisible"), Le = !0
                        }), h["default"](Z).on("click", o))
                    }
                    function s(t) {
                        if (Le) {
                            var n = r(t.clientX), o = (100 * n).toFixed(3);
                            window.requestAnimationFrame(function() {
                                re.style.left = o + "%", ae.innerHTML = c(e.video.duration * n), t.clientX > i() + 10 && u()
                            })
                        }
                    }
                    function u() {
                        re && re.classList.add("invisible"), Le = !1, h["default"](Z).off("click", o)
                    }
                    h["default"](n).on("mouseenter", ".progress", a).on("mousemove", ".play-bar", s).on("mouseleave", ".play-bar", u), h["default"](n).on("transitionend", ".ghost-timecode", function(e) {
                        "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && (re.style.left = 0)
                    }, !1), t.on(l.Events.mousedOut, u)
                }
                function F() {
                    function e(e) {
                        Oe = e, ce && (ce.setActiveItem(e), setTimeout(function() {
                            ce.hide()
                        }, 100)), ue && (ue.classList.add("on"), ue.classList.remove("off"))
                    }
                    function o() {
                        Oe = null, ce && (ce.setActiveItem("off"), setTimeout(function() {
                            ce.hide()
                        }, 100)), ue && (ue.classList.add("off"), ue.classList.remove("on"))
                    }
                    b["default"](n, ".cc", function() {
                        t.fire(l.Events.ccButtonPressed)
                    }), t.on(l.Events.ccButtonPressed, function(e) {
                        ce ? e && ce.toggle(e) : (ce = x(ue, Z), ce.show(e))
                    }), t.on(l.Events.captionsChanged, function(t) {
                        return t ? e(t) : void o()
                    }).on(l.Events.controlBarVisibilityChanged, function(e) {
                        e || ce && ce.hide()
                    })
                }
                function I() {
                    b["default"](n, ".hd", function() {
                        t.fire(l.Events.hdButtonPressed)
                    }), t.on(l.Events.hdButtonPressed, function() {
                        if (!e.video.allow_hd)
                            return t.fire(l.Control.showOverlay, "hd-not-allowed");
                        var n = de.classList.contains("on") ? "sd" : "hd";
                        t.fire(l.Control.changeQuality, n)
                    }), t.on(l.Control.changeQuality, function(e) {
                        de && ("hd" === e ? (de.classList.add("on"), de.classList.remove("off"), de.setAttribute("title", de.getAttribute("data-title-on"))) : (de.classList.add("off"), de.classList.remove("on"), de.setAttribute("title", de.getAttribute("data-title-off"))))
                    }), t.on(l.Control.disableHd, function() {
                        A()
                    }).on(l.Control.disableVolume, function() {
                        he = !1, A()
                    })
                }
                function V() {
                    g["default"].airPlay && (b["default"](n, ".airplay", function() {
                        t.fire(l.Events.airPlayButtonPressed)
                    }), t.on(l.Events.airPlayAvailable, function() {
                        fe && (fe.classList.remove("hidden"), fe.hidden = !1)
                    }).on(l.Events.airPlayNotAvailable, function() {
                        fe && (fe.classList.add("hidden"), fe.hidden = !0)
                    }).on(l.Events.airPlayActivated, function() {
                        Re = !0, fe && (fe.classList.remove("off"), fe.classList.add("on"), fe.setAttribute("title", fe.getAttribute("data-title-on"))), L()
                    }).on(l.Events.airPlayDeactivated, function() {
                        Re = !1, fe && (fe.classList.remove("on"), fe.classList.add("off"), fe.setAttribute("title", fe.getAttribute("data-title-off")))
                    }))
                }
                function N() {
                    function o(e) {
                        if (ve) {
                            ve.setAttribute("data-full-size", e ? "1" : "0");
                            var t = e ? "data-title-full-size" : "data-title-actual-size";
                            ve.setAttribute("title", ve.getAttribute(t))
                        }
                    }
                    b["default"](n, ".scaling", function() {
                        t.fire(l.Events.scalingButtonPressed), t.fire(l.Control.changeScaling, !e.request.cookie.scaling)
                    }), t.on(l.Control.changeScaling, o), o(e.request.cookie.scaling)
                }
                function D() {
                    b["default"](n, ".fullscreen", function() {
                        t.fire(l.Events.fullscreenButtonPressed)
                    }), t.on(l.Events.didEnterFullscreen, function() {
                        Te = !0, pe && (pe.setAttribute("title", pe.getAttribute("data-title-unfullscreen")), pe.classList.remove("tiny"))
                    }), t.on(l.Events.didExitFullscreen, function(e) {
                        Te = !1, pe && pe.setAttribute("title", pe.getAttribute("data-title-fullscreen")), a(), e || (me = !0, C()), $ && pe && pe.classList.add("tiny")
                    })
                }
                function H() {
                    t.on([l.Events.mousedOver, l.Events.bufferStarted, l.Events.scrubbingStarted, l.Control.changeVolume], L).on([l.Events.mousedOut, l.Events.mouseTimeout], _).on(l.Events.willEnterFullscreen, function() {
                        be = !1, _()
                    }).on(l.Events.willExitFullscreen, function() {
                        be = !1
                    }).on(l.Events.targetTimeReached, function() {
                        xe = !0, _()
                    }).on(l.Control.changeVolume, function(e, t) {
                        t || L()
                    });
                    var e = [".play", ".play-bar", ".custom-logo", ".menu"];
                    h["default"](n).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], e, function(e) {
                        return"pointerType"in e ? void(("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE) && (be = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(be = "mouseover" === e.type)
                    }), h["default"](n).on("transitionend", function(e) {
                        this === n && "opacity" === e.propertyName && n.classList.contains("invisible") && (n.classList.add("hidden"), n.setAttribute("hidden", ""))
                    })
                }
                function W() {
                    function e(e) {
                        if (1 === e.which) {
                            se.setAttribute("data-tabindex", se.getAttribute("tabindex")), se.removeAttribute("tabindex"), _e = !0, t.fire(l.Events.volumeScrubbingStarted);
                            var s = e.type;
                            if ("pointerdown" === s || "MSPointerDown" === s) {
                                d = e.pointerId;
                                try {
                                    e.target.msSetPointerCapture ? e.target.msSetPointerCapture(d) : e.target.setPointerCapture(d)
                                } catch (u) {
                                }
                                h["default"](n).on("pointermove", ".volume", o).on("pointerup", ".volume", i)
                            } else
                                "touchstart" === s ? h["default"](document).on("touchmove", o).on("touchend", i) : h["default"](document).on("mousemove", o).on("mouseup", i);
                            var c = e.clientX;
                            e.targetTouches && (c = e.targetTouches[0].clientX);
                            var f = a(c);
                            t.fire(l.Control.changeVolume, f), r(f)
                        }
                    }
                    function o(e) {
                        var n = e.clientX;
                        e.targetTouches && (n = e.targetTouches[0].clientX, e.preventDefault());
                        var o = a(n);
                        t.fire(l.Control.changeVolume, o), r(o)
                    }
                    function i(e) {
                        _e = !1, t.fire(l.Events.volumeScrubbingEnded);
                        var r = e.type;
                        "pointerup" === r || "MSPointerUp" === r ? h["default"](n).off("pointermove", ".volume", o).off("pointerup", ".volume", i) : "touchend" === e.type ? h["default"](document).off("touchmove", o).off("touchend", i) : h["default"](document).off("mousemove", o).off("mouseup", i), se.setAttribute("tabindex", se.getAttribute("data-tabindex")), se.removeAttribute("data-tabindex")
                    }
                    function r(e) {
                        if (se) {
                            var t, n = 1 / le.length, o = e / n, i = Math.ceil(o), r = o % 1;
                            .33 >= r && (t = "fill1"), r > .33 && .66 >= r && (t = "fill2"), le.forEach(function(e, n) {
                                return e.classList.remove("fill0"), e.classList.remove("fill1"), e.classList.remove("fill2"), n === i - 1 && r && .66 >= r ? void e.classList.add(t) : void(n > i - 1 && e.classList.add("fill0"))
                            }), se.setAttribute("aria-valuenow", e.toFixed(3)), se.setAttribute("aria-valuetext", Math.round(100 * e) + "%")
                        }
                    }
                    function a(e) {
                        var t = se.getBoundingClientRect().left, n = se.getBoundingClientRect().right, o = n - t, i = e - t, r = i / o;
                        return s.limit(r, 0, 1)
                    }
                    h["default"](n).on("mouseover", ".volume div", function() {
                        var e = this;
                        e.classList.add("hover"), window.requestAnimationFrame(function() {
                            window.requestAnimationFrame(function() {
                                e.classList.remove("hover"), e.classList.add("animate")
                            })
                        })
                    }), h["default"](n).on("transitionend", ".volume div", function(e) {
                        "height" === e.propertyName && 12 === this.clientHeight && this.classList.remove("animate")
                    }), h["default"](document).on("contextmenu", ".volume", function() {
                        this.blur()
                    });
                    var d;
                    h["default"](n).on(g["default"].pointerEvents ? "pointerdown" : ["touchstart", "mousedown"], ".volume", e), t.on(l.Events.volumeChanged, function(e) {
                        !_e && le && r(e)
                    })
                }
                function U() {
                    t.on(l.Events.overlayOpened, function(e) {
                        if ("notsupported" !== e && "private-unlocked" !== e && "help" !== e)
                            we = !0, _();
                        else
                            for (var t = n.querySelectorAll("a, button, input, [tabindex]"), o = 0, i = t.length; i > o; o++) {
                                var r = t[o].getAttribute("tabindex");
                                r && t[o].setAttribute("data-tabindex", r), t[o].setAttribute("tabindex", "-1")
                            }
                    }).on(l.Events.overlayClosed, function() {
                        we = !1, L();
                        for (var e = n.querySelectorAll("[tabindex]"), t = 0, o = e.length; o > t; t++) {
                            var i = e[t].getAttribute("data-tabindex");
                            i && "null" !== i ? e[t].setAttribute("tabindex", i) : e[t].removeAttribute("tabindex"), e[t].removeAttribute("data-tabindex")
                        }
                    })
                }
                function z() {
                    t.on(l.Events.configChanged, function(t) {
                        e = t, A(), e.view === l.View.privateUnlocked && L(), Me = null, qe = null
                    })
                }
                function j() {
                    t.on(l.Control.reset, function() {
                        C(), L(), T()
                    }), h["default"](window).on("resize", function() {
                        Me = null, qe = null
                    })
                }
                function Y() {
                    t.on(l.Events.enteredTinyMode, function() {
                        $ = !0, pe && pe.classList.add("tiny")
                    }).on(l.Events.enteredMiniMode, function() {
                        $ = !1, pe && pe.classList.remove("tiny")
                    }).on(l.Events.enteredNormalMode, function() {
                        $ = !1, pe && pe.classList.remove("tiny")
                    })
                }
                var $, X, G, K, J, Z, Q, ee, te, ne, oe, ie, re, ae, se, le, de, ue, ce, fe, ve, pe, he = !0, me = !1, ge = !1, be = !1, we = !1, ye = !1, Ee = !1, ke = !1, _e = !1, Le = !1, xe = !1, Ce = !1, Te = !1, Pe = !0, Ae = !1, Se = !1, Me = null, qe = null, Oe = null, Re = !1;
                return A(), M(), R(), O(), B(), W(), F(), I(), V(), N(), D(), H(), U(), z(), j(), Y(), t.on(l.Events.playInitiated, function() {
                    q(), ge = !0;
                    var t = e.embed.time || e._video.currentTime;
                    d(t / e.video.duration, t), Ce = !0
                }), t.fire(l.Events.controlBarModuleReady), {}
            }
            e.__esModule = !0;
            var v = d(t), p = d(n), h = d(o), m = d(i), g = d(r), b = d(a);
            e["default"] = f, e.pad = u, e.formatTime = c
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(11), n(4), n(3), n(1)], i = function(e, t, n, o, i, r) {
            "use strict";
            function a(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function s(e, t, n) {
                function o() {
                    clearTimeout(_), _ = null
                }
                function i() {
                    M && (clearTimeout(_), _ = setTimeout(c, L))
                }
                function a() {
                    l["default"].element && l["default"].element === n && (T || (n.style.cursor = "none", C = !0, T = !0))
                }
                function s() {
                    T && (n.style.cursor = "default", T = !1)
                }
                function c(e) {
                    (A || P) && (o(), document.activeElement && (R.contains(document.activeElement) || B.contains(document.activeElement)) || (t.fire(e ? r.Events.mousedOut : r.Events.mouseTimeout), C = !0, O.classList.add("hidden"), O.setAttribute("hidden", ""), x = !0, a()))
                }
                function f() {
                    A && P || (t.fire(r.Events.mousedOver), O.classList.remove("hidden"), O.removeAttribute("hidden")), i()
                }
                function v() {
                    A || P ? n.removeAttribute("tabindex") : A || P || S || n.setAttribute("tabindex", "0")
                }
                function p() {
                    function e() {
                        t.fire(r.Control.checkSignatureExpiration), f()
                    }
                    function l(e) {
                        if (L = E, C)
                            return void(C = !1);
                        if (s(), 0 !== e.screenX && e.screenX !== screen.width - 1 && 0 !== e.screenY && e.screenY !== screen.height - 1)
                            w = !0, x && f(), i();
                        else if (o(), a(), w) {
                            var t = !0;
                            c(t), w = !1
                        }
                    }
                    function v() {
                        L = k, i()
                    }
                    function p() {
                        var e = !0;
                        c(e)
                    }
                    function h(e) {
                        var t = B.contains(e.target) || R.contains(e.target);
                        if (A && P) {
                            if (!t && (A || P)) {
                                var n = !0;
                                c(n)
                            }
                        } else
                            f();
                        return e.target === O || I.contains(e.target) ? !1 : void 0
                    }
                    function m(t) {
                        return"mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE ? (L = E, e(t)) : (L = k, void h(t))
                    }
                    function g(e) {
                        return"mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE ? l(e) : void 0
                    }
                    function b(e) {
                        return"mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE ? p(e) : void 0
                    }
                    var w = !0;
                    return u["default"].pointerEvents ? void d["default"](n).on("pointerenter", m).on("pointermove", g).on("pointerleave", b) : void d["default"](n).on("touchmove", v).on("touchend", h).on("mouseenter", e).on("mousemove", l).on("mouseleave", p)
                }
                function h() {
                    t.on([r.Events.ended, r.Events.played, r.Events.paused], f).on([r.Events.bufferEnded, r.Events.scrubbingEnded, r.Events.volumeChanged], i).on(r.Events.playInitiated, function() {
                        M = !0
                    }), t.on(r.Events.overlayOpened, v).on(r.Events.controlBarVisibilityChanged, function(e) {
                        P = e, v()
                    }).on(r.Events.sidedockVisibilityChanged, function(e) {
                        A = e, v()
                    })
                }
                function m() {
                    function o(e) {
                        return e.classList.contains("title") || e.classList.contains("sidedock") || e.classList.contains("target") || F.contains(e.parentNode) && "HEADER" === e.parentNode.tagName || I.contains(e)
                    }
                    function i(n) {
                        if (!s && 2 !== n.button && n.target.classList && o(n.target)) {
                            var i = "pointerup" === n.type || "MSPointerUp" === n.type;
                            i && "mouse" !== n.pointerType && n.pointerType !== n.MSPOINTER_TYPE_MOUSE || (l++, 1 === l && setTimeout(function() {
                                1 === l ? t.fire(e._video.paused ? r.Events.playButtonPressed : r.Events.pauseButtonPressed) : t.fire(r.Events.fullscreenButtonPressed), l = 0
                            }, 200))
                        }
                    }
                    var a = !1, s = !1, l = 0;
                    t.on(r.Events.menuVisibilityChanged, function(e) {
                        s = e
                    }), d["default"](n).on(u["default"].pointerEvents ? "pointerup" : "click", i), d["default"](n).on("mousedown", ".video-wrapper", function(e) {
                        if (!a) {
                            if (O.classList.remove("hidden"), O.removeAttribute("hidden"), 2 !== e.button) {
                                var t;
                                document.createEvent && (t = document.createEvent("MouseEvents"), t.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), O.dispatchEvent(t))
                            }
                            return!1
                        }
                    }).on("contextmenu", ".video", function(e) {
                        return O.classList.remove("hidden"), O.removeAttribute("hidden"), !1
                    }), t.on(r.Control.toggleNativeControls, function(e) {
                        return e ? (a = !0, void O.classList.add("hidden")) : (a = !1, void O.classList.remove("hidden"))
                    })
                }
                function g() {
                    if (!u["default"].touch) {
                        var e, o;
                        d["default"](n).on("focus", "a, button, input, [tabindex]", function() {
                            o = this, clearTimeout(e), e = null, document.activeElement === this && f()
                        }), d["default"](n).on("blur", "a, button, input, [tabindex]", function() {
                            document.activeElement === this && (e = setTimeout(c, 50))
                        }), n.addEventListener("focus", function(e) {
                            f(), o && o.focus()
                        }, !1), t.on(r.Events.overlayOpened, function() {
                            S = !0, n.removeAttribute("tabindex")
                        }), t.on(r.Events.overlayClosed, function() {
                            S = !1
                        })
                    }
                }
                function b() {
                    t.on(r.Events.didEnterFullscreen, a).on(r.Events.didExitFullscreen, function(e) {
                        return x = !0, e ? void c() : (f(), void o())
                    })
                }
                function w() {
                    t.on([r.Events.playProgress, r.Events.seeked], function e(n) {
                        n >= q && null === _ && (t.fire(r.Events.targetTimeReached), t.off([r.Events.playProgress, r.Events.seeked], e))
                    })
                }
                function y() {
                    t.on(r.Control.reset, function() {
                        x = !0, C = !0, P = !0, A = !1, M = !1, w(), o()
                    })
                }
                var E = 2e3, k = 4500, _ = null, L = u["default"].touch ? k : E, x = !0, C = !0, T = !1, P = !0, A = !1, S = !1, M = !1, q = 1.75, O = n.querySelector(".target"), R = n.querySelector(".sidedock"), B = n.querySelector(".controls"), F = n.querySelector(".title"), I = n.querySelector(".video");
                return p(), h(), m(), g(), b(), w(), y(), {}
            }
            var l = a(n), d = a(o), u = a(i);
            t.exports = s
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(2), n(1)], i = function(e, t, n, o) {
            "use strict";
            function i(e, t, i) {
                function s() {
                    return M ? !1 : e.view === o.View.main || e.view === o.View.privateUnlocked
                }
                function l() {
                    O && "help" === S && t.fire(o.Events.overlayCloseButtonPressed)
                }
                function d(e) {
                    return"number" != typeof e.which && (e.which = e.keyCode), e
                }
                function u(e) {
                    if ("keypress" === e.type) {
                        var t = String.fromCharCode(e.which);
                        return e.shiftKey || (t = t.toLowerCase()), t
                    }
                    return e.which in a ? a[e.which] : String.fromCharCode(e.which).toLowerCase()
                }
                function c(e) {
                    return e.ctrlKey || e.metaKey || e.altKey ? !1 : e.which in a ? "keydown" === e.type : "keypress" === e.type
                }
                function f(e) {
                    var t = e.target || e.srcElement;
                    return"INPUT" === t.tagName || "SELECT" === t.tagName || "TEXTAREA" === t.tagName || t.isContentEditable
                }
                function v(e) {
                    if (e = Array.isArray(e) ? e : [e], O && "help" === S) {
                        if (t.fire(o.Events.overlayCloseButtonPressed), e[0] === o.Control.showOverlay && "help" === e[1])
                            return!1;
                        if (e[0] !== o.Control.openVimeo)
                            return setTimeout(function() {
                                t.fire.apply(null, e)
                            }, 250), !1
                    }
                    return t.fire.apply(null, e), !1
                }
                function p(n, i) {
                    if (!D) {
                        i && !e._video.paused && t.fire(o.Events.pauseButtonPressed);
                        var r = !0;
                        t.fire(o.Events.scrubbingStarted, r), D = !0
                    }
                    g(N), N++, 1 === N && (V = e.video.fps);
                    var a = i ? 1 : V, s = "right" === n ? a : -a, l = Math["right" === n ? "ceil" : "floor"](e._video.currentTime * e.video.fps);
                    h(l + s)
                }
                function h(n) {
                    var i = null, r = n / e.video.fps;
                    t.fire(o.Control.seek, i, r);
                }
                function m(e) {
                    V = B, N = 0;
                    var n = e.shiftKey;
                    t.fire(o.Events.scrubbingEnded, n), D = !1
                }
                function g(e) {
                    var t = e, n = Math.ceil(B), o = Math.ceil(F - B), i = I;
                    V = b(t, n, o, i)
                }
                function b(e, t, n, o) {
                    return e /= o, e--, n * (e * e * e + 1) + t
                }
                function w(e) {
                    var t = R.focusableItems, n = t.indexOf(document.activeElement), o = "up" === e ? n - 1 : n + 1, i = null;
                    return i = o >= t.length ? t[0] : 0 > o ? t[t.length - 1] : t[o], i ? (i.focus(), !1) : !0
                }
                function y() {
                    return R ? !0 : document.activeElement && document.activeElement !== document.body ? void 0 : (t.fire(o.Events[e._video.paused ? "playButtonPressed" : "pauseButtonPressed"]), l(), !1)
                }
                function E() {
                    return R ? (R.element.contains(document.activeElement) && R.button.focus(), R.hide(), !1) : document.activeElement && i.contains(document.activeElement) ? (document.activeElement.blur(), !0) : O ? (t.fire(o.Events.overlayCloseButtonPressed), !1) : void 0
                }
                function k() {
                    if (R)
                        return R.element.contains(document.activeElement) ? w("up") : !0;
                    if (e.embed.on_site && document.activeElement && !i.contains(document.activeElement))
                        return!0;
                    l();
                    var n = !1, a = !0;
                    return t.fire(o.Control.changeVolume, r, n, a), !1
                }
                function _() {
                    if (R)
                        return R.element.contains(document.activeElement) ? w("down") : !0;
                    if (e.embed.on_site && document.activeElement && !i.contains(document.activeElement))
                        return!0;
                    l();
                    var n = !1, a = !0;
                    return t.fire(o.Control.changeVolume, -r, n, a), !1
                }
                function L(e, n) {
                    if (R)
                        return R.element.contains(document.activeElement) ? w("left" === n ? "up" : "down") : !0;
                    if (l(), document.activeElement && document.activeElement === q) {
                        var i = !1, a = !0, s = "left" === n ? -r : r;
                        return t.fire(o.Control.changeVolume, s, i, a), !1
                    }
                    return e.shiftKey || 0 === N ? void p(n, e.shiftKey) : void H(n, e.shiftKey)
                }
                function x() {
                    t.on(o.Events.overlayOpened, function(e) {
                        O = !0, S = e, "notsupported" === e && (M = !0)
                    }), t.on(o.Events.overlayClosed, function() {
                        O = !1, S = null
                    })
                }
                function C() {
                    t.on(o.Events.menuVisibilityChanged, function(e, t) {
                        R = e ? t : !1
                    })
                }
                function T() {
                    t.on(o.Events.configChanged, function(t, n) {
                        e = t, n && (M = !1)
                    })
                }
                function P() {
                    function t(e) {
                        if (d(e), c(e) && !f(e) && s()) {
                            var t = u(e);
                            if (t in i) {
                                if ("function" == typeof i[t])
                                    return void(i[t](e, t) === !1 && (e.preventDefault(), e.stopPropagation()));
                                v(i[t]) === !1 && (e.preventDefault(), e.stopPropagation())
                            }
                        }
                    }
                    function n(e) {
                        if (d(e), !f(e) && s()) {
                            var t = u(e);
                            ("left" === t || "right" === t) && m(e)
                        }
                    }
                    var i = {l: o.Events.likeButtonPressed, w: o.Events.watchLaterButtonPressed, s: o.Events.shareButtonPressed, c: [o.Events.ccButtonPressed, !0], h: o.Events.hdButtonPressed, f: o.Events.fullscreenButtonPressed, space: y, up: k, down: _, left: L, right: L, esc: E, "?": [o.Control.showOverlay, "help"]};
                    e.embed.on_site || (i.v = o.Control.openVimeo), document.addEventListener("keydown", t, !1), document.addEventListener("keypress", t, !1), document.addEventListener("keyup", n, !1)
                }
                function A() {
                    t.on(o.Events.becameActive, function() {
                        M = !1
                    }).on(o.Events.becameInactive, function() {
                        M = !0
                    }), e.embed.on_site && document.querySelector(".player") === i && (M = !1)
                }
                var S, M = !!e.embed.on_site, q = i.querySelector(".volume"), O = !1, R = !1, B = e.video.fps / 5, F = Math.max(B, .618 * e.video.duration), I = 100, V = B, N = 0, D = !1, H = n.throttle(p, 80);
                return x(), C(), T(), P(), A(), {pause: function() {
                        M = !0
                    }, unpause: function() {
                        M = !1
                    }}
            }
            var r = .05, a = {16: "shift", 27: "esc", 32: "space", 37: "left", 38: "up", 39: "right", 40: "down"};
            t.exports = i
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(11), n(1)], i = function(e, t, n, o) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function r(e, t) {
                function n() {
                    L = !1, x = !1, C = !1, y = i(), E = e.request.urls.blurr
                }
                function i() {
                    return parseInt(Date.now() / 1e3, 10)
                }
                function r() {
                    return Date.now ? Date.now() : (new Date).getTime()
                }
                function s(e) {
                    return r() - e
                }
                function l(e) {
                    return i() - e
                }
                function d() {
                    var t = document.createElement("a");
                    return t.href = e.request.referrer, t.origin || t.protocol.replace(":", "") + "://" + t.host
                }
                function u() {
                    _ = !0, setTimeout(c, k)
                }
                function c(e) {
                    var t = !0;
                    if (e && (t = !1, L && !x)) {
                        var n = s(m);
                        n >= 1e3 && v("video-exit-before-start", {time: n / 1e3})
                    }
                    var o = w;
                    if (w = [], 0 === o.length)
                        return void u();
                    var i = JSON.stringify(o);
                    if (navigator.sendBeacon && navigator.sendBeacon(E, i))
                        return void u();
                    var r = new XMLHttpRequest;
                    r.open("POST", E, t), r.setRequestHeader("Content-Type", "text/plain"), r.onload = function() {
                    }, r.send(i), u()
                }
                function f() {
                    var t = e._video.currentFile || e._video.previousFile;
                    return e._video.currentFile || (t.id = 0, t.profile = -1), {clip_id: e.video.id, video_file_id: t.id || 0, delivery: t.hls ? "hls" : "progressive", profile_id: t.profile || -1, player_type: "html", autoplay: e.embed.autoplay, cdn: t.cdn || "akamai", origin: t.origin, secure: t.url && 0 === t.url.indexOf("https"), vod: e.video.vod ? 1 : 0, embed: !e.embed.on_site}
                }
                function v(t, n) {
                    var o = f();
                    for (var i in n)
                        n.hasOwnProperty(i) && (o[i] = n[i]);
                    o.name = t, o.event_time = e.request.timestamp + l(y), w.push(o), _ || u()
                }
                function p() {
                    e.request.flags.blurr && E && (t.on(o.Events.playInitiated, function() {
                        L || (v("video-start-attempt"), L = !0, m = r(), v("video-fullscreen-enabled", {enabled: a["default"].enabled, referrer: d()}))
                    }), t.on(o.Events.playProgress, function() {
                        if (!x) {
                            x = !0;
                            var e = s(m) / 1e3;
                            v("video-start-time", {time: e})
                        }
                    }), t.on(o.Events.bufferStarted, function() {
                        g || (b = e._video.currentTime, g = r())
                    }), t.on(o.Events.bufferEnded, function() {
                        return x ? (v("video-buffered", {time: s(g) / 1e3, video_time: b}), void(g = null)) : void(g = null)
                    }), t.on(o.Events.error, function(t) {
                        if (L) {
                            var n = ["not-supported", "decode", "network", "unknown"], o = -1 !== n.indexOf(t);
                            return x ? void(o && v("video-playback-error", {type: t, video_time: e._video.currentTime})) : void(o && v("video-start-failure", {type: t}))
                        }
                    }), t.on(o.Events.didEnterFullscreen, function(e, t) {
                        C || (v("video-enter-fullscreen", {fullPlayer: e, requested: t, referrer: d()}), C = !0)
                    }), window.addEventListener("beforeunload", c, !1))
                }
                function h() {
                    t.on(o.Events.configChanged, function(t) {
                        e = t, n()
                    })
                }
                var m, g, b, w = [], y = i(), E = e.request.urls.blurr, k = 3e4, _ = !1, L = !1, x = !1, C = !1;
                return p(), h(), {}
            }
            var a = i(n);
            t.exports = r
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(5), n(4), n(3), n(1)], i = function(e, t, n, o, i, r) {
            "use strict";
            function a(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function s(e, t, n) {
                function o(e) {
                    var t = "watchlater" === e || "unwatchlater" === e ? .5 : .4, o = n.clientHeight;
                    return n.clientHeight > n.clientWidth && (o = n.clientWidth), {height: Math.round(o * t), width: Math.round(o * t * 1.6)}
                }
                function i(e, t) {
                    var n = e.querySelector(".hour-hand"), o = e.querySelector(".minute-hand");
                    if (n && o) {
                        var i = t ? 1 : -1, r = new Date, a = Math.abs(r.getHours() - 12), s = r.getMinutes(), l = s / 60 * 360 - 135, d = a / 12 * 360 + s / 60 * 5, c = 1.5, f = d + 30 * c * i, v = l + 360 * c * i;
                        if (u["default"].browser.firefox || u["default"].browser.opera) {
                            var p = "10 10";
                            n.setAttribute("transform", "rotate(" + d + "," + p + ")"), o.setAttribute("transform", "rotate(" + l + "," + p + ")");
                            var h = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
                            h.setAttribute("attributeName", "transform"), h.setAttribute("type", "rotate"), h.setAttribute("begin", "0.1s"), h.setAttribute("repeatCount", "indefinite");
                            var m = h.cloneNode(!1);
                            m.setAttribute("from", d + " " + p), m.setAttribute("to", d + 360 * i + " " + p), m.setAttribute("dur", "0.8s"), n.appendChild(m);
                            var g = h.cloneNode(!1);
                            g.setAttribute("from", l + " " + p), g.setAttribute("to", l + 360 * i + " " + p), g.setAttribute("dur", "9.6s"), o.appendChild(g)
                        } else
                            n.style[u["default"].transformProperty + "Origin"] = "46% 81.5%", o.style[u["default"].transformProperty + "Origin"] = "25.5% 26.5%", n.style[u["default"].transformProperty] = "rotate(" + d + "deg)", o.style[u["default"].transformProperty] = "rotate(" + l + "deg)";
                        window.requestAnimationFrame(function() {
                            e.classList.add("animate"), u["default"].browser.firefox || u["default"].browser.opera || window.requestAnimationFrame(function() {
                                n.style[u["default"].transformProperty] = "rotate(" + f + "deg)", o.style[u["default"].transformProperty] = "rotate(" + v + "deg)"
                            })
                        })
                    }
                }
                function a(e, t) {
                    n.classList.remove("hidden"), n.removeAttribute("hidden"), n.setAttribute("data-name", e);
                    var r = o(e), a = "width:" + r.width + "px;height:" + r.height + "px";
                    b.style.cssText = a, b.innerHTML = t, ("watchlater" === e || "unwatchlater" === e) && i(b, "watchlater" === e), "hd" === e && (b.querySelector(".hd-notification").style.cssText = a, b.querySelector(".hd-fill").style.cssText = a), clearTimeout(g), n.classList.remove("animate"), window.requestAnimationFrame(function() {
                        n.classList.remove("invisible"), "hd" !== e && (g = setTimeout(s, 750))
                    })
                }
                function s() {
                    n.classList.add("animate"), n.classList.add("invisible")
                }
                function c() {
                    n.classList.remove("animate"), n.classList.remove("invisible"), n.classList.add("hidden"), n.setAttribute("hidden", ""), n.removeAttribute("data-name"), b.innerHTML = "", b.classList.remove("filled"), b.classList.remove("animate"), t.fire(r.Events.notificationHidden)
                }
                function f() {
                    t.on(r.Events.liked, function(e) {
                        e || a("like", l["default"].render("icon_heart"))
                    }), t.on(r.Events.unliked, function(e) {
                        e || a("unlike", l["default"].render("icon_broken_heart"))
                    })
                }
                function v() {
                    t.on(r.Events.addedToWatchLater, function(e) {
                        e || a("watchlater", l["default"].render("icon_clock"))
                    }), t.on(r.Events.removedFromWatchLater, function(e) {
                        e || a("unwatchlater", l["default"].render("icon_clock"))
                    })
                }
                function p() {
                    t.on(r.Control.changeQuality, function(e, t) {
                        t || ("sd" === e && b.classList.add("filled"), window.requestAnimationFrame(function() {
                            a("hd", l["default"].render("hd_notification", {stroke: l["default"].render("icon_hd", {stroke: !0, notification: !0}), fill: l["default"].render("icon_hd", {notification: !0})}), !0), window.requestAnimationFrame(function() {
                                "sd" === e ? b.classList.remove("filled") : b.classList.add("filled")
                            })
                        }))
                    })
                }
                function h() {
                    d["default"](n).on("transitionend", function(e) {
                        b.contains(e.target) && "height" === e.propertyName ? setTimeout(s, 100) : e.target === n && "opacity" === e.propertyName && window.requestAnimationFrame(c)
                    })
                }
                function m() {
                    t.on(r.Events.configChanged, function(t) {
                        e = t
                    })
                }
                var g, b = n.querySelector(".notification");
                return h(), f(), v(), p(), m(), t.fire(r.Events.notificationModuleReady), {}
            }
            var l = a(n), d = a(o), u = a(i);
            t.exports = s
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(5), n(4), n(7), n(1)], i = function(e, t, n, o, i, r) {
            "use strict";
            function a(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function s(e, t, n) {
                function o(t) {
                    if ("vod" === e.embed.outro)
                        return y = {purchased: e.user.purchased, title: e.video.vod.feature_title, url: e.video.vod.url, buttons: e.video.vod.purchase_options, preorder: e.video.vod.date_available}, void(E === !0 && c());
                    _ = !0;
                    var n = new XMLHttpRequest;
                    n.open("GET", "//" + e.player_url + "/video/" + e.video.id + "/outro?on_site=" + e.embed.on_site, !0), n.withCredentials = !0, n.onload = function() {
                        try {
                            var o = JSON.parse(n.response);
                            y = o.data, ("videos" === o.type || "promoted" === o.type) && (y = {contexts: Array.isArray(y) ? y : [y], owner: e.video.owner.id}, a()), "function" == typeof t && t()
                        } catch (i) {
                        }
                    }, n.send()
                }
                function i(e) {
                    for (var t = e.innerHTML; e.scrollHeight > e.offsetHeight; )
                        t = t.substring(0, t.length - 1), e.innerHTML = t + "&hellip;"
                }
                function a() {
                    for (var e = 0, t = y.contexts.length; t > e; e++)
                        for (var n = 0, o = y.contexts[e].videos.length; o > n; n++) {
                            var i = new Image;
                            i.src = y.contexts[e].videos[n].thumbnail
                        }
                }
                function s() {
                    var e = window.getComputedStyle(w.querySelector("header h1"), null), t = e.getPropertyValue("-webkit-line-clamp"), n = e.textOverflow;
                    if (!t)
                        for (var o = w.querySelectorAll("header h1"), r = 0, a = o.length; a > r; r++)
                            "clip" === n ? i(o[r]) : o[r].style.display = "inherit"
                }
                function c() {
                    if ("beginning" === e.embed.outro)
                        return void t.fire(r.Control.reset);
                    if (null === y && !_)
                        return void o(c);
                    if (y) {
                        if ("videos" === e.embed.outro || "promoted" === e.embed.outro) {
                            var i = y.contexts.reduce(function(e, t) {
                                return e + t.videos.length
                            }, 0);
                            if (0 === i)
                                return
                        }
                        y.target = !e.embed.on_site, w.innerHTML = l["default"].render("outro_" + ("promoted" === e.embed.outro ? "videos" : e.embed.outro), y), w.setAttribute("data-type", e.embed.outro), n.classList.remove("hidden"), n.removeAttribute("hidden"), "videos" === e.embed.outro && s(), window.requestAnimationFrame(function() {
                            window.requestAnimationFrame(function() {
                                n.classList.add("in");
                                var e = [];
                                if (y.contexts)
                                    for (var o = 0; o < y.contexts.length; o++)
                                        for (var i = 0; i < y.contexts[o].videos.length; i++) {
                                            var a = y.contexts[o].videos[i].id, s = w.querySelector('[data-video-id="' + a + '"]');
                                            s && s.clientWidth > 0 && e.push(a)
                                        }
                                t.fire(r.Events.outroDisplayed, e)
                            })
                        })
                    }
                }
                function f() {
                    window.requestAnimationFrame(function() {
                        n.classList.remove("in"), t.fire(r.Events.outroHidden)
                    })
                }
                function v() {
                    t.on(r.Events.playProgress, function(e, t, n) {
                        E = !1, !_ && null === y && e >= t - k && o()
                    })
                }
                function p() {
                    t.on(r.Events.playInitiated, function() {
                        ("nothing" === e.embed.outro || "beginning" === e.embed.outro) && (y = !1)
                    }), t.on(r.Events.ended, function() {
                        E = !0, c()
                    }), d["default"](n).on("click", ".videos a", function(e) {
                        t.fire(r.Events.outroVideoPressed, parseInt(this.getAttribute("data-video-id"), 10))
                    }), d["default"](n).on("transitionend", function(e) {
                        n.classList.contains("in") || (n.classList.add("hidden"), n.setAttribute("hidden", ""))
                    }, !1), t.on([r.Events.played, r.Events.seeked, r.Events.scrubbingStarted], f)
                }
                function h() {
                    t.on(r.Control.showOverlay, function() {
                        setTimeout(function() {
                            n.classList.add("hidden")
                        }, 150)
                    }), t.on(r.Events.overlayClosed, function() {
                        n.classList.contains("in") && n.classList.remove("hidden")
                    })
                }
                function m() {
                    t.on(r.Control.reset, function() {
                        y = null, _ = !1
                    })
                }
                function g() {
                    t.on(r.Events.configChanged, function(t) {
                        e = t
                    })
                }
                function b() {
                    u["default"](n, ".vod-button", function() {
                        var e = this.getAttribute("data-product-id");
                        return t.fire(r.Events.vodButtonPressed, e), !1
                    }), u["default"](n, ".vod-watch-button", function() {
                        return"date_available"in e.video.vod ? void 0 : (f(), t.fire(r.Events.vodButtonPressed), !1)
                    })
                }
                var w = n.querySelector(".outro"), y = null, E = !1, k = 10, _ = !1;
                return v(), p(), h(), m(), g(), b(), {}
            }
            var l = a(n), d = a(o), u = a(i);
            t.exports = s
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(5), n(4), n(3), n(1), n(7), n(2)], i = function(e, t, n, o, i, r, a, s) {
            "use strict";
            function l(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function d() {
                return h[Math.floor(Math.random() * h.length)]
            }
            function u(e, t, n) {
                function o() {
                    var e = n.getBoundingClientRect(), t = ee.getBoundingClientRect(), o = oe.getBoundingClientRect(), i = t.bottom + (e.height - t.bottom) / 2;
                    return e.height - i - o.height / 2 + "px"
                }
                function i() {
                    var e = n.getBoundingClientRect(), t = ee.getBoundingClientRect(), o = te.getBoundingClientRect(), i = e.height / 2, r = t.bottom + (e.height - t.bottom) / 2;
                    return{top: i - o.height / 2 + "px", transform: "translateY(" + (r - i) + "px)"}
                }
                function a(e, a) {
                    n.setAttribute("data-name", e), ee.innerHTML = a.template, Z = document.activeElement, Z.blur(), a.modal && m(), a.wrapperClass && n.classList.add(a.wrapperClass), a.icon.type && (a.logo && (oe.classList.remove("hidden"), te.classList.add("cloaked"), window.requestAnimationFrame(function() {
                        oe.innerHTML = c["default"].render("logo"), oe.style.bottom = o()
                    })), te.classList.remove("hidden"), ne.innerHTML = a.icon.html, window.requestAnimationFrame(function() {
                        var e = i();
                        te.style.top = e.top, te.style[v["default"].transformProperty] = e.transform
                    }), n.setAttribute("data-icon", a.icon.type), te.setAttribute("data-icon", a.icon.type), ne.setAttribute("data-icon", a.icon.type), "private-unlocked" === e && ne.classList.add("open")), n.classList.add("invisible"), n.classList.remove("hidden"), n.removeAttribute("hidden"), n.classList.add("in"), ae = a, re = e, ie = !0, t.fire(r.Events.overlayOpened, e), ["share", "hd-not-allowed"].indexOf(e) > -1 && s.resetFocus(n), window.requestAnimationFrame(function() {
                        n.classList.remove("invisible"), window.requestAnimationFrame(function() {
                            ee.classList.add("in"), Q.classList.add("in")
                        })
                    })
                }
                function l() {
                    ee.classList.remove("in"), ee.classList.add("out")
                }
                function u(e) {
                    if (!b() && ie) {
                        Q.classList.remove("in"), Q.classList.add("out"), l(), n.classList.remove("in"), n.classList.add("out"), clearTimeout(K), K = setTimeout(h, 200), e && e.preventDefault && e.preventDefault();
                        var o = n.querySelector(".back");
                        o && o.classList.add("cloaked"), t.fire(r.Events.overlayClosed), ie = !1, re = null, ae = null, window.requestAnimationFrame(function() {
                            Z && (Z.focus(), Z = null)
                        })
                    }
                }
                function h() {
                    n.setAttribute("hidden", ""), n.removeAttribute("data-name"), n.removeAttribute("data-icon"), n.classList.add("hidden"), n.classList.remove("out"), n.classList.remove("embed-active"), n.classList.remove("modal"), n.classList.remove("embed-only"), Q.classList.remove("out"), Q.classList.remove("in"), te.removeAttribute("data-icon"), te.classList.add("hidden"), te.classList.remove("animate"), ne.removeAttribute("data-icon"), ne.innerHTML = "", oe.classList.add("hidden"), ee.classList.remove("out"), ee.innerHTML = "", t.fire(r.Events.overlayCleared)
                }
                function m() {
                    n.classList.add("modal"), n.setAttribute("data-modal", "true")
                }
                function g() {
                    n.setAttribute("data-modal", "false")
                }
                function b() {
                    return"true" === n.getAttribute("data-modal")
                }
                function w(e) {
                    if ("yes" === e.form.getAttribute("data-bubble")) {
                        e.form.setAttribute("data-bubble", "no");
                        var t = n.querySelector(".validation-bubble"), o = t.querySelector(".validation-bubble-message");
                        o.innerHTML = e.validationMessage || "There is an error with this input.";
                        var i = e.getBoundingClientRect(), r = e.form.getBoundingClientRect();
                        t.style.left = i.left - r.left + "px", t.style.top = i.height + 1 + "px", t.classList.remove("hidden"), e.focus(), window.requestAnimationFrame(function() {
                            t.classList.add("animate")
                        }), y()
                    }
                }
                function y(e) {
                    var t = n.querySelector(".validation-bubble");
                    if (t) {
                        if (e)
                            return clearTimeout(J), t.classList.remove("animate");
                        clearTimeout(J), J = setTimeout(function() {
                            t.classList.remove("animate")
                        }, 5e3)
                    }
                }
                function E(e) {
                    var t = n.querySelector("input[type=password]");
                    return t.form.classList.contains("submitted") ? (t.setAttribute("aria-invalid", "false"), t.setCustomValidity(""), t.checkValidity && !t.checkValidity() ? (t.setAttribute("aria-invalid", "true"), t.validity.valueMissing && t.setCustomValidity("Please enter the password."), e || w(t), !1) : (y(!0), !0)) : null
                }
                function k(e, t, o) {
                    s.resetFocus(n);
                    var i = Array.prototype.slice.call(e.querySelectorAll("input"), 0), r = i.map(function(e) {
                        return e.name ? encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) : void 0
                    }).join("&"), a = new XMLHttpRequest;
                    a.open(e.method, e.action + window.location.search, !0), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.withCredentials = !0, a.timeout = 3e3, a.onload = function() {
                        var e;
                        try {
                            e = JSON.parse(a.responseText)
                        } catch (n) {
                        }
                        t(e, a)
                    }, a.onerror = function(e) {
                        o(e)
                    }, a.send(r)
                }
                function _() {
                    L(), C(), g(), l()
                }
                function L() {
                    oe.classList.add("animate")
                }
                function x() {
                    oe.classList.add("hidden"), oe.classList.remove("animate")
                }
                function C() {
                    te.classList.remove("cloaked"), te.classList.add("animate"), window.requestAnimationFrame(function() {
                        te.style[v["default"].transformProperty] = "translateY(-10px)"
                    })
                }
                function T() {
                    te.classList.add("centered"), te.style[v["default"].transformProperty] = ""
                }
                function P() {
                    ne.classList.add("open")
                }
                function A() {
                    ne.classList.add("pulled-back")
                }
                function S() {
                    ne.classList.add("out"), ne.classList.remove("pulled-back")
                }
                function M() {
                    f["default"](n).on("transitionend", ".overlay-logo", function(e) {
                        "opacity" === e.propertyName && this.classList.contains("animate") && x()
                    }), f["default"](n).on("transitionend", ".overlay-icon-wrapper", function(e) {
                        e.propertyName.indexOf("transform") > -1 && ("" === this.style[v["default"].transformProperty] ? (this.classList.remove("centered"), "lock" !== this.getAttribute("data-icon") || ne.classList.contains("open") || ne.querySelector("canvas") ? A() : setTimeout(P, 100)) : "translateY(-10px)" === this.style[v["default"].transformProperty] && T())
                    }), f["default"](n).on("transitionend", ".overlay-icon", function(e) {
                        e.propertyName.indexOf("transform") > -1 && (this.classList.contains("out") ? (g(), u()) : this.classList.contains("pulled-back") ? S() : this.classList.contains("open") && A())
                    })
                }
                function q() {
                    return{modal: !1, template: null, logo: !1, icon: {type: null, html: null}}
                }
                function O(t, n) {
                    return t.template = c["default"].render("share", {url: e.video.url, shareUrl: e.video.share_url, playerShareUrl: "//" + e.player_url + "/video/" + e.video.id + "/share", title: e.video.title, owner: e.video.owner.name, embed: "public" === e.video.embed_permission && e.embed.settings.embed, embedOnly: e.embed.settings.share && e.embed.settings.share.embed_only, embedCode: e.video.embed_code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), copyButton: se || v["default"].flash.installed, customizeEmbed: !!e.video.url, readOnly: !v["default"].touch}), e.embed.settings.share && e.embed.settings.share.embed_only && (t.wrapperClass = "embed-only"), t
                }
                function R(t) {
                    var n = "Private Video", o = "Log in to watch (if you have permission).";
                    return t.icon = {type: "lock", html: c["default"].render("icon_lock")}, t.modal = !0, t.logo = !0, t.template = c["default"].render("private_locked", {title: n, subtitle: o, action: ("dev" === e.build.rpc ? "http" : "https") + "://" + e.vimeo_url + "/log_in"}), t
                }
                function B(t) {
                    return t.icon = {type: "hd", html: c["default"].render("icon_hd")}, t.template = c["default"].render("hd_not_allowed", {title: "Sorry, HD not available here", subtitle: "Watch this video in HD on Vimeo.com", button: "Watch in HD now", url: e.video.url}), t
                }
                function F(t) {
                    return t.icon = {type: "lock", html: c["default"].render("icon_lock")}, t.template = c["default"].render("password", {title: "Password Required", subtitle: "If you&rsquo;ve got it, enter it below.", action: "//" + e.player_url + "/video/" + e.video.id + "/check-password"}), t.modal = !0, t.logo = !!e.embed.settings.branding, t
                }
                function I(e) {
                    return e.icon = {type: "lock", html: c["default"].render("icon_lock")}, e.template = c["default"].render("private_unlocked"), e
                }
                function V(e) {
                    return e.template = c["default"].render("content_rating", {logo: c["default"].render("logo")}), e.modal = !0, e
                }
                function N(e, t) {
                    return e.template = c["default"].render("error", {title: t.title, message: t.message}), e.modal = !!t.modal, e.logo = !!t.logo, t.icon && "lock" === t.icon && (e.icon = {type: "lock", html: c["default"].render("icon_lock")}), e
                }
                function D(t) {
                    return t.template = c["default"].render("help", {onSite: e.embed.on_site}), t
                }
                function H() {
                    t.on(r.Control.showOverlay, function(e, n) {
                        se = document.queryCommandSupported && document.queryCommandSupported("copy");
                        var o = function() {
                            var t = q();
                            switch (e) {
                                case"share":
                                    return a(e, O(t, n));
                                case"private-locked":
                                    return a(e, R(t));
                                case"hd-not-allowed":
                                    return a(e, B(t));
                                case"password":
                                    return a(e, F(t));
                                case"private-unlocked":
                                    return a(e, I(t));
                                case"error":
                                    return a(e, N(t, n));
                                case"help":
                                    return a(e, D(t));
                                case"content-rating":
                                    return a(e, V(t))
                            }
                        };
                        return ie ? "share" !== re && "help" !== re && "hd-not-allowed" !== re || re !== e ? (t.once(r.Events.overlayCleared, o), g(), void u()) : void u() : void o()
                    }), f["default"](n).on("input", "input", function() {
                        this.form.classList.add("interacted")
                    }).on(["focus", "blur"], "input", function() {
                        y(!0)
                    }).on("transitionend", ".validation-bubble", function(e) {
                        "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && this.classList.add("hidden")
                    }), t.on([r.Events.overlayCloseButtonPressed, r.Events.played], u), t.on(r.Events.privateUnlocked, function() {
                        "private-locked" === re && (g(), u())
                    }), t.on(r.Events.configChanged, function(e) {
                        "share" === re && (ae = O(q(), e.embed.settings.share.embed_only), ee.innerHTML = ae.template)
                    }), f["default"](window).on("resize", function() {
                        if (ie) {
                            oe.style.bottom = o();
                            var e = i();
                            te.style.top = e.top, te.style[v["default"].transformProperty] = e.transform
                        }
                    })
                }
                function W() {
                    function o() {
                        t.fire(r.Events.embedCodeCopied);
                        var e = document.querySelector(".embed-copy");
                        e.innerHTML = "Copied!", clearTimeout(i), i = setTimeout(function() {
                            e.innerHTML = "Copy"
                        }, 2e3)
                    }
                    var i;
                    f["default"](n).on("transitionend", ".share-screen", function(e) {
                        "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && this.classList.add("cloaked")
                    }).on("transitionend", ".embed-screen", function(e) {
                        "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && (n.querySelector(".back").classList.add("cloaked"), this.classList.add("cloaked"), s.resetFocus(n))
                    }).on("copy", "input[name=embed_code]", function() {
                        t.fire(r.Events.embedCodeCopied)
                    }), p["default"](n, ".back", function() {
                        return n.querySelector(".share-screen").classList.remove("cloaked"), n.classList.remove("embed-active"), !1
                    }), p["default"](n, ".facebook", function() {
                        t.fire(r.Events.facebookButtonPressed, this.href);
                        try {
                            document.activeElement.blur()
                        } catch (e) {
                        }
                        return!1
                    }), p["default"](n, ".twitter", function() {
                        t.fire(r.Events.twitterButtonPressed, this.href);
                        try {
                            document.activeElement.blur()
                        } catch (e) {
                        }
                        return!1
                    }), p["default"](n, ".tumblr", function() {
                        t.fire(r.Events.tumblrButtonPressed, this.href);
                        try {
                            document.activeElement.blur()
                        } catch (e) {
                        }
                        return!1
                    }), p["default"](n, ".email", function() {
                        t.fire(r.Events.emailButtonPressed), window.location = this.href;
                        try {
                            document.activeElement.blur()
                        } catch (e) {
                        }
                        return!1
                    }), p["default"](n, ".embed", function() {
                        t.fire(r.Events.embedButtonPressed);
                        try {
                            document.activeElement.blur()
                        } catch (e) {
                        }
                        return!1
                    }), p["default"](n, ".embed-copy", function() {
                        if (se) {
                            var e = document.querySelector("input[name=embed_code]");
                            e.select();
                            try {
                                document.execCommand("copy") && o()
                            } catch (t) {
                            }
                            return document.activeElement.blur(), !1
                        }
                    }), v["default"].touch ? f["default"](ee).on("focus", "input[name=embed_code]", function() {
                        var e = this;
                        setTimeout(function() {
                            e.setSelectionRange(0, 9999), e.setAttribute("readonly", "readonly")
                        }, 0)
                    }).on("blur", "input", function() {
                        this.removeAttribute("readonly")
                    }) : f["default"](ee).on("click", "input[name=embed_code]", function() {
                        this.setSelectionRange(0, 9999)
                    }), t.on(r.Events.facebookButtonPressed, function(e) {
                        s.openWindow(e, "facebook", {width: 580, height: 400})
                    }).on(r.Events.twitterButtonPressed, function(e) {
                        s.openWindow(e, "twitter", {width: 550, height: 420})
                    }).on(r.Events.tumblrButtonPressed, function(e) {
                        s.openWindow(e, "tumblr", {width: 540, height: 600})
                    }).on(r.Events.embedButtonPressed, function() {
                        function t() {
                            var t = document.querySelector(".embed-copy"), n = new ZeroClipboard(t, {moviePath: e.request.urls.zeroclip_swf, trustedDomains: ["*"], allowScriptAccess: "always"});
                            n.on("complete", o)
                        }
                        if (e.embed.settings.share.embed_only || (n.querySelector(".back").classList.remove("cloaked"), n.querySelector(".embed-screen").classList.remove("cloaked"), n.classList.add("embed-active")), !se && v["default"].flash.installed) {
                            var i = "zc_script_loaded";
                            if (!document.getElementById(i)) {
                                var r, a = document.createElement("script");
                                return a.setAttribute("id", i), a.setAttribute("src", e.request.urls.zeroclip_js), a.onreadystatechange = a.onload = function() {
                                    r || t(), r = !0
                                }, void document.getElementsByTagName("head")[0].appendChild(a)
                            }
                            t()
                        }
                    })
                }
                function U() {
                    f["default"](ee).on("click", ".popup", function() {
                        return t.fire(r.Control.openPopup, "login-private-locked"), !1
                    })
                }
                function z() {
                    function e(e) {
                        function n(e, n) {
                            return e === !1 ? void o(n.status, n) : (t.fire(r.Events.passwordUnlocked, e), "icon-hidden" === window.getComputedStyle(Q, ":after").content ? (g(), void u()) : void _())
                        }
                        function o(e) {
                            s.classList.remove("loading"), a.setCustomValidity("Uh oh. There was a problem. Please try again."), a.setAttribute("aria-invalid", "true"), w(a)
                        }
                        var i = E();
                        if (!i)
                            return!1;
                        var a = e.querySelector("input[type=password]"), s = e.querySelector("input[type=submit]");
                        s.classList.add("loading"), k(e, n, o)
                    }
                    f["default"](ee).on("click", ".password input[type=submit]", function() {
                        this.form.classList.add("submitted"), this.form.setAttribute("data-bubble", "yes"), E(!0)
                    }).on("submit", ".password form", function() {
                        return e(this), !1
                    }).on(["focus", "input"], [".password input[type=email]", ".password input[type=password]"], function() {
                        E()
                    })
                }
                function j() {
                    p["default"](ee, ".unlocked button", function() {
                        _(), v["default"].iPad || v["default"].iPhone || t.once(r.Events.overlayCleared, function() {
                            t.fire(r.Events.playButtonPressed)
                        })
                    })
                }
                function Y() {
                    p["default"](ee, ".content-rating button", function() {
                        g(), u()
                    })
                }
                function $() {
                    var n = function(e, t, n) {
                        var o = window.location.search.indexOf("partypooper=1") > -1 || window.location.search.indexOf("fun=0") > -1;
                        switch (e) {
                            case"no-files":
                                return{name: "notsupported", title: o ? "Sorry" : d(), message: "There was an error loading the files for this video."};
                            case"not-supported":
                                return{name: "notsupported", title: o ? "Sorry" : d(), message: n > .5 ? "There was an issue playing this video." : "This video can&rsquo;t be played with your current setup."};
                            case"decode":
                                return{name: "decode", title: "Oops!", message: "There was a problem with this video."};
                            default:
                                return{name: e, title: t && t.title || "Sorry", message: t && t.message || "There was an issue with playback."}
                        }
                    };
                    t.on(r.Events.error, function(o, i) {
                        var s = n(o, i, e._video.currentTime), l = s.name, d = s.title, f = s.message, v = q();
                        return v.modal = i && i.modal || !0, v.template = c["default"].render("error", {title: d, message: f}), ie ? (u(), void t.once(r.Events.overlayClosed, function() {
                            a(l, v)
                        })) : void a(l, v)
                    })
                }
                function X() {
                    t.on(r.Events.configChanged, function(t) {
                        e = t, window.requestAnimationFrame(function() {
                            g(), u()
                        })
                    })
                }
                function G() {
                    p["default"](n, ".close", function() {
                        t.fire(r.Events.overlayCloseButtonPressed)
                    }), f["default"](n).on(["click", "touchend"], [".window-wrapper", ".share-wrapper", ".overlay-logo"], function(e) {
                        e.stopPropagation()
                    }).on(["click", "touchend"], [".overlay-cell", "nav"], function() {
                        return t.fire(r.Events.overlayCloseButtonPressed), !1
                    })
                }
                var K, J, Z, Q = n.querySelector(".overlay-cell"), ee = n.querySelector(".overlay"), te = n.querySelector(".overlay-icon-wrapper"), ne = te.querySelector(".overlay-icon"), oe = n.querySelector(".overlay-logo"), ie = !1, re = null, ae = null, se = !1;
                return H(), M(), W(), U(), z(), j(), Y(), $(), X(), G(), t.fire(r.Events.overlayModuleReady), {}
            }
            var c = l(n), f = l(o), v = l(i), p = l(a), h = ["Uh Oh!", "D&rsquo;Oh!", "Aw fiddlesticks!", "Jeepers!", "Oh dear!", "Ouch!", "Zoinks!", "Awww, snap!", "Blast!", "Curses!", "ACK!", "Aw shucks.", "Major bummer.", "Dag-nab-it!", "Aargh!", "Boo-hoo!", "&iexcl;Ay caramba!"];
            t.exports = u
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(5), n(4), n(3), n(7), n(1)], i = function(e, t, n, o, i, r, a) {
            "use strict";
            function s(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function l(e, t, n) {
                function o() {
                    D && (G || (H && X || U) && (W || (!z || U) && (D = !1, t.fire(a.Events.sidedockVisibilityChanged, D), n.classList.add("invisible"))))
                }
                function i() {
                    D || U || (n.classList.add("invisible"), n.classList.remove("hidden"), n.removeAttribute("hidden"), n.classList.contains("vod") && (n.classList.remove("vod"), n.setAttribute("data-vod-highlight", "no"), P.classList.remove("bouncing")), setTimeout(function() {
                        D = !0, t.fire(a.Events.sidedockVisibilityChanged, D), n.classList.remove("invisible")
                    }, 0))
                }
                function r() {
                    H = !1, W = !1, G = !1
                }
                function s(t, n, o) {
                    var i = "data-label-" + o, r = "add" !== o || e.user.logged_in ? i : "data-label-add-logged-out";
                    t.setAttribute("aria-label", t.getAttribute(r)), n.classList.add("hidden"), n.setAttribute("hidden", ""), n.firstChild.innerHTML = t.getAttribute(i)
                }
                function l() {
                    var e = j.indexOf(this);
                    Y.forEach(function(t, n) {
                        n !== e && t && t.classList.add("invisible")
                    }), e >= 0 && (Y[e].classList.add("invisible"), Y[e].classList.remove("hidden"), Y[e].removeAttribute("hidden", ""), $ = window.requestAnimationFrame(function() {
                        $ = window.requestAnimationFrame(function() {
                            Y[e].classList.remove("invisible"), Y[e].classList.add("visible")
                        })
                    }))
                }
                function v() {
                    var e = "BUTTON" === this.tagName ? this : this.querySelector("button"), t = j.indexOf(e);
                    t >= 0 && ($ && (window.cancelAnimationFrame($), $ = null), Y[t].classList.add("invisible"))
                }
                function p() {
                    if (e.view === a.View.main || e.view === a.View.privateUnlocked) {
                        e.video.vod && "purchase_options"in e.video.vod && e.video.vod.purchase_options.length && "no" !== n.getAttribute("data-vod-highlight") && !e.embed.settings.instant_sidedock ? n.classList.add("vod") : c["default"].touch && (D = !0, t.fire(a.Events.sidedockVisibilityChanged, D), n.classList.remove("hidden"), n.removeAttribute("hidden"), n.classList.remove("invisible"));
                        var o = e.embed.settings, i = e.video.vod && "purchase_options"in e.video.vod && e.video.vod.purchase_options.length;
                        n.innerHTML = d["default"].render("sidedock", {loggedIn: !!e.user.logged_in, vodButton: i && o.vod, purchased: e.video.vod && e.user.purchased ? 1 : 0, vodLabel: i && e.video.vod.purchase_options[0].label, vodPreorder: i && "date_available"in e.video.vod ? 1 : 0, expiring: i && e.video.vod.purchase_options[0].expiring ? 1 : 0, likeButton: o.like, liked: e.user.liked, watchLaterButton: o.watch_later, addedToWatchLater: e.user.watch_later, shareButton: o.share, shareButtonLabel: o.share && o.share.embed_only ? "Embed" : "Share", collectionsButton: o.collections, tipJarButton: o.tipjar}), P = n.querySelector(".vod-button"), A = n.querySelector(".vod-label"), "ondemand.main" !== e.embed.context || e.user.purchased || (A.classList.add("hidden"), A.classList.remove("visible")), S = n.querySelector(".like-button"), M = n.querySelector(".like-label"), q = n.querySelector(".watch-later-button"), O = n.querySelector(".watch-later-label"), R = n.querySelector(".share-button"), B = n.querySelector(".share-label"), F = n.querySelector(".collections-button"), I = n.querySelector(".collections-label"), V = n.querySelector(".tip-jar-button"), N = n.querySelector(".tip-jar-label"), j = [P, S, q, R, F, V], Y = [A, M, O, B, I, N]
                    }
                }
                function h() {
                    f["default"](n, ".vod-button", function() {
                        t.fire(a.Events.vodButtonPressed), A.classList.add("hidden"), A.setAttribute("hidden", "")
                    }, v)
                }
                function m() {
                    f["default"](n, ".like-button", function() {
                        t.fire(a.Events.likeButtonPressed);
                    }, v), t.on(a.Events.liked, function() {
                        S && (S.classList.add("on"), s(S, M, "remove"))
                    }), t.on(a.Events.unliked, function() {
                        S && (S.classList.remove("on"), s(S, M, "add"))
                    })
                }
                function g() {
                    f["default"](n, ".watch-later-button", function() {
                        t.fire(a.Events.watchLaterButtonPressed)
                    }, v), t.on(a.Events.addedToWatchLater, function() {
                        q && (q.classList.add("on"), s(q, O, "remove"))
                    }), t.on(a.Events.removedFromWatchLater, function() {
                        q && (q.classList.remove("on"), s(q, O, "add"))
                    })
                }
                function b() {
                    f["default"](n, ".share-button", function() {
                        return t.fire(e.embed.settings.share.embed_only ? a.Events.embedButtonPressed : a.Events.shareButtonPressed), !1
                    }, v)
                }
                function w() {
                    f["default"](n, ".collections-button", function() {
                        t.fire(a.Events.collectionsButtonPressed)
                    }, v)
                }
                function y() {
                    f["default"](n, ".tip-jar-button", function() {
                        t.fire(a.Events.tipJarButtonPressed)
                    }, v), t.on(a.Events.tipped, function() {
                        V.classList.add("on")
                    })
                }
                function E() {
                    var e = function(e) {
                        "opacity" === e.propertyName && e.target.classList.contains("invisible") && (e.target.classList.add("hidden"), e.target.setAttribute("hidden", ""), e.target.classList.remove("visible"))
                    };
                    u["default"](n).on("blur", "button", v).on("mouseleave", ".box", v).on(["focus", "pointerdown", "touchstart", "mouseenter"], "button", l).on("transitionend", "label", e), f["default"](n, "label", function() {
                        var e = Y.indexOf(this);
                        e >= 0 && j[e].click()
                    })
                }
                function k() {
                    t.on([a.Events.mousedOut, a.Events.mouseTimeout], o).on(a.Events.mousedOver, i).on(a.Events.targetTimeReached, function() {
                        X = !0, o()
                    }).on(a.Events.played, function() {
                        H = !0
                    }), u["default"](n).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], function(e) {
                        return"pointerType"in e ? void(("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE) && (W = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(W = "mouseover" === e.type)
                    }), u["default"](n).on("transitionend", function(e) {
                        "opacity" === e.propertyName && n.classList.contains("invisible") && (n.classList.add("hidden"), n.setAttribute("hidden", ""))
                    })
                }
                function _() {
                    t.on(a.Events.willEnterFullscreen, function() {
                        W = !1, o()
                    }).on(a.Events.didExitFullscreen, function(e) {
                        e || (G = !0)
                    })
                }
                function L() {
                    t.on(a.Events.airPlayActivated, function() {
                        z = !0, i()
                    }).on(a.Events.airPlayDeactivated, function() {
                        z = !1
                    })
                }
                function x() {
                    t.on(a.Events.overlayOpened, function() {
                        U = !0, W = !1, o()
                    }).on(a.Events.overlayClosed, function() {
                        U = !1, i()
                    })
                }
                function C() {
                    t.on(a.Events.configChanged, function(t, o) {
                        e = t, o && n.removeAttribute("data-vod-highlight"), p()
                    })
                }
                function T() {
                    t.on(a.Control.reset, function() {
                        W = !1, X = !1, o(), r()
                    })
                }
                var P, A, S, M, q, O, R, B, F, I, V, N, D = !1, H = !1, W = !1, U = !1, z = !1, j = [], Y = [], $ = null, X = !1, G = !1;
                return p(), h(), m(), g(), b(), w(), y(), E(), k(), _(), L(), x(), C(), T(), t.fire(a.Events.sidedockModuleReady), {}
            }
            var d = s(n), u = s(o), c = s(i), f = s(r);
            t.exports = l
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(2), n(1)], i = function(e, t, n, o) {
            "use strict";
            function i(e, t) {
                function i(e) {
                    return Object.keys(e).map(function(t) {
                        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                    }).join("&")
                }
                function r(n, r, a, s) {
                    if (t.fire(o.Control.checkSignatureExpiration), m)
                        return void k.push([n, r, a, 0]);
                    var l = r;
                    l.signature = e.request.signature, l.session = e.request.session, l.time = e.request.timestamp, l.expires = e.request.expires;
                    var d = i(l), u = new XMLHttpRequest;
                    u.open("POST", "https://" + e.player_url + n, !a), u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), u.withCredentials = !0, u.onload = function() {
                        200 !== u.status && 2 > s && k.push([n, r, a, s + 1])
                    }, u.send(d)
                }
                function a(t, o, i) {
                    r(t, {referrer: e.request.referrer, embed: !e.embed.on_site, context: e.embed.context, autoplay: e.embed.autoplay, id: e.video.id, vodId: e.video.vod && e.video.vod.id ? e.video.vod.id : null, vodSaleId: e.video.vod && e.video.vod.sale_id ? e.video.vod.sale_id : null, userId: e.user.id, userAccountType: e.user.account_type, userIsMod: e.user.mod ? 1 : 0, ownerId: e.video.owner.id, ownerAccountType: e.video.owner.account_type, privacy: e.video.privacy, rating: e.video.rating ? e.video.rating.id : null, type: e._video.currentRenderer, videoFileId: e._video.currentFile.id || 0, delivery: e._video.currentFile.hls ? "hls" : "progressive", quality: e._video.currentFile.quality, duration: n.round(e.video.duration), seconds: n.round(o)}, i)
                }
                function s() {
                    !E && e.request.flags.plays && (E = !0, a("/log/play", 0))
                }
                function l(t, n) {
                    e.request.flags.partials && e.request.flags.plays && (t = Math.round(1e3 * t) / 1e3 || 0, t > b && !w && (b = t, a("/log/partial", t, n)))
                }
                function d(t, o) {
                    if (!e.request.flags.dnt) {
                        o = o || {};
                        var i = {referrer: e.request.referrer, embed: !e.embed.on_site, context: e.embed.context, id: e.video.id, vodId: e.video.vod && e.video.vod.id ? e.video.vod.id : null, vodSaleId: e.video.vod && e.video.vod.sale_id ? e.video.vod.sale_id : null, userId: e.user.id, userAccountType: e.user.account_type, ownerId: e.video.owner ? e.video.owner.id : 0, duration: n.round(e.video.duration), seconds: n.round(e._video.currentTime)};
                        for (var a in o)
                            o.hasOwnProperty(a) && (i[a] = o[a]);
                        r("/log/" + t, i)
                    }
                }
                function u() {
                    h = {}
                }
                function c() {
                    t.on(o.Events.playProgress, function(e, t, n) {
                        var o = Math.floor(e);
                        o % g !== 0 || h[o] || (l(e), h[o] = !0)
                    }), t.on(o.Events.playInitiated, function() {
                        s()
                    }), t.on(o.Events.paused, function(e) {
                        l(e)
                    }), t.on(o.Events.seeked, function(e, t, n) {
                        y = e, w || l(y)
                    }), t.on(o.Events.scrubbingStarted, function() {
                        w = !0
                    }), t.on(o.Events.scrubbingEnded, function() {
                        w = !1, l(y)
                    }), t.on(o.Events.hdButtonPressed, function() {
                        l(e._video.currentTime)
                    }), t.on(o.Events.ended, function() {
                        l(e.video.duration)
                    }), window.addEventListener("beforeunload", function() {
                        e._video && e._video.currentTime > 0 && l(e._video.currentTime, !0)
                    })
                }
                function f() {
                    function n(e) {
                        return function() {
                            d(e)
                        }
                    }
                    if (!e.request.flags.dnt) {
                        var i = [{type: "share_press", event: o.Events.shareButtonPressed}, {type: "facebook_press", event: o.Events.facebookButtonPressed}, {type: "twitter_press", event: o.Events.twitterButtonPressed}, {type: "tumblr_press", event: o.Events.tumblrButtonPressed}, {type: "email_press", event: o.Events.emailButtonPressed}, {type: "embed_press", event: o.Events.embedButtonPressed}, {type: "login_success", event: o.Events.userLoggedIn}, {type: "airplay", event: o.Events.airPlayActivated}, {type: "vod_press", event: o.Events.vodButtonPressed}];
                        i.forEach(function(e) {
                            t.on(e.event, n(e.type))
                        }), t.on(o.Events.outroDisplayed, function(t) {
                            var n = {outroType: e.embed.outro, ownerAccountType: e.video.owner.account_type};
                            t.length && (n.outroVideos = t.join(",")), d("outro_displayed", n)
                        }).on(o.Events.outroVideoPressed, function(t) {
                            d("outro_video_press", {ownerAccountType: e.video.owner.account_type, videoId: t})
                        }).on(o.Events.likeButtonPressed, function() {
                            d("like_press", {add: !e.user.liked})
                        }).on(o.Events.watchLaterButtonPressed, function() {
                            d("watch_later_press", {add: !e.user.watch_later})
                        }).on(o.Events.popupOpened, function(e) {
                            0 === e.indexOf("login-") && d("login_attempt")
                        }).on(o.Events.captionsChanged, function(t) {
                            if (!t)
                                return void d("text_track_change");
                            var n;
                            e.request.text_tracks.forEach(function(e) {
                                e.lang + "." + e.kind === t && (n = e)
                            }), n && d("text_track_change", {textTrackLanguage: n.lang, textTrackKind: n.kind})
                        }).on(o.Events.badgePressed, function(e) {
                            (1 === e || 12 === e) && d("badge_press", {badgeId: e})
                        })
                    }
                }
                function v() {
                    t.on(o.Events.signatureExpired, function() {
                        m = !0
                    }), t.on(o.Events.requestConfigReloaded, function(t) {
                        if (e.request = t, m = !1, k.length > 0)
                            for (var n = k.shift(); n; )
                                r.apply(null, n), n = k.shift()
                    }), t.on(o.Events.configChanged, function(t, n) {
                        e = t, n && (b = 0, E = !1, w = !1, u())
                    })
                }
                function p() {
                    var n = ["not-supported", "decode", "network", "aborted", "unknown"];
                    t.on(o.Events.error, function(t, o) {
                        n.indexOf(t) >= 0 && r("/log/" + t.replace("-", "") + "_error", {id: e.video.id, context: e.embed.context})
                    })
                }
                var h, m = !1, g = 30, b = 0, w = !1, y = 0, E = !1, k = [];
                return u(), c(), f(), v(), p(), t.fire(o.Events.statsModuleReady), {}
            }
            t.exports = i
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(1)], i = function(e, t, n) {
            "use strict";
            function o(e, t) {
                function o(e) {
                    if (!L.loaded)
                        return void L.queue.push(e);
                    try {
                        L.frame.contentWindow.postMessage(e, L.origin), window.postMessage(e, window.location.origin)
                    } catch (t) {
                    }
                }
                function r(o, i) {
                    var r = !0;
                    switch (o) {
                        case"sync_hd":
                            e.video.allow_hd && t.fire(n.Control.changeQuality, 1 === i ? "hd" : "sd", r);
                            break;
                        case"sync_scaling":
                            t.fire(n.Control.changeScaling, !!i);
                            break;
                        case"sync_volume":
                            t.fire(n.Control.changeVolume, i, r);
                            break;
                        case"sync_captions":
                            if (null === i) {
                                t.fire(n.Control.turnCaptionsOff, r);
                                break
                            }
                            t.fire(n.Control.turnCaptionsOn, i, r);
                            break;
                        case"sync_login":
                            a(i);
                            break;
                        case"sync_active":
                            null !== i && i !== e.request.session && t.fire(n.Events.becameInactive)
                    }
                }
                function a(o) {
                    x > 4 || (x++, o && !e.user.logged_in ? t.fire(n.Events.userLogIn) : !o && e.user.logged_in && t.fire(n.Events.userLoggedOut))
                }
                function s(e) {
                    return e === !0 || e === !1 ? +e : "null" === e ? null : e
                }
                function l(t, n) {
                    var o = new Date;
                    o.setFullYear(o.getFullYear() + 1), o = o.toGMTString(), n = s(n);
                    var i = t + "=" + n + ";";
                    i += "expires=" + o + ";", i += "path=/;", i += "domain=" + e.request.cookie_domain + ";", document.cookie = i
                }
                function d(e) {
                    var t = document.cookie;
                    return t && "" !== t ? t.split(";").reduce(function(t, n) {
                        return n = n.trim(), 0 === n.indexOf(e + "=") ? decodeURIComponent(n.substr(e.length + 1)) : t
                    }, null) : null
                }
                function u(t, n) {
                    n = s(n), i.indexOf(t) >= 0 && (e.request.cookie[t] = n);
                    var r = {method: "set", key: "sync_" + t, val: n, session: e.request.session};
                    o(r);
                    var a = [];
                    i.indexOf(t) >= 0 && a.push(t + "=" + n);
                    var d = c(i);
                    for (var u in d)
                        u in d && null !== d[u] && u !== t && a.push(u + "=" + d[u]);
                    l("player", '"' + a.join("&") + '"')
                }
                function c(e) {
                    var t = d("player");
                    if (!t)
                        return null;
                    t = t.substring(1, t.length - 1);
                    var n = {};
                    t.split("&").forEach(function(e) {
                        e = e.split("="), n[e[0]] = decodeURIComponent(e[1] || "")
                    });
                    var o = [].concat(e), i = o.reduce(function(e, t) {
                        if (t in n) {
                            var o = parseFloat(n[t]);
                            return e[t] = isNaN(o) ? n[t] : o, e
                        }
                        return e[t] = null, e
                    }, {});
                    return 1 === o.length ? i[e] : i
                }
                function f(t) {
                    t && (e = t), u("login", !!e.user.logged_in)
                }
                function v() {
                    t.on(n.Events.qualityChanged, function(t, n) {
                        e.request.cookie.hd = "hd" === t ? 1 : 0, n || u("hd", "hd" === t)
                    })
                }
                function p() {
                    t.on(n.Control.changeScaling, function(e) {
                        u("scaling", !!e)
                    })
                }
                function h() {
                    t.on(n.Events.volumeChanged, function(t, n) {
                        e.request.cookie.volume = s(t), n || u("volume", t)
                    })
                }
                function m() {
                    t.on(n.Events.captionsChanged, function(t, n) {
                        e.request.cookie.captions = s(t), n || u("captions", t)
                    })
                }
                function g() {
                    t.on(n.Events.playButtonPressed, function(o) {
                        o || (u("active", e.request.session), t.fire(n.Events.becameActive))
                    }), t.on([n.Events.pauseButtonPressed, n.Events.ended], function() {
                        c("active") === e.request.session && u("active", null)
                    })
                }
                function b() {
                    t.on(n.Events.userLoggedIn, function() {
                        u("login", !0)
                    })
                }
                function w() {
                    if (!L.frame) {
                        var e = document.createElement("iframe");
                        e.src = L.src, e.setAttribute("title", "Vimeo LocalStorage Proxy"), e.setAttribute("aria-hidden", "true"), e.setAttribute("hidden", ""), e.onload = function(t) {
                            L.loaded || (e.contentWindow.postMessage({method: "ping"}, L.origin), L.pingTimeout = setTimeout(function() {
                            }, 500)), L.loadTimeout && (clearTimeout(L.loadTimeout), L.loadTimeout = null)
                        }, L.loadTimeout = setTimeout(function() {
                        }, 1e4), document.body.appendChild(e), L.frame = e
                    }
                }
                function y(e) {
                    if ("ready" !== e.data && "ping" !== e.data)
                        "object" == typeof e.data && "key"in e.data && "newValue"in e.data && r(e.data.key, e.data.newValue);
                    else if (!L.loaded)
                        for (clearTimeout(L.pingTimeout), L.pingTimeout = null, L.loaded = !0; L.queue.length; ) {
                            var t = L.queue.shift();
                            o(t)
                        }
                }
                function E() {
                    window.addEventListener("message", function(t) {
                        return t.origin === L.origin ? y(t) : void(t.origin === window.location.origin && t.data.session !== e.request.session && r(t.data.key, t.data.val))
                    }, !1)
                }
                function k() {
                    i.concat("login", "active").forEach(function(e) {
                        try {
                            window.localStorage.removeItem(e)
                        } catch (t) {
                        }
                    })
                }
                if (!VimeoPlayer.localStorageProxy) {
                    var _ = document.createElement("a");
                    _.href = e.request.urls.proxy, VimeoPlayer.localStorageProxy = {src: _.href, origin: _.origin || _.protocol.replace(":", "") + "://" + _.host, loaded: !1, queue: [], frame: null, loadTimeout: null, pingTimeout: null}
                }
                var L = VimeoPlayer.localStorageProxy, x = 0;
                return f(), v(), p(), h(), m(), g(), b(), w(), E(), k(), {reset: f}
            }
            var i = ["hd", "scaling", "volume", "captions"];
            t.exports = o
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(5), n(4), n(3), n(7), n(1)], i = function(e, t, n, o, i, r, a) {
            "use strict";
            function s(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function l(e, t, n) {
                function o() {
                    y = !1, n.classList.add("invisible")
                }
                function i() {
                    n.classList.remove("hidden"), n.removeAttribute("hidden"), setTimeout(function() {
                        y = !0, n.classList.remove("invisible")
                    }, 0)
                }
                function r() {
                    if (y) {
                        if (k)
                            return void o();
                        if (C)
                            return void o();
                        if (!_ && L)
                            return x && E ? void 0 : void o()
                    }
                }
                function s() {
                    return y || !x || T || C ? void 0 : _ ? void i() : L || k ? e.embed.settings.info_on_pause && x && !k ? void i() : void 0 : void i()
                }
                function l() {
                    if (e.view === a.View.main || e.view === a.View.privateUnlocked) {
                        var t = {targetBlank: 0 === e.embed.on_site, linkToOwner: null !== e.video.owner.url, ownerLink: e.video.owner.url, showPortrait: !!e.embed.settings.portrait, portraitImg: e.video.owner[c["default"].devicePixelRatio > 1 ? "img_2x" : "img"], showTitle: !!e.embed.settings.title, showTitleLink: null !== e.video.url, titleLink: e.video.url, title: e.video.title, showByline: !!e.embed.settings.byline, owner: e.video.owner.name};
                        e.embed.settings.byline_badge && (t.bylineBadge = {cssClass: e.embed.settings.byline_badge.type, link: e.embed.settings.byline_badge.url || !1});
                        var o = e.embed.settings.badge;
                        if (o) {
                            var i = c["default"].devicePixelRatio > 1 ? "img_2x" : "img";
                            c["default"].svg && o.svg && (i = "svg"), t.showPortrait = !1, t.badge = {link: o.link, img: o[i], offset: o.offset || !1, width: o.width, height: o.height, name: o.name}
                        }
                        e.embed.autoplay && (n.classList.add("hidden"), n.setAttribute("hidden", "")), n.innerHTML = d["default"].render("title", t)
                    }
                }
                function v() {
                    t.on([a.Events.mousedOut, a.Events.mouseTimeout], r).on(a.Events.mousedOver, s).on(a.Events.playInitiated, function() {
                        L = !0, x = !1, r()
                    }).on([a.Events.playButtonPressed, a.Events.played], function() {
                        x = !1, T = !1, r()
                    }).on(a.Events.paused, function(e, t) {
                        t || (x = !0, s())
                    }).on(a.Events.ended, function() {
                        C = !0, r()
                    }).on(a.Events.scrubbingStarted, function() {
                        P = x, T = !0
                    }).on(a.Events.scrubbingEnded, function() {
                        P && (T = !1)
                    }).on(a.Events.willEnterFullscreen, function() {
                        r()
                    }).on(a.Events.didExitFullscreen, function(e) {
                        e || s()
                    }), u["default"](n).on(["pointerenter", "pointerleave", "mouseenter", "mouseleave"], function(e) {
                        return"pointerType"in e ? void(("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE) && (E = "pointerenter" === e.type || "MSPointerEnter" === e.type)) : void(E = "mouseover" === e.type)
                    }), u["default"](n).on("transitionend", function(e) {
                        "opacity" === e.propertyName && n.classList.contains("invisible") && (n.classList.add("hidden"), n.setAttribute("hidden", ""))
                    }, !1)
                }
                function p() {
                    t.on(a.Events.ended, function(e) {
                        r()
                    })
                }
                function h() {
                    t.on(a.Events.airPlayActivated, function() {
                        _ = !0, s()
                    }).on(a.Events.airPlayDeactivated, function() {
                        _ = !1, r()
                    })
                }
                function m() {
                    t.on(a.Events.overlayOpened, function(e) {
                        "notsupported" !== e && "private-unlocked" !== e && "help" !== e && (k = !0, E = !1, r())
                    }).on(a.Events.overlayClosed, function() {
                        k = !1, E = !1, setTimeout(s, 0)
                    })
                }
                function g() {
                    f["default"](n, ".badge", function() {
                        t.fire(a.Events.badgePressed, e.embed.settings.badge.id)
                    })
                }
                function b() {
                    t.on(a.Events.configChanged, function(t) {
                        e = t, l(), e.view === a.View.privateUnlocked && s()
                    })
                }
                function w() {
                    t.on(a.Control.reset, function() {
                        L = !1, x = !0, C = !1, T = !1, s()
                    })
                }
                var y = !0, E = !1, k = !1, _ = !1, L = !1, x = !0, C = !1, T = !1, P = !1;
                return l(), v(), p(), h(), m(), g(), b(), w(), t.fire(a.Events.titleModuleReady), {}
            }
            var d = s(n), u = s(o), c = s(i), f = s(r);
            t.exports = l
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t, n) {
        var o, i;
        o = [t, e, n(13), n(4), n(3), n(2), n(1)], i = function(e, t, n, o, i, r, a) {
            "use strict";
            function s(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function l(e, t, n) {
                function o(e, t) {
                    if (!ue)
                        return!1;
                    if ("h264" === e) {
                        if (de >= 2)
                            return"" !== ue.h264.high;
                        var n = "mobile" === t ? ue.h264.baseline : ue.h264.high;
                        return"" === n ? !1 : 2 > de && "1080p" === t && ce ? !1 : !0
                    }
                    return"vp8" === e ? "" !== ue.webm : void 0
                }
                function i(e) {
                    var t, n = {};
                    for (var i in e.codecs)
                        if (t = e.codecs[i], e[t])
                            for (var r in e[t])
                                if (e[t].hasOwnProperty(r) && o(t, r)) {
                                    if (c["default"].iPadNonRetina && e[t][r].width * e[t][r].height > 921600)
                                        continue;
                                    n[r] = e[t][r], n[r].quality = r
                                }
                    return n
                }
                function s(e) {
                    var t, n = {};
                    for (var o in e.codecs)
                        if (t = e.codecs[o], e[t])
                            for (var i in e[t])
                                e[t].hasOwnProperty(i) && (n[i] = e[t][i], n[i].quality = i);
                    return n
                }
                function l() {
                    t.fire(a.Events.bufferStarted), xe = !0, Le = !0, me || e._video.currentFile.hls || pe.pause()
                }
                function f() {
                    Le && (t.fire(a.Events.bufferEnded), xe = !1, Le = !1)
                }
                function v() {
                    return pe.preload = "", ve.classList.remove("cloaked"), Fe ? (t.fire(a.Events.error, Fe), void T()) : (t.fire(a.Control.checkSignatureExpiration), ye || (Re || pe.load(), t.fire(a.Events.playInitiated), l(), ye = !0, c["default"].android && !c["default"].browser.chrome && pe.play()), be = !0, we = !0, me && (He = !0, t.fire(a.Control.forceFullscreen)), void(Re && p()))
                }
                function p() {
                    Ae || De || (xe = !1, Oe = !1, we && pe.paused && (se && m(se, function() {
                        se = null
                    }), pe.play()))
                }
                function h(e) {
                    var t = pe.duration;
                    if (t && e > t && (e = t), pe.seekable.length > 0)
                        for (var n = 0, o = pe.seekable.length; o > n; n++)
                            if (pe.seekable.start(n) <= e && pe.seekable.end(n) >= e)
                                return!0;
                    return!1
                }
                function m(t, n) {
                    return h(t) ? (t = r.limit(t, 0, (pe.duration || e.duration) - .01), pe.currentTime = t, e._video.currentTime = t, void(n && n())) : (Ie = t, Ve = n, void(Ne || (d["default"].events.forEach(function(e) {
                        pe.addEventListener(e, g, !1)
                    }), Ne = !0)))
                }
                function g() {
                    Ie && h(Ie) && (d["default"].events.forEach(function(e) {
                        pe.removeEventListener(e, g, !1)
                    }), Ne = !1, Ie = r.limit(Ie, 0, (pe.duration || e.duration) - .01), pe.currentTime = Ie, e._video.currentTime = Ie, Ve && Ve(), p(), Ie = null, Ve = null)
                }
                function b(e, t, n, o) {
                    return e + t
                }
                function w() {
                    if (pe.buffered.length) {
                        var e = (new Date).getTime(), t = pe.buffered.end(pe.buffered.length - 1);
                        re || (re = e);
                        var n = t - qe;
                        Se.push(n), Se = Se.slice(-10), Me = Se.reduce(b) / Se.length, ie = null, re = e, qe = t, ie = !0, Math.round(t) !== Math.round(pe.duration) && (ie = setTimeout(w, 1e3))
                    }
                }
                function y(e, t) {
                    var n = e.length - 1;
                    if (e.length > 1)
                        for (var o = 0, i = e.length; i > o; o++)
                            if (e.start(o) <= t && e.end(o) >= t) {
                                n = o;
                                break
                            }
                    return n
                }
                function E(n) {
                    if (ye && (oe || (oe = (new Date).getTime()), ie || w()), !Be && pe.buffered && pe.buffered.length > 0) {
                        n = n || pe.currentTime;
                        var o = y(pe.buffered, n), i = pe.buffered.end(o), r = i / pe.duration;
                        if (e._video.loadProgress = i, t.fire(a.Events.loadProgress, i, pe.duration, r), Le) {
                            if (we && i === pe.duration)
                                return void p();
                            var s = pe.duration - pe.buffered.end(pe.buffered.length - 1), l = s / Me, d = pe.duration - pe.currentTime;
                            if (d >= l + 2)
                                return void p()
                        }
                    }
                }
                function k(e) {
                    for (var t = ["hd", "sd", "mobile"], n = t.indexOf(e), o = n; 3 > o; o++) {
                        var i = t[o];
                        if (te[i])
                            return te[i];
                        if (ne[i])
                            return ne[i]
                    }
                    return null
                }
                function _(e, t, n) {
                    var o = 0, i = 0, r = 0, a = 0, s = e.clientWidth || Ke.width, l = e.clientHeight || Ke.height, d = t / n, u = s / l;
                    return u >= d ? (i = l, o = (d * l).toFixed(2)) : (o = s, i = (s / d).toFixed(2)), r = Math.max((s - o) / 2, 0), a = Math.max((l - i) / 2, 0), {width: o, height: i, left: r, top: a}
                }
                function L(e, n) {
                    return!ye || pe.ended ? (A(k(e)), void t.fire(a.Events.qualityChanged, e, n)) : (Be = !0, se || (se = pe.currentTime), we = !pe.paused, Oe = !0, pe.pause(), l(), void t.once(a.Events.notificationHidden, function() {
                        C(e, n)
                    }))
                }
                function x() {
                    he || (ve.insertAdjacentHTML("beforebegin", '<canvas class="snapshot"></canvas>'), he = n.querySelector(".snapshot"));
                    var t = he.getContext("2d");
                    if (t && pe.canvasImageSource) {
                        he.setAttribute("width", pe.videoWidth + "px"), he.setAttribute("height", pe.videoHeight + "px");
                        var o = _(fe, e.video.width, e.video.height);
                        he.style.cssText = "width:" + o.width + "px;height:" + o.height + "px;left:" + o.left + "px;top:" + o.top + "px", t.drawImage(pe.canvasImageSource, 0, 0, he.width, he.height), he.classList.remove("hidden")
                    }
                }
                function C(e, n) {
                    x(), A(k(e)), pe.load(), t.fire(a.Events.qualityChanged, e, n), m(se, function() {
                        Be = !1
                    })
                }
                function T() {
                    fe.style.backgroundImage = "url(" + fe.getAttribute("data-thumb") + ")"
                }
                function P() {
                    if (!Ue) {
                        var e = pe.volume;
                        pe.volume = .999, (.999 !== r.round(pe.volume) || c["default"].android) && t.fire(a.Control.disableVolume), pe.volume = e, Ue = !0
                    }
                }
                function A(t) {
                    t && (Re = !1, e._video.previousFile = e._video.currentFile, e._video.currentFile = t, pe.src = e._video.currentFile.url, e._video.currentRenderer = pe.renderer, P())
                }
                function S(e) {
                    for (var t = !1, n = null, o = e.split(".")[0], i = o.substr(0, 2), r = null, a = null, s = pe.textTracks, l = 0, d = s.length; d > l; l++) {
                        var u = s[l].language + "." + s[l].kind;
                        if (u !== e) {
                            if (s[l].mode = Ze, !t) {
                                var f = s[l].language === o, v = s[l].language === i;
                                (f || !n && v) && (n = u, a = s[l])
                            }
                        } else
                            t = !0, n = u, r = s[l]
                    }
                    return!t && a && (r = a), !Re && c["default"].browser.firefox && (je = n, r = null), r && (r.mode = Qe), {track: r, id: n}
                }
                function M(e) {
                    var n = e.target;
                    if (n.mode === et && !He) {
                        var o = n.language + "." + n.kind;
                        if (o !== ze)
                            return void(n.mode = Ze);
                        n.mode = Qe
                    }
                    var i, r = n.activeCues, s = [];
                    if (r && r.length > 0)
                        for (var l = 0, d = n.activeCues.length; d > l; l++)
                            "" !== r[l].text.replace(/^\s+|\s+$/gm, "") && (i = document.createElement("span"), i.appendChild(r[l].getCueAsHTML()), s.push({html: i.innerHTML.replace("\n", "<br>"), text: r[l].text}));
                    t.fire(a.Events.cueChanged, n.id, s)
                }
                function q() {
                    for (var e = pe.textTracks, t = 0, n = e.length; n > t; t++)
                        if (e[t].mode === Qe) {
                            if ($e.length !== e[t].activeCues.length) {
                                M({target: e[t]}), $e = [].slice.call(e[t].activeCues);
                                break
                            }
                            for (var o = 0, i = e[t].activeCues.length; i > o; o++)
                                if (e[t].activeCues[o].startTime !== $e[o].startTime) {
                                    M({target: e[t]}), $e = [].slice.call(e[t].activeCues);
                                    break
                                }
                        }
                }
                function O() {
                    if (je) {
                        var e = S(je);
                        e.id && (ze = e.id, je = null)
                    }
                }
                function R() {
                    pe = new d["default"](ve, {swf: e.request.urls.flideo}), pe.preload = "none", (me || c["default"].iOS >= 8) && (pe.preload = "metadata")
                }
                function B() {
                    t.on(a.Events.mousedOver, function() {
                        le || !e.request.flags.preload_video || Re || "metadata" === pe.preload || (pe.preload = "metadata")
                    })
                }
                function F() {
                    pe.addEventListener("loadedmetadata", function(t) {
                        Re = !0, O();
                        var n = pe.duration;
                        isFinite(n) && n > 0 && (e.video.duration = n), e.video.video_width = pe.videoWidth, e.video.video_height = pe.videoHeight, we && (pe.preload = "")
                    }), pe.addEventListener("durationchange", function(t) {
                        var n = pe.duration;
                        isFinite(n) && n > 0 && (e.video.duration = n)
                    }), pe.addEventListener("waiting", function() {
                        Te || c["default"].browser.firefox || l()
                    }, !1), pe.addEventListener("canplay", function() {
                        ke = !0, (e.embed.autoplay || we || be && !ye && Ee) && p()
                    }, !1), pe.addEventListener("canplaythrough", function() {
                        _e = !0, !be || ye || Ee || p(), (xe || we && pe.paused) && p()
                    }, !1), pe.addEventListener("progress", function(e) {
                        E()
                    }, !1)
                }
                function I() {
                    t.on(a.Events.playInitiated, function() {
                        ve.classList.remove("cloaked"), n.classList.remove("invisible")
                    }).on(a.Events.playButtonPressed, v).on(a.Events.pauseButtonPressed, function() {
                        we = !1, pe.pause()
                    }).on(a.Events.becameInactive, function() {
                        window.location.search.indexOf("autopause=0") < 0 && !pe.paused && (we = !1, pe.pause())
                    }), pe.addEventListener("play", function(n) {
                        return Be = !1, ye || (!Ee || ke) && (Ee || _e) ? (ve.classList.remove("invisible"), t.fire(a.Events.played, pe.currentTime), e._video.paused = !1, void(e._video.ended = !1)) : (t.fire(a.Events.playInitiated), ye = !0, be = !0, void(we = !0))
                    }, !1), pe.addEventListener("pause", function(n) {
                        e._video.paused = !0, !ye || xe || Ae || Oe || t.fire(a.Events.paused, pe.currentTime, pe.ended), ae && (clearTimeout(ae), ae = null)
                    }, !1), pe.addEventListener("playing", function(e) {
                        ye || (t.fire(a.Events.playInitiated), ye = !0), E(), Ce = !0
                    }, !1), pe.addEventListener("timeupdate", function(n) {
                        var o = pe.currentTime;
                        if (e._video.currentRenderer = pe.renderer, ye && o > 0 && !Pe && !He && (clearTimeout(ae), ae = setTimeout(function() {
                            pe.paused !== !1 || Pe || He || l()
                        }, 2e3)), Ce && Le && o > 0 && (Ce = !1, f()), pe.buffered.length > 0 && !Le) {
                            var i = y(pe.buffered, o), r = pe.buffered.end(i);
                            if (!He && o > 0 && o < pe.duration && r === o)
                                return void l()
                        }
                        if (!Be) {
                            var s = pe.duration, u = o / s;
                            t.fire(a.Events.playProgress, o, s, u), e._video.currentTime = o, se && o > se && (se = null)
                        }
                        he && (he.classList.add("hidden"), he = null), d["default"].support.textTracks && !d["default"].support.cueChange && q()
                    }, !1), pe.addEventListener("ended", function(n) {
                        Ae || (e.embed.loop ? pe.play() : (t.fire(a.Events.ended), we = !1, e._video.paused = !0, e._video.ended = !0))
                    }, !1)
                }
                function V() {
                    function n(n) {
                        var o = n;
                        return te[n] && ne[n] && te[n].url !== ne[n].url || (delete ne[n], o = null, "hd" === n ? o = "sd" : "sd" === n && (o = "mobile")), delete te[n], e._video.previousFile = e._video.currentFile, e._video.currentFile = k(o), e._video.currentFile ? void A(e._video.currentFile) : "metadata" === pe.preload ? void(Fe = "not-supported") : (t.fire(a.Events.error, "not-supported"), void(Fe = "not-supported"))
                    }
                    var o = !1;
                    window.addEventListener("beforeunload", function() {
                        o = !0
                    }), pe.addEventListener("error", function(i) {
                        if (!o && i.target.error) {
                            var r = e._video.currentFile ? e._video.currentFile.quality : null;
                            if (null !== pe.currentSrc && r)
                                switch (i.target.error.code) {
                                    case i.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                        n(r);
                                        break;
                                    case i.target.error.MEDIA_ERR_DECODE:
                                        t.fire(a.Events.error, "decode");
                                        break;
                                    case i.target.error.MEDIA_ERR_NETWORK:
                                        t.fire(a.Events.error, "network");
                                        break;
                                    case i.target.error.MEDIA_ERR_ABORTED:
                                        break;
                                    default:
                                        t.fire(a.Events.error, "unknown")
                                }
                        }
                    })
                }
                function N() {
                    function n() {
                        var e = document.createElement("style");
                        document.querySelector("head").appendChild(e), l = e.sheet
                    }
                    function o() {
                        for (; l.cssRules.length > 1; )
                            l.deleteRule(0)
                    }
                    function i() {
                        var t = (pe.videoWidth || e.video.width) / (window.devicePixelRatio || 1), i = (pe.videoHeight || e.video.height) / (window.devicePixelRatio || 1), a = Math.min(t, screen.width), s = Math.min(i, screen.height);
                        if (Ge !== a || Xe !== s) {
                            var d = [".player:-webkit-full-screen .video-wrapper .video.native-size", ".player:-moz-full-screen .video-wrapper .video.native-size", ".player:-ms-fullscreen .video-wrapper .video.native-size", ".player:fullscreen .video-wrapper .video.native-size"], u = "width:" + a + "px;";
                            u += "height:" + s + "px;", u += "margin-left:-" + (a / 2).toFixed(2) + "px;", u += "margin-top:-" + (s / 2).toFixed(2) + "px;", u += "top:50%;", u += "left:50%;", l || n(), d.forEach(function(e) {
                                r.addCssRule(e, u, l)
                            }), Xe = s, Ge = a, o()
                        }
                    }
                    function s(e) {
                        e ? fe.classList.remove("native-size") : (i(), fe.classList.add("native-size"))
                    }
                    var l;
                    pe.addEventListener("loadedmetadata", function() {
                        i()
                    }), t.on(a.Control.changeScaling, s), s(e.request.cookie.scaling)
                }
                function D() {
                    t.on(a.Control.changeLoop, function(t) {
                        e.embed.loop = !!t, pe.loop = !!t
                    }), t.fire(a.Control.changeLoop, e.embed.loop)
                }
                function H() {
                    t.on(a.Events.scrubbingStarted, function() {
                        we = !pe.paused, Pe = !0, Ae = !0, pe.pause(), clearTimeout(ae)
                    }), t.on(a.Events.scrubbingEnded, function(e) {
                        Ae = !1, e || p()
                    }), t.on(a.Control.seek, function(n, o) {
                        o || (o = (pe.duration || e.video.duration) * r.limit(n, 0, 1)), o = r.limit(o, 0, pe.duration || e.video.duration), ye || (t.fire(a.Events.playButtonPressed), ye = !0, be = !0, we = !0), m(o, function() {
                            t.fire(a.Events.seeked, pe.currentTime, pe.duration, pe.currentTime / pe.duration)
                        })
                    }), pe.addEventListener("seeking", function() {
                        Te = !0
                    }, !1), pe.addEventListener("seeked", function() {
                        E(), Te = !1, Pe = !1, pe.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA || Ae || p()
                    }, !1)
                }
                function W() {
                    t.on(a.Control.changeVolume, function(e, n, o) {
                        o && (e += pe.volume), pe.volume = r.limit(e, 0, 1), t.fire(a.Events.volumeChanged, r.limit(e, 0, 1), n)
                    }), t.fire(a.Control.changeVolume, e.request.cookie.volume, !0)
                }
                function U() {
                    t.on(a.Control.changeQuality, function(e, t) {
                        "hd" === e ? L("hd", t) : L("sd", t)
                    })
                }
                function z() {
                    t.on(a.Events.overlayOpened, function() {
                        De = !0, ye && !We && (we = !pe.paused, pe.pause())
                    }), t.on(a.Events.overlayClosed, function() {
                        De = !1, we && !We && p()
                    })
                }
                function j() {
                    t.on(a.Events.didEnterFullscreen, function(e, n) {
                        e || (ve.classList.remove("cloaked"), ye || c["default"].browser.safari || (pe.poster = fe.getAttribute("data-thumb")), He = !0), n || !c["default"].windowsPhone || c["default"].browser.edge || t.fire(a.Control.toggleNativeControls, !0), Ke.width = ve.clientWidth, Ke.height = ve.clientHeight
                    }), t.on(a.Events.didExitFullscreen, function(e) {
                        pe.poster = "", ye || ve.classList.add("cloaked"), He = !1, me && (pe.pause(), we = !1)
                    }), t.on(a.Events.playInitiated, function() {
                        pe.poster = ""
                    })
                }
                function Y() {
                    t.on(a.Control.toggleNativeControls, function(e) {
                        return e ? (pe.controls = !0, void n.classList.add("native-controls")) : (pe.controls = !1, void n.classList.remove("native-controls"))
                    })
                }
                function $() {
                    t.on(a.Events.signatureExpired, function() {
                        le = !0, se = pe.currentTime
                    }), t.on(a.Events.requestConfigReloaded, function(t) {
                        e.request = t, le = !1, te = i(e.request.files), ne = s(e.request.files);
                        var n = pe.currentTime;
                        K(), m(n)
                    }), t.on(a.Events.configChanged, function(t, n) {
                        var o = e._video.currentFile;
                        e = t, te = i(e.request.files), ne = s(e.request.files), e._video = {paused: pe.paused, ended: pe.ended, currentTime: pe.currentTime, currentFile: o, currentRenderer: pe.renderer}, E()
                    })
                }
                function X() {
                    u["default"](ve).on("transitionend", function(e) {
                        "opacity" === e.propertyName && "0" === window.getComputedStyle(this, "").opacity && ve.classList.remove("transition")
                    }, !1), t.on(a.Control.reset, function(n) {
                        Be = !0, pe.paused || (pe.pause(), t.fire(a.Events.paused, pe.currentTime)), T(), ve.classList.add("transition"), ve.classList.add("invisible"), ye = !1, we = !1, Fe = null, e._video.paused = !0, e._video.ended = !1, e._video.currentTime = 0, e._video.loadProgress = 0, setTimeout(function() {
                            pe.currentTime = 0
                        }, 300), n && (pe.preload = "none", K(), ee())
                    })
                }
                function G() {
                    return c["default"].windowsPhone ? !1 : c["default"].android && c["default"].mobileAndroid ? !1 : c["default"].browser.bb10 ? !1 : !!ue.h264.high
                }
                function K() {
                    if (0 === Object.keys(te).length && 0 === Object.keys(ne).length)
                        return void t.fire(a.Events.error, "no-files");
                    var n, o = e.video.hd && e.video.allow_hd, i = o && (null === e.request.cookie.hd ? e.video.default_to_hd : e.request.cookie.hd);
                    if (c["default"].touch && screen.width < 2e3 && !c["default"].browser.edge) {
                        if (ue.hls && e.request.files.hls)
                            return e.video.hd = !1, t.fire(a.Control.disableHd), void A({cdn: e.request.files.hls.cdn, url: e.request.files.hls.captions || e.request.files.hls.all, origin: e.request.files.hls.origin, quality: "sd", hls: !0, captions: "captions"in e.request.files.hls});
                        o && G() ? n = k(i ? "hd" : "sd") : (e.video.hd = !1, t.fire(a.Control.disableHd), n = k("sd"))
                    } else
                        n = k(i ? "hd" : "sd");
                    return n ? void A(n) : void t.fire(a.Events.error, "not-supported")
                }
                function J() {
                    e.embed.time > 0 && m(e.embed.time, function() {
                        e.embed.time = 0
                    })
                }
                function Z() {
                    c["default"].airPlay && (pe.addEventListener("webkitplaybacktargetavailabilitychanged", function(e) {
                        switch (e.availability) {
                            case"available":
                                t.fire(a.Events.airPlayAvailable);
                                break;
                            case"not-available":
                                t.fire(a.Events.airPlayNotAvailable)
                        }
                    }), pe.addEventListener("webkitcurrentplaybacktargetiswirelesschanged", function(e) {
                        return pe.webkitCurrentPlaybackTargetIsWireless ? (We = !0, t.fire(a.Events.airPlayActivated)) : (We = !1, void t.fire(a.Events.airPlayDeactivated))
                    }), t.on(a.Events.airPlayButtonPressed, function() {
                        pe.webkitShowPlaybackTargetPicker()
                    }))
                }
                function Q() {
                    if (d["default"].support.textTracks && (t.on(a.Events.didEnterFullscreen, function(e) {
                        var t = pe.textTracks;
                        if (!e && t.length > 0) {
                            for (var n = 0, o = t.length; o > n; n++)
                                t[n].mode === Qe && (t[n].mode = et);
                            setTimeout(function() {
                                for (n = 0, o = t.length; o > n; n++) {
                                    var e = t[n].language + "." + t[n].kind;
                                    e === ze && (t[n].mode = et)
                                }
                            }, 0)
                        }
                    }).on(a.Events.didExitFullscreen, function() {
                        var e = pe.textTracks;
                        if (e.length > 0)
                            for (var n = 0, o = e.length; o > n; n++)
                                if (e[n].mode === et) {
                                    e[n].mode = Qe;
                                    var i = e[n].language + "." + e[n].kind;
                                    i !== ze && (ze = i, t.fire(a.Events.captionsChanged, ze))
                                }
                    }).on(a.Control.turnCaptionsOn, function(e) {
                        if (ze !== e) {
                            if (Ye)
                                return je = e, void t.fire(a.Events.captionsChanged, je, !0);
                            var n = S(e);
                            ze = n.id, n.track && M({target: n.track});
                            var o = !1;
                            ze !== e && (o = !0), t.fire(a.Events.captionsChanged, ze, o)
                        }
                    }).on(a.Control.turnCaptionsOff, function() {
                        for (var e = pe.textTracks, n = 0, o = e.length; o > n; n++)
                            e[n].mode = Ze;
                        t.fire(a.Events.cueChanged, null, []), ze && t.fire(a.Events.captionsChanged), ze = null
                    }), ee(), "text_tracks"in e.request && e.request.text_tracks.length > 0)) {
                        var n = !0;
                        if (null !== e.request.cookie.captions)
                            return void t.fire(a.Control.turnCaptionsOn, e.request.cookie.captions, n);
                        t.fire(a.Control.turnCaptionsOff, n)
                    }
                }
                function ee() {
                    function n() {
                        if (!(pe.textTracks.length < 1)) {
                            for (var e = 0, t = pe.textTracks.length; t > e; e++)
                                pe.textTracks[e].addEventListener("cuechange", M);
                            O(), d["default"].events.forEach(function(e) {
                                pe.removeEventListener(e, g, !1)
                            }), o = !1, Ye = !1
                        }
                    }
                    var o = !1;
                    if (e._video.currentFile.hls && e._video.currentFile.captions)
                        return Ye = !0, void(o || (d["default"].events.forEach(function(e) {
                            pe.addEventListener(e, n, !1)
                        }), o = !0));
                    if ("text_tracks"in e.request && e.request.text_tracks.length > 0)
                        return void e.request.text_tracks.forEach(function(e) {
                            var t = document.createElement("track");
                            t.setAttribute("data-id", e.id), t.setAttribute("src", e.url), t.setAttribute("kind", e.kind), t.setAttribute("srclang", e.lang), t.setAttribute("label", e.label), pe.appendChild(t), d["default"].support.cueChange && t.track.addEventListener("cuechange", M)
                        });
                    for (; pe.firstChild; )
                        pe.removeChild(pe.firstChild);
                    t.fire(a.Events.cueChanged, null, [])
                }
                var te, ne, oe, ie, re, ae, se, le = !1, de = c["default"].devicePixelRatio, ue = d["default"].support.video, ce = c["default"].touch, fe = n.querySelector(".video"), ve = n.querySelector(".flideo"), pe = null, he = null, me = c["default"].mobileAndroid || c["default"].android && !c["default"].browser.chrome && !c["default"].browser.firefox && !c["default"].browser.opera || c["default"].windowsPhone || c["default"].iOS >= 8 && !c["default"].iPad, ge = c["default"].iOS >= 8 && !c["default"].iPad, be = !1, we = !1, ye = !1, Ee = !0, ke = !1, _e = !1, Le = !1, xe = !1, Ce = !1, Te = !1, Pe = !1, Ae = !1, Se = [], Me = 0, qe = 0, Oe = !1, Re = !1, Be = !0, Fe = null, Ie = null, Ve = null, Ne = !1, De = !1, He = !1, We = !1, Ue = !1, ze = null, je = null, Ye = !1, $e = [], Xe = 0, Ge = 0, Ke = {
                    width: 0, height: 0};
                e._video = {}, e._video.paused = !0, e._video.ended = !1, e._video.currentTime = 0, e._video.loadProgress = 0, e._video.currentFile = {};
                var Je = "undefined" != typeof TextTrack ? TextTrack : {}, Ze = "DISABLED"in Je ? Je.DISABLED : "disabled", Qe = "HIDDEN"in Je ? Je.HIDDEN : "hidden", et = "SHOWING"in Je ? Je.SHOWING : "showing";
                ve.classList.add("cloaked"), ge && ve.classList.add("hide-webkit-controls"), te = i(e.request.files), ne = s(e.request.files), R(), B(), F(), I(), V(), N(), D(), H(), W(), U(), z(), j(), Y(), $(), X(), K(), J(), Z(), Q(), e.embed.autoplay && (pe.preload = "", be = !0, t.fire(a.Events.playButtonPressed)), t.fire(a.Events.videoModuleReady)
            }
            var d = s(n), u = s(o), c = s(i);
            t.exports = l
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, , function(e, t, n) {
        var o, i;
        o = [t, e, n(6), n(4), n(1), n(2), n(7)], i = function(e, t, n, o, i, r, a) {
            "use strict";
            function s(e) {
                return e && e.__esModule ? e : {"default": e}
            }
            function l(e, t, n, o) {
                function a() {
                    var e = t.getBoundingClientRect(), o = n.getBoundingClientRect(), i = k.getBoundingClientRect(), a = e.left + e.width / 2 - i.width / 2 - o.left, s = o.height, l = o.left + a + i.width, d = n.classList.contains("play-bar") ? o.right : o.width - parseInt(window.getComputedStyle(n).paddingRight, 10);
                    if (l > d) {
                        var u = l - d;
                        a -= u;
                        var c = e.left - (o.left + a) + e.width / 2;
                        c !== y && (r.addCssRule(".player .menu::after", "left:" + c + "px", document.styleSheets[document.styleSheets.length - 1]), y = c)
                    }
                    k.style.left = a + "px", k.style.bottom = s + "px"
                }
                function s(e) {
                    var t = document.createElement("ul");
                    t.classList.add("menu"), t.classList.add("rounded-box"), t.classList.add("hidden"), t.classList.add("invisible"), t.setAttribute("hidden", ""), t.setAttribute("id", x), t.setAttribute("role", "menu");
                    var n = document.createDocumentFragment();
                    return e.forEach(function(e) {
                        var t = document.createElement("li");
                        t.setAttribute("tabindex", "0"), t.setAttribute("role", "menuitemradio"), t.setAttribute("aria-checked", "false"), t.setAttribute("data-id", e.id), t.innerHTML = "<span>" + e.label + "</span>", e.active && (t.classList.add("active"), t.setAttribute("aria-checked", "true"), _ = t), n.appendChild(t)
                    }), t.appendChild(n), t
                }
                function l(e) {
                    e = e || t.contains(document.activeElement), k.classList.remove("hidden"), k.removeAttribute("hidden"), a(), a(), t.setAttribute("aria-expanded", "true"), L = !0, o.fire(i.Events.menuVisibilityChanged, L, w), window.requestAnimationFrame(function() {
                        k.classList.remove("invisible"), k.classList.add("open"), e && (_ || m()[0]).focus()
                    })
                }
                function f() {
                    t.setAttribute("aria-expanded", "false"), L = !1, o.fire(i.Events.menuVisibilityChanged, L, w), k.classList.add("invisible")
                }
                function v(e) {
                    return L ? (f(), !1) : (l(e), !0)
                }
                function p(e) {
                    _ && (_.classList.remove("active"), _.setAttribute("aria-checked", "false"));
                    var t = k.querySelector('[data-id="' + e + '"]');
                    t && (t.classList.add("active"), _.setAttribute("aria-checked", "true"), _ = t)
                }
                function h() {
                    k.parentElement.removeChild(k)
                }
                function m() {
                    var e = [].slice.call(k.querySelectorAll("[tabindex]"), 0);
                    return e
                }
                function g() {
                    k = s(e), t.setAttribute("aria-controls", x), t.setAttribute("aria-expanded", "false"), t.setAttribute("aria-haspopup", "true"), c["default"](k, ["li", "span"], function() {
                        var e = "SPAN" === this.tagName ? this.parentElement : this;
                        E.fire("selected", e.getAttribute("data-id"))
                    }), c["default"](t, function() {
                        v()
                    }), u["default"](window).on("focus", function() {
                        k.contains(document.activeElement) || document.activeElement === t || f()
                    });
                    var o = function(e) {
                        return("keypress" === e.type && 13 === e.which || "keydown" === e.type && 32 === e.which) && k.contains(document.activeElement) ? (E.fire("selected", document.activeElement.getAttribute("data-id")), f(), !1) : void 0
                    };
                    u["default"](k).on("keydown", o), u["default"](k).on("keypress", o), n.insertBefore(k, t.nextSibling)
                }
                function b() {
                    u["default"](document).on("click", function(e) {
                        L && !t.contains(e.target) && f()
                    }), u["default"](k).on("transitionend", function(e) {
                        this === k && "opacity" === e.propertyName && k.classList.contains("invisible") && (k.classList.add("hidden"), k.setAttribute("hidden", ""), k.classList.remove("open"))
                    }), window.addEventListener("blur", f, !1), o.on(i.Events.didExitFullscreen, f).on(i.Events.controlBarVisibilityChanged, function(e) {
                        e || f()
                    })
                }
                var w, y, E = d["default"].make(), k = null, _ = null, L = !1, x = "menu-" + Math.round(1e3 * Math.random() + (new Date).getTime());
                return g(), b(), w = Object.defineProperties({show: l, hide: f, toggle: v, setActiveItem: p, on: E.on, off: E.off, destroy: h, button: t, element: k}, {focusableItems: {get: function() {
                            return m()
                        }, configurable: !0, enumerable: !0}})
            }
            var d = s(n), u = s(o), c = s(a);
            t.exports = l
        }.apply(t, o), !(void 0 !== i && (e.exports = i))
    }, function(e, t) {
        !function() {
            function t(e, t, n) {
                var o = "blur" == t || "focus" == t;
                e.element.addEventListener(t, n, o)
            }
            function n(e) {
                e.preventDefault(), e.stopPropagation()
            }
            function o(e) {
                return u ? u : u = e.matches ? e.matches : e.webkitMatchesSelector ? e.webkitMatchesSelector : e.mozMatchesSelector ? e.mozMatchesSelector : e.msMatchesSelector ? e.msMatchesSelector : e.oMatchesSelector ? e.oMatchesSelector : d.matchesSelector
            }
            function i(e, t, n) {
                if ("_root" == t)
                    return n;
                if (e !== n)
                    return o(e).call(e, t) ? e : e.parentNode ? (c++, i(e.parentNode, t, n)) : void 0
            }
            function r(e, t, n, o) {
                v[e.id] || (v[e.id] = {}), v[e.id][t] || (v[e.id][t] = {}), v[e.id][t][n] || (v[e.id][t][n] = []), v[e.id][t][n].push(o)
            }
            function a(e, t, n, o) {
                if (v[e.id])
                    if (t) {
                        if (!o && !n)
                            return void(v[e.id][t] = {});
                        if (!o)
                            return void delete v[e.id][t][n];
                        if (v[e.id][t][n])
                            for (var i = 0; i < v[e.id][t][n].length; i++)
                                if (v[e.id][t][n][i] === o) {
                                    v[e.id][t][n].splice(i, 1);
                                    break
                                }
                    } else
                        for (var r in v[e.id])
                            v[e.id].hasOwnProperty(r) && (v[e.id][r] = {})
            }
            function s(e, t, n) {
                if (v[e][n]) {
                    var o, r, a = t.target || t.srcElement, s = {}, l = 0, u = 0;
                    c = 0;
                    for (o in v[e][n])
                        v[e][n].hasOwnProperty(o) && (r = i(a, o, p[e].element), r && d.matchesEvent(n, p[e].element, r, "_root" == o, t) && (c++, v[e][n][o].match = r, s[c] = v[e][n][o]));
                    for (t.stopPropagation = function() {
                        t.cancelBubble = !0
                    }, l = 0; c >= l; l++)
                        if (s[l])
                            for (u = 0; u < s[l].length; u++) {
                                if (s[l][u].call(s[l].match, t) === !1)
                                    return void d.cancel(t);
                                if (t.cancelBubble)
                                    return
                            }
                }
            }
            function l(e, t, n, o) {
                function i(e) {
                    return function(t) {
                        s(u, t, e)
                    }
                }
                if (this.element) {
                    e instanceof Array || (e = [e]), n || "function" != typeof t || (n = t, t = "_root");
                    var l, u = this.id;
                    for (l = 0; l < e.length; l++)
                        o ? a(this, e[l], t, n) : (v[u] && v[u][e[l]] || d.addEvent(this, e[l], i(e[l])), r(this, e[l], t, n));
                    return this
                }
            }
            function d(e, t) {
                if (!(this instanceof d)) {
                    for (var n in p)
                        if (p[n].element === e)
                            return p[n];
                    return f++, p[f] = new d(e, f), p[f]
                }
                this.element = e, this.id = t
            }
            var u, c = 0, f = 0, v = {}, p = {};
            d.prototype.on = function(e, t, n) {
                return l.call(this, e, t, n)
            }, d.prototype.off = function(e, t, n) {
                return l.call(this, e, t, n, !0)
            }, d.matchesSelector = function() {
            }, d.cancel = n, d.addEvent = t, d.matchesEvent = function() {
                return!0
            }, "undefined" != typeof e && e.exports && (e.exports = d), window.Gator = d
        }()
    }]);