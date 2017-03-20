define(['enthraler', 'css!beforeAndAfter'], function (enthraler, $) {

	var Hello = function(environment) {
		var container = document.createElement('div'),
			resizeContainer = document.createElement('div'),
			afterImg = document.createElement('img'),
			beforeImg = document.createElement('img'),
			handle = document.createElement('span'),
			caption = document.createElement('p'),
			path = environment.meta.content.path;

		container.classList.add('slider');
		resizeContainer.classList.add('resize');
		handle.classList.add('handle');
		caption.classList.add('caption');

		container.appendChild(resizeContainer);
		resizeContainer.appendChild(beforeImg);
		container.appendChild(afterImg);
		container.appendChild(handle);

		function setBeforeImageWidth() {
			beforeImg.style.width = window.getComputedStyle(container).width;
		}

		function setupDragEvents() {
			handle.addEventListener('mousedown', touchStartHandler);
			handle.addEventListener('touchstart', touchStartHandler);
		}

		function touchStartHandler(e) {
			handle.classList.add('draggable');
			resizeContainer.classList.add('resizable');

			// Check if it's a mouse or touch event and pass along the correct value
			var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			// Get the initial position
			var dragWidth = parseInt(window.getComputedStyle(handle).width),
				handleWidth = 64, // cannot read from CSS as it is a pseudo class and not part of DOM.
				posX = handle.offsetLeft + dragWidth - startX,
				containerOffset = container.getBoundingClientRect().left + window.pageXOffset - document.documentElement.clientLeft,
				containerWidth = parseInt(window.getComputedStyle(container).width),
				handleSize = parseInt(window.getComputedStyle(handle).width),
				minLeft = containerOffset + (handleWidth / 2) + 10,
				maxLeft = containerOffset + containerWidth - (handleWidth / 2) - 10;

			function touchMoveHandler(e) {
				// Check if it's a mouse or touch event and pass along the correct value
				var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

				leftValue = moveX + posX - dragWidth;

				// Prevent going off limits
				if (leftValue < minLeft) {
					leftValue = minLeft;
				} else if (leftValue > maxLeft) {
					leftValue = maxLeft;
				}

				// Translate the handle's left value to masked divs width.
				widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

				// Set the new values for the slider and the handle.
				resizeContainer.style.width = widthValue;
				handle.style.left = widthValue;
			}

			function touchEndHandler() {
				container.classList.remove('draggable');
				handle.classList.remove('draggable');
				resizeContainer.classList.remove('resizable');
				window.removeEventListener('mousemove', touchMoveHandler);
				window.removeEventListener('touchmove', touchMoveHandler);
				window.removeEventListener('mouseup', touchEndHandler);
				window.removeEventListener('touchend', touchEndHandler);
				window.removeEventListener('touchcancel', touchEndHandler);
			}

			window.addEventListener('mousemove', touchMoveHandler);
			window.addEventListener('touchmove', touchMoveHandler);
			window.addEventListener('mouseup', touchEndHandler);
			window.addEventListener('touchend', touchEndHandler);
			window.addEventListener('touchcancel', touchEndHandler);

			e.preventDefault();
		}



		this.render = function (authorData) {
			beforeImg.src = path + authorData.before.src;
			beforeImg.alt = authorData.before.alt;
			beforeImg.title = authorData.before.title;
			afterImg.src = path + authorData.after.src;
			afterImg.alt = authorData.after.alt;
			afterImg.title = authorData.after.title;
			container.style.width = authorData.width;
			// container.style.height = authorData.height;
			caption.innerText = authorData.caption;

			if (!container.parentNode) {
				environment.container.appendChild(container);
				environment.container.appendChild(caption);
			}

			setBeforeImageWidth();
			window.addEventListener('resize', function () {
				setBeforeImageWidth();
				environment.requestHeightChange();
			});
			setupDragEvents();

			// Resize the iframe to fit the new height.
			afterImg.addEventListener('load', function () {
				environment.requestHeightChange();
			})
		}


	};

	Hello.enthralerPropTypes = {
		// name: enthraler.PropTypes.number.isRequired
	}

	return Hello;
});

