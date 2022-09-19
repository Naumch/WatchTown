var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Dot = function Dot(_ref) {
  var active = _ref.active;


  var style = {
    background: '' + (active ? '#0096d0' : '#fff'),
    opacity: '' + (active ? '1' : '.2'),
    width: '' + (active ? '3rem' : '2.5rem')
  };

  return React.createElement('span', { style: style, className: 'slider-react__dots' });
};

var Dots = function Dots(_ref2) {
  var slides = _ref2.slides,
      activeIndex = _ref2.activeIndex;


  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'div',
      { className: 'slider-react__box-dots' },
      slides.map(function (slide, i) {
        return React.createElement(Dot, { key: i, active: activeIndex === i });
      })
    )
  );
};

var Slide = function Slide(_ref3) {
  var content = _ref3.content;


  var style = {
    backgroundImage: 'url(' + content + ')'
  };

  return React.createElement(
    'div',
    { style: style, className: 'slider-react__slide' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'h1',
        { className: 'slider-react__title' },
        '\u0421\u0430\u043C\u044B\u0439 \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0432\u044B\u0431\u043E\u0440',
        React.createElement('br', null),
        '\u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0445 \u0447\u0430\u0441\u043E\u0432'
      ),
      React.createElement(
        'button',
        { className: 'button button_slider' },
        '\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433'
      )
    )
  );
};

var SliderContent = function SliderContent(_ref4) {
  var translate = _ref4.translate,
      width = _ref4.width,
      slides = _ref4.slides;


  var style = {
    transform: 'translateX(-' + translate + 'px)',
    width: width + 'px'
  };

  return React.createElement(
    'div',
    { style: style, className: 'slider-react__content' },
    slides.map(function (slide, i) {
      return React.createElement(Slide, { key: i, content: slide });
    })
  );
};

var Slider = function Slider() {
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      size = _React$useState2[0],
      setSize = _React$useState2[1];

  var ref = React.useRef();

  var resizeHandler = function resizeHandler() {
    var _ref5 = ref.current || {},
        clientWidth = _ref5.clientWidth;

    setSize(clientWidth);
  };

  React.useEffect(function () {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return function () {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  var _React$useState3 = React.useState({
    activeIndex: 0,
    translate: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1];

  var translate = state.translate,
      activeIndex = state.activeIndex;


  var images = ['img/slider-react/slider-react-1920.png', 'img/slider-react/slider-react-1920.png', 'img/slider-react/slider-react-1920.png'];

  function nextSlide() {
    if (activeIndex === images.length - 1) {
      return setState(Object.assign({}, state, {
        translate: 0,
        activeIndex: 0
      }));
    }

    setState(Object.assign({}, state, {
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * size
    }));
  }

  var autoPlayRef = React.useRef();

  React.useEffect(function () {
    autoPlayRef.current = nextSlide;
  });

  React.useEffect(function () {
    var play = function play() {
      autoPlayRef.current();
    };

    var interval = setInterval(play, 6000);
    return function () {
      return clearInterval(interval);
    };
  }, []);

  return React.createElement(
    'div',
    { className: 'slider-react', ref: ref },
    size <= 426 ? React.createElement(
      'div',
      { className: 'slider-react__slide' },
      React.createElement(
        'h1',
        { className: 'slider-react__title' },
        '\u0421\u0430\u043C\u044B\u0439 \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0432\u044B\u0431\u043E\u0440',
        React.createElement('br', null),
        '\u0431\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0445 \u0447\u0430\u0441\u043E\u0432'
      ),
      React.createElement(
        'button',
        { className: 'button button_slider' },
        '\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433'
      )
    ) : React.createElement(
      React.Fragment,
      null,
      React.createElement(SliderContent, {
        translate: translate,
        width: size * images.length,
        slides: images
      }),
      React.createElement(Dots, { slides: images, activeIndex: activeIndex })
    )
  );
};

ReactDOM.render(React.createElement(Slider, null), document.getElementById('slider-react'));