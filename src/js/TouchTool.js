var TouchTool = TouchTool || {};

// Closure
(function () {
	var Point = function(){
		this.x=0;
		this.y=0;
	};
	Point.prototype.setPoint = function(pointObject) {
		this.x = pointObject.x;
		this.y = pointObject.y;
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

	TouchTool.__defineSetter__('threshold', function (value) {
		_threshold = value;
	});
	TouchTool.__defineGetter__('threshold', function () {
		return _threshold;
	});


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

		var diffX = _moved.point.x - _start.point.x;
		var diffY = _moved.point.y - _start.point.y;

		var moveDistance = Math.pow(diffX, 2) + Math.pow(diffY, 2);
		moveDistance = Math.sqrt(moveDistance);

		if (moveDistance > TouchTool.threshold){
			_movedFlag = true;
		} else {
			_movedFlag = false;
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