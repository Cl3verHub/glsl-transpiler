/**
 * OpenGL/WebGL environment methods.
 *
 * @module  glsl-js/lib/stdlib
 */

var operators = require('./operators').operators;


/**
 * Types stubs
 */
function bool (val) {
	return !!val;
}

function int (val) {
	return val|0;
}

function float (val) {
	return +val;
}

function vec2 (x, y) {
	if (x == null) x = 0;
	if (y == null) y = x;
	return [x, y]
}

function vec3 (x, y, z) {
	if (x == null) x = 0;
	if (y == null) y = x;
	if (z == null) z = y;
	return [x, y, z]
}

function vec4 (x, y, z, w) {
	if (x == null) x = 0;
	if (y == null) y = x;
	if (z == null) z = y;
	if (w == null) w = z;
	return [x, y, z, w]
}

function ivec2 (x, y) {
	if (x == null) x = 0;
	if (y == null) y = x;
	return [x, y]
}

function ivec3 (x, y, z) {
	if (x == null) x = 0;
	if (y == null) y = x;
	if (z == null) z = y;
	return [x, y, z]
}

function ivec4 (x, y, z, w) {
	if (x == null) x = 0;
	if (y == null) y = x;
	if (z == null) z = y;
	if (w == null) w = z;
	return [x, y, z, w]
}

function mat2 (x) {
	if (x == null) x = 1;
	if (x.length === 4) return x;
	if (x.length === 2) return [x[0], 0, 0, x[1]];
	return [x, 0, 0, x]
}

function mat3 (x) {
	if (x == null) x = 1;
	if (x.length === 9) return x;
	if (x.length === 3) return [x[0], 0, 0, 0, x[1], 0, 0, 0, x[2]];
	return [x, 0, 0, 0, x, 0, 0, 0, x]
}

function mat4 (x) {
	if (x == null) x = 1;
	if (x.length === 16) return x;
	if (x.length === 4) return [x[0], 0, 0, 0, 0, x[1], 0, 0, 0, 0, x[2], 0, 0, 0, 0, x[3]];
	return [x, 0, 0, 0, 0, x, 0, 0, 0, 0, x, 0, 0, 0, 0, x]
}


/**
 * Types operations.
 */
createOperations(vec2, 2);
createOperations(vec3, 3);
createOperations(vec4, 4);
createOperations(mat2, 4);
createOperations(ivec2, 2);
createOperations(ivec3, 3);
createOperations(ivec4, 4);

function createOperations(obj, len) {
	for (var operator in operators) {
		var comps = [];
		for (var i = 0; i < len; i++) {
			comps.push(`out[${i}] = a[${i}] ${operator} b[${i}]`);
		}
		if (operator == '==' || operator == '!=') {
			var comps2 = [];
			for (var i = 0; i < len; i++) {
				comps2.push(`out[${i}]`);
			}
			obj[operators[operator]] = new Function ('out', 'a', 'b',
				`${comps.join(';\n')}\nreturn !!(${comps2.join((operator == '==') ? '&&' : '||')});`
			);
		}
		else {
			obj[operators[operator]] = new Function ('out', 'a', 'b',
				`${comps.join(';\n')}\nreturn out;`
			);
		}
	}
}


/**
 * Math
 */
function floatBitsToInt(f) {
	var buf = new ArrayBuffer(4);
    (new Float32Array(buf))[0] = f;
    return (new Int32Array(buf))[0];
}
floatBitsToInt.type = 'int';
 
function radians (degrees) {
	if (degrees.length) return degrees.map(radians);
	return degrees * 0.017453292519943295;
}

function degrees (radians) {
	if (radians.length) return radians.map(degrees);
	return radians * 57.29577951308232;
}

function sin (angle) {
	if (angle.length) return angle.map(sin);
	return Math.sin(angle);
}

function cos (angle) {
	if (angle.length) return angle.map(cos);
	return Math.cos(angle);
}

function tan (angle) {
	if (angle.length) return angle.map(tan);
	return Math.tan(angle);
}

function asin (x) {
	if (x.length) return x.map(asin);
	return Math.asin(x);
}

function acos (x) {
	if (x.length) return x.map(acos);
	return Math.acos(x);
}

