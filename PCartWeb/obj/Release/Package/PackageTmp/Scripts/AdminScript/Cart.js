$(document).ready(function () {


    $.post('../Home/LoadCart', {
    }, function (data) {
        var tr = "";
        $('#vwCartItems tr').remove();
        for (var rec in data) {
            tr += "<tr>";
            tr += "<td style='text-align:center' >";
            tr += '<input type="checkbox" class="get_value" onclick="onClickHandler()" id="cart" value="' + data[rec].ProdCartId + '">';
            tr += "</td>";
            tr += "<td style='text-align:center'>";
            tr += '<img src="' + data[rec].Image + '" width="50" height="50" />';
            tr += "</td>";
            tr += "<td style='text-align:center'>";
            tr += data[rec].ProdName;
            tr += "</td>";
            tr += "<td style='text-align:center'>";
            tr += data[rec].Qty;
            tr += "</td>";
            tr += "<td style='text-align:center'>";
            tr += "PHP  " + data[rec].Price;
            tr += "</td>";
            tr += "<td style='text-align:center'>";
            tr += "PHP  " + data[rec].Subtotal;
            tr += "</td>";
            tr += "</tr>";
        }
        $("#vwCartItems").html(tr);
    });

    $('.get_value').change(function () {
        if ($(this).prop('checked')) {
            alert("Checked Box Selected");
        } else {
            alert("Checked Box deselect");
        }
    });
    $('#btnDelete').click(function () {
        var itemsSelected = [];

        $('.get_value').each(function () {
            if ($(this).is(":checked")) {
                itemsSelected.push($(this).val());
            }
        });

        itemsSelected = itemsSelected.toString();

        $.post('../Home/DeleteCartItem', {
            itemsSelected: itemsSelected,
        }, function (data) {
            if (data[0].mess == 1) {
                alert('Deleted Successfully!');
                window.location.href = "/Home/DisplayCart";
            }
        });
    });

    $('#btnCheckout').click(function () {
        var itemsSelected = [];

        $('.get_value').each(function () {
            if ($(this).is(":checked")) {
                itemsSelected.push($(this).val());
            }
        });

        itemsSelected = itemsSelected.toString();

        $.post('../Home/SaveCheckouts', {
            itemsSelected: itemsSelected,
        }, function (data) {
                window.location.href = "/Home/CheckoutPage";
        });
    });


});

function onClickHandler() {
    var itemSelected = [];
    $('.get_value').each(function () {
        if ($(this).is(":checked")) {
            itemSelected.push($(this).val());
        }
    });

    itemSelected = itemSelected.toString();

    $.post('../Home/CalculateItems', {
        itemSelected: itemSelected,
    }, function (data) {
            document.getElementById("total").value = data[0].total;
    });
}
