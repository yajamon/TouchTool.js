var TouchTool = TouchTool || {};

// Closure
(function () {
	var Point = function(){
		this._x=0;
		this._y=0;
	};
	Object.defineProperty(Point.prototype,
		'x',
		{
			get : function () {
				return this._x;
			},
			set : function (value) {
				this._x = value;
			}
		}
	);
	Object.defineProperty(Point.prototype,
		'y',
		{
			get : function () {
				return this._y;
			},
			set : function (value) {
				this._y = value;
			}
		}
	);
	Point.prototype.setPoint = function(pointObject) {
		this.x = pointObject.x;
		this.y = pointObject.y;
	};
	Point.prototype.getDistanceBy = function(pointObject) {
		var diffX = pointObject.x - this.x;
		var diffY = pointObject.y - this.y;

		var moveDistance = Math.pow(diffX, 2) + Math.pow(diffY, 2);
		return Math.sqrt(moveDistance);
	};


	var _start = {
		point : new Point(),
	};
	var _moved = {
		point : new Point(),
	};
	// 閾値
	var _threshold = 50;
	//
	var _movedFlag = false;

	Object.defineProperty(
		TouchTool,
		'threshold',
		{
			get : function () {
				return _threshold;
			},
			set : function (value) {
				_threshold = value;
			},
			configurable : true,
		}
	);

	function _setPoint(pointObject, touchEvent){
		pointObject.setPoint({
			x : touchEvent.changedTouches[0].screenX,
			y : touchEvent.changedTouches[0].screenY,
		});
	}

	function _moveCheck () {
		if (_movedFlag) {
			return;
		}

		var moveDistance = _start.point.getDistanceBy(_moved.point);

		if (moveDistance > TouchTool.threshold){
			_movedFlag = true;
		}
	}


	TouchTool.setStartPoint = function (touchEvent) {
		_setPoint(_start.point, touchEvent);
		_movedFlag = false;
	};

	TouchTool.setMovedPoint = function(touchEvent) {
		_setPoint(_moved.point, touchEvent);
		_moveCheck();
	};


	TouchTool.isTap = function(){
		return !_movedFlag;
	};
})();