function atan (y, x) {
	if (arguments.length > 1) {
		if (y.length) return y.map(function (y, i) {
			return Math.atan2(y, x[i]);
		});

		return Math.atan2(y, x);
	}

	if (y.length) return y.map(function (y, i) {
		return Math.atan(y)
	});

	return Math.atan(y);
}

function pow (x, y) {
	if (x.length) return x.map(function (x, i) {
		return Math.pow(x, y[i]);
	});
	return Math.pow(x, y);
}

function exp (x) {
	if (x.length) return x.map(exp);
	return Math.exp(x);
}

function log (x) {
	if (x.length) return x.map(log);
	return Math.log(x);
}

var log2 = Math.log2 ? function log2 (x) {
		if (x.length) return x.map(log2);
		return Math.log2(x);
	} : function log2 (x) {
		if (x.length) return x.map(log2);
		return Math.log(x) / Math.LN2;
	};

function exp2 (x) {
	if (x.length) return x.map(exp2);
	return Math.pow(2, x);
}

function sqrt (x) {
	if (x.length) return x.map(sqrt);
	return Math.sqrt(x);
}

function inversesqrt (x) {
	if (x.length) return x.map(inversesqrt);
	return 1 / Math.sqrt(x);
}

function abs (x) {
	if (x.length) return x.map(abs);
	return Math.abs(x);
}

function floor (x) {
	if (x.length) return x.map(floor);
	return Math.floor(x);
}

function ceil (x) {
	if (x.length) return x.map(ceil);
	return Math.ceil(x);
}

var sign = Math.sign ? function sign (x) {
	if (x.length) return x.map(sign);
	return Math.sign(x);
} : function sign (x) {
	if (x.length) return x.map(sign);

	x = +x; // convert to a number

	if (x === 0 || isNaN(x)) {
		return x;
	}

	return x > 0 ? 1 : -1;
};

function fract (x) {
	if (x.length) return x.map(fract);
	return x - Math.floor(x);
}

function mod (x, y) {
	if (x.length) {
		if (y.length) return x.map(function (x, i) {
			return x % y[i];
		});
		return x.map(function (x, i) {
			return x % y;
		});
	}
	return x % y;
}

function min (x, y) {
	if (x.length) {
		if (y.length) return x.map(function (x, i) {
			return Math.min(x, y[i]);
		});
		return x.map(function (x, i) {
			return Math.min(x, y);
		});
	}
	return Math.min(x, y);
}

function max (x, y) {
	if (x.length) {
		if (y.length) return x.map(function (x, i) {
			return Math.max(x, y[i]);
		});
		return x.map(function (x, i) {
			return Math.max(x, y);
		});
	}
	return Math.max(x, y);
}

function clamp (x, min, max) {
	if (x.length) {
		if (min.length) return x.map(function (x, i) {
			return Math.min(Math.max(x, min[i]), max[i]);
		});
		return x.map(function (x, i) {
			return Math.min(Math.max(x, min), max);
		});
	}

	return Math.min(Math.max(x, min), max);
}

function mix (x, y, a) {
	if (x.length) {
		if (a.length) return x.map(function (x, i) {
			return mix(x, y[i], a[i]);
		});
		return x.map(function (x, i) {
			return mix(x, y[i], a);
		});
	}

	return x * (1.0 - a) + y * a;
}

function step (edge, x) {
	if (x.length) {
		if (edge.length) return x.map(function (x, i) {
			return step(edge[i], x);
		});
		return x.map(function (x, i) {
			return step(edge, x);
		});
	}

	return x < edge ? 0.0 : 1.0;
}
step.type = function (node) {
	return this.process(node.children[1]).type;
}

function smoothstep (edge0, edge1, x) {
	if (x.length) {
		if (edge0.length) return x.map(function (x, i) {
			return smoothstep(edge0[i], edge1[i], x);
		});
		return x.map(function (x, i) {
			return smoothstep(edge0, edge1, x);
		});
	}

	var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
	return t * t * (3.0 - 2.0 * t);
}

function length (x) {
	var sum = 0;
	for (var i = 0; i < x.length; i++) {
		sum += x[i]*x[i];
	}
	return Math.sqrt(sum);
}
length.type = 'float';

