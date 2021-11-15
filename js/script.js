
const prices = {
    'landing-page': {
        pm: 700,
        web: 600,
        developer: 1200,
        // qa: 500
    },
    'online-store': {
        pm: 1200,
        web: 900,
        developer: 2500,
        // qa: 800,
    },
    'web-application': {
        pm: 2000,
        web:1100,
        developer:3000,
        // qa: 1000,
    },
    'mobile-application': {
        pm: 3000,
        web: 1500,
        developer: 4000,
        // qa: 1300,
    }
};
function getFormValues () {

    const websiteTypeElement = document.querySelector ('#project-type')

        const webEl = document.querySelector('#web-site');
        const projectmEl = document.querySelector('#project-management');
        const javadEl = document.querySelector('#java-developer');

        // console.log(websiteTypeElement.value);

            // console.log(webEl.checked);
            // console.log(projectmEl.checked);
            // console.log(javadEl.checked);

            return {
                websiteType: websiteTypeElement.value,
                pm: projectmEl.checked,
                web: webEl.checked,
                developer: javadEl.checked,
            }
}

function calculateWork () {
    const values = getFormValues ();

    let totalPrice = 0;

    const workTypes = prices[values.websiteType]

    if(values.pm) {
        totalPrice = workTypes.pm;
    }

    if (values.web) {
        totalPrice = totalPrice + workTypes.web;
    }

    if (values.developer) {
        totalPrice = totalPrice + workTypes.developer;
    }

    const totalPriceEl = document.querySelector('#total-price');

    totalPriceEl.textContent = totalPrice;
    
    console.log(totalPrice)


}
const formEl = document.querySelector ('#project-price-form');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#success-modal');


formEl.addEventListener('change' , calculateWork);

formEl.addEventListener('submit', function(event) {
    event.preventDefault();

    emailModal.classList.add('modal-active');
     
});

const closeButtons = document.querySelectorAll('.modal-close-btn');

closeButtons.forEach( function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active');
    })
})

const modalEmailContainer = document.querySelector('#modal-email-container');

modalEmailContainer.addEventListener('submit', function(event){
    event.preventDefault

    const userEmailInput = document.querySelector('#user-email');

    if (userEmailInput.value) {

        const formData = new FormData(formEl);

        formData.append('Email', userEmailInput.value);

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
            .then(function() {
                emailModal.classList.remove('modal-active');
                successModal.classList.add('modal-active');
            })
            .catch((error) => alert(error))

        return;
    }

    const inputContainer = document.querySelector('#email-input-container');

    inputContainer.classList.add('email-input-container-error')
});