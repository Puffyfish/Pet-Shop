    // for disabling form submissions if there are invalid fields
    (function () {
        'use strict'
      
        // fetch the form for Bootstrap validation styles to apply to
        const forms = document.querySelectorAll('.validated-form')
      
        // Loop over them and prevent submission
        Array.from(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
      
              form.classList.add('was-validated')
            }, false)
            console.log(form)
          })
      })()