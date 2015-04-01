/*
 * ! jQuery Form Plugin version: 2.83 (11-JUL-2011) @requires jQuery v1.3.2 or
 * later
 * 
 * Examples and documentation at: http://malsup.com/jquery/form/ Dual licensed
 * under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(a) {
	function b() {
		var a = "[jquery.form] " + Array.prototype.join.call(arguments, "");
		if (window.console && window.console.log) {
			window.console.log(a)
		} else if (window.opera && window.opera.postError) {
			window.opera.postError(a)
		}
	}
	a.fn.ajaxSubmit = function(c) {
		function t(e) {
			function C(c) {
				if (o.aborted || B) {
					return
				}
				try {
					z = w(n)
				} catch (d) {
					b("cannot access response document: ", d);
					c = v
				}
				if (c === u && o) {
					o.abort("timeout");
					return
				} else if (c == v && o) {
					o.abort("server abort");
					return
				}
				if (!z || z.location.href == j.iframeSrc) {
					if (!r)
						return
				}
				n.detachEvent ? n.detachEvent("onload", C) : n
						.removeEventListener("load", C, false);
				var e = "success", f;
				try {
					if (r) {
						throw "timeout"
					}
					var g = j.dataType == "xml" || z.XMLDocument
							|| a.isXMLDoc(z);
					b("isXml=" + g);
					if (!g && window.opera
							&& (z.body == null || z.body.innerHTML == "")) {
						if (--A) {
							b("requeing onLoad callback, DOM not available");
							setTimeout(C, 250);
							return
						}
					}
					var h = z.body ? z.body : z.documentElement;
					o.responseText = h ? h.innerHTML : null;
					o.responseXML = z.XMLDocument ? z.XMLDocument : z;
					if (g)
						j.dataType = "xml";
					o.getResponseHeader = function(a) {
						var b = {
							"content-type" : j.dataType
						};
						return b[a]
					};
					if (h) {
						o.status = Number(h.getAttribute("status")) || o.status;
						o.statusText = h.getAttribute("statusText")
								|| o.statusText
					}
					var i = j.dataType || "";
					var l = /(json|script|text)/.test(i.toLowerCase());
					if (l || j.textarea) {
						var p = z.getElementsByTagName("textarea")[0];
						if (p) {
							o.responseText = p.value;
							o.status = Number(p.getAttribute("status"))
									|| o.status;
							o.statusText = p.getAttribute("statusText")
									|| o.statusText
						} else if (l) {
							var q = z.getElementsByTagName("pre")[0];
							var t = z.getElementsByTagName("body")[0];
							if (q) {
								o.responseText = q.textContent
										? q.textContent
										: q.innerHTML
							} else if (t) {
								o.responseText = t.innerHTML
							}
						}
					} else if (j.dataType == "xml" && !o.responseXML
							&& o.responseText != null) {
						o.responseXML = D(o.responseText)
					}
					try {
						y = F(o, j.dataType, j)
					} catch (c) {
						e = "parsererror";
						o.error = f = c || e
					}
				} catch (c) {
					b("error caught: ", c);
					e = "error";
					o.error = f = c || e
				}
				if (o.aborted) {
					b("upload aborted");
					e = null
				}
				if (o.status) {
					e = o.status >= 200 && o.status < 300 || o.status === 304
							? "success"
							: "error"
				}
				if (e === "success") {
					j.success && j.success.call(j.context, y, "success", o);
					k && a.event.trigger("ajaxSuccess", [o, j])
				} else if (e) {
					if (f == undefined)
						f = o.statusText;
					j.error && j.error.call(j.context, o, e, f);
					k && a.event.trigger("ajaxError", [o, j, f])
				}
				k && a.event.trigger("ajaxComplete", [o, j]);
				if (k && !--a.active) {
					a.event.trigger("ajaxStop")
				}
				j.complete && j.complete.call(j.context, o, e);
				B = true;
				if (j.timeout)
					clearTimeout(s);
				setTimeout(function() {
							if (!j.iframeTarget)
								m.remove();
							o.responseXML = null
						}, 100)
			}
			function x() {
				function h() {
					try {
						var a = w(n).readyState;
						b("state = " + a);
						if (a.toLowerCase() == "uninitialized")
							setTimeout(h, 50)
					} catch (c) {
						b("Server abort: ", c, " (", c.name, ")");
						C(v);
						s && clearTimeout(s);
						s = undefined
					}
				}
				var c = g.attr("target"), e = g.attr("action");
				f.setAttribute("target", l);
				if (!d) {
					f.setAttribute("method", "POST")
				}
				if (e != j.url) {
					f.setAttribute("action", j.url)
				}
				if (!j.skipEncodingOverride && (!d || /post/i.test(d))) {
					g.attr({
								encoding : "multipart/form-data",
								enctype : "multipart/form-data"
							})
				}
				if (j.timeout) {
					s = setTimeout(function() {
								r = true;
								C(u)
							}, j.timeout)
				}
				var i = [];
				try {
					if (j.extraData) {
						for (var k in j.extraData) {
							i
									.push(a('<input type="hidden" name="' + k
											+ '" />').attr("value",
											j.extraData[k]).appendTo(f)[0])
						}
					}
					if (!j.iframeTarget) {
						m.appendTo("body");
						n.attachEvent ? n.attachEvent("onload", C) : n
								.addEventListener("load", C, false)
					}
					setTimeout(h, 15);
					f.submit()
				} finally {
					f.setAttribute("action", e);
					if (c) {
						f.setAttribute("target", c)
					} else {
						g.removeAttr("target")
					}
					a(i).remove()
				}
			}
			function w(a) {
				var b = a.contentWindow
						? a.contentWindow.document
						: a.contentDocument ? a.contentDocument : a.document;
				return b
			}
			var f = g[0], h, i, j, k, l, m, n, o, p, q, r, s;
			var t = !!a.fn.prop;
			if (e) {
				for (i = 0; i < e.length; i++) {
					h = a(f[e[i].name]);
					h[t ? "prop" : "attr"]("disabled", false)
				}
			}
			if (a(":input[name=submit],:input[id=submit]", f).length) {
				alert('Error: Form elements must not have name or id of "submit".');
				return
			}
			j = a.extend(true, {}, a.ajaxSettings, c);
			j.context = j.context || j;
			l = "jqFormIO" + (new Date).getTime();
			if (j.iframeTarget) {
				m = a(j.iframeTarget);
				q = m.attr("name");
				if (q == null)
					m.attr("name", l);
				else
					l = q
			} else {
				m = a('<iframe name="' + l + '" src="' + j.iframeSrc + '" />');
				m.css({
							position : "absolute",
							top : "-1000px",
							left : "-1000px"
						})
			}
			n = m[0];
			o = {
				aborted : 0,
				responseText : null,
				responseXML : null,
				status : 0,
				statusText : "n/a",
				getAllResponseHeaders : function() {
				},
				getResponseHeader : function() {
				},
				setRequestHeader : function() {
				},
				abort : function(c) {
					var d = c === "timeout" ? "timeout" : "aborted";
					b("aborting upload... " + d);
					this.aborted = 1;
					m.attr("src", j.iframeSrc);
					o.error = d;
					j.error && j.error.call(j.context, o, d, c);
					k && a.event.trigger("ajaxError", [o, j, d]);
					j.complete && j.complete.call(j.context, o, d)
				}
			};
			k = j.global;
			if (k && !(a.active++)) {
				a.event.trigger("ajaxStart")
			}
			if (k) {
				a.event.trigger("ajaxSend", [o, j])
			}
			if (j.beforeSend && j.beforeSend.call(j.context, o, j) === false) {
				if (j.global) {
					a.active--
				}
				return
			}
			if (o.aborted) {
				return
			}
			p = f.clk;
			if (p) {
				q = p.name;
				if (q && !p.disabled) {
					j.extraData = j.extraData || {};
					j.extraData[q] = p.value;
					if (p.type == "image") {
						j.extraData[q + ".x"] = f.clk_x;
						j.extraData[q + ".y"] = f.clk_y
					}
				}
			}
			var u = 1;
			var v = 2;
			if (j.forceSync) {
				x()
			} else {
				setTimeout(x, 10)
			}
			var y, z, A = 50, B;
			var D = a.parseXML || function(a, b) {
				if (window.ActiveXObject) {
					b = new ActiveXObject("Microsoft.XMLDOM");
					b.async = "false";
					b.loadXML(a)
				} else {
					b = (new DOMParser).parseFromString(a, "text/xml")
				}
				return b && b.documentElement
						&& b.documentElement.nodeName != "parsererror"
						? b
						: null
			};
			var E = a.parseJSON || function(a) {
				return window["eval"]("(" + a + ")")
			};
			var F = function(b, c, d) {
				var e = b.getResponseHeader("content-type") || "", f = c === "xml"
						|| !c && e.indexOf("xml") >= 0, g = f
						? b.responseXML
						: b.responseText;
				if (f && g.documentElement.nodeName === "parsererror") {
					a.error && a.error("parsererror")
				}
				if (d && d.dataFilter) {
					g = d.dataFilter(g, c)
				}
				if (typeof g === "string") {
					if (c === "json" || !c && e.indexOf("json") >= 0) {
						g = E(g)
					} else if (c === "script" || !c
							&& e.indexOf("javascript") >= 0) {
						a.globalEval(g)
					}
				}
				return g
			}
		}
		if (!this.length) {
			b("ajaxSubmit: skipping submit process - no element selected");
			return this
		}
		var d, e, f, g = this;
		if (typeof c == "function") {
			c = {
				success : c
			}
		}
		d = this.attr("method");
		e = this.attr("action");
		f = typeof e === "string" ? a.trim(e) : "";
		f = f || window.location.href || "";
		if (f) {
			f = (f.match(/^([^#]+)/) || [])[1]
		}
		c = a.extend(true, {
					url : f,
					success : a.ajaxSettings.success,
					type : d || "GET",
					iframeSrc : /^https/i.test(window.location.href || "")
							? "javascript:false"
							: "about:blank"
				}, c);
		var h = {};
		this.trigger("form-pre-serialize", [this, c, h]);
		if (h.veto) {
			b("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
			return this
		}
		if (c.beforeSerialize && c.beforeSerialize(this, c) === false) {
			b("ajaxSubmit: submit aborted via beforeSerialize callback");
			return this
		}
		var i, j, k = this.formToArray(c.semantic);
		if (c.data) {
			c.extraData = c.data;
			for (i in c.data) {
				if (c.data[i] instanceof Array) {
					for (var l in c.data[i]) {
						k.push({
									name : i,
									value : c.data[i][l]
								})
					}
				} else {
					j = c.data[i];
					j = a.isFunction(j) ? j() : j;
					k.push({
								name : i,
								value : j
							})
				}
			}
		}
		if (c.beforeSubmit && c.beforeSubmit(k, this, c) === false) {
			b("ajaxSubmit: submit aborted via beforeSubmit callback");
			return this
		}
		this.trigger("form-submit-validate", [k, this, c, h]);
		if (h.veto) {
			b("ajaxSubmit: submit vetoed via form-submit-validate trigger");
			return this
		}
		var m = a.param(k);
		if (c.type.toUpperCase() == "GET") {
			c.url += (c.url.indexOf("?") >= 0 ? "&" : "?") + m;
			c.data = null
		} else {
			c.data = m
		}
		var n = [];
		if (c.resetForm) {
			n.push(function() {
						g.resetForm()
					})
		}
		if (c.clearForm) {
			n.push(function() {
						g.clearForm()
					})
		}
		if (!c.dataType && c.target) {
			var o = c.success || function() {
			};
			n.push(function(b) {
						var d = c.replaceTarget ? "replaceWith" : "html";
						a(c.target)[d](b).each(o, arguments)
					})
		} else if (c.success) {
			n.push(c.success)
		}
		c.success = function(a, b, d) {
			var e = c.context || c;
			for (var f = 0, h = n.length; f < h; f++) {
				n[f].apply(e, [a, b, d || g, g])
			}
		};
		var p = a("input:file", this).length > 0;
		var q = "multipart/form-data";
		var r = g.attr("enctype") == q || g.attr("encoding") == q;
		if (c.iframe !== false && (p || c.iframe || r)) {
			if (c.closeKeepAlive) {
				a.get(c.closeKeepAlive, function() {
							t(k)
						})
			} else {
				t(k)
			}
		} else {
			if (a.browser.msie && d == "get") {
				var s = g[0].getAttribute("method");
				if (typeof s === "string")
					c.type = s
			}
			a.ajax(c)
		}
		this.trigger("form-submit-notify", [this, c]);
		return this
	};
	a.fn.ajaxForm = function(c) {
		if (this.length === 0) {
			var d = {
				s : this.selector,
				c : this.context
			};
			if (!a.isReady && d.s) {
				b("DOM not ready, queuing ajaxForm");
				a(function() {
							a(d.s, d.c).ajaxForm(c)
						});
				return this
			}
			b("terminating; zero elements found by selector"
					+ (a.isReady ? "" : " (DOM not ready)"));
			return this
		}
		return this.ajaxFormUnbind().bind("submit.form-plugin", function(b) {
					if (!b.isDefaultPrevented()) {
						b.preventDefault();
						a(this).ajaxSubmit(c)
					}
				}).bind("click.form-plugin", function(b) {
					var c = b.target;
					var d = a(c);
					if (!d.is(":submit,input:image")) {
						var e = d.closest(":submit");
						if (e.length == 0) {
							return
						}
						c = e[0]
					}
					var f = this;
					f.clk = c;
					if (c.type == "image") {
						if (b.offsetX != undefined) {
							f.clk_x = b.offsetX;
							f.clk_y = b.offsetY
						} else if (typeof a.fn.offset == "function") {
							var g = d.offset();
							f.clk_x = b.pageX - g.left;
							f.clk_y = b.pageY - g.top
						} else {
							f.clk_x = b.pageX - c.offsetLeft;
							f.clk_y = b.pageY - c.offsetTop
						}
					}
					setTimeout(function() {
								f.clk = f.clk_x = f.clk_y = null
							}, 100)
				})
	};
	a.fn.ajaxFormUnbind = function() {
		return this.unbind("submit.form-plugin click.form-plugin")
	};
	a.fn.formToArray = function(b) {
		var c = [];
		if (this.length === 0) {
			return c
		}
		var d = this[0];
		var e = b ? d.getElementsByTagName("*") : d.elements;
		if (!e) {
			return c
		}
		var f, g, h, i, j, k, l;
		for (f = 0, k = e.length; f < k; f++) {
			j = e[f];
			h = j.name;
			if (!h) {
				continue
			}
			if (b && d.clk && j.type == "image") {
				if (!j.disabled && d.clk == j) {
					c.push({
								name : h,
								value : a(j).val()
							});
					c.push({
								name : h + ".x",
								value : d.clk_x
							}, {
								name : h + ".y",
								value : d.clk_y
							})
				}
				continue
			}
			i = a.fieldValue(j, true);
			if (i && i.constructor == Array) {
				for (g = 0, l = i.length; g < l; g++) {
					c.push({
								name : h,
								value : i[g]
							})
				}
			} else if (i !== null && typeof i != "undefined") {
				c.push({
							name : h,
							value : i
						})
			}
		}
		if (!b && d.clk) {
			var m = a(d.clk), n = m[0];
			h = n.name;
			if (h && !n.disabled && n.type == "image") {
				c.push({
							name : h,
							value : m.val()
						});
				c.push({
							name : h + ".x",
							value : d.clk_x
						}, {
							name : h + ".y",
							value : d.clk_y
						})
			}
		}
		return c
	};
	a.fn.formSerialize = function(b) {
		return a.param(this.formToArray(b))
	};
	a.fn.fieldSerialize = function(b) {
		var c = [];
		this.each(function() {
					var d = this.name;
					if (!d) {
						return
					}
					var e = a.fieldValue(this, b);
					if (e && e.constructor == Array) {
						for (var f = 0, g = e.length; f < g; f++) {
							c.push({
										name : d,
										value : e[f]
									})
						}
					} else if (e !== null && typeof e != "undefined") {
						c.push({
									name : this.name,
									value : e
								})
					}
				});
		return a.param(c)
	};
	a.fn.fieldValue = function(b) {
		for (var c = [], d = 0, e = this.length; d < e; d++) {
			var f = this[d];
			var g = a.fieldValue(f, b);
			if (g === null || typeof g == "undefined" || g.constructor == Array
					&& !g.length) {
				continue
			}
			g.constructor == Array ? a.merge(c, g) : c.push(g)
		}
		return c
	};
	a.fieldValue = function(b, c) {
		var d = b.name, e = b.type, f = b.tagName.toLowerCase();
		if (c === undefined) {
			c = true
		}
		if (c
				&& (!d || b.disabled || e == "reset" || e == "button"
						|| (e == "checkbox" || e == "radio") && !b.checked
						|| (e == "submit" || e == "image") && b.form
						&& b.form.clk != b || f == "select"
						&& b.selectedIndex == -1)) {
			return null
		}
		if (f == "select") {
			var g = b.selectedIndex;
			if (g < 0) {
				return null
			}
			var h = [], i = b.options;
			var j = e == "select-one";
			var k = j ? g + 1 : i.length;
			for (var l = j ? g : 0; l < k; l++) {
				var m = i[l];
				if (m.selected) {
					var n = m.value;
					if (!n) {
						n = m.attributes && m.attributes["value"]
								&& !m.attributes["value"].specified
								? m.text
								: m.value
					}
					if (j) {
						return n
					}
					h.push(n)
				}
			}
			return h
		}
		return a(b).val()
	};
	a.fn.clearForm = function() {
		return this.each(function() {
					a("input,select,textarea", this).clearFields()
				})
	};
	a.fn.clearFields = a.fn.clearInputs = function() {
		var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
					var b = this.type, c = this.tagName.toLowerCase();
					if (a.test(b) || c == "textarea") {
						this.value = ""
					} else if (b == "checkbox" || b == "radio") {
						this.checked = false
					} else if (c == "select") {
						this.selectedIndex = -1
					}
				})
	};
	a.fn.resetForm = function() {
		return this.each(function() {
					if (typeof this.reset == "function"
							|| typeof this.reset == "object"
							&& !this.reset.nodeType) {
						this.reset()
					}
				})
	};
	a.fn.enable = function(a) {
		if (a === undefined) {
			a = true
		}
		return this.each(function() {
					this.disabled = !a
				})
	};
	a.fn.selected = function(b) {
		if (b === undefined) {
			b = true
		}
		return this.each(function() {
					var c = this.type;
					if (c == "checkbox" || c == "radio") {
						this.checked = b
					} else if (this.tagName.toLowerCase() == "option") {
						var d = a(this).parent("select");
						if (b && d[0] && d[0].type == "select-one") {
							d.find("option").selected(false)
						}
						this.selected = b
					}
				})
	};
})(jQuery)

$(document).ready(function() {
			var options = {
				target : '#alert'
			};
			$('#contactForm').ajaxForm(options);
		});

$.fn.clearForm = function() {
	return this.each(function() {
				var type = this.type, tag = this.tagName.toLowerCase();
				if (tag == 'form')
					return $(':input', this).clearForm();
				if (type == 'text' || type == 'password' || tag == 'textarea')
					this.value = '';
				else if (type == 'checkbox' || type == 'radio')
					this.checked = false;
				else if (tag == 'select')
					this.selectedIndex = -1;
			});
};