function distance(x, y) {
	var sum = 0;
	for (var i = 0; i < x.length; i++) {
		sum += (x[i]-y[i])*(x[i]-y[i]);
	}
	return Math.sqrt(sum);
}
distance.type = 'float';

function dot (x, y) {
	var sum = 0;
	for (var i = 0; i < x.length; i++) {
		sum += x[i]*y[i];
	}
	return sum;
}
dot.type = 'float';

function cross (x, y) {
	var x0 = x[0], x1 = x[1], x2 = x[2],
	y0 = y[0], y1 = y[1], y2 = y[2];
	var out = [0, 0, 0];
	out[0] = x1 * y2 - x2 * y1;
	out[1] = x2 * y0 - x0 * y2;
	out[2] = x0 * y1 - x1 * y0;
	return out;
}
cross.type = 'vec3';

function normalize (x) {
	var len = 0;
	for (var i = 0; i < x.length; i++) {
		len += x[i]*x[i];
	}

	var out = Array(x.length).fill(0);
	if (len > 0) {
		len = 1 / Math.sqrt(len);
		for (var i = 0; i < x.length; i++) {
			out[i] = x[i] * len;
		}
	}
	return out;
}

function faceforward (N, I, Nref) {
	if (Nref == null) Nref = N;

	var dot = 0;
	for (var i = 0; i < N.length; i++) {
		dot += Nref[i]*I[i];
	}

	return dot > 0 ? N.map(function (x) { return -x;}) : N;
}

function reflect (I, N) {
	var dot = 0;
	for (var i = 0; i < N.length; i++) {
		dot += N[i]*I[i];
	}

	var out = Array(N.length);
	for (var i = 0; i < N.length; i++) {
		out[i] = I[i] - 2 * dot * N[i];
	}

	return out;
}

function refract (I, N, eta) {
	var dot = 0;
	for (var i = 0; i < N.length; i++) {
		dot += N[i]*I[i];
	}

	var k = 1 - eta*eta*(1 - dot*dot);

	var out = Array(N.length).fill(0);

	if (k > 0) {
		for (var i = 0; i < N.length; i++) {
			out[i] = eta*I[i] - (eta*dot + Math.sqrt(k)) * N[i];
		}
	}

	return out;
}


/**
 * Vector relational functions
 */
function lessThan (x, y) {
	if (x.length) {
		var out = Array(x.length);
		for (var i = 0; i < x.length; i++) {
			out[i] = x[i] < y[i];
		}
		return out;
	}
	return x < y;
}

function lessThanEqual (x, y) {
	if (x.length) {
		var out = Array(x.length);
		for (var i = 0; i < x.length; i++) {
			out[i] = x[i] <= y[i];
		}
		return out;
	}
	return x <= y;
}

function greaterThan (x, y) {
	if (x.length) {
		var out = Array(x.length);
		for (var i = 0; i < x.length; i++) {
			out[i] = x[i] > y[i];
		}
		return out;
	}
	return x > y;
}

function greaterThanEqual (x, y) {
	if (x.length) {
		var out = Array(x.length);
		for (var i = 0; i < x.length; i++) {
			out[i] = x[i] >= y[i];
		}
		return out;
	}
	return x >= y;
}

function equal(x, y) {
	if (x.length) {
		for (var i = 0; i < x.length; i++) {
			if (x[i] != y[i]) {
				return false;
			}
		}
		return true;
	}
	return x == y;
}

function notEqual (x, y) {
	if (x.length) {
		for (var i = 0; i < x.length; i++) {
			if (x[i] != y[i]) {
				return true;
			}
		}
		return false;
	}
	return x != y;
}

function any(x) {
	return x.some(function (x) {return x;});
}

function all(x) {
	return x.every(function (x) {return x;});
}

function not (x) {
	if (x.length) {
		var out = Array(x.length);
		for (var i = 0; i < x.length; i++) {
			out[i] = !x[i];
		}
		return out;
	}
	return !x
}

function neg (x) {
	if (x.length) {
		var out = Array(x.length);
		for (var i = 0; i < x.length; i++) {
			out[i] = -x[i];
		}
		return out;
	}
	return -x
}

