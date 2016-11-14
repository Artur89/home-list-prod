var merchAllPages = {
    init : function () {
        new merchComp.StoreName();
        new merchComp.Phone();
        new merchComp.User();
        new merchComp.Search();
        this.headerDialog.init();
        new merchComp.LangSelector();
        new merchComp.ToTop();
        this.sticky = new merchComp.Sticky();

        this.misc();
        this.vatSelect.init();
        this.dataLayer.init();

        this.searchAutocomplete.init({
            $input : $('.js-s-h-search .s-h-search__input'),
            onSelect : function() {
                $('.js-s-h-search-btn').click();
            },
            beforeRender : function($container) {
                $container.addClass('autocomplete-suggestions--s-h');
            }
        });

        this.akamaiCCCookie.write({ isAnonymous : window.s_eVar8.indexOf('anonymous') > -1 });

        this.telesales.init();
        this.focusBox.init();
        new merchComp.ResetPassword();
        new merchComp.SiteSwitch();

        setTimeout(function() {
            new merchComp.ScrollNav();
        }, 1);
    },
    // point of no return :(
    misc : function() {

        if (typeof s_pageName !== 'undefined') {
            window.merchPageNameForTracking = s_pageName;   //for dynamic tracking
        }

        $(document).on('click', '.js-s-h-supplies-finder-help-link', function(event){
            var href = $(this).attr('href');
            event.preventDefault();
            merchAllPages.overlayer({
                className : 'merch-overlay--smartfinder',
                content : href,
                type : 'iframe',
                background : true,
                w : 520,
                h : 300,
                position : 'fixed',
                scrollPosition : false
            });
        });

    },
    akamaiCCCookie : {
        options : {
            path : '/'
        },
        write : function(req) {
            var cookie,
                scesgCookie,
                vat = window.merchAllPages.merchCookies.getCkVat(),
                catalogId = this.catalogId(),
                community = this.community(),
                language = this.language();

            /**
             * Write "MerchAkamaiCC" cookie, every time the page loads and some more.
             */
            if (req.isAnonymous) {
                cookie = 'anon|' + catalogId + '|' + vat;
                if (language) {
                    cookie += '|' + language;
                }
            } else {
                cookie = 'noCache';
            }
            this.cookie('MerchAkamaiCC', cookie);

            /**
             * Write "MerchAkamaiSCESG" cookie, only if community matches any in the predefined list.
             * If not, delete cookie.
             */
            if (community) {
                if (req.isAnonymous) {
                    scesgCookie = community;
                } else {
                    scesgCookie = 'noCache';
                }
                this.cookie('MerchAkamaiSCESG', scesgCookie);
            } else {
                this.removeCookie('MerchAkamaiSCESG');
            }
        },
        language : function() {
            var matches = ['ch', 'ca'];
            for (var i = 0; i < matches.length; i++) {
                if (window.merchSFCountryCode === matches[i]) {
                    return window.merchSFLanguageCode;
                }
            }
            return null;
        },
        community : function() {
            var matches = [
                'SCESG21835', 'SCESG21708', 'SCESG21487', 'SCESG21485', 'SCESG21753', 'SCESG21720', 'SCESG21484',
                'SCESG23349', 'SCESG20386', 'SCESG21294', 'SCESG23332', 'SCESG22652', 'SCESG22592', 'SCESG22578',
                'SCESG22117', 'SCESG21807', 'SCESG20047', 'SCESG20374', 'SCESG23691', 'SCESG20371', 'SCESG22768',
                'SCESG22780', 'SCESG23434', 'SG891', 'SCESG21450', 'SCESG21438', 'SCESG21439', 'SCESG21445',
                'SCESG21446', 'SCESG21750', 'SCESG21869', 'SCESG21876', 'SCESG21877', 'SCESG22579', 'SCESG22753',
                'SCESG22763', 'SCESG22964', 'SCESG23103', 'SCESG23412', 'SCESG23425', 'SCESG23427', 'SCESG23536',
                'SCESG23537', 'SCESG23631', 'SG880', 'SCESG23176', 'SCESG22588', 'SCESG22661', 'SCESG21505',
                'SCESG21598', 'SCESG21006', 'SCESG22678', 'SCESG21479', 'SCESG21801', 'SCESG22496', 'SCESG21726',
                'SCESG21791', 'SCESG21832', 'SCESG22475', 'SCESG22586', 'SCESG22585', 'SCESG22587', 'SCESG22660',
                'SCESG22639', 'SCESG22715', 'SCESG22743', 'SCESG22745', 'SCESG22120', 'SCESG22492', 'SCESG22480',
                'SCESG22695', 'SCESG21749', 'SCESG21307', 'SCESG20800', 'SCESG21006', 'SCESG22678', 'SCESG23169',
                'SCESG23182', 'SCESG23196', 'SCESG23270', 'SCESG23271', 'SG1954' /*DE ITG PUBLIC*/
            ];
            for (var i = 0; i < matches.length; i++) {
                if (window.s_eVar45.indexOf(matches[i]) > -1) {
                    return matches[i];
                }
            }
            return null;
        },
        catalogId : function() {
            var catalogId = window.s_eVar45.split(':');
            return catalogId[catalogId.length - 1];
        },
        cookie : function(cookieName, cookie) {
            $.cookie(cookieName, cookie, this.options);
        },
        removeCookie : function(cookieName) {
            $.removeCookie(cookieName, this.options);
        }
    },
    Cart : {
        state : function(options) {
            var $cartTool = $('.js-s-h-cart-tool');
            var $cart = $('.js-s-h-cart');
            var $cartCount = $('.js-s-h-cart-count');

            options = options || {};

            $cartTool.toggleClass('s-h-tool--drop', options.state === 'FILLED');
            $cart.toggleClass('is-visible', options.state === 'FILLED');
            $cartCount.toggleClass('is-visible', options.state === 'FILLED');

            $cartCount.text(options.count ? options.count : $cartTool.find('.s-h-cart-product').length);
        }
    },
    callMe : {
        ID : {
            'ES' : 'BWAEE7598AECA',
            'DE' : 'BWA291D678952',
            'FR' : 'BWA5E8C70C4CE'
        },
        _timer : null,
        init : function(ll, cc, delay) {
            var cc = cc.toUpperCase();
            if (this.ID[cc] && ll && ll.length) {
                window.bysideWebcare_webcare_id = this.ID[cc];
                window.bysideWebcare_lang = ll;
                setTimeout(function() {
                    this.timer();
                    this.show();
                }.bind(this), delay || 0);
            }
        },
        timer : function() {
            var $window = $(window),
                reset = function() {
                    clearTimeout(this._timer);
                    this._timer = setTimeout(function() {
                        this.open();
                        $window.off('scroll.call-me');
                        $window.off('mousemove.call-me');
                    }.bind(this), 60000);
                };
            $window.on('scroll.call-me', reset.bind(this));
            $window.on('mousemove.call-me', reset.bind(this));
            reset.call(this);
        },
        show : function() {
            var $callMe = $('.js-call-me');
            $callMe.find('.call-me__cta')
                .on('click', function(event) {
                    this.open();
                    event.preventDefault();
                }.bind(this));
            $callMe.addClass('is-visible');
        },
        hide : function() {
            var $callMe = $('.js-call-me');
            $callMe.removeClass('is-visible').off('click');
        },
        open : function() {
            clearTimeout(this._timer);
            $.cachedScript('//webcare.byside.com/agent/byside_webcare.js').done(function() {
                if (window.bysideWebcare_triggerevent) {
                    this.hide();
                    window.bysideWebcare_triggerevent(5686);
                }
            }.bind(this));
        }
    },
    customCheckbox : {
        init : function(options){
            var $checkbox;
            options = options || {};
            if(options.$html){
                $checkbox = options.$html.find('.js-custom-checkbox');
            }else{
                $checkbox = $('.js-custom-checkbox');
            }
            $checkbox.each($.proxy(this.select, this));
        },
        select : function(index, el){
            var $checkbox = $(el),
                classList = $checkbox.attr('data-classlist') || "";
            $checkbox.wrap('<div class="custom-checkbox '+ classList +'"></div>');
            // $checkbox.addClass('custom-checkbox__enabled');
            $checkbox.on('change', this.onChange);

            if(el.checked){
                $(el).closest('.custom-checkbox').addClass('custom-checkbox--checked');
            }
        },
        onChange : function(){
            if( this.checked ){
                $(this).closest('.custom-checkbox').addClass('custom-checkbox--checked');
            }else{
                $(this).closest('.custom-checkbox').removeClass('custom-checkbox--checked');
            }
        }
    },
    customSelect : {
        init : function(options) {
            var $select;
            options = options || {};
            if (options.$html) {
                $select = options.$html.find('.js-custom-select');
            } else {
                $select = $('.js-custom-select');
            }
            $select.each($.proxy(this.select, this));
        },
        select : function(index, el) {
            var $select = $(el),
                $label = $('<span class="custom-select__label"></span>'),
                classList = $select.attr('data-classlist') || "";

            $label.text($('option:selected', $select).text());
            $select.wrap('<div class="custom-select ' + classList +'"></div>');
            $label.insertBefore($select);

            $select.on('change', this.onChange);
        },
        onChange : function() {
            var $select = $(this);
            $select.prev('.custom-select__label').text($('option:selected', $select).text());
        }
    },
    dataLayer : {
        init : function () {
            var self = this;

            if (window.s_eVar8 && window.s_eVar45 && (typeof dataLayer!=='undefined' && typeof dataLayer[0].storeCountry === 'undefined')) {

                window.merchAllPages.util.service.user.get().always(function (response) {

                    var data,
                        _userId = s_eVar8.split('|'),
                        _catID = s_eVar45.split(":"),
                        storeType,
                        customerType,
                        customerSegment,
                        customerSubSegment,
                        uid;

                    storeType = window.merchAllPages.util.getStoreType(_catID[1]);

                    if (response.state === 'SUCCESS') {
                        if (response.response.IsAuthenticated) {
                            customerType = 'login';
                        } else {
                            customerType = 'remembered';
                        }
                    } else {
                        customerType = 'guest';
                    }

                    //If _userId[1] equals 'anonymous' or contains '@' symbol uid = ''
                    if (_userId[1] === 'anonymous' || _userId[1].indexOf('@') > -1) {
                        uid = '';
                    } else {
                        uid = _userId[1];
                    }

                    //Get customer segment from GetUser: ?CustomerSegment?:?Business? (default to Consumer)
                    //Read from GetUser response where available: ?CustomerSubSegment?:?Public? (default to public)
                    if (response.state === 'SUCCESS' && response.response.User) {
                        customerSegment = response.response.User.CustomerSegment;
                        customerSubSegment = response.response.User.CustomerSubSegment;
                    } else {
                        customerSegment = 'Consumer';
                        customerSubSegment = 'Public';
                    }

                    //Common values
                    data = {
                        storeType : storeType,
                        storeCountry :  window.merchSFCountryCode,
                        customerType : customerType,
                        siteVersion : self.getSiteVersion(),
                        siteLang : self.getSiteLanguage(),
                        businessConsumer : customerSegment,
                        uid : uid,
                        segment : customerSegment,
                        subsegment : customerSubSegment,
                        catalogID : _catID[1],
                        communityID : _catID[0],
                        customerSegment : customerSegment
                    };

                    //Add page specific values
                    if (window.location.href.toLowerCase().indexOf('product.aspx') === -1) {
                        //Non product page data
                        data.event = 'dataReady';
                    } else {
                        //Product page data
                        data.event = 'detailView';
                        data.ecommerce = {
                            currencyCode : window.merchAllPages.util.getCurrencyCode(),
                            detail : {
                                products : [{
                                    id : $('.merch-product-code span').html(),
                                    name : window.merchAllPages.util.getMetaItemPropContent({
                                        wrap : '.merch-product-price',
                                        name : 'name'
                                    }),
                                    category : window.merchDataSel,
                                    price : window.merchAllPages.util.getMetaItemPropContent({
                                        wrap : '.merch-product-price',
                                        name : 'price'
                                    }),
                                    quantity : 1
                                }]
                            }
                        };
                    }

                    self.push(data);
                });
            }
        },
        getSiteVersion: function() {
            if(typeof s_prop1 !== 'undefined') {
                return s_prop1;
            }
            return "desktop";
        },
        getSiteLanguage: function() {
            return window.merchSFLanguageCode;
        },
        push : function (data) {
            try {
                //console.log(data);
                window.dataLayer.push(data);
            } catch (e) {}
        }
    },
    focusBox : {
        TEMPLATE : {
            'OVERLAY' : '<div class="focus-box-bg"></div>',
            'FOCUS_BOX' : '<div class="focus-box sm15"><div class="focus-box__body">{{body}}</div><button class="focus-box__close-btn">Close</button></div>'
        },
        init : function() {
            $(document.body).on('click.s', '.focus-box-bg, .focus-box__close-btn', $.proxy(this.hide, this));
        },
        show : function(options) {
            var self = this;
            var dfd = new $.Deferred();
            var $template;

            options = options || {};

            if (options.html && options.html.length) {
                $template = $(this.TEMPLATE.FOCUS_BOX.replace('{{body}}', options.html));
            }

            if (options.$html && options.$html.length) {
                $template = $(this.TEMPLATE.FOCUS_BOX.replace('{{body}}', ''));
                $template.find('.focus-box__body').append(options.$html);
            }

            if (options.transparent) {
                $template.addClass('focus-box--transparent');
            }

            if (options.classList) {
                $template.addClass(options.classList);
            }

            if (options.width) {
                $template.css('width', options.width);
                $template.css('min-width', options.width);
            }

            if ($template) {
                $(document.body).append(this.TEMPLATE.OVERLAY);
                $(document.body).append($template);
                setTimeout(function() {
                    self.animate({
                        'position' : options.position
                    });
                    dfd.resolve();
                }, 1);
            }

            return dfd.promise();
        },
        animate : function(options) {
            var $focusBox = $('.focus-box'),
                width = $focusBox.outerWidth(),
                height = $focusBox.outerHeight(),
                top;

            options = options || {};

            if (options.position) {

                switch (options.position) {
                    case 'top':
                        top = $(window).scrollTop() + 15;
                        break;
                    default:
                        top = $(window).scrollTop() + $(window).height() / 2 - height / 2;
                        break;
                }

            } else {
                top = $(window).scrollTop() + $(window).height() / 2 - height / 2;
            }

            $focusBox.css('margin-left', (width / -2)  + 'px');

            $('.focus-box-bg').addClass('focus-box-bg--is-visible');
            $focusBox.css('top', top + 'px');
        },
        hide : function(event) {
            var $target = $(event.target);
            if ($target.hasClass('focus-box-bg') || $target.hasClass('focus-box__close-btn')) {
                $('.focus-box-bg, .focus-box').remove();
            }
        }
    },
    gaEv : function(category, action, label) {
        window.dataLayer.push({
            'event' : 'analyticsEvent',
            'category' : category,
            'action' : action,
            'label' : label
        });
    },
    gaEvWithEcom : function(data, goToUrl) { // data should be list/search, name, sku, price (inc), category, position
        if (window.ga && ga.loaded) {
            dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': { 'list': data.field },      // list/search
                        'products': [{
                            'name': data.name,                     // product name
                            'id': data.sku,                // SKU
                            'price': data.price,                  // price (inc)
                            'brand': 'HP',
                            'category': data.category,                  // category
                            'variant': '',
                            'position': data.position                      // position on list starting with "1"
                        }]
                    }
                },
                'eventCallback': function() {
                    document.location = goToUrl;
                }
            });
        } else {
            document.location = goToUrl;
        }
    },
    gaImp : function(data, currencyCode) {
        dataLayer.push({
            'ecommerce': {
                'currencyCode': currencyCode,
                'impressions': data
            }
        });
    },
    goToCart : function() {
        window.location = getHpPath(true) + 'Merch/Cart.aspx';
    },
    headerDialog : {
        init : function() {
            //Confirm message dialog
            var params = merchAllPages.util.getUrlParams();

            if (params.merchw && params.merchw !== '') {
                window.merchAllPages.util.service.user.get().done(function(result) {
                    if (result.response && result.response.User) {
                        merchAllPages.headerDialog.show({
                            'msgId' : params.merchw,
                            'firstName' : result.response.User.FirstName
                        });
                    }
                }).fail(function(result) {});
            }

            if (params.merchoptin && params.merchoptin === '1') {
                this.show({
                    'msgId': 'optin'
                });
            }
        },
        show : function(options) {
            var self = this,
                $dialog = $('.js-s-h-dialog'),
                $msg;

            options = options || {};

            if (options.msgId) {
                $msg = $dialog.find('.s-h-dialog__msg--' + options.msgId);
                $msg.addClass('s-h-dialog__msg--is-visible');
                if (options.firstName) {
                    $msg.text($msg.text().replace('{{firstName}}', options.firstName));
                }
                $dialog.addClass('s-h-dialog--is-visible');
                $dialog.find('.js-s-h-dialog-close-btn').on('click', function() {
                    self.hide();
                });
            }
        },
        hide : function () {
            var $dialog = $('.js-s-h-dialog');
            $dialog.removeClass('s-h-dialog--is-visible');
        }
    },
    loader : {
        TEMPLATE : {
            OVERLAY : '<div class="sf-loader-bg"></div>',
            LOADER : '<div class="sf-loader"></div>'
        },
        show : function() {
            $(document.body).append(this.TEMPLATE.OVERLAY + this.TEMPLATE.LOADER);
            setTimeout(function() {
                $('.sf-loader-bg').addClass('sf-loader-bg--is-visible');
            }, 1);
        },
        hide : function() {
            $('.sf-loader-bg, .sf-loader').remove();
        }
    },
    merchCookies : {
        cookiePath : '/',
        cookieExp : 100,
        getCkVat : function() {
            return this.getCk('MerchSettings', 'vat');
        },
        setCkVat : function(setVal) {
            if (setVal === 'inc' || setVal === 'exc') {
                this.setCk('MerchSettings', 'vat', setVal);
            }
        },
        getCkTele : function() {
            return {
                'telesalesSubmitURL' : this.getCk('MerchSettings', 'telesalesSubmitURL'),
                'telesalesName' : this.getCk('MerchSettings', 'telesalesName')
            };
        },
        setCkTele : function(sku) {
            var curVal = this.getCkTele();
            var newVal = '';
            if (sku !== null && sku.length > 0) {
                if (curVal !== null && curVal.length > 0) {
                    newVal = curVal;
                    if (curVal.indexOf(sku) === -1){
                        newVal += '|' + sku;
                    }
                }
                else {
                    newVal = sku;
                }
            }
            this.setCk('MerchSettings', 'telesales', newVal);
        },
        getCk : function(cookieName, setName) {
            try {
                var cookieVal = $.cookie(cookieName, { path : this.cookiePath });
                var elems = cookieVal.match(/{([^}]*)}/g);
                if (elems !== null && elems.length > 0) {
                    for(var i = 0; i < elems.length; i++){
                        var elem = elems[i];
                        if (elem !== '' ) {
                            if (elem.indexOf('"Key":"' + setName + '"') > -1) {
                                var matches = elem.match(/"Value":"(.*)"/);
                                if (matches !== null && matches.length === 2){
                                    return matches[1];
                                }
                            }
                        }
                    }
                }
            } catch(e) {

            }
            return "";
        },
        setCk : function(cookieName, setName, setVal) {
            try {
                var cookieVal = $.cookie(cookieName, { path : this.cookiePath });
                if (setName !== '') {
                    var newCookieVal = this.getCookieVal( cookieVal , setName, setVal );
                    if (cookieVal !== newCookieVal) {
                        $.cookie.raw = true;
                        $.cookie(cookieName, newCookieVal, { path : this.cookiePath, expires : this.cookieExp });
                    }
                }
            } catch(e) {}
        },
        getCookieVal : function(cookieVal, setName, setVal) {
            var cookieRet = '';
            var isSet = false;
            if (cookieVal !== null && cookieVal.length > 0) {
                var elems = cookieVal.match(/{([^}]*)}/g);
                if (elems !== null && elems.length > 0) {
                    for(var i = 0; i < elems.length; i++){
                        var elem = elems[i];
                        if (elem !== '') {
                            elem += ',';
                            if (elem.indexOf('"Key":"' + setName + '"') > -1) {
                                if (setVal === '') {
                                    elem = '';
                                } else if(elem.indexOf('"Value":"' + setVal + '"') === -1){
                                    elem = '{"Key":"' + setName+'","Value":"' + setVal + '"},';
                                }
                                isSet = true;
                            }
                            cookieRet += elem;
                        }
                    }
                }
            }
            if (!isSet){
                if (cookieRet === ''){
                    cookieRet = '{"Key":"' + setName + '","Value":"' + setVal + '"}';
                } else if (cookieRet !== '') {
                    cookieRet += '{"Key":"' + setName + '","Value":"' + setVal + '"}';
                }
            }
            if (cookieRet.length > 0) {
                if (cookieRet.substring(cookieRet.length - 1) === ',') {
                    cookieRet = cookieRet.substring(0, cookieRet.length - 1);
                }
                if (cookieRet.length > 0) {
                    cookieRet = '[' + cookieRet + ']';
                }
            }
            return cookieRet;
        }
    },
    overlayer : function(opts) {
        var overlay = $('#merch-overlay');

        if (overlay.length === 0) {
            overlay = $('<div>').attr('id', 'merch-overlay').append($('<a>').attr('id', 'merch-overlay-close').html('X')).append($('<div>').attr('id', 'merch-overlay-content'));
        }

        var overlayContent = overlay.find('#merch-overlay-content'),
            background = $('#merch-overlay-background'),
            showBg = (typeof opts.background != 'undefined' ? opts.background : true),
            scrollPos = (typeof opts.scrollPosition != 'undefined' ? opts.scrollPosition : true),
            type = (typeof opts.type != 'undefined' ? opts.type : 'html'),
            w = (typeof opts.w != 'undefined' ? opts.w : '800'),
            h = (typeof opts.h != 'undefined' ? opts.h : '600'),
            pos = (typeof opts.position != 'undefined' ? opts.position : 'absolute'),
            ml = (w/2)*-1,
            hidePadding = typeof opts.hidePadding != 'undefined';

        overlay.css({'margin-left': ml, 'width': w, 'height': h, 'position': pos});

        //Add to .aspx when possible
        overlayContent.addClass("merch-overlay-content");

        if (hidePadding) {
            overlay.css({'padding': 0});
        }

        if (showBg && background.length < 1) {
            background = $('<div>');
            background.attr('id', 'merch-overlay-background');
            background.attr('class', 'merch-overlay-background');
            $(document.body).append(background);
        }

        if (overlay.parent('body').length === 0) {
            $(document.body).append(overlay);
        }

        $('#merch-overlay-close').bind('click', hide);
        background.bind('click', hide);

        if (typeof opts.className != 'undefined') {
            overlay.addClass(opts.className);
        }

        if (scrollPos) {
            overlay.css('top', $(window).scrollTop() + 24);
        }

        if (showBg) {
            background.show();
        }

        if (typeof opts.content != 'undefined') {
            if (type == 'iframe') {
                var myframe = '<iframe src="' + opts.content + '" frameborder="0" seamless="seamless" scrolling="auto" style="width:100%;height:100%;"><p>Your browser does not support iframes.</p></iframe>';
                overlayContent.html(myframe);
            }
            else {
                overlayContent.html(opts.content);
            }
        }

        overlay.show();

        function hide() {
            overlay.hide();
            background.hide();
            overlay.attr('style', 'display: none;');	//clean previous inline styles
            overlay.attr('class', '');
            overlayContent.html('');
        }
    },
    promotion : {
        init : function($promotion) {
            $promotion.on('click', this.show);
        },
        show : function(event) {
            var $promotion = $(this),
                $html = $($promotion.find('.focus-box-template').html()),
                isCarousel = $html.find('.prom-feat-list__i').length > 1;

            if (isCarousel) {
                $html.find('.prom-carousel').addClass('is-carousel');
                $html.find('.prom-feat-list').addClass('is-carousel');
            }


            if (!$promotion.attr('href') || $promotion.attr('href') === '#') {
                event.preventDefault();
            }

            window.merchAllPages.focusBox.show({
                '$html' : $html
            }).done(function() {
                if (isCarousel) {
                    $html.find('.prom-carousel__wrap').jcarousel({
                        wrap: 'both'
                    }).data('jcarousel');

                    $html.find('.prom-nav-list').jcarouselPagination({
                            item : function(page) {
                                return '<li class="prom-nav-list__i"><button type="button" class="' + (page === '1' ? 'is-active' : '') + '">' + page + '</button></li>';
                            }
                        })
                        .on('jcarouselpagination:active', 'li', function() {
                            $(this).find('button').addClass('is-active');
                        })
                        .on('jcarouselpagination:inactive', 'li', function() {
                            $(this).find('button').removeClass('is-active');
                        });

                    $html.find('.prom-carousel__scroll-btn--l').jcarouselControl({
                        target : '-=1'
                    });

                    $html.find('.prom-carousel__scroll-btn--r').jcarouselControl({
                        target : '+=1'
                    });
                }
            });
        }
    },
    searchAutocomplete : {
        init : function(options) {
            var CC = window.merchSFCountryCode.toUpperCase();
            var LL = window.merchSFLanguageCode.toUpperCase();
            var PARTNER_ID = {
                'DE' : {
                    'DE' : '012146700701385555659:23cjoni_3i8'
                },
                'CH' : {
                    'DE' : '012146700701385555659:k-acjihazz8', //ch-de
                    'FR' : '012146700701385555659:k-acjihazz8',
                    'EN' : '012146700701385555659:k-acjihazz8'
                },
                'FR' : {
                    'FR': '012146700701385555659:yhbh3mpprcy'
                },
                'SE' : {
                    'SV' : '012146700701385555659:uh5txep4hle'
                },
                'ES' : {
                    'ES' : '012146700701385555659:ygaoavkiywc'
                },
                'IT' : {
                    'IT' : '012146700701385555659:i2caip1zip8'
                },
                'NL' : {
                    'NL' : '012146700701385555659:a9dznhfzfm4'
                },
                'UK' : {
                    'EN': '012146700701385555659:evodhodobio'
                },
                'AU' : {
                    'EN': '012146700701385555659:wls4j2ichma'
                },
                'MY' : {
                    'EN': '012146700701385555659:t2rxpsjbuqk'
                },
                'SG' : {
                    'EN': '012146700701385555659:mvlbetq_jw8'
                }
            };

            options = options || {};

            if (options.$input && options.$input.length && PARTNER_ID[CC]) {
                options.$input.autocomplete_ajax({
                    serviceUrl : (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//clients1.google.com/complete/search?hl=en&client=partner&source=gcsc&partnerid=' + PARTNER_ID[CC][LL] + '&ds=cse',
                    lookupFilter : function(sugg, q, qLowerCase) {
                        var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(qLowerCase), 'gi');
                        return re.test(sugg.value);
                    },
                    width : options.width ? options.width : 'auto',
                    maxHeight : 500,
                    minChars : 3,
                    paramName : 'q',
                    dataType : 'jsonp',
                    triggerSelectOnValidInput : false,
                    transformResult : function(res) {
                        return {
                            suggestions : $.map(res[1], function(suggestion) {
                                if(suggestion[2] !== undefined) {
                                    return { // promotion result data structure
                                        value: suggestion[2].a,
                                        data: {
                                            promo: true,
                                            link: suggestion[2].b,
                                            img: suggestion[2].c,
                                            desc: suggestion[2].d
                                        }
                                    };
                                } else {
                                    return { // query result data structure
                                        value: suggestion[0],
                                        data: suggestion[0]
                                    };
                                }
                            }).sort(function(a, b) {
                                if(typeof(a.data) === "object" && a.data.promo === true) {
                                    // promotion result goes last
                                    return 1;
                                } else {
                                    // query result goes first
                                    return -1;
                                }
                            })
                        };
                    },
                    formatResult: function(suggestion, currentValue) {
                        if(typeof(suggestion.data) === "object" &&  suggestion.data.promo === true) {
                            // promotion result template
                            return '<div class="promoted-search"><div class="promoted-search__title">'+suggestion.value+'</div><div class="promoted-search__desc">'+suggestion.data.desc+'</div></div>';
                        } else {
                            // query result template
                            return suggestion.value.replace(new RegExp(currentValue, 'gi'), '<span class="suggestion-match">' + currentValue + '</span>');
                        }
                    },
                    beforeRender : function($container) {
                        if (options.beforeRender) {
                            options.beforeRender($container);
                        }
                    },
                    onSelect : function(suggestion) {
                        if(typeof(suggestion.data) === "object" && suggestion.data.promo === true) {
                            window.location.href = suggestion.data.link;
                        } else if (options.onSelect) {
                            options.onSelect();
                        }
                    }
                });
            }
        }
    },
    telesales : {
        init : function() {
            var $telesales = $('.js-s-h-telesales'),
                $telesalesBannerName = $('.js-s-h-telesales-banner-name'),
                $telesalesSendBtn =  $('.js-s-h-telesales-send-btn'),
                data = window.merchAllPages.merchCookies.getCkTele(),
                pathname = window.location.pathname.toLowerCase(),
                telesales = this;

            if (data.telesalesSubmitURL.length && data.telesalesName.length) {

                $telesalesBannerName.text(data.telesalesName);
                $telesales.addClass('s-h__telesales--is-visible');

                if (pathname.indexOf('merch/product.aspx') > -1 || pathname.indexOf('merch/compare.aspx') > -1) {

                    $telesalesSendBtn.addClass('s-h-telesales-send--is-visible');
                    $telesalesSendBtn.on('click.s-h', function() {
                        var sku = telesales.sku.get(),
                            url = data.telesalesSubmitURL;

                        if (sku.length) {
                            url += '&add_products[]=' + sku.join('&add_products[]=');
                        }

                        window.location = url;
                    });

                }
            }
        },
        sku : {
            get : function() {
                var pathname = window.location.pathname.toLowerCase();
                if (pathname.indexOf('merch/product.aspx') > -1) {
                    return this.product();
                } else if (pathname.indexOf('merch/compare.aspx') > -1) {
                    return this.compare();
                } else {
                    return [];
                }
            },
            compare : function() {
                var search = window.location.search,
                    skuParam = 'merchCmp=',
                    skus = [];

                if (search.indexOf(skuParam) > -1) {
                    search = search.slice(search.indexOf(skuParam) + skuParam.length, search.length);
                    if (search.indexOf('&') > -1) {
                        search = search.slice(0, search.indexOf('&'));
                    }
                    skus = search.split('|');
                }
                return skus;
            },
            product : function() {
                var search = window.location.search,
                    idParam = 'id=',
                    optParam = 'opt=',
                    id = '',
                    opt = '',
                    sku;

                if (search.indexOf(idParam) > -1) {
                    id = search.slice(search.indexOf(idParam) + idParam.length, search.length);
                    if (id.indexOf('&') > -1) {
                        id = id.slice(0, id.indexOf('&'));
                    }
                }

                if (search.indexOf(optParam) > -1) {
                    opt = search.slice(search.indexOf(optParam) + optParam.length, search.length);
                    if (opt.indexOf('&') > -1) {
                        opt = opt.slice(0, opt.indexOf('&'));
                    }
                }

                sku = id;

                if (opt.length) {
                    sku += '%23' + opt
                }

                return sku ? [sku] : [];
            }
        }
    },
    util : {
        url : {
            splitUrl: function (url) {
                var splitUrl = url.split('?');
                var mainUrl = splitUrl[0];
                var params = [];

                if (typeof splitUrl === 'undefined' || splitUrl === null || splitUrl.length <= 1) {
                    return {
                        url: url,
                        parameters: params
                    };
                }

                var splitParams = splitUrl[1].split('&');
                for (var i = 0; i < splitParams.length; i++) {
                    var param = splitParams[i];
                    var splitParam = param.split('=');
                    if (splitParam.length == 2) {
                        params.push({
                            key: splitParam[0],
                            value: splitParam[1]
                        });
                    }
                }
                return {
                    url: mainUrl,
                    parameters: params
                };
            },
            concatUrl: function (splitUrl) {
                var params = "";
                if (splitUrl.parameters != null) {
                    for (var i = 0; i < splitUrl.parameters.length; i++) {
                        var param = splitUrl.parameters[i];
                        var splitSymbol = i == 0 ? '?' : '&';
                        params += splitSymbol + param.key + '=' + param.value;
                    }
                }
                return splitUrl.url + params;
            },
            isInArray: function (parameter, array) {
                if (array !== null) {
                    for (var i = 0; i < array.length; i++) {
                        var param = array[i];
                        if (param.key.toLowerCase() === parameter.key.toLowerCase() &&
                            param.value.toLowerCase() === parameter.value.toLowerCase()) {
                            return true;
                        }
                    }
                }
                return false;
            },
            removeDoubleParamsWithSameValues: function (url) {
                var self = this;
                url = decodeURIComponent(url);
                url = self.splitUrl(url);

                if (url !== null && url.parameters !== null) {
                    var newParamsList = [];
                    for (var i = 0; i < url.parameters.length; i++) {
                        var param = url.parameters[i];
                        if (!self.isInArray(param, newParamsList)) {
                            newParamsList.push(param);
                        }
                    }
                    url.parameters = newParamsList;
                }

                return self.concatUrl(url);
            }
        },
        getUrlParams : function () {
            var params={};

            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
                params[key] = value;
            });

            return params;
        },
        translate : function(s, direction) {
            var regex,
                replaceStr;
            if (
                window.merchSuppliesAutocompleteLabels
                && window.merchSuppliesAutocompleteLabels[window.merchSFCountryCode]
                && window.merchSuppliesAutocompleteLabels[window.merchSFCountryCode][window.merchSFLanguageCode]
            ) {
                $.each( merchSuppliesAutocompleteLabels[window.merchSFCountryCode][window.merchSFLanguageCode], function(key, value) {
                    if (direction === '<') {
                        regex = new RegExp(value, 'g');
                        replaceStr = key;
                    } else {
                        regex = new RegExp(key, 'g');
                        replaceStr = value;
                    }
                    s = s.replace(regex, replaceStr);
                });
            }
            return s;
        },
        getSearchQuery : function(options) {
            var paramName = 'q',
                results;

            options = options || {};

            if (options.paramName) {
                paramName = options.paramName;
            }

            results = new RegExp('[\?&]' + paramName + '=([^&#]*)').exec(window.location.href);
            results = results === null ? '' : results[1];

            return results;
        },
        getMetaItemPropContent : function (options) {
            var q = '';

            options = options || {};

            if (options.name) {
                q = (options.wrap ? options.wrap + ' ' : '') + 'meta[itemProp=' + options.name + ']';
            }

            return q.length ? $(q).attr('content') : '';
        },
        getCurrencyCode : function () {
            //UK|GBP#GB|GBP#DE|EUR#FR|EUR#ES|EUR#IT|EUR#NL|EUR#CH|CHF#SE|SEK#CA|CAD
            var CURRENCY_CODE = {
                    'UK' : 'GBP',
                    'DE' : 'EUR',
                    'FR' : 'EUR',
                    'ES' : 'EUR',
                    'IT' : 'EUR',
                    'NL' : 'EUR',
                    'CH' : 'CHF',
                    'SE' : 'SEK',
                    'CA' : 'CAD'
                },
                code = CURRENCY_CODE[window.merchSFCountryCode.toUpperCase()];

            return code ? code : 'No matching code';
        },
        getStoreType : function (id) {
            //Return Public or Private
            var PRIVATE_STORES = ['CG495', 'CG950', 'CG941', 'CG1927', 'CG1926', 'CG940', 'CG967', 'CG978', 'CG953'];
            return $.inArray(id, PRIVATE_STORES) > -1 ? 'Public' : 'Private';
        },
        service : {
            user : {
                _dfd : null,
                get : function (reload) {
                    var self = this;

                    if(typeof reload !== 'undefined' && reload !== null && reload) {
                        self._dfd = null;
                    }

                    if (self._dfd) {
                        return self._dfd.promise();
                    }

                    self._dfd = new $.Deferred();

                    //if (window.s_eVar8 && window.s_eVar8.toLowerCase().indexOf('anonymous') === -1) {
                    try {
                        HP.ECommerce.ISCS.Services.UserService.GetUser({}, function (response) {
                            //Service success
                            self._dfd.resolve({
                                'state' : 'SUCCESS',
                                'response' : response
                            });
                        }, function (response) {
                            //Service failed
                            self._dfd.reject({
                                'state' : 'SERVICE_FAILED',
                                'response' : response
                            });
                        });
                    } catch (e) {
                        //Service missing
                        self._dfd.reject({
                            'state' : 'SERVICE_MISSING'
                        });
                    }
                    /*
                     } else {
                     //User is logged out
                     self._dfd.reject({
                     'state' : 'ANONYMOUS_USER'
                     });
                     }
                     */

                    return self._dfd.promise();
                },
                getAddressMetaData : function() {
                    var dfd =  new $.Deferred();
                    try {
                        HP.ECommerce.ISCS.Services.UserService.GetAddressMetaData({AddressType: "Shipping"}, function (response) {
                            //Service success
                            dfd.resolve({
                                'state' : 'SUCCESS',
                                'response' : response
                            });
                        }, function (response) {
                            //Service failed
                            dfd.reject({
                                'state' : 'SERVICE_FAILED',
                                'response' : response
                            });
                        });
                    } catch(e) {
                        //Service missing
                        dfd.reject({
                            'state' : 'SERVICE_MISSING'
                        });
                    }
                    return dfd.promise();
                },
                customUserProfile : {
                    helpers: {
                        getSalutationKey: function(value, salutations) {
                            var i, salVal;
                            for(i=0; i<salutations.length; i++) {
                                salVal = salutations[i];
                                if(salVal.Value === value) {
                                    return salVal.Key;
                                }
                            }
                            return "-1";
                        },
                        updateCustomUserProfileObject: function(name, key, newValue, customUserProfileArray) {
                            var i,j, foundMerchHelper=false, foundKeyValue=false;
                            if(typeof customUserProfileArray === 'undefined' || customUserProfileArray === null) {
                                var tempArr = [{'Key': key, 'Value': newValue}];
                                return [new HP.Ecommerce.ISCS.Services.ProfileItemContract({Description: '', Name: name, Value: JSON.stringify(tempArr)})];
                            }
                            for(i=0; i<customUserProfileArray.length;i++) {
                                if(customUserProfileArray[i].Name === name) {
                                    var customUserProfileObject;
                                    foundMerchHelper = true;
                                    try {
                                        customUserProfileObject = JSON.parse(customUserProfileArray[i].Value);
                                    } catch(e) {
                                        customUserProfileObject = [{'Key': key, 'Value': newValue}];
                                        customUserProfileArray[i].Value = JSON.stringify(customUserProfileObject);
                                        break;
                                    }
                                    if(typeof customUserProfileObject !== 'undefined' && customUserProfileObject !== null && typeof customUserProfileObject === 'object') {
                                        for(j=0; j<customUserProfileObject.length; j++) {
                                            var nVC = customUserProfileObject[j];
                                            if(typeof nVC['Key'] !== 'undefined' && nVC['Key'] !== null && nVC['Key'] === key) {
                                                nVC['Value'] = newValue;
                                                foundKeyValue = true;
                                                customUserProfileArray[i].Value = JSON.stringify(customUserProfileObject);
                                                break;
                                            }
                                        }
                                        if(!foundKeyValue) {
                                            customUserProfileArray.push({'Key': key, 'Value': newValue});
                                        } else {
                                            break;
                                        }
                                    }
                                }
                            }
                            if(!foundMerchHelper) {
                                var tempArr = [{'Key': key, 'Value': newValue}];
                                customUserProfileArray.push(new HP.Ecommerce.ISCS.Services.ProfileItemContract({Description:'', Name:name, Value: JSON.stringify(tempArr)}));
                            }

                            return customUserProfileArray;
                        },
                        getCustomUserProfileValue: function(name, key, customUserProfileArray) {
                            var i,j;
                            if(typeof customUserProfileArray === 'undefined' || customUserProfileArray===null) {
                                return null;
                            }
                            for(i=0;i<customUserProfileArray.length;i++) {
                                if(customUserProfileArray[i].Name === name) {
                                    var customUserProfileObject;
                                    try {
                                        customUserProfileObject = JSON.parse(customUserProfileArray[i].Value);
                                    } catch(e) {
                                        return null;
                                    }
                                    for(j=0; j<customUserProfileObject.length; j++) {
                                        var nVC = customUserProfileObject[j];
                                        if(typeof nVC['Key'] !== 'undefined' && nVC['Key'] !== null && nVC['Key'] === key) {
                                            return nVC['Value'];
                                        }
                                    }
                                }
                            }
                            return null;
                        }
                    },
                    vat: {
                        get: function(reload) {
                            var dfd = new $.Deferred();
                            var user = merchAllPages.util.service.user.get(reload);
                            user.done(function(data) {
                                if(data.state === 'SUCCESS' && data.response.User !== null && data.response.User.CustomUserProfile != null && data.response.User.CustomUserProfile.length > 0) {
                                    var cUPV = merchAllPages.util.service.user.customUserProfile.helpers.getCustomUserProfileValue('MerchSettings', 'vat', data.response.User.CustomUserProfile);
                                    dfd.resolve({
                                        'state' : 'SUCCESS',
                                        'vat': cUPV,
                                        'response' : data
                                    });
                                } else {
                                    dfd.reject({
                                        'state' : 'SERVICE_FAILED',
                                        'response' : data
                                    });
                                }
                            })
                                .fail(function(data) {
                                    dfd.reject({
                                        'state' : 'SERVICE_FAILED',
                                        'response' : data
                                    });
                                });
                            return dfd.promise();
                        },
                        set: function(newVatValue) {
                            var dfd = new $.Deferred();
                            var user = merchAllPages.util.service.user.get();
                            var userMetaData = merchAllPages.util.service.user.getAddressMetaData();
                            $.when(user, userMetaData)
                                .done(function(data, metaData) {

                                    if(typeof data.response.User === 'undefined' ||
                                        data.response.User === null ||
                                        typeof data.response.User.FirstName === 'undefined' ||
                                        data.response.User.FirstName === null ||
                                        typeof data.response.User.LastName === 'undefined' ||
                                        data.response.User.LastName === null) {
                                        dfd.reject({
                                            'state' : 'SERVICE_FAILED',
                                            'response' : {
                                                'user' : data,
                                                'userAddressMetaData' : metaData
                                            }
                                        });
                                    } else {
                                        var request = new HP.ECommerce.ISCS.Services.UpdateUserRequest();
                                        request.FirstName = data.response.User.FirstName;
                                        request.LastName = data.response.User.LastName;
                                        request.SalutationKey = merchAllPages.util.service.user.customUserProfile.helpers.getSalutationKey(data.response.User.Salutation, metaData.response.Salutations);
                                        request.DoReturnUser = true;
                                        if(data.response.User.CustomUserProfile !== null && data.response.User.CustomUserProfile.length > 0) {
                                            request.CustomUserProfile = merchAllPages.util.service.user.customUserProfile.helpers.updateCustomUserProfileObject('MerchSettings', 'vat', newVatValue, data.response.User.CustomUserProfile);
                                        } else {
                                            var tempArr = [{'Key':'vat','Value': newVatValue}];
                                            request.CustomUserProfile = [new HP.Ecommerce.ISCS.Services.ProfileItemContract({Description:'', Name:'MerchSettings', Value: JSON.stringify(tempArr)})];
                                        }
                                        try {
                                            HP.ECommerce.ISCS.Services.UserService.UpdateUser(request, function (data) {

                                                if(data.User !== null && data.User.CustomUserProfile != null && data.User.CustomUserProfile.length > 0) {
                                                    dfd.resolve({
                                                        'state' : 'SUCCESS',
                                                        'response' : data
                                                    });
                                                } else {
                                                    dfd.reject({
                                                        'state' : 'SERVICE_FAILED',
                                                        'response' : data
                                                    });
                                                }
                                            }, function(data) {
                                                dfd.reject({
                                                    'state' : 'SERVICE_FAILED',
                                                    'response' : data
                                                });
                                            });
                                        } catch(e) {
                                            //Service missing
                                            dfd.reject({
                                                'state' : 'SERVICE_MISSING'
                                            });
                                        }
                                    }
                                })
                                .fail(function(user, userMetaData) {
                                    dfd.reject({
                                        'state' : 'SERVICE_FAILED',
                                        'response' : {
                                            'user' : user,
                                            'userAddressMetaData' : userMetaData
                                        }
                                    });
                                });
                            return dfd.promise();
                        }
                    }
                }
            }
        }
    },
    vatSelect : {
        init : function() {
            var $vatSelect  = $('.js-s-h-vat-select');
            var value = window.merchAllPages.merchCookies.getCkVat();
            var self = this;

            if (value) {
                $vatSelect.find('.s-h-vat-select__val').text($vatSelect.attr('data-' + value));
            }

            $vatSelect.on('click.s-h', function(event) {
                event.preventDefault();
                window.merchAllPages.focusBox.show({
                    'html' : $('#js-s-h-vat-dialog-template').html(),
                    'classList' : 'focus-box--vat'
                });
            });

            $(document.body).on('click.s-h', '.js-s-h-vat-btn', function(event) {
                var vat = $(this).attr('data-vat');
                if (vat) {
                    merchAllPages.util.service.user.customUserProfile.vat.set(vat).always(function() {
                        window.merchAllPages.merchCookies.setCkVat(vat);
                        window.merchAllPages.akamaiCCCookie.write({ isAnonymous : window.s_eVar8.indexOf('anonymous') > -1 });
                        self.reload({ addTabName : true });
                    });
                }
            });
        },
        reload: function(options) {
            var url = window.location.href;

            if (typeof options === 'undefined') {
                document.location.reload();
            }

            if (typeof options === 'object' && options.addTabName === true) {
                var tabName = $('.spadejsuitabsTitle.on .landing-tabs-title').text();
                if (tabName !== '') {
                    var urlParams = merchAllPages.util.getUrlParams();
                    if (url.indexOf('tabName') > -1 && urlParams['tabName'] !== '') {
                        var oldValue = urlParams['tabName'];
                        url = url.replace('&tabName=' + oldValue, '&tabName=' + tabName);
                    } else {
                        url += '&tabName=' + tabName;
                    }
                }
            }

            if (window.location.href !== url) {
                window.location.href = url;
            } else {
                window.location.reload();
            }
        }
    },
    waitForAcc : function(code, opt, base, type) {
        //Called from application.js
        //Called from app.page.all.js
        if (type == 'main' && mercCartTarget == 'popup'/* && $('#accessories-tab').is(':visible')*/) {
            var img = $('#product-overview-slideshow-thumbs').find('.thumb-1 img').attr('src'),
                name = $('#main-content-title').html(),
                price = $('.product-right-column .current-price nobr').html(),
                quantity = $('.add-to-cart-omni').html().split('|')[0],
                merch_oc = $('#merch-overlay-cart'),
                background = $('#merch-overlay-background'),
                altTag = '';

            if (background.length < 1) {
                background = $('<div>');
                background.attr('id', 'merch-overlay-background');
                background.attr('class', 'merch-overlay-background');
                $(document.body).append(background);
            }
            background.click(function() {
                merch_oc.hide();
                $(this).hide();
            });

            if (merch_oc.parent('.body-inner').length > 0) {
                $(document.body).append(merch_oc);
            }

            if (name.indexOf('flag-new="flag-new"') > 0) {
                altTag = name;
            } else {
                altTag = name.slice(0, name.indexOf('<span class="flag-new">'));
            }


            merch_oc.find('.button-accessory').click(function (event) {
                event.preventDefault();
                $('#accessories-tab').click();
                $('html, body').animate( { scrollTop: $('#content-left-column-tabs').offset().top }, 'slow' );
                merch_oc.hide();
                background.hide();
            });

            var sisu = '<div class="my-media">' +
                '<div class="my-image">' +
                '<img src="' + img + '" alt="' + altTag + '" />' +
                '</div>' +
                '<div class="my-description">' +
                '<h5>' + name + '</h5>' +
                '<p class="price">' + merch_oc.find('#merch-price-text').text() + ' <span>' + price + '</span></p>' +
                '<p>' + merch_oc.find('#merch-quantity-text').text() + ' <span>' + quantity + '</span></p>' +
                '</div></div>';
            merch_oc.find('.cart-content').html(sisu);
            merch_oc.show();
            background.show();
            $('#merch-overlay-cart-close').click(function () {
                merch_oc.hide();
                background.hide();
            });
        } else {
            window.OnAddToCartComplete = function() {
                merchAllPages.goToCart();
            };
            //hpdebug('goToCart');setTimeout(function() {goToCart();}, 4000);
        }
    }
};

