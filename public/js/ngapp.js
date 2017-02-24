(function() {

	var app = angular.module('tripshireApp', ['pageHeaderCtrl', 'rzModule']);

	app.config(function() {

		Array.prototype.addToSet = function(element) {
			if (this.indexOf(element) == -1)
				this.push(element);
		};
		Array.prototype.pull = function(element) {
			if (this.indexOf(element) > -1) {
				this.splice(this.indexOf(element), 1)
				this.pull(element)
			}
		};
		Array.prototype.getObject = function(identifier, value, get_index) {
			for (var _a = 0; _a < this.length; _a++) {
				if (this[_a][identifier] == value) {
					if (get_index) {
						return _a
					} else {
						return this[_a]
					}
					break
				}
			}
			if (get_index) {
				return -1
			} else {
				return undefined
			}
		};

	});

	app.directive('starRating', function() {
		return {
			restrict: 'E',
			scope: {
				stars: '='
			},
			templateUrl: 'reusable_components/star_ratings.html',
			// template: '<p>asdf</p>',
			link: function(scope, element, attrs) {

				// scope.$watch('stars', function(val){console.log(val)})
				scope.getNumber = function(num) {
					// console.log('Creating array of number', num)
					return new Array(num);
				}
			}
		}
	});

	app.controller('globalController', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

		console.log('2017 New year\'s party in Miami, NY or Ibiza!')

		$scope.isOnMobileDevice = function() {

			if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
				return true;
			} else {
				return false;
			}

		}

		setTimeout(function() {
			$(".owl-carousel#header_heros").owlCarousel({
				items: 1,
				loop: true,
				autoplay: true,
				smartSpeed: 1200
			});

			var nav_text = [
				'<div class="carousel_arrow prev hideat550"></div>',
				'<div class="carousel_arrow next hideat550"></div>'
			]

			$(".owl-carousel.section_cats").owlCarousel({
				margin: 15,
				// nav: true,
				responsive: {
					800: {
						items: 4
					},
					500: {
						stagePadding: 25,
						items: 2
					},
					300: {
						stagePadding: 25,
						items: 1
					}
				},
				loop: true,
				nav: true,
				navText: nav_text,
				onChanged: function() {

					$('.section_wrapper .owl-nav.disabled').removeClass('disabled')

				}
			});

			$(".owl-carousel.section_sub_cats").owlCarousel({
				margin: 15,
				// nav: true,
				responsive: {
					800: {
						items: 3
					},
					500: {
						stagePadding: 25,
						items: 2
					},
					300: {
						stagePadding: 25,
						items: 1
					}
				},
				loop: true,
				nav: true,
				navText: nav_text,
				onChanged: function() {

					$('.section_wrapper .owl-nav.disabled').removeClass('disabled')

				}
			});

			$(".owl-carousel.related_cats").owlCarousel({
				margin: 15,
				// nav: true,
				responsive: {
					800: {
						items: 4
					},
					500: {
						stagePadding: 25,
						items: 2
					},
					300: {
						stagePadding: 25,
						items: 1
					}
				},
				loop: true,
				nav: true,
				navText: nav_text,
				onChanged: function() {

					$('.section_wrapper .owl-nav.disabled').removeClass('disabled')

				}
			});
			
			// $('.section_wrapper').fadeIn()
			// $(".owl-prev").html('<i class="fa fa-chevron-left">asd</i>');
			// $(".owl-next").html('<i class="fa fa-chevron-right">asd</i>');
			$('.section_wrapper .owl-nav.disabled').removeClass('disabled')
		}, 0)

		function searchToObject() {
			var pairs = window.location.search.substring(1).split("&"),
				obj = {},
				pair,
				i;

			for (var i = 0 ; i < pairs.length ; i++) {
				if (pairs[i] === "") continue;

				pair = pairs[i].split("=");
				obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			}

			if(obj.page)
			{
				obj.page = parseInt(obj.page) || 1
			}

			return obj;
		}

		$scope.searchToObject = searchToObject


		$scope.search_form = {}
		$scope.search_form.location = (searchToObject().locations || '').split('-').join(', ')
		$scope.generateSearchQuery = function() {

			var query = []

			if ($scope.search_form.location) {
				var querified_locations = encodeURIComponent($scope.search_form.location.split(',').map(function(loc) {
					return loc.trim()
				}).join('-'))
				query.push('locations=' + querified_locations)
			}

			query.push('activity_duration_min='+$scope.activity_duration_slider.minValue)
			query.push('activity_duration_max='+$scope.activity_duration_slider.maxValue)

			if(searchToObject().category)
			{
				query.push('category='+searchToObject().category)
			}

			return '?'+query.join('&')

		}


		$scope.activity_duration_slider = {

			minValue: searchToObject().activity_duration_min || 0,
			maxValue: searchToObject().activity_duration_max || 72,
			options: {
				floor: 0,
				ceil: 72,
				step: 1,
				hideLimitLabels: true,
				translate: function(value, sliderId, label) {
					return value + 'hrs'
				}
			}

		}


	}]);

})();