function multScalar (a, b) {
	if (a.length) {
		var out = Array(a.length);
		for (var i = 0; i < a.length; i++) {
			out[i] = a[i] * b;
		}
		return out;
	}
	else {
		var out = Array(b.length);
		for (var i = 0; i < b.length; i++) {
			out[i] = a * b[i];
		}
		return out;
	}
}

function divScalar (a, b) {
	if (a.length) {
		var out = Array(a.length);
		for (var i = 0; i < a.length; i++) {
			out[i] = a[i] / b;
		}
		return out;
	}
	else {
		var out = Array(b.length);
		for (var i = 0; i < b.length; i++) {
			out[i] = a / b[i];
		}
		return out;
	}
}

/**
 * Matrices
 */
function matrixCompMult (x, y) {
	var out = Array(x.length);
	for (var i = 0; i < x.length; i++) {
		out[i] = x[i]*y[i];
	}
	return out;
}

function outerProduct (c, r) {
	var out = [];
	var l = c.length;
	for (var i = 0; i < c.length; i++) {
		for (var j = 0; j < r.length; j++) {
			out[i*l + j] = c[i]*r[j];
		}
	}
	return out;
}
outerProduct.type = function (node) {
	var child1Type = this.process(node.children[1]).type;
	var child2Type = this.process(node.children[2]).type;
	var dim1 = child1Type.slice(-1);
	var dim2 = child2Type.slice(-1);
	return `mat${dim1}x${dim2}`;
};

function transpose (m) {
	var l = m.length === 16 ? 4 : m.length === 9 ? 3 : 2;
	var out = Array(m.length);
	for (var i = 0; i < l; i++) {
		for (var j = 0; j < l; j++) {
			out[j*l + i] = m[i*l + j];
		}
	}
	return out;
}

function determinant (m) {
	if (m.length === 4) {
		return m[0]*m[3] - m[1]*m[2];
	}

	if (m.length === 9) {
		var a00 = m[0], a01 = m[1], a02 = m[2], a10 = m[3], a11 = m[4], a12 = m[5], a20 = m[6], a21 = m[7], a22 = m[8];

		return a00*a11*a22 + a01*a12*a20 + a02*a10*a21 - a02*a11*a20 - a01*a10*a22 - a00*a12*a21;
	}

	var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
		a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
		a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11],
		a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],

		b00 = a00 * a11 - a01 * a10,
		b01 = a00 * a12 - a02 * a10,
		b02 = a00 * a13 - a03 * a10,
		b03 = a01 * a12 - a02 * a11,
		b04 = a01 * a13 - a03 * a11,
		b05 = a02 * a13 - a03 * a12,
		b06 = a20 * a31 - a21 * a30,
		b07 = a20 * a32 - a22 * a30,
		b08 = a20 * a33 - a23 * a30,
		b09 = a21 * a32 - a22 * a31,
		b10 = a21 * a33 - a23 * a31,
		b11 = a22 * a33 - a23 * a32;

	return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
determinant.type = 'float';