/*
(function(window, $, comp) {

    function COMPONENT() {
        return this;
    }

    COMPONENT.prototype = {
        constructor : COMPONENT
    };

    comp.COMPONENT = COMPONENT;

}(window, $, window.merchComp = window.merchComp || {}));
*/

(function(window, $, comp) {

    function User() {
        var url = window.location.href.toLowerCase();
        var options = $.cookie('merchUserType') !== null ? $.cookie('merchUserType').split('|') : ['home', '1', '1'];
        var type;
        var menu;

        if (window.location.href.search(/seg=b/i) != -1) {
            options = ['business', '1', '1'];
        } else if (window.location.href.search(/seg=c/i) != -1) {
            options = ['home', '1', '1'];
        }

        type = options[0] === 'business' ? 'business' : 'home';

        window.merchAllPages.util.service.user.get().done(function(res) {
            var $accountBtn = $('.js-s-h-account-btn');
            if (res.response.IsAuthenticated) {
                // Logged in user
                $accountBtn.attr('href', $accountBtn.attr('data-account-href'));
                $('.js-s-h-user-name').text(res.response.User.FirstName + ' ' + res.response.User.LastName);
                $('.js-s-h-logged-in-menu').removeClass('is-hidden');
                $('.js-s-h-logged-out-menu').addClass('is-hidden');
            } else if (res.response.IsRemembered) {
                // Remembered
                $('.js-s-h-logged-in-menu').removeClass('is-hidden');
                $('.js-s-h-logged-out-menu').addClass('is-hidden');
                $('.js-s-h-logout').addClass('is-hidden');
            }
        }).fail(function(result) {
            // Logged out user ...
        });

        if (window.s_eVar45) {
            if (s_eVar45.indexOf('SCESG21887') > -1 ||
                s_eVar45.indexOf('SG998') > -1 ||
                s_eVar45.indexOf('SCESG21978') > -1 ||
                s_eVar45.indexOf('SCESG22740') > -1 ||
                s_eVar45.indexOf('CG1817') > -1 ||
                s_eVar45.indexOf('CG1816') > -1) //UK PRO & ITG Public SMB Community
            {
                type = 'business';
            }

            if (s_eVar45.indexOf('CG947') > -1 ||
                s_eVar45.indexOf('CG951') > -1 ||
                s_eVar45.indexOf('CG954') > -1 ||
                s_eVar45.indexOf('CG1496') > -1 ||
                s_eVar45.indexOf('CG1932') > -1 ||
                s_eVar45.indexOf('SCESG20896') > -1 ||
                s_eVar45.indexOf('SCESG20897') > -1 ||
                s_eVar45.indexOf('SCESG20898') > -1 ||
                s_eVar45.indexOf('SCESG20899') > -1 ||
                s_eVar45.indexOf('SCESG23182') > -1 ||
                s_eVar45.indexOf('CG2006') > -1 ||
                s_eVar45.indexOf('CG2052') > -1 ||  //NL_HP_Students
                s_eVar45.indexOf('CG2053') > -1 ||  //NL_HP_EPP_External
                s_eVar45.indexOf('CG2074') > -1 ||  //TechDirect ID: 2839736
                s_eVar45.indexOf('CG1747') > -1 ||  //AU Student
                s_eVar45.indexOf('SCESG23173') > -1 ||  //NL FAF Store - Hide Business tab - TechDirect ID: 2892859
                s_eVar45.indexOf('SCESG23205') > -1) //IT PRO
            {
                type = 'home';
            }

            if (s_eVar45.indexOf('SCESG23196') > -1 ||
                s_eVar45.indexOf('CG1816') > -1 ||
                s_eVar45.indexOf('CG1813') > -1 ||
                s_eVar45.indexOf('SCESG22588') > -1 ||
                s_eVar45.indexOf('SCESG22661') > -1 ||
                s_eVar45.indexOf('SCESG21678') > -1 ||
                s_eVar45.indexOf('SCESG23270') > -1 ||
                s_eVar45.indexOf('SCESG23271') > -1 ||
                s_eVar45.indexOf('CG1497') > -1 || //UK TechDirect ID: 2839944
                s_eVar45.indexOf('CG1817') > -1)
            {
                type = 'business';
            }

            if (s_eVar45.indexOf('CG1759') > -1) { //ES PRO SMB ONLY CAT
                type = 'business';
            }

            if (s_eVar45.indexOf('CG965') > -1 || //Default set to SMB but both are available
                s_eVar45.indexOf('CG1617') > -1)
            {
                if ($.cookie('merchUserType') !== null) {
                    type = 'business';
                }
            }
        }

        if (url.indexOf('.aspx') > -3) {
            var pageType;
            try {
                pageType = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.aspx') + 5);
            } catch(e) {}

            if (pageType && (/list.aspx/i.test(pageType) || /product.aspx/i.test(pageType))) {
                //case 'list.aspx', 'product.aspx':
                if ((/sel=NTB/i).test(url)) {
                    type = 'home';
                    menu = 'laptops';
                } else if (/sel=DTP/i.test(url)) {
                    type = 'home';
                    menu = 'desktops';
                } else if (/sel=ACC/i.test(url)) {
                    type = 'home';
                    menu = 'accessories';
                } else if (/sel=PRN/i.test(url)) {
                    type = 'home';
                    menu = 'printers';
                } else if (/sel=MTO/i.test(url)) {
                    type = 'home';
                    menu = 'monitors';
                } else if (/sel=TBL/i.test(url)) {
                    type = 'home';
                    menu = 'tablets';
                }
            }
            else if(/supplies.aspx/i.test(pageType)) {
                menu = 'inks';
            }
            else if(/offer.aspx/i.test(pageType)) {
                menu = 'offers';
            }
        }

        if (window.merchUserTypeOverride && (window.merchUserTypeOverride === 'home' || window.merchUserTypeOverride === 'business')) {
            type = window.merchUserTypeOverride;
        }

        this.set('', menu, options[1], options[2]);

        this.updateLoginLink();

        return this;
    }

    User.prototype = {
        constructor : User,
        set : function(type, menu, welcome, vouchers) {
            var $telNum = $('.merchTelNumber');

            switch (type) {
                case 'business':
                    $telNum.text(window.merchTelSMB);
                    break;
                default:
                    $telNum.text(window.merchTelDefault);
                    break;
            }

            window.merchUserTypeVal = type;
            window.merchUserWelcome = typeof welcome !== 'undefined' ? welcome : '1';
            window.merchSpecialVouchers = typeof vouchers !== 'undefined' ? vouchers : '1';
            window.s_channel = window.merchSFCountryCode + ':iscs|store:' + type;

            if (menu && menu.length) {
                window.s_channel = window.merchSFCountryCode + ':iscs|store:' + type + ':' + menu;
            }

            $.cookie('merchUserType', window.merchUserTypeVal + '|' + window.merchUserWelcome + '|' + window.merchSpecialVouchers, { path: '/' });
        },
        updateLoginLink : function() {
            var $link = $('.js-s-h-login');
            if ($link.length) {
                $link.each(function () {
                    var $el = $(this);
                    $el.attr('href', $el.attr('href').replace('{{url}}', window.location.href));
                });
            }
        }
    };

    comp.User = User;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function ResetPassword() {
        $('.js-s-h-reset-password').on('click', function(event) {
            var href = $(this).attr('href');
            if (href && href.length) {
                window.merchAllPages.loader.show();
                window.HP.ECommerce.ISCS.Services.UserService.Logout({}, function(res) {
                    if (!res.Errors.length) {
                        window.location = href;
                    }
                });
            }
            event.preventDefault();
        });
        return this;
    }

    comp.ResetPassword = ResetPassword;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function Phone() {
        if (window.merchTelNumbers && window.merchTelNumbers.length) {
            for (var i = 0; i < window.merchTelNumbers.length; i++) {
                if (window.s_eVar45 && window.s_eVar45.indexOf(window.merchTelNumbers[i][0]) > -1) {
                    window.merchTelDefault = window.merchTelNumbers[i][1];
                    window.merchTelDefaultPrice = window.merchTelNumbers[i][3];
                    window.merchTelSMB = window.merchTelNumbers[i][2];
                }
            }
        }
        this.nr($('.js-merch-def-tel'), window.merchTelDefault);
        this.price($('.js-merch-def-tel-price'), window.merchTelDefaultPrice);
        if (window.merchTelSMB !== 0) {
            var $smbTel = $('.js-merch-smb-tel');
            this.nr($smbTel, window.merchTelSMB);
            $smbTel.closest('.s-f-badge.is-hidden').removeClass('is-hidden');
        }
        return this;
    }

    Phone.prototype = {
        constructor : Phone,
        nr : function($el, nr) {
            $el.each(function() {
                var $e = $(this);
                var $a = $e.is('a') ? $e : $e.closest('a');
                $e.text(nr);
                if ($a.length) {
                    $a.attr('href', 'tel:' + nr.replace(/ /g, ''));
                }
            });
        },
        price : function($el, price) {
            if (price) {
                $el.each(function() {
                    $(this).text(price);
                });
            }
        }
    };

    comp.Phone = Phone;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function ToTop() {
        $('.js-s-f-back-to-top').on('click.s-h', function(event){
            event.preventDefault();
            event.stopPropagation();
            $('html, body').animate({ scrollTop : '0px' });
        });
        return this;
    }

    comp.ToTop = ToTop;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function Sticky() {
        var $sticky = $('.js-s-f-sticky');
        if ($sticky.length) {
            this.$sticky = $sticky;
        }
        return this;
    }

    Sticky.prototype = {
        constructor : Sticky,
        load : function() {
            var $sticky = this.$sticky;
            var $window = $(window);
            var windowHeight;
            var footerHeight;
            var top;

            if ($sticky && $sticky.length) {
                this.reset();

                windowHeight = $window.height();
                footerHeight = $sticky.outerHeight();
                top = $sticky.offset().top + footerHeight;

                $sticky.parent().css('height', footerHeight);

                $window.on('scroll.s-f', function() {
                    if (top < $window.scrollTop() + windowHeight) {
                        $sticky.removeClass('is-sticky');
                    } else {
                        $sticky.addClass('is-sticky');
                    }
                }).scroll();
            }
        },
        reset : function() {
            var $sticky = this.$sticky;
            var $window = $(window);
            if ($sticky && $sticky.length) {
                $window.off('scroll.s-f');
                $sticky.removeClass('is-sticky');
            }
        }
    };

    comp.Sticky = Sticky;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function LangSelector() {
        var $langLink = $('.js-s-h-lang-btn');

        $langLink.each(function() {
            var $link = $(this);
            if ($link.attr('data-ll') === window.merchSFLanguageCode) {
                $link.addClass('is-active')
            }
        });

        $langLink.on('click.s-h', function(event) {
            var protocol = window.location.protocol;
            var host = window.location.host;
            var pathName = window.location.pathname;
            var search = window.location.search;
            var hash = window.location.hash;
            var lang = $(this).attr('data-ll');
            var country = $(this).attr('data-cc');
            var langParamIndex;
            var preSearch;
            var postSearch;

            event.preventDefault();

            if (search.length > 0) {
                langParamIndex = search.indexOf('lang=');
                if (langParamIndex > -1) {
                    preSearch = search.slice(0, langParamIndex);
                    postSearch = search.slice(langParamIndex + 'lang=ll-CC'.length, search.length);
                    search = preSearch + 'lang=' + lang + '-' + country + postSearch;
                } else {
                    search +=  '&lang=' + lang + '-' + country;
                }
            } else {
                search = '?lang=' + lang + '-' + country;
            }

            window.merchAllPages.akamaiCCCookie.write({ isAnonymous : window.s_eVar8.indexOf('anonymous') > -1 });

            window.location = protocol + '//' + host + pathName + search + hash;
        });
        return this;
    }

    comp.LangSelector = LangSelector;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    var PROPS = {
            CURRENT : 0,
            MIN : 0,
            MAX : 0,
            CLICK_STEP : 200,
            HOVER_STEP : 2,
            HOVER_INTERVAL : 16
        };

    function ScrollNav() {
        var maskWidth = $('.js-s-h-nav-scroll-mask').width(),
            navWidth = $('.js-s-h-nav-scroll-list').width();

        if (maskWidth < navWidth) {
            PROPS.MAX = navWidth - maskWidth;
            this.init();
        }
        return this;
    }

    ScrollNav.prototype = {
        constructor : ScrollNav,
        init : function() {
            var $scrollBtnLeft = $('.js-s-h-nav-scroll-left'),
                $scrollBtnRight = $('.js-s-h-nav-scroll-right'),
                scrollInterval,
                self = this;

            $scrollBtnRight.addClass('is-visible');

            $scrollBtnLeft.on('click.s-h', function() {
                PROPS.CURRENT -= PROPS.CLICK_STEP;
                if (PROPS.CURRENT < PROPS.MIN) {
                    PROPS.CURRENT = PROPS.MIN;
                }
                clearInterval(scrollInterval);
                self.clickAnimate();
            });

            $scrollBtnRight.on('click.s-h', function() {
                PROPS.CURRENT += PROPS.CLICK_STEP;
                if (PROPS.CURRENT > PROPS.MAX) {
                    PROPS.CURRENT = PROPS.MAX;
                }
                clearInterval(scrollInterval);
                self.clickAnimate();
            });

            $scrollBtnLeft.on('mouseenter.s-h', function() {
                scrollInterval = setInterval(function() {
                    PROPS.CURRENT -= PROPS.HOVER_STEP;
                    if (PROPS.CURRENT < PROPS.MIN) {
                        PROPS.CURRENT = PROPS.MIN;
                    }
                    self.hoverAnimate();
                }, PROPS.HOVER_INTERVAL);
            });

            $scrollBtnLeft.on('mouseleave.s-h', function() {
                clearInterval(scrollInterval);
            });

            $scrollBtnRight.on('mouseenter.s-h', function() {
                scrollInterval = setInterval(function() {
                    PROPS.CURRENT += PROPS.HOVER_STEP;
                    if (PROPS.CURRENT > PROPS.MAX) {
                        PROPS.CURRENT = PROPS.MAX;
                    }
                    self.hoverAnimate();
                }, PROPS.HOVER_INTERVAL);
            });

            $scrollBtnRight.on('mouseleave.s-h', function() {
                clearInterval(scrollInterval);
            });
        },
        hoverAnimate : function() {
            var $scrollNavList = $('.js-s-h-nav-scroll-list');
            $scrollNavList.css('margin-left', '-' + PROPS.CURRENT + 'px');
            this.render();
        },
        clickAnimate : function() {
            var $scrollNavList = $('.js-s-h-nav-scroll-list');
            $scrollNavList.animate(
                { 'margin-left' : '-' + PROPS.CURRENT + 'px' },
                { queue : false }
            );
            this.render();
        },
        render : function() {
            var $scrollBtnLeft = $('.js-s-h-nav-scroll-left'),
                $scrollBtnRight = $('.js-s-h-nav-scroll-right');

            if (PROPS.CURRENT === PROPS.MIN) {
                $scrollBtnLeft.removeClass('is-visible');
            }

            if (PROPS.CURRENT === PROPS.MAX) {
                $scrollBtnRight.removeClass('is-visible');
            }

            if (PROPS.CURRENT < PROPS.MAX) {
                $scrollBtnRight.addClass('is-visible');
            }

            if (PROPS.CURRENT > PROPS.MIN) {
                $scrollBtnLeft.addClass('is-visible');
            }
        }
    };

    comp.ScrollNav = ScrollNav;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function StoreName() {
        var storeName = $('#_ctl0__ctl0_Top2__ctl5__ctl0_storeName').find('span').eq(0).text().trim(),
            brandName = $('#s-h .s-h-title').text();
        if (storeName && storeName.length) {
            $('#s-h .js-s-h-store-name').text(brandName + ' ' + storeName);
        }
        return this;
    }

    comp.StoreName = StoreName;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function SiteSwitch() {
        var $btn = $('.js-s-f-site-switch-btn');
        $btn.on('click.s-f', function() {
            var $btn = $(this),
                browser = $btn.attr('data-browser');
            if (browser) {
                $.cookie('cae_browser', browser, { path : '/', domain : 'hp.com' });
                window.location.reload();
            }
        });
        return this;
    }

    comp.SiteSwitch= SiteSwitch;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {

    function Search() {
        var $search = $('.js-s-h-search');
        var $searchBtn = $('.js-s-h-search-btn');
        var $searchCloseBtn = $('.js-s-h-close-btn');
        var $searchInput = $('.js-s-h-search .s-h-search__input');
        var self = this;

        $searchBtn.on('click.s-h', function(event) {
            if ($search.hasClass('is-visible')) {
                if ($searchInput.val().length) {
                    // Do search ...
                    self.submit();
                } else {
                    // No value lets focus the field ...
                    $searchInput.focus();
                }
            } else {
                // Show search
                $searchBtn.addClass('is-active');
                self.show();
                $searchInput.focus();
            }
            event.stopPropagation();
            event.preventDefault();
        });

        $searchCloseBtn.on('click.s-h', function(event) {
            $searchBtn.removeClass('is-active');
            self.hide();
        });

        $searchInput.on('keypress.s-h', function(event) {
            switch (event.keyCode) {
                case 13:
                    if ($searchInput.val().length) {
                        // Do search ...
                        self.submit();
                    }
                    break;
            }
        });

        return this;
    }

    Search.prototype = {
        constructor : Search,
        submit : function() {
            var $searchInput = $('.js-s-h-search .s-h-search__input');
            var $searchBtn = $('.js-s-h-search-btn');
            var val = $searchInput.val().replace(/'/g , "‘");
            if (val.length) {
                window.location = $searchBtn.attr('href') + '?q=' + val;
            }
        },
        show : function() {
            var $search = $('.js-s-h-search');
            var $nav = $('.js-s-h-nav');
            $nav.addClass('is-hidden');
            $search.addClass('is-visible');
        },
        hide : function() {
            var $search = $('.js-s-h-search');
            var $nav = $('.js-s-h-nav');
            $search.removeClass('is-visible');
            $nav.removeClass('is-hidden');
        }
    };

    comp.Search = Search;

}(window, $, window.merchComp = window.merchComp || {}));


(function(window, $, comp) {
    'use strict';

    function SessionTimer() { 
        this.start();
    };    

    SessionTimer.prototype = {
        constructor : SessionTimer,
        start : function() {
            var $time = $('.logout-time').attr('data-time');
            var count = $time.split(':');
            var min = count[0];
            var sec = count[1];
            this.tick = setInterval(function() {
            $('.focus-box .logout-time').each(function(i, el) {        
                if (min >= 0 && sec > 0) {
                    sec--;
                    $(el).html(min + ':' + (sec < 10 ? "0" + sec : sec));
                }
                if (min > 0 && sec == 0) {
                    min--;
                    sec = 59;
                    $(el).html(min + ':' + (sec < 10 ? "0" + sec : sec));       
                } 
                if (min == 0 && sec == 0) {
                    this.stop();
                    //$('.focus-box__close-btn').click();

              }
            }.bind(this));
          }.bind(this), 1000)                                                                            
        },
        stop : function() {
            clearInterval(this.tick);
        }   
    };

    comp.SessionTimer = SessionTimer;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {
    'use strict';

    function SessionWarningPopup() {
        this.logout();
        this.keepMe();        
        this.onClose();
    };

    SessionWarningPopup.prototype = {
        constructor : SessionWarningPopup,
        logout :  function() {
            $('.js-log-out').on('click', function(event) {
                event.preventDefault();
                if (window.merchSessionTimer) {
                    window.merchSessionTimer.stop();
                }   
                SERVICE.API_USER.logout({}, null, OnServiceFailure).done(function() {
                    window.location.reload();    
                });                
            }.bind(this));
        },
        keepMe : function() {    
            $('.js-keep-me').on('click', function(event) {
                event.preventDefault();
                if (window.merchSessionTimer) {
                    window.merchSessionTimer.stop();
                }
                window.location.reload();
            }.bind(this));
        },
        onClose : function() {
            $('.focus-box__close-btn, .focus-box-bg').on('click', function(){
                if (window.merchSessionTimer) {
                    window.merchSessionTimer.stop();
                } 
            });
        }
    }

    comp.SessionWarningPopup = SessionWarningPopup;

}(window, $, window.merchComp = window.merchComp || {}));

(function(window, $, comp) {
    'use strict';

    function SessionEndPopup() {
        this.SessionEndPopup();
        this.onClose();
    };

    SessionEndPopup.prototype = {
        constructor : SessionEndPopup,
        SessionEndPopup : function(){
            $('.js-login-back').on('click', function(event) {
                event.preventDefault();
                window.location.href = getHpPath(true) + 'Merch/Login.aspx';
            });
        },
        onClose : function() {
            $('.focus-box__close-btn, .focus-box-bg').on('click', function(){
                window.location.reload();            
            });
        }

    };

    comp.SessionEndPopup = SessionEndPopup;

}(window, $, window.merchComp = window.merchComp || {}));