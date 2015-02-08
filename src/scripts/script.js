(function () {

    /**
     * The window element.
     * @type {DOMElement}
     */
    var $window = $(window);

    /**
     * The joke element.
     * @type {DOMElement}
     */
    var $joke = $('.joke');

    /**
     * The fancy element.
     * @type {DOMElement}
     */
    var $fancy = $('.fancy');

    /**
     * The leaders element.
     * @type {DOMElement}
     */
    var $leaders = $('.leaders');

    /**
     * The projetcs element.
     * @type {DOMElement}
     */
    var $projects = $('.projects');

    /**
     * The statistics element.
     * @type {DOMElement}
     */
    var $statistics = $('.statistics');

    /**
     * The designs element.
     * @type {DOMElement}
     */
    var $designs = $('.designs');

    /**
     * Initialize all the sections and add some extra logic
     * to the them, when they reach the viewport.
     */
    function initializeSections () {

        var viewPort = $window.scrollTop() + $window.height();
        var $fancyInfo = $fancy.find('.info');
        var $projectsList = $projects.find('.projects');
        var $charts = $statistics.find('.charts');
        var $slides = $designs.find('.slides');

        if (viewPort >= $joke.offset().top) {
            $joke.addClass('visible');
        }
        if (viewPort >= $fancyInfo.offset().top) {
            $fancy.addClass('visible');
        }
        if (viewPort >= $projectsList.offset().top) {
            $projects.addClass('visible');
        }
        if (viewPort >= $charts.offset().top) {
            $statistics.addClass('visible');
            initCharts();
        }
        if (viewPort >= $slides.offset().top) {
            $designs.addClass('visible');
        }
    }

    /**
     * Init the joke parallax.
     * Calculate the height of the overlay, and do the parallax
     * with the section bellow.
     */
    function initJokeParallax() {

        var $overlay = $('.overlay');
        var $joke = $('.joke')
        var MIN_CONSTRAIN = 400;
        var MAX_CONSTRAIN = 800;

        $overlay.css('height', $joke.height() + $fancy.height());
        if ($window.width() > MAX_CONSTRAIN) {
            $fancy.css('margin-top', -$fancy.height());
        } else if ($window.width() <= MIN_CONSTRAIN) {
            $fancy.css('margin-top', 0);
        }

        $('section[data-type="background"]').each(function(){
            var $bgobj = $(this);

            $window.scroll(function() {

                var yPos = -($window.scrollTop() / $bgobj.data('speed'));
                $overlay.css({opacity: ($window.scrollTop() / $joke.height())})

                // Put together our final background position
                var coords = '80% '+ yPos + 'px';
                // Move the background
                $bgobj.css({ backgroundPosition: coords });
            });
        });
    }

    /**
     * Init the warrior parralax
     * with the clouds.
     */
    function initWarriorAnimation () {
        $leaders.mousemove(function(e){
            var amountMovedX = (e.pageX * -1 / 90);
            var amountMovedY = (e.pageY * -1 / 70);
            $('.warrior').css({
                'margin-left': amountMovedX + 'px ',
            });
            $(this).css('background-position', 0 + 'px ' + ( (-$(this).height() + 80)  - amountMovedY + 'px'));
        });
    }

    /**
     * Init the slick caroussel.
     */
    function initSlick () {

        $('.slides').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1
        });
    }

    /**
     * Init the chart.
     */
    function initCharts() {

        // initialize charts
        $('.chart').easyPieChart({
            animate: 2000,
            trackColor: false,
            scaleColor:false,
            barColor: '#e91640',
            scaleColor:false,
            lineWidth: 10,
            lineCap:'circle',
            size: 200
        });
    }

    /**
     * Initialize.
     */
    function initialize () {
        $(document).ready(function() {

            initSlick();
            initWarriorAnimation();
            initJokeParallax();
            initializeSections();

            // The event handlers
            $window.scroll(initializeSections);
            $window.resize(initJokeParallax);
        });
    }

    setTimeout(function () {
        $('.loading').css('marginTop', -$window.height())
            .addClass('hidden');
        initialize();
    }, 100)
}());
