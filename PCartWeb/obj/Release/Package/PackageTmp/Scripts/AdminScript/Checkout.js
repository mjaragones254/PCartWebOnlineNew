$(document).ready(function () {
    $.post('../Home/CheckoutItems', {
    }, function (data) {
        var tr = "";
        var div = "";
        var totalall = 0;
        var tr2 = "";
        var deliverfee = 0;
        $('#checkoutTable tr').remove();
        for (var rec in data) {
            tr += "<tr>";
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
            deliverfee = data[rec].Delivery_fee;
            totalall = totalall + parseFloat(data[rec].Subtotal);
        }

        totalall = totalall + parseInt(data[rec].Delivery_fee);
        tr2 += "<input class='form-control' placeholder='Total: " +totalall.toFixed(2)+"' type='text' readonly>";
        div += "<p> Name: "+ data[0].Name +"";
        div += "<p> Address: "+data[0].Address+" </p>";
        $('#addressDetails').html(div);
        $("#checkoutTable").html(tr);
        $('#checktotal').html(tr2);
    });


    
});

//function PlaceOrder(id) {
//    var select = $('#select').val();
//    alert('asda');
//    $.post('../Home/PlaceYourOrder', {
//        id: id,
//        select: select,
//    }, function (data) {
//        if (data[0].mess == 1) {

//        }
//        else if (data[0].mess == 2) {

//        }
//    });
//}