//FIXME: optimize the method inclusion, per-matrix
//FIXME: inverse the dimensions of the input matrix: mat2x3 → mat3x2
function inverse (a) {
	var l = a.length;
	var out = Array(l);

	if (l === 4) {
		var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

		det = a0 * a3 - a2 * a1;

		if (!det) {
			return out;
		}
		det = 1.0 / det;

		out[0] =  a3 * det;
		out[1] = -a1 * det;
		out[2] = -a2 * det;
		out[3] =  a0 * det;

		return out;
	}

	if (l === 9) {
		var a00 = a[0], a01 = a[1], a02 = a[2],
		a10 = a[3], a11 = a[4], a12 = a[5],
		a20 = a[6], a21 = a[7], a22 = a[8],

		b01 = a22 * a11 - a12 * a21,
		b11 = -a22 * a10 + a12 * a20,
		b21 = a21 * a10 - a11 * a20,

		det = a00 * b01 + a01 * b11 + a02 * b21;

		if (!det) {
			return out;
		}
		det = 1.0 / det;

		out[0] = b01 * det;
		out[1] = (-a22 * a01 + a02 * a21) * det;
		out[2] = (a12 * a01 - a02 * a11) * det;
		out[3] = b11 * det;
		out[4] = (a22 * a00 - a02 * a20) * det;
		out[5] = (-a12 * a00 + a02 * a10) * det;
		out[6] = b21 * det;
		out[7] = (-a21 * a00 + a01 * a20) * det;
		out[8] = (a11 * a00 - a01 * a10) * det;
		return out;
	}

	var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
		a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
		a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
		a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

		b00 = a00 * a11 - a01 * a10,
		b01 = a00 * a12 - a02 * a10,
		b02 = a00 * a13 - a03 * a10,
		b03 = a01 * a12 - a02 * a11,
		b04 = a01 * a13 - a03 * a11,
		b05 = a02 * a13 - a03 * a12,
		b06 = a20 * a31 - a21 * a30,
		b07 = a20 * a32 - a22 * a30,
		b08 = a20 * a33 - a23 * a30,
		b09 = a21 * a32 - a22 * a31,
		b10 = a21 * a33 - a23 * a31,
		b11 = a22 * a33 - a23 * a32,

	det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	if (!det) {
		return out;
	}
	det = 1.0 / det;

	out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

	return out;
}

/**
 * mat * mat
 */
function matrixMult (m, n) {
	var l = m.length === 16 ? 4 : m.length === 9 ? 3 : 2;
	var out = Array(m.length);
	for (var i = 0; i < l; i++) {
		for (var j = 0; j < l; j++) {
			var sum = 0;
			for (var o = 0; o < l; o++) {
				sum += m[l*o + i] * n[j*l + o];
			}
			out[j*l + i] = sum;
		}
	}
	return out;
}


/**
 * Get texture value.
 * It has the output type of first arg.
 */
function texture (sampler, coord, lod = 0) {
	var face = 0;
	
	if(coord.length > 2 && !sampler.isTexture3D) {
		var vDir = [coord[0], coord[1], coord[2]];
		var vAbsDir = [Math.abs(vDir[0]), Math.abs(vDir[1]), Math.abs(vDir[2])];
		var maxValue = Math.max(Math.max(vAbsDir[0], vAbsDir[1]), vAbsDir[2]);
		
		if(maxValue == vAbsDir[2]) {
			coord = [(vDir[0]/vDir[2])*0.5 + 0.5, (vDir[1]/vDir[2])*0.5 + 0.5];
			coord[1] = 1.0 - coord[1];
			
			if(vDir[2] > 0.0) {
				face = 4;
			}
			else {
				face = 5;
				coord[0] = 1.0 - coord[0];
			}
		}
		else if(maxValue == vAbsDir[0]) {
			coord = [(vDir[2]/vDir[0])*0.5 + 0.5, (vDir[1]/vDir[0])*0.5 + 0.5];
			coord[1] = 1.0 - coord[1];
			
			if(vDir[0] > 0.0) {
				face = 0;
				coord[0] = 1.0 - coord[0];
			}
			else {
				face = 1;
				coord[0] = 1.0 - coord[0];
				coord[1] = 1.0 - coord[1];
			}
		}
		else {
			coord = [(vDir[0]/vDir[1])*0.5 + 0.5, (vDir[2]/vDir[1])*0.5 + 0.5];
			
			if(vDir[1] > 0.0) {
				face = 2;
			}
			else {
				face = 3;
				coord[0] = 1.0 - coord[0];
			}
		}
	}
	
	var size = textureSize(sampler, lod);
	var x = ((coord[0] % 1) * size[0])|0;
	var y = ((coord[1] % 1) * size[1])|0;
	var z = ((coord[2] % 1) * size[2])|0;
	var offset = sampler.isOneChannel ? 1 : 4;
	
	var idx = y * offset * size[0] + x * offset;
	if (sampler.mipLevels[lod].faces[face][z].data) {
		return sampler.mipLevels[lod].faces[face][z].data.slice(idx, idx + offset);
	}
	return sampler.mipLevels[lod].faces[face][z].slice(idx, idx + offset);
}
function textureLod (sampler, coord, lod = 0) {
	return texture(sampler, coord, lod)
}
function texelFetch (sampler, coord, lod = 0) {
	var size = textureSize(sampler, lod);
	var x = min(max(0, coord[0]), size[0])|0;
	var y = min(max(0, coord[1]), size[1])|0;
	var z = min(max(0, coord[2]), size[2])|0;
	var offset = sampler.isOneChannel ? 1 : 4;
	
	var idx = y * offset * size[0] + x * offset;
	if (sampler.mipLevels[lod].faces[0][z].data) {
		return sampler.mipLevels[lod].faces[0][z].data.slice(idx, idx + offset);
	}
	return sampler.mipLevels[lod].faces[0][z].slice(idx, idx + offset);
}

