// useViewHouse에서 직접 호출해서 지금 미사용
import Swal from 'sweetalert2'

export function alertToLaod(){

    let timerInterval;
    Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <b></b> milliseconds.",
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
    },
    willClose: () => {
        clearInterval(timerInterval);
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
    }
    });
}