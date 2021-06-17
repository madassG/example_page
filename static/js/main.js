(() => {
  'use strict';
  // Page is loaded
  const objects = document.getElementsByClassName('asyncImage');
  Array.from(objects).map((item) => {
    // Start loading image
    const img = new Image();
    img.src = item.dataset.src;
    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      item.classList.remove('asyncImage');
      return item.nodeName === 'IMG' ?
        item.src = item.dataset.src :
        item.style.backgroundImage = `url(${item.dataset.src})`;
    };
  });
})();

$(document).ready(function() {
  MicroModal.init();
  /*
    ============================================================
    Navigation
    ============================================================
  */
  $(".js-navigation-scroll").click(function() {
    var targetBlock = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(targetBlock).offset().top
    }, 500);
  });
  /*
    ============================================================
    Sidebar
    ============================================================
  */
  $(document).mouseup(function (e){
		var div = $("#is-admin-sidebar");
    var close = $(".js-sidebar");
    if (close.is(e.target) || !(close.has(e.target).length === 0)) {
			div.toggleClass("active");
		} else if (!div.is(e.target) && div.has(e.target).length === 0) {
			div.removeClass("active");
		}
	});

  // Calendar
  $("input[name='date']").datepicker({

  });

  /*
   ============================================================
   Accordion
   ============================================================
  */
  $(".accordion-item.active").find(".accordion-item__panel").slideDown();
  $(".js-accordion").click(function() {

     var accordionItem = $(this).parent();
     var isActive = accordionItem.hasClass('active');
     var accordionItems = accordionItem.closest('.accordion').find('.accordion-item');

     closeAccordionItems(accordionItems);

     if(!isActive) {
         var accordionItemContent = $(this).next();
         accordionItemContent.slideDown();

         accordionItem.addClass('active');
     }
  });
  function closeAccordionItems(items) {
     for(var i = 0; i < items.length; i++) {
         var item = $( items[i] );

         var content = item.find('.accordion-item__panel');
         content.slideUp();

         item.removeClass('active');
     }
  }

  /*
    ============================================================
    File downloaded
    ============================================================
  */
  if($(".input-image__file").attr('src') != '#') {
    $(".input-image").addClass('active');
  }
  $(".input-image__input").change(function(){
      readURL(this);
  });
  /*
    ============================================================
    Device Type
    ============================================================
  */
  // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ) {
  //   if( $('.subscribe').length ) {
  //     $(".subscribe__button").attr('href', "instagram://user?username=" + $('.subscribe__author-instagram')[0].textContent);
  //   }
  //
  // } else if( $('.subscribe').length ) {
  //     $(".subscribe__button").attr('href', "https://instagram.com/" + $('.subscribe__author-instagram')[0].textContent);
  // }
  // if($(".subscribe").length > 0) {
  //   $(".subscribe__button").attr('href', "https://instagram.com/" + $('.subscribe__author-instagram')[0].textContent);
  // }

  /*
    ============================================================
    Subscribe AJAX
    ============================================================
  */
  $('.js-subscribe .button').click(function (event) {
      event.preventDefault();
      var csrf = $('input[name=csrfmiddlewaretoken]');
      var answer = $('.answer');
      $.ajax({
          url: 'ajax-check/',
          data: {

          }
          ,
          method: 'post',
          headers: {'X-CSRFToken': csrf.val()},
          success: function(data)
          {
              if (data.result === 'good'){
                // $(".subscribe__form").removeClass("subscribe__form_error");
                window.location.href = 'success/';
              } else if (data.result === 'bad'){
                $('#modal-subscribe .popup-service__title span').text(data.head);
                $('#modal-subscribe .popup-service__text').text(data.text);
                MicroModal.show('modal-subscribe');
                // $(".subscribe__form").addClass("subscribe__form_error");
              }
          },
      });
  });
  /*
    ============================================================
    Copy Link
    ============================================================
  */
  $(".my-pages-card__copy-link").click(function(event) {
    event.preventDefault();

    var link = $(this).closest('.my-pages-card').find(".my-pages-card__button-link a").attr('href');
    var domain = "https://instasub.link";

    if(link.indexOf("https://") === -1) {
      link = domain + link;
    }

    if(!$(this).find(".my-pages-card__copy-link-input").length) {
      var input = $("<input class='my-pages-card__copy-link-input'/>").val(link);
      input.css({
        "position": "absolute",
        "left": "-9999px"
      });
      $(this).append(input);
    }

    input = $(this).find(".my-pages-card__copy-link-input");
    input[0].select();
    input[0].setSelectionRange(0, 99999)
    document.execCommand("copy");

    console.log(input.val());
  });
  /*
    ============================================================
    Domains copy IP
    ============================================================
  */
  $(".js-copy-domain-ip").click(function(event) {
    event.preventDefault();

    var text = $(this).parent().find(".domains__check-ip-value").text();
    if(!$(this).find(".js-copy-domain-ip-input").length) {
      var input = $("<input class='js-copy-domain-ip-input'/>").val(text);
      input.css({
        "position": "absolute",
        "left": "-9999px"
      });
      $('body').append(input);
    }

    input = $(".js-copy-domain-ip-input");
    input[0].select();
    input[0].setSelectionRange(0, 99999)
    console.log(input)
    document.execCommand("copy");

    console.log(input.val());
  });
  /*
    ============================================================
    Ajax Tariffs
    ============================================================
  */
  $('.tariffs-card__button input[type="submit"]').click(function(event) {
    event.preventDefault();
    var tariff = $(this).closest('form').find('input[name="rate"]').val();
    $.ajax({
        url: 'ajax-check/',
        method: 'post',
        headers: {'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
        data: {
            rate: tariff
        },
        success: function(data) {
          if(data.balance === 'bad') {
           $('#modal-1').find(".popup-service__title span").text("Не хватает " + data.amount + " рублей");
            MicroModal.show('modal-1');
          } else if(data.rate === 'less') {
            MicroModal.show('modal-2');
          } else if(data.rate === 'have') {
            MicroModal.show('modal-3');
          } else if(data.rate === 'extra') {
            $('#modal-4').find(".popup-service__text span").text(data.extra);
            $('#modal-4 #tariff-buy').data('rate', tariff);
            MicroModal.show('modal-4');
          } else if(data.balance === 'good') {
            $.ajax({
              url: "",
              method: "post",
              headers: {'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
              data: {
                 rate: tariff
              },
              success: function() {
                tariffSuccess();
              }
            });
          }
        }
    });
  });
  $("#tariff-buy").click(function() {
    var tariff = $(this).data('rate');
    $.ajax({
      url: "",
      method: "post",
      headers: {'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
      data: {
         rate: tariff
      },
      success: function() {
        tariffSuccess();
      }
    });
  });
  $("#tariff-buy-close").click(function() {
    MicroModal.close('modal-4');
  });
  /*
    ============================================================
    Languages
    ============================================================
  */
  if (location.pathname.indexOf('/en/') != -1){
    $(".js-language input").prop('checked', false);
    $(".js-language input[value='Eng']").prop('checked', true);
  }
  if (location.pathname.indexOf('/ru/') != -1){
    $(".js-language input").prop('checked', false);
    $(".js-language input[value='Ru']").prop('checked', true);
  }
  $(".js-language").change(function() {
      $.ajax({
        method: 'GET',
        url: location.origin + '/change-lang/?url=' + location.pathname,
        success: function(data) {
          window.location.href = data.url
        }
      })
  });
  /*
    ============================================================
    Redirect to balance
    ============================================================
  */
  $("#modal-1 .button").click(function() {
    window.location.href = "/balance";
  })
  /*
    ============================================================
    Tariff Success
    ============================================================
  */
  function turiffSuccess() {
    $('.modal').remove()
    $('.is-admin').remove();
    $('body').prepend('<div class="tariff-success"><div class="tariff-success__content"><div class="tariff-success__image"><img src="/images/check.png" alt=""></div><h1 class="h1-title tariff-success__title">Тариф успешно куплен<img src="/images/smile.png" alt=""></h1><p class="text tariff-success__text">Вы успешно приобрели тариф и можете<br>приступить к созданию страниц</p><div class="button-wrapper tariff-success__button"><a class="button" href="/my-pages.html">Приступить</a></div></div></div>');
  }
  /*
    ============================================================
    Tariff Success
    ============================================================
  */
  $("#js-video-popup").click(function(event) {
    event.preventDefault();
    MicroModal.show('index-first-screen-modal');
  });
  /*
    ============================================================
    Referral Form
    ============================================================
  */
  $(".referral-form__payment-methods input").change(function() {
    console.log($(this).data("placeholder"));
    var input = $(this).parent().parent().find(".referral-form__input input");
    input.attr("placeholder", $(this).data("placeholder"));
  });
  /*
    ============================================================
    Balance promo ajax
    ============================================================
  */
  $("#tariff-buy").click(function() {
    var tariff = $(this).data('rate');
    $.ajax({
      url: "",
      method: "post",
      headers: {'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
      data: {
         rate: tariff
      },
      success: function() {
        tariffSuccess();
      }
    });
  });
  /*
    ============================================================
    Countdown bar & cookie
    ============================================================
  */
  function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('.countdown__bar-animated').animate({ width: progressBarWidth }, 500);

    var minutes = ("0" + Math.floor(timeleft/60)).slice(-2);
    var seconds = ("0" + timeleft%60).slice(-2);

    $element.find('.countdown__bar-time').html(minutes + ":"+ seconds);
    if(timeleft > 0) {
        setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
  };

  progress(90, 90, $('.countdown__bar'));

});

/*
  ============================================================
  File downloaded
  ============================================================
*/

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
        $(input).parent().addClass("active");
        $(input).parent().find(".input-image__file").attr('src', e.target.result);
        $(input).parent().find(".input-image__file").attr("style", '')
    }

    reader.readAsDataURL(input.files[0]);
  }
}

/*
  ============================================================
  Custom Select
  ============================================================
*/

var x, i, j, selElmnt, a, b, c, arrow;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  arrow = document.createElement("DIV");
  arrow.setAttribute("class", "select-selected__arrow");
  a.appendChild(arrow);
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            h.appendChild(arrow);
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
//document.addEventListener("click", closeAllSelect);