texture.include = ['texelFetch'];
texture.include = ['textureSize'];
texture.type = function (node) {
	var samplerType = this.process(node.children[1]).type;
	return this.types[samplerType].type;
};
texture.type = function (node) {
	/*
		var samplerType = this.process(node.children[1]).type;
		if (/1D/.test(samplerType)) return 'int';
		if (/2D|Cube/.test(samplerType)) return 'ivec2';
		return 'ivec3';
	*/
	return 'vec4';
};

function textureSize (sampler, lod = 0) {
	if (sampler.mipLevels.shape) return [sampler.mipLevels.shape[0], sampler.mipLevels.shape[1]];
	return [sampler.mipLevels[lod].width, sampler.mipLevels[lod].height, sampler.mipLevels[lod].depth];
};
textureSize.type = 'ivec2';

exports.bool = bool;
exports.int = int;
exports.uint = int;
exports.float = float;
exports.double = float;
exports.vec2 = vec2;
exports.vec3 = vec3;
exports.vec4 = vec4;
exports.dvec2 = vec2;
exports.dvec3 = vec3;
exports.dvec4 = vec4;
exports.ivec2 = ivec2;
exports.ivec3 = ivec3;
exports.ivec4 = ivec4;
exports.uvec2 = vec2;
exports.uvec3 = vec3;
exports.uvec4 = vec4;
exports.mat2 = mat2;
exports.mat3 = mat3;
exports.mat4 = mat4;
exports.mat3x3 = mat3;
exports.mat4x4 = mat4;

exports.floatBitsToInt = floatBitsToInt;
exports.radians = radians;
exports.degrees = degrees;
exports.sin = sin;
exports.cos = cos;
exports.tan = tan;
exports.asin = asin;
exports.acos = acos;
exports.atan = atan;
exports.pow = pow;
exports.exp = exp;
exports.log = log;
exports.log2 = log2;
exports.exp2 = exp2;
exports.sqrt = sqrt;
exports.inversesqrt = inversesqrt;
exports.abs = abs;
exports.sign = sign;
exports.floor = floor;
exports.ceil = ceil;
exports.fract = fract;
exports.mod = mod;
exports.min = min;
exports.max = max;
exports.clamp = clamp;
exports.mix = mix;
exports.step = step;
exports.smoothstep = smoothstep;
exports.length = length;
exports.distance = distance;
exports.dot = dot;
exports.cross = cross;
exports.faceforward = faceforward;
exports.normalize = normalize;
exports.reflect = reflect;
exports.refract = refract;
exports.lessThan = lessThan;
exports.lessThanEqual = lessThanEqual;
exports.greaterThan = greaterThan;
exports.greaterThanEqual = greaterThanEqual;
exports.equal = equal;
exports.notEqual = notEqual;
exports.any = any;
exports.all = all;
exports.not = not;
exports.neg = neg;
exports.multScalar = multScalar;
exports.divScalar = divScalar;
exports.matrixCompMult = matrixCompMult;
exports.matrixMult = matrixMult;
exports.outerProduct = outerProduct;
exports.transpose = transpose;
exports.determinant = determinant;
exports.inverse = inverse;

exports.texture1D =
exports.texture2D =
exports.texture3D =
exports.textureCube =
exports.shadow1D =
exports.shadow2D =
exports.shadow3D =
exports.texture = texture;
exports.textureSize = textureSize;
exports.texelFetch = texelFetch;
exports.textureLod = textureLod;
