

$(document).ready(function() {

/*edit-field*/
$("#add-equip").click(function(){
    $('.table-edit tbody tr:first-child').addClass('editmodeequip')
      $('.savefield').click(function(){
         $(this).closest('tr').removeClass('editmodeequip')
      });
});
 $('.edit-field').click(function(){
        $(this).closest('tr').addClass('editmode')
      var $showField = $(this).closest('tr').children('td.editfield');
      $showField.children('input').show();
      $showField.children('select').show();
      $showField.children('p').hide();
      });

       $('.savefield').click(function(){
        $(this).closest('tr').removeClass('editmode')
      var $showField = $(this).closest('tr').children('td.editfield');
      $showField.children('input').hide();
      $showField.children('select').hide();
      $showField.children('p').show();
      });

    

    /*========top-search===========*/
    $(" .btn-mobsearch").click(function() {

        $(".header-right-part").toggleClass("search-show");

        $(this).find("i").toggleClass("fa-search fa-times");

    });


    

    $(".btn-toggle,.close_panel").click(function() {
        $("body").toggleClass("toggle-wrapper");
    });


    $(document).on("click", ".top-user-img", function() {
        $(".head-drop-down").toggleClass("show");
    });

    /* =====Side Panel=== */
    if ($(window).width() < 768) {
        $('body').removeClass('toggle-wrapper');
    } else if ($(window).width() > 767 && $(window).width() < 1025) {
        $('body').addClass('toggle-wrapper');
    }
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $('body').removeClass('toggle-wrapper');
        } else if ($(window).width() > 767 && $(window).width() < 1025) {
            $('body').addClass('toggle-wrapper');
        }
    });

    /* ===========Side Panel End======== */
    /* =====Increase Descrese========== */
    $(".inc-btn").click(function() {
        var get_val = parseInt($(".show_record input").val());
        get_val = get_val + 1;
        $(".show_record input").val(get_val)
    });

    $(".dec-btn").click(function() {
        var dec_val = parseInt($(".show_record input").val());
        if (dec_val <= 0) {
            return false;
        } else {
            dec_val = dec_val - 1;
            $(".show_record input").val(dec_val)
        }
    });

    /* ============Nice Scroll============= */
    // var nice = $("html").niceScroll();
    // $(".scroll-section, .sidebar").niceScroll({
    //     cursorborder: "",
    //     cursorcolor: "#EFC0ED",
    //     boxzoom: false

    // });


    /* =================Upload file========== */

    $('.browse_btn  input[type="file"]').change(function() {
        if ($(this).val()) {
            error = false;

            /* var filename = $(this).val(); */
            var filename = $(this).val().split('\\').pop();
            $('.filename').html(filename);

            if (error) {
                parent.addClass('error').prepend.after('<div class="alert alert-error">' + error + '</div>');
            }
        }
    });
    /* =================Upload File End======== */

    /* ========For Image Change========== */
    $('.select_picture input[type=file]').change(function() {
        readURL(this);
    });


    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.bank_image_box img').attr('src', e.target.result).fadeIn('slow');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    /* =========Image Changes====== */






});
/* Ready End */