﻿// Boş şablona giriş için aşağıdaki belgelere bakın:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Cordova-simulate içinde veya Android cihazlarda/öykünücülerinde sayfa yükleme durumunda kodlarda hata ayıklamak için: Uygulamanızı çalıştırın, kesme noktalarını ayarlayın, 
// ve ardından JavaScript Konsolu'ndan "window.location.reload()" kodunu çalıştırın.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Cordova duraklama ve devam etme olaylarını işleme
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova yüklendi. Burada Cordova gerektiren tüm başlatma işlemlerini gerçekleştirin.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: Bu uygulama askıya alındı. Burada uygulama durumunu kaydedin.
    };

    function onResume() {
        // TODO: Bu uygulama yeniden etkinleştirildi. Burada uygulama durumunu geri yükleyin.
    };

    

})();
// Handle results
function startRecognition() {
    window.plugins.speechRecognition.startListening(
        function (result) {
            // Show results in the console
            window.TTS.speak({
                text: result,
                locale: 'tr-TR',
                rate: 1.0
            }, function () {
            }, function (error) {
                alert(error);
            });
        }, function (err) {
            console.error(err);
        }, {
            language: "tr-TR",
            showPopup: true,
            matches: 1
        });
}
function sesliArama() {
    // Verify if recognition is available
    alert("function fired");
    window.plugins.speechRecognition.isRecognitionAvailable(function (available) {

        if (!available) {
            window.TTS.speak({
                text: 'Cihazınız sesli arama için uygun değildir',
                locale: 'tr-TR',
                rate: 1.0
            }, function () {
            }, function (error) {
                alert(error);
            });
        }

        // Check if has permission to use the microphone
        window.plugins.speechRecognition.hasPermission(function (isGranted) {
            if (isGranted) {
                startRecognition();
            } else {
                // Request the permission
                window.plugins.speechRecognition.requestPermission(function () {
                    // Request accepted, start recognition
                    startRecognition();
                }, function (err) {
                    console.log(err);
                });
            }
        }, function (err) {
            console.log(err);
        });
    }, function (err) {
        console.log(err);
    });
}//end of sesliArama