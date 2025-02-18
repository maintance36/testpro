var d = new Date();

(function($){
    'use strict';
    //Отдельном выносим языки, для более простой локализации
    var Lang = {
        de: {
            //Месяца
            months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            //Месяца в родительcком падеже
            monthsRp: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            //Месяца в предложном падеже
            monthsPp: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            maxPurchase: 'Die größte Anzahl der Bestellungen (_COUNT_) war am _DATE_ _MONTH_ '+d.getFullYear()+' Jahr.',
            stockInfoTitle: 'Mehr als 100 000 Verkäufe im ',
            stockInfoTime: 'Fristen der Durchführung der Aktie vom _STARTDATE_ _STARTMONTH_ dem _ENDDATE_ _ENDMONTH_'
        }
    };

    //Объявляем класс нашего лендинга
    var Landing = function () {

        this.nowDate = new Date();
        
        //Параметры загрузки лендинга
        this.params = {
            lang: 'de', //локализация
            maxPurchase: 2419, //Максимальное кол-во покупок
            maxPurchaseDate: 2, //Количество дней назад 
            startStockDate: 29, //Дней назад началась акция
            endStockDate: 1, //Дней через которые акция закончится
            countDownDiff: Math.ceil((24*60*60)-(this.nowDate.getHours() * 60 * 60 + this.nowDate.getMinutes() * 60 + this.nowDate.getSeconds())), //Количество секунд до конца таймера
            selectors: {
                countDown: '.landing__countdown', //Таймер
                maxPurcahesDate: '.landing__maxpurcashe', //Максимальное кол-во покупок
                stockInfo: '.landing__stockinfo',
                stockInfoTitle: '.landing__stockinfo_title'
            }
        };

        //Стартуем таймер
        this.initCountDown();
        //Заполняем обман
        //Максимальное количество покупок
        this.initMaxPurcasheDate();
        //Даты проведения акции
        this.initStockInfo();

        this.initEvents();
    };
    //Список ивентов лендинга
    Landing.prototype.initEvents = function() {
        this.removeStyleTag();
        $('.scrollto').on('click', this.scrollToForm);
        $('.delivery li a').on('hover', this.showHeadInformation);
        /*this.initWarningModal();
        $("#ouibounce-modal .modal-footer, .close-over").on("click", this.closeWarningModal);*/
    };

    //Информация о дате проведения лендингов
    Landing.prototype.initStockInfo = function() {
        var lang = Lang[this.params.lang];
        var stockTitle = lang.stockInfoTitle + lang.monthsPp[this.nowDate.getUTCMonth()];


        var endStockDate = new Date(this.nowDate.getTime() + (this.params.endStockDate*24*60*60*1000));
        var startStockDate = new Date(this.nowDate.getTime() - (this.params.startStockDate*24*60*60*1000));

        var stockInfo = lang.stockInfoTime;
            stockInfo = stockInfo.replace('_STARTDATE_', startStockDate.getUTCDate());
            stockInfo = stockInfo.replace('_ENDDATE_', endStockDate.getUTCDate());
            stockInfo = stockInfo.replace('_STARTMONTH_', lang.monthsRp[startStockDate.getMonth()]);
            stockInfo = stockInfo.replace('_ENDMONTH_', lang.monthsRp[endStockDate.getMonth()]);
        
        $(this.params.selectors.stockInfoTitle).html(stockTitle);
        $(this.params.selectors.stockInfo).html(stockInfo);
    };
    
    //Максимальное количество покупок
    Landing.prototype.initMaxPurcasheDate = function() {
        var maxPurchaseDate = new Date(this.nowDate.getTime() - (this.params.maxPurchaseDate*24*60*60*1000));
        var htmlString = Lang[this.params.lang].maxPurchase;
            htmlString = htmlString.replace('_COUNT_', this.params.maxPurchase);
            htmlString = htmlString.replace('_DATE_', maxPurchaseDate.getUTCDate());
            htmlString = htmlString.replace('_MONTH_', Lang[this.params.lang].monthsRp[maxPurchaseDate.getUTCMonth()]);

        $(this.params.selectors.maxPurcahesDate).html(htmlString);
    };

    Landing.prototype.initCountDown = function() {
        var _this = this,
            endDate = new Date(this.nowDate.getTime() + this.params.countDownDiff * 1000);

        var countDownTimer = setInterval( function () {
            var diffDate = new Date(endDate.getTime() - Date.now()),
                h = (diffDate.getHours() > 9) ? diffDate.getHours() : '0'+diffDate.getHours(),
                m = (diffDate.getMinutes() > 9) ? diffDate.getMinutes() : '0'+diffDate.getMinutes(),
                s = (diffDate.getSeconds() > 9) ? diffDate.getSeconds() : '0'+diffDate.getSeconds();

            var htmlTime = '<span class="hours2">'+ h +'</span>'+
                           '<span class="minutes2">'+ m +'</span>'+
                           '<span class="seconds2">'+ s +'</span>';

            $(_this.params.selectors.countDown).html(htmlTime);
        }, 1000);
    };

    Landing.prototype.removeStyleTag = function(event) {
        $(document.head).find('style').remove();
    };

    Landing.prototype.scrollToForm = function(event) {
        var $target = $(event.currentTarget);

        $("body,html").animate({
            scrollTop: $($target.attr("href")).offset().top
        }, 1e3);
        event.preventDefault();
    };

    /*Landing.prototype.initWarningModal = function(event) {
        ouibounce(document.getElementById("ouibounce-modal"), {
            aggressive: !0,
            timer: 0,
            oneEvent: !1,
            sensitivity: 100
        });
    };*/

    /*Landing.prototype.closeWarningModal = function(event) {
        $("#ouibounce-modal").hide();
    };*/

    $(function() {
        window.landing = new Landing();
    });
})(jQuery);

/*
$(document).ready(function() {
	setTimeout(function(){$('select').val('DE');},500);
		
	});*/