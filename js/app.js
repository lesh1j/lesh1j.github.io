"use strict"; //use strict mode on

(function ($) {

    var currency = 56.59; //курс доллара
    
    var workPrice = 500; // стоимость монтажа одного изделия
    
    var deliveryInMcadPrice = 500; // стоимость доставки в пределах МКАД
    var deliveryOutMcadPrice = 500; // стоимость доставки вне МКАД
    var deliveryOutMcadPriceKm = 50; // дополнительная стоимость доставки вне МКАД за 1 км.
    
    var equipInMcadPrice = 500; // стоимость замерщика в пределах МКАД
    var equipOutMcadPrice = 500; // стоимость замерщика вне МКАД
    var equipOutMcadPriceKm = 50; // дополнительная стоимость замерщика вне МКАД за 1 км.
    
    var files = {
        mini: {
            name: "Mini",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        mini_zebra: {
            name: "Mini Зебра",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория"
            }
        },
        uni_1: {
            name: "Uni 1",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        uni_1_zebra: {
            name: "Uni 1 Зебра",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория"
            }
        },
        uni_2: {
            name: "Uni 2",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        uni_2_zebra: {
            name: "Uni 2 Зебра",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория"
            }
        },
        uni_2_pruzhina: {
            name: "Uni 2 Пружина",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        lvt: {
            name: "Louvolite",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        lvt_zebra: {
            name: "Louvolite Зебра",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория"
            }
        },
        mgs_zebra: {
            name: "MGS Зебра",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория"
            }
        },
        lux: {
            name: "LUX",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        plisse: {
            name: "Плиссе",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория",
                '_5': "5-категория"
            }
        },
        mirazh: {
            name: "Мираж",
            cats: {
                '_e': "E-категория"
            }
        },
        venus_16: {
            name: "VENUS 16 мм.",
            cats: {
                '_1': "1-категория",
                '_3': "3-категория"
            }
        },
        venus_25: {
            name: "VENUS 26 мм.",
            cats: {
                '_e': "E-категория",
                '_1': "1-категория",
                '_2': "2-категория",
                '_3': "3-категория",
                '_4': "4-категория"
            }
        }
    }
    
    var file = '../files/mini/e.csv';
    var prices = [];
    var itemHeight, 
        itemWidth, 
        priceValue, 
        priceWidth, 
        priceWidths, 
        priceHeight, 
        itemCats, 
        itemCat;
    var maxHeight = 0;
    var maxWidth = 0;
    var minHeight = 10000;
    var minWidth = 10000;
    
    function getTypes(){
        for (var key in files) {
            $('#item-type').append('<option value="'+key+'">'+files[key].name+'</option>');
        }
    }
    
    getTypes();
    
    var itemType = "mini";
    
    function getCats(itemType){
        $('#item-cats option').remove();
        for (var key in files) {
            if(key == itemType){
                itemCats = files[key].cats;
                for (var key in itemCats) {
                    var keyValue = key.slice(1);
                    $('#item-cats').append('<option value="'+keyValue+'">'+itemCats[key]+'</option>');   
                }
            }
        }
    }
    
    getCats(itemType);
    
    
    function getMaxSizes(prices){
        
        maxHeight = 0;
        maxWidth = 0;
        
        for (var i = 0; i < (prices.length-1); i++) {
            
            priceHeight = parseFloat(prices[i].h.replace(',', '.'))*100;
            if(priceHeight > maxHeight){
                maxHeight = Math.round(priceHeight);
            }
            
            if(i == 0){
                priceWidths = prices[i];
                for (var key in priceWidths) {
                    if(key != 'h'){
                        priceWidth = parseFloat(key.replace(',', '.'))*100;
                        if(priceWidth > maxWidth){
                            maxWidth = Math.round(priceWidth);
                        }
                    }
                }
            }
        }
        
    }
    
    function getMinSizes(prices){
        
        minHeight = 10000;
        minWidth = 10000;
        
        for (var i = 0; i < (prices.length-1); i++) {
            
            priceHeight = parseFloat(prices[i].h.replace(',', '.'))*100;
            if(priceHeight < minHeight){
                minHeight = Math.round(priceHeight);
            }
            
            if(i == 0){
                priceWidths = prices[i];
                for (var key in priceWidths) {
                    if(key != 'h'){
                        priceWidth = parseFloat(key.replace(',', '.'))*100;
                        if(priceWidth < minWidth){
                            minWidth = Math.round(priceWidth);
                        }
                    }
                }
            }
        }
        
    }
    
    function parceFile(file){
    
        Papa.parse(file, {
            download: true,
            delimiter: ",",
            header: true,
            complete: function(result) {
                prices = result.data;
                getMaxSizes(prices);
                getMinSizes(prices)
                checkMaxMin();
            }
        });
        
    }
    
    parceFile(file);
    
    var diffHeght, 
        diffWidth, 
        nearHeight, 
        nearWidth, 
        itemsCount, 
        summ, 
        discount, 
        typeName, 
        catName, 
        totalItemsCount, 
        worksSumm, 
        equipSumm, 
        deliverySumm, 
        totalSumm,
        minDiffHeght, 
        minDiffWidth;
    
    $('#addResult').on('click', function(){
        
        $('.result').fadeIn(200);
        
        minDiffHeght = 10000;
        minDiffWidth = 10000;
        
        itemWidth = $('#item-width').val();
        itemHeight = $('#item-height').val();
        
        for (var i = 0; i < (prices.length-1); i++) {
            
            priceHeight = parseFloat(prices[i].h.replace(',', '.'))*100;    
            diffHeght = Math.abs(priceHeight - itemHeight);

            if(diffHeght <= minDiffHeght){
                
                minDiffHeght = diffHeght;
                nearHeight = prices[i].h;
                priceWidths = prices[i];
                
                for (var key in priceWidths) {
                    
                    priceWidth = parseFloat(key.replace(',', '.'))*100;
                    diffWidth = Math.abs(priceWidth - itemWidth);
                    
                    if(diffWidth <= minDiffWidth){
                        minDiffWidth = diffWidth;
                        nearWidth = key;
                    }

                }
            }
        }
        
        for (var i = 0; i < (prices.length-1); i++) {
            if(prices[i].h == nearHeight){
                priceValue = prices[i][nearWidth];
            }
        }
        
        priceValue = priceValue.slice(1).replace(',', '.')*currency;
        
        priceValue = Math.round(priceValue*100)/100;
        
        itemsCount = parseInt($('#item-count').val());
        summ = itemsCount*priceValue;
        summ = Math.round(summ*100)/100;    
        
        typeName = $('#item-type').find('option:selected').text();
        catName = $('#item-cats').find('option:selected').text();
        
        $('#result-items').append('<div class="result__item product row"><div class="col-7">'+typeName+' размером '+itemWidth+' на '+itemHeight+' см.<br>Ткань: '+catName+'</div><div class="col-1">изд.</div><div class="col-1 item-count">'+itemsCount+'</div><div class="col-1">'+priceValue+'</div><div class="col-1 item-summ">'+summ+'</div><div class="col-1 remove">x</div></div>');
        
        if($('#discount').prop("checked")){
            discount = summ/100*$('#discount').val();
            discount = Math.round(discount*100)/100;    
            $('#result-items').append('<div class="result__item row discount"><div class="col-7">Скидка</div><div class="col-1">---</div><div class="col-1">---</div><div class="col-1">---</div><div class="col-1 item-summ">'+-discount+'</div></div>')
        }else{
            discount = 0;
        }
        
        totalItemsCount = 0
        
        $('.item-count').each(function(){
            totalItemsCount += parseInt($(this).html());
        })
        
        if($('#install').prop("checked")){
            worksSumm = totalItemsCount*workPrice;
        }else{
            worksSumm = 0;
        }
        
        $('#result-works .item-summ').html(worksSumm);
        
        if($('#equip').prop("checked")){
            if($('#inmcad').prop("checked")){
                equipSumm = equipInMcadPrice;
            }else{
                equipSumm = equipOutMcadPrice + equipOutMcadPriceKm*parseInt($('#distance').val());
            }
        }else{
            equipSumm = 0;
        }
        
        $('#result-check .item-summ').html(equipSumm);
        
        
        if($('#delivery').prop("checked")){
            if($('#inmcad').prop("checked")){
                deliverySumm = deliveryInMcadPrice;
            }else{
                deliverySumm = deliveryOutMcadPrice + deliveryOutMcadPriceKm*parseInt($('#distance').val());
            }
        }else{
            deliverySumm = 0;
        }
        
        $('#result-delivery .item-summ').html(deliverySumm);
        
        totalSumm = 0;
        
        $('.item-summ').each(function(){
            totalSumm += parseFloat($(this).html());
        })
        
        $('#result-total .item-total').html((Math.round(totalSumm*100)/100));
        
        var destination = $('#result').offset().top;

        $('html, body').animate({ scrollTop: destination }, 500);
             
    });
    
    $(document).on('click', '.remove', function(){
        
        var $that = $(this).parent('.result__item');
        $that.next('.discount').remove();
        $that.remove();
        
        if($('.product').length < 1){
            $('.result').fadeOut(200);
        }
        
        totalItemsCount = 0
        
        $('.item-count').each(function(){
            totalItemsCount += parseInt($(this).html());
        })
        
        if($('#install').prop("checked")){
            worksSumm = totalItemsCount*workPrice;
        }else{
            worksSumm = 0;
        }
        
        $('#result-works .item-summ').html(worksSumm);
        
        if($('#equip').prop("checked")){
            if($('#inmcad').prop("checked")){
                equipSumm = equipInMcadPrice;
            }else{
                equipSumm = equipOutMcadPrice + equipOutMcadPriceKm*parseInt($('#distance').val());
            }
        }else{
            equipSumm = 0;
        }
        
        $('#result-check .item-summ').html(equipSumm);
        
        
        if($('#delivery').prop("checked")){
            if($('#inmcad').prop("checked")){
                deliverySumm = deliveryInMcadPrice;
            }else{
                deliverySumm = deliveryOutMcadPrice + deliveryOutMcadPriceKm*parseInt($('#distance').val());
            }
        }else{
            deliverySumm = 0;
        }
        
        $('#result-delivery .item-summ').html(deliverySumm);
        
        totalSumm = 0;
        
        $('.item-summ').each(function(){
            totalSumm += parseFloat($(this).html());
        })
        
        $('#result-total .item-total').html((Math.round(totalSumm*100)/100));
        
    });
    
    $('#item-type').on('change', function(){
        
        itemType = $(this).val();
        getCats(itemType);
        itemCat = $('#item-cats').val();
        file = '../files/'+itemType+'/'+itemCat+'.csv';
        parceFile(file);
        
    });
    
    
    $('#item-cats').on('change', function(){
        
        itemType = $('#item-type').val();
        itemCat = $(this).val();
        file = '../files/'+itemType+'/'+itemCat+'.csv';
        parceFile(file);
        
    });
    
    var validHeight, validWidth, validCount;
    
    function checkMaxMin(){
        
        if($('#item-width').val() < minWidth || $('#item-width').val() > maxWidth){
            $('#maxMinErrorW').html('Ширина для выбранного типа должна быть от '+minWidth+' до '+maxWidth+' см.');
            validWidth = 0;
        }else{
            $('#maxMinErrorW').html('');
            validWidth = 1;
        }
        
        
        if($('#item-height').val() < minHeight || $('#item-height').val() > maxHeight){
            $('#maxMinErrorH').html('Высота для выбранного типа должна быть от '+minHeight+' до '+maxHeight+' см.');
            validHeight = 0;
        }else{
            $('#maxMinErrorH').html('');
            validHeight = 1;
        }
        
        if(!$('#item-count').val()){
            $('#countError').html('Введите необходимое Вам количество товара');
            validCount = 0;
        }else{
            $('#countError').html('');
            validCount = 1;
        }
        
        if(validWidth != 0 && validHeight != 0 && validCount != 0){
            $('#addResult').attr('disabled', false);
        }else{
            $('#addResult').attr('disabled', true);
        }
        
    }
    
    $('#item-width').on('keyup', function(){
        $(this).val($(this).val().replace (/\D/, ''));
        checkMaxMin();
    });
    
    $('#item-height').on('keyup', function(){
        $(this).val($(this).val().replace (/\D/, ''));
        checkMaxMin();
    });
    
    $('#item-count').on('keyup', function(){
        $(this).val($(this).val().replace (/\D/, ''));
        checkMaxMin();
    });
    
    function checkServs(){
        if($('#equip').prop("checked") || $('#install').prop("checked") || $('#delivery').prop("checked")){
            $('#where-section').slideDown(200);
        }else{
            $('#where-section').slideUp(200);
        }
    }
    
    $('#equip, #install, #delivery').on('change', function(){
        checkServs();
    });
    
    $('#result-more').on('click', function(){

        var destination = $('#calc').offset().top;

        $('html, body').animate({ scrollTop: destination }, 500);
        
        return false; 

    });
    
	
})(jQuery);