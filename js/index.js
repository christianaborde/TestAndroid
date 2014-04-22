head.load("bower_components/bootstrap/dist/css/bootstrap.css", //
    "bower_components/jquery/dist/jquery.js", //
    "bower_components/bootstrap/dist/js/bootstrap.js", //
    "css/index.css", //
    "bower_components/rwm-phoenix/dist/phoenix.js", function() {
        $("#btnSignIn").click(function(e) {
            e.preventDefault();
            if($("#iptCustomerId").val().length !== 10) {
                alert("Invalid Customer Id; Invalid Length.");
                return;
            } else if(!$.isNumeric($("#iptCustomerId").val())) {
                alert("Invalid Customer Id; Not Numeric.");
                return;
            } else if($("#iptCustomerPIN").val().length !== 6) {
                alert("Invalid PIN; Invalid Length.");
                return;
            } else if(!$.isNumeric($("#iptCustomerPIN").val())) {
                alert("Invalid PIN; Not Numeric.");
                return;
            }
            send($("#iptCustomerId").val(), $("#iptCustomerPIN").val());
        });
    });
var send = function(cid, pin) {
    phoenix.userId = 'debug'; //Do NOT store your API Key on a script.
    phoenix.apiKey = 'F7F7F40AAFE6A2C4C5E741E14983B386F1333F06';
    phoenix.send({
        cmnd: 'gcdi',
        prms: {
            'cid': cid,
            'pin': pin,
            'pic': '0',
            'sig': '0',
            'valPin': '1',
            'rel': '45',
            'lev': '44',
            'adSel': '0',
            'enaAno': '0',
        }
    }, function callbackF(data) {
        var d = JSON.parse(data);
        if(d.exitCode === 0) alert(JSON.stringify(d.response['error']));
        else {
            alert(JSON.stringify(d.response['gcdi.cdb.dpiCnm']));
            alert(JSON.stringify(d.response['gcdi.cdb.dpiVisBal']));
        }
    });
};