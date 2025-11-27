$(document).ready(function () {

    (function ($) {
        "use strict";

        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        $('#contactForm').validate({
            rules: {
                name: { required: true, minlength: 2 },
                location: { required: true },
                service: { required: true },
                phone: { required: true, minlength: 5 },
                email: { required: true, email: true },
                message: { required: true, minlength: 20 }
            },
            messages: {
                name: {
                    required: "come on, you have a name, don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                location: {
                    required: "come on, you have a location, don't you?",
                },
                phone: {
                    required: "come on, you have a phone number, don't you?",
                    minlength: "your phone number must consist of at least 5 characters"
                },
                email: { required: "no email, no message" },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                },
                service: {
                    required: "Please select a service",
                }
            },

            submitHandler: function (form) {

                const scriptURL = "https://api.sheetbest.com/sheets/96714d2b-c6a0-4b56-8692-f8404dfc35dc";

                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                Object.keys(data).forEach(key => {
                    if (!data[key].trim()) delete data[key];
                });

                if (Object.keys(data).length < 5) {
                    alert("Please fill all fields.");
                    return;
                }

                fetch(scriptURL, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(() => {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo("slow", 1, function () {
                            $('#success').fadeIn();
                            $('.modal').modal('hide');
                            $('#success').modal('show');
                        });
                        form.reset();
                    })
                    .catch(() => {
                        $('#contactForm').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                            $('.modal').modal('hide');
                            $('#error').modal('show');
                        });
                    });
            }
        });

    })(jQuery)